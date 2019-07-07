import { Generator } from '../generator';
import { Linear, token } from './axis/';

export class Axis extends Generator {
  static setup() {
    Axis.attach(Axis, { token });
  }

  constructor(options = {}) {
    super(options);

    this._scale = null;
    this.setScale(options.scale);
  }

  getScale() {
    return this._scale;
  }

  setScale(value = new Linear()) {
    this._scale = value.setAxis(this);
    return this;
  }

  scale(value) {
    return this.setScale(value(this));
  }

  removeInner() {
    this.removeChildren();
    this.removeAfter();
  }

  resolveAfter() {
    this._node
      .classed(this._scale.mapOrientation(), true)
      .classed(this._scale.getName(), true)
      .classed(this._scale.getPosition(), true);

    return this._node;
  }

  resolveBefore(box, data) {
    this._scale.prepare(data);
    this.removeChildren();

    return this.resolveOuter(box, data);
  }

  resolveInner(box, data) {
    const [tick] = this._list;
    const ticks = this._scale.calculateTicks();

    const position = this._scale.mapPosition();

    let distance = null;
    let node = null;
    let value = null;

    for (let i = 0; i < ticks.length; i += 1) {
      [value, distance] = ticks[i];
      node = this.appendChild(box, value, tick);
      node.style(position, Math.floor(distance) + 'px');
    }

    return this.resolveAfter(box, data);
  }
}
