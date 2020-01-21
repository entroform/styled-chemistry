import {
  IPropsToStyleMapArray,
  ITheme,
} from '../interfaces';

import {
  mapPropsToStyles,
} from '../core/style-props';

const propsToStyleMap = (theme: ITheme): IPropsToStyleMapArray => ([
  {
    propNames: ['position'],
    styleProperties: ['position'],
  },
  {
    get: theme.elements.zIndex,
    propNames: ['zIndex'],
    styleProperties: ['z-index'],
  },
  {
    get: theme.elements.space,
    propNames: ['top'],
    styleProperties: ['top'],
  },
  {
    get: theme.elements.space,
    propNames: ['right'],
    styleProperties: ['right'],
  },
  {
    get: theme.elements.space,
    propNames: ['bottom'],
    styleProperties: ['bottom'],
  },
  {
    get: theme.elements.space,
    propNames: ['left'],
    styleProperties: ['left'],
  },
]);

export const position = mapPropsToStyles()(propsToStyleMap);