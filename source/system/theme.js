import { hsl } from 'polished';

const config = {
  baseFontSize: 12,
  baseLineHeight: 1.55,
};

const atoms = Object.freeze({
  font: {
    families: {
      default: 0,
      set: [
        `"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif`,
      ],
      alias: {
        'sans-serif': 0,
      },
    },
    sizes: {
      set: [10, 12, 14, 16, 18],
      default: 0,
      alias: {
        small: 0,
        medium: 2,
      },
    },
    weights: {
      set: [200, 400, 500, 700],
      default: 1,
    },
    letterSpacings: {
      set: [0, 0.1],
      default: 0,
    },
    lineHeights: {
      default: 1.5,
      set: [0, 1, 1.2, 1.4, 2]
    },
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
    default: 0,
    alias: {},
  },
  breakpoints: {
    breakpoints: [],
    default: 0,
  },
  zIndices: {
    set: [0, 1],
  },
  sizes: {
    set: [0, 4, 8, 12, 20, 24],
    default: 0,
    alias: {},
  },
});

// Molecules
// Compose Type Molecule
const typography = {
  forAll: {

  },
  default: {

  },
  set: {
    heading: [
      {
        family: 0,
        weight: 2,
        letterSpacing: 0,
      },
    ],
    body: [
      {
        family: 0,
        weight: 2,
      },
    ],
  },
}

const boderStyles = {

}

const molecules = {

}

const theme = {
  atoms,
  typography,
  molecules,
}


// buttons
// variants

// hover
// active
// focus

// sizes

// outline
// not-outline