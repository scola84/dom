import { Widget } from '../widget';

export class PostObject extends Widget {
  buildWidget() {
    const b = this._builder;

    const [
      object,
      link
    ] = this._name;

    let resource = `/api/${object}/%(${object}_id)s`;
    let view = `view-${object}:{${object}_id}@main:clr`;

    if (link) {
      resource += `/${link}`;
      view = '@main:his';
    }

    return b.request().resource(
      `POST ${resource}`
    ).indicator(
      b.selector('.progress')
    ).act(
      b.route().view('@self:clr'),
      b.route().view(view)
    ).err(
      b.selector('.message'),
      b.selector('.body .hint')
    );
  }
}
