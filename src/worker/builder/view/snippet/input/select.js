import { Input } from '../input';

export class Select extends Input {
  constructor(options) {
    super(options);
    this.name('select');
  }

  createNode() {
    super.createNode();

    const wrapper = this
      .wrapNode('div')
      .classed('input select', true);

    wrapper
      .append('div')
      .classed('arrow', true);
  }

  validateAfter(box, data, error, name, value) {
    const values = [];

    for (let i = 0; i < this._args.length; i += 1) {
      values[values.length] = this._args[i]
        .resolveAttribute(box, data, 'value');
    }

    for (let i = 0; i < values.length; i += 1) {
      if (values[i] === value) {
        return null;
      }
    }

    return this.setError(error, name, value, 'type', { values });
  }
}
