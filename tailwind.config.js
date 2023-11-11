/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    maxWidth: {
      max90: '90%',
      max80: '80%',
      max70: '70%',
      max50: '50%',
    },
    minWidth: {
      min90: '90%',
      min80: '80%',
      min70: '70%',
      min50: '50%',
    },
    fontFamily: {
      sans: ['Poppins', ...defaultTheme.fontFamily.sans],
    },
    borderRadius: {
      none: '0px',
      '5px': '5px',
      '10px': '10px',
    },
    extend: {
      boxShadow: {
        'glass-navbar': '',
        'glass-toolbar': '',
        'glass-card': '0px 4px 4px 0px rgba(0, 0, 0, 0.25);',
        'glass-button': '',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    typography,
    animate,
    require('daisyui'),
    require('tailwind-scrollbar-hide'),
    require('autoprefixer'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#3175E3',
          'primary-focus': '#1150B7',
          'primary-content': '#FFFFFF',
          secondary: '#142440',
          'secondary-focus': '#070C15',
          'secondary-content': '#FFFFFF',
          accent: '#7e22ce',
          'accent-focus': 'AD00A5',
          'accent-content': '#FFFFFF',
          'base-100': '#F5E8F5',
          'base-200': '#CFFAFF',
          neutral: '#FFFFFF',
          'neutral-focus': '#F3F7FF',
          'neutral-content': '#000000',

          info: '#3670ce',
          'info-content': '#FFFFFF',
          success: '#86efac',
          'success-content': '#FFFFFF',
          warning: '#fbbf24',
          'warning-content': '#FFFFFF',
          error: '#ef4444',
          'error-content': '#FFFFFF',
        },
        'dark-wip': {
          primary: '#3175E3',
          'primary-focus': '#1150B7',
          'primary-content': '#FFFFFF',
          secondary: '#142440',
          'secondary-focus': '#070C15',
          'secondary-content': '#FFFFFF',
          accent: '#CA5CC5',
          'accent-focus': 'AD00A5',
          'accent-content': '#FFFFFF',
          neutral: '#FFFFFF',
          'neutral-focus': '#F3F7FF',
          'neutral-content': '#000000',
          info: '#3670ce',
          'info-content': '#FFFFFF',
          success: '#86efac',
          'success-content': '#FFFFFF',
          warning: '#fbbf24',
          'warning-content': '#FFFFFF',
          error: '#ef4444',
          'error-content': '#FFFFFF',
        },
      },
    ],
  },
};
