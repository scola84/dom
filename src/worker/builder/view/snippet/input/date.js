import { DateTime } from './datetime';

export class Date extends DateTime {
  constructor(options) {
    super(options);

    this._wrap = null;
    this.setWrap(options.wrap);

    this
      .attributes({
        type: 'date'
      })
      .format('yyyy-MM-dd');
  }

  getOptions() {
    return Object.assign(super.getOptions(), {
      wrap: this._wrap
    });
  }

  getWrap() {
    return this._wrap;
  }

  setWrap(value = false) {
    this._wrap = value;
    return this;
  }

  wrap() {
    return this.setWrap(true);
  }

  createNode() {
    super.createNode();

    if (this._wrap) {
      this.wrapInput();
    }
  }

  resolveAfter(box, data) {
    super.resolveAfter(box, data);
    return this.changeValue();
  }

  changeValue() {
    this._node.node().nextSibling.innerHTML =
      this._node.property('value') ||
      new Date().toISOString().slice(0, 10);

    return this._node;
  }

  wrapInput() {
    const wrapper = this
      .wrapNode('div')
      .classed('date', true);

    wrapper
      .append('label');

    this._node.on('input.scola-date', () => {
      this.changeValue();
    });
  }
}
