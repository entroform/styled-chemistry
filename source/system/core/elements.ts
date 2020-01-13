import {
  IElementGetterFunction,
  IElementGetterFunctions,
  IElements,
  IElementSet,
  IElementSuperGetterFunction,
  IElementSuperSet,
  IElementValue,
} from '../interfaces/elements';
import {
  isNumber,
  isValidSetIndex,
  stringNumberToString,
} from '../utilities';

export const createElementGetterFunctionFromSet =
(element: IElementSet): IElementGetterFunction =>
(key: string | number): string | null => {
  // Return null if set is empty.
  if (element.set.length < 1) return null;

  let value: IElementValue = null;

  // Set value to element of set if key is valid.
  if (isValidSetIndex(key)) {
    value = element.set[key];
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

  if (typeof value === 'string' || isNumber(value)) {
    return (typeof element.transform === 'function')
      ? stringNumberToString(element.transform(value))
      : stringNumberToString(value);
  }

  return null;
}

export const createElementGetterFunctionFromSuperSet =
(elementSuperSet: IElementSuperSet): IElementSuperGetterFunction =>
(name: string): IElementGetterFunction => createElementGetterFunctionFromSet(elementSuperSet[name]);

export const createGetterFunctionsFromElements =
(elements: IElements): IElementGetterFunctions => ({
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
});
