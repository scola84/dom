export function s(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }

  return String(value);
}
