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
} from './types';

export const isNumber = (n: any): n is number => typeof n === 'number' && !isNaN(n);

export const isNumberOrString = n => (isNumber(n) || typeof n === 'string');

export const isSet = <T>(set: any): set is T => {
  return (
    set
    && typeof set.set !== 'object'
    && Array.isArray(set.set) === true
  );
}

export const createElementGetterFunctionFromSet = (element: IElementSet): IElementGetterFunction => key => {
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

export const createElementGetterFunctionFromSuperSet = (elementSuperSet: IElementSuperSet): IElementSuperGetterFunction => {
  return (name: string): IElementGetterFunction => key => {
    return createElementGetterFunctionFromSet(elementSuperSet[name])(key);
  }
}

export const createGettersFromElements = (elements: IElements): IElementGetterFunctions => {
  return {
    borderWidth:    createElementGetterFunctionFromSet(elements.borderWidths),
    breakpoint:     createElementGetterFunctionFromSet(elements.breakpoints),
    color:          createElementGetterFunctionFromSuperSet(elements.colors),
    fontFamily:     createElementGetterFunctionFromSet(elements.fontFamilies),
    fontSize:       createElementGetterFunctionFromSet(elements.fontSizes),
    fontWeight:     createElementGetterFunctionFromSet(elements.fontWeights),
    letterSpacing:  createElementGetterFunctionFromSet(elements.letterSpacings),
    lineHeight:     createElementGetterFunctionFromSet(elements.lineHeights),
    radius:         createElementGetterFunctionFromSet(elements.radii),
    size:           createElementGetterFunctionFromSet(elements.sizes),
    space:          createElementGetterFunctionFromSet(elements.spaces),
    time:           createElementGetterFunctionFromSet(elements.times),
    timingFunction: createElementGetterFunctionFromSet(elements.timingFunctions),
    zIndex:         createElementGetterFunctionFromSet(elements.zIndices),
  };
}

const map = [
  {
    propName: ['m', 'margin-x'],
    transform: (elementGetters, compoundGetters, ) =>
    cssProperty: 'letter-spacing',
  }
]

export const mapPropsToCssObject = (props) => {

}