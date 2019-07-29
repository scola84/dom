import merge from 'lodash-es/merge';
import { Widget } from '../widget';

export class LogControl extends Widget {
  constructor(options = {}) {
    super(options);

    this._action = null;
    this._begin = null;
    this._end = null;
    this._mode = null;
    this._name = null;
    this._storage = null;

    this.setAction(options.action);
    this.setBegin(options.begin);
    this.setEnd(options.end);
    this.setMode(options.mode);
    this.setName(options.name);
    this.setStorage(options.storage);
  }

  getAction() {
    return this._action;
  }

  setAction(...action) {
    this._action = action;
    return this;
  }

  getBegin() {
    return this._begin;
  }

  setBegin(value = new Date().toISOString().slice(0, 10)) {
    this._begin = value;
    return this;
  }

  getEnd() {
    return this._end;
  }

  setEnd(value = new Date().toISOString().slice(0, 10)) {
    this._end = value;
    return this;
  }

  getMode() {
    return this._mode;
  }

  setMode(...mode) {
    this._mode = mode;
    return this;
  }

  getName() {
    return this._name;
  }

  setName(...name) {
    this._name = name;
    return this;
  }

  getStorage() {
    return this._storage;
  }

  setStorage(value = localStorage) {
    this._storage = value;
    return this;
  }

  action(...action) {
    return this.setAction(...action);
  }

  begin(value) {
    return this.setBegin(value);
  }

  end(value) {
    return this.setEnd(value);
  }

  mode(...mode) {
    return this.setMode(...mode);
  }

  name(...name) {
    return this.setName(...name);
  }

  storage(value) {
    return this.setStorage(value);
  }

  createWidget() {
    const b = this._builder;

    this.append(
      b.div().class('log-control').append(
        b.col().class('any').append(
          b.row().class('any').append(
            b.div().class('name').append(
              b.input(
                b.select().class('click').attributes({
                  name: 'name'
                }).append(
                  ...this._name
                )
              ).act((box, data) => {
                this.handleInput(box, data);
              })
            ),
            b.div().class('range').append(
              b.input(
                b.date().wrap().attributes({
                  formnovalidate: 'formnovalidate',
                  name: 'begin',
                  required: 'required'
                })
              ).act((box, data) => {
                this.handleInput(box, data);
              }),
              b.div().class('arrow'),
              b.input(
                b.date().wrap().attributes({
                  formnovalidate: 'formnovalidate',
                  name: 'end',
                  required: 'required'
                })
              ).act((box, data) => {
                this.handleInput(box, data);
              })
            )
          ),
          b.row().class('any').append(
            b.div().class('action').append(
              ...this._action
            ),
            b.tab().id('mode').append(
              b.div().class('tab mode').append(
                ...this._mode
              )
            ).act((box, data) => {
              this.handleInput(box, data);
            })
          )
        )
      )
    );
  }

  resolveAfter(box, data) {
    this.load(box, data);
    this.read(box, data);
  }

  handleInput(box, data) {
    this.read(box, data);
    this.save(box, data);
    this.pass(box, data);
  }

  load() {
    const control = JSON.parse(
      this._storage.getItem('control-' + this._id) || '{}'
    );

    const [snippet] = this._args;
    const node = snippet.node();

    if (control.mode) {
      node
        .selectAll('.tab *')
        .classed('selected', false);

      node
        .select(`.tab *[value=${control.mode}]`)
        .classed('selected', true);
    }

    if (control.name) {
      node
        .select('select')
        .property('value', control.name);
    }

    node
      .select('input[name=begin]')
      .property('value', control.begin || this._begin);

    node
      .select('input[name=end]')
      .property('value', control.end || this._end);
  }

  read(box) {
    const [snippet] = this._args;
    const node = snippet.node();

    const mode = node
      .select('.tab .selected')
      .property('value');

    const name = node
      .select('select')
      .property('value');

    const begin = node
      .select('input[name=begin]')
      .property('value');

    const end = node
      .select('input[name=end]')
      .property('value');

    merge(box, {
      control: {
        mode,
        name,
        begin,
        end
      }
    });
  }

  save(box) {
    this._storage.setItem(
      'control-' + this._id,
      JSON.stringify(box.control)
    );
  }
}
