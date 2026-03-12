// AUTO-GENERATED — DO NOT EDIT
// Source: scripts/sync-docs-data.cjs
// Generated: 2026-03-12T08:25:36.000Z

export const SYSTEM_VERSION = "4.22.1";
export const COMPONENT_COUNT = 125;
export const COMPONENT_SUMMARY = {"total":125,"atoms":26,"molecules":57,"organisms":24,"charts":16,"templates":2};
export const GENERATED_AT = "2026-03-12T08:25:36.000Z";

export const SPACING_TOKENS: Record<string, string> = {
  "x0": "0px",
  "x1": "4px",
  "x2": "8px",
  "x3": "12px",
  "x4": "16px",
  "x5": "20px",
  "x6": "24px",
  "x7": "28px",
  "x8": "32px",
  "x9": "36px",
  "x10": "40px",
  "x11": "44px",
  "x12": "48px",
  "x13": "52px",
  "x14": "56px",
  "x15": "60px",
  "x16": "64px",
  "x20": "80px",
  "x24": "96px",
  "x38": "152px"
};

export const SPACING_ALIASES: Record<string, string> = {
  "spacing-x0": "0px",
  "spacing-x1": "4px",
  "spacing-x2": "8px",
  "spacing-x3": "12px",
  "spacing-x4": "16px",
  "spacing-x5": "20px",
  "spacing-x6": "24px",
  "spacing-x7": "28px",
  "spacing-x8": "32px",
  "spacing-x9": "36px",
  "spacing-x10": "40px",
  "spacing-x11": "44px",
  "spacing-x12": "48px",
  "spacing-x13": "52px",
  "spacing-x14": "56px",
  "spacing-x15": "60px",
  "spacing-x16": "64px",
  "spacing-x20": "80px",
  "spacing-x24": "96px",
  "spacing-x38": "152px"
};

export const HALF_STEP_SPACING: Record<string, string> = {
  "spacing-x1-5": "6px",
  "spacing-x2-5": "10px",
  "spacing-x3-5": "14px"
};

export const TYPOGRAPHY_TOKENS: Record<string, { value: string; px: string }> = {
  "font-size-xs-rem": {
    "value": "0.857rem",
    "px": "12px"
  },
  "font-size-xxs-rem": {
    "value": "0.714rem",
    "px": "10px"
  },
  "font-size-sm-rem": {
    "value": "1rem",
    "px": "14px"
  },
  "font-size-md-rem": {
    "value": "1.143rem",
    "px": "16px"
  },
  "font-size-lg-rem": {
    "value": "1.429rem",
    "px": "20px"
  },
  "font-size-xl-rem": {
    "value": "1.714rem",
    "px": "24px"
  },
  "font-size-xxl-rem": {
    "value": "2rem",
    "px": "28px"
  },
  "font-size-3xl-rem": {
    "value": "2.571rem",
    "px": "36px"
  },
  "font-size-4xl-rem": {
    "value": "3.429rem",
    "px": "48px"
  },
  "font-size-3_5xl-rem": {
    "value": "2.5rem",
    "px": "40px"
  },
  "font-size-5xl-rem": {
    "value": "4.5rem",
    "px": "72px"
  }
};

export const BORDER_RADIUS_TOKENS: Record<string, string> = {
  "radius-none": "0px",
  "radius-sm": "4px",
  "radius-md": "8px",
  "radius-lg": "12px",
  "radius-xl": "16px",
  "radius-2xl": "20px",
  "radius-3xl": "24px",
  "radius-4xl": "28px",
  "radius-2xs": "2px",
  "radius-smd": "6px",
  "radius-full": "9999px"
};

export const SEMANTIC_COLORS: Record<string, { value: string; resolved: string }> = {
  "primary": {
    "value": "var(--primary-700)",
    "resolved": "#434f64"
  },
  "secondary": {
    "value": "var(--primary-600)",
    "resolved": "#5f697b"
  },
  "tertiary": {
    "value": "var(--primary-500)",
    "resolved": "#838c9d"
  },
  "border-primary": {
    "value": "var(--primary-300)",
    "resolved": "#ced1d7"
  },
  "border-secondary": {
    "value": "var(--primary-100)",
    "resolved": "#f0f1f7"
  },
  "bg-primary": {
    "value": "var(--secondary-0)",
    "resolved": "#ffffff"
  },
  "bg-secondary": {
    "value": "var(--secondary-100)",
    "resolved": "#f8f8f9"
  },
  "bg-tertiary": {
    "value": "var(--tertiary-200)",
    "resolved": "#f4f4f6"
  },
  "text-primary": {
    "value": "var(--primary-700)",
    "resolved": "#434f64"
  },
  "text-secondary": {
    "value": "var(--primary-600)",
    "resolved": "#5f697b"
  },
  "text-tertiary": {
    "value": "var(--primary-500)",
    "resolved": "#838c9d"
  },
  "text-placeholder": {
    "value": "var(--secondary-400)",
    "resolved": "#b6bac0"
  },
  "text-disabled": {
    "value": "var(--secondary-300)",
    "resolved": "#d5d7dc"
  },
  "color-divider": {
    "value": "var(--secondary-200)",
    "resolved": "#f0f1f7"
  },
  "color-primary-light": {
    "value": "var(--neutral-100)",
    "resolved": "#ecf6ff"
  },
  "primary-bg-subtle": {
    "value": "var(--neutral-100)",
    "resolved": "#ecf6ff"
  },
  "critical": {
    "value": "var(--danger-500)",
    "resolved": "#ff3532"
  },
  "critical-dark": {
    "value": "var(--danger-700)",
    "resolved": "#b70100"
  },
  "critical-light": {
    "value": "var(--danger-100)",
    "resolved": "#ffeafa"
  },
  "warning": {
    "value": "var(--warning-500)",
    "resolved": "#ff6c19"
  },
  "warning-dark": {
    "value": "var(--warning-700)",
    "resolved": "#dd6a00"
  },
  "warning-light": {
    "value": "var(--warning-100)",
    "resolved": "#ffedbc"
  },
  "positive": {
    "value": "var(--positive-500)",
    "resolved": "#00c637"
  },
  "positive-dark": {
    "value": "var(--positive-700)",
    "resolved": "#00753d"
  },
  "positive-light": {
    "value": "var(--positive-100)",
    "resolved": "#deffe7"
  },
  "neutral": {
    "value": "var(--neutral-500)",
    "resolved": "#1890ff"
  },
  "neutral-dark": {
    "value": "var(--neutral-700)",
    "resolved": "#006dd3"
  },
  "neutral-light": {
    "value": "var(--neutral-100)",
    "resolved": "#ecf6ff"
  }
};

