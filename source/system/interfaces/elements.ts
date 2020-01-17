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

export type IElementGetFunction = (key?: string | number) => IElementSetArrayItem;
export type IElementSuperGetFunction = (name: string) => IElementGetFunction;

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
  readonly opacities: IElementSet,
  readonly radii: IElementSet;
  readonly sizes: IElementSet;
  readonly spaces: IElementSet;
  readonly times: IElementSet;
  readonly timingFunctions: IElementSet;
  readonly zIndices: IElementSet;
}

export interface IElementGetFunctions {
  readonly borderWidth: IElementGetFunction;
  readonly breakpoint: IElementGetFunction;
  readonly color: IElementSuperGetFunction;
  readonly fontFamily: IElementGetFunction;
  readonly fontSize: IElementGetFunction;
  readonly fontWeight: IElementGetFunction;
  readonly image: IElementGetFunction;
  readonly letterSpacing: IElementGetFunction;
  readonly lineHeight: IElementGetFunction;
  readonly opacity: IElementGetFunction;
  readonly radius: IElementGetFunction;
  readonly size: IElementGetFunction;
  readonly space: IElementGetFunction;
  readonly time: IElementGetFunction;
  readonly timingFunction: IElementGetFunction;
  readonly zIndex: IElementGetFunction;
}