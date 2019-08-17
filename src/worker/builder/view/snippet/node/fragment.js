import { Dummy } from '../../../../../object';
import { Node } from '../node';

export class Fragment extends Node {
  node() {
    return this._parent.node();
  }

  createNode() {
    this.setNode(new Dummy());
  }

  removeNode() {
    if (this._node === null) {
      return;
    }

    this._node.node().snippet = null;
    this._node = null;
  }
}
