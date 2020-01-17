import {
  ICompoundGetFunction,
  ICompoundSuperGetFunction,
  IElementGetFunction,
  IElementSuperGetFunction,
  IMixtureGetFunction,
  IMixtureSuperGetFunction,
  ITheme,
} from '../interfaces';

export type ISetGetFunctionValue = string | number | null;
export type ISuperSetGetFunctionValue = [string, ISetGetFunctionValue];

export type ISetGetFunction = IElementGetFunction | ICompoundGetFunction | IMixtureGetFunction;
export type ISuperSetGetFunction = IElementSuperGetFunction | ICompoundSuperGetFunction | IMixtureSuperGetFunction;

export interface IPropToStyle {
  propNames: string[];
  styleProperties?: string[];
}

export interface IPropToStyleSettingWithSuperSetGetFunction extends IPropToStyle {
  get: ISuperSetGetFunction;
  isSuperSet: true;
}

export interface IPropToStyleSettingWithSetGetFunction extends IPropToStyle {
  get: ISetGetFunction;
  isSuperSet?: false;
}

export type IPropToStyleSetting = IPropToStyleSettingWithSuperSetGetFunction | IPropToStyleSettingWithSetGetFunction;

export type IPropsToStyleMapArray = IPropToStyleSetting[];

export interface IPropsToStyleMap {
  (theme: ITheme): IPropsToStyleMapArray;
}

export interface IPropsToStyleMapConfig {
  enableBreakpointMapping: boolean;
  mediaRule: (a: string) => string;
}
