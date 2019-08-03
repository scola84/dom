import { Input } from '../input';

export class Checkbox extends Input {
  constructor(options) {
    super(options);

    this.attributes({
      type: 'checkbox'
    });
  }

  wrapInput() {
    const wrapper = this
      .wrapNode('label')
      .classed('input checkbox check', true);

    wrapper
      .append('div');
  }
}
