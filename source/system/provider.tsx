import React, {
  FC,
  createContext,
  useContext,
} from 'react';
import { ThemeProvider } from 'styled-components';
import { ITheme } from './interfaces/theme';

export const StyleChemistryContext = createContext(null);

export interface ThemeProviderProps {
  theme: ITheme;
}

export const StyleChemistryProvider: FC<ThemeProviderProps> = ({ children, theme }) => (
  <StyleChemistryContext.Provider value={theme}>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </StyleChemistryContext.Provider>
);

export const getTheme = () => useContext(StyleChemistryContext);