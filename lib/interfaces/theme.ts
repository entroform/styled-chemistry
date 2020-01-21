import {
  IElementGetFunctions,
  IElements,
} from './elements';
import {
  ICompoundGetFunctions,
  ICompounds,
} from './compounds';
import {
  IMixtureGetFunctions,
  IMixtures,
} from './mixtures';

export interface IThemeGetFunctions {
  readonly elements: IElementGetFunctions;
  readonly compounds: ICompoundGetFunctions;
  readonly mixtures: IMixtureGetFunctions;
}

export interface IThemeOriginal {
  readonly elements: IElements;
  readonly compounds: ICompounds;
  readonly mixtures: IMixtures;
}

export interface ITheme {
  readonly elements: IElementGetFunctions;
  readonly compounds: ICompoundGetFunctions;
  readonly mixtures: IMixtureGetFunctions;
  readonly original: IThemeOriginal;
}