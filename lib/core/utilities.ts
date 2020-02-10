import {
  ISet,
  IStringNumberOrNull,
  IStringOrNumber,
} from '../interfaces';

export const isNumber = (value?: any): value is number => (
  typeof value === 'number' && !isNaN(value)
);

export const isInteger = (value?: any): value is number => {
  return isNumber(value) && value % 1 === 0;
};

export const isStringOrNumber = (value?: any): value is IStringOrNumber => (
  isNumber(value) || typeof value === 'string'
);

export const isStringNumberOrNull = (value?: any): value is IStringNumberOrNull => (
  isStringOrNumber(value) || value === null
);

export const isValidArrayIndex = (value?: any): value is number => (
  isInteger(value) && value >= 0
);

export const isSet = <T>(set?: any): set is T => (
  set
  && 'set' in set
  && typeof set.set === 'object'
  && Array.isArray(set.set)
);

export const aliasIsSet = <T extends ISet<any>>(set: T) => (key: any): key is string => (
  typeof key === 'string'
  && 'alias' in set
  && typeof set.alias === 'object'
  && isValidArrayIndex(set.alias[key])
);

export const getSetValueIndex = <T extends ISet<any>>(set: T) =>
(key?: IStringOrNumber): number | null => {
  if (isValidArrayIndex(key)) {
    return key;
  } else if (aliasIsSet<T>(set)(key)) {
    return set.alias![key];
  } else if (typeof key === 'undefined') {
    return isValidArrayIndex(set.default) ? set.default : 0;
  }

  return null;
}

export const toString = (value: IStringOrNumber): string => (
  isNumber(value) ? value.toString() : value
);

export const toArray = <T>(value: any): T[] => Array.isArray(value) ? value : [value];

export const isValidArrayWithItems = <T>(value: any): value is T[] => (
  typeof value === 'object' && Array.isArray(value) && value.length > 0
);

export const memo = <T>(fn: Function, cache: Map<string, T>) => (...args) => {
  const key = JSON.stringify(args);

  if (cache.has(key)) {
    return cache.get(key);
  }

  const value = fn(...args);

  cache.set(key, value);

  return value;
}