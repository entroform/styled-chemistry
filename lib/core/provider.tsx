import React, {
  createContext,
  FC,
  useContext,
  useReducer,
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

const reducer = (state, action) => {
  switch (action.type) {
    case '':

    case 'decrement':
      return {count: state.count - 1};
    default:
      return state;
  }
}
export const StyleChemistryProvider: FC<IThemeProviderProps> = ({ children, theme }) => {
  const [_theme, dispatch] = useReducer(reducer, theme);

  return (
    <StyleChemistryContext.Provider value={_theme}>
      <ThemeProvider theme={_theme}>
        {children}
      </ThemeProvider>
    </StyleChemistryContext.Provider>
  );
}

export const useStyleChemistryTheme = () => useContext(StyleChemistryContext);