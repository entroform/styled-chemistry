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
  const elementGet: IElementGetFunctions = createGetFunctionsFromElements(elements);
  return (compounds: ICompounds = {}) => {
    const compoundGet: ICompoundGetFunctions = createGetFunctionsFromCompounds(elementGet)(compounds);
    return (mixtures: IMixtures = {}): ITheme => {
      const mixtureGet: IMixtureGetFunctions = createGetFunctionsFromMixtures(elementGet)(compoundGet)(mixtures);
      return {
        elements: elementGet,
        compounds: compoundGet,
        mixtures: mixtureGet,
        original: {
          elements,
          compounds,
          mixtures,
        },
      };
    }
  }
}