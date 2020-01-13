import {
  IElementGetterFunctions,
} from './elements';
import {
  ICompoundGetterFunctions,
} from './compounds';
import {
  IMixtureGetterFunctions,
} from './mixtures';

export interface ITheme {
  readonly elements: IElementGetterFunctions;
  readonly compounds: ICompoundGetterFunctions;
  readonly mixtures: IMixtureGetterFunctions;
}