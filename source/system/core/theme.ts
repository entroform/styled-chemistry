import {
  createGetFunctionsFromElements,
} from './elements';
import {
  createGetFunctionsFromCompounds,
} from './compounds';
import {
  createGetFunctionsFromMixtures,
} from './mixtures';

import {
  ICompoundGetFunctions,
  ICompounds,
  IElementGetFunctions,
  IElements,
  IMixtureGetFunctions,
  IMixtures,
  ITheme,
} from '../interfaces';

export const createTheme = (elements: IElements) => {
  const elementGetters: IElementGetFunctions = createGetFunctionsFromElements(elements);
  return (compounds: ICompounds = {}) => {
    const compoundGetters: ICompoundGetFunctions = createGetFunctionsFromCompounds(elementGetters)(compounds);
    return (mixtures: IMixtures = {}): ITheme => {
      const mixtureGetters: IMixtureGetFunctions = createGetFunctionsFromMixtures(elementGetters)(compoundGetters)(mixtures);
      return {
        elements:  elementGetters,
        compounds: compoundGetters,
        mixtures:  mixtureGetters,
        original: {
          elements,
          compounds,
          mixtures,
        },
      };
    }
  }
}