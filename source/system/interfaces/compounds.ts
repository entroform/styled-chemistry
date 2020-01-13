import {
  ISet,
  ISuperSet,
} from './set';
import {
  IElementGetterFunctions,
} from './elements';

export type ICompoundSetArrayItem = (elementGetters: IElementGetterFunctions) => string | number | null;

export type ICompoundSet = ISet<ICompoundSetArrayItem>;
export type ICompoundSuperSet = ISuperSet<ICompoundSetArrayItem>;

export type ICompoundGetterFunction = (key: string | number) => string | number | null;
export type ICompoundSuperGetterFunction = (name: string) => ICompoundGetterFunction;

export interface ICompounds {
  readonly [name: string]: ICompoundSuperSet | ICompoundSet;
}

export interface ICompoundGetterFunctions {
  readonly [name: string]: ICompoundSuperGetterFunction | ICompoundGetterFunction;
}