export const GLOBAL_CSS_CONTENT = `/* =====================================================
   FT DESIGN SYSTEM - COMPREHENSIVE GLOBAL CSS
   =====================================================

   Copy this file to your project and import it in your root layout/app.
   Usage: import './globals.css' or import '@/styles/globals.css'
*/

@tailwind base;
@tailwind components;
@tailwind utilities;

@custom-variant dark (&:is(.dark *));

/* =====================================================
   FT DESIGN SYSTEM - COMPREHENSIVE GLOBAL CSS
   ===================================================== */

:root {
   /* =====================================================
     BASE COLOR SCALES - LIGHT MODE (FOUNDATION)
     ===================================================== */

   /* Primary Scale (9 shades) — matches Figma Base Colors / Primary */
   --primary-900: #1a2330;
   --primary-800: #2c3547;
   --primary-700: #434f64; /* Main brand color - dark navy */
   --primary-600: #5f697b;
   --primary-500: #838c9d;
   --primary-400: #a7afb9;
   --primary-300: #ced1d7;
   --primary-200: #e4e7ec;
   --primary-100: #f0f1f7;

   /* Secondary Scale (10 shades including 0) — matches Figma Base Colors / Secondary */
   --secondary-900: #2b3645;
   --secondary-800: #3d4c60;
   --secondary-700: #596272;
   --secondary-600: #6f7a8a;
   --secondary-500: #939ba5;
   --secondary-400: #b6bac0;
   --secondary-300: #d5d7dc;
   --secondary-200: #f0f1f7;
   --secondary-100: #f8f8f9;
   --secondary-0: #ffffff;

   /* Tertiary Scale (10 shades including 0) */
   --tertiary-900: #121314;
   --tertiary-800: #1c1d1f;
   --tertiary-700: #2a2b2e;
   --tertiary-600: #3a3c3f;
   --tertiary-500: #57595d;
   --tertiary-400: #a9aaae;
   --tertiary-300: #e1e2e4;
   --tertiary-200: #f4f4f6;
   --tertiary-100: #f8f8f9;
   --tertiary-0: #ffffff;

   /* Neutral Scale (9 shades) */
   --neutral-900: #002966;
   --neutral-800: #0040a0;
   --neutral-700: #006dd3;
   --neutral-600: #007fff;
   --neutral-500: #1890ff;
   --neutral-400: #4da6ff;
   --neutral-300: #80c1ff;
   --neutral-200: #b3d9ff;
   --neutral-100: #ecf6ff;

   /* Positive Scale (9 shades) */
   --positive-900: #004d26;
   --positive-800: #006633;
   --positive-700: #00753d;
   --positive-600: #00994d;
   --positive-500: #00c637;
   --positive-400: #1aff66;
   --positive-300: #4dff88;
   --positive-200: #99ffcc;
   --positive-100: #deffe7;

   /* Warning Scale (9 shades) */
   --warning-900: #7a2f00;
   --warning-800: #993d00;
   --warning-700: #dd6a00;
   --warning-600: #f57c00;
   --warning-500: #ff6c19;
   --warning-400: #ff944d;
   --warning-300: #ffb366;
   --warning-200: #ffcc99;
   --warning-100: #ffedbc;

   /* Danger Scale (9 shades) */
   --danger-900: #800000;
   --danger-800: #990000;
   --danger-700: #b70100;
   --danger-600: #d11a1a;
   --danger-500: #ff3532;
   --danger-400: #ff6666;
   --danger-300: #ff9999;
   --danger-200: #ffcccc;
   --danger-100: #ffeafa;

   /* =====================================================
     SEMANTIC COLORS - SELECTED FROM BASE COLORS
     ===================================================== */

   /* Base Semantic Colors - Reference base color scales */
   --primary: var(--primary-700);
   /* #434f64 */
   --secondary: var(--primary-600);
   /* #5f697b */
   --tertiary: var(--primary-500);
   /* #838c9d */
   --border-primary: var(--primary-300);
   /* #ced1d7 — Figma: Primary/300 */
   --border-secondary: var(--primary-100);
   /* #f0f1f7 — Figma: Primary/100 */
   --bg-primary: var(--secondary-0);
   /* #ffffff — Figma: Secondary/0 */
   --bg-secondary: var(--secondary-100);
   /* #f8f8f9 — Figma: Secondary/100 */
   --bg-tertiary: var(--tertiary-200);
   /* #f4f4f6 */

   /* Text Semantic Colors */
   --text-primary: var(--primary-700);
   /* #434f64 - main body text */
   --text-secondary: var(--primary-600);
   /* #5f697b - muted/secondary text */
   --text-tertiary: var(--primary-500);
   /* #838c9d - subtle/hint text */
   --text-placeholder: var(--secondary-400);
   /* #b6bac0 - placeholder text */
   --text-disabled: var(--secondary-300);
   /* #ced1d7 → now #d5d7dc - disabled text */

   /* Misc Semantic Colors */
   --color-divider: var(--secondary-200);
   /* #ebecef - divider/separator lines */
   --color-primary-light: var(--neutral-100);
   /* #ecf6ff - light primary accent bg */
   --primary-bg-subtle: var(--neutral-100);
   /* #ecf6ff - subtle primary background */

   /* =====================================================
     Token alias bridge (new naming scheme → legacy vars)
     ===================================================== */
   --color-primary: var(--primary);
   --color-secondary: var(--secondary);
   --color-tertiary: var(--tertiary);
   --color-border-primary: var(--border-primary);
   --color-border-secondary: var(--border-secondary);
   --color-bg-primary: var(--bg-primary);
   --color-bg-secondary: var(--bg-secondary);
   --color-bg-tertiary: var(--bg-tertiary);
   --color-critical: var(--critical);
   --color-critical-dark: var(--critical-dark);
   --color-critical-light: var(--critical-light);
   --color-warning: var(--warning);
   --color-warning-dark: var(--warning-dark);
   --color-warning-light: var(--warning-light);
   --color-positive: var(--positive);
   --color-positive-dark: var(--positive-dark);
   --color-positive-light: var(--positive-light);
   --color-neutral: var(--neutral);
   --color-neutral-dark: var(--neutral-dark);
   --color-neutral-light: var(--neutral-light);

   --font-family-primary: 'Inter', sans-serif;
   --font-weight-regular: 400;
   --font-weight-medium: 500;
   --font-weight-semibold: 600;

   --font-size-xs: 12px;
   --font-size-xxs: 10px;
   --font-size-sm: 14px;
   --font-size-md: 16px;
   --font-size-lg: 20px;
   --font-size-xl: 24px;
   --font-size-xxl: 28px;

   /* Line-height ladder — explicit vertical rhythm */
   --lh-tight: 1.25;        /* headings, display text */
   --lh-heading: 1.3;       /* section headings */
   --lh-compact: 1.45;      /* dense UI, captions, small text */
   --lh-body: 1.6;          /* body text, readability-first */

   /* Mapped line-heights per font size */
   --lh-xs: 20px;           /* 12px × 1.45 ≈ 17 → snapped to 20 (4px grid) */
   --lh-sm: 20px;           /* 14px × 1.45 = 20px */
   --lh-md: 24px;           /* 16px × 1.5 = 24px */
   --lh-lg: 28px;           /* 20px × 1.4 = 28px */
   --lh-xl: 32px;           /* 24px × 1.33 = 32px */
   --lh-xxl: 36px;          /* 28px × 1.28 = 36px */
   --lh-3xl: 44px;          /* 36px × 1.22 = 44px */
   --lh-4xl: 56px;          /* 48px × 1.17 = 56px */

   /* Typography Rem Values - Responsive (base: 14px, scales to 16px at >1440px) */
   --font-size-xs-rem: 0.857rem;
   --font-size-xxs-rem: 0.714rem;
   /* 10px / 14px */
   /* 12px / 14px */
   --font-size-sm-rem: 1rem;
   /* 14px / 14px */
   --font-size-md-rem: 1.143rem;
   /* 16px / 14px */
   --font-size-lg-rem: 1.429rem;
   /* 20px / 14px */
   --font-size-xl-rem: 1.714rem;
   /* 24px / 14px */
   --font-size-xxl-rem: 2rem;
   /* 28px / 14px */
   --font-size-3xl-rem: 2.571rem;
   /* 36px / 14px */
   --font-size-4xl-rem: 3.429rem;
   /* 48px / 14px */
   --font-size-3_5xl-rem: 2.5rem;
   /* 40px / 16px parity */
   --font-size-5xl-rem: 4.5rem;
   /* 72px / 16px parity */

   --shadow-sm: 0 1px 2px 0 rgba(67, 79, 100, 0.05);
   --shadow-md: 0 4px 6px -1px rgba(67, 79, 100, 0.1);
   --shadow-lg: 0 10px 15px -3px rgba(67, 79, 100, 0.1);
   --shadow-xl: 0 20px 25px -5px rgba(67, 79, 100, 0.1);

   --transition-fast: 150ms;
   --transition-normal: 200ms;
   --transition-slow: 300ms;

   /* Button Colors */
   --button-primary-bg: var(--primary-700);
   --button-primary-text: #ffffff;
   --button-primary-hover-bg: var(--primary-800);
   --button-primary-border: var(--primary-700);

   --button-secondary-bg: #ffffff;
   --button-secondary-text: #434f64;
   --button-secondary-hover-bg: #f0f1f7;
   --button-secondary-border: #ced1d7;
   --button-secondary-hover-border: #838c9d;

   --button-destructive-bg: #ff3532;
   --button-destructive-text: #ffffff;
   --button-destructive-hover-bg: #b70100;
   --button-destructive-border: #ff3532;

   --button-text-bg: transparent;
   --button-text-text: #434f64;
   --button-text-hover-bg: #f0f1f7;
   --button-text-border: transparent;

   /* Badge Colors */
   --badge-normal-bg: #f0f1f7;
   --badge-normal-text: #434f64;
   --badge-normal-border: #ced1d7;
   --badge-normal-hover-bg: #ced1d7;
   --badge-normal-hover-border: #838c9d;

   --badge-danger-bg: #ffe9e9;
   --badge-danger-text: #ff3532;
   --badge-danger-border: #ff3532;
   --badge-danger-hover-bg: #ffafad;
   --badge-danger-hover-border: #b70100;
   --badge-danger-hover-text: #b70100;

   --badge-success-bg: #deffe7;
   --badge-success-text: #00753d;
   --badge-success-border: #00753d;
   --badge-success-hover-bg: #99e8af;
   --badge-success-hover-border: #00753d;

   --badge-warning-bg: #ffebdc;
   --badge-warning-text: #ff6c19;
   --badge-warning-border: #ff6c19;
   --badge-warning-hover-bg: #ffc4a3;
   --badge-warning-hover-border: #ff6c19;

   --badge-neutral-bg: #ecf6ff;
   --badge-neutral-text: #1890ff;
   --badge-neutral-border: #1890ff;
   --badge-neutral-hover-bg: #ecf6ff;
   --badge-neutral-hover-border: #1890ff;

   /* Badge System Variables */
   --badge-border-radius: 4px;
   --badge-font-size: 12px;
   --badge-font-weight: 500;

   /* Missing Form System Variables - Light Mode */
   --surface: #ffffff;
   --surface-alt: #f8f8f9;
   --surface-hover: #f0f1f7;
   --input: #434f64;
   --input-muted: #838c9d;
   --input-disabled: #ced1d7;
   --placeholder: #838c9d;
   --helper: #838c9d;
   --border: #ced1d7;
   --border-hover: #434f64;
   --border-disabled: #f0f1f7;
   --border-alt: #ced1d7;
   --focus: #434f64;
   --focus-ring: #434f64;

   /* Component-Level Theme Tokens - Light Mode
    * "-dark" suffixed aliases ensure parity with .dark / .night blocks.
    * In light mode they simply mirror the base token value.
    */
   --surface-dark: var(--surface);
   --surface-alt-dark: var(--surface-alt);
   --surface-hover-dark: var(--surface-hover);
   --input-dark: var(--input);
   --input-muted-dark: var(--input-muted);
   --input-disabled-dark: var(--input-disabled);
   --placeholder-dark: var(--placeholder);
   --helper-dark: var(--helper);
   --border-dark: var(--border);
   --border-hover-dark: var(--border-hover);
   --border-disabled-dark: var(--border-disabled);
   --border-alt-dark: var(--border-alt);
   --focus-dark: var(--focus);

   /* Overlay Tokens */
   --overlay-strong: rgba(12, 18, 28, 0.65);
   --overlay-medium: rgba(12, 18, 28, 0.45);
   --overlay-light: rgba(12, 18, 28, 0.2);
   --overlay-control-bg: rgba(255, 255, 255, 0.12);
   --overlay-control-bg-hover: rgba(255, 255, 255, 0.24);
   --overlay-control-divider: rgba(255, 255, 255, 0.3);
   --overlay-control-text: #ffffff;

   /* Glass / Glassmorphism Tokens (Apple-inspired material)
    *
    * Elevation semantic:
    *   subtle    → inline popovers, tooltips, small floating elements
    *   glass     → dropdowns, floating panels, action sheets
    *   prominent → modals, command menus, full overlays
    *
    * Opacity ladder is non-linear — subtle is airy, prominent is noticeably
    * thicker but never milky. Blur and saturate scale with elevation.
    */
   --glass-blur-sm: 10px;
   --glass-blur: 16px;
   --glass-blur-lg: 22px;
   --glass-saturate-sm: 150%;
   --glass-saturate: 165%;
   --glass-saturate-lg: 180%;

   /* Surface tints — non-linear ladder */
   --glass-bg: rgba(255, 255, 255, 0.48);
   --glass-bg-subtle: rgba(255, 255, 255, 0.30);
   --glass-bg-prominent: rgba(255, 255, 255, 0.62);

   /* Borders / highlights — soft, no glow */
   --glass-border: rgba(255, 255, 255, 0.45);
   --glass-border-subtle: rgba(255, 255, 255, 0.35);
   --glass-border-soft: rgba(0, 0, 0, 0.06);
   --glass-inner-highlight: rgba(255, 255, 255, 0.45);

   /* Shadows */
   --glass-shadow: 0 12px 36px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
   --glass-shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.10);

   /* State layers inside glass surfaces */
   --glass-hover: rgba(255, 255, 255, 0.30);
   --glass-pressed: rgba(255, 255, 255, 0.20);
   --glass-selected: rgba(255, 255, 255, 0.38);

   /* Radius for glass surfaces */
   --glass-radius: 14px;

   /* Radio Component Variables */
   --radio-size: 20px;
   --radio-gap: 8px;

   /* Switch Component Variables */
   --switch-off-bg: var(--tertiary);
   /* #838C9D - Track when off */
   --switch-on-bg: var(--border-primary);
   /* #CED1D7 - Track when on */
   --switch-disabled-bg: rgba(139, 139, 139, 0.2);
   /* Disabled track */
   --switch-thumb-off: #ffffff;
   /* White thumb when off */
   --switch-thumb-on: var(--primary);
   /* #434F64 - Thumb when on */
   --switch-disabled-thumb: var(--bg-secondary);
   /* #F8F8F9 - Disabled thumb (off state) */
   --switch-disabled-thumb-on: var(--border-primary);
   /* #CED1D7 - Disabled thumb (on state) */

   /* Semantic Colors - Reference base color scales */
   --critical-dark: var(--danger-700);
   /* #b70100 */
   --critical: var(--danger-500);
   /* #ff3532 */
   --critical-light: var(--danger-100);
   /* #ffeafa */

   --warning-dark: var(--warning-700);
   /* #dd6a00 */
   --warning: var(--warning-500);
   /* #ff6c19 */
   --warning-light: var(--warning-100);
   /* #ffedbc */

   --positive-dark: var(--positive-700);
   /* #00753d */
   --positive: var(--positive-500);
   /* #00c637 */
   --positive-light: var(--positive-100);
   /* #deffe7 */

   --neutral-dark: var(--neutral-700);
   /* #006dd3 */
   --neutral: var(--neutral-500);
   /* #1890ff */
   --neutral-light: var(--neutral-100);
   /* #ecf6ff */

   /* Border Radius Tokens */
   --radius-none: 0px;
   --radius-sm: 4px;
   --radius-md: 8px;
   --radius-lg: 12px;
   --radius-xl: 16px;
   --radius-2xl: 20px;
   --radius-3xl: 24px;
   --radius-4xl: 28px;
   --radius-2xs: 2px;
   --radius-smd: 6px;
   --radius-full: 9999px;

   /* Component System Variables */
   --component-border-radius: 8px;
   --component-border-width: 2px;
   --component-border-color: var(--border-primary);
   --component-border-focus: var(--primary);
   --component-transition: all 200ms ease-in-out;
   --component-gap-sm: 8px;
   --component-gap-md: 12px;
   --component-gap-lg: 16px;
   --component-font-size-xxs: 12px;
   --component-font-size-xs: 12px;
   --component-font-size-sm: 14px;
   --component-font-size-md: 14px;
   --component-font-size-lg: 16px;
   --component-font-size-xl: 18px;
   --component-font-weight: 500;
   --component-height-xxs: 16px;
   --component-height-xs: 32px;
   --component-height-sm: 36px;
   --component-height-md: 40px;
   --component-height-lg: 48px;
   --component-height-xl: 64px;
   --component-height-xxl: 72px;
   --component-padding-xxs: 2px 6px;
   --component-padding-xs: 4px 8px;
   --component-padding-sm: 8px 12px;
   --component-padding-md: 12px 16px;
   --component-padding-lg: 16px 20px;
   --component-padding-xl: 20px 24px;
   --component-padding-xxl: 24px 28px;

   /* Spacing System - 8-Point Grid */
   --x0: 0px;
   --x1: 4px;
   --x2: 8px;
   --x3: 12px;
   --x4: 16px;
   --x5: 20px;
   --x6: 24px;
   --x7: 28px;
   --x8: 32px;
   --x9: 36px;
   --x10: 40px;
   --x11: 44px;
   --x12: 48px;
   --x13: 52px;
   --x14: 56px;
   --x15: 60px;
   --x16: 64px;
   --x20: 80px;
   --x24: 96px;
   --x38: 152px;

   /* Spacing aliases for new token usages */
   --spacing-x0: var(--x0);
   --spacing-x1: var(--x1);
   --spacing-x2: var(--x2);
   --spacing-x3: var(--x3);
   --spacing-x4: var(--x4);
   --spacing-x5: var(--x5);
   --spacing-x6: var(--x6);
   --spacing-x7: var(--x7);
   --spacing-x8: var(--x8);
   --spacing-x9: var(--x9);
   --spacing-x10: var(--x10);
   --spacing-x11: var(--x11);
   --spacing-x12: var(--x12);
   --spacing-x13: var(--x13);
   --spacing-x14: var(--x14);
   --spacing-x15: var(--x15);
   --spacing-x16: var(--x16);
   --spacing-x20: var(--x20);
   --spacing-x24: var(--x24);
   --spacing-x38: var(--x38);

   /* Fractional spacing (half-steps) */
   --spacing-x1-5: 6px;
   /* 1.5 × 4px = 6px */
   --spacing-x2-5: 10px;
   /* 2.5 × 4px = 10px */
   --spacing-x3-5: 14px;
   /* 3.5 × 4px = 14px */

   /* Spacing Rem Values - Responsive (base: 14px, scales to 16px at >1440px) */
   /* Use for spacing that should scale with typography (padding, margins between text elements) */
   --spacing-x0-rem: 0rem;
   /* 0px / 14px */
   --spacing-x1-rem: 0.286rem;
   /* 4px / 14px */
   --spacing-x2-rem: 0.571rem;
   /* 8px / 14px */
   --spacing-x3-rem: 0.857rem;
   /* 12px / 14px */
   --spacing-x4-rem: 1.143rem;
   /* 16px / 14px */
   --spacing-x5-rem: 1.429rem;
   /* 20px / 14px */
   --spacing-x6-rem: 1.714rem;
   /* 24px / 14px */
   --spacing-x7-rem: 2rem;
   /* 28px / 14px */
   --spacing-x8-rem: 2.286rem;
   /* 32px / 14px */
   --spacing-x9-rem: 2.571rem;
   /* 36px / 14px */
   --spacing-x10-rem: 2.857rem;
   /* 40px / 14px */
   --spacing-x11-rem: 3.143rem;
   /* 44px / 14px */
   --spacing-x12-rem: 3.429rem;
   /* 48px / 14px */
   --spacing-x13-rem: 3.714rem;
   /* 52px / 14px */
   --spacing-x14-rem: 4rem;
   /* 56px / 14px */
   --spacing-x15-rem: 4.286rem;
   /* 60px / 14px */
   --spacing-x16-rem: 4.571rem;
   /* 64px / 14px */
   --spacing-x20-rem: 5.714rem;
   /* 80px / 14px */
   --spacing-x24-rem: 6.857rem;
   /* 96px / 14px */
   --spacing-x38-rem: 10.857rem;
   /* 152px / 14px */

   /* Table Header Height - Responsive */
   --table-header-height: var(--spacing-x10);
   /* 40px default */
   /* Table Header Padding - Responsive */
   --table-header-padding-y: 10px;
   /* 10px default for <1440px */
   /* Table Cell Padding - Responsive */
   --table-cell-padding-y: 16px;
   /* 16px default for <1440px */

   /* Layout Breakpoints */
   --breakpoint-xxl: 1600px;
   --breakpoint-xl: 1440px;
   --breakpoint-lg: 1280px;
   --breakpoint-md: 1024px;
   --breakpoint-sm: 768px;
   --breakpoint-xs: 480px;

   /* Grid System */
   --grid-desktop-columns: 24;
   --grid-desktop-gutter: var(--x5);
   --grid-desktop-margin: var(--x5);
   --grid-laptop-columns: 24;
   --grid-laptop-gutter: var(--x4);
   --grid-laptop-margin: var(--x4);
   --grid-mobile-columns: 4;
   --grid-mobile-gutter: var(--x4);
   --grid-mobile-margin: var(--x4);
   --grid-columns: var(--grid-desktop-columns);
   --grid-gutter: var(--grid-desktop-gutter);
   --grid-margin: var(--grid-desktop-margin);
   --container-max-width: min(100vw, var(--breakpoint-xxl));

   /* Z-Index Scale */
   --z-index-base: 0;
   --z-index-sticky: 100;       /* Affix, sticky headers */
   --z-index-dropdown: 1000;    /* Dropdowns, popovers */
   --z-index-overlay: 1050;     /* Modal backdrops, tour overlays */
   --z-index-modal: 1060;       /* Modals, dialogs */
   --z-index-toast: 1080;       /* Messages, toasts, notifications */
   --z-index-popover: 1090;     /* Popovers above modals */
   --z-index-tooltip: 1100;     /* Tooltips (highest standard layer) */
}

@media (min-width: 1441px) {
   :root {
      --table-header-height: var(--spacing-x12);
      /* 48px for > 1440px */
      --table-header-padding-y: 14px;
      /* 14px for > 1440px */
      --table-cell-padding-y: 20px;
      /* 20px for > 1440px */
   }
}

@media (max-width: 1440px) {
   :root {
      --grid-columns: var(--grid-laptop-columns);
      --grid-gutter: var(--grid-laptop-gutter);
      --grid-margin: var(--grid-laptop-margin);
      --container-max-width: min(100vw, var(--breakpoint-xl));
   }
}

@media (max-width: 768px) {
   :root {
      --grid-columns: var(--grid-mobile-columns);
      --grid-gutter: var(--grid-mobile-gutter);
      --grid-margin: var(--grid-mobile-margin);
   }
}

.ft-container {
   width: min(100%, var(--container-max-width));
   margin-left: auto;
   margin-right: auto;
   padding-left: var(--grid-margin);
   padding-right: var(--grid-margin);
}

.ft-grid {
   display: grid;
   grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
   column-gap: var(--grid-gutter);
   row-gap: var(--grid-gutter);
}

/* =====================================================
   FT DESIGN SYSTEM VARIABLES ONLY
   ===================================================== */
/* 
   NAMING CONVENTION: --{component}-{property}-{variant}
   Examples: --button-primary-bg, --badge-danger-text
   
   ❌ DO NOT ADD shadcn/ui compatibility variables
   ❌ DO NOT ADD generic names like --background, --card
   ✅ USE specific semantic names following our convention
*/

/* =====================================================
   DARK MODE COLORS
   ===================================================== */
.dark {
   /* =====================================================
     BASE COLOR SCALES - DARK MODE
     ===================================================== */

   /* Primary Scale (9 shades - inverted for dark mode) */
   --primary-900: #f8fafc;
   --primary-800: #f1f5f9;
   --primary-700: #e2e8f0;
   --primary-600: #cbd5e1;
   --primary-500: #94a3b8;
   --primary-400: #64748b;
   --primary-300: #475569;
   --primary-200: #334155;
   --primary-100: #1e293b;

   /* Secondary Scale (9 shades) */
   --secondary-900: #f9fafb;
   --secondary-800: #f3f4f6;
   --secondary-700: #e5e7eb;
   --secondary-600: #d1d5db;
   --secondary-500: #9ca3af;
   --secondary-400: #6b7280;
   --secondary-300: #475569;
   --secondary-200: #334155;
   --secondary-100: #1f2937;

   /* Tertiary Scale (10 shades including 0) */
   --tertiary-900: #ffffff;
   --tertiary-800: #f9fafb;
   --tertiary-700: #f3f4f6;
   --tertiary-600: #e5e7eb;
   --tertiary-500: #d1d5db;
   --tertiary-400: #9ca3af;
   --tertiary-300: #64748b;
   --tertiary-200: #334155;
   --tertiary-100: #0f172a;
   --tertiary-0: #1e293b;

   /* Neutral Scale (9 shades) */
   --neutral-900: #e0f0ff;
   --neutral-800: #cce6ff;
   --neutral-700: #b8dbff;
   --neutral-600: #a3d1ff;
   --neutral-500: #8fc7ff;
   --neutral-400: #7abeff;
   --neutral-300: #66b4ff;
   --neutral-200: #52aaff;
   --neutral-100: #3da0ff;

   /* Positive Scale (9 shades) */
   --positive-900: #ccffdd;
   --positive-800: #b8f5c8;
   --positive-700: #a3ecb3;
   --positive-600: #8fe29e;
   --positive-500: #7ad889;
   --positive-400: #66ce74;
   --positive-300: #52c460;
   --positive-200: #3dba4b;
   --positive-100: #29b036;

   /* Warning Scale (9 shades) */
   --warning-900: #ffe6cc;
   --warning-800: #ffddb8;
   --warning-700: #ffd4a3;
   --warning-600: #ffcb8f;
   --warning-500: #ffc27a;
   --warning-400: #ffb866;
   --warning-300: #ffae52;
   --warning-200: #ffa43d;
   --warning-100: #ff9a29;

   /* Danger Scale (9 shades) */
   --danger-900: #ffe3e3;
   --danger-800: #ffd1d1;
   --danger-700: #ffbfbf;
   --danger-600: #ffadad;
   --danger-500: #ff9b9b;
   --danger-400: #ff8989;
   --danger-300: #ff7777;
   --danger-200: #ff6565;
   --danger-100: #ff5353;

   /* =====================================================
     SEMANTIC COLORS - SELECTED FROM BASE COLORS
     ===================================================== */

   /* Semantic Colors - Figma dark-mode mappings */
   --primary: #e4e7ec;
   /* Primary/200 */
   --secondary: #a7afb9;
   /* Primary/400 */
   --tertiary: #838c9d;
   /* Primary/500 */
   --border-primary: #5f697b;
   /* Primary/600 */
   --border-secondary: #434f64;
   /* Primary/700 */
   --bg-primary: #1a2330;
   /* Primary/900 */
   --bg-secondary: #2c3547;
   /* Primary/800 */
   --bg-tertiary: #434f64;
   /* Elevated surface */

   /* Text Semantic Colors */
   --text-primary: var(--primary);
   --text-secondary: var(--secondary);
   --text-tertiary: var(--tertiary);
   --text-placeholder: var(--tertiary);
   --text-disabled: var(--border-primary);
   --color-divider: var(--border-secondary);

   /* Button Colors - DARK MODE */
   --button-primary-bg: #e2e8f0;
   /* LIGHT background */
   --button-primary-text: #000000;
   /* BLACK text on light bg */
   --button-primary-hover-bg: #94a3b8;
   --button-primary-border: #e2e8f0;

   --button-secondary-bg: #1e293b;
   /* Dark background */
   --button-secondary-text: #e2e8f0;
   /* Light text */
   --button-secondary-hover-bg: #334155;
   --button-secondary-border: #475569;
   --button-secondary-hover-border: #64748b;

   --button-destructive-bg: #ff4d4f;
   /* Slightly lighter red */
   --button-destructive-text: #ffffff;
   --button-destructive-hover-bg: #dc2626;
   --button-destructive-border: #ff4d4f;

   --button-text-bg: transparent;
   --button-text-text: #e2e8f0;
   /* Light text */
   --button-text-hover-bg: #334155;
   --button-text-border: transparent;

   /* Badge Colors - DARK MODE */
   --badge-normal-bg: #334155;
   --badge-normal-text: #e2e8f0;
   --badge-normal-border: #475569;
   --badge-normal-hover-bg: #475569;
   --badge-normal-hover-border: #64748b;

   --badge-danger-bg: #7f1d1d;
   --badge-danger-text: #fca5a5;
   --badge-danger-border: #ef4444;
   --badge-danger-hover-bg: #991b1b;
   --badge-danger-hover-border: #dc2626;
   --badge-danger-hover-text: #fecaca;

   --badge-success-bg: #14532d;
   --badge-success-text: #86efac;
   --badge-success-border: #22c55e;
   --badge-success-hover-bg: #166534;
   --badge-success-hover-border: #22c55e;

   --badge-warning-bg: #78350f;
   --badge-warning-text: #fbbf24;
   --badge-warning-border: #f59e0b;
   --badge-warning-hover-bg: #92400e;
   --badge-warning-hover-border: #f59e0b;

   --badge-neutral-bg: #0c4a6e;
   --badge-neutral-text: #7dd3fc;
   --badge-neutral-border: #38bdf8;
   --badge-neutral-hover-bg: #075985;
   --badge-neutral-hover-border: #38bdf8;

   /* Badge System Variables - Dark Mode */
   --badge-border-radius: 4px;
   --badge-font-size: 12px;
   --badge-font-weight: 500;

   /* Missing Form System Variables - Dark Mode */
   --surface: var(--bg-primary);
   --surface-dark: var(--bg-primary);
   --surface-alt: var(--bg-secondary);
   --surface-alt-dark: var(--bg-secondary);
   --surface-hover: var(--bg-tertiary);
   --surface-hover-dark: var(--bg-tertiary);
   --input: var(--primary);
   --input-dark: var(--primary);
   --input-muted: var(--tertiary);
   --input-muted-dark: var(--tertiary);
   --input-disabled: var(--border-primary);
   --input-disabled-dark: var(--border-primary);
   --placeholder: var(--tertiary);
   --placeholder-dark: var(--tertiary);
   --helper: var(--tertiary);
   --helper-dark: var(--tertiary);
   --border: var(--border-primary);
   --border-dark: var(--border-primary);
   --border-hover: var(--primary);
   --border-hover-dark: var(--primary);
   --border-disabled: var(--border-secondary);
   --border-disabled-dark: var(--border-secondary);
   --border-alt: var(--border-secondary);
   --border-alt-dark: var(--border-secondary);
   --focus: var(--primary);
   --focus-dark: var(--primary);
   --focus-ring: var(--primary);
   --overlay-strong: rgba(3, 7, 15, 0.75);
   --overlay-medium: rgba(3, 7, 15, 0.55);
   --overlay-light: rgba(3, 7, 15, 0.35);
   --overlay-control-bg: rgba(255, 255, 255, 0.16);
   --overlay-control-bg-hover: rgba(255, 255, 255, 0.28);
   --overlay-control-divider: rgba(255, 255, 255, 0.35);
   --overlay-control-text: #f8fafc;

   /* Glass / Glassmorphism Tokens - Dark Mode (Apple-inspired) */
   --glass-blur-sm: 12px;
   --glass-blur: 18px;
   --glass-blur-lg: 24px;
   --glass-saturate-sm: 155%;
   --glass-saturate: 170%;
   --glass-saturate-lg: 185%;

   --glass-bg: rgba(20, 22, 28, 0.50);
   --glass-bg-subtle: rgba(20, 22, 28, 0.35);
   --glass-bg-prominent: rgba(20, 22, 28, 0.65);

   --glass-border: rgba(255, 255, 255, 0.12);
   --glass-border-subtle: rgba(255, 255, 255, 0.07);
   --glass-border-soft: rgba(255, 255, 255, 0.04);
   --glass-inner-highlight: rgba(255, 255, 255, 0.08);

   --glass-shadow: 0 14px 40px rgba(0, 0, 0, 0.40), 0 3px 12px rgba(0, 0, 0, 0.25);
   --glass-shadow-lg: 0 18px 50px rgba(0, 0, 0, 0.50), 0 4px 14px rgba(0, 0, 0, 0.28);

   --glass-hover: rgba(255, 255, 255, 0.07);
   --glass-pressed: rgba(255, 255, 255, 0.05);
   --glass-selected: rgba(255, 255, 255, 0.10);

   --glass-radius: 14px;

   /* Switch Component Variables - Dark Mode */
   --switch-off-bg: var(--tertiary);
   /* #64748b - Track when off */
   --switch-on-bg: var(--border-primary);
   /* #475569 - Track when on */
   --switch-disabled-bg: rgba(139, 139, 139, 0.2);
   /* Disabled track */
   --switch-thumb-off: #ffffff;
   /* White thumb when off */
   --switch-thumb-on: var(--primary);
   /* #f8fafc - Thumb when on */
   --switch-disabled-thumb: var(--bg-secondary);
   /* #0f172a - Disabled thumb (off state) */
   --switch-disabled-thumb-on: var(--border-primary);
   /* #475569 - Disabled thumb (on state) */

   /* Status Colors - Figma dark-mode mappings */
   --critical-dark: #ffcccc;
   /* Danger/200 */
   --critical: #ff9999;
   /* Danger/300 */
   --critical-light: #990000;
   /* Danger/800 */

   --warning-dark: #ffcc99;
   /* Warning/200 */
   --warning: #ff944d;
   /* Warning/400 */
   --warning-light: #dd6a00;
   /* Warning/700 */

   --positive-dark: #99ffcc;
   /* Positive/200 */
   --positive: #1aff66;
   /* Positive/400 */
   --positive-light: #00753d;
   /* Positive/700 */

   --neutral-dark: #b3d9ff;
   /* Neutral/200 */
   --neutral: #4da6ff;
   /* Neutral/400 */
   --neutral-light: #006dd3;
   /* Neutral/700 */

   /* Z-Index Scale (same values — z-index doesn't change by theme) */
   --z-index-base: 0;
   --z-index-sticky: 100;
   --z-index-dropdown: 1000;
   --z-index-overlay: 1050;
   --z-index-modal: 1060;
   --z-index-toast: 1080;
   --z-index-popover: 1090;
   --z-index-tooltip: 1100;
}

/* =====================================================
   NIGHT MODE COLORS
   ===================================================== */
.night {
   /* =====================================================
     BASE COLOR SCALES - NIGHT MODE
     ===================================================== */

   /* Primary Scale (9 shades - high contrast) */
   --primary-900: #ffffff;
   --primary-800: #f5f5f5;
   --primary-700: #f0f0f0;
   --primary-600: #e0e0e0;
   --primary-500: #d0d0d0;
   --primary-400: #a0a0a0;
   --primary-300: #808080;
   --primary-200: #404040;
   --primary-100: #202020;

   /* Secondary Scale (9 shades) */
   --secondary-900: #ffffff;
   --secondary-800: #f5f5f5;
   --secondary-700: #e0e0e0;
   --secondary-600: #c0c0c0;
   --secondary-500: #a0a0a0;
   --secondary-400: #808080;
   --secondary-300: #404040;
   --secondary-200: #303030;
   --secondary-100: #202020;

   /* Tertiary Scale (10 shades including 0) */
   --tertiary-900: #ffffff;
   --tertiary-800: #f5f5f5;
   --tertiary-700: #e0e0e0;
   --tertiary-600: #c0c0c0;
   --tertiary-500: #a0a0a0;
   --tertiary-400: #808080;
   --tertiary-300: #404040;
   --tertiary-200: #303030;
   --tertiary-100: #1a1a1a;
   --tertiary-0: #000000;

   /* Neutral Scale (9 shades) */
   --neutral-900: #e6f4ff;
   --neutral-800: #d1eaff;
   --neutral-700: #bddeff;
   --neutral-600: #a8d4ff;
   --neutral-500: #94caff;
   --neutral-400: #7fbfff;
   --neutral-300: #6bb5ff;
   --neutral-200: #56abff;
   --neutral-100: #42a1ff;

   /* Positive Scale (9 shades) */
   --positive-900: #d9ffe6;
   --positive-800: #c4f5d1;
   --positive-700: #b0ebbc;
   --positive-600: #9be2a7;
   --positive-500: #87d892;
   --positive-400: #73ce7d;
   --positive-300: #5ec468;
   --positive-200: #4aba53;
   --positive-100: #36b03e;

   /* Warning Scale (9 shades) */
   --warning-900: #fff0d9;
   --warning-800: #ffe6c7;
   --warning-700: #ffddb5;
   --warning-600: #ffd3a3;
   --warning-500: #ffc991;
   --warning-400: #ffbf7f;
   --warning-300: #ffb56d;
   --warning-200: #ffab5b;
   --warning-100: #ffa149;

   /* Danger Scale (9 shades) */
   --danger-900: #ffe8e8;
   --danger-800: #ffd6d6;
   --danger-700: #ffc4c4;
   --danger-600: #ffb2b2;
   --danger-500: #ffa0a0;
   --danger-400: #ff8e8e;
   --danger-300: #ff7c7c;
   --danger-200: #ff6a6a;
   --danger-100: #ff5858;

   /* =====================================================
     SEMANTIC COLORS - SELECTED FROM BASE COLORS
     ===================================================== */

   /* Semantic Colors - Figma night-mode mappings */
   --primary: #f0f0f0;
   /* Gray/700 */
   --secondary: #d0d0d0;
   /* Gray/500 */
   --tertiary: #a0a0a0;
   /* Gray/400 */
   --border-primary: #404040;
   /* Gray/200 */
   --border-secondary: #202020;
   /* Gray/100 */
   --bg-primary: #000000;
   /* Secondary/0 */
   --bg-secondary: #1a1a1a;
   /* Secondary/100 */
   --bg-tertiary: #202020;
   /* Elevated surface */

   /* Text Semantic Colors */
   --text-primary: var(--primary);
   --text-secondary: var(--secondary);
   --text-tertiary: var(--tertiary);
   --text-placeholder: var(--tertiary);
   --text-disabled: var(--border-primary);
   --color-divider: var(--border-secondary);

   /* Button Colors - NIGHT MODE */
   --button-primary-bg: #f0f0f0;
   /* LIGHT background */
   --button-primary-text: #000000;
   /* BLACK text on light bg */
   --button-primary-hover-bg: #d0d0d0;
   --button-primary-border: #f0f0f0;

   --button-secondary-bg: #1a1a1a;
   /* Very dark background */
   --button-secondary-text: #f0f0f0;
   /* Light text */
   --button-secondary-hover-bg: #202020;
   --button-secondary-border: #404040;
   --button-secondary-hover-border: #a0a0a0;

   --button-destructive-bg: #ff6666;
   /* Night mode red */
   --button-destructive-text: #ffffff;
   --button-destructive-hover-bg: #ff4d4f;
   --button-destructive-border: #ff6666;

   --button-text-bg: transparent;
   --button-text-text: #f0f0f0;
   /* Light text */
   --button-text-hover-bg: #202020;
   --button-text-border: transparent;

   /* Badge Colors - NIGHT MODE */
   --badge-normal-bg: #404040;
   --badge-normal-text: #f0f0f0;
   --badge-normal-border: #202020;
   --badge-normal-hover-bg: #202020;
   --badge-normal-hover-border: #a0a0a0;

   --badge-danger-bg: #1a1a1a;
   --badge-danger-text: #ff6666;
   --badge-danger-border: #ff6666;
   --badge-danger-hover-bg: #000000;
   --badge-danger-hover-border: #ff6666;
   --badge-danger-hover-text: #ff6666;

   --badge-success-bg: #1a1a1a;
   --badge-success-text: #33ff77;
   --badge-success-border: #33ff77;
   --badge-success-hover-bg: #000000;
   --badge-success-hover-border: #33ff77;

   --badge-warning-bg: #1a1a1a;
   --badge-warning-text: #ff8c4d;
   --badge-warning-border: #ff8c4d;
   --badge-warning-hover-bg: #000000;
   --badge-warning-hover-border: #ff8c4d;

   --badge-neutral-bg: #1a1a1a;
   --badge-neutral-text: #66b3ff;
   --badge-neutral-border: #66b3ff;
   --badge-neutral-hover-bg: #000000;
   --badge-neutral-hover-border: #66b3ff;

   /* Badge System Variables - Night Mode */
   --badge-border-radius: 4px;
   --badge-font-size: 12px;
   --badge-font-weight: 500;

   /* Missing Form System Variables - Night Mode */
   --surface: var(--bg-primary);
   --surface-dark: var(--bg-primary);
   --surface-alt: var(--bg-secondary);
   --surface-alt-dark: var(--bg-secondary);
   --surface-hover: var(--bg-tertiary);
   --surface-hover-dark: var(--bg-tertiary);
   --input: var(--primary);
   --input-dark: var(--primary);
   --input-muted: var(--tertiary);
   --input-muted-dark: var(--tertiary);
   --input-disabled: var(--border-primary);
   --input-disabled-dark: var(--border-primary);
   --placeholder: var(--tertiary);
   --placeholder-dark: var(--tertiary);
   --helper: var(--tertiary);
   --helper-dark: var(--tertiary);
   --border: var(--border-primary);
   --border-dark: var(--border-primary);
   --border-hover: var(--primary);
   --border-hover-dark: var(--primary);
   --border-disabled: var(--border-secondary);
   --border-disabled-dark: var(--border-secondary);
   --border-alt: var(--border-secondary);
   --border-alt-dark: var(--border-secondary);
   --focus: var(--primary);
   --focus-dark: var(--primary);
   --focus-ring: var(--primary);
   --overlay-strong: rgba(0, 0, 0, 0.75);
   --overlay-medium: rgba(0, 0, 0, 0.55);
   --overlay-light: rgba(0, 0, 0, 0.35);
   --overlay-control-bg: rgba(255, 255, 255, 0.2);
   --overlay-control-bg-hover: rgba(255, 255, 255, 0.35);
   --overlay-control-divider: rgba(255, 255, 255, 0.4);
   --overlay-control-text: #ffffff;

   /* Glass / Glassmorphism Tokens - Night Mode (macOS vibrant dark) */
   --glass-blur-sm: 14px;
   --glass-blur: 20px;
   --glass-blur-lg: 26px;
   --glass-saturate-sm: 130%;
   --glass-saturate: 140%;
   --glass-saturate-lg: 155%;

   --glass-bg: rgba(18, 18, 20, 0.45);
   --glass-bg-subtle: rgba(18, 18, 20, 0.30);
   --glass-bg-prominent: rgba(18, 18, 20, 0.60);

   --glass-border: rgba(255, 255, 255, 0.08);
   --glass-border-subtle: rgba(255, 255, 255, 0.05);
   --glass-border-soft: rgba(255, 255, 255, 0.03);
   --glass-inner-highlight: rgba(255, 255, 255, 0.06);

   --glass-shadow: 0 14px 40px rgba(0, 0, 0, 0.50), 0 3px 12px rgba(0, 0, 0, 0.30);
   --glass-shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.60), 0 5px 16px rgba(0, 0, 0, 0.32);

   --glass-hover: rgba(255, 255, 255, 0.05);
   --glass-pressed: rgba(255, 255, 255, 0.03);
   --glass-selected: rgba(255, 255, 255, 0.08);

   --glass-radius: 14px;

   /* Switch Component Variables - Night Mode */
   --switch-off-bg: var(--tertiary);
   /* #a0a0a0 - Track when off */
   --switch-on-bg: var(--border-primary);
   /* #404040 - Track when on */
   --switch-disabled-bg: rgba(139, 139, 139, 0.2);
   /* Disabled track */
   --switch-thumb-off: #ffffff;
   /* White thumb when off */
   --switch-thumb-on: var(--primary);
   /* #ffffff - Thumb when on */
   --switch-disabled-thumb: var(--bg-secondary);
   /* #1a1a1a - Disabled thumb (off state) */
   --switch-disabled-thumb-on: var(--border-primary);
   /* #404040 - Disabled thumb (on state) */

   /* Status Colors - Figma night-mode mappings */
   --critical-dark: #b80100;
   /* Critical_Dark */
   --critical: #ff6666;
   /* Critical */
   --critical-light: #ffeaea;
   /* Critical_Light */

   --warning-dark: #dd6a00;
   /* Warning_Dark */
   --warning: #ff8c4d;
   /* Warning */
   --warning-light: #ffebdc;
   /* Warning_Light */

   --positive-dark: #00763d;
   /* Positive_Dark */
   --positive: #33ff77;
   /* Positive */
   --positive-light: #dfffe8;
   /* Positive_Light */

   --neutral-dark: #006ed3;
   /* Neutral_Dark */
   --neutral: #66b3ff;
   /* Neutral */
   --neutral-light: #ecf6ff;
   /* Neutral_Light */

   /* Z-Index Scale (same values — z-index doesn't change by theme) */
   --z-index-base: 0;
   --z-index-sticky: 100;
   --z-index-dropdown: 1000;
   --z-index-overlay: 1050;
   --z-index-modal: 1060;
   --z-index-toast: 1080;
   --z-index-popover: 1090;
   --z-index-tooltip: 1100;
}

/* =====================================================
   BASE STYLES
   ===================================================== */
html {
   font-size: 14px;
}

@media (max-width: 1366px) {
   html {
      font-size: 12px;
   }
}

body {
   font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
   line-height: var(--lh-body);
   background-color: var(--bg-primary);
   color: var(--primary);
}

/* =====================================================
   UTILITY CLASSES
   ===================================================== */
.text-primary {
   color: var(--primary);
}

.text-secondary {
   color: var(--secondary);
}

.text-tertiary {
   color: var(--tertiary);
}

.text-critical {
   color: var(--critical);
}

.text-warning {
   color: var(--warning);
}

.text-positive {
   color: var(--positive);
}

.text-neutral {
   color: var(--neutral);
}

.bg-primary {
   background-color: var(--primary);
}

.bg-secondary {
   background-color: var(--secondary);
}

.bg-critical {
   background-color: var(--critical);
}

.bg-warning {
   background-color: var(--warning);
}

.bg-positive {
   background-color: var(--positive);
}

.bg-neutral {
   background-color: var(--neutral);
}

.bg-overlay {
   background-color: var(--overlay-strong);
}

.bg-overlay-soft {
   background-color: var(--overlay-medium);
}

.bg-overlay-light {
   background-color: var(--overlay-light);
}

.border-primary {
   border-color: var(--primary);
}

.border-secondary {
   border-color: var(--secondary);
}

.border-critical {
   border-color: var(--critical);
}

.border-warning {
   border-color: var(--warning);
}

.border-positive {
   border-color: var(--positive);
}

.border-neutral {
   border-color: var(--neutral);
}

/* Rem-based text size utilities (responsive typography + line-height) */
.text-xxs-rem {
   font-size: var(--font-size-xxs-rem);
   line-height: var(--lh-compact);
}

.text-xs-rem {
   font-size: var(--font-size-xs-rem);
   line-height: var(--lh-xs);
}

.text-sm-rem {
   font-size: var(--font-size-sm-rem);
   line-height: var(--lh-sm);
}

.text-md-rem {
   font-size: var(--font-size-md-rem);
   line-height: var(--lh-md);
}

.text-lg-rem {
   font-size: var(--font-size-lg-rem);
   line-height: var(--lh-lg);
}

.text-xl-rem {
   font-size: var(--font-size-xl-rem);
   line-height: var(--lh-xl);
}

.text-xxl-rem {
   font-size: var(--font-size-xxl-rem);
   line-height: var(--lh-xxl);
}

.text-3xl-rem {
   font-size: var(--font-size-3xl-rem);
   line-height: var(--lh-3xl);
}

.text-4xl-rem {
   font-size: var(--font-size-4xl-rem);
   line-height: var(--lh-4xl);
}

.text-3_5xl-rem {
   font-size: var(--font-size-3_5xl-rem);
   line-height: var(--lh-4xl);
}

.text-5xl-rem {
   font-size: var(--font-size-5xl-rem);
   line-height: 1;
}

/* =====================================================
   GLASS / GLASSMORPHISM UTILITIES
   ===================================================== */

/* ---- Base glass surface — dropdowns, floating panels, action sheets ---- */
.glass {
   position: relative;
   background: var(--glass-bg);
   backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
   -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
   border: 1px solid var(--glass-border);
   border-radius: var(--glass-radius);
   box-shadow: var(--glass-shadow);
}
.glass::before {
   content: "";
   position: absolute;
   inset: 0;
   border-radius: inherit;
   pointer-events: none;
   box-shadow: inset 0 1px 0 var(--glass-inner-highlight),
               inset 0 0 0 1px var(--glass-border-soft);
}

/* ---- Subtle — inline popovers, tooltips, small floating elements ---- */
.glass-subtle {
   position: relative;
   background: var(--glass-bg-subtle);
   backdrop-filter: blur(var(--glass-blur-sm)) saturate(var(--glass-saturate-sm));
   -webkit-backdrop-filter: blur(var(--glass-blur-sm)) saturate(var(--glass-saturate-sm));
   border: 1px solid var(--glass-border-subtle);
   border-radius: var(--glass-radius);
   box-shadow: var(--glass-shadow);
}
.glass-subtle::before {
   content: "";
   position: absolute;
   inset: 0;
   border-radius: inherit;
   pointer-events: none;
   box-shadow: inset 0 1px 0 var(--glass-inner-highlight),
               inset 0 0 0 1px var(--glass-border-soft);
}

/* ---- Prominent — modals, command menus, full overlays ---- */
.glass-prominent {
   position: relative;
   background: var(--glass-bg-prominent);
   backdrop-filter: blur(var(--glass-blur-lg)) saturate(var(--glass-saturate-lg));
   -webkit-backdrop-filter: blur(var(--glass-blur-lg)) saturate(var(--glass-saturate-lg));
   border: 1px solid var(--glass-border);
   border-radius: var(--glass-radius);
   box-shadow: var(--glass-shadow-lg);
}
.glass-prominent::before {
   content: "";
   position: absolute;
   inset: 0;
   border-radius: inherit;
   pointer-events: none;
   box-shadow: inset 0 1px 0 var(--glass-inner-highlight),
               inset 0 0 0 1px var(--glass-border-soft);
}

/* ---- Item states inside glass surfaces ---- */
.glass-item {
   background: transparent;
   transition: background 150ms ease;
}
.glass-item:hover {
   background: var(--glass-hover);
}
.glass-item:active {
   background: var(--glass-pressed);
}
.glass-item[aria-selected="true"],
.glass-item[data-selected="true"] {
   background: var(--glass-selected);
}

/* ---- Graceful degradation ---- */
@supports not (backdrop-filter: blur(1px)) {
   .glass,
   .glass-subtle,
   .glass-prominent {
      background: var(--glass-bg-prominent);
   }
}

/* ---- Respect reduced transparency preference ---- */
@media (prefers-reduced-transparency: reduce) {
   .glass,
   .glass-subtle,
   .glass-prominent {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--glass-bg-prominent);
   }
}`;

