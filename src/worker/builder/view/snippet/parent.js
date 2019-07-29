import { select, selectAll } from 'd3';
import { Node } from './node';

export class Parent extends Node {
  constructor(options = {}) {
    super(options);

    this._children = null;
    this.setChildren(options.children);
  }

  getOptions() {
    return Object.assign(super.getOptions(), {
      children: this._children
    });
  }

  getChildren() {
    return this._children;
  }

  setChildren(value = new Map()) {
    this._children = value;
    return this;
  }

  appendChild(box, data, snippet = null) {
    if (snippet === null) {
      return null;
    }

    const id = JSON.stringify(data);

    if (this._children.has(id)) {
      return this._children.get(id);
    }

    let node = snippet
      .clone()
      .resolve(box, data);

    node = Array.isArray(node) ? node[0] : node;

    this._children.set(id, node);

    const transition = select(node.node().parentNode)
      .classed('transition');

    node.classed('transition', transition);
    node.style('width');
    node.classed('in', true);

    return node;
  }

  removeChildren() {
    let children = Array.from(this._node.node().childNodes);

    if (children.length === 0) {
      return;
    }

    children = selectAll(children)
      .classed('out', true)
      .on('transitionend.scola-parent', (datum, index, nodes) => {
        select(nodes[index]).on('.scola-parent', null);
        nodes[index].snippet.remove();
      });

    const duration = parseFloat(
      children.style('transition-duration')
    );

    if (duration === 0) {
      children.dispatch('transitionend');
    }

    this._children.clear();
  }
}
