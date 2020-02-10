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
} from '../interfaces';

import {
  isStringNumberOrNull,
  isStringOrNumber,
  isValidArrayWithItems,
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

// superSet: array
// set: IStringOrNumber

export const PROPS_TO_STYLE_MAP_DEFAULT_CONFIG: IPropsToStyleMapConfig = {
  enableBreakpointMapping: true,
  mediaRule: a => `@media only screen and (min-width: ${a})`,
};

// Handle leaf nodes.

// Helpers

const isSuperSetFunctionValueArray = (value?: any): value is ISuperSetGetFunctionValue => (
  Array.isArray(value)
  && value.length === 2
  && typeof value[0] === 'string'
  && isStringNumberOrNull(value[1])
);

const mapStylePropertiesToValue =
(styleProperties: string[]) =>
(value: IStringNumberOrNull): IStringOrNull => (
  isStringOrNumber(value)
    ? styleProperties.map(property => `${property}: ${value};`).join(`\n`)
    : null
);

const computePropValueWithSuperSetGetFunction =
(get: ISuperSetGetFunction) =>
(value: unknown): IStringOrNull => {
  let result: IStringNumberOrNull = null;

  if (isSuperSetFunctionValueArray(value)) {
    result = isStringOrNumber(value[1])
      ? get(value[0])(value[1])
      : get(value[0])();
  } else if (typeof value === 'string') {
    result = get(value)();
  }

  return (result !== null) ? toString(result) : null;
}

const computePropValueWithSetGetFunction =
(get: ISetGetFunction) =>
(value: unknown): IStringOrNull => {
  const result = isStringOrNumber(value) ? get(value) : get();
  return (result !== null) ? toString(result) : null;
}

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
  let compute = a => a;

  mapSetting = mapSetting as IPropToStyleSettingWithSetGetFunction | IPropToStyleSettingWithSuperSetGetFunction;

  if (typeof mapSetting.get === 'function') {
    compute = (
      'isSuperSet' in mapSetting
      && typeof mapSetting.isSuperSet === 'boolean'
      && mapSetting.isSuperSet
    )
      ? computePropValueWithSuperSetGetFunction(mapSetting.get)
      : computePropValueWithSetGetFunction(mapSetting.get as ISetGetFunction);
  }

  return (value: (ISuperSetGetFunctionValue | IStringOrNull)[]): IStringOrNull[] => {
    const result = Array.from(value).map(a => compute(a));
    // Map style properties to result values.
    return mapSetting.styleProperties
      ? result.map(mapStylePropertiesToValue(mapSetting.styleProperties))
      : result;
  }
}

// Two input types:
// [string, IStringOrNumber]
// IStringOrNumber
// Should return an array of computed styles.
const mapPropToStyle = (mapSetting: IPropToStyleSetting) => {
  let compute = a => a;

  mapSetting = mapSetting as IPropToStyleSettingWithSetGetFunction | IPropToStyleSettingWithSuperSetGetFunction;

  if (typeof mapSetting.get === 'function') {
    compute = mapSetting.isSuperSet 
      ? computePropValueWithSuperSetGetFunction(mapSetting.get)
      : computePropValueWithSetGetFunction(mapSetting.get as ISetGetFunction);
  }

  return (value: IStringOrNumber[] | IStringOrNumber | null) => (
    mapSetting.styleProperties
      ? mapStylePropertiesToValue(mapSetting.styleProperties)(compute(value))
      : compute(value)
  );
}

// It all comes down to this:
export const createStyleProps =
(config: IPropsToStyleMapConfig = PROPS_TO_STYLE_MAP_DEFAULT_CONFIG) =>
(map: IPropsToStyleMap) =>
(theme: ITheme) =>
(props: any) => {
  const mapArray = map(theme);

  let breakpointsAreAvailable: boolean = isValidArrayWithItems<IStringOrNumber>(props.breakpoints);

  // If enable breakpoints mapping: resolve breakpoints.
  if (
    config.enableBreakpointMapping
    && breakpointsAreAvailable
  ) {
    const resolvedBreakpoints: IStringOrNumber[] = props.breakpoints
      .map(b => theme.elements.breakpoint(b) || b)
      .sort();

    const styleValues = mapArray
      .reduce((result, setting) => {
        setting.propNames.forEach(name => {
          typeof props[name] !== 'undefined'
            && result.push(mapPropToStyleWithBreakpoints(setting)(props[name]));
        });
        return result;
      }, [] as IStringOrNull[][]);

    // Combine and reduce breakpoints and styleValues.
    let result = styleValues
      .map(style => style[0])
      .join(`\n`);

    resolvedBreakpoints.forEach((breakpoint, index) => {
      if (isStringOrNumber(breakpoint)) {
        const style = styleValues
          .map(style => style[index + 1])
          .join(`\n`);

        if (style.trim()) {
          result += `
            ${config.mediaRule(toString(breakpoint))} {
              ${style}
            }
          `;
        }
      }
    });
    return result;
  }

  // Loop through map object.
  return mapArray
    .reduce((result, setting) => {
        setting.propNames.forEach(name => {
          typeof props[name] !== 'undefined'
            && result.push(mapPropToStyle(setting)(props[name]));
        });
        return result;
      }, [] as IStringOrNull[])
    .join(`\n`);
}
