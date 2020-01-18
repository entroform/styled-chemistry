import {
  ISet,
  ISuperSet,
} from './set';
import {
  IElementGetFunctions,
} from './elements';

export type ICompoundGetFunctionResult = string | null;

export type ICompoundSetArrayItem = (elementGets: IElementGetFunctions) => ICompoundGetFunctionResult;

export type ICompoundSet = ISet<ICompoundSetArrayItem>;
export type ICompoundSuperSet = ISuperSet<ICompoundSetArrayItem>;

export type ICompoundGetFunction = (key?: string | number) => ICompoundGetFunctionResult;
export type ICompoundSuperGetFunction = (name: string) => ICompoundGetFunction;

export interface ICompounds {
  readonly [name: string]: ICompoundSuperSet | ICompoundSet;
}

export interface ICompoundGetFunctions {
  readonly [name: string]: ICompoundSuperGetFunction | ICompoundGetFunction;
}
