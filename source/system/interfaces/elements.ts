import {
  ISet,
  ISuperSet,
} from './set';

export type IElementSetArrayItem = string | number | null;

export type IElementTransformFunction = (value: IElementSetArrayItem) => IElementSetArrayItem;

export interface IElementSet extends ISet<IElementSetArrayItem> {
  readonly transform?: (value: IElementSetArrayItem) => IElementSetArrayItem;
}
export type IElementSuperSet = ISuperSet<IElementSetArrayItem>;

export type IElementGetterFunction = (key?: string | number) => IElementSetArrayItem;
export type IElementSuperGetterFunction = (name: string) => IElementGetterFunction;

export interface IElements {
  readonly borderWidths: IElementSet;
  readonly breakpoints: IElementSet;
  readonly colors: IElementSuperSet;
  readonly fontFamilies: IElementSet;
  readonly fontSizes: IElementSet;
  readonly fontWeights: IElementSet;
  readonly images: IElementSet;
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
  readonly image: IElementGetterFunction;
  readonly letterSpacing: IElementGetterFunction;
  readonly lineHeight: IElementGetterFunction;
  readonly radius: IElementGetterFunction;
  readonly size: IElementGetterFunction;
  readonly space: IElementGetterFunction;
  readonly time: IElementGetterFunction;
  readonly timingFunction: IElementGetterFunction;
  readonly zIndex: IElementGetterFunction;
}