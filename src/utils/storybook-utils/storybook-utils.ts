/**
 * @ref https://stackoverflow.com/a/70687493
 * Use in `meta={argTypes:{yourField:{options:enumToOptionsNonKeyed(yourEnum)}}}`
 * Use with keyed enums like `enum TestNumberEnum {banana, strawberry}`
 * Use `enumToOptionsNonKeyed` for keyed enums
 * @param v
 * @returns
 */
export function enumToOptionsNonKeyed(v: Object) {
  return Object.entries(v)
    .filter(([, value]) => typeof value !== 'string')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}

/**
 * Use in `meta={argTypes:{yourField:{options:enumToOptions(yourEnum)}}}`
 * Use with non-keyed enums like `enum TestStringEnum{'banana'='Banana','strawberry'='Strawberry'}`
 * Use `enumToOptionsNonKeyed` for non-keyed enums
 * @param en
 * @returns
 */
export function enumToOptionsKeyed(en: object): any[] {
  return Object.values(en);
}
