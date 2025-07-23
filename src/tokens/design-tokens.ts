export const designTokens = {
  colors: {
    // NEW NAMING SCHEME
    primary: '#434f64',        // was dark[100]
    secondary: '#5f697b',      // was dark[50]
    tertiary: '#838c9d',       // was dark[25]
    border: {
      primary: '#ced1d7',      // was legacy border
      secondary: '#f0f1f7',    // was divider
    },
    bg: {
      primary: '#ffffff',      // was white
      secondary: '#f8f8f9',    // was background
    },
    
    // BACKWARD COMPATIBILITY - Dark tones
    dark: {
      100: '#434f64',          // → primary
      50: '#5f697b',           // → secondary
      25: '#838c9d',           // → tertiary
    },
    // Legacy neutrals  
    legacyBorder: '#ced1d7',   // → border.primary (avoiding conflict)
    divider: '#f0f1f7',        // → border.secondary
    background: '#f8f8f9',     // → bg.secondary
    white: '#ffffff',          // → bg.primary
    // Status colors
    critical: {
      default: '#ff3533',
      dark: '#b80100',
      light: '#ffeaea',
    },
    warning: {
      default: '#ff6c19',
      dark: '#dd6a00',
      light: '#ffebdc',
    },
    positive: {
      default: '#00c638',
      dark: '#00763d',
      light: '#dfffe8',
    },
    neutral: {
      default: '#1890ff',
      dark: '#006ed3',
      light: '#ecf6ff',
    },
  },
  
  typography: {
    fontFamily: {
      primary: 'Inter',
      secondary: 'Inter',
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
    },
    fontSize: {
      // Desktop (>1440px)
      desktop: {
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '24px',
        xxl: '28px',
      },
      // Tablet (1440-800px)
      tablet: {
        sm: '12px',
        md: '14px',
        lg: '18px',
        xl: '21px',
        xxl: '26px',
      },
    },
  },
  
  spacing: {
    // Desktop spacing (>1440px)
    desktop: {
      x0: '0px',
      x1: '4px',
      x2: '8px',
      x3: '12px',
      x4: '16px',
      x5: '20px',
      x6: '24px',
      x7: '28px',
      x8: '32px',
      x9: '36px',
      x10: '40px',
      x11: '44px',
      x12: '48px',
      x13: '52px',
      x14: '56px',
      x15: '60px',
      x16: '64px',
    },
    // Tablet spacing (1440-800px)
    tablet: {
      x0: '0px',
      x1: '0px',
      x2: '4px',
      x3: '8px',
      x4: '12px',
      x5: '16px',
      x6: '20px',
      x7: '24px',
      x8: '28px',
      x9: '32px',
      x10: '36px',
      x11: '40px',
      x12: '44px',
      x13: '48px',
      x14: '52px',
      x15: '56px',
      x16: '60px',
    },
    // Card dimensions
    card: {
      padding: {
        none: '0px',
        default: '20px',
        tablet: '16px',
      },
      border: {
        none: '0px',
        default: '1px',
      },
    },
  },
  
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '100px',
  },
  
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(67, 79, 100, 0.05)',
    md: '0 4px 6px -1px rgba(67, 79, 100, 0.1), 0 2px 4px -1px rgba(67, 79, 100, 0.06)',
    lg: '0 10px 15px -3px rgba(67, 79, 100, 0.1), 0 4px 6px -2px rgba(67, 79, 100, 0.05)',
    xl: '0 20px 25px -5px rgba(67, 79, 100, 0.1), 0 10px 10px -5px rgba(67, 79, 100, 0.04)',
  },
  
  breakpoints: {
    desktop: {
      margins: '20px',
      gutters: '20px',
    },
    tablet: {
      margins: '16px',
      gutters: '16px',
    },
  },
} as const;

