import {
  IElementGetFunction,
  IElementGetFunctions,
  IElements,
  IElementSet,
  IElementSetArrayItem,
  IElementSuperGetFunction,
  IElementSuperSet,
} from '../interfaces';

import {
  arrayIsSet,
  isStringOrNumber,
  isValidArrayIndex,
  memo,
} from './utilities';

const createGetFunctionFromSet =
(elementSet: IElementSet): IElementGetFunction => {
  const get = (key?: string | number): IElementSetArrayItem => {
    if (!arrayIsSet(elementSet.set)) {
      return null;
    }

    let value: IElementSetArrayItem = null;

    if (isValidArrayIndex(key)) {
      value = elementSet.set[key];
    } else if (
        typeof key === 'string'
      && typeof elementSet.alias === 'object'
      && isValidArrayIndex(elementSet.alias[key])
    ) {
      value = elementSet.set[elementSet.alias[key]];
    } else if (typeof key === 'undefined') {
      value = isValidArrayIndex(elementSet.default)
        ? elementSet.set[elementSet.default]
        : elementSet.set[0];
    }

    return isStringOrNumber(value) ? value : null;
  }

  return memo(get, new Map());
}

const createGetFunctionFromSuperSet =
(elementSuperSet: IElementSuperSet): IElementSuperGetFunction =>
(name: string): IElementGetFunction => (
  createGetFunctionFromSet(elementSuperSet[name])
);

export const createGetFunctionsFromElements =
(elements: IElements): IElementGetFunctions => ({
  borderWidth:    createGetFunctionFromSet(elements.borderWidths),
  breakpoint:     createGetFunctionFromSet(elements.breakpoints),
  color:          createGetFunctionFromSuperSet(elements.colors),
  fontFamily:     createGetFunctionFromSet(elements.fontFamilies),
  fontSize:       createGetFunctionFromSet(elements.fontSizes),
  fontWeight:     createGetFunctionFromSet(elements.fontWeights),
  image:          createGetFunctionFromSet(elements.images),
  letterSpacing:  createGetFunctionFromSet(elements.letterSpacings),
  lineHeight:     createGetFunctionFromSet(elements.lineHeights),
  opacity:        createGetFunctionFromSet(elements.opacities),
  radius:         createGetFunctionFromSet(elements.radii),
  size:           createGetFunctionFromSet(elements.sizes),
  space:          createGetFunctionFromSet(elements.spaces),
  time:           createGetFunctionFromSet(elements.times),
  timingFunction: createGetFunctionFromSet(elements.timingFunctions),
  zIndex:         createGetFunctionFromSet(elements.zIndices),
});