import { Widget } from '../widget';

export class LogControl extends Widget {
  constructor(options = {}) {
    super(options);

    this._level = null;
    this._name = null;

    this.setLevel(options.level);
    this.setName(options.name);
  }

  getLevel() {
    return this._level;
  }

  setLevel(...level) {
    this._level = level;
    return this;
  }

  level(...level) {
    return this.setLevel(...level);
  }

  getName() {
    return this._name;
  }

  setName(...name) {
    this._name = name;
    return this;
  }

  name(...name) {
    return this.setName(...name);
  }

  createWidget() {
    const b = this._builder;

    this.append(
      b.div().class('log col any').append(
        b.row().class('any').append(
          b.div().class('name').append(
            b.input(
              b.select().class('click').attributes({
                name: 'name'
              }).append(
                ...this._name
              )
            ).act((box, data) => {
              this.handleName(box, data);
            }),
            b.div().class('arrow')
          ),
          b.div().class('date').append(
            b.input(
              b.date().wrap().class('click').attributes({
                formnovalidate: 'formnovalidate',
                value: new Date().toISOString().slice(0, 10)
              })
            ).act((box, data) => {
              this.handleBegin(box, data);
            }),
            b.div().class('arrow'),
            b.input(
              b.date().wrap().class('click').attributes({
                formnovalidate: 'formnovalidate',
                value: new Date().toISOString().slice(0, 10)
              })
            ).act((box, data) => {
              this.handleEnd(box, data);
            })
          )
        ),
        b.row().class('any').append(
          b.div().class('action').append(
            b.button().class('click icon ion-ios-download')
          ),
          b.tab(
            b.div().class('tab').append(
              ...this._level
            )
          ).act((box, data) => {
            this.handleLevel(box, data);
          })
        )
      )
    );
  }

  handleName(box, data) {
    box.control = box.control || {};
    box.control.name = box.input;

    delete box.input;

    this.pass(box, data);
  }

  handleBegin(box, data) {
    box.control = box.control || {};
    box.control.begin = box.input;

    delete box.input;

    this.pass(box, data);
  }

  handleEnd(box, data) {
    box.control = box.control || {};
    box.control.end = box.input;

    delete box.input;

    this.pass(box, data);
  }

  handleLevel(box, data) {
    const tab = this._level[box.tab];

    let level = tab.resolveAttribute(box, data, 'value');
    level = level || tab;

    box.control = box.control || {};
    box.control.level = level;

    delete box.input;

    this.pass(box, data);
  }
}
