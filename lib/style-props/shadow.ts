import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  createStyleProps,
} from '../core/style-props';

const mapPropsToStyles = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    propNames: ['text-shadow'],
    styleProperties: ['text-shadow'],
  },
  {
    propNames: ['box-shadow'],
    styleProperties: ['box-shadow'],
  },
]);

export const shadow = createStyleProps()(mapPropsToStyles);