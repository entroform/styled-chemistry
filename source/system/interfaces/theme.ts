import {
  IElements,
  IElementGetterFunctions,
} from './elements';
import {
  ICompounds,
  ICompoundGetterFunctions,
} from './compounds';
import {
  IMixtures,
  IMixtureGetterFunctions,
} from './mixtures';

export interface ITheme {
  readonly elements: IElementGetterFunctions;
  readonly compounds: ICompoundGetterFunctions;
  readonly mixtures: IMixtureGetterFunctions;
}