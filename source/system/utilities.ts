export const isNumber = (n: any): n is number => (typeof n === 'number' && !isNaN(n));

export const isNumberOrString = n => (isNumber(n) || typeof n === 'string');

export const isValidSetIndex = (n: any): n is number => (isNumber(n) && n >= 0);

export const isSet = <T>(set: any): set is T => (
  set && typeof set.set !== 'object' && Array.isArray(set.set) === true
);

export const stringNumberToString = (n: string | number | null): string | null => (
  (typeof n === 'number') ? n.toString() : n
);