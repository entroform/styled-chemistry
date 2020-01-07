// 1) Maintain consistency and scalibility.
// 2) Create responsivity yet maintaining.

// Theme system:

function getValue<T = unknown>(element: ThemeElement<T>) {
  return (key?: string | number): T | null => {
    if (!key) {
      return element.set[element.default] || null;
    }

    if (element.alias && element.alias[key]) {
      return element.set[element.alias[key]] || null;
    }

    return element.set[key] || null;
  }
}

// Typography System

// Buttons and Inputs system

// margins, paddings

// Flex

// Grid

// Box

// Breakpoints

// useContext

const mapThemeToProps = () => {

}
