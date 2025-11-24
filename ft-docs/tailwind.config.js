import rootConfig from '../tailwind.config.js';

/** @type {import('tailwindcss').Config} */
export default {
    ...rootConfig,
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        '../src/**/*.{js,jsx,ts,tsx}', // Include component library source
    ],
    theme: {
        ...rootConfig.theme,
        extend: {
            ...rootConfig.theme.extend,
            colors: {
                ...rootConfig.theme.extend.colors,
                // Map docs-specific tokens
                background: 'hsl(var(--docs-background))',
                foreground: 'hsl(var(--docs-foreground))',
                card: {
                    DEFAULT: 'hsl(var(--docs-card))',
                    foreground: 'hsl(var(--docs-card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--docs-popover))',
                    foreground: 'hsl(var(--docs-popover-foreground))',
                },
                primary: {
                    ...rootConfig.theme.extend.colors.primary,
                    DEFAULT: 'hsl(var(--docs-primary))',
                    foreground: 'hsl(var(--docs-primary-foreground))',
                },
                secondary: {
                    ...rootConfig.theme.extend.colors.secondary,
                    DEFAULT: 'hsl(var(--docs-secondary))',
                    foreground: 'hsl(var(--docs-secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--docs-muted))',
                    foreground: 'hsl(var(--docs-muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--docs-accent))',
                    foreground: 'hsl(var(--docs-accent-foreground))',
                },
                destructive: {
                    ...rootConfig.theme.extend.colors.destructive, // Keep FT destructive if exists, or override
                    DEFAULT: 'hsl(var(--docs-destructive))',
                    foreground: 'hsl(var(--docs-destructive-foreground))',
                },
                border: 'hsl(var(--docs-border))',
                input: 'hsl(var(--docs-input))',
                ring: 'hsl(var(--docs-ring))',
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
