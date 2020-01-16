const propsToStyleSpaceMap: IPropsToStyleMap = theme => ({
  m: {
    get: theme.elements.space,
    styleProperties: ['margin'],
    isSuperSet: false,
  },
  mx: {
    get: theme.elements.space,
    styleProperties: ['margin-left', 'margin-right'],
    isSuperSet: false,
  },
  my: {
    get: theme.elements.space,
    styleProperties: ['margin-top', 'margin-bottom'],
    isSuperSet: false,
  },
  ml: {
    get: theme.elements.space,
    styleProperties: ['margin-left'],
    isSuperSet: false,
  },
  mr: {
    get: theme.elements.space,
    styleProperties: ['margin-right'],
    isSuperSet: false,
  },
});