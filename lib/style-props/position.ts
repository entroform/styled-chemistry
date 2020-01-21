import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  mapPropsToStyles,
} from '../core/style-props';

const propsToStyleMap = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    get: theme.elements.color,
    isSuperSet: true,
    propNames: ['color'],
    styleProperties: ['color'],
  },
  {
    get: theme.elements.color,
    isSuperSet: true,
    propNames: ['bg', 'backgroundColor'],
    styleProperties: ['background-color'],
  },
  {
    get: theme.elements.opacity,
    isSuperSet: false,
    propNames: ['opacity'],
    styleProperties: ['opacity'],
  },
]);

export const position = mapPropsToStyles()(propsToStyleMap);