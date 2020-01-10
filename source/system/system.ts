import {
  IElementValue,
  IElementSet,
  IElementGetterFunction,
  IElements,
  IElementGetterFunctions,
  IElementSuperSet,
  IElementSuperGetterFunction,
  IElementGetterFunctionKey,
  ICompounds,
  ICompoundGetterFunction,
} from './types';

export const isNumber = (n: any): n is number => (typeof n === 'number' && !isNaN(n));

export const isNumberOrString = n => (isNumber(n) || typeof n === 'string');

export const isValidSetIndex = (n: any): n is number => (isNumber(n) && n >= 0);

export const isSet = <T>(set: any): set is T => (
  set && typeof set.set !== 'object' && Array.isArray(set.set) === true
);


// Elements

export const createGetterFunctionFromElementSet = (element: IElementSet): IElementGetterFunction => key => {
  // Return null if set is empty.
  if (element.set.length < 1) return null;

  let value: IElementValue = null;

  // Set value to element of set if key is valid.
  if (isValidSetIndex(key)) {
    value = element[key];
  // Otherwise, check if there is a valid alias.
  } else if (
    typeof key === 'string'
    && element.alias
    && element.alias[key]
    && isValidSetIndex(element.alias[key])
  ) {
    value = element.set[element.alias[key]];
  // If key is undefined, set value to default or first element in set.
  } else if (typeof key === 'undefined') {
    // If default is set, set default element, if not set first element in set.
    value = isValidSetIndex(element.default)
      ? element.set[element.default]
      : element.set[0];
  }

  // If the final value is not valid return null.
  if (typeof value === 'string' || isNumber(value)) {
    return (typeof element.transform === 'function')
      ? element.transform(value)
      : value+'';
  } else {
    return null;
  }
}

export const createGetterFunctionFromElementSuperSet =
  (elementSuperSet: IElementSuperSet): IElementSuperGetterFunction =>
  (name: string): IElementGetterFunction =>
  key => {
    return createGetterFunctionFromElementSet(elementSuperSet[name])(key);
  }

export const createGetterFunctionsFromElements = (elements: IElements): IElementGetterFunctions => {
  return {
    borderWidth:    createGetterFunctionFromElementSet(elements.borderWidths),
    breakpoint:     createGetterFunctionFromElementSet(elements.breakpoints),
    color:          createGetterFunctionFromElementSuperSet(elements.colors),
    fontFamily:     createGetterFunctionFromElementSet(elements.fontFamilies),
    fontSize:       createGetterFunctionFromElementSet(elements.fontSizes),
    fontWeight:     createGetterFunctionFromElementSet(elements.fontWeights),
    letterSpacing:  createGetterFunctionFromElementSet(elements.letterSpacings),
    lineHeight:     createGetterFunctionFromElementSet(elements.lineHeights),
    radius:         createGetterFunctionFromElementSet(elements.radii),
    size:           createGetterFunctionFromElementSet(elements.sizes),
    space:          createGetterFunctionFromElementSet(elements.spaces),
    time:           createGetterFunctionFromElementSet(elements.times),
    timingFunction: createGetterFunctionFromElementSet(elements.timingFunctions),
    zIndex:         createGetterFunctionFromElementSet(elements.zIndices),
  };
}

// Compounds
export const createGetterFunctionFromCompoundSet =
  (elementGetters: IElementGetterFunctions) =>
  (compound: ICompound): ICompoundGetterFunction => 
  key => {
    // Return null if set is empty.
    if (compound.set.length < 1) return null;

    let value = null;

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
    return (typeof value === 'function') ? value(elementGetters) : null;
  }

export const createGetterFunctionFromCompoundSuperSet =
  (compoundSuperSet) =>
  (name: string) => createGetterFunctionFromCompoundSet(compoundSuperSet[name])

export const createGetterFunctionsFromCompounds = (compounds: ICompounds) => {
  const result = {};
  Object.keys(compounds).forEach(key => {
    const compound = compounds[key];

    if (Array.isArray(compound.set)) {
      result[key] = createGetterFunctionFromCompoundSet(compound);
    } else {
      result[key] = createGetterFunctionFromCompoundSuperSet(compound);
    }
  });

  return result;
}