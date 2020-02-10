import {
  IElementGetFunction,
  IElementGetFunctions,
  IElements,
  IElementSet,
  IElementSetArrayItem,
  IElementSuperGetFunction,
  IElementSuperSet,
  IStringOrNumber,
} from '../interfaces';

import {
  getSetValueIndex,
  isStringOrNumber,
  isValidArrayWithItems,
  isValidArrayIndex,
  memo,
  toString,
} from './utilities';

const createGetFunctionFromSet = (elementSet: IElementSet): IElementGetFunction => {
  const get = (key?: IStringOrNumber): IElementSetArrayItem => {
    if (!isValidArrayWithItems(elementSet.set)) {
      return null;
    }

    const index = getSetValueIndex<IElementSet>(elementSet)(key);

    const value: IElementSetArrayItem = isValidArrayIndex(index)
      ? elementSet.set[index]
      : null;

    return isStringOrNumber(value) ? toString(value) : null;
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
  borderStyle:    createGetFunctionFromSet(elements.borderStyles),
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