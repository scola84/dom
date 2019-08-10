import { Url, createBrowser } from '@scola/http';
import { Worker } from '@scola/worker';
import defaults from 'lodash-es/defaultsDeep';
import sprintf from 'sprintf-js';
import { Action } from '../action';

export class Request extends Action {
  constructor(options = {}) {
    super(options);

    this._client = null;
    this._indicator = null;
    this._merge = null;
    this._resource = null;

    this.setClient(options.client);
    this.setIndicator(options.indicator);
    this.setMerge(options.merge);
    this.setResource(options.resource);
  }

  getOptions() {
    return Object.assign(super.getOptions(), {
      client: this._client,
      indicator: this._indicator,
      merge: this._merge,
      resource: this._resource
    });
  }

  getClient() {
    return this._client;
  }

  setClient(value = null) {
    this._client = value;
    return this;
  }

  client(value) {
    return this.setClient(value);
  }

  getIndicator() {
    return this._indicator;
  }

  setIndicator(value = null) {
    this._indicator = value;
    return this;
  }

  indicator(value) {
    return this.setIndicator(value);
  }

  getMerge() {
    return this._merge;
  }

  setMerge(value = (box, data) => data.data) {
    this._merge = value;
    return this;
  }

  merge(value) {
    return this.setMerge(value);
  }

  getResource() {
    return this._resource;
  }

  setResource(value = null) {
    this._resource = value;
    return this;
  }

  resource(value) {
    return this.setResource(value);
  }

  resolveAfter(box, data) {
    if (this._client === null) {
      this._client = createBrowser();
    }

    let options = this.resolveValue(box, data, this._resource);

    if (typeof options === 'string') {
      let [
        method,
        url = null
      ] = options.split(' ');

      if (url === null) {
        url = method;
        method = void 0;
      }

      url = sprintf.sprintf(
        this.expand(url),
        Object.assign({}, box.params, box.list)
      );

      url = Url.parse(
        url.replace(/undefined/g, '')
      );

      options = {
        method,
        url: {
          path: url.path,
          query: url.query
        }
      };
    }

    options = defaults({}, options, {
      extra: {
        box
      },
      url: {
        hostname: window.location.hostname,
        port: window.location.port,
        query: {},
        scheme: window.location.protocol.slice(0, -1)
      }
    });

    this._client.transformer.connect(new Worker({
      act: (b, result) => {
        this._client.transformer.setDownstream(null);
        this.pass(box, this._merge(box, result));
      },
      err: (b, error) => {
        this._client.transformer.setDownstream(null);
        this.fail(box, error);
      }
    }));

    this._client.connector.handle(options, data, (event) => {
      this.resolveValue(box, event, this._indicator);
    });
  }
}
