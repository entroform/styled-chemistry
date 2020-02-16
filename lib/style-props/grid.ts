import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  createStyleProps,
} from '../core/style-props';

const mapPropsToStyles = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    get: theme.elements.space,
    isSuperSet: false,
    propNames: ['gridGap'],
    styleProperties: ['grid-gap'],
  },
  {
    get: theme.elements.space,
    isSuperSet: false,
    propNames: ['gridRowGap'],
    styleProperties: ['grid-row-gap'],
  },
  {
    get: theme.elements.space,
    isSuperSet: false,
    propNames: ['gridColumnGap'],
    styleProperties: ['grid-column-gap'],
  },
  {
    propNames: ['gridColumn'],
    styleProperties: ['grid-column'],
  },
  {
    propNames: ['gridRow'],
    styleProperties: ['grid-row'],
  },
  {
    propNames: ['gridArea'],
    styleProperties: ['grid-area'],
  },
  {
    propNames: ['gridAutoFlow'],
    styleProperties: ['grid-auto-flow'],
  },
  {
    propNames: ['gridAutoRows'],
    styleProperties: ['grid-auto-rows'],
  },
  {
    propNames: ['gridAutoColumns'],
    styleProperties: ['grid-auto-columns'],
  },
  {
    propNames: ['gridTemplateRows'],
    styleProperties: ['grid-template-rows'],
  },
  {
    propNames: ['gridTemplateColumns'],
    styleProperties: ['grid-template-columns'],
  },
  {
    propNames: ['gridTemplateAreas'],
    styleProperties: ['grid-template-areas'],
  },
]);

export const grid = createStyleProps()(mapPropsToStyles);