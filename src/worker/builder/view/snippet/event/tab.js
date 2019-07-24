import { event, select, selectAll } from 'd3';
import { Click } from './click';

export class Tab extends Click {
  handle(box, data, snippet) {
    const node = snippet.node();
    const children = Array.from(node.node().children);
    const tab = children.indexOf(event.target);

    if (tab === box.tab || tab < 0) {
      return false;
    }

    box.tab = tab;

    selectAll(children).classed('selected', false);
    select(children[box.tab]).classed('selected', true);

    this.pass(box, data);

    return false;
  }
}
