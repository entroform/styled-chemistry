export interface ISet<V> {
  readonly set: V[];
  readonly default?: number;
  readonly alias?: {
    [alias: string]: number;
  }
}

export interface ISuperSet<V> {
  readonly [name: string]: ISet<V>;
}