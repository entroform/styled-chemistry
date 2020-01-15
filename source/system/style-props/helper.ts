import {
  ICompoundGetFunction,
  ICompoundSuperGetFunction,
  IElementGetFunction,
  IElementSuperGetFunction,
  IMixtureGetFunction,
  IMixtureSuperGetFunction,
  ITheme,
} from '../interfaces';

import {
  isStringOrNumber,
  arrayIsSet,
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

type ISetGetFunction = IElementGetFunction | ICompoundGetFunction | IMixtureGetFunction;
type ISuperSetGetFunction = IElementSuperGetFunction | ICompoundSuperGetFunction | IMixtureSuperGetFunction;

interface IPropToStyle {
  styleProperties?: string[];
}

interface IPropToStyleWithSuperSetGetFunction extends IPropToStyle {
  getter: ISuperSetGetFunction;
  isSuperSet: true;
}

interface IPropToStyleWithSetGetFunction extends IPropToStyle {
  getter: ISetGetFunction;
  isSuperSet?: false;
}

type IPropToStyleSetting = IPropToStyleWithSuperSetGetFunction | IPropToStyleWithSetGetFunction;

interface IPropsToStyleMapObject {
  [propName: string]: IPropToStyleSetting;
}

interface IPropsToStyleMap {
  (theme: ITheme): IPropsToStyleMapObject;
}

interface IPropsToStyleMapConfig {
  enableBreakpointMapping: boolean;
  mediaRule: (a: string) => string;
}

const propsToStyleMapDefaultConfig: IPropsToStyleMapConfig = {
  enableBreakpointMapping: true,
  mediaRule: a => `@media only screen and (minWidth=${a})`,
};

const propsToStyleSpaceMap: IPropsToStyleMap = theme => ({
  m: {
    getter: theme.elements.space,
    styleProperties: ['margin'],
    isSuperSet: false,
  },
  mx: {
    getter: theme.elements.space,
    styleProperties: ['margin-left', 'margin-right'],
    isSuperSet: false,
  },
  my: {
    getter: theme.elements.space,
    styleProperties: ['margin-top', 'margin-bottom'],
    isSuperSet: false,
  },
  ml: {
    getter: theme.elements.space,
    styleProperties: ['margin-left'],
    isSuperSet: false,
  },
  mr: {
    getter: theme.elements.space,
    styleProperties: ['margin-right'],
    isSuperSet: false,
  },
});

const mapPropsToStyles =
(theme: ITheme) =>
(config: IPropsToStyleMapConfig) =>
(map: IPropsToStyleMap) =>
(props: any) => {
  const mapObject = map(theme);

  let breakpointsAreAvailable: boolean = arrayIsSet<string | number>(props.breakpoints);

  let resolvedBreakpoints: (string | number)[] | null = null;

  // If enable breakpoints mapping: resolve breakpoints.
  if (config.enableBreakpointMapping && breakpointsAreAvailable) {
    // Resolve each breakpoints value.
    resolvedBreakpoints = props.breakpoints
      .map(val => theme.elements.breakpoint(val) ?? val)
      .sort();
  }

  // Loop through map object.
  Object
  .keys(mapObject)
  .forEach(propName => {
    // Check if prop is set.
    if (typeof props[propName] !== 'undefined') {
      // Get value from prop in the map.
      const mapSetting = mapObject[propName];
      const value = props[propName];
      
      if (config.enableBreakpointMapping && breakpointsAreAvailable) {

      } else {
        const result = mapPropToStyle(mapSetting)(value);
      }
    }
  });
  // Compose into styles string.
}

// Handl Leaf nodes.

type IGetFunctionValue = string | number | null;
type ISuperGetFunctionValueArray = [string, IGetFunctionValue];

// Three inputs types for PropToStyleWithBreakpoints
// [[string, string | number]]
// [string | number, [string, string | number]]
// string | number
const mapPropToStyleWithBreakpoints = (breakpoints: string[]) =>
(mapSetting: IPropToStyleSetting) =>
(value: ISuperGetFunctionValueArray[] | IGetFunctionValue[] | IGetFunctionValue): string[] => {
  if (isStringOrNumber(value)) {

  } else if (arrayIsSet(value)) {
  
  }

  return [];
}

// Two input types:
// [string, string | number]
// string | number
const mapPropToStyle = (mapSetting: IPropToStyleSetting) =>
(value: (string | number)[] | string | number | null) => {
  let result: string | number | null = null;

  if (mapSetting.isSuperSet) {
    if (
      Array.isArray(value)
      && value.length == 2
      && typeof value[0] === 'string'
    ) {
      result = isStringOrNumber(value[1])
        ? mapSetting.getter(value[0])(value[1])
        : mapSetting.getter(value[0])();
    } else if (typeof value === 'string') {
      result = mapSetting.getter(value)();
    }
  } else {
    result = isStringOrNumber(value)
      ? mapSetting.getter(value)
      : mapSetting.getter();
  }

  if (isStringOrNumber(value) && result === null) {
    return value;
  }
  
  return result;
}

const mapStylePropertiesToValue =
(styleProperties: string[]) =>
(value: string | number): string => (
  styleProperties
    .map(property => `${property}: ${value};`)
    .join(`\n`)
);