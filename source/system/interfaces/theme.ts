import {
  IElementGetterFunctions,
  IElements,
} from './elements';
import {
  ICompoundGetterFunctions,
  ICompounds,
} from './compounds';
import {
  IMixtureGetterFunctions,
  IMixtures,
} from './mixtures';


export interface IThemeGetters {
  readonly elements: IElementGetterFunctions;
  readonly compounds: ICompoundGetterFunctions;
  readonly mixtures: IMixtureGetterFunctions;
}

export interface IThemeOriginal {
  readonly elements: IElements;
  readonly compounds: ICompounds;
  readonly mixtures: IMixtures;
}

export interface ITheme {
  readonly elements: IElementGetterFunctions;
  readonly compounds: ICompoundGetterFunctions;
  readonly mixtures: IMixtureGetterFunctions;
  readonly original: IThemeOriginal;
}