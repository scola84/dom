import { vsprintf } from '@scola/worker'
import get from 'lodash-es/get'
import merge from 'lodash-es/merge'
import { Snippet } from '../snippet'

const regexpBase = '\\{([^}]+)\\}'
const regexpGlobal = new RegExp(regexpBase, 'g')
const regexpSingle = new RegExp(regexpBase)

let flocale = 'nl_NL'
let strings = {}

export class Print extends Snippet {
  static getLocale () {
    return flocale
  }

  static setLocale (value) {
    flocale = value
  }

  static getNumbers () {
    return vsprintf.n.definitions
  }

  static setNumbers (value) {
    vsprintf.n.definitions = value
  }

  static addNumbers (value) {
    merge(vsprintf.n.definitions, value)
  }

  static getStrings () {
    return strings
  }

  static setStrings (value) {
    strings = value
  }

  static addStrings (value) {
    merge(strings, value)
  }

  constructor (options = {}) {
    super(options)

    this._format = null
    this._locale = null
    this._values = null

    this.setFormat(options.format)
    this.setLocale(options.locale)
    this.setValues(options.values)
  }

  getOptions () {
    return Object.assign(super.getOptions(), {
      format: this._format,
      locale: this._locale,
      values: this._values
    })
  }

  getFormat () {
    return this._format
  }

  setFormat (value = null) {
    this._format = value
    return this
  }

  format (value) {
    return this.setFormat(value)
  }

  getLocale () {
    return this._locale
  }

  setLocale (value = flocale) {
    this._locale = value
    return this
  }

  locale (value) {
    return this.setLocale(value)
  }

  getValues () {
    return this._values
  }

  setValues (value = (box, data) => data) {
    this._values = value
    return this
  }

  values (value) {
    return this.setValues(value)
  }

  resolveAfter (box, data) {
    return this.resolveFormat(
      box,
      data,
      this.resolveValue(box, data, this._format)
    )
  }

  resolveFormat (box, data, format) {
    const locale = this.resolveValue(box, data, this._locale)

    let values = this.resolveValue(box, data, this._values)
    values = Array.isArray(values) ? values : [values]

    let lformat = get(strings, `${locale}.${format}`)

    if (typeof lformat === 'undefined') {
      lformat = format
    }

    if (typeof lformat === 'object') {
      lformat = lformat[values[0]] || lformat.d
    }

    if (typeof lformat === 'function') {
      lformat = lformat(box, data)
    }

    lformat = this.resolveNested(box, data, lformat)

    let string = null

    try {
      string = vsprintf(lformat, values, locale)
    } catch (error) {
      string = error.message
    }

    return string === format ? '' : string
  }

  resolveNested (box, data, lformat = '') {
    const matches = lformat.match(regexpGlobal) || []

    let format = null

    for (let i = 0; i < matches.length; i += 1) {
      [, format] = matches[i].match(regexpSingle)

      lformat = lformat.replace(
        matches[i],
        this.resolveFormat(box, data, format)
      )
    }

    return lformat
  }
}
