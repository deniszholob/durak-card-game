const colors = require('tailwindcss/colors');

const ICON_WRAP_SIZE = 64;
const ICON_PADDING = 8;
const ICON_SIZE = ICON_WRAP_SIZE - ICON_PADDING * 2;

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      // https://tailwindcss.com/docs/customizing-colors
      colors: {
        primary: colors.sky,
        secondary: colors.amber,
        black: colors.neutral,
        red: colors.red,
      },
      fontSize: {
        icon: `${ICON_SIZE}px`,
      },
      width: {
        'icon-wrap': `${ICON_WRAP_SIZE}px`,
      },
      height: {
        'icon-wrap': `${ICON_WRAP_SIZE}px`,
      },
      padding: {
        'icon-wrap': `${ICON_PADDING}px`,
      },
    },
  },
  plugins: [],
};
