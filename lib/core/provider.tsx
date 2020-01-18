import React, {
  createContext,
  FC,
  useContext,
} from 'react';
import {
  ThemeProvider,
} from 'styled-components';

import {
  ITheme,
} from '../interfaces/theme';

export interface IThemeProviderProps {
  theme: ITheme;
}

export const StyleChemistryContext = createContext(null);

export const StyleChemistryProvider: FC<IThemeProviderProps> = ({ children, theme }) => (
  <StyleChemistryContext.Provider value={theme}>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </StyleChemistryContext.Provider>
);

export const useStyleChemistryTheme = () => useContext(StyleChemistryContext);