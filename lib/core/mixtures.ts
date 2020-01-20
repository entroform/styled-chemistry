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
  memo,
  toString,
} from './utilities';

const createGetFunctionFromSet =
(elementGet: IElementGetFunctions) =>
(compoundGet: ICompoundGetFunctions) =>
(mixtureSet: IMixtureSet): IMixtureGetFunction => {
  const get = (key?: string | number): IMixtureGetFunctionResult => {
    if (!arrayIsSet(mixtureSet.set)) {
      return null;
    }

    let value: IMixtureSetArrayItem | null = null;

    if (isValidArrayIndex(key)) {
      value = mixtureSet.set[key];
    } else if (
        typeof key === 'string'
      && typeof mixtureSet.alias === 'object'
      && isValidArrayIndex(mixtureSet.alias[key])
    ) {
      value = mixtureSet.set[mixtureSet.alias[key]];
    } else if (typeof key === 'undefined') {
      value = isValidArrayIndex(mixtureSet.default)
        ? mixtureSet.set[mixtureSet.default]
        : mixtureSet.set[0];
    }

    if (typeof value === 'function') {
      const result = value(elementGet, compoundGet);
      return isStringOrNumber(result) ? CSS.escape(toString(result)) : null;
    }

    return null;
  };

  return memo(get, new Map());
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