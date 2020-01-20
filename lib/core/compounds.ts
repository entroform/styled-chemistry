import {
  ICompoundGetFunction,
  ICompoundGetFunctionResult,
  ICompoundGetFunctions,
  ICompounds,
  ICompoundSet,
  ICompoundSetArrayItem,
  ICompoundSuperGetFunction,
  ICompoundSuperSet,
  IElementGetFunctions,
} from '../interfaces';

import {
  arrayIsSet,
  isSet,
  isStringOrNumber,
  isValidArrayIndex,
  memo,
  toString,
} from './utilities';

const createGetFunctionFromSet =
(elementGet: IElementGetFunctions) =>
(compoundSet: ICompoundSet): ICompoundGetFunction => {
  const get = (key?: string | number): ICompoundGetFunctionResult => {
    if (!arrayIsSet(compoundSet.set)) {
      return null;
    }

    let value: ICompoundSetArrayItem | null = null;

    if (isValidArrayIndex(key)) {
      value = compoundSet.set[key];
    } else if (
        typeof key === 'string'
      && typeof compoundSet.alias === 'object'
      && isValidArrayIndex(compoundSet.alias[key])
    ) {
      value = compoundSet.set[compoundSet.alias[key]];
    } else if (typeof key === 'undefined') {
      value = isValidArrayIndex(compoundSet.default)
        ? compoundSet.set[compoundSet.default]
        : compoundSet.set[0];
    }

    if (typeof value === 'function') {
      const result = value(elementGet);
      return isStringOrNumber(result) ? toString(result) : null;
    }

    return null;
  };

  return memo(get, new Map());
}

const createCompoundGetFunctionFromSuperSet =
(elementGet: IElementGetFunctions) =>
(compoundSuperSet: ICompoundSuperSet): ICompoundSuperGetFunction =>
(name: string): ICompoundGetFunction => (
  createGetFunctionFromSet(elementGet)(compoundSuperSet[name])
);

export const createGetFunctionsFromCompounds =
(elementGet: IElementGetFunctions) =>
(compounds: ICompounds): ICompoundGetFunctions => (
  Object
    .keys(compounds)
    .reduce((accumulator, name) => {
      const compound = compounds[name];
      accumulator[name] = isSet<ICompoundSet>(compound)
        ? createGetFunctionFromSet(elementGet)(compound)
        : createCompoundGetFunctionFromSuperSet(elementGet)(compound);
      return accumulator;
    }, {})
);