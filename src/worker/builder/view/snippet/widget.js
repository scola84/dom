import { Action } from './action';

export class Widget extends Action {
  constructor(options = {}) {
    super(options);

    this._name = null;
    this._widget = null;

    this.setName(options.name);
    this.setWidget(options.widget);
  }

  getOptions() {
    return Object.assign(super.getOptions(), {
      name: this._name,
    });
  }

  getName() {
    return this._name;
  }

  setName(...name) {
    this._name = name;
    return this;
  }

  getWidget() {
    return this._widget;
  }

  setWidget(value = null) {
    this._widget = value;
    return this;
  }

  name(...name) {
    return this.setName(...name);
  }

  createWidget() {
    const args = this._args;
    this._args = [];

    this._widget = this.buildWidget(args);

    this.append(
      this._widget.setArgs(args)
    );
  }

  resolve(box, data) {
    const isAllowed = this.isAllowed(box, data);

    if (isAllowed === false) {
      return null;
    }

    if (this._widget === null) {
      this.createWidget();
    }

    return this.resolveBefore(box, data);
  }
}
