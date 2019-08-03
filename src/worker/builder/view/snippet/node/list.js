import { Parent } from '../parent';

export class List extends Parent {
  prepareList(box, data) {
    if (box.list.clear) {
      delete box.list.clear;

      box.list.offset = 0;
      box.list.total = 0;

      this.removeChildren();
    }

    if (box.list.offset === 0 && box.list.count > 0) {
      this._node.node().parentNode.scrollTop = 0;
    }

    box.list.total += data.length;
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
      empty,
      ...extra
    ] = this._args;

    if (box.list) {
      this.prepareList(box, listData);
    }

    for (let i = 0; i < listData.length; i += 1) {
      this.appendChild(box, listData[i], item);
    }

    const size = this._node
      .select('.item:not(.out)')
      .size();

    if (hasData === true && size === 0) {
      this.appendChild(box, { i: -1 }, empty);
    }

    for (let i = 0; i < extra.length; i += 1) {
      this.appendChild(box, { i }, extra[i]);
    }

    return this.resolveAfter(box, data);
  }
}
