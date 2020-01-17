import {
  ITheme,
} from '../interfaces';

import {
  IPropsToStyleMapConfig,
  IPropToStyleSetting,
  ISuperSetGetFunctionValue,
  ISuperSetGetFunction,
  ISetGetFunction,
  IPropsToStyleMap,
} from './interfaces';

import {
  arrayIsSet,
  isStringOrNumber,
  toString,
} from '../utilities';

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
// set: string | number

export const propsToStyleMapDefaultConfig: IPropsToStyleMapConfig = {
  enableBreakpointMapping: true,
  mediaRule: a => `@media only screen and (min-width: ${a})`,
};

// Handl Leaf nodes.


// Helpers

const isSuperSetFunctionValueArray = (value: any): value is ISuperSetGetFunctionValue => (
  Array.isArray(value)
  && value.length === 2
  && typeof value[0] === 'string'
  && (
       typeof value[1] === 'string'
    || typeof value[1] === 'number'
    || value[1] === null
  )
);

const mapStylePropertiesToValue =
(styleProperties: string[]) =>
(value: string | number | null): string | null => (
  isStringOrNumber(value)
    ? styleProperties.map(property => `${property}: ${value};`).join(`\n`)
    : null
);

const computePropValueWithSuperSetGetFunction =
(get: ISuperSetGetFunction) =>
(value: unknown): string | null => {
  let result: string | number | null = null;

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
(value: unknown): string | null => {
  const result = isStringOrNumber(value) ? get(value) : get();
  return (result !== null) ? toString(result) : null;
}

// Two input types for mapPropToStyleWithBreakpoints
// superSet
// - [string | null, [string, string | number | null]]
// - string | null
// set
// - [string | number, string | number]
// - string | number
// Should return an array with arrays of computed styles.

// Two input types for mapPropToStyle
// superSet
// - [string, string | number]
// - string
// set
// - string | number
// Should return an array of computed styles.
const mapPropToStyleWithBreakpoints =
(mapSetting: IPropToStyleSetting) => {
  const compute = mapSetting.isSuperSet
    ? computePropValueWithSuperSetGetFunction(mapSetting.get)
    : computePropValueWithSetGetFunction(mapSetting.get);
  return (value: (ISuperSetGetFunctionValue | string | null)[]): (string | null)[] => {
    const _value = Array.isArray(value) ? value : [value];
    let result = _value.map(a => compute(a));
    // Map style properties to result values.
    if (mapSetting.styleProperties) {
      const mapStyleProperties = mapStylePropertiesToValue(mapSetting.styleProperties);
      result = result.map(mapStyleProperties);
    }
    return result;
  }
}

// Two input types:
// [string, string | number]
// string | number
// Should return an array of computed styles.
const mapPropToStyle =
(mapSetting: IPropToStyleSetting) => {
  const compute = mapSetting.isSuperSet
    ? computePropValueWithSuperSetGetFunction(mapSetting.get)
    : computePropValueWithSetGetFunction(mapSetting.get);
  return (value: (string | number)[] | string | number | null) => {
    let result = compute(value);

    if (mapSetting.styleProperties) {
      const mapStyleProperties = mapStylePropertiesToValue(mapSetting.styleProperties);
      result = mapStyleProperties(result);
    }

    return result;
  }
}

// It all comes down to this:
export const mapPropsToStyles =
(config: IPropsToStyleMapConfig) =>
(map: IPropsToStyleMap) =>
(theme: ITheme) =>
(props: any) => {
  const mapArray = map(theme);

  let breakpointsAreAvailable: boolean = arrayIsSet<string | number>(props.breakpoints);

  // If enable breakpoints mapping: resolve breakpoints.
  if (
    config.enableBreakpointMapping
    && breakpointsAreAvailable
  ) {
    const resolvedBreakpoints: (string | number)[] = props.breakpoints
      .map(b => theme.elements.breakpoint(b) || b)
      .sort();

    const styleValues = mapArray
      .reduce((result, setting) => {
        setting.propNames.forEach(name => {
          if (typeof props[name] !== 'undefined') {
            result.push(mapPropToStyleWithBreakpoints(setting)(props[name]));
          }  
        });
        return result;
      }, [] as (string | null)[][]);
    
    // Combine and reduce breakpoints and styleValues.
    let result = styleValues.map(style => style[0]).join(`\n`);
    resolvedBreakpoints.forEach((breakpoint, index) => {
      if (isStringOrNumber(breakpoint)) {
        const style = styleValues.map(style => style[index + 1]).join(`\n`);
        if (style.trim()) {
          result += `
            ${config.mediaRule(toString(breakpoint))} {
              ${style}
            }
          `;
        }
      }
    });
    console.log(result);
    return result;
  } else {
    // Loop through map object.
    return mapArray
      .reduce((result, setting) => {
        setting.propNames.forEach(name => {
          if (typeof props[name] !== 'undefined') {
            result.push(mapPropToStyle(setting)(props[name]));
          }  
        });
        return result;
      }, [] as (string | null)[])
      .join(`\n`);
  }
}
