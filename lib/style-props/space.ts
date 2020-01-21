import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  mapPropsToStyles,
} from '../core/style-props';

const propsToStyleMap = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    get: theme.elements.space,
    propNames: ['m', 'margin'],
    styleProperties: ['margin'],
  },
  {
    get: theme.elements.space,
    propNames: ['mx', 'marginX'],
    styleProperties: ['margin-left', 'margin-right'],
  },
  {
    get: theme.elements.space,
    propNames: ['my', 'marginY'],
    styleProperties: ['margin-top', 'margin-bottom'],
  },
  {
    get: theme.elements.space,
    propNames: ['mt', 'marginTop'],
    styleProperties: ['margin-top'],
  },
  {
    get: theme.elements.space,
    propNames: ['mb', 'marginBottom'],
    styleProperties: ['margin-bottom'],
  },
  {
    get: theme.elements.space,
    propNames: ['ml', 'marginLeft'],
    styleProperties: ['margin-left'],
  },
  {
    propNames: ['mr', 'marginRight'],
    get: theme.elements.space,
    styleProperties: ['margin-right'],
  },
  {
    get: theme.elements.space,
    propNames: ['p', 'padding'],
    styleProperties: ['padding'],
  },
  {
    get: theme.elements.space,
    propNames: ['px', 'paddingX'],
    styleProperties: ['padding-left', 'padding-right'],
  },
  {
    get: theme.elements.space,
    propNames: ['py', 'paddingY'],
    styleProperties: ['padding-top', 'padding-bottom'],
  },
  {
    get: theme.elements.space,
    propNames: ['pl', 'paddingLeft'],
    styleProperties: ['padding-left'],
  },
  {
    get: theme.elements.space,
    propNames: ['pr', 'paddingRight'],
    styleProperties: ['padding-right'],
  },
]);

export const space = mapPropsToStyles()(propsToStyleMap);