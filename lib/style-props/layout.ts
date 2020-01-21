import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  mapPropsToStyles,
} from '../core/style-props';

const propsToStyleMap = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    get: theme.elements.size,
    propNames: ['width'],
    styleProperties: ['width'],
  },
  {
    get: theme.elements.size,
    propNames: ['height'],
    styleProperties: ['height'],
  },
  {
    get: theme.elements.size,
    propNames: ['minWidth'],
    styleProperties: ['min-width'],
  },
  {
    get: theme.elements.size,
    propNames: ['maxWidth'],
    styleProperties: ['max-width'],
  },
  {
    get: theme.elements.size,
    propNames: ['minHeight'],
    styleProperties: ['min-height'],
  },
  {
    get: theme.elements.size,
    propNames: ['maxHeight'],
    styleProperties: ['max-height'],
  },
  {
    get: theme.elements.size,
    propNames: ['size'],
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