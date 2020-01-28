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
  IStringOrNumber,
} from '../interfaces';

import {
  isValidArrayWithItems,
  getSetValueIndex,
  isSet,
  isStringOrNumber,
  memo,
  toString,
} from './utilities';

const createGetFunctionFromSet =
(elementGet: IElementGetFunctions) =>
(compoundGet: ICompoundGetFunctions) =>
(mixtureSet: IMixtureSet): IMixtureGetFunction => {
  const get = (key?: IStringOrNumber): IMixtureGetFunctionResult => {
    if (!isValidArrayWithItems(mixtureSet.set)) {
      return null;
    }

    const index = getSetValueIndex<IMixtureSet>(mixtureSet)(key);
    const value: IMixtureSetArrayItem | null = index
      ? mixtureSet.set[index]
      : null;

    if (typeof value === 'function') {
      const result = value(elementGet, compoundGet);
      return isStringOrNumber(result)
        ? toString(result)
        : null;
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