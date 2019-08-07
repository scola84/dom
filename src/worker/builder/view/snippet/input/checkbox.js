import { select } from 'd3';
import { Input } from '../input';

export class Checkbox extends Input {
  constructor(options) {
    super(options);

    this.attributes({
      type: 'checkbox'
    });
  }

  removeBefore() {
    select(this._node.node().parentNode)
      .on('keydown.scola-check', null);

    this.removeOuter();
  }

  wrapInput() {
    const wrapper = this
      .wrapNode('label')
      .attr('tabindex', 0)
      .classed('input check', true)
      .on('keydown.scola-check', () => {
        if ([13, 32].indexOf(event.keyCode) > -1) {
          this._node.property('checked', true);
        }
      });

    wrapper
      .append('div');
  }
}
