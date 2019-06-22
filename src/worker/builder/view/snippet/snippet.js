let id = 0;

export class Snippet {
  constructor(options = {}) {
    this._builder = null;
    this._id = null;
    this._list = null;
    this._permission = null;

    this.setBuilder(options.builder);
    this.setId(options.id);
    this.setList(options.list);
    this.setPermission(options.permission);
  }

  clone() {
    const options = this.getOptions();

    options.list = options.list.map((snippet) => {
      return snippet.clone();
    });

    return new this.constructor(options);
  }

  getOptions() {
    return {
      builder: this._builder,
      id: this._id,
      list: this._list,
      permission: this._permission
    };
  }

  getBuilder() {
    return this._builder;
  }

  setBuilder(value = null) {
    this._builder = value;
    return this;
  }

  getId() {
    return this._id;
  }

  setId(value = ++id) {
    this._id = value;
    return this;
  }

  getList() {
    return this._list;
  }

  setList(value = []) {
    this._list = value;
    return this;
  }

  getPermission() {
    return this._permission;
  }

  setPermission(value = null) {
    this._permission = value;
    return this;
  }

  id(value) {
    return this.setId(value);
  }

  permission(value) {
    return this.setPermission(value);
  }

  append(...list) {
    this._list = this._list.concat(list);
    return this;
  }

  find(compare) {
    const result = [];

    if (compare(this) === true) {
      result[result.length] = this;
    }

    return this.findRecursive(result, this._list, compare);
  }

  findRecursive(result, list, compare) {
    let snippet = null;

    for (let i = 0; i < list.length; i += 1) {
      snippet = list[i];

      if (snippet.find) {
        result = result.concat(snippet.find(compare));
      }
    }

    return result;
  }

  isPermitted(box, data) {
    return this.resolveValue(box, data, this._permission);
  }

  remove() {
    this.removeBefore();
  }

  removeAfter() {}

  removeBefore() {
    this.removeOuter();
  }

  removeInner() {
    for (let i = 0; i < this._list.length; i += 1) {
      this._list[i].remove();
    }

    this.removeAfter();
  }

  removeOuter() {
    this.removeInner();
  }

  resolve(box, data) {
    const isPermitted = this.isPermitted(box, data);

    if (isPermitted === false) {
      return null;
    }

    return this.resolveBefore(box, data);
  }

  resolveAfter() {}

  resolveBefore(box, data) {
    return this.resolveOuter(box, data);
  }

  resolveInner(box, data) {
    return this.resolveAfter(box, data);
  }

  resolveOuter(box, data) {
    return this.resolveInner(box, data);
  }

  resolveValue(box, data, value) {
    if (value === null || typeof value === 'undefined') {
      return value;
    }

    if (typeof value === 'function') {
      return this.resolveValue(box, data, value(box, data));
    }

    if (typeof value.resolve === 'function') {
      return this.resolveValue(box, data, value.resolve(box, data));
    }

    return value;
  }

  resolveObject(box, data, object, name) {
    object = this.resolveValue(box, data, object);
    return this.resolveValue(box, data, object[name]);
  }
}