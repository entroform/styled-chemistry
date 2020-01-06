import { hsl } from 'polished';
// Atoms
const font = {
  familiies: {
    default: 0,
    collection: [
      `"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif`,
    ],
    alias: {
      'sans-serif': 0,
    },
  },
  sizes: {
    scale: [10, 12, 14, 16, 18 ],
    default: 0,
    alias: {
      small: 0,
      medium: 2,
    },
  },
  weights: {
    scale: [200, 400, 500, 700],
    default: 1,
  },
  letterSpacings: {
    scale: [0, 0.1],
    default: 0,
  },
  lineHeights: {
    default: 1.5,
    scale: [0, 1, 1.2, 1.4, 2]
  },
};

const colors = {
  white: {
    default: 0,
    scale: [
      hsl(0, 0, 0),
    ],
    alias: {},
  },
};

const spaces = {
  scale: [0, 2, 4, 8, 12, 14, 16],
  default: 0,
  alias: {},
};

const radii = {
  scale: [0, 4, 8, 12, 20, 24],

};

const breakpoints = {
  breakpoints: [],
  default: 0,
  alias: {

  },
};

const heights = {

};

const widths = {
  scale: [],

};

// Compose Type Molecule
const typography = {

}

