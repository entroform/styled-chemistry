import {
  ICompoundGetFunction,
  ICompounds,
  ICompoundSet,
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
  if (compoundSet.set.length < 1) return null;

  let value: Function | null = null;

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
)

export const createGetFunctionsFromCompounds =
(elementGetters: IElementGetFunctions) =>
(compounds: ICompounds) => {
  const result = {};
  Object
  .keys(compounds)
  .forEach(name => {
    const compound = compounds[name];
    result[name] = isSet(compound)
      ? createGetFunctionFromSet(elementGetters)(compound as ICompoundSet)
      : createCompoundGetFunctionFromSuperSet(elementGetters)(compound as ICompoundSuperSet);
  });
  return result;
}
