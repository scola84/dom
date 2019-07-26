import { event } from 'd3';
import { Axis } from './axis';
import { Parent } from '../parent';
import { map } from './plot/';

export class Plot extends Parent {
  static setup() {
    Plot.attachFactories(Plot, { map });
  }

  constructor(options = {}) {
    super(options);

    this._data = null;
    this.setData(options.data);

    this.class('transition');
  }

  getData() {
    return this._data;
  }

  setData(value = null) {
    this._data = value;
    return this;
  }

  data(value) {
    return this.setData(value(this));
  }

  appendTip(box, data, node, tip) {
    if (tip === null) {
      return;
    }

    node
      .on('mouseover.scola-plot', () => {
        data.target = event.target;
        this.resolveValue(box, data, tip.setParent(null));
      })
      .on('mouseout.scola-plot', () => {
        tip.remove();
      });
  }

  findScale(type) {
    const position = this._data.getPosition();

    const [axis] = this._builder
      .selector((snippet) => {
        if ((snippet instanceof Axis) === false) {
          return false;
        }

        const scale = snippet.getScale();

        return position.indexOf(scale.getPosition()) > -1 &&
          scale.getType() === type;
      })
      .resolve();

    return axis.getScale();
  }

  prepare(data) {
    return this._data.prepare(data);
  }

  removeInner() {
    this.removeChildren();
    this.removeAfter();
  }

  resolveBefore(box, data) {
    this.removeChildren();
    return this.resolveOuter(box, data);
  }
}
