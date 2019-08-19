import { Builder } from '@scola/worker';
import { select } from 'd3-selection';
import * as map from './view/map';

export class ViewBuilder extends Builder {
  static setup() {
    ViewBuilder.attachFactories(ViewBuilder, map);
  }

  constructor(options = {}) {
    super(options);

    this._view = null;
    this.setView(options.view);
  }

  getOptions() {
    return Object.assign(super.getOptions(), {
      view: this._view
    });
  }

  getNode() {
    return select(this._upstream.getBase());
  }

  node() {
    return this.getNode();
  }

  getView() {
    return this._view;
  }

  setView(value = null) {
    this._view = value;
    return this;
  }

  act(box, data, callback) {
    this._view.resolve(
      box,
      this.filter(box, data)
    );

    this.pass(box, data, callback);
  }

  build(view) {
    return this.setView(
      view.setParent(this)
    );
  }
}
