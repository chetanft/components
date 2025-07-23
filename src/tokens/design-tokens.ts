export const designTokens = {
  colors: {
    // LIGHT THEME (existing - keep unchanged for compatibility)
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
    
    // MULTI-THEME COLORS - New structure
    themes: {
      light: {
        primary: '#434f64',
        secondary: '#5f697b',
        tertiary: '#838c9d',
        border: {
          primary: '#ced1d7',
          secondary: '#f0f1f7',
        },
        bg: {
          primary: '#ffffff',
          secondary: '#f8f8f9',
        },
        critical: '#ff3533',
        warning: '#ff6c19',
        positive: '#00c638',
        neutral: '#1890ff',
        white: '#ffffff',
        black: '#000000',
      },
      dark: {
        primary: '#E2E8F0',
        secondary: '#94A3B8',
        tertiary: '#64748B',
        border: {
          primary: '#475569',
          secondary: '#334155',
        },
        bg: {
          primary: '#1E293B',
          secondary: '#0F172A',
        },
        critical: '#FF4D4F',
        warning: '#FF7B33',
        positive: '#00E64D',
        neutral: '#4DA6FF',
        white: '#FFFFFF',
        black: '#000000',
      },
      night: {
        primary: '#F0F0F0',
        secondary: '#D0D0D0',
        tertiary: '#A0A0A0',
        border: {
          primary: '#404040',
          secondary: '#202020',
        },
        bg: {
          primary: '#000000',
          secondary: '#1A1A1A',
        },
        critical: '#FF6666',
        warning: '#FF8C4D',
        positive: '#33FF77',
        neutral: '#66B3FF',
        white: '#FFFFFF',
        black: '#000000',
      }
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
    lineHeight: {
      tight: '1.2',
      normal: '1.4',
      relaxed: '1.6',
    },
  },
  
  spacing: {
    // 8-Point Grid System
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
    x20: '80px',
    x24: '96px',
  },
  
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
    circle: '50%',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(67, 79, 100, 0.05)',
    md: '0 4px 6px -1px rgba(67, 79, 100, 0.1)',
    lg: '0 10px 15px -3px rgba(67, 79, 100, 0.1)',
    xl: '0 20px 25px -5px rgba(67, 79, 100, 0.1)',
  },
  
  transitions: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  }
};

// Theme utilities
export type Theme = 'light' | 'dark' | 'night';

export const getThemeColor = (colorPath: string, theme: Theme = 'light'): string => {
  const keys = colorPath.split('.');
  let value = designTokens.colors.themes[theme] as any;
  
  for (const key of keys) {
    value = value?.[key];
    if (!value) break;
  }
  
  return value || designTokens.colors.themes.light.primary; // fallback
};

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
    
    /* Spacing */
    --spacing-x1: ${designTokens.spacing.x1};
    --spacing-x2: ${designTokens.spacing.x2};
    --spacing-x3: ${designTokens.spacing.x3};
    --spacing-x4: ${designTokens.spacing.x4};
    --spacing-x5: ${designTokens.spacing.x5};
    --spacing-x6: ${designTokens.spacing.x6};
    --spacing-x8: ${designTokens.spacing.x8};
    --spacing-x10: ${designTokens.spacing.x10};
    --spacing-x12: ${designTokens.spacing.x12};
    --spacing-x16: ${designTokens.spacing.x16};
    --spacing-x20: ${designTokens.spacing.x20};
    --spacing-x24: ${designTokens.spacing.x24};
    
    /* Shadows */
    --shadow-sm: ${designTokens.shadows.sm};
    --shadow-md: ${designTokens.shadows.md};
    --shadow-lg: ${designTokens.shadows.lg};
    --shadow-xl: ${designTokens.shadows.xl};
    
    /* Transitions */
    --transition-fast: ${designTokens.transitions.fast};
    --transition-normal: ${designTokens.transitions.normal};
    --transition-slow: ${designTokens.transitions.slow};
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