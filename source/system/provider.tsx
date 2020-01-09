import React, { createContext } from 'react';

export const ThemeContext = createContext(null);

const ThemeProvider = theme => {
  const context = createContext(null);

  const provider = ({ children }) => {
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  }

  return [
    context,
    provider,
  ];
}

export default ThemeProvider;