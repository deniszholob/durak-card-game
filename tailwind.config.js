const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      // https://tailwindcss.com/docs/customizing-colors
      colors: {
        primary: colors.sky,
        secondary: colors.amber,
        neutral: colors.neutral,
      },
    },
  },
  plugins: [],
};
