import {
  ISet,
  ISuperSet,
} from './set';

export type IElementValue = string | number | null;

export type IElementTransformFunction = (value: IElementValue) => IElementValue;

export interface IElementSet extends ISet<IElementValue> {
  readonly transform?: IElementTransformFunction;
}

export type IElementSuperSet = ISuperSet<IElementValue>;

export type IElementGetterFunction = (key: string | number) => string | null;

export type IElementSuperGetterFunction = (name: string) => IElementGetterFunction;

export interface IElements {
  readonly borderWidths: IElementSet;
  readonly breakpoints: IElementSet;
  readonly colors: IElementSuperSet;
  readonly fontFamilies: IElementSet;
  readonly fontSizes: IElementSet;
  readonly fontWeights: IElementSet;
  readonly letterSpacings: IElementSet;
  readonly lineHeights: IElementSet;
  readonly radii: IElementSet;
  readonly sizes: IElementSet;
  readonly spaces: IElementSet;
  readonly times: IElementSet;
  readonly timingFunctions: IElementSet;
  readonly zIndices: IElementSet;
}

export interface IElementGetterFunctions {
  readonly borderWidth: IElementGetterFunction;
  readonly breakpoint: IElementGetterFunction;
  readonly color: IElementSuperGetterFunction;
  readonly fontFamily: IElementGetterFunction;
  readonly fontSize: IElementGetterFunction;
  readonly fontWeight: IElementGetterFunction;
  readonly letterSpacing: IElementGetterFunction;
  readonly lineHeight: IElementGetterFunction;
  readonly radius: IElementGetterFunction;
  readonly size: IElementGetterFunction;
  readonly space: IElementGetterFunction;
  readonly time: IElementGetterFunction;
  readonly timingFunction: IElementGetterFunction;
  readonly zIndex: IElementGetterFunction;
}