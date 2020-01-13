
import { createGetterFunctionsFromElements } from './elements';
import { createGetterFunctionsFromCompounds } from './compounds';
import { createGetterFunctionsFromMixtures } from './mixtures';
import {
  IElements,
  IElementGetterFunctions,
} from '../interfaces/elements';
import {
  ICompounds,
  ICompoundGetterFunctions,
} from '../interfaces/compounds';
import {
  IMixtures,
  IMixtureGetterFunctions,
} from '../interfaces/mixtures';
import {
  ITheme,
} from '../interfaces/theme';

export const createTheme = (elements: IElements) => {
  const elementGetters: IElementGetterFunctions = createGetterFunctionsFromElements(elements);
  return (compounds: ICompounds = {}) => {
    const compoundGetters: ICompoundGetterFunctions = createGetterFunctionsFromCompounds(elementGetters)(compounds);
    return (mixtures: IMixtures = {}): ITheme => {
      const mixtureGetters: IMixtureGetterFunctions = createGetterFunctionsFromMixtures(elementGetters)(compoundGetters)(mixtures);
      return {
        elements: elementGetters,
        compounds: compoundGetters,
        mixtures: mixtureGetters,
      };
    }
  }
}