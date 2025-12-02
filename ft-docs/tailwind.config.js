import rootConfig from '../tailwind.config.js';

/** @type {import('tailwindcss').Config} */
export default {
    ...rootConfig,
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        '../src/**/*.{js,jsx,ts,tsx}', // Include component library source
        // Exclude DropdownMenu files that have problematic CSS variable patterns
        '!../src/components/molecules/DropdownMenu/**/*',
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
                    ...rootConfig.theme.extend.colors.destructive, // Keep FT destructive if exists, or override
                    DEFAULT: 'var(--docs-destructive)',
                    foreground: 'var(--docs-destructive-foreground)',
                },
                border: 'var(--docs-border)',
                input: 'var(--docs-input)',
                ring: 'var(--docs-ring)',
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
        require("tailwindcss-animate")
    ],
    darkMode: 'class',
}
