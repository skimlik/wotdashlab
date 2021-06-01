export class CollectionUtils {
  public static caseInsensitiveCompare<T>(a: T, b: T, fieldSelector: (item: T) => string): number {
    return CollectionUtils.caseInsensitiveStringCompare(fieldSelector(a), fieldSelector(b));
  }

  public static caseInsensitiveStringCompare(a: string, b: string): number {
    const str1 = a || '';
    const str2 = b || '';
    return str1.localeCompare(str2, [], <Intl.CollatorOptions>{
      sensitivity: 'base'
    });
  }

  public static toDictionary<TItem, TValue>(
    items: TItem[],
    keySelector: (item: TItem) => number | string,
    valueSelector: (item: TItem) => TValue): { [key: number]: TValue } {
    if (!items) {
      return null;
    }
    return items.reduce((pv, cv) => {
      pv[keySelector(cv)] = valueSelector(cv);
      return pv;
    }, {});
  }
}
