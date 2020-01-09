import { hsl } from 'polished';
import {
  IElements, IElementSet, ICompounds, IMixtures, ITheme,
} from './types';

const elements: IElements = Object.freeze({
  fontFamilies: {
    set: [
      `"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif`,
    ],
    default: 0,
    alias: {
      'sans-serif': 0,
    },
  },
  fontSizes: {
    set: [0, 10, 12, 14, 16, 18, 24, 32],
    default: 4,
    alias: {
      xs: 1,
      s: 3,
      m: 4,
    },
  },
  fontWeights: {
    set: [200, 400, 500, 700],
    default: 1,
    alias: {},
  },
  letterSpacings: {
    set: [0, 0.1, 0.2],
    default: 0,
    alias: {},
  },
  lineHeights: {
    set: [0, 1, 1.2, 1.4, 2],
    default: 1.5,
  },
  colors: {
    white: {
      set: [
        hsl(0, 0, 0),
      ],
      default: 0,
      alias: {},
    },
    grey: {
      set: [
        hsl(0, 0, 10),
      ],
      default: 0,
      alias: {},
    },
  },
  spaces: {
    set: [0, 2, 4, 8, 12, 14, 16],
    default: 0,
    alias: {},
  },
  radii: {
    set: [0, 4, 8, 12, 20, 24],
    default: 0,
    alias: {},
  },
  borderWidths: {
    set: [0, 4, 8, 12, 20, 24],
  },
  sizes: {
    set: [0, 4, 8, 12, 20, 24],
  },
  zIndices: {
    set: [0, 1],
  },
  breakpoints: {
    set: [],
  },
  timingFunctions: {
    set: [],
  },
  times: {
    set: [100, 200],
  },
});

const compounds: ICompounds = {
  gradients: {
    sunset: {
      set: [
        ({ color }) => `linear-gradient(40deg, ${color('red')(0)}, ${color('blue')(0)}`,
      ],
    }
  },
  borders: {
    set: [
      ({ color }) => `linear-gradient(40deg, ${color('red')(0)}, ${color('blue')(0)}`,
    ],
  },
  shadows: {
    set: [
      ({ color }) => `linear-gradient(40deg, ${color('red')(0)}, ${color('blue')(0)}`,
    ],
  },
};

const mixtures: IMixtures = {
  typography: {
    heading: {
      set: [
        ({ fontFamily }) => ({
          fontFamily: fontFamily(0),
        }),
      ],
    },
    body: {
      set: [
        ({ fontFamily }) => ({
          fontFamily: fontFamily(0),
        }),
      ]
    },
  },
};

export const theme: ITheme = {
  elements,
  compounds,
  mixtures,
}