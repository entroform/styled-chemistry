import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  createStyleProps,
} from '../core/style-props';

const mapPropsToStyles = (theme: ITheme): IPropsToStyleMapArray => ([
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

export const background = createStyleProps()(mapPropsToStyles);