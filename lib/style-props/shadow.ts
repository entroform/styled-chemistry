import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  mapPropsToStyles,
} from '../core/style-props';

const propsToStyleMap = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    propNames: ['text-shadow'],
    styleProperties: ['text-shadow'],
  },
  {
    propNames: ['box-shadow'],
    styleProperties: ['box-shadow'],
  },
]);

export const shadow = mapPropsToStyles()(propsToStyleMap);