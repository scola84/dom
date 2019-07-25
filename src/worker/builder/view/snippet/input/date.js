import { select } from 'd3';
import { DateTime as Luxon } from 'luxon';
import { DateTime } from './datetime';

export class Date extends DateTime {
  constructor(options = {}) {
    super(options);

    this._wrap = null;
    this.setWrap(options.wrap);

    this
      .attributes({
        type: 'date'
      })
      .formatFrom('yyyy-MM-dd')
      .formatTo('D');
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
    const formatFrom = this.resolveValue(null, null, this._formatFrom);
    const formatTo = this.resolveValue(null, null, this._formatTo);

    const required = this._node.attr('required');
    let value = this._node.property('value');

    if (required && value === '') {
      this._node.property('value', this._node.value);
      return this._node;
    }

    value = value || Luxon
      .local()
      .toFormat(formatFrom);

    const date = Luxon
      .fromFormat(value, formatFrom)
      .toISO();

    const text = this._builder
      .print()
      .format(`%l[${formatTo}]`)
      .values(date);

    select(this._node.node().nextSibling).text(
      this.resolveValue(null, null, text)
    );

    this._node.value = value;

    return this._node;
  }

  wrapInput() {
    const wrapper = this
      .wrapNode('div')
      .classed('date-wrap', true);

    wrapper
      .append('label')
      .attr('tabindex', 0)
      .attr('for', 'date-' + this._id);

    this._node
      .attr('id', 'date-' + this._id)
      .attr('tabindex', -1)
      .on('input.scola-date', () => {
        this.changeValue();
      });

    this._node.value = this._node.property('value');
  }
}
