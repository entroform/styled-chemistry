// 1) Maintain consistency and scalibility.
// 2) Create responsivity yet maintaining.
const DEBUG_MODE = false;

interface ElementSet {
  readonly set: [string | number];
  readonly default: number;
  readonly alias?: {
    [name: string]: number;
  };
  readonly transform?: (value: string | number) => string;
}

interface ElementSuperSet {
  readonly [name: string]: ElementSet;
}

interface ThemeElements {
  fontFamilies: ElementSet;
  fontSizes: ElementSet;
  fontWeights: ElementSet;
  letterSpacings: ElementSet;
  lineHeights: ElementSet;
  colors: ElementSuperSet;
  spaces: ElementSet;
  radii: ElementSet;
  borderStyles: ElementSet;
  borderWidths: ElementSet;
  breakpoints: ElementSet;
  zIndices: ElementSet;
  sizes: ElementSet;
}

interface ThemeCompounds {
  [setName: string]: {
    [name: string]: string;
  }
}

interface Theme {
  elements: ThemeElements;
  compounds: ThemeCompounds;
}

export const isNumber = (n: any): n is number => typeof n === 'number' && !isNaN(n);

export const isElementSet = (styleSet: ElementSet): styleSet is ElementSet => {
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

export const getValueFromElementSet = (styleSet: ElementSet) => (key: string | number): string | null => {
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

export const getValueFromElementSuperSet = (styleSuperSet: ElementSuperSet) => (name: string) => (key: string | number) => {
  if (isElementSet(styleSuperSet[name])) {
    return getValueFromElementSet(styleSuperSet[name])(key);
  }
  return null;
}

export const ThemeAtomicSystem = atoms => {
  // Getters
  const getters = {
    fontFamily:  getValueFromElementSet(atoms.fontFamilies),
    fontSize:  getValueFromElementSet(atoms.fontSizes),
    fontWeight:  getValueFromElementSet(atoms.fontWeights),
    letterSpacing:  getValueFromElementSet(atoms.letterSpacings),
    lineHeight:  getValueFromElementSet(atoms.lineHeights),
    color:  getValueFromElementSuperSet(atoms.colors),
    space: getValueFromElementSet(atoms.spaces),
    radii: getValueFromElementSet(atoms.radii),
    borderWidth: getValueFromElementSet(atoms.borderWidths),
    zIndices:  getValueFromElementSet(atoms.zIndices),
  }

  return {
    getters,
  };
}

export const ThemeMolecularSystem = maps => molecules => {

}

const helpers = {

}

// Props Helpers