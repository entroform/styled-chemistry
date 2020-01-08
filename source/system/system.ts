// 1) Maintain consistency and scalibility.
// 2) Create responsivity yet maintaining.

const DEBUG_MODE = false;

interface StyleSet {
  readonly set: [string | number];
  readonly default: number;
  readonly alias?: {
    [name: string]: number;
  };
  readonly transform?: (value: string | number) => string;
}

interface StyleSuperSet {
  readonly [name: string]: StyleSet;
}

export const isNumber = (n: any): n is number => typeof n === 'number' && !isNaN(n);

export const isStyleSet = (styleSet: StyleSet): styleSet is StyleSet => {
  return (
    styleSet
    && typeof styleSet.set !== 'object'
    && Array.isArray(styleSet.set) === true
    && (
         typeof styleSet.default === 'number'
      || typeof styleSet.default === 'string'
    )
  );
}

export const getValueFromStyleSet = (styleSet: StyleSet) => (key: string | number): string | null => {
  let value: string | number | null = null;

  // Return null if set is empty
  if (styleSet.set.length < 1) {
    return null;
  }

  // 1) Check if key is valid.
  if (typeof key === 'number' && key >= 0) {
    value = styleSet[key];
  // 2) Check alias...
  } else if (
    typeof key === 'string'
    && styleSet.alias
    && styleSet.alias[key]
    && typeof styleSet.alias[key] === 'number'
    && styleSet.alias[key] >= 0
  ) {
    value = styleSet.set[styleSet.alias[key]];
  // 3) Check default...
  } else if (typeof styleSet.default === 'number' && styleSet.default >= 0) {
    value = styleSet.set[styleSet.default];
  // 4) Get first item in the set..
  } else {
    value = styleSet.set[0];
  }

  // Check if computed value is valid.
  if (!(typeof value === 'string' || typeof value === 'number')) {
    return null;
  }

  // Transform value before retuning..
  return (typeof styleSet.transform === 'function')
    ? styleSet.transform(value)
    : value+'';
}

export const getValueFromStyleSuperSet = (styleSuperSet: StyleSuperSet) => (name: string) => (key: string | number) => {
  if (isStyleSet(styleSuperSet[name])) {
    return getValueFromStyleSet(styleSuperSet[name])(key);
  }
  return null;
}

export const StyleSystem = theme => {
  // Getters
  const getters = {
    getFontFamily:  getValueFromStyleSet(theme.fontFamilies),
    getFontSize:  getValueFromStyleSet(theme.fontSizes),
    getFontWeight:  getValueFromStyleSet(theme.fontWeights),
    getLetterSpacing:  getValueFromStyleSet(theme.letterSpacings),
    getLineHeight:  getValueFromStyleSet(theme.lineHeights),
    getColor:  getValueFromStyleSuperSet(theme.colors),
  }

  return {
    getters,
  };
}