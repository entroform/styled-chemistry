import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  mapPropsToStyles,
} from '../core/style-props';

const propsToStyleMap = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    propNames: ['fontFamily'],
    get: theme.elements.fontFamily,
    styleProperties: ['font-family'],
    isSuperSet: false,
  },
  {
    propNames: ['fontSize'],
    get: theme.elements.fontSize,
    styleProperties: ['font-size'],
    isSuperSet: false,
  },
  {
    propNames: ['fontWeight'],
    get: theme.elements.fontWeight,
    styleProperties: ['font-weight'],
    isSuperSet: false,
  },
  {
    propNames: ['lineHeight'],
    get: theme.elements.lineHeight,
    styleProperties: ['line-height'],
    isSuperSet: false,
  },
  {
    propNames: ['letterSpacing'],
    get: theme.elements.letterSpacing,
    styleProperties: ['letter-spacing'],
    isSuperSet: false,
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

export const typography = mapPropsToStyles()(propsToStyleMap);