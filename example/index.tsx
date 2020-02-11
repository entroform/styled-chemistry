import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {
  theme,
} from './theme';
import {
  StyleChemistryProvider,
  space,
  flexbox,
  grid,
} from '../lib';

const StyledTextComponent = styled.div`
  background-image: ${props => props.theme.compounds.gradients('sunset')()};
  color: ${props => props.theme.elements.color('white')()};
  font-size: ${props => props.theme.elements.fontSize('large')};
  font-family: ${props => props.theme.elements.fontFamily(0)};
  padding: ${props => props.theme.elements.space('m')};
  ${props => props.theme.mixtures.typography('normalized')()}
  ${props => space(props.theme)(props)}

  display: grid;
  ${props => grid(props.theme)(props)}
`;

const ExampleComponent = () => (
  <>
    <div>Hello World</div>

    <StyledTextComponent
      breakpoints={['480px', '768px']}
      gridTemplateColumns={['50% 50%', '75% 25%', '50% 50%']}
    >
      <div>Mcdonalds</div>
      <div>Mcdonalds</div>
    </StyledTextComponent>
  </>
);

const App = () => (
  <StyleChemistryProvider theme={theme}>
    <ExampleComponent />
  </StyleChemistryProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
