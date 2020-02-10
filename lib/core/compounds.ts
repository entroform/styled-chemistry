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
  IStringOrNumber,
} from '../interfaces';

import {
  getSetValueIndex,
  isSet,
  isStringOrNumber,
  isValidArrayIndex,
  isValidArrayWithItems,
  memo,
  toString,
} from './utilities';

const createGetFunctionFromSet =
(elementGet: IElementGetFunctions) =>
(compoundSet: ICompoundSet): ICompoundGetFunction => {
  const get = (key?: IStringOrNumber): ICompoundGetFunctionResult => {
    if (!isValidArrayWithItems(compoundSet.set)) {
      return null;
    }

    const index = getSetValueIndex<ICompoundSet>(compoundSet)(key);

    const value: ICompoundSetArrayItem | null = isValidArrayIndex(index)
      ? compoundSet.set[index]
      : null;

    if (typeof value === 'function') {
      const result = value(elementGet);
      console.log(result);
      return isStringOrNumber(result)
        ? toString(result)
        : null;
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