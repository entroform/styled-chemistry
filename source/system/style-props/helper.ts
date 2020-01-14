import {
  ITheme,
} from '../interfaces/theme';
import {
  IElementGetterFunction,
  ICompoundGetterFunction,
  IMixtureGetterFunction,
} from '../interfaces';

import React, { useContext } from 'react';
import {
  StyleChemistryContext
} from '../provider';

interface PropToStyleMapElement {
  propName: string;
  getter: IElementGetterFunction | ICompoundGetterFunction | IMixtureGetterFunction;
  styleProperties: string[];
}

interface PropToStyleMap {
  (theme: ITheme): PropToStyleMapElement[];
}

const map: PropToStyleMap = theme => [
  {
    propName: 'm',
    getter: theme.elements.fontSize,
    styleProperties: ['margin'],
  },
  {
    propName: 'my',
    getter: theme.elements.fontSize,
    styleProperties: ['margin-top', 'margin-bottom'],
  },
];

const mapProps =
(theme: ITheme) =>
(map: PropToStyleMap) =>
(props) => {
  map(theme).forEach(mapValue => {
    if (props[mapValue.propName]) {
      const value = props[mapValue.propName];
      if (Array.isArray(value)) {

      }
    }
  })
}

// prop values
// map to style properties
// map to breakpoints