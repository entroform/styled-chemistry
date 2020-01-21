import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  mapPropsToStyles,
} from '../core/style-props';

const propsToStyleMap = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    propNames: ['background'],
    styleProperties: ['background'],
  },
  {
    get: theme.elements.image,
    propNames: ['backgroundImage'],
    styleProperties: ['background-image'],
  },
  {
    propNames: ['backgroundSize'],
    styleProperties: ['background-size'],
  },
  {
    propNames: ['backgroundPosition'],
    styleProperties: ['background-position'],
  },
  {
    propNames: ['backgroundRepeat'],
    styleProperties: ['background-repeat'],
  },
]);

export const background = mapPropsToStyles()(propsToStyleMap);