
const breakpointsResolver = props => {
  const { breakpoint } = props.theme.elements;
  if (props.breakpoints) {
    breakpoint('')
  }
}

const map = {
  mx: {
    getter: 'space',
    cssProperties: ['margin-left', 'margin-right'],
  },
  my: {
    getter: 'space',
    cssProperties: ['margin-top', 'margin-bottom'],
  },
  mb: {
    getter: 'space',
    cssProperties: ['margin-bottom'],
  },
};

const stylePropsConstructor = map => props => {
  const style = ``;

  

  Object.keys(map).forEach(key => {
    if (props[key]) {

      // If array:
      if (Array.isArray(props[key])) {
        props[key]
      }

      props[key].cssProperties.map(property => `${property}: ${}`)
    }
  });
}
