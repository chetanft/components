import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/stories/**/*.{js,jsx,ts,tsx}',
  ],
  
  // CRITICAL: Safelist ensures all design system classes are included in dist/styles.css
  safelist: [
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
    'bg-[var(--button-link-bg)]',
    'text-[var(--button-primary-text)]',
    'text-[var(--button-secondary-text)]',
    'text-[var(--button-destructive-text)]',
    'text-[var(--button-text-text)]',
    'text-[var(--button-link-text)]',
    
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
    'h-component-sm',
    'h-component-md', 
    'h-component-lg',
    'h-component-xl',
    'w-component-sm',
    'w-component-md',
    'w-component-lg',
    'w-component-xl',
    
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
    
    // Responsive variants (ensure mobile support)
    { pattern: /^(bg|text|border)-\[var\(--[\w-]+\)\]$/ },
    { pattern: /^(h|w)-\[var\(--[\w-]+\)\]$/ },
  ],
  theme: {
    extend: {
      colors: {
        // NEW SEMANTIC COLOR SYSTEM
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
        'xs': 'var(--font-size-xs)', // 12px
        'sm': 'var(--font-size-sm)', // 14px
        'md': 'var(--font-size-md)', // 16px
        'lg': 'var(--font-size-lg)', // 20px
        'xl': 'var(--font-size-xl)', // 24px
        'xxl': 'var(--font-size-xxl)', // 28px
        // COMPONENT SYSTEM FONTS (CRITICAL - DO NOT REMOVE)
        'component-sm': ['var(--component-font-size-sm)', { fontWeight: 'var(--component-font-weight)' }],
        'component-md': ['var(--component-font-size-md)', { fontWeight: 'var(--component-font-weight)' }],
        'component-lg': ['var(--component-font-size-lg)', { fontWeight: 'var(--component-font-weight)' }],
        'component-xl': ['var(--component-font-size-xl)', { fontWeight: 'var(--component-font-weight)' }],
      },
      
      fontWeight: {
        'regular': 'var(--font-weight-regular)', // 400
        'medium': 'var(--font-weight-medium)', // 500
        'semibold': 'var(--font-weight-semibold)', // 600
                 'bold': 'var(--font-weight-bold)', // 700
       },
       
       // COMPONENT SYSTEM DIMENSIONS (CRITICAL - DO NOT REMOVE)
       height: {
         'component-sm': 'var(--component-height-sm)',  // 36px
         'component-md': 'var(--component-height-md)',  // 40px
         'component-lg': 'var(--component-height-lg)',  // 52px
         'component-xl': 'var(--component-height-xl)',  // 64px
       },
       
       width: {
         'component-sm': 'var(--component-height-sm)',  // 36px (for square components)
         'component-md': 'var(--component-height-md)',  // 40px
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