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
} from '../build/esm/styled-chemistry';

const StyledTextComponent = styled.div`
  background-image: ${props => props.theme.compounds.gradients('sunset')()};
  color: ${props => props.theme.elements.color('white')()};
  font-size: ${props => props.theme.elements.fontSize('large')};
  font-family: ${props => props.theme.elements.fontFamily(0)};
  padding: ${props => props.theme.elements.space('m')};
  ${props => props.theme.mixtures.typography('normalized')()}
  ${props => space(props.theme)(props)}
  display: flex;
  ${props => flexbox(props.theme)(props)}
`;

const ExampleComponent = () => (
  <>
    <div>Hello World</div>

    <StyledTextComponent
      breakpoints={[0, '480px', 2]}
      m={4}
      ml={['xs', '20px', 'l']}
      p={'l'}
      justifyContent={['center', 'flex-end']}
    >
      StarBucks
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
