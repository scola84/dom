import {
  Axis,
  Plot,
  ViewBuilder
} from '../../worker';

import { snippet } from '../../worker';
import { locale } from '../../locale';

export function worker() {
  console.out = (type, wrk, box, data) => {
    if (type === 'fail' && !data.logged) {
      data.logged = true;
      console.error(data);
    }
  };

  ViewBuilder.setup();
  Axis.setup();
  Plot.setup();

  snippet.Print.addStrings(locale);
}
