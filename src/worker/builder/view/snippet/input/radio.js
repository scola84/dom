import { Input } from '../input';

export class Radio extends Input {
  constructor(options) {
    super(options);

    this.attributes({
      type: 'radio'
    });
  }

  wrapInput() {
    const wrapper = this
      .wrapNode('label')
      .classed('input radio check', true);

    wrapper
      .append('div');
  }
}
