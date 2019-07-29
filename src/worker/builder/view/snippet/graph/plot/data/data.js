export class Data {
  constructor(options = {}) {
    this._filter = null;
    this._endogenous = null;
    this._exogenous = null;
    this._position = null;

    this.setFilter(options.filter);
    this.setEndogenous(options.endogenous);
    this.setExogenous(options.exogenous);
    this.setPosition(options.position);
  }

  getOptions() {
    return Object.assign(super.getOptions(), {
      filter: this._filter,
      endogenous: this._endogenous,
      exogenous: this._exogenous,
      position: this._position
    });
  }

  getFilter() {
    return this._filter;
  }

  setFilter(value = () => true) {
    this._filter = value;
    return this;
  }

  getEndogenous() {
    return this._endogenous;
  }

  setEndogenous(value = null) {
    this._endogenous = value;
    return this;
  }

  getExogenous() {
    return this._exogenous;
  }

  setExogenous(value = null) {
    this._exogenous = value;
    return this;
  }

  getPosition() {
    return this._position;
  }

  setPosition(value = []) {
    this._position = value;
    return this;
  }

  addPosition(value) {
    this._position[this._position.length] = value;
    return this;
  }

  bottom() {
    return this.addPosition('bottom');
  }

  filter(value) {
    return this.setFilter(value);
  }

  left() {
    return this.addPosition('left');
  }

  right() {
    return this.addPosition('right');
  }

  top() {
    return this.addPosition('top');
  }

  exogenous(value) {
    return this.setExogenous(value);
  }

  endogenous(value) {
    return this.setEndogenous(value);
  }

  prepare(data) {
    const result = {
      data: {},
      keys: [],
      type: null
    };

    data = data.filter(this._filter);

    for (let i = 0; i < data.length; i += 1) {
      this.prepareValue(result, data[i]);
    }

    return result;
  }

  prepareValue() {}
}
