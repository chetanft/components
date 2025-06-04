/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CSS variables for colors
        'dark-100': 'var(--dark-100)',
        'dark-50': 'var(--dark-50)',
        'dark-25': 'var(--dark-25)',
        'box-border': 'var(--box-border)',
        'divider': 'var(--divider)',
        'bg': 'var(--bg)',
        'white': 'var(--white)',
        'critical': {
          'dark': 'var(--critical-dark)',
          'DEFAULT': 'var(--critical)',
          'light': 'var(--critical-light)',
        },
        'warning': {
          'dark': 'var(--warning-dark)',
          'DEFAULT': 'var(--warning)',
          'light': 'var(--warning-light)',
        },
        'positive': {
          'dark': 'var(--positive-dark)',
          'DEFAULT': 'var(--positive)',
          'light': 'var(--positive-light)',
        },
        'neutral': {
          'dark': 'var(--neutral-dark)',
          'DEFAULT': 'var(--neutral)',
          'light': 'var(--neutral-light)',
        },
      },
      fontFamily: {
        'title-primary': ['var(--font-family-title-primary)'],
        'title-secondary': ['var(--font-family-title-secondary)'],
        'display-primary': ['var(--font-family-display-primary)'],
        'body-primary': ['var(--font-family-body-primary)'],
        'body-secondary': ['var(--font-family-body-secondary)'],
        'btn': ['var(--font-family-btn)'],
      },
      fontSize: {
        'title-h1': 'var(--font-size-title-h1)',
        'display': 'var(--font-size-display)',
        'body-primary': 'var(--font-size-body-primary)',
        'body-secondary': 'var(--font-size-body-secondary)',
        'btn': 'var(--font-size-btn)',
      },
      lineHeight: {
        'title': 'var(--line-height-title)',
        'display': 'var(--line-height-display)',
        'body': 'var(--line-height-body)',
        'btn': 'var(--line-height-btn)',
      },
      letterSpacing: {
        'btn': 'var(--letter-spacing-btn)',
      },
    },
  },
  plugins: [],
}; 