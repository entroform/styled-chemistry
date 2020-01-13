import React, {
  FC,
  createContext,
  useContext,
} from 'react';

import { ITheme } from './interfaces/theme';

export const Context = createContext(null);

interface ThemeProviderProps {
  theme: ITheme;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => {
  return (
    <Context.Provider value={theme}>
      {children}
    </Context.Provider>
  );
}


export const getTheme = () => {
  const theme = useContext(Context);
  return theme;
}