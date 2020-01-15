import {
  ICompoundGetFunctions,
  IElementGetFunctions,
  IMixtureGetFunction,
  IMixtureGetFunctions,
  IMixtures,
  IMixtureSet,
  IMixtureSetArrayItem,
  IMixtureSuperGetFunction,
  IMixtureSuperSet,
} from '../interfaces';

import {
  isSet,
  isStringOrNumber,
  isValidArrayIndex,
} from '../utilities';

const createGetFunctionFromSet =
(elementGet: IElementGetFunctions) =>
(compoundGet: ICompoundGetFunctions) =>
(compoundSet: IMixtureSet): IMixtureGetFunction => 
(key?: string | number | null): string | number | null => {
  if (compoundSet.set.length < 1) {
    return null;
  }

  let value: IMixtureSetArrayItem | null = null;

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
    const result = value(elementGet, compoundGet);
    return (isStringOrNumber(result)) ? result : null;
  }

  return null;
}

export const createGetFunctionFromSuperSet =
(elementGet: IElementGetFunctions) =>
(compoundGet: ICompoundGetFunctions) =>
(mixtureSuperSet: IMixtureSuperSet): IMixtureSuperGetFunction =>
(name: string): IMixtureGetFunction => (
  createGetFunctionFromSet(elementGet)(compoundGet)(mixtureSuperSet[name])
);

export const createGetFunctionsFromMixtures =
(elementGet: IElementGetFunctions) =>
(compoundGet: ICompoundGetFunctions) =>
(mixtures: IMixtures): IMixtureGetFunctions => (
  Object
    .keys(mixtures)
    .reduce((accumulator, name) => {
      const mixture = mixtures[name];
      accumulator[name] = isSet<IMixtureSet>(mixture)
        ? createGetFunctionFromSet(elementGet)(compoundGet)(mixture)
        : createGetFunctionFromSuperSet(elementGet)(compoundGet)(mixture);
      return accumulator;
    }, {})
);