// Pre-formatted summary strings for machine-readable views
export const SPACING_SUMMARY = "--spacing-x0: 0px, --spacing-x1: 4px, --spacing-x2: 8px, --spacing-x3: 12px\n--spacing-x4: 16px, --spacing-x5: 20px, --spacing-x6: 24px, --spacing-x7: 28px\n--spacing-x8: 32px, --spacing-x9: 36px, --spacing-x10: 40px, --spacing-x11: 44px\n--spacing-x12: 48px, --spacing-x13: 52px, --spacing-x14: 56px, --spacing-x15: 60px\n--spacing-x16: 64px, --spacing-x20: 80px, --spacing-x24: 96px, --spacing-x38: 152px";
export const HALF_STEP_SUMMARY = "Half-steps: --spacing-x1-5: 6px, --spacing-x2-5: 10px, --spacing-x3-5: 14px";
export const TYPOGRAPHY_SUMMARY = "text-xs-rem=12px, text-xxs-rem=10px, text-sm-rem=14px\ntext-md-rem=16px, text-lg-rem=20px, text-xl-rem=24px\ntext-xxl-rem=28px, text-3xl-rem=36px, text-4xl-rem=48px\ntext-3_5xl-rem=40px, text-5xl-rem=72px";
export const RADIUS_SUMMARY = "--radius-none=0px, --radius-sm=4px, --radius-md=8px, --radius-lg=12px, --radius-xl=16px, --radius-2xl=20px, --radius-3xl=24px, --radius-4xl=28px, --radius-2xs=2px, --radius-smd=6px, --radius-full=9999px";
