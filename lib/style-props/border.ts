import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  createStyleProps,
} from '../core/style-props';

const mapPropsToStyles = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    propNames: ['border'],
    styleProperties: ['border'],
  },
  {
    get: theme.elements.borderWidth,
    propNames: ['borderWidth'],
    styleProperties: ['border-width'],
  },
  {
    get: theme.elements.borderStyle,
    propNames: ['borderStyle'],
    styleProperties: ['border-style'],
  },
  {
    get: theme.elements.color,
    isSuperSet: true,
    propNames: ['borderColor'],
    styleProperties: ['border-color'],
  },
  {
    get: theme.elements.radius,
    propNames: ['borderRadius'],
    styleProperties: ['border-radius'],
  },
  // border-top
  {
    propNames: ['borderTop'],
    styleProperties: ['border-top'],
  },
  {
    get: theme.elements.borderWidth,
    propNames: ['borderTopWidth'],
    styleProperties: ['border-top-width'],
  },
  {
    get: theme.elements.borderStyle,
    propNames: ['borderTopStyle'],
    styleProperties: ['border-top-style'],
  },
  {
    get: theme.elements.color,
    isSuperSet: true,
    propNames: ['borderTopColor'],
    styleProperties: ['border-top-color'],
  },
  {
    get: theme.elements.radius,
    propNames: ['borderTopLeftRadius'],
    styleProperties: ['border-top-left-radius'],
  },
  {
    get: theme.elements.radius,
    propNames: ['borderTopRightRadius'],
    styleProperties: ['border-top-right-radius'],
  },
  // border-right
  {
    propNames: ['borderRight'],
    styleProperties: ['border-right'],
  },
  {
    get: theme.elements.borderWidth,
    propNames: ['borderRightWidth'],
    styleProperties: ['border-right-width'],
  },
  {
    get: theme.elements.borderStyle,
    propNames: ['borderRightStyle'],
    styleProperties: ['border-right-style'],
  },
  {
    get: theme.elements.color,
    isSuperSet: true,
    propNames: ['borderRightColor'],
    styleProperties: ['border-right-color'],
  },
  // border-bottom
  {
    propNames: ['borderBottom'],
    styleProperties: ['border-bottom'],
  },
  {
    get: theme.elements.borderWidth,
    propNames: ['borderBottomWidth'],
    styleProperties: ['border-bottom-width'],
  },
  {
    get: theme.elements.borderStyle,
    propNames: ['borderBottomStyle'],
    styleProperties: ['border-bottom-style'],
  },
  {
    get: theme.elements.color,
    isSuperSet: true,
    propNames: ['borderBottomColor'],
    styleProperties: ['border-bottom-color'],
  },
  {
    get: theme.elements.radius,
    propNames: ['borderBottomLeftRadius'],
    styleProperties: ['border-bottom-left-radius'],
  },
  {
    get: theme.elements.radius,
    propNames: ['borderBottomRightRadius'],
    styleProperties: ['border-bottom-right-radius'],
  },
  // border-left
  {
    propNames: ['borderLeft'],
    styleProperties: ['border-left'],
  },
  {
    get: theme.elements.borderWidth,
    propNames: ['borderLeftWidth'],
    styleProperties: ['border-left-width'],
  },
  {
    get: theme.elements.borderStyle,
    propNames: ['borderLeftStyle'],
    styleProperties: ['border-left-style'],
  },
  {
    get: theme.elements.color,
    isSuperSet: true,
    propNames: ['borderLeftColor'],
    styleProperties: ['border-left-color'],
  },
  // border X and Y.
  {
    propNames: ['borderX'],
    styleProperties: ['border-left', 'border-right'],
  },
  {
    propNames: ['borderY'],
    styleProperties: ['border-top', 'border-bottom'],
  },
]);

export const border = createStyleProps()(mapPropsToStyles);