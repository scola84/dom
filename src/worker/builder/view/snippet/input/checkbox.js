import { event, select } from 'd3-selection'
import { Input } from '../input'

export class Checkbox extends Input {
  constructor (options) {
    super(options)

    this.attributes({
      type: 'checkbox'
    })
  }

  removeBefore () {
    select(this._node.node().parentNode)
      .on('keydown.scola-check', null)

    this.removeOuter()
  }

  validateAfter (box, data, error, name, value) {
    const realName = name.split('.').shift()

    const snippets = this._builder
      .selector((snippet) => {
        return snippet instanceof Checkbox &&
          snippet.resolveAttribute(box, data, 'name') === realName
      })
      .resolve()

    const values = snippets.map((snippet) => {
      return snippet.resolveAttribute(box, data, 'value')
    })

    if (values.indexOf(value) === -1) {
      return this.setError(error, name, value, 'type', { values })
    }

    return null
  }

  wrapInput () {
    const wrapper = this
      .wrapNode('label')
      .attr('tabindex', 0)
      .classed('input check', true)
      .on('keydown.scola-check', () => {
        if ([13, 32].indexOf(event.keyCode) > -1) {
          this._node.property('checked', true)
        }
      })

    wrapper
      .append('div')
  }
}
