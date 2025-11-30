export const designTokens = {
  // BASE COLORS - Foundation (9-shade scales for each theme)
  baseColors: {
    lightMode: {
      // Primary Scale
      primary900: "#1a2330",
      primary800: "#2c3547",
      primary700: "#434f64",
      primary600: "#49556a",
      primary500: "#5f697b",
      primary400: "#6c7689",
      primary300: "#838c9d",
      primary200: "#9aa3b2",
      primary100: "#c5cad3",
      
      // Secondary Scale
      secondary900: "#1e1f22",
      secondary800: "#303236",
      secondary700: "#4a4d52",
      secondary600: "#6c6f75",
      secondary500: "#979ba2",
      secondary400: "#b6bac0",
      secondary300: "#ced1d7",
      secondary200: "#ebecef",
      secondary100: "#f0f1f7",
      
      // Tertiary Scale
      tertiary900: "#121314",
      tertiary800: "#1c1d1f",
      tertiary700: "#2a2b2e",
      tertiary600: "#3a3c3f",
      tertiary500: "#57595d",
      tertiary400: "#a9aaae",
      tertiary300: "#e1e2e4",
      tertiary200: "#f4f4f6",
      tertiary100: "#f8f8f9",
      tertiary0: "#ffffff",
      
      // Neutral Scale
      neutral900: "#002966",
      neutral800: "#0040a0",
      neutral700: "#006dd3",
      neutral600: "#007fff",
      neutral500: "#1890ff",
      neutral400: "#4da6ff",
      neutral300: "#80c1ff",
      neutral200: "#b3d9ff",
      neutral100: "#ecf6ff",
      
      // Positive Scale
      positive900: "#004d26",
      positive800: "#006633",
      positive700: "#00753d",
      positive600: "#00994d",
      positive500: "#00c637",
      positive400: "#1aff66",
      positive300: "#4dff88",
      positive200: "#99ffcc",
      positive100: "#deffe7",
      
      // Warning Scale
      warning900: "#7a2f00",
      warning800: "#993d00",
      warning700: "#dd6a00",
      warning600: "#f57c00",
      warning500: "#ff6c19",
      warning400: "#ff944d",
      warning300: "#ffb366",
      warning200: "#ffcc99",
      warning100: "#ffedbc",
      
      // Danger Scale
      danger900: "#800000",
      danger800: "#990000",
      danger700: "#b70100",
      danger600: "#d11a1a",
      danger500: "#ff3532",
      danger400: "#ff6666",
      danger300: "#ff9999",
      danger200: "#ffcccc",
      danger100: "#ffeafa"
    },
    
    darkMode: {
      // Primary Scale (inverted for dark mode)
      primary900: "#f8fafc",
      primary800: "#f1f5f9",
      primary700: "#e2e8f0",
      primary600: "#cbd5e1",
      primary500: "#94a3b8",
      primary400: "#64748b",
      primary300: "#475569",
      primary200: "#334155",
      primary100: "#1e293b",
      
      // Secondary Scale
      secondary900: "#f9fafb",
      secondary800: "#f3f4f6",
      secondary700: "#e5e7eb",
      secondary600: "#d1d5db",
      secondary500: "#9ca3af",
      secondary400: "#6b7280",
      secondary300: "#475569",
      secondary200: "#334155",
      secondary100: "#1f2937",
      
      // Tertiary Scale
      tertiary900: "#ffffff",
      tertiary800: "#f9fafb",
      tertiary700: "#f3f4f6",
      tertiary600: "#e5e7eb",
      tertiary500: "#d1d5db",
      tertiary400: "#9ca3af",
      tertiary300: "#64748b",
      tertiary200: "#334155",
      tertiary100: "#0f172a",
      tertiary0: "#1e293b",
      
      // Neutral Scale
      neutral900: "#e0f0ff",
      neutral800: "#cce6ff",
      neutral700: "#b8dbff",
      neutral600: "#a3d1ff",
      neutral500: "#8fc7ff",
      neutral400: "#7abeff",
      neutral300: "#66b4ff",
      neutral200: "#52aaff",
      neutral100: "#3da0ff",
      
      // Positive Scale
      positive900: "#ccffdd",
      positive800: "#b8f5c8",
      positive700: "#a3ecb3",
      positive600: "#8fe29e",
      positive500: "#7ad889",
      positive400: "#66ce74",
      positive300: "#52c460",
      positive200: "#3dba4b",
      positive100: "#29b036",
      
      // Warning Scale
      warning900: "#ffe6cc",
      warning800: "#ffddb8",
      warning700: "#ffd4a3",
      warning600: "#ffcb8f",
      warning500: "#ffc27a",
      warning400: "#ffb866",
      warning300: "#ffae52",
      warning200: "#ffa43d",
      warning100: "#ff9a29",
      
      // Danger Scale
      danger900: "#ffe3e3",
      danger800: "#ffd1d1",
      danger700: "#ffbfbf",
      danger600: "#ffadad",
      danger500: "#ff9b9b",
      danger400: "#ff8989",
      danger300: "#ff7777",
      danger200: "#ff6565",
      danger100: "#ff5353"
    },
    
    nightMode: {
      // Primary Scale (high contrast for night mode)
      primary900: "#ffffff",
      primary800: "#f5f5f5",
      primary700: "#f0f0f0",
      primary600: "#e0e0e0",
      primary500: "#d0d0d0",
      primary400: "#a0a0a0",
      primary300: "#808080",
      primary200: "#404040",
      primary100: "#202020",
      
      // Secondary Scale
      secondary900: "#ffffff",
      secondary800: "#f5f5f5",
      secondary700: "#e0e0e0",
      secondary600: "#c0c0c0",
      secondary500: "#a0a0a0",
      secondary400: "#808080",
      secondary300: "#404040",
      secondary200: "#303030",
      secondary100: "#202020",
      
      // Tertiary Scale
      tertiary900: "#ffffff",
      tertiary800: "#f5f5f5",
      tertiary700: "#e0e0e0",
      tertiary600: "#c0c0c0",
      tertiary500: "#a0a0a0",
      tertiary400: "#808080",
      tertiary300: "#404040",
      tertiary200: "#303030",
      tertiary100: "#1a1a1a",
      tertiary0: "#000000",
      
      // Neutral Scale
      neutral900: "#e6f4ff",
      neutral800: "#d1eaff",
      neutral700: "#bddeff",
      neutral600: "#a8d4ff",
      neutral500: "#94caff",
      neutral400: "#7fbfff",
      neutral300: "#6bb5ff",
      neutral200: "#56abff",
      neutral100: "#42a1ff",
      
      // Positive Scale
      positive900: "#d9ffe6",
      positive800: "#c4f5d1",
      positive700: "#b0ebbc",
      positive600: "#9be2a7",
      positive500: "#87d892",
      positive400: "#73ce7d",
      positive300: "#5ec468",
      positive200: "#4aba53",
      positive100: "#36b03e",
      
      // Warning Scale
      warning900: "#fff0d9",
      warning800: "#ffe6c7",
      warning700: "#ffddb5",
      warning600: "#ffd3a3",
      warning500: "#ffc991",
      warning400: "#ffbf7f",
      warning300: "#ffb56d",
      warning200: "#ffab5b",
      warning100: "#ffa149",
      
      // Danger Scale
      danger900: "#ffe8e8",
      danger800: "#ffd6d6",
      danger700: "#ffc4c4",
      danger600: "#ffb2b2",
      danger500: "#ffa0a0",
      danger400: "#ff8e8e",
      danger300: "#ff7c7c",
      danger200: "#ff6a6a",
      danger100: "#ff5858"
    }
  },

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
    
    // MULTI-THEME COLORS - Semantic mappings to base colors
    themes: {
      light: {
        // Map to lightMode base colors
        primary: 'primary700',        // #434f64
        secondary: 'primary500',      // #5f697b  
        tertiary: 'primary300',       // #838c9d
        border: {
          primary: 'secondary300',    // #ced1d7
          secondary: 'secondary100',  // #f0f1f7
        },
        bg: {
          primary: 'tertiary0',       // #ffffff
          secondary: 'tertiary100',   // #f8f8f9
        },
        critical: 'danger500',        // #ff3532
        warning: 'warning500',        // #ff6c19
        positive: 'positive500',      // #00c637
        neutral: 'neutral500',        // #1890ff
        white: 'tertiary0',           // #ffffff
        black: 'tertiary900',         // #121314
      },
      dark: {
        // Map to darkMode base colors
        primary: 'primary900',        // #f8fafc (light text)
        secondary: 'primary500',      // #94a3b8
        tertiary: 'primary400',       // #64748b
        border: {
          primary: 'primary300',      // #475569
          secondary: 'primary200',    // #334155
        },
        bg: {
          primary: 'tertiary0',       // #1e293b (dark bg)
          secondary: 'tertiary100',   // #0f172a
        },
        critical: 'danger500',        // #ff9b9b
        warning: 'warning500',        // #ffc27a
        positive: 'positive500',      // #7ad889
        neutral: 'neutral500',        // #8fc7ff
        white: 'tertiary900',         // #ffffff
        black: 'primary100',          // #1e293b
      },
      night: {
        // Map to nightMode base colors
        primary: 'primary900',        // #ffffff (high contrast)
        secondary: 'primary500',      // #d0d0d0
        tertiary: 'primary400',       // #a0a0a0
        border: {
          primary: 'secondary300',    // #404040
          secondary: 'secondary200',  // #303030
        },
        bg: {
          primary: 'tertiary0',       // #000000 (true black)
          secondary: 'tertiary100',   // #1a1a1a
        },
        critical: 'danger500',        // #ffa0a0
        warning: 'warning500',        // #ffc991
        positive: 'positive500',      // #87d892
        neutral: 'neutral500',        // #94caff
        white: 'primary900',          // #ffffff
        black: 'tertiary0',           // #000000
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
    overlay: {
      light: {
        strong: 'rgba(12, 18, 28, 0.65)',
        medium: 'rgba(12, 18, 28, 0.45)',
        light: 'rgba(12, 18, 28, 0.2)',
      },
      dark: {
        strong: 'rgba(3, 7, 15, 0.75)',
        medium: 'rgba(3, 7, 15, 0.55)',
        light: 'rgba(3, 7, 15, 0.35)',
      },
      night: {
        strong: 'rgba(0, 0, 0, 0.75)',
        medium: 'rgba(0, 0, 0, 0.55)',
        light: 'rgba(0, 0, 0, 0.35)',
      },
      controls: {
        light: {
          bg: 'rgba(255, 255, 255, 0.12)',
          hover: 'rgba(255, 255, 255, 0.24)',
          divider: 'rgba(255, 255, 255, 0.3)',
          text: '#ffffff',
        },
        dark: {
          bg: 'rgba(255, 255, 255, 0.16)',
          hover: 'rgba(255, 255, 255, 0.28)',
          divider: 'rgba(255, 255, 255, 0.35)',
          text: '#f8fafc',
        },
        night: {
          bg: 'rgba(255, 255, 255, 0.2)',
          hover: 'rgba(255, 255, 255, 0.35)',
          divider: 'rgba(255, 255, 255, 0.4)',
          text: '#ffffff',
        },
      },
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
  },

  layout: {
    breakpoints: {
      xxl: '1600px',
      xl: '1440px',
      lg: '1280px',
      md: '1024px',
      sm: '768px',
      xs: '480px',
    },
    grid: {
      desktop: { columns: 24, gutter: '20px', margin: '20px' },
      laptop: { columns: 24, gutter: '16px', margin: '16px' },
      mobile: { columns: 4, gutter: '16px', margin: '16px' },
    },
  }
};

// Helper function to resolve base color to hex value
export const resolveBaseColor = (colorKey: string, theme: 'lightMode' | 'darkMode' | 'nightMode' = 'lightMode'): string => {
  const baseColors = designTokens.baseColors[theme];
  return baseColors[colorKey as keyof typeof baseColors] || '#000000';
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
  
  // If value is a string reference to base color, resolve it
  if (typeof value === 'string') {
    const baseTheme = theme === 'light' ? 'lightMode' : theme === 'dark' ? 'darkMode' : 'nightMode';
    return resolveBaseColor(value, baseTheme);
  }
  
  return value || resolveBaseColor('primary700', 'lightMode'); // fallback
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
    
    /* Overlay layers */
    --overlay-strong: ${designTokens.colors.overlay.light.strong};
    --overlay-medium: ${designTokens.colors.overlay.light.medium};
    --overlay-light: ${designTokens.colors.overlay.light.light};
    --overlay-control-bg: ${designTokens.colors.overlay.controls.light.bg};
    --overlay-control-bg-hover: ${designTokens.colors.overlay.controls.light.hover};
    --overlay-control-divider: ${designTokens.colors.overlay.controls.light.divider};
    --overlay-control-text: ${designTokens.colors.overlay.controls.light.text};
    
    /* Typography */
    --font-family-primary: ${designTokens.typography.fontFamily.primary};
    
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
    
    /* Layout Breakpoints */
    --breakpoint-xxl: ${designTokens.layout.breakpoints.xxl};
    --breakpoint-xl: ${designTokens.layout.breakpoints.xl};
    --breakpoint-lg: ${designTokens.layout.breakpoints.lg};
    --breakpoint-md: ${designTokens.layout.breakpoints.md};
    --breakpoint-sm: ${designTokens.layout.breakpoints.sm};
    --breakpoint-xs: ${designTokens.layout.breakpoints.xs};

    /* Grid System */
    --grid-desktop-columns: ${designTokens.layout.grid.desktop.columns};
    --grid-desktop-gutter: ${designTokens.layout.grid.desktop.gutter};
    --grid-desktop-margin: ${designTokens.layout.grid.desktop.margin};
    --grid-laptop-columns: ${designTokens.layout.grid.laptop.columns};
    --grid-laptop-gutter: ${designTokens.layout.grid.laptop.gutter};
    --grid-laptop-margin: ${designTokens.layout.grid.laptop.margin};
    --grid-mobile-columns: ${designTokens.layout.grid.mobile.columns};
    --grid-mobile-gutter: ${designTokens.layout.grid.mobile.gutter};
    --grid-mobile-margin: ${designTokens.layout.grid.mobile.margin};
    --grid-columns: ${designTokens.layout.grid.desktop.columns};
    --grid-gutter: ${designTokens.layout.grid.desktop.gutter};
    --grid-margin: ${designTokens.layout.grid.desktop.margin};
    --container-max-width: min(100vw, ${designTokens.layout.breakpoints.xxl});
    
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
