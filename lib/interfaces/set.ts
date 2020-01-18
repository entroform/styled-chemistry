export interface ISet<T> {
  readonly set: T[];
  readonly default?: number;
  readonly alias?: {
    [alias: string]: number;
  }
}

export interface ISuperSet<T> {
  readonly [name: string]: ISet<T>;
}

export type IStringNumberOrNull = string | number | null;