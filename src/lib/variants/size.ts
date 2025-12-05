/**
 * Shared Size Variants
 * 
 * Common size configurations used across components.
 * Uses FT Design System spacing and typography tokens.
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Component height and font size variants
 * Maps to FT Design System component sizing tokens
 */
export const sizeVariants = cva('', {
    variants: {
        size: {
            xxs: 'h-component-xxs text-xs-rem',
            xs: 'h-component-xs text-xs-rem',
            sm: 'h-component-sm text-sm-rem',
            md: 'h-component-md text-md-rem',
            lg: 'h-component-lg text-md-rem',
            xl: 'h-component-xl text-md-rem',
            xxl: 'h-component-xxl text-lg-rem',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

export type SizeVariantProps = VariantProps<typeof sizeVariants>;

/**
 * Icon size mapping for each component size
 */
export const iconSizeMap: Record<string, number> = {
    xxs: 12,
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22,
    xxl: 24,
};

/**
 * Padding variants for each component size
 */
export const paddingVariants = cva('', {
    variants: {
        size: {
            xxs: 'px-[var(--spacing-x1)]',
            xs: 'px-[var(--spacing-x1)] py-[var(--spacing-x1)]',
            sm: 'px-[var(--spacing-x2)]',
            md: 'px-[var(--spacing-x2)] py-[var(--spacing-x2)]',
            lg: 'px-[var(--spacing-x3)] py-[var(--spacing-x2)]',
            xl: 'px-[var(--spacing-x4)] py-[var(--spacing-x3)]',
            xxl: 'px-[var(--spacing-x5)] py-[var(--spacing-x4)]',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

export type PaddingVariantProps = VariantProps<typeof paddingVariants>;

/**
 * Get all size-related styles for a component
 */
export function getSizeStyles(size: string = 'md') {
    return {
        height: sizeVariants({ size: size as any }),
        padding: paddingVariants({ size: size as any }),
        iconSize: iconSizeMap[size] || 18,
    };
}
