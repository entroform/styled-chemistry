import {
  IElementGetterFunctions, IElementGetterFunction,
} from '../interfaces/elements';
import {
  ICompoundSet,
  ICompoundGetterFunction,
  ICompoundSuperGetterFunction,
  ICompoundSuperSet,
  ICompounds,
} from '../interfaces/compounds';
import {
  isValidSetIndex,
  stringNumberToString,
} from '../utilities';

export const createCompoundGetterFunctionFromSet =
(elementGetters: IElementGetterFunctions) =>
(compound: ICompoundSet): ICompoundGetterFunction => 
(key: string | number | null): string | null => {
  // Return null if set is empty.
  if (compound.set.length < 1) return null;

  let value: Function | null = null;

  // Set value to element of set if key is valid.
  if (isValidSetIndex(key)) {
    value = compound[key];
  // Otherwise, check if there is a valid alias.
  } else if (
    typeof key === 'string'
    && compound.alias
    && compound.alias[key]
    && isValidSetIndex(compound.alias[key])
  ) {
    value = compound.set[compound.alias[key]];
  // If key is undefined, set value to default or first element in set.
  } else if (typeof key === 'undefined') {
    // If default is set, set default element, if not set first element in set.
    value = isValidSetIndex(compound.default)
      ? compound.set[compound.default]
      : compound.set[0];
  }

  // If the final value is not valid return null.
  return (typeof value === 'function')
    ? stringNumberToString(value(elementGetters))
    : null;
}

export const createCompoundGetterFunctionFromSuperSet =
  (elementGetters: IElementGetterFunctions) =>
  (compoundSuperSet: ICompoundSuperSet): ICompoundSuperGetterFunction  =>
  (name: string): ICompoundGetterFunction => createCompoundGetterFunctionFromSet(elementGetters)(compoundSuperSet[name])

export const createGetterFunctionsFromCompounds =
(elementGetters: IElementGetterFunctions) =>
(compounds: ICompounds) => {
  const result = {};

  Object.keys(compounds).forEach(key => {
    const compound = compounds[key];

    if (Array.isArray(compound.set)) {
      result[key] = createCompoundGetterFunctionFromSet(elementGetters)(compound as ICompoundSet);
    } else {
      result[key] = createCompoundGetterFunctionFromSuperSet(elementGetters)(compound as ICompoundSuperSet);
    }
  });

  return result;
}