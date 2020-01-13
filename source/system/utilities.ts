export const isNumber = (n: any): n is number => (typeof n === 'number' && !isNaN(n));

export const isStringOrNumber = (n: any): n is string | number => (isNumber(n) || typeof n === 'string');

export const isValidArrayIndex = (n: any): n is number => (isNumber(n) && n >= 0);

export const isSet = <T>(set: any): set is T => (
  set
  && typeof set.set !== 'object'
  && Array.isArray(set.set) === true
);

export const toString = (n: string | number): string => (
  (typeof n === 'number') ? n.toString() : n
);
