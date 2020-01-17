import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import {
  theme,
} from './system/test/theme';

import {
  StyleChemistryProvider,
} from './system/provider';

import {
  space,
} from './system/style-props/space';

const StyledTextComponent = styled.div`
  background-image: ${props => props.theme.compounds.gradients('sunset')()};
  color: ${props => props.theme.elements.color('red')()};
  font-size: ${props => props.theme.elements.fontSize('large')};
  ${props => space(props.theme)(props)}
`;


const Heading = () => (
  <h1>Hi</h1>
);

const Heading1 = styled(Heading)`
  ${props => props.theme.mixture.typography.heading(0)}
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

    <Heading1 mb={'s'}>Hello</Heading1>
    <Heading1 mb={'m'}>Hello</Heading1>
  </>
);

const App = () => (
  <StyleChemistryProvider theme={theme}>
    <ExampleComponent />
  </StyleChemistryProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
