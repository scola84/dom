import { Action } from './action';

export class Widget extends Action {
  resolve(box, data) {
    const isAllowed = this.isAllowed(box, data);

    if (isAllowed === false) {
      return null;
    }

    if (this._args.length === 0) {
      this.createWidget();
    }

    return this.resolveBefore(box, data);
  }
}
