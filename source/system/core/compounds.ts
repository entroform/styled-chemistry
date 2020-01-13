import {
  IElementGetterFunctions,
} from '../interfaces/elements';
import {
  ICompoundGetterFunction,
  ICompounds,
  ICompoundSet,
  ICompoundSuperGetterFunction,
  ICompoundSuperSet,
} from '../interfaces/compounds';
import {
  isStringOrNumber,
  isValidArrayIndex,
} from '../utilities';

const createGetterFunctionFromSet =
(elementGetters: IElementGetterFunctions) =>
(compoundSet: ICompoundSet): ICompoundGetterFunction => 
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

const createCompoundGetterFunctionFromSuperSet =
(elementGetters: IElementGetterFunctions) =>
(compoundSuperSet: ICompoundSuperSet): ICompoundSuperGetterFunction  =>
(name: string): ICompoundGetterFunction => (
  createGetterFunctionFromSet(elementGetters)(compoundSuperSet[name])
)

export const createGetterFunctionsFromCompounds =
(elementGetters: IElementGetterFunctions) =>
(compounds: ICompounds) => {
  const result = {};

  Object.keys(compounds).forEach(key => {
    const compound = compounds[key];

    if (Array.isArray(compound.set)) {
      result[key] = createGetterFunctionFromSet(elementGetters)(compound as ICompoundSet);
    } else {
      result[key] = createCompoundGetterFunctionFromSuperSet(elementGetters)(compound as ICompoundSuperSet);
    }
  });

  return result;
}