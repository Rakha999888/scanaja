/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        pastel: {
          purple: '#c4b5fd',
          'purple-bg': '#ede9fe',
          'purple-dark': '#7c3aed',
          pink: '#fbcfe8',
          'pink-dark': '#be185d',
          yellow: '#fde68a',
          'yellow-dark': '#92400e',
          green: '#a7f3d0',
          'green-dark': '#065f46',
          blue: '#bae6fd',
          'blue-dark': '#0369a1',
          peach: '#fed7aa',
          'peach-dark': '#9a3412',
        },
      },
    },
  },
  plugins: [],
}
