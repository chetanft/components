import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/stories/**/*.{js,jsx,ts,tsx}',
  ],
  
  // CRITICAL: Safelist ensures all design system classes are included in dist/styles.css
  safelist: [
    // BASE COLOR SCALES - All shades for all families
    ...['primary', 'secondary', 'tertiary', 'neutral', 'positive', 'warning', 'danger'].flatMap(family => 
      ['900', '800', '700', '600', '500', '400', '300', '200', '100', ...(family === 'tertiary' ? ['0'] : [])].flatMap(shade => [
        `bg-${family}-${shade}`,
        `text-${family}-${shade}`,
        `border-${family}-${shade}`,
      ])
    ),
    
    // CSS Variable-based colors
    'bg-[var(--primary)]',
    'bg-[var(--secondary)]', 
    'bg-[var(--tertiary)]',
    'bg-[var(--border-primary)]',
    'bg-[var(--border-secondary)]',
    'bg-[var(--bg-primary)]',
    'bg-[var(--bg-secondary)]',
    'bg-[var(--critical)]',
    'bg-[var(--warning)]',
    'bg-[var(--positive)]',
    'bg-[var(--neutral)]',
    
    'text-[var(--primary)]',
    'text-[var(--secondary)]',
    'text-[var(--tertiary)]',
    'text-[var(--critical)]',
    'text-[var(--warning)]',
    'text-[var(--positive)]',
    'text-[var(--neutral)]',
    
    'border-[var(--primary)]',
    'border-[var(--secondary)]',
    'border-[var(--tertiary)]',
    'border-[var(--border-primary)]',
    'border-[var(--border-secondary)]',
    'border-[var(--critical)]',
    
    // Button-specific variables
    'bg-[var(--button-primary-bg)]',
    'bg-[var(--button-secondary-bg)]',
    'bg-[var(--button-destructive-bg)]',
    'bg-[var(--button-text-bg)]',
    'text-[var(--button-primary-text)]',
    'text-[var(--button-secondary-text)]',
    'text-[var(--button-destructive-text)]',
    'text-[var(--button-text-text)]',
    
    // Badge-specific variables (MISSING - this was the issue!)
    'bg-[var(--badge-normal-bg)]',
    'bg-[var(--badge-danger-bg)]',
    'bg-[var(--badge-success-bg)]',
    'bg-[var(--badge-warning-bg)]',
    'bg-[var(--badge-neutral-bg)]',
    'text-[var(--badge-normal-text)]',
    'text-[var(--badge-danger-text)]',
    'text-[var(--badge-success-text)]',
    'text-[var(--badge-warning-text)]',
    'text-[var(--badge-neutral-text)]',
    'border-[var(--badge-normal-border)]',
    'border-[var(--badge-danger-border)]',
    'border-[var(--badge-success-border)]',
    'border-[var(--badge-warning-border)]',
    
    // Component sizing
    'w-[var(--radio-size)]',
    'h-[var(--radio-size)]',
    'gap-[var(--radio-gap)]',
    'rounded-[var(--badge-border-radius)]',
    'rounded-[var(--component-border-radius)]',
    
    // Form system variables
    'bg-[var(--surface)]',
    'bg-[var(--surface-alt)]',
    'bg-[var(--input)]',
    'text-[var(--input)]',
    'border-[var(--border)]',
    'border-[var(--focus)]',
    
    // Size variants
    'h-component-xxs',
    'h-component-xs',
    'h-component-sm',
    'h-component-md', 
    'h-component-lg',
    'h-component-xl',
    'h-component-xxl',
    'w-component-xxs',
    'w-component-xs',
    'w-component-sm',
    'w-component-md',
    'w-component-lg',
    'w-component-xl',
    'w-component-xxl',
    
    // Font sizes from design tokens
    'text-[12px]',
    'text-[14px]', 
    'text-[16px]',
    'text-[20px]',
    'text-[24px]',
    'text-[28px]',
    
    // Spacing tokens
    'p-[6px]',
    'p-[8px]',
    'p-[12px]',
    'p-[16px]',
    'p-[20px]',
    'px-[6px]',
    'px-[8px]',
    'py-[1px]',
    'py-[2px]',
    'gap-[6px]',
    'gap-[8px]',
    'gap-[12px]',
    'gap-[16px]',
  ],
  theme: {
    extend: {
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
        },

        // SEMANTIC COLOR SYSTEM
        'primary': 'var(--primary)', // #434f64 - Main text, primary actions
        'secondary': 'var(--secondary)', // #5f697b - Secondary text, muted content  
        'tertiary': 'var(--tertiary)', // #838c9d - Subtle text, disabled states
        
        // BORDER COLORS
        'border-primary': 'var(--border-primary)', // #ced1d7 - Primary borders, form elements
        'border-secondary': 'var(--border-secondary)', // #f0f1f7 - Dividers, subtle separators
        
        // BACKGROUND COLORS  
        'bg-primary': 'var(--bg-primary)', // #ffffff - Cards, surfaces, main backgrounds
        'bg-secondary': 'var(--bg-secondary)', // #f8f8f9 - Page backgrounds, subtle fills
        
        // STATUS COLORS (unchanged)
        'critical': {
          'dark': 'var(--critical-dark)', // #b80100
          DEFAULT: 'var(--critical)', // #ff3533
          'light': 'var(--critical-light)', // #ffeaea
        },
        'warning': {
          'dark': 'var(--warning-dark)', // #dd6a00
          DEFAULT: 'var(--warning)', // #ff6c19
          'light': 'var(--warning-light)', // #ffebdc
        },
        'positive': {
          'dark': 'var(--positive-dark)', // #00763d
          DEFAULT: 'var(--positive)', // #00c638
          'light': 'var(--positive-light)', // #dfffe8
        },
        'neutral': {
          'dark': 'var(--neutral-dark)', // #006ed3
          DEFAULT: 'var(--neutral)', // #1890ff
          'light': 'var(--neutral-light)', // #ecf6ff
        },
        
        // COMPONENT SYSTEM COLORS (CRITICAL - DO NOT REMOVE)
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
        
        // FORM SYSTEM COLORS (MISSING - ADDED TO FIX DARK MODE)
        'surface': {
          DEFAULT: 'var(--surface)',
          'dark': 'var(--surface-dark)',
          'alt': 'var(--surface-alt)',
          'alt-dark': 'var(--surface-alt-dark)',
          'hover': 'var(--surface-hover)',
          'hover-dark': 'var(--surface-hover-dark)',
        },
        'input': {
          DEFAULT: 'var(--input)',
          'dark': 'var(--input-dark)',
          'muted': 'var(--input-muted)',
          'muted-dark': 'var(--input-muted-dark)',
          'disabled': 'var(--input-disabled)',
          'disabled-dark': 'var(--input-disabled-dark)',
        },
        'border': {
          DEFAULT: 'var(--border)',
          'dark': 'var(--border-dark)',
          'hover': 'var(--border-hover)',
          'hover-dark': 'var(--border-hover-dark)',
          'disabled': 'var(--border-disabled)',
          'disabled-dark': 'var(--border-disabled-dark)',
          'alt': 'var(--border-alt)',
          'alt-dark': 'var(--border-alt-dark)',
        },
        'placeholder': {
          DEFAULT: 'var(--placeholder)',
          'dark': 'var(--placeholder-dark)',
        },
        'helper': {
          DEFAULT: 'var(--helper)',
          'dark': 'var(--helper-dark)',
        },
        'focus': {
          DEFAULT: 'var(--focus)',
          'dark': 'var(--focus-dark)',
        },
        'focus-ring': 'var(--focus-ring)',
      },
      
      // SPACING SYSTEM (8-point grid)
      spacing: {
        'x0': 'var(--space-0)', // 0px
        'x1': 'var(--space-1)', // 4px
        'x2': 'var(--space-2)', // 8px
        'x3': 'var(--space-3)', // 12px
        'x4': 'var(--space-4)', // 16px
        'x5': 'var(--space-5)', // 20px
        'x6': 'var(--space-6)', // 24px
        'x7': 'var(--space-7)', // 28px
        'x8': 'var(--space-8)', // 32px
        'x10': 'var(--space-10)', // 40px
        'x12': 'var(--space-12)', // 48px
        'x16': 'var(--space-16)', // 64px
        'x20': 'var(--space-20)', // 80px
        'x24': 'var(--space-24)', // 96px
      },
      
      // BORDER RADIUS TOKENS
      borderRadius: {
        'sm': 'var(--radius-sm)', // 4px
        'md': 'var(--radius-md)', // 8px
        'lg': 'var(--radius-lg)', // 12px
        'xl': 'var(--radius-xl)', // 16px
        // COMPONENT SYSTEM COMPATIBILITY
        'component': 'var(--component-border-radius)', // 8px - Used by getComponentStyles()
        // SHAPE SYSTEM
        'pill': '9999px', // Pill shape for tertiary tabs and buttons
        'full': '9999px', // Full rounded (same as pill)
        'circle': '50%', // Perfect circles
      },
      
      // SHADOW TOKENS
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)', 
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
      
      // TYPOGRAPHY TOKENS
      fontFamily: {
        'primary': ['Inter', 'sans-serif'],
        'title': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        'xxl': '28px',
        // COMPONENT SYSTEM FONTS (CRITICAL - DO NOT REMOVE)
        'component-sm': ['14px', { fontWeight: '500' }],
        'component-md': ['14px', { fontWeight: '500' }],
        'component-lg': ['16px', { fontWeight: '500' }],
        'component-xl': ['18px', { fontWeight: '500' }],
      },
      
      fontWeight: {
        'regular': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
       },
       
      // COMPONENT SYSTEM DIMENSIONS (CRITICAL - DO NOT REMOVE)
      height: {
        'component-xxs': 'var(--component-height-xxs)',  // 16px
        'component-xs': 'var(--component-height-xs)',  // 24px
        'component-sm': 'var(--component-height-sm)',  // 32px
        'component-md': 'var(--component-height-md)',  // 40px
        'component-lg': 'var(--component-height-lg)',  // 48px
        'component-xl': 'var(--component-height-xl)',  // 56px
        'component-xxl': 'var(--component-height-xxl)', // 64px
      },
      
      width: {
        'component-xxs': 'var(--component-height-xxs)',  // 16px (for square components)
        'component-xs': 'var(--component-height-xs)',  // 24px (for square components)
        'component-sm': 'var(--component-height-sm)',  // 32px
        'component-md': 'var(--component-height-md)',  // 40px
        'component-lg': 'var(--component-height-lg)',  // 48px
        'component-xl': 'var(--component-height-xl)',  // 56px
        'component-xxl': 'var(--component-height-xxl)', // 64px
      },
      
      padding: {
        'component-xxs': 'var(--component-padding-xxs)',
        'component-xs': 'var(--component-padding-xs)',
        'component-sm': 'var(--component-padding-sm)',
        'component-md': 'var(--component-padding-md)',
        'component-lg': 'var(--component-padding-lg)',
        'component-xl': 'var(--component-padding-xl)',
        'component-xxl': 'var(--component-padding-xxl)',
      },
       
       gap: {
         'component-sm': 'var(--component-gap-sm)',
         'component-md': 'var(--component-gap-md)',
         'component-lg': 'var(--component-gap-lg)',
       },
       
       borderWidth: {
         'component': 'var(--component-border-width)',
       },
       
       borderRadius: {
         'component': 'var(--component-border-radius)',
       },
       
       transitionProperty: {
         'component': 'var(--component-transition)',
       },
       
       // OPACITY SYSTEM
       opacity: {
         'disabled': '0.4',
         'muted': '0.6',
         'hover': '0.8',
         'focus': '0.9',
         'overlay': '0.5',
       },
     },
   },
   plugins: [],
  // Enable JIT mode for better performance
  mode: 'jit',
  // Dark mode configuration
  darkMode: 'class',
} 