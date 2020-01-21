# ⚗️ styled-chemistry

## Elements, Compounds, and Mixtures ➝ Theme

`npm i @nekobird/styled-chemistry`

## Create Theme

```ts
import { createTheme } from '@nekobird/styled-chemistry';

const elements = Object.freeze({

});

const compounds = Object.freeze({

});

const mixtures = Object.freeze({

});

export const theme = createTheme(elements)(compounds)(mixtures);
```

## Provide your theme to the rest.

```tsx
import { StyledChemistryProvider } from '@nekobird/styled-chemistry';
import { theme } from './theme';

const App = () => (
  <StyledChemistryProvider theme={theme}>
    {
      // Your other components.
    }
  </StyledChemistryProvider>
);
```

## Inspired By:

- https://radix.modulz.app/docs/theme/
- https://github.com/jzarnett
- https://github.com/styled-system/styled-system
