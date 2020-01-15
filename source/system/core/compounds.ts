import {
  ICompoundGetFunction,
  ICompoundGetFunctions,
  ICompounds,
  ICompoundSet,
  ICompoundSetArrayItem,
  ICompoundSuperGetFunction,
  ICompoundSuperSet,
  IElementGetFunctions,
} from '../interfaces';

import {
  isSet,
  isStringOrNumber,
  isValidArrayIndex,
} from '../utilities';

const createGetFunctionFromSet =
(elementGetters: IElementGetFunctions) =>
(compoundSet: ICompoundSet): ICompoundGetFunction => 
(key?: string | number | null): string | number | null => {
  if (compoundSet.set.length < 1) {
    return null;
  }

  let value: ICompoundSetArrayItem | null = null;

  if (isValidArrayIndex(key)) {
    value = compoundSet[key];
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
    const result = value(elementGetters);
    return (isStringOrNumber(result)) ? result : null;
  }

  return null;
}

const createCompoundGetFunctionFromSuperSet =
(elementGetters: IElementGetFunctions) =>
(compoundSuperSet: ICompoundSuperSet): ICompoundSuperGetFunction =>
(name: string): ICompoundGetFunction => (
  createGetFunctionFromSet(elementGetters)(compoundSuperSet[name])
);

export const createGetFunctionsFromCompounds =
(elementGetters: IElementGetFunctions) =>
(compounds: ICompounds): ICompoundGetFunctions => (
  Object
    .keys(compounds)
    .reduce((accumulator, name) => {
      const compound = compounds[name];
      accumulator[name] = isSet<ICompoundSet>(compound)
        ? createGetFunctionFromSet(elementGetters)(compound)
        : createCompoundGetFunctionFromSuperSet(elementGetters)(compound);
      return accumulator;
    }, {})
);