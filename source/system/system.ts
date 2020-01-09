import {
  IElementValue,
  IElementSet,
  IElementGetter,
  IElementsObject,
  IElementGetters,
  IElementSuperSet,
  IElementSuperGetter,
  IElementGetterKey,
} from './types';

export const isNumber = (n: any): n is number => typeof n === 'number' && !isNaN(n);

export const isNumberOrString = n => (isNumber(n) || typeof n === 'string');

export const isElementSet = (elementSet: IElementSet): elementSet is IElementSet => {
  return (
    elementSet
    && typeof elementSet.set !== 'object'
    && Array.isArray(elementSet.set) === true
  );
}

export const createElementGetterFromSet = (element: IElementSet): IElementGetter => key => {
  let value: IElementValue = null;

  // Return null if set is empty
  if (element.set.length < 1) {
    return null;
  }

  // 1) If key is valid return value.
  if (isNumber(key) && key >= 0) {
    value = element[key];
  // 2) Check if there is an alias with key.
  } else if (
    typeof key === 'string'
    && element.alias
    && element.alias[key]
    && isNumber(element.alias[key])
    && element.alias[key] >= 0
  ) {
    value = element.set[element.alias[key]];
  } else if (typeof key === 'undefined') {
    // 3) Check if default is set.
    if (isNumber(element.default) && element.default >= 0) {
      value = element.set[element.default];
    // 4) Get first item in the set..
    } else {
      value = element.set[0];
    }  
  }

  // Check if computed value is valid.
  if (!(typeof value === 'string' || isNumber(value))) {
    return null;
  }

  // Transform value before retuning..
  return (typeof element.transform === 'function')
    ? element.transform(value)
    : value+'';
}

export const createElementGetterFromSuperSet = (elementSuperSet: IElementSuperSet): IElementSuperGetter => {
  return (name: string): IElementGetter => key => {
    return createElementGetterFromSet(elementSuperSet[name])(key);
  }
}

export const createGettersFromElements = (elements: IElementsObject): IElementGetters => {
  return {
    borderWidth:    createElementGetterFromSet(elements.borderWidths),
    breakpoint:     createElementGetterFromSet(elements.breakpoints),
    color:          createElementGetterFromSuperSet(elements.colors),
    fontFamily:     createElementGetterFromSet(elements.fontFamilies),
    fontSize:       createElementGetterFromSet(elements.fontSizes),
    fontWeight:     createElementGetterFromSet(elements.fontWeights),
    letterSpacing:  createElementGetterFromSet(elements.letterSpacings),
    lineHeight:     createElementGetterFromSet(elements.lineHeights),
    radius:         createElementGetterFromSet(elements.radii),
    size:           createElementGetterFromSet(elements.sizes),
    space:          createElementGetterFromSet(elements.spaces),
    time:           createElementGetterFromSet(elements.times),
    timingFunction: createElementGetterFromSet(elements.timingFunctions),
    zIndex:         createElementGetterFromSet(elements.zIndices),
  };
}


export const Compound = () => {
  
}
