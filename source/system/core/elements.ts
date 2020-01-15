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
  isStringOrNumber,
  isValidArrayIndex,
} from '../utilities';

const createGetFunctionFromSet =
(elementSet: IElementSet): IElementGetFunction =>
(key?: string | number): IElementSetArrayItem => {
  if (elementSet.set.length < 1) {
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

  return (isStringOrNumber(value)) ? value : null;
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
  radius:         createGetFunctionFromSet(elements.radii),
  size:           createGetFunctionFromSet(elements.sizes),
  space:          createGetFunctionFromSet(elements.spaces),
  time:           createGetFunctionFromSet(elements.times),
  timingFunction: createGetFunctionFromSet(elements.timingFunctions),
  zIndex:         createGetFunctionFromSet(elements.zIndices),
});