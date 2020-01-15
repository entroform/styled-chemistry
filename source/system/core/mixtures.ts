import {
  ICompoundGetFunctions,
  IElementGetFunctions,
  IMixtureGetFunction,
  IMixtureGetFunctionResult,
  IMixtureGetFunctions,
  IMixtures,
  IMixtureSet,
  IMixtureSetArrayItem,
  IMixtureSuperGetFunction,
  IMixtureSuperSet,
} from '../interfaces';

import {
  arrayIsSet,
  isSet,
  isStringOrNumber,
  isValidArrayIndex,
  toString,
} from '../utilities';

const createGetFunctionFromSet =
(elementGet: IElementGetFunctions) =>
(compoundGet: ICompoundGetFunctions) =>
(compoundSet: IMixtureSet): IMixtureGetFunction => 
(key?: string | number): IMixtureGetFunctionResult => {
  if (!arrayIsSet(compoundSet.set)) return null;

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
    return (isStringOrNumber(result)) ? toString(result) : null;
  }

  return null;
}

const createGetFunctionFromSuperSet =
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