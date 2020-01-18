import {
  ITheme,
} from '../interfaces';

import {
  IPropsToStyleMapArray
} from '../interfaces/style-props';

import {
  mapPropsToStyles,
} from '../core/style-props';

const propsToStyleMap = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    propNames: ['m', 'margin'],
    get: theme.elements.space,
    styleProperties: ['margin'],
    isSuperSet: false,
  },
  {
    propNames: ['mx', 'marginX'],
    get: theme.elements.space,
    styleProperties: ['margin-left', 'margin-right'],
    isSuperSet: false,
  },
  {
    propNames: ['my', 'marginY'],
    get: theme.elements.space,
    styleProperties: ['margin-top', 'margin-bottom'],
    isSuperSet: false,
  },
  {
    propNames: ['mt', 'marginTop'],
    get: theme.elements.space,
    styleProperties: ['margin-top'],
    isSuperSet: false,
  },
  {
    propNames: ['mb', 'marginBottom'],
    get: theme.elements.space,
    styleProperties: ['margin-bottom'],
    isSuperSet: false,
  },
  {
    propNames: ['ml', 'marginLeft'],
    get: theme.elements.space,
    styleProperties: ['margin-left'],
    isSuperSet: false,
  },
  {
    propNames: ['mr', 'marginRight'],
    get: theme.elements.space,
    styleProperties: ['margin-right'],
    isSuperSet: false,
  },
  {
    propNames: ['p', 'padding'],
    get: theme.elements.space,
    styleProperties: ['padding'],
    isSuperSet: false,
  },
  {
    propNames: ['px', 'paddingX'],
    get: theme.elements.space,
    styleProperties: ['padding-left', 'padding-right'],
    isSuperSet: false,
  },
  {
    propNames: ['py', 'paddingY'],
    get: theme.elements.space,
    styleProperties: ['padding-top', 'padding-bottom'],
    isSuperSet: false,
  },
  {
    propNames: ['pl', 'paddingLeft'],
    get: theme.elements.space,
    styleProperties: ['padding-left'],
    isSuperSet: false,
  },
  {
    propNames: ['pr', 'paddingRight'],
    get: theme.elements.space,
    styleProperties: ['padding-right'],
    isSuperSet: false,
  },
]);

export const space = mapPropsToStyles()(propsToStyleMap);