import {
  IPropsToStyleMap,
  IPropsToStyleMapConfig,
  IPropToStyleSetting,
  IPropToStyleSettingWithSetGetFunction,
  IPropToStyleSettingWithSuperSetGetFunction,
  ISetGetFunction,
  IStringNumberOrNull,
  IStringOrNull,
  IStringOrNumber,
  ISuperSetGetFunction,
  ISuperSetGetFunctionValue,
  ITheme,
  IPropsToStyleMapArray,
} from '../interfaces';

import {
  isStringNumberOrNull,
  isStringOrNumber,
  isValidArrayWithItems,
  toArray,
  toString,
} from './utilities';

// Example Input

// 1.
// <div color={['red', 0]} />

// 2.
// <div
//   breakpoints={['xs', 's', 'm']}
//   color={[['red', 0], 'red', 0]}
// />

// 3.
// <div
//   breakpoints={['xs', 's']}
//   color={[['red', 0]]}
// />

// set: IStringOrNumber
// superSet: array

export const PROPS_TO_STYLE_MAP_DEFAULT_CONFIG: IPropsToStyleMapConfig = {
  enableBreakpointMapping: true,
  mediaRule: a => `@media only screen and (min-width: ${a})`,
};


// Helpers
const isSuperSetFunctionValueArray = (value?: any): value is ISuperSetGetFunctionValue => (
  Array.isArray(value)
  && value.length === 2
  && typeof value[0] === 'string'
  && isStringNumberOrNull(value[1])
);

const mapStylePropertiesToCSSRules = (styleProperties: string[]) => (value: IStringNumberOrNull): IStringOrNull => (
  isStringOrNumber(value)
    ? styleProperties
        .map(property => `${property}: ${value};`)
        .join(`\n`)
    : null
);

const computePropValueWithSuperSetGetFunction = (get: ISuperSetGetFunction) => (value: unknown): IStringOrNull => {
  const result: IStringNumberOrNull = isSuperSetFunctionValueArray(value)
    ? isStringOrNumber(value[1])
      ? get(value[0])(value[1])
      : get(value[0])()
    : typeof value === 'string'
      ? get(value)()
      : null;

  return result !== null
    ? toString(result)
    : null;
}

const computePropValueWithSetGetFunction = (get: ISetGetFunction) => (value: unknown): IStringOrNull => {
  const result = isStringOrNumber(value)
    ? get(value)
    : get();

  return (result !== null)
    ? toString(result)
    : null;
}


const mapSettingIsSuperSet = (mapSetting: IPropToStyleSetting): mapSetting is IPropToStyleSettingWithSuperSetGetFunction => (
  'isSuperSet' in mapSetting
  && typeof mapSetting.isSuperSet === 'boolean'
  && mapSetting.isSuperSet === true
);

// Two input types for mapPropToStyleWithBreakpoints
// superSet
// - [IStringOrNull, [string, IStringOrNumber | null]]
// - IStringOrNull
// set
// - [IStringOrNumber, IStringOrNumber]
// - IStringOrNumber
// Should return an array with arrays of computed styles.

// Two input types for mapPropToStyle
// superSet
// - [string, IStringOrNumber]
// - string
// set
// - IStringOrNumber
// Should return an array of computed styles.
const mapPropToStyleWithBreakpoints = (mapSetting: IPropToStyleSetting) => {
  const compute = mapSettingHasGetFunction(mapSetting)
    ? mapSettingIsSuperSet(mapSetting)
      ? computePropValueWithSuperSetGetFunction(mapSetting.get)
      : computePropValueWithSetGetFunction(mapSetting.get)
    : a => a;

  return (value: (ISuperSetGetFunctionValue | IStringOrNull)[]): IStringOrNull[] => {
    const result = toArray(value).map(a => compute(a));
    // Map style properties to result values.
    return mapSetting.styleProperties
      ? result.map(mapStylePropertiesToCSSRules(mapSetting.styleProperties))
      : result;
  }
}

const mapSettingHasGetFunction = (mapSetting: IPropToStyleSetting): mapSetting is IPropToStyleSettingWithSetGetFunction | IPropToStyleSettingWithSuperSetGetFunction => (
  'get' in mapSetting && typeof mapSetting.get === 'function'
);

// Two input types:
// [string, IStringOrNumber]
// IStringOrNumber
// Should return an array of computed styles.
const mapPropToStyle = (mapSetting: IPropToStyleSetting) => {
  const compute = mapSettingHasGetFunction(mapSetting)
    ? mapSettingIsSuperSet(mapSetting)
      ? computePropValueWithSuperSetGetFunction(mapSetting.get)
      : computePropValueWithSetGetFunction(mapSetting.get)
    : a => a;

  return (value: IStringOrNumber[] | IStringOrNumber | null) => (
    mapSetting.styleProperties
      ? mapStylePropertiesToCSSRules(mapSetting.styleProperties)(compute(value))
      : compute(value)
  );
}

const createStylePropsWithBreakpointMapping =
(config: IPropsToStyleMapConfig = PROPS_TO_STYLE_MAP_DEFAULT_CONFIG) =>
(mapArray: IPropsToStyleMapArray) =>
(theme: ITheme) =>
(props: any) => {
  const resolvedBreakpoints: IStringOrNumber[] = props.breakpoints
    .map(b => theme.elements.breakpoint(b) || b)
    .sort();

  const styleValues = mapArray
    .reduce(
      (result, setting) => {
        setting.propNames.forEach(name => {
          typeof props[name] !== 'undefined'
            && result.push(mapPropToStyleWithBreakpoints(setting)(props[name]));
        });

        return result;
      },
      [] as IStringOrNull[][]
    );

  // Combine and reduce breakpoints and styleValues.
  return resolvedBreakpoints.reduce(
    (result, breakpoint, index) => {
      if (isStringOrNumber(breakpoint)) {
        const style = styleValues
          .map(style => style[index + 1])
          .join(`\n`);

        result += style.trim()
          ? `
              ${config.mediaRule(toString(breakpoint))} {
                ${style}
              }
            `
          : '';
      }

      return result;
    },
    styleValues
      .map(style => style[0])
      .join(`\n`)
  );
}

const createStylePropsWIthoutBreakpointMapping =
(mapArray: IPropsToStyleMapArray) =>
(props: any) => (
  mapArray
    .reduce(
      (result, setting) => {
        setting.propNames.forEach(name => {
          typeof props[name] !== 'undefined'
            && result.push(mapPropToStyle(setting)(props[name]));
        });

        return result;
      },
      [] as IStringOrNull[]
    )
    .join(`\n`)
);

// It all comes down to this:
export const createStyleProps =
(config: IPropsToStyleMapConfig = PROPS_TO_STYLE_MAP_DEFAULT_CONFIG) =>
(map: IPropsToStyleMap) =>
(theme: ITheme) =>
(props: any) => (
  config.enableBreakpointMapping && isValidArrayWithItems<IStringOrNumber>(props.breakpoints)
    ? createStylePropsWithBreakpointMapping(config)(map(theme))(theme)(props)
    : createStylePropsWIthoutBreakpointMapping(map(theme))(props)
);
