import {
  isNumber,
  isInteger,
  isStringOrNumber,
  isStringNumberOrNull,
  isValidArrayIndex,
} from '../lib/core/utilities';

describe('isNumber', () => {
  it(`should return true if a number is given`, () => {
    expect(isNumber(0)).toBeTruthy();
    expect(isNumber(123)).toBeTruthy();
    expect(isNumber(123.4)).toBeTruthy();
    expect(isNumber(-123)).toBeTruthy();
  });

  it(`should return false if not a number is given`, () => {
    expect(isNumber('123')).toBeFalsy();
    expect(isNumber('hello')).toBeFalsy();
    expect(isNumber(NaN)).toBeFalsy();
    expect(isNumber(null)).toBeFalsy();
    expect(isNumber(undefined)).toBeFalsy();
    expect(isNumber()).toBeFalsy();
  });
});

describe('isInteger', () => {
  it(`should return true if an integer is given`, () => {
    expect(isInteger(0)).toBeTruthy();
    expect(isInteger(123)).toBeTruthy();
    expect(isInteger(-123)).toBeTruthy();
  });

  it(`should return false if not an integer is given`, () => {
    expect(isInteger(123.4)).toBeFalsy();
    expect(isInteger('123')).toBeFalsy();
    expect(isInteger('hello')).toBeFalsy();
    expect(isInteger(NaN)).toBeFalsy();
    expect(isInteger(null)).toBeFalsy();
    expect(isInteger(undefined)).toBeFalsy();
    expect(isInteger()).toBeFalsy();
  });
});

describe('isStringOrNumber', () => {
  it(`should return true if a string or number is given`, () => {
    expect(isStringOrNumber(123)).toBeTruthy();
    expect(isStringOrNumber(123.4)).toBeTruthy();
    expect(isStringOrNumber(-123)).toBeTruthy();
    expect(isStringOrNumber('')).toBeTruthy();
    expect(isStringOrNumber('abc')).toBeTruthy();
    expect(isStringOrNumber('123')).toBeTruthy();
  });

  it(`should return false if not a number or string is given`, () => {
    expect(isStringOrNumber(NaN)).toBeFalsy();
    expect(isStringOrNumber(null)).toBeFalsy();
    expect(isStringOrNumber(undefined)).toBeFalsy();
    expect(isStringOrNumber()).toBeFalsy();
  });
});

describe('isStringNumberOrNull', () => {
  it(`should return true if a string, number, or null is given`, () => {
    expect(isStringNumberOrNull(123)).toBeTruthy();
    expect(isStringNumberOrNull(123.4)).toBeTruthy();
    expect(isStringNumberOrNull(-123)).toBeTruthy();
    expect(isStringNumberOrNull('')).toBeTruthy();
    expect(isStringNumberOrNull('abc')).toBeTruthy();
    expect(isStringNumberOrNull('123')).toBeTruthy();
    expect(isStringNumberOrNull(null)).toBeTruthy();
  });

  it(`should return false if not a string, number, or null is given`, () => {
    expect(isStringNumberOrNull(NaN)).toBeFalsy();
    expect(isStringNumberOrNull(undefined)).toBeFalsy();
    expect(isStringNumberOrNull()).toBeFalsy();
  });
});

describe('isValidArrayIndex', () => {
  it(`should return true if an integer greater or equal to zero is given`, () => {
    expect(isValidArrayIndex(0)).toBeTruthy();
    expect(isValidArrayIndex(10)).toBeTruthy();
  });

  it(`should return false if not an integer greater or equal to zero is given`, () => {
    expect(isValidArrayIndex(-10)).toBeFalsy();
    expect(isValidArrayIndex(123.123)).toBeFalsy();
    expect(isValidArrayIndex(NaN)).toBeFalsy();
    expect(isValidArrayIndex(undefined)).toBeFalsy();
    expect(isValidArrayIndex()).toBeFalsy();
  });
});