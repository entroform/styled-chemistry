import {
  IElementGetterFunctions,
} from '../interfaces/elements';
import {
  ICompoundGetterFunctions,
} from '../interfaces/compounds';
import {
  IMixtureGetterFunction,
  IMixtureGetterFunctions,
  IMixtures,
  IMixtureSet,
  IMixtureSuperGetterFunction,
  IMixtureSuperSet,
} from '../interfaces/mixtures';
import {
  isValidSetIndex,
  stringNumberToString,
} from '../utilities';

export const createMixtureGetterFunctionFromSet =
(elementGetters: IElementGetterFunctions) =>
(compoundGetters: ICompoundGetterFunctions) =>
(mixture: IMixtureSet): IMixtureGetterFunction =>
(key: string | number | null): string | null => {
  // Return null if set is empty.
  if (mixture.set.length < 1) return null;

  let value: Function | null = null;

  // Set value to element of set if key is valid.
  if (isValidSetIndex(key)) {
    value = mixture[key];
  // Otherwise, check if there is a valid alias.
  } else if (
    typeof key === 'string'
    && mixture.alias
    && mixture.alias[key]
    && isValidSetIndex(mixture.alias[key])
  ) {
    value = mixture.set[mixture.alias[key]];
  // If key is undefined, set value to default or first element in set.
  } else if (typeof key === 'undefined') {
    // If default is set, set default element, if not set first element in set.
    value = isValidSetIndex(mixture.default)
      ? mixture.set[mixture.default]
      : mixture.set[0];
  }

  // If the final value is not valid return null.
  return (typeof value === 'function')
    ? stringNumberToString(value(elementGetters, compoundGetters))
    : null;
}

export const createMixtureGetterFunctionFromSuperSet =
(elementGetters: IElementGetterFunctions) =>
(compoundGetters: ICompoundGetterFunctions) =>
(mixtureSuperSet: IMixtureSuperSet): IMixtureSuperGetterFunction  =>
(name: string): IMixtureGetterFunction => (
  createMixtureGetterFunctionFromSet(elementGetters)(compoundGetters)(mixtureSuperSet[name])
)

export const createGetterFunctionsFromMixtures =
(elementGetters: IElementGetterFunctions) =>
(compoundGetters: ICompoundGetterFunctions) =>
(mixtures: IMixtures): IMixtureGetterFunctions => {
  const result = {};

  Object.keys(mixtures).forEach(key => {
    const mixture = mixtures[key];

    if (Array.isArray(mixture.set)) {
      result[key] = createMixtureGetterFunctionFromSet(elementGetters)(compoundGetters)(mixture as IMixtureSet);
    } else {
      result[key] = createMixtureGetterFunctionFromSuperSet(elementGetters)(compoundGetters)(mixture as IMixtureSuperSet);
    }
  });

  return result;
}