import {
  hsl,
  rem,
} from 'polished';
import {
  ICompounds,
  IElements,
  IElementSet,
  IMixtures,
  ITheme,
} from '../interfaces';

import {
  createTheme,
} from '../core/theme';

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
    set: [
      rem(0),  rem(10), rem(12),
      rem(14), rem(16), rem(18),
      rem(24), rem(32), rem(38),
    ],
    default: 4,
    alias: {
      'x-small': 1,
      small: 3,
      medium: 4,
      large: 7,
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
    red: {
      set: [
        hsl(340, 1, 0.5),
      ],
    },
    blue: {
      set: [
        hsl(240, 1, 0.5),
      ],
    },
  },
  images: {
    set: [],
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

const compounds: ICompounds = Object.freeze({
  gradients: {
    sunset: {
      set: [
        ({ color }) => `linear-gradient(40deg, ${color('red')(0)}, ${color('blue')(0)})`,
      ],
    }
  },
  borders: {
    set: [
      ({ color }) => `linear-gradient(40deg, ${color('red')(0)}, ${color('blue')(0)})`,
    ],
  },
  shadows: {
    set: [
      ({ color }) => `linear-gradient(40deg, ${color('red')(0)}, ${color('blue')(0)})`,
    ],
  },
});

const mixtures: IMixtures = Object.freeze({
  typography: {
    normalized: {
      set: [
        ({ fontFamily, fontSize }) => `
          font-family: ${fontFamily('sans-serif')};
          font-size: ${fontSize('medium')};
        `
      ],
    },
    heading: {
      set: [
        ({ fontFamily, fontSize }) => `
          font-size: ${fontSize(6)}px;
          font-family: ${fontFamily(0)};
        `,
      ],
    },
    body: {
      set: [
        ({ fontFamily, fontSize }) => `
          font-size: ${fontSize(6)}px;
          font-family: ${fontFamily(0)};
        `,
      ]
    },
  },
});

export const theme: ITheme = createTheme(elements)(compounds)(mixtures);