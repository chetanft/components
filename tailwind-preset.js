/**
 * FT Design System - Tailwind CSS Preset
 * 
 * Use this preset in your Tailwind config to automatically include:
 * - FT Design System content paths
 * - Theme extensions (colors, spacing, typography)
 * - Plugin configurations
 * 
 * @example
 * ```js
 * // tailwind.config.js
 * module.exports = {
 *   presets: [require('ft-design-system/tailwind-preset')],
 *   // Your additional config...
 * }
 * ```
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Content paths - automatically includes FT Design System components
  content: [
    './node_modules/ft-design-system/dist/**/*.{js,jsx}',
  ],
  
  // Dark mode configuration
  darkMode: 'class',
  
  theme: {
    extend: {
      // ===========================================
      // COLOR SYSTEM - FT Design System Tokens
      // ===========================================
      colors: {
        // BASE COLOR SCALES - Direct access to all shades
        primary: {
          900: 'var(--primary-900)',
          800: 'var(--primary-800)',
          700: 'var(--primary-700)',
          600: 'var(--primary-600)',
          500: 'var(--primary-500)',
          400: 'var(--primary-400)',
          300: 'var(--primary-300)',
          200: 'var(--primary-200)',
          100: 'var(--primary-100)',
          DEFAULT: 'var(--primary)',
        },
        secondary: {
          900: 'var(--secondary-900)',
          800: 'var(--secondary-800)',
          700: 'var(--secondary-700)',
          600: 'var(--secondary-600)',
          500: 'var(--secondary-500)',
          400: 'var(--secondary-400)',
          300: 'var(--secondary-300)',
          200: 'var(--secondary-200)',
          100: 'var(--secondary-100)',
          DEFAULT: 'var(--secondary)',
        },
        tertiary: {
          900: 'var(--tertiary-900)',
          800: 'var(--tertiary-800)',
          700: 'var(--tertiary-700)',
          600: 'var(--tertiary-600)',
          500: 'var(--tertiary-500)',
          400: 'var(--tertiary-400)',
          300: 'var(--tertiary-300)',
          200: 'var(--tertiary-200)',
          100: 'var(--tertiary-100)',
          0: 'var(--tertiary-0)',
          DEFAULT: 'var(--tertiary)',
        },
        neutral: {
          900: 'var(--neutral-900)',
          800: 'var(--neutral-800)',
          700: 'var(--neutral-700)',
          600: 'var(--neutral-600)',
          500: 'var(--neutral-500)',
          400: 'var(--neutral-400)',
          300: 'var(--neutral-300)',
          200: 'var(--neutral-200)',
          100: 'var(--neutral-100)',
          DEFAULT: 'var(--neutral)',
          dark: 'var(--neutral-dark)',
          light: 'var(--neutral-light)',
        },
        positive: {
          900: 'var(--positive-900)',
          800: 'var(--positive-800)',
          700: 'var(--positive-700)',
          600: 'var(--positive-600)',
          500: 'var(--positive-500)',
          400: 'var(--positive-400)',
          300: 'var(--positive-300)',
          200: 'var(--positive-200)',
          100: 'var(--positive-100)',
          DEFAULT: 'var(--positive)',
          dark: 'var(--positive-dark)',
          light: 'var(--positive-light)',
        },
        warning: {
          900: 'var(--warning-900)',
          800: 'var(--warning-800)',
          700: 'var(--warning-700)',
          600: 'var(--warning-600)',
          500: 'var(--warning-500)',
          400: 'var(--warning-400)',
          300: 'var(--warning-300)',
          200: 'var(--warning-200)',
          100: 'var(--warning-100)',
          DEFAULT: 'var(--warning)',
          dark: 'var(--warning-dark)',
          light: 'var(--warning-light)',
        },
        danger: {
          900: 'var(--danger-900)',
          800: 'var(--danger-800)',
          700: 'var(--danger-700)',
          600: 'var(--danger-600)',
          500: 'var(--danger-500)',
          400: 'var(--danger-400)',
          300: 'var(--danger-300)',
          200: 'var(--danger-200)',
          100: 'var(--danger-100)',
          DEFAULT: 'var(--danger-500)',
        },
        // Semantic aliases
        critical: {
          DEFAULT: 'var(--critical)',
          dark: 'var(--critical-dark)',
          light: 'var(--critical-light)',
        },
        // Border colors
        'border-primary': 'var(--border-primary)',
        'border-secondary': 'var(--border-secondary)',
        // Background colors
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        // Surface colors (for forms)
        surface: {
          DEFAULT: 'var(--surface)',
          alt: 'var(--surface-alt)',
          hover: 'var(--surface-hover)',
        },
        // Input colors
        input: {
          DEFAULT: 'var(--input)',
          muted: 'var(--input-muted)',
          disabled: 'var(--input-disabled)',
        },
        // Focus colors
        focus: {
          DEFAULT: 'var(--focus)',
          ring: 'var(--focus-ring)',
        },
        // Button colors (for direct class usage)
        button: {
          primary: {
            bg: 'var(--button-primary-bg)',
            text: 'var(--button-primary-text)',
            hover: 'var(--button-primary-hover-bg)',
            border: 'var(--button-primary-border)',
          },
          secondary: {
            bg: 'var(--button-secondary-bg)',
            text: 'var(--button-secondary-text)',
            hover: 'var(--button-secondary-hover-bg)',
            border: 'var(--button-secondary-border)',
            'hover-border': 'var(--button-secondary-hover-border)',
          },
          destructive: {
            bg: 'var(--button-destructive-bg)',
            text: 'var(--button-destructive-text)',
            hover: 'var(--button-destructive-hover-bg)',
            border: 'var(--button-destructive-border)',
          },
          text: {
            bg: 'var(--button-text-bg)',
            text: 'var(--button-text-text)',
            hover: 'var(--button-text-hover-bg)',
            border: 'var(--button-text-border)',
          },
        },
        // Badge colors
        badge: {
          normal: {
            bg: 'var(--badge-normal-bg)',
            text: 'var(--badge-normal-text)',
            border: 'var(--badge-normal-border)',
          },
          success: {
            bg: 'var(--badge-success-bg)',
            text: 'var(--badge-success-text)',
            border: 'var(--badge-success-border)',
          },
          warning: {
            bg: 'var(--badge-warning-bg)',
            text: 'var(--badge-warning-text)',
            border: 'var(--badge-warning-border)',
          },
          danger: {
            bg: 'var(--badge-danger-bg)',
            text: 'var(--badge-danger-text)',
            border: 'var(--badge-danger-border)',
          },
          neutral: {
            bg: 'var(--badge-neutral-bg)',
            text: 'var(--badge-neutral-text)',
          },
        },
      },
      
      // ===========================================
      // SPACING SYSTEM - 8-Point Grid
      // ===========================================
      spacing: {
        'x0': 'var(--x0)',
        'x1': 'var(--x1)',
        'x2': 'var(--x2)',
        'x3': 'var(--x3)',
        'x4': 'var(--x4)',
        'x5': 'var(--x5)',
        'x6': 'var(--x6)',
        'x7': 'var(--x7)',
        'x8': 'var(--x8)',
        'x9': 'var(--x9)',
        'x10': 'var(--x10)',
        'x11': 'var(--x11)',
        'x12': 'var(--x12)',
        'x13': 'var(--x13)',
        'x14': 'var(--x14)',
        'x15': 'var(--x15)',
        'x16': 'var(--x16)',
        'x20': 'var(--x20)',
        'x24': 'var(--x24)',
      },
      
      // ===========================================
      // BORDER RADIUS TOKENS
      // ===========================================
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        'component': 'var(--component-border-radius)',
        'pill': '9999px',
        'circle': '50%',
      },
      
      // ===========================================
      // SHADOW TOKENS
      // ===========================================
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
      
      // ===========================================
      // TYPOGRAPHY TOKENS
      // ===========================================
      fontFamily: {
        'primary': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        'xxl': '28px',
        // Rem-based responsive font sizes
        'xs-rem': 'var(--font-size-xs-rem)',
        'sm-rem': 'var(--font-size-sm-rem)',
        'md-rem': 'var(--font-size-md-rem)',
        'lg-rem': 'var(--font-size-lg-rem)',
        'xl-rem': 'var(--font-size-xl-rem)',
        'xxl-rem': 'var(--font-size-xxl-rem)',
      },
      fontWeight: {
        'regular': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      
      // ===========================================
      // COMPONENT SYSTEM DIMENSIONS
      // ===========================================
      height: {
        'component-xxs': 'var(--component-height-xxs)',
        'component-xs': 'var(--component-height-xs)',
        'component-sm': 'var(--component-height-sm)',
        'component-md': 'var(--component-height-md)',
        'component-lg': 'var(--component-height-lg)',
        'component-xl': 'var(--component-height-xl)',
        'component-xxl': 'var(--component-height-xxl)',
      },
      width: {
        'component-xxs': 'var(--component-height-xxs)',
        'component-xs': 'var(--component-height-xs)',
        'component-sm': 'var(--component-height-sm)',
        'component-md': 'var(--component-height-md)',
        'component-lg': 'var(--component-height-lg)',
        'component-xl': 'var(--component-height-xl)',
        'component-xxl': 'var(--component-height-xxl)',
      },
      gap: {
        'component-sm': 'var(--component-gap-sm)',
        'component-md': 'var(--component-gap-md)',
        'component-lg': 'var(--component-gap-lg)',
      },
      
      // ===========================================
      // TRANSITIONS
      // ===========================================
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'normal': 'var(--transition-normal)',
        'slow': 'var(--transition-slow)',
      },
      
      // ===========================================
      // OPACITY
      // ===========================================
      opacity: {
        'disabled': '0.4',
        'muted': '0.6',
        'hover': '0.8',
        'overlay': '0.5',
      },
    },
  },
  
  plugins: [],
};
