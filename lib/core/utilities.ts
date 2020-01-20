export const isNumber = (n: any): n is number => (
  typeof n === 'number'
  && !isNaN(n)
);

export const isStringOrNumber = (n: any): n is string | number => (
  isNumber(n)
  || typeof n === 'string'
);

export const isStringNumberOrNull = (n: any): n is string | number | null => (
  isStringOrNumber(n)
  || n === null
);

export const isValidArrayIndex = (n: any): n is number => (
  isNumber(n)
  && n >= 0
);

export const isSet = <T>(set: any): set is T => (
  set
  && typeof set.set !== 'object'
  && Array.isArray(set.set) === true
);

export const toString = (n: string | number): string => (
  typeof n === 'number'
    ? n.toString()
    : n
);

export const arrayIsSet = <T>(n: any): n is T[] => (
  typeof n === 'object'
  && Array.isArray(n)
  && n.length > 0
);

export const memo = <T>(func: Function, cache: Map<string, T>) => (...args) => {
  const key = JSON.stringify(args);

  if (cache.has(key)) {
    return cache.get(key);
  }

  const value = func(...args);
  cache.set(key, value);
  return value;
}