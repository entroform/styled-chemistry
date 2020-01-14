import {
  createGetterFunctionsFromElements,
} from './elements';
import {
  createGetterFunctionsFromCompounds,
} from './compounds';
import {
  createGetterFunctionsFromMixtures,
} from './mixtures';

import {
  ICompoundGetterFunctions,
  ICompounds,
  IElementGetterFunctions,
  IElements,
  IMixtureGetterFunctions,
  IMixtures,
  ITheme,
} from '../interfaces';

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
        original: {
          elements,
          compounds,
          mixtures,
        },
      };
    }
  }
}