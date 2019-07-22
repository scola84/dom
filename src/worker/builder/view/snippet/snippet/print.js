import get from 'lodash-es/get';
import merge from 'lodash-es/merge';
import { Snippet } from '../snippet';
import { vsprintf } from '../../../../../helper';

let flocale = 'nl_NL';
let strings = {};

export class Print extends Snippet {
  static getLocale() {
    return flocale;
  }

  static setLocale(value) {
    flocale = value;
  }

  static getNumbers() {
    return vsprintf.n.definitions;
  }

  static setNumbers(value) {
    vsprintf.n.definitions = value;
  }

  static addNumbers(value) {
    merge(vsprintf.n.definitions, value);
  }

  static getStrings() {
    return strings;
  }

  static setStrings(value) {
    strings = value;
  }

  static addStrings(value) {
    merge(strings, value);
  }

  constructor(options = {}) {
    super(options);

    this._format = null;
    this._locale = null;
    this._values = null;

    this.setFormat(options.format);
    this.setLocale(options.locale);
    this.setValues(options.values);
  }

  getOptions() {
    return Object.assign(super.getOptions(), {
      format: this._format,
      locale: this._locale,
      values: this._values
    });
  }

  getFormat() {
    return this._format;
  }

  setFormat(value = null) {
    this._format = value;
    return this;
  }

  getLocale() {
    return this._locale;
  }

  setLocale(value = flocale) {
    this._locale = value;
    return this;
  }

  getValues() {
    return this._values;
  }

  setValues(value = (box, data) => data) {
    this._values = value;
    return this;
  }

  format(value) {
    return this.setFormat(value);
  }

  locale(value) {
    return this.setLocale(value);
  }

  values(value) {
    return this.setValues(value);
  }

  resolveAfter(box, data) {
    const format = this.resolveValue(box, data, this._format);
    const locale = this.resolveValue(box, data, this._locale);

    let values = this.resolveValue(box, data, this._values);
    values = Array.isArray(values) ? values : [values];

    let lformat = get(strings, `${locale}.${format}`);

    if (typeof lformat === 'undefined') {
      lformat = format;
    }

    if (typeof lformat === 'object') {
      lformat = lformat[values[0]] || lformat.d;
    }

    try {
      return vsprintf(lformat, values, locale);
    } catch (error) {
      return error.message;
    }
  }
}