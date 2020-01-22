import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  createStyleProps,
} from '../core/style-props';

const mapPropsToStyles = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    get: theme.elements.fontFamily,
    propNames: ['fontFamily'],
    styleProperties: ['font-family'],
  },
  {
    get: theme.elements.fontSize,
    propNames: ['fontSize'],
    styleProperties: ['font-size'],
  },
  {
    get: theme.elements.fontWeight,
    propNames: ['fontWeight'],
    styleProperties: ['font-weight'],
  },
  {
    get: theme.elements.lineHeight,
    propNames: ['lineHeight'],
    styleProperties: ['line-height'],
  },
  {
    get: theme.elements.letterSpacing,
    propNames: ['letterSpacing'],
    styleProperties: ['letter-spacing'],
  },
  {
    propNames: ['textAlign'],
    styleProperties: ['text-align'],
  },
  {
    propNames: ['fontStyle'],
    styleProperties: ['font-style'],
  },
]);

export const typography = createStyleProps()(mapPropsToStyles);