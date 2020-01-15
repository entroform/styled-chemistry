import {
  ICompoundGetFunctions,
  IElementGetFunctions,
  IMixtureGetFunction,
  IMixtureGetFunctions,
  IMixtures,
  IMixtureSet,
  IMixtureSuperGetFunction,
  IMixtureSuperSet,
} from '../interfaces';

import {
  isSet,
  isStringOrNumber,
  isValidArrayIndex,
} from '../utilities';

const createGetFunctionFromSet =
(elementGetters: IElementGetFunctions) =>
(compoundGetters: ICompoundGetFunctions) =>
(compoundSet: IMixtureSet): IMixtureGetFunction => 
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
    const result = value(elementGetters)(compoundGetters);
    return (isStringOrNumber(result)) ? result : null;
  }

  return null;
}

export const createGetFunctionFromSuperSet =
(elementGetters: IElementGetFunctions) =>
(compoundGetters: ICompoundGetFunctions) =>
(mixtureSuperSet: IMixtureSuperSet): IMixtureSuperGetFunction =>
(name: string): IMixtureGetFunction => (
  createGetFunctionFromSet(elementGetters)(compoundGetters)(mixtureSuperSet[name])
)

export const createGetFunctionsFromMixtures =
(elementGetters: IElementGetFunctions) =>
(compoundGetters: ICompoundGetFunctions) =>
(mixtures: IMixtures): IMixtureGetFunctions => {
  const result = {};
  Object
    .keys(mixtures)
    .forEach(name => {
    const mixture = mixtures[name];
    result[name] = isSet(mixture)
      ? createGetFunctionFromSet(elementGetters)(compoundGetters)(mixture as IMixtureSet)
      : createGetFunctionFromSuperSet(elementGetters)(compoundGetters)(mixture as IMixtureSuperSet);
  });
  return result;
}
