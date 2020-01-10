export type CssScalar = Function | string | number | null;

export interface CssObject {
  [property: string]: CssObject | CssScalar;
}

const cleanCssObject = (obj: CssObject) => {

}

const composeCssObjects = (obj1, obj2) => {

}