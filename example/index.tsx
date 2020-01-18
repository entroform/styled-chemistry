import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {
  theme,
} from '../source/example/theme';

import {
  StyleChemistryProvider,
} from '../source/system/core/provider';

import {
  space,
} from '../source/system/style-props/space';

const StyledTextComponent = styled.div`
  background-image: ${props => props.theme.compounds.gradients('sunset')()};
  color: ${props => props.theme.elements.color('red')()};
  font-size: ${props => props.theme.elements.fontSize('large')};
  ${props => space(props.theme)(props)}
`;

const ExampleComponent = () => (
  <>
    <div>Hello World</div>

    <StyledTextComponent
      breakpoints={[0, '300px', 2]}
      m={4}
      ml={['xs', '20px', 'l']}
      p={'l'}
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
