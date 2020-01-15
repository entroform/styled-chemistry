import {
  ISet,
  ISuperSet,
} from './set';
import {
  IElementGetFunctions,
} from './elements';
import {
  ICompoundGetFunctions,
} from './compounds';

export type IMixtureValue =
(
  elementGes: IElementGetFunctions,
  compoundGes: ICompoundGetFunctions,
) => string | number | null;

export type IMixtureSet = ISet<IMixtureValue>;
export type IMixtureSuperSet = ISuperSet<IMixtureValue>;

export type IMixtureGetFunction = (key?: string | number | null) => string | number | null;
export type IMixtureSuperGetFunction = (name: string) => IMixtureGetFunction;

export interface IMixtures {
  readonly [name: string]: IMixtureSuperSet | IMixtureSet;
}

export interface IMixtureGetFunctions {
  [name: string]: IMixtureGetFunctions | IMixtureGetFunction;
}