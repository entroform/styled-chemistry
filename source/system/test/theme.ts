import {
  hsl,
  rem,
} from 'polished';
import {
  ICompounds,
  IElements,
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
      xs: 1,
      s: 3,
      m: 4,
      l: 7,
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
  opacities: {
    set: [0.1, 0.5],
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
    set: [
      rem(0), rem(2), rem(4),
      rem(8), rem(12), rem(14),
      rem(16), rem(20), rem(40),
    ],
    default: 0,
    alias: {
      xs: 2,
      s: 3,
      m: 7,
      l: 8,
    },
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
    set: [
      rem(480),
      rem(768),
      rem(960),
    ],
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
      ({ borderWidth, color }) => `border: ${borderWidth(0)} solid ${color('black')()}`
    ],
  },
  shadows: {
    set: [],
  },
});

const mixtures: IMixtures = Object.freeze({
  typography: {
    normalized: {
      set: [
        ({ fontFamily, fontSize }) => `
          font-family: ${fontFamily('sans-serif')};
          font-size: ${fontSize('m')};
        `
      ],
    },
    heading: {
      set: [
        ({ fontFamily, fontSize }) => `
          font-size: ${fontSize(6)};
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