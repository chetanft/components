"use client"

import { useState } from "react"
import { Check, Copy, Download } from "lucide-react"

const globalCssContent = `/* =====================================================
   FT DESIGN SYSTEM - COMPREHENSIVE GLOBAL CSS
   ===================================================== 
   
   Copy this file to your project and import it in your root layout/app.
   Usage: import './globals.css' or import '@/styles/globals.css'
*/

@tailwind base;
@tailwind components;
@tailwind utilities;

@custom-variant dark (&:is(.dark *));

:root {
  /* =====================================================
     BASE COLOR SCALES - LIGHT MODE (FOUNDATION)
     ===================================================== */
  
  /* Primary Scale (9 shades) */
  --primary-900: #1a2330;
  --primary-800: #2c3547;
  --primary-700: #434f64;
  --primary-600: #49556a;
  --primary-500: #5f697b;
  --primary-400: #6c7689;
  --primary-300: #838c9d;
  --primary-200: #9aa3b2;
  --primary-100: #c5cad3;
  
  /* Secondary Scale (9 shades) */
  --secondary-900: #1e1f22;
  --secondary-800: #303236;
  --secondary-700: #4a4d52;
  --secondary-600: #6c6f75;
  --secondary-500: #979ba2;
  --secondary-400: #b6bac0;
  --secondary-300: #ced1d7;
  --secondary-200: #ebecef;
  --secondary-100: #f0f1f7;
  
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
  --primary: var(--primary-700);        /* #434f64 */
  --secondary: var(--primary-500);      /* #5f697b */
  --tertiary: var(--primary-300);       /* #838c9d */
  --border-primary: var(--secondary-300);    /* #ced1d7 */
  --border-secondary: var(--secondary-100);  /* #f0f1f7 */
  --bg-primary: var(--tertiary-0);      /* #ffffff */
  --bg-secondary: var(--tertiary-100);  /* #f8f8f9 */
  
  /* Button Colors */
  --button-primary-bg: #434f64;
  --button-primary-text: #ffffff;
  --button-primary-hover-bg: #1d2a38;
  --button-primary-border: #434f64;
  
  --button-secondary-bg: #ffffff;
  --button-secondary-text: #434f64;
  --button-secondary-hover-bg: #f0f1f7;
  --button-secondary-border: #ced1d7;
  --button-secondary-hover-border: #838c9d;
  
  --button-tertiary-bg: #f8f8f9;
  --button-tertiary-text: #434f64;
  --button-tertiary-hover-bg: #f0f1f7;
  --button-tertiary-border: #ced1d7;
  --button-tertiary-hover-border: #ced1d7;
  
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
  
  /* Form System Variables - Light Mode */
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
  
  /* Radio Component Variables */
  --radio-size: 20px;
  --radio-gap: 8px;

  /* Switch Component Variables */
  --switch-off-bg: var(--tertiary);
  --switch-on-bg: var(--border-primary);
  --switch-disabled-bg: rgba(139, 139, 139, 0.2);
  --switch-thumb-off: #ffffff;
  --switch-thumb-on: var(--primary);
  --switch-disabled-thumb: var(--bg-secondary);
  --switch-disabled-thumb-on: var(--border-primary);

  /* Semantic Status Colors */
  --critical-dark: var(--danger-700);
  --critical: var(--danger-500);
  --critical-light: var(--danger-100);
  
  --warning-dark: var(--warning-700);
  --warning: var(--warning-500);
  --warning-light: var(--warning-100);
  
  --positive-dark: var(--positive-700);
  --positive: var(--positive-500);
  --positive-light: var(--positive-100);
  
  --neutral-dark: var(--neutral-700);
  --neutral: var(--neutral-500);
  --neutral-light: var(--neutral-100);
  
  /* Component System Variables */
  --component-border-radius: 8px;
  --component-border-width: 2px;
  --component-border-color: var(--border-primary);
  --component-border-focus: var(--primary);
  --component-transition: all 200ms ease-in-out;
  --component-gap-sm: 8px;
  --component-gap-md: 12px;
  --component-gap-lg: 16px;
  --component-font-size-sm: 14px;
  --component-font-size-md: 14px;
  --component-font-size-lg: 16px;
  --component-font-size-xl: 18px;
  --component-font-weight: 500;
  --component-height-xxs: 16px;
  --component-height-sm: 36px;
  --component-height-md: 40px;
  --component-height-lg: 48px;
  --component-height-xl: 64px;
  --component-padding-xxs: 2px 6px;
  --component-padding-sm: 8px 12px;
  --component-padding-md: 12px 16px;
  --component-padding-lg: 16px 20px;
  --component-padding-xl: 20px 24px;
  
  /* Spacing System - 8-Point Grid */
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
}

/* =====================================================
   DARK MODE COLORS
   ===================================================== */
.dark {
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
  
  /* Semantic Colors - Reference base color scales */
  --primary: var(--primary-900);
  --secondary: var(--primary-500);
  --tertiary: var(--primary-400);
  --border-primary: var(--primary-300);
  --border-secondary: var(--primary-200);
  --bg-primary: var(--tertiary-0);
  --bg-secondary: var(--tertiary-100);
  
  /* Button Colors - DARK MODE */
  --button-primary-bg: #e2e8f0;
  --button-primary-text: #000000;
  --button-primary-hover-bg: #94a3b8;
  --button-primary-border: #e2e8f0;
  
  --button-secondary-bg: #1e293b;
  --button-secondary-text: #e2e8f0;
  --button-secondary-hover-bg: #334155;
  --button-secondary-border: #475569;
  --button-secondary-hover-border: #64748b;
  
  --button-tertiary-bg: #334155;
  --button-tertiary-text: #e2e8f0;
  --button-tertiary-hover-bg: #475569;
  --button-tertiary-border: #475569;
  --button-tertiary-hover-border: #64748b;
  
  --button-destructive-bg: #ff4d4f;
  --button-destructive-text: #ffffff;
  --button-destructive-hover-bg: #dc2626;
  --button-destructive-border: #ff4d4f;
  
  --button-text-bg: transparent;
  --button-text-text: #e2e8f0;
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
  
  --badge-warning-bg: #78350f;
  --badge-warning-text: #fbbf24;
  --badge-warning-border: #f59e0b;
  --badge-warning-hover-bg: #92400e;
  
  --badge-neutral-bg: #0c4a6e;
  --badge-neutral-text: #7dd3fc;

  /* Form System Variables - Dark Mode */
  --surface: #1E293B;
  --surface-alt: #0F172A;
  --surface-hover: #334155;
  --input: #F0F0F0;
  --input-muted: #A0A0A0;
  --input-disabled: #475569;
  --placeholder: #A0A0A0;
  --helper: #A0A0A0;
  --border: #404040;
  --border-hover: #F0F0F0;
  --border-disabled: #334155;
  --border-alt: #404040;
  --focus: #F0F0F0;
  --focus-ring: #F0F0F0;
  
  /* Switch Component Variables - Dark Mode */
  --switch-off-bg: var(--tertiary);
  --switch-on-bg: var(--border-primary);
  --switch-disabled-bg: rgba(139, 139, 139, 0.2);
  --switch-thumb-off: #ffffff;
  --switch-thumb-on: var(--primary);
  --switch-disabled-thumb: var(--bg-secondary);
  --switch-disabled-thumb-on: var(--border-primary);
  
  /* Status Colors - Dark Mode */
  --critical-dark: var(--danger-700);
  --critical: var(--danger-500);
  --critical-light: var(--danger-100);
  
  --warning-dark: var(--warning-700);
  --warning: var(--warning-500);
  --warning-light: var(--warning-100);
  
  --positive-dark: var(--positive-700);
  --positive: var(--positive-500);
  --positive-light: var(--positive-100);
  
  --neutral-dark: var(--neutral-700);
  --neutral: var(--neutral-500);
  --neutral-light: var(--neutral-100);
}

/* =====================================================
   NIGHT MODE COLORS (True Black)
   ===================================================== */
.night {
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
  
  /* Semantic Colors */
  --primary: var(--primary-900);
  --secondary: var(--primary-500);
  --tertiary: var(--primary-400);
  --border-primary: var(--secondary-300);
  --border-secondary: var(--secondary-200);
  --bg-primary: var(--tertiary-0);
  --bg-secondary: var(--tertiary-100);
  
  /* Button Colors - NIGHT MODE */
  --button-primary-bg: #f0f0f0;
  --button-primary-text: #000000;
  --button-primary-hover-bg: #d0d0d0;
  --button-primary-border: #f0f0f0;
  
  --button-secondary-bg: #1a1a1a;
  --button-secondary-text: #f0f0f0;
  --button-secondary-hover-bg: #202020;
  --button-secondary-border: #404040;
  --button-secondary-hover-border: #a0a0a0;
  
  /* Form System Variables - Night Mode */
  --surface: #1a1a1a;
  --surface-alt: #000000;
  --surface-hover: #202020;
  --input: #f0f0f0;
  --input-muted: #a0a0a0;
  --input-disabled: #404040;
  --placeholder: #a0a0a0;
  --helper: #a0a0a0;
  --border: #404040;
  --border-hover: #f0f0f0;
  --border-disabled: #202020;
  --border-alt: #404040;
  --focus: #f0f0f0;
  --focus-ring: #f0f0f0;
}

/* =====================================================
   BASE STYLES
   ===================================================== */
html {
  font-size: 14px;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--bg-primary);
  color: var(--primary);
}

/* =====================================================
   UTILITY CLASSES
   ===================================================== */
.text-primary { color: var(--primary); }
.text-secondary { color: var(--secondary); }
.text-tertiary { color: var(--tertiary); }
.text-critical { color: var(--critical); }
.text-warning { color: var(--warning); }
.text-positive { color: var(--positive); }
.text-neutral { color: var(--neutral); }

.bg-primary { background-color: var(--primary); }
.bg-secondary { background-color: var(--secondary); }
.bg-critical { background-color: var(--critical); }
.bg-warning { background-color: var(--warning); }
.bg-positive { background-color: var(--positive); }
.bg-neutral { background-color: var(--neutral); }

.border-primary { border-color: var(--primary); }
.border-secondary { border-color: var(--secondary); }
.border-critical { border-color: var(--critical); }
.border-warning { border-color: var(--warning); }
.border-positive { border-color: var(--positive); }
.border-neutral { border-color: var(--neutral); }
`

export default function GlobalCSSPage() {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(globalCssContent)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const downloadFile = () => {
        const blob = new Blob([globalCssContent], { type: 'text/css' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'globals.css'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-5xl font-bold tracking-tight">
                    Global CSS
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400">
                    The complete FT Design System CSS file containing all design tokens, color scales, and utility classes.
                </p>
            </div>

            {/* Quick Start */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Quick Start</h2>
                <div className="rounded-lg border bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 p-4">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>1.</strong> Copy or download the CSS file below<br />
                        <strong>2.</strong> Save it as <code className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/50 rounded text-xs font-mono">globals.css</code> in your project<br />
                        <strong>3.</strong> Import it in your root layout: <code className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/50 rounded text-xs font-mono">import './globals.css'</code>
                    </p>
                </div>
            </div>

            {/* Token Categories */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="rounded-lg border p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-700 to-primary-500" style={{ background: 'linear-gradient(to right, #434f64, #5f697b)' }} />
                            <h3 className="font-semibold">Color Scales</h3>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            9-shade scales for Primary, Secondary, Tertiary, Neutral, Positive, Warning, and Danger colors.
                        </p>
                    </div>
                    <div className="rounded-lg border p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <h3 className="font-semibold">Component Tokens</h3>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Button, Badge, Form, Switch, and Radio component variables with hover and focus states.
                        </p>
                    </div>
                    <div className="rounded-lg border p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <h3 className="font-semibold">Spacing System</h3>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            8-point grid spacing from --x1 (4px) to --x12 (48px) for consistent layouts.
                        </p>
                    </div>
                    <div className="rounded-lg border p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500" />
                            <h3 className="font-semibold">Dark Mode</h3>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Full dark mode support with inverted color scales and adjusted semantic colors.
                        </p>
                    </div>
                    <div className="rounded-lg border p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-zinc-900 dark:bg-white" />
                            <h3 className="font-semibold">Night Mode</h3>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            True black theme for OLED displays with high contrast colors.
                        </p>
                    </div>
                    <div className="rounded-lg border p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-500" />
                            <h3 className="font-semibold">Utility Classes</h3>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Text, background, and border utility classes using design tokens.
                        </p>
                    </div>
                </div>
            </div>

            {/* CSS File */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold tracking-tight">globals.css</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={downloadFile}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                        >
                            <Download className="h-4 w-4" />
                            Download
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4" />
                                    Copy CSS
                                </>
                            )}
                        </button>
                    </div>
                </div>
                <div className="relative rounded-lg border bg-zinc-950 dark:bg-zinc-900 overflow-hidden">
                    <div className="absolute top-3 right-3">
                        <button
                            onClick={copyToClipboard}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                            title="Copy to clipboard"
                        >
                            {copied ? (
                                <Check className="h-4 w-4 text-green-400" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm text-zinc-100 font-mono max-h-[600px] overflow-y-auto">
                        <code>{globalCssContent}</code>
                    </pre>
                </div>
            </div>

            {/* Usage Examples */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight">Usage Examples</h2>
                <div className="space-y-4">
                    <div className="rounded-lg border p-4 space-y-3">
                        <h3 className="font-semibold">Using CSS Variables</h3>
                        <pre className="rounded-md bg-zinc-950 dark:bg-zinc-900 p-3 text-sm text-zinc-100 font-mono overflow-x-auto">
{`.my-component {
  color: var(--primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  padding: var(--x4);
  border-radius: var(--component-border-radius);
}`}
                        </pre>
                    </div>
                    <div className="rounded-lg border p-4 space-y-3">
                        <h3 className="font-semibold">Using Utility Classes</h3>
                        <pre className="rounded-md bg-zinc-950 dark:bg-zinc-900 p-3 text-sm text-zinc-100 font-mono overflow-x-auto">
{`<div class="text-primary bg-neutral border-warning">
  Styled with utility classes
</div>`}
                        </pre>
                    </div>
                    <div className="rounded-lg border p-4 space-y-3">
                        <h3 className="font-semibold">Theme Switching</h3>
                        <pre className="rounded-md bg-zinc-950 dark:bg-zinc-900 p-3 text-sm text-zinc-100 font-mono overflow-x-auto">
{`<!-- Light mode (default) -->
<html>

<!-- Dark mode -->
<html class="dark">

<!-- Night mode (true black) -->
<html class="night">`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}




