import DateTime from './datetime';

export default class Month extends DateTime {
  constructor(options) {
    super(options);

    this.setAttributes({
      type: 'month'
    });
  }

  setFormat(value = 'yyyy-MM') {
    this._format = value;
    return this;
  }
}