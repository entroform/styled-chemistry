import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {
  theme,
} from './system/test/theme';

import {
  StyleChemistryProvider,
} from './system/provider';

const StyledTextComponent = styled.div`
  background-image: ${props => props.theme.compounds.gradients('sunset')()};
  color: ${props => props.theme.elements.color('red')()};
  font-size: ${props => props.theme.elements.fontSize('large')};
`;

const TestComponent = () => (
  <>
    <div>Hello World</div>
    <StyledTextComponent>AFJEOAFJ</StyledTextComponent>
  </>
);

const App = () => (
  <StyleChemistryProvider theme={theme}>
    <TestComponent />
  </StyleChemistryProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
