import {
  IElementGetterFunction,
  IElementGetterFunctions,
  IElements,
  IElementSet,
  IElementSetArrayItem,
  IElementSuperGetterFunction,
  IElementSuperSet,
} from '../interfaces/elements';
import {
  isStringOrNumber,
  isValidArrayIndex,
} from '../utilities';

const createGetterFunctionFromSet =
(elementSet: IElementSet): IElementGetterFunction =>
(key?: string | number): IElementSetArrayItem => {
  if (elementSet.set.length < 1) return null;

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

const createGetterFunctionFromSuperSet =
(elementSuperSet: IElementSuperSet): IElementSuperGetterFunction =>
(name: string): IElementGetterFunction => (
  createGetterFunctionFromSet(elementSuperSet[name])
);

export const createGetterFunctionsFromElements =
(elements: IElements): IElementGetterFunctions => ({
  borderWidth:    createGetterFunctionFromSet(elements.borderWidths),
  breakpoint:     createGetterFunctionFromSet(elements.breakpoints),
  color:          createGetterFunctionFromSuperSet(elements.colors),
  fontFamily:     createGetterFunctionFromSet(elements.fontFamilies),
  fontSize:       createGetterFunctionFromSet(elements.fontSizes),
  fontWeight:     createGetterFunctionFromSet(elements.fontWeights),
  image:          createGetterFunctionFromSet(elements.images),
  letterSpacing:  createGetterFunctionFromSet(elements.letterSpacings),
  lineHeight:     createGetterFunctionFromSet(elements.lineHeights),
  radius:         createGetterFunctionFromSet(elements.radii),
  size:           createGetterFunctionFromSet(elements.sizes),
  space:          createGetterFunctionFromSet(elements.spaces),
  time:           createGetterFunctionFromSet(elements.times),
  timingFunction: createGetterFunctionFromSet(elements.timingFunctions),
  zIndex:         createGetterFunctionFromSet(elements.zIndices),
});
