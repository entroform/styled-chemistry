import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  createStyleProps,
} from '../core/style-props';

const mapPropsToStyles = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    propNames: ['alignItems'],
    styleProperties: ['align-items'],
  },
  {
    propNames: ['alignContent'],
    styleProperties: ['align-content'],
  },
  {
    propNames: ['justifyItems'],
    styleProperties: ['justify-items'],
  },
  {
    propNames: ['justifyContent'],
    styleProperties: ['justify-content'],
  },
  {
    propNames: ['flexWrap'],
    styleProperties: ['flex-wrap'],
  },
  {
    propNames: ['flexDirection'],
    styleProperties: ['flex-direction'],
  },
  {
    propNames: ['flex'],
    styleProperties: ['flex'],
  },
  {
    propNames: ['flexGrow'],
    styleProperties: ['flex-grow'],
  },
  {
    propNames: ['flexShrink'],
    styleProperties: ['flex-shrink'],
  },
  {
    propNames: ['flexBasis'],
    styleProperties: ['flex-basis'],
  },
  {
    propNames: ['justifySelf'],
    styleProperties: ['justify-self'],
  },
  {
    propNames: ['alignSelf'],
    styleProperties: ['align-self'],
  },
  {
    propNames: ['order'],
    styleProperties: ['order'],
  },
]);

export const flexbox = createStyleProps()(mapPropsToStyles);