// CSS Custom Properties for global usage
export const cssVariables = `
  :root {
    /* Colors - NEW NAMING SCHEME */
    --color-primary: ${designTokens.colors.primary};
    --color-secondary: ${designTokens.colors.secondary};
    --color-tertiary: ${designTokens.colors.tertiary};
    --color-border-primary: ${designTokens.colors.border.primary};
    --color-border-secondary: ${designTokens.colors.border.secondary};
    --color-bg-primary: ${designTokens.colors.bg.primary};
    --color-bg-secondary: ${designTokens.colors.bg.secondary};
    
    /* Backward compatibility removed - CSS generation migration complete ✅ */
    
    --color-critical: ${designTokens.colors.critical.default};
    --color-critical-dark: ${designTokens.colors.critical.dark};
    --color-critical-light: ${designTokens.colors.critical.light};
    
    --color-warning: ${designTokens.colors.warning.default};
    --color-warning-dark: ${designTokens.colors.warning.dark};
    --color-warning-light: ${designTokens.colors.warning.light};
    
    --color-positive: ${designTokens.colors.positive.default};
    --color-positive-dark: ${designTokens.colors.positive.dark};
    --color-positive-light: ${designTokens.colors.positive.light};
    
    --color-neutral: ${designTokens.colors.neutral.default};
    --color-neutral-dark: ${designTokens.colors.neutral.dark};
    --color-neutral-light: ${designTokens.colors.neutral.light};
    
    /* Typography */
    --font-family-primary: ${designTokens.typography.fontFamily.primary};
    --font-weight-regular: ${designTokens.typography.fontWeight.regular};
    --font-weight-medium: ${designTokens.typography.fontWeight.medium};
    --font-weight-semibold: ${designTokens.typography.fontWeight.semibold};
    
    /* Border Radius */
    --radius-none: ${designTokens.borderRadius.none};
    --radius-sm: ${designTokens.borderRadius.sm};
    --radius-md: ${designTokens.borderRadius.md};
    --radius-lg: ${designTokens.borderRadius.lg};
    --radius-full: ${designTokens.borderRadius.full};
    
    /* Shadows */
    --shadow-none: ${designTokens.shadows.none};
    --shadow-sm: ${designTokens.shadows.sm};
    --shadow-md: ${designTokens.shadows.md};
    --shadow-lg: ${designTokens.shadows.lg};
    --shadow-xl: ${designTokens.shadows.xl};
    
    /* Spacing Desktop */
    --spacing-x0: ${designTokens.spacing.desktop.x0};
    --spacing-x1: ${designTokens.spacing.desktop.x1};
    --spacing-x2: ${designTokens.spacing.desktop.x2};
    --spacing-x3: ${designTokens.spacing.desktop.x3};
    --spacing-x4: ${designTokens.spacing.desktop.x4};
    --spacing-x5: ${designTokens.spacing.desktop.x5};
    --spacing-x6: ${designTokens.spacing.desktop.x6};
    --spacing-x7: ${designTokens.spacing.desktop.x7};
    --spacing-x8: ${designTokens.spacing.desktop.x8};
    --spacing-x9: ${designTokens.spacing.desktop.x9};
    --spacing-x10: ${designTokens.spacing.desktop.x10};
    --spacing-x11: ${designTokens.spacing.desktop.x11};
    --spacing-x12: ${designTokens.spacing.desktop.x12};
    --spacing-x13: ${designTokens.spacing.desktop.x13};
    --spacing-x14: ${designTokens.spacing.desktop.x14};
    --spacing-x15: ${designTokens.spacing.desktop.x15};
    --spacing-x16: ${designTokens.spacing.desktop.x16};
    
    /* Font Sizes Desktop */
    --font-size-sm: ${designTokens.typography.fontSize.desktop.sm};
    --font-size-md: ${designTokens.typography.fontSize.desktop.md};
    --font-size-lg: ${designTokens.typography.fontSize.desktop.lg};
    --font-size-xl: ${designTokens.typography.fontSize.desktop.xl};
    --font-size-xxl: ${designTokens.typography.fontSize.desktop.xxl};
  }
  
  /* Tablet breakpoint */
  @media (max-width: 1440px) {
    :root {
      /* Spacing Tablet */
      --spacing-x1: ${designTokens.spacing.tablet.x1};
      --spacing-x2: ${designTokens.spacing.tablet.x2};
      --spacing-x3: ${designTokens.spacing.tablet.x3};
      --spacing-x4: ${designTokens.spacing.tablet.x4};
      --spacing-x5: ${designTokens.spacing.tablet.x5};
      --spacing-x6: ${designTokens.spacing.tablet.x6};
      --spacing-x7: ${designTokens.spacing.tablet.x7};
      --spacing-x8: ${designTokens.spacing.tablet.x8};
      --spacing-x9: ${designTokens.spacing.tablet.x9};
      --spacing-x10: ${designTokens.spacing.tablet.x10};
      --spacing-x11: ${designTokens.spacing.tablet.x11};
      --spacing-x12: ${designTokens.spacing.tablet.x12};
      --spacing-x13: ${designTokens.spacing.tablet.x13};
      --spacing-x14: ${designTokens.spacing.tablet.x14};
      --spacing-x15: ${designTokens.spacing.tablet.x15};
      --spacing-x16: ${designTokens.spacing.tablet.x16};
      
      /* Font Sizes Tablet */
      --font-size-sm: ${designTokens.typography.fontSize.tablet.sm};
      --font-size-md: ${designTokens.typography.fontSize.tablet.md};
      --font-size-lg: ${designTokens.typography.fontSize.tablet.lg};
      --font-size-xl: ${designTokens.typography.fontSize.tablet.xl};
      --font-size-xxl: ${designTokens.typography.fontSize.tablet.xxl};
    }
  }
`;

export default designTokens;

// NEW NAMING SCHEME HELPERS - for easier migration
export const colors = {
  // Primary text colors
  primary: designTokens.colors.primary,
  secondary: designTokens.colors.secondary,  
  tertiary: designTokens.colors.tertiary,
  
  // Border colors
  borderPrimary: designTokens.colors.border.primary,
  borderSecondary: designTokens.colors.border.secondary,
  
  // Background colors
  bgPrimary: designTokens.colors.bg.primary,
  bgSecondary: designTokens.colors.bg.secondary,
  
  // Status colors (unchanged)
  critical: designTokens.colors.critical.default,
  warning: designTokens.colors.warning.default,
  positive: designTokens.colors.positive.default,
  neutral: designTokens.colors.neutral.default,
} as const;

// Legacy exports removed - migration complete ✅ 