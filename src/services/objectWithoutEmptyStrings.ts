export function objectWithoutEmptyStrings(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
}
