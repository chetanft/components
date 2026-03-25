import rootConfig from '../tailwind.config.js';
import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    ...rootConfig,
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        '../src/**/*.{js,jsx,ts,tsx}', // Include component library source
        // Exclude dist and build files
        '!../dist/**/*',
        '!./dist/**/*',
        '!../node_modules/**/*',
        '!./node_modules/**/*',
    ],
    theme: {
        ...rootConfig.theme,
        extend: {
            ...rootConfig.theme.extend,
            colors: {
                ...rootConfig.theme.extend.colors,
                // Map docs-specific tokens
                background: 'var(--docs-background)',
                foreground: 'var(--docs-foreground)',
                card: {
                    DEFAULT: 'var(--docs-card)',
                    foreground: 'var(--docs-card-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--docs-popover)',
                    foreground: 'var(--docs-popover-foreground)',
                },
                primary: {
                    ...rootConfig.theme.extend.colors.primary,
                    DEFAULT: 'var(--docs-primary)',
                    foreground: 'var(--docs-primary-foreground)',
                },
                secondary: {
                    ...rootConfig.theme.extend.colors.secondary,
                    DEFAULT: 'var(--docs-secondary)',
                    foreground: 'var(--docs-secondary-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--docs-muted)',
                    foreground: 'var(--docs-muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--docs-accent)',
                    foreground: 'var(--docs-accent-foreground)',
                },
                destructive: {
                    ...rootConfig.theme.extend.colors.destructive,
                    DEFAULT: 'var(--docs-destructive)',
                    foreground: 'var(--docs-destructive-foreground)',
                },
                border: 'var(--docs-border)',
                input: 'var(--docs-input)',
                ring: 'var(--docs-ring)',
                sidebar: {
                    DEFAULT: 'var(--docs-sidebar)',
                    foreground: 'var(--docs-sidebar-foreground)',
                    primary: 'var(--docs-sidebar-primary)',
                    'primary-foreground': 'var(--docs-sidebar-primary-foreground)',
                    accent: 'var(--docs-sidebar-accent)',
                    'accent-foreground': 'var(--docs-sidebar-accent-foreground)',
                    border: 'var(--docs-sidebar-border)',
                    ring: 'var(--docs-sidebar-ring)',
                },
                chart: {
                    1: 'var(--docs-chart-1)',
                    2: 'var(--docs-chart-2)',
                    3: 'var(--docs-chart-3)',
                    4: 'var(--docs-chart-4)',
                    5: 'var(--docs-chart-5)',
                },
            },
            fontSize: {
                ...rootConfig.theme?.extend?.fontSize,
                'display-xl': 'var(--docs-display-xl)',
                'display-lg': 'var(--docs-display-lg)',
                'display-sm': 'var(--docs-display-sm)',
                'page-title': ['2.571rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],  // ~36px
                'section':    ['1.714rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],  // ~24px
                'subsection': ['1.286rem', { lineHeight: '1.4' }],  // ~18px
            },
            fontFamily: {
                sans: 'var(--docs-font-sans)',
                mono: 'var(--docs-font-mono)',
            },
            spacing: {
                ...rootConfig.theme?.extend?.spacing,
                unit: 'var(--docs-spacing)',
            },
            borderRadius: {
                ...rootConfig.theme.extend.borderRadius,
                lg: 'var(--docs-radius)',
                md: 'calc(var(--docs-radius) - 2px)',
                sm: 'calc(var(--docs-radius) - 4px)',
            },
        },
    },
    plugins: [
        ...rootConfig.plugins || [],
        tailwindAnimate,
    ],
    darkMode: 'class',
}
