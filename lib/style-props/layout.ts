import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  mapPropsToStyles,
} from '../core/style-props';

const propsToStyleMap = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    propNames: ['width'],
    get: theme.elements.size,
    styleProperties: ['width'],
  },
  {
    propNames: ['height'],
    get: theme.elements.size,
    styleProperties: ['height'],
  },
  {
    propNames: ['minWidth'],
    get: theme.elements.size,
    styleProperties: ['min-width'],
  },
  {
    propNames: ['maxWidth'],
    get: theme.elements.size,
    styleProperties: ['max-width'],
  },
  {
    propNames: ['minHeight'],
    get: theme.elements.size,
    styleProperties: ['min-height'],
  },
  {
    propNames: ['maxHeight'],
    get: theme.elements.size,
    styleProperties: ['max-height'],
  },
  {
    propNames: ['size'],
    get: theme.elements.size,
    styleProperties: ['width', 'height'],
  },
  {
    propNames: ['display'],
    styleProperties: ['display'],
  },
  {
    propNames: ['verticalAlign'],
    styleProperties: ['vertical-align'],
  },
  {
    propNames: ['overflow'],
    styleProperties: ['overflow'],
  },
  {
    propNames: ['overflowX'],
    styleProperties: ['overflow-x'],
  },
  {
    propNames: ['overflowY'],
    styleProperties: ['overflow-y'],
  },
]);

export const layout = mapPropsToStyles()(propsToStyleMap);