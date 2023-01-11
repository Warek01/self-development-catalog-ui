/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './styles/**/*.scss',
    './pages/**/*.{tsx,ts}',
    './components/**/*.{tsx,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#2D2D2D',
        'input-bg': '#F3F3F3',
        'card-bg': '#FFFCF5',
        'card-border': '#FFD285',
        'heading-green': '#009379',
        'pink-bg': '#F9E6F0',
      },
      spacing: {},
      fontFamily: {
        epilogue: 'var(--font-epilogue)',
      },
      fontSize: {
        17: '17px',
      },
    },
  },
};
