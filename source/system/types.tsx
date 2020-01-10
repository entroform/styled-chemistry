export interface ISet<V> {
  readonly set: V[];
  readonly default?: number;
  readonly alias?: {
    [alias: string]: number;
  }
}

export interface ISuperSet<V> {
  readonly [name: string]: ISet<V>;
}

// Elements
export type IElementValue = string | number | null;

export type IElementTransformFunction = (value: IElementValue) => string;

export interface IElementSet extends ISet<IElementValue> {
  readonly transform?: IElementTransformFunction;
}

export type IElementSuperSet = ISuperSet<IElementValue>;

export type IElementGetterFunctionKey = string | number;

export type IElementGetterFunction = (key: IElementGetterFunctionKey) => IElementValue;

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
export type ICompoundCompiledValue = string | null;
export type ICompoundValueFunction = (elementGetters: IElementGetterFunctions) => ICompoundCompiledValue;

export type ICompoundSet = ISet<ICompoundValueFunction>;

export type ICompoundSuperSet = ISuperSet<ICompoundValueFunction>;

export type ICompoundGetterFunction = (key: string) => string;

export type ICompoundSuperGetterFunction = (name: string) => ICompoundGetterFunction;

export interface ICompounds {
  readonly [name: string]: ICompoundSuperSet | ICompoundSet;
}

export type ICompoundCompiledSet = ISet<ICompoundCompiledValue>;
export type ICompoundCompiledSuperSet = ISuperSet<ICompoundCompiledValue>;

export interface ICompoundsCompiled {
  readonly [name: string]: ICompoundCompiledSuperSet | ICompoundCompiledSet;
}

export interface ICompoundGetterFunctions {
  readonly [name: string]: ICompoundSuperGetterFunction | ICompoundGetterFunction;
}

// Mixtures
export interface IMixtureValue {
  readonly [cssProperty: string]: string | number | null;
}

export type IMixtureValueFunction = (
  elementGetters: IElementGetterFunctions,
  compoundGetters: ICompoundGetterFunctions,
) => IMixtureValue;

export type IMixtureSet = ISet<IMixtureValueFunction>;

export type IMixtureSuperSet = ISuperSet<IMixtureValueFunction>;

export type IMixtureGetterFunction = (key: string) => IMixtureValue;

export type IMixtureSuperGetterFunction = (name: string) => IMixtureGetterFunction;

export interface IMixtures {
  readonly [name: string]: IMixtureSuperSet | IMixtureSet;
}

export interface IMixtureGetterFunctions {
  [name: string]: IMixtureGetterFunctions | IMixtureGetterFunction;
}

// Putting it together now:
// ITheme

export interface ITheme {
  readonly elements: IElements;
  readonly compounds: ICompounds;
  readonly mixtures: IMixtures; 
}

export interface IThemeGetters {
  readonly elements: IElementGetterFunctions;
  readonly compounds: ICompoundGetterFunctions;
  readonly mixtures: IMixtureGetterFunctions;
}