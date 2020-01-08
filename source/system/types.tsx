// Scale

// AtomicInventory

//

export interface AtomicScale<T> {
  readonly default: number;
  readonly set: [T];
  readonly alias?: { [key: string]: number };
}

export interface TypographicMolecularScale<T> {
}



export interface AtomicFonts {
  readonly families: AtomicScale<string>;
  readonly sizes: AtomicScale<number | string>;
  readonly weights: AtomicScale<number | string>;
  readonly letterSpacings: AtomicScale<number | string>;
  readonly lineHeights: AtomicScale<number | string>;
}

export interface AtomicColors {
  readonly [color: string]: AtomicScale<string>;
}

export type AtomicSpaces = AtomicElement<number | string>;
export type AtomicHeights = AtomicElement<number | string>;
export type AtomicWidths = AtomicElement<number | string>;

interface Atoms {
  readonly fonts: AtomicFonts;
  readonly colors: AtomicColors;
  readonly spaces: AtomicSpaces;
  readonly 
  readonly heights?: AtomicHeights;
  readonly widths?: AtomicWidths;
}

export interface TypographicMolecule {
  readonly family: number | string;
  readonly weight: number | string;
  readonly size: number | string;
  readonly letterSpacing: number | string;
  readonly lineHeight: number | string;
}

export interface SpaceProps {
  readonly mt: number | string;
  readonly mb: number | string;
  readonly ml: number | string;
  readonly mr: number | string;
  readonly mx: number | string;
  readonly my: number | string;
}



// 'background-color': 'colors'
// 'bg': {
  'background-propery'
    scale: 'colors'
    extraStyle: