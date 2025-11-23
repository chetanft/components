import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        '../src/**/*.{js,jsx,ts,tsx}', // Include component library source
    ],

    // CRITICAL: Safelist ensures all design system classes are included
    safelist: [
        // CSS Variable-based colors
        'bg-[var(--button-primary-bg)]',
        'bg-[var(--button-secondary-bg)]',
        'bg-[var(--button-destructive-bg)]',
        'bg-[var(--button-text-bg)]',
        'text-[var(--button-primary-text)]',
        'text-[var(--button-secondary-text)]',
        'text-[var(--button-destructive-text)]',
        'text-[var(--button-text-text)]',
        'border-[var(--button-primary-border)]',
        'border-[var(--button-secondary-border)]',
        'border-[var(--button-destructive-border)]',
        'border-[var(--button-text-border)]',
        'hover:bg-[var(--button-primary-hover-bg)]',
        'hover:bg-[var(--button-secondary-hover-bg)]',
        'hover:bg-[var(--button-destructive-hover-bg)]',
        'hover:bg-[var(--button-text-hover-bg)]',
        'hover:border-[var(--button-secondary-hover-border)]',

        // Badge colors
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
        'rounded-[var(--component-border-radius)]',
        'rounded-[8px]',
        'rounded-md',
        'rounded-lg',

        // Spacing
        'px-[12px]',
        'px-[16px]',
        'py-[8px]',
        'py-[10px]',
        'gap-[8px]',
    ],

    theme: {
        extend: {
            borderRadius: {
                'component': '8px',
            },
        },
    },

    plugins: [],
    darkMode: 'class',
}
