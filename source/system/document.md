# Style System

## Atoms
These are the building blocks of our design system.
They are the universe set of all the "valid" parts of the theme.

## A scale has these properties
```
set: [number | string]
default: number
alias: [property: string]: number
```

baseFontSize
baseLineHeight

## These are broken down into a set of foundational set of scales, atomic scales?:
- fonts
  - families
  - sizes
  - weights
  - lineHeights
  - letterSpacings
- spaces
- sizes
- colors
- border
  - widths
  - styles
- radii
- breakpoints
- zIndices

## Getters
There are available for both atoms and molecule types.

Each of these will have defaults.

## These can be composed in the "stylesheet"
## These scales can be composed down into: "Molecules"
## Poly Type
- typography
  - family, size, weight, lineHeight, letterSpacing
- borderStyles
  - color borderWith solid etc..
- gradients
- shadows (add alpha modifier to color)
- layer type?

### Utilities
- breakpoints

## props-function
colors: color, backgroundColor, borderColor, alpha(uses color lib to change)
spaces: margin, padding,  grid-gap, grid-column-gap, grid-row-gap
sizes: width, minWidth, maxWidth, height, minHeight, maxHeight
position: zIndices, top, left, right, bottom, position type:

gradients: gradient
shadow: BoxShadow, TextShadow
border: style
text: align, style, appearance, decoration etc.. size family, lineheight, spacing, weight font: ^typography
> color alpha modifier
type:

## Useful components
Flex
FlexItem?
Grid, Row, Column
Text
Icon

## UI
Button
Input

FlexGrid -> FlexGridRow, FlexGridColumn

## Add this to the 
borderStyles

Buttons
- Size:
- Variant: Primary, Secondary, etc
- Type: Normal, Outlined, Ghost, Link
- State: Hover, Active, Focus, Disabled

// mapScalesToProperty