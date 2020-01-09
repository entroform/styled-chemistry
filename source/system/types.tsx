export interface ISet<T> {
  readonly set: [T];
  readonly default?: number;
  readonly alias?: {
    [alias: string]: number;
  }
}

export interface ISuperSet<T> {
  readonly [name: string]: T;
}

// Elements
export type IElementValue = string | number | null;

export type IElementTransformFunction = (value: IElementValue) => string;

export interface IElementSet extends ISet<IElementValue> {
  readonly transform?: IElementTransformFunction;
}

export type IElementSuperSet = ISuperSet<IElementSet>;

export type IElementGetterFunctionKey = string | number;

export type IElementGetterFunction = (key: IElementGetterFunctionKey) => string | null;

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

// Compounds
export type ICompoundValueFunction = (elementGetters: IElementGetterFunctions) => string;

export type ICompoundSet = ISet<ICompoundValueFunction>;

export type ICompoundSuperSet = ISuperSet<ICompoundSet>;

export type ICompoundGetterFunction = (name: string) => string;

export type ICompoundSuperGetterFunction = (parent: string) => ICompoundGetterFunction;

export interface ICompounds {
  readonly [name: string]: ICompoundSuperSet | ICompoundSet;
}

export interface ICompoundGetterFunctions {
  readonly [name: string]: ICompoundSuperGetterFunction | ICompoundGetterFunction;
}

// Mixtures
export interface IMixtureValue {
  [cssProperty: string]: string | number | null;
}

export type IMixtureValueFunction = (
  elementGetters: IElementGetterFunctions,
  compoundGetters: ICompoundGetterFunctions,
) => IMixtureValue;

export interface IMixtureGetterFunctions {

}

export interface IMixtures {
  
}

export interface IMixtureSet {
  readonly set: [IMixtureValue];
  readonly default?: number;
  readonly alias?: {
    [alias: string]: number;
  }
}