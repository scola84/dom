import { Node } from '../node';

export class Form extends Node {
  constructor(options) {
    super(options);

    this
      .attributes({
        novalidate: 'novalidate'
      })
      .name('form');
  }
}
