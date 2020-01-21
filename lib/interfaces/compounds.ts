import {
  IStringOrNull,
  IStringOrNumber,
} from './common';
import {
  ISet,
  ISuperSet,
} from './set';
import {
  IElementGetFunctions,
} from './elements';

export type ICompoundGetFunctionResult = IStringOrNull;

export type ICompoundSetArrayItem = (elementGets: IElementGetFunctions) => ICompoundGetFunctionResult;

export type ICompoundSet = ISet<ICompoundSetArrayItem>;
export type ICompoundSuperSet = ISuperSet<ICompoundSetArrayItem>;

export type ICompoundGetFunction = (key?: IStringOrNumber) => ICompoundGetFunctionResult;
export type ICompoundSuperGetFunction = (name: string) => ICompoundGetFunction;

export interface ICompounds {
  readonly [name: string]: ICompoundSuperSet | ICompoundSet;
}

export interface ICompoundGetFunctions {
  readonly [name: string]: ICompoundSuperGetFunction | ICompoundGetFunction;
}
