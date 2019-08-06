import { Widget } from '../widget';

export class GetList extends Widget {
  buildWidget(args) {
    const b = this._builder;

    const resource = '/api' + this._name.map((name, index) => {
      return `/${name}` +
        (index < this._name.length - 1 ? `/%(${name}_id)s` : '');
    }).join('');

    return b.request().resource(
      `GET ${resource}?{count,offset,search}`
    ).indicator(
      b.selector('.loading')
    ).act(
      ...args
    ).err(
      b.selector('.message')
    );
  }
}
