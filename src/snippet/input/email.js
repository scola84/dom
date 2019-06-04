import Input from '../input';
const regexp = /^[a-z0-9\-()]+$/i;

export default class Email extends Input {
  constructor(options = {}) {
    super(options);

    this
      .setAttributes({
        type: 'email'
      })
      .setName('input');
  }

  checkDomain(domain) {
    return domain.split('.').every((part) => {
      return regexp.test(part) === true &&
        part[0] !== '-' &&
        part[part.length - 1] !== '-';
    });
  }

  cleanAfter(box, data, name, value) {
    this.set(data, name, String(value).trim().toLowerCase());
  }

  validateBefore(box, data, error, name, value) {
    if (value.match(/\s/) !== null) {
      this.throwError(value, 'space');
    }

    const [
      local = '',
      domain = ''
    ] = value
      .trim()
      .split('@');

    if (local.length === 0) {
      this.throwError(value, 'local');
    }

    if (domain.length === 0 || this.checkDomain(domain) === false) {
      this.throwError(value, 'domain');
    }
  }
}
