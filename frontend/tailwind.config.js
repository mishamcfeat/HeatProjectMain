/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#EDF2F0',
        'neu-1': '#ecf0f3',
        'neu-2': '#d1d9e6',
        'white': '#f9f9f9',
        'gray': '#a0a5a8',
        'black': '#181818',
        'red': '#cb2525',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'inner': 'inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9',
        'inner-focus': 'inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9',
        'md': '8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9',
      },
      transitionDuration: {
        '250': '250ms',
        'transition': '1250ms',
      },
      zIndex: {
        '200': '200',
      },
    },
  },
  plugins: [],
};
