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
  isSet,
  isStringOrNumber,
  isValidArrayIndex,
} from '../utilities';

const createGetterFunctionFromSet =
(elementGetters: IElementGetterFunctions) =>
(compoundGetters: ICompoundGetterFunctions) =>
(compoundSet: IMixtureSet): IMixtureGetterFunction => 
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

export const createGetterFunctionFromSuperSet =
(elementGetters: IElementGetterFunctions) =>
(compoundGetters: ICompoundGetterFunctions) =>
(mixtureSuperSet: IMixtureSuperSet): IMixtureSuperGetterFunction =>
(name: string): IMixtureGetterFunction => (
  createGetterFunctionFromSet(elementGetters)(compoundGetters)(mixtureSuperSet[name])
)

export const createGetterFunctionsFromMixtures =
(elementGetters: IElementGetterFunctions) =>
(compoundGetters: ICompoundGetterFunctions) =>
(mixtures: IMixtures): IMixtureGetterFunctions => {
  const result = {};
  Object
    .keys(mixtures)
    .forEach(name => {
    const mixture = mixtures[name];
    result[name] = isSet(mixture)
      ? createGetterFunctionFromSet(elementGetters)(compoundGetters)(mixture as IMixtureSet)
      : createGetterFunctionFromSuperSet(elementGetters)(compoundGetters)(mixture as IMixtureSuperSet);
  });
  return result;
}
