import {
  ISet,
  ISuperSet,
} from './set';
import {
  IElementGetterFunctions,
} from './elements';

// Compounds

export type ICompoundValue = (elementGetters: IElementGetterFunctions) => string | number | null;

export type ICompoundSet = ISet<ICompoundValue>;

export type ICompoundSuperSet = ISuperSet<ICompoundValue>;

export type ICompoundGetterFunction = (key: string | number) => string | null;

export type ICompoundSuperGetterFunction = (name: string) => ICompoundGetterFunction;

export interface ICompounds {
  readonly [name: string]: ICompoundSuperSet | ICompoundSet;
}

export interface ICompoundGetterFunctions {
  readonly [name: string]: ICompoundSuperGetterFunction | ICompoundGetterFunction;
}
