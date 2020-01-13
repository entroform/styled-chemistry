import {
  ISet,
  ISuperSet,
} from './set';
import {
  IElementGetterFunctions,
} from './elements';
import {
  ICompoundGetterFunctions,
} from './compounds';

// Mixtures
export type IMixtureValue =
  (
    elementGetters: IElementGetterFunctions,
    compoundGetters: ICompoundGetterFunctions,
  ) => string ;

export type IMixtureSet = ISet<IMixtureValue>;

export type IMixtureSuperSet = ISuperSet<IMixtureValue>;

export type IMixtureGetterFunction = (key: string) => string | null;

export type IMixtureSuperGetterFunction = (name: string) => IMixtureGetterFunction;

export interface IMixtures {
  readonly [name: string]: IMixtureSuperSet | IMixtureSet;
}

export interface IMixtureGetterFunctions {
  [name: string]: IMixtureGetterFunctions | IMixtureGetterFunction;
}