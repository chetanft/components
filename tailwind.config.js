/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
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
        'primary': {
          'dark': 'var(--primary-dark)',
          'DEFAULT': 'var(--primary)',
          'light': 'var(--primary-light)',
        },
        'neutral': {
          'dark': 'var(--neutral-dark)',
          'DEFAULT': 'var(--neutral)',
          'light': 'var(--neutral-light)',
        },
        // Unified component colors
        'component': {
          'border': 'var(--component-border-color)',
          'border-focus': 'var(--component-border-focus)',
          'bg-default': 'var(--component-bg-default)',
          'bg-hover': 'var(--component-bg-hover)',
          'bg-disabled': 'var(--component-bg-disabled)',
          'text-default': 'var(--component-text-default)',
          'text-muted': 'var(--component-text-muted)',
          'text-disabled': 'var(--component-text-disabled)',
        },
        'focus-ring': '#CED1D7',
      },
      ringColor: {
        'focus-ring': '#CED1D7',
      },
      // 8-Point Spacing System with 20px special unit
      spacing: {
        '0': '0px',      // 0
        '1': '4px',      // 1x
        '2': '8px',      // 2x
        '3': '12px',     // 3x
        '4': '16px',     // 4x
        '5': '20px',     // 5x - Key unit for components
        '6': '24px',     // 6x
        '7': '28px',     // 7x
        '8': '32px',     // 8x
        '9': '36px',     // 9x
        '10': '40px',    // 10x
        '11': '44px',    // 11x
        '12': '48px',    // 12x
        '13': '52px',    // 13x
        '14': '56px',    // 14x
        '15': '60px',    // 15x
        '16': '64px',    // 16x
        '18': '72px',    // 18x
        '20': '80px',    // 20x
        '24': '96px',    // 24x
        // Semantic spacing
        'component-padding-sm': '12px',  // 3x
        'component-padding-md': '20px',  // 5x
        'component-padding-lg': '32px',  // 8x
        'gap-sm': '8px',                 // 2x
        'gap-md': '16px',                // 4x
        'gap-lg': '24px',                // 6x
      },
      // Border Radius System
      borderRadius: {
        'none': '0px',
        'sm': '4px',      // Small elements: badges, checkboxes
        'DEFAULT': '8px', // Default radius
        'md': '8px',      // Buttons, inputs, cards
        'lg': '12px',     // Large cards, modals
        'xl': '16px',     // Hero sections
        'full': '9999px', // Pills and proper rounded elements
        'circle': '50%',  // Perfect circles
        // Component-specific
        'button': '8px',
        'input': '8px',
        'card': '12px',
        'badge': '4px',
        'modal': '12px',
        'pill': '9999px', // For tertiary tabs and pill-shaped elements
        'component': 'var(--component-border-radius)',
      },
      // Shadow & Elevation System
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(67, 79, 100, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(67, 79, 100, 0.1), 0 1px 2px 0 rgba(67, 79, 100, 0.06)',
        'md': '0 4px 6px -1px rgba(67, 79, 100, 0.1), 0 2px 4px -1px rgba(67, 79, 100, 0.06)',
        'lg': '0 10px 15px -3px rgba(67, 79, 100, 0.1), 0 4px 6px -2px rgba(67, 79, 100, 0.05)',
        'xl': '0 20px 25px -5px rgba(67, 79, 100, 0.1), 0 10px 10px -5px rgba(67, 79, 100, 0.04)',
        '2xl': '0 25px 50px -12px rgba(67, 79, 100, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(67, 79, 100, 0.06)',
        'none': 'none',
        // Component-specific shadows
        'button': '0 1px 2px 0 rgba(67, 79, 100, 0.05)',
        'card': '0 4px 6px -1px rgba(67, 79, 100, 0.1), 0 2px 4px -1px rgba(67, 79, 100, 0.06)',
        'modal': '0 20px 25px -5px rgba(67, 79, 100, 0.1), 0 10px 10px -5px rgba(67, 79, 100, 0.04)',
        'dropdown': '0 10px 15px -3px rgba(67, 79, 100, 0.1), 0 4px 6px -2px rgba(67, 79, 100, 0.05)',
        'component-focus': 'var(--component-shadow-focus)',
        'component-hover': 'var(--component-shadow-hover)',
      },
      // Opacity System
      opacity: {
        '0': '0',
        '5': '0.05',
        '10': '0.1',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '40': '0.4',     // Disabled state
        '50': '0.5',     // Overlay
        '60': '0.6',     // Muted
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',     // Hover
        '90': '0.9',     // Focus
        '95': '0.95',    // Tooltip
        '100': '1',
        // Semantic opacity
        'disabled': '0.4',
        'muted': '0.6',
        'hover': '0.8',
        'focus': '0.9',
        'overlay': '0.5',
        'tooltip': '0.95',
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
        'component-sm': ['var(--component-font-size-sm)', { fontWeight: 'var(--component-font-weight)' }],
        'component-md': ['var(--component-font-size-md)', { fontWeight: 'var(--component-font-weight)' }],
        'component-lg': ['var(--component-font-size-lg)', { fontWeight: 'var(--component-font-weight)' }],
        'component-xl': ['var(--component-font-size-xl)', { fontWeight: 'var(--component-font-weight)' }],
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
      // Animation & Transitions
      transitionDuration: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'ease-out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'ease-in-cubic': 'cubic-bezier(0.32, 0, 0.67, 0)',
        'ease-in-out-cubic': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      // Component-specific heights for consistency
      height: {
        // Standard component heights - ensures Button, Input, Dropdown, DatePicker match
        'component-sm': 'var(--component-height-sm)',  // 36px
        'component-md': 'var(--component-height-md)',  // 44px
        'component-lg': 'var(--component-height-lg)',  // 52px
        'component-xl': 'var(--component-height-xl)',  // 64px
      },
      width: {
        'component-sm': 'var(--component-height-sm)',  // 36px (for square components)
        'component-md': 'var(--component-height-md)',  // 44px
        'component-lg': 'var(--component-height-lg)',  // 52px
        'component-xl': 'var(--component-height-xl)',  // 64px
      },
      padding: {
        'component-sm': 'var(--component-padding-sm)',
        'component-md': 'var(--component-padding-md)',
        'component-lg': 'var(--component-padding-lg)',
        'component-xl': 'var(--component-padding-xl)',
      },
      gap: {
        'component-sm': 'var(--component-gap-sm)',
        'component-md': 'var(--component-gap-md)',
        'component-lg': 'var(--component-gap-lg)',
      },
      borderWidth: {
        'component': 'var(--component-border-width)',
      },
      transitionProperty: {
        'component': 'var(--component-transition)',
      },
    },
  },
  plugins: [],
}; 