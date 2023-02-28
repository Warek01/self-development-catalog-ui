/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,scss}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#2D2D2D',
        'input-bg': '#F3F3F3',
        'card-bg': '#FFFCF5',
        'card-bg-dark': '#2d3436',
        'card-border': '#FFD285',
        'heading-green': '#009379',
        'pink-bg': '#F9E6F0',
        'link-blue': '#3498db',
      },
      spacing: {},
      fontFamily: {
        epilogue: 'var(--font-epilogue)',
        inconsolata: 'var(--font-inconsolata)',
      },
      fontSize: {
        17: '17px',
      },
    },
  },
};
