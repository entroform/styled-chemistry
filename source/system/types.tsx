export interface AtomicElement<T> {
  readonly default: number;
  readonly set: [T];
  readonly alias?: { [key: string]: number };
}

export interface AtomicFonts {
  readonly families: AtomicElement<string>;
  readonly sizes: AtomicElement<number | string>;
  readonly weights: AtomicElement<number | string>;
  readonly letterSpacings: AtomicElement<number | string>;
  readonly lineHeights: AtomicElement<number | string>;
}

export interface AtomicColors {
  readonly [color: string]: AtomicElement<string>;
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

