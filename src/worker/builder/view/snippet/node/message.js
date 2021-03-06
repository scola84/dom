import { Node } from '../node'

export class Message extends Node {
  constructor (options = {}) {
    super(options)
    this.class('transition')
  }

  resolveAfter (box, data) {
    if (typeof data.status === 'undefined') {
      return this._node
        .classed('in', false)
    }

    let format = `status.${data.status}`

    if (data.code) {
      format += '.' + data.code
    }

    const text = this._builder
      .print()
      .format(format)
      .values(data)

    this._node.text(
      this.resolveValue(box, data, text)
    )

    this._node.classed('in', true)

    return this._node
  }
}
