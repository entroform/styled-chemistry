import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {
  theme,
} from './system/test/theme';

import {
  ThemeProvider,
} from './system/provider';

console.log(theme.mixtures.typography('heading')();

const HAHA = styled.div`
  font-size: ${theme.elements.fontSize(3)}px;
  ${theme.mixtures.typography('heading')()}
`;

const TestComponent = () => {
  return (
    <>
      <div>Hello World</div>
      <HAHA>AFJEOAFJ</HAHA>
    </>
  );
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <TestComponent />
    </ThemeProvider>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);