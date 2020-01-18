import React from 'react';

export const Flex = ({children, ...props}) => {
  return (
    <div>
      Hello
    </div>
  );
}

const styleConstructor = (property: string) => {
  return (value: number | string) => {
    return `${property}: ${value};`;
  }
}


// SPACE

export const space = props => {
  const keys = Object.keys(props);
}

// [b1, b2, b3]
// [a cssobj, b css obj, c obj]

// display
// flex, inline-flex

// flex-direction
// row, row-reverse, column | column-reverse

// justify-content
// flex-start, flex-end
// center
// space-between, space-around, space-evenly

// align-items
// flex-start, flex-end
// center
// space-between, space-around
// stretch

// flex-wrap
// nowrap, wrap, wrap-reverse

// FlexItem
// order
// grow
// basis

// https://roylee0704.github.io/react-flexbox-grid/