import { Data } from './data'

export class Group extends Data {
  constructor (options = {}) {
    super(options)

    this._index = null
    this.setIndex(options.value)
  }

  getOptions () {
    return Object.assign(super.getOptions(), {
      index: this._index
    })
  }

  getIndex () {
    return this._index
  }

  setIndex (value = null) {
    this._index = value
    return this
  }

  index (value) {
    return this.setIndex(value)
  }

  prepareValue (result, datum) {
    const exogenous = this._exogenous(datum)
    const endogenous = this._endogenous(datum)

    if (typeof result.data[exogenous] === 'undefined') {
      result.data[exogenous] = []
      result.keys[result.keys.length] = exogenous
      result.type = 'group'
    }

    const set = result.data[exogenous]
    const index = this._index ? this._index(datum) : set.length

    set[index] = [
      0,
      endogenous,
      datum
    ]

    result.size = set.length
  }
}
