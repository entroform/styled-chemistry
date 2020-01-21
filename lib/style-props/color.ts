import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  mapPropsToStyles,
} from '../core/style-props';

const propsToStyleMap = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    propNames: ['color'],
    get: theme.elements.color,
    styleProperties: ['color'],
    isSuperSet: true,
  },
  {
    propNames: ['bg', 'backgroundColor'],
    get: theme.elements.color,
    styleProperties: ['background-color'],
    isSuperSet: true,
  },
  {
    propNames: ['opacity'],
    get: theme.elements.opacity,
    styleProperties: ['opacity'],
    isSuperSet: false,
  },
]);

export const color = mapPropsToStyles()(propsToStyleMap);