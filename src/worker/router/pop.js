import { event, select } from 'd3-selection'
import { ViewRouter } from './view'

export class PopRouter extends ViewRouter {
  act (box, data, callback) {
    if (box.options.clr) {
      this.close(box)
    } else {
      super.act(box, data, callback)
    }
  }

  close (box) {
    const base = select(this._base)
    const parent = select(this._base.parentNode)

    select(document).on('keydown.scola-pop', null)

    parent.style('width')

    parent
      .classed('in', false)
      .on('click.scola-pop', null)
      .on('transitionend.scola-pop', () => {
        parent
          .classed('open', false)
          .on('.scola-pop', null)

        super.act(box)
      })

    base.style('width')

    base
      .classed('in', false)
      .on('click.scola-pop', null)

    const duration = parseFloat(
      parent.style('transition-duration')
    )

    if (duration === 0) {
      parent.dispatch('transitionend')
    }
  }

  open (box) {
    const base = select(this._base)
    const parent = select(this._base.parentNode)

    select(document).on('keydown.scola-pop', () => {
      if (event.keyCode === 27) {
        parent.dispatch('click')
      }
    })

    parent.classed('open', true)
    parent.style('width')

    parent
      .classed('in', true)
      .on('click.scola-pop', () => {
        if (box.lock !== true) {
          box.path = null
          box.options.clr = true
          this.act(box)
        }
      })

    base.classed('move', box.move !== false)
    base.style('width')

    base
      .classed('in', true)
      .on('click.scola-pop', () => {
        event.stopPropagation()
      })
  }

  pass (name, box, data, callback) {
    if (typeof this._downstreams[box.path] !== 'undefined') {
      this.open(box)
      super.pass(name, box, data, callback)
    }
  }
}
