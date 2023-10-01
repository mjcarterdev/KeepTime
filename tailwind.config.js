/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/client/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#0e7777',

          secondary: '#c41b78',

          accent: '#8eed9c',

          neutral: '#221d2b',

          'base-100': '#e1eaef',

          info: '#87d8f8',

          success: '#18aa7c',

          warning: '#f1b127',

          error: '#ee2f5c',
        },
      },
      {
        dark: {
          primary: '#a9fcdd',

          secondary: '#b0bf2f',

          accent: '#eda8b2',

          neutral: '#1f2d38',

          'base-100': '#434856',

          info: '#9db6f6',

          success: '#0b5b42',

          warning: '#f7be55',

          error: '#ea346d',
        },
      },
    ],
  },
};
