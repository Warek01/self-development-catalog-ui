/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'styles/**/*.{scss}',
    'pages/**/*.{tsx?}',
    'components/**/*.{tsx?}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
      spacing: {},
      fontFamily: {
        epilogue: 'var(--font-epilogue)',
      },
    },
  },
};
