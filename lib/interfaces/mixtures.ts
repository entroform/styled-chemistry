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

export type IMixtureGetFunctionResult = string | null;

export type IMixtureSetArrayItem = (
  elementGetFunctions: IElementGetFunctions,
  compoundGetFunctions: ICompoundGetFunctions,
) => IMixtureGetFunctionResult;

export type IMixtureSet = ISet<IMixtureSetArrayItem>;
export type IMixtureSuperSet = ISuperSet<IMixtureSetArrayItem>;

export type IMixtureGetFunction = (key?: string | number) => IMixtureGetFunctionResult;
export type IMixtureSuperGetFunction = (name: string) => IMixtureGetFunction;

export interface IMixtures {
  readonly [name: string]: IMixtureSuperSet | IMixtureSet;
}

export interface IMixtureGetFunctions {
  [name: string]: IMixtureGetFunctions | IMixtureGetFunction;
}