/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['roboto'],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#238fc2',
          'primary-content': '#ffffff',
          secondary: '#a3e635',
          accent: '#f43f5e',
          neutral: '#142440',
          'neutral-focus': '#238fc2',
          'base-100': '#e5e7eb',
          info: '#3670ce',
          success: '#86efac',
          warning: '#fbbf24',
          error: '#ef4444',
        },
      },
      {
        dark: {
          primary: '#443dc6',

          secondary: '#29f4aa',

          accent: '#919cff',

          neutral: '#232a34',

          'base-100': '#3b3f54',

          info: '#3956db',

          success: '#289f81',

          warning: '#edc61d',

          error: '#fb467c',
        },
      },
    ],
  },
};
