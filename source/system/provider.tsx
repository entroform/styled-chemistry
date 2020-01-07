import React, { createContext } from 'react';

const ThemeContext = createContext(null);

const ThemeProvider = theme => {
  return ({ children }) => {
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  }
}

export default ThemeProvider;