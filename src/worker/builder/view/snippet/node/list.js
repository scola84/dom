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
    this._empty = value ? value.setParent(this) : value;
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
  }

  removeInner() {
    this.removeChildren();
    this.removeAfter();
  }

  resolveInner(box, data) {
    data = this._filter ? this._filter(box, data) : data;

    const hasData = Array.isArray(data);
    const listData = hasData ? data : [];

    const [
      item,
      ...extra
    ] = this._args;

    this.prepareList(box, listData);

    for (let i = 0; i < listData.length; i += 1) {
      this.appendChild(box, listData[i], item);
    }

    const size = this._node
      .select('.item:not(.out)')
      .size();

    if (hasData === true && size === 0) {
      this.appendChild(box, listData, this._empty);
    }

    for (let i = 0; i < extra.length; i += 1) {
      this.appendChild(box, listData, extra[i]);
    }

    return this.resolveAfter(box, data);
  }
}
