import { Parent } from '../parent';

export class List extends Parent {
  constructor(options = {}) {
    super(options);

    this._clear = null;
    this._empty = null;

    this.setClear(options.clear);
    this.setEmpty(options.empty);
  }

  getClear() {
    return this._clear;
  }

  setClear(value = false) {
    this._clear = value;
    return this;
  }

  getEmpty() {
    return this._empty;
  }

  setEmpty(value = null) {
    if (value) {
      this._empty = value
        .setParent(this)
        .class('empty');
    }

    return this;
  }

  clear() {
    return this.setClear(true);
  }

  empty(value) {
    return this.setEmpty(value);
  }

  prepareList(box, data) {
    const options = box.list || {};

    if (this._clear || options.clear) {
      delete options.clear;

      options.offset = 0;
      options.total = 0;

      this.removeChildren();
    }

    if (options.offset === 0 && options.count > 0) {
      this._node.node().parentNode.scrollTop = 0;
    }

    options.total += data.length;

    this.removeEmpty();
  }

  removeEmpty() {
    const empty = this._node.select('.empty').node();

    if (empty) {
      empty.snippet.remove();
    }
  }

  removeInner() {
    this.removeChildren();
    this.removeAfter();
  }

  resolveInner(box, data) {
    data = this._filter ? this._filter(box, data) : data;
    data = data || [];

    const [
      item,
      ...extra
    ] = this._args;

    this.prepareList(box, data);

    for (let i = 0; i < data.length; i += 1) {
      this.appendChild(box, data[i], item);
    }

    const size = this._node
      .select('.item:not(.out)')
      .size();

    if (data.length === 0 && size === 0) {
      this.appendChild(box, data, this._empty);
    }

    for (let i = 0; i < extra.length; i += 1) {
      this.appendChild(box, data, extra[i]);
    }

    return this.resolveAfter(box, data);
  }
}
