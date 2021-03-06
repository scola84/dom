export class Dummy {
  constructor () {
    this._attributes = {}
  }

  attr (key, value) {
    if (typeof value === 'undefined') {
      return typeof this._attributes[key] === 'undefined'
        ? null
        : this._attributes[key]
    }

    this._attributes[key] = value
    return this
  }

  classed () {
    return this
  }

  html () {
    return this
  }

  property () {
    return this
  }

  style () {
    return this
  }

  text () {
    return this
  }
}
