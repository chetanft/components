/**
 * Dropdown Styles
 * 
 * Centralized CVA variants and size configurations for Dropdown component.
 */

import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentSize } from '../../../lib/utils';

/**
 * Dropdown field variants
 */
export const dropdownFieldVariants = cva(
    "relative w-full border transition-all duration-200 font-sans font-normal bg-surface text-[var(--primary)]",
    {
        variants: {
            size: {
                xxs: "text-xs-rem",
                xs: "text-xs-rem",
                sm: "text-sm-rem",
                md: "text-md-rem",
                lg: "text-md-rem",
                xl: "text-md-rem",
                xxl: "text-lg-rem",
            },
            state: {
                default: "border-[var(--border-primary)] dark:border-border-dark hover:border-[var(--primary)] dark:hover:border-[var(--primary)] focus-within:border-primary dark:focus-within:border-primary-dark",
                error: "border-critical focus-within:border-critical",
                disabled: "bg-surface-alt dark:bg-surface-alt-dark border-border-disabled dark:border-border-disabled-dark text-input-disabled dark:text-input-disabled-dark cursor-not-allowed",
            },
            type: {
                normal: "",
                search: "",
                groups: "",
            },
        },
        defaultVariants: {
            size: "md",
            state: "default",
            type: "normal",
        },
    }
);

export type DropdownFieldVariantProps = VariantProps<typeof dropdownFieldVariants>;

/**
 * Size styles configuration
 */
interface SizeStyles {
    height: string;
    fontSize: string;
    borderRadius: string;
    padding: string;
    iconSize: number;
}

/**
 * Size styles map for all component sizes
 */
export const sizeStylesMap: Record<ComponentSize, SizeStyles> = {
    xxs: {
        height: "h-component-xxs",
        fontSize: "text-xs-rem",
        borderRadius: "rounded-lg",
        padding: "px-[var(--spacing-x1)]",
        iconSize: 12,
    },
    xs: {
        height: "h-component-xs",
        fontSize: "text-xs-rem",
        borderRadius: "rounded-lg",
        padding: "px-[var(--spacing-x1)] py-[var(--spacing-x1)]",
        iconSize: 14,
    },
    sm: {
        height: "h-component-sm",
        fontSize: "text-sm-rem",
        borderRadius: "rounded-lg",
        padding: "px-[var(--spacing-x2)]",
        iconSize: 16,
    },
    md: {
        height: "h-component-md",
        fontSize: "text-md-rem",
        borderRadius: "rounded-lg",
        padding: "px-[var(--spacing-x2)] py-[var(--spacing-x2)]",
        iconSize: 18,
    },
    lg: {
        height: "h-component-lg",
        fontSize: "text-md-rem",
        borderRadius: "rounded-lg",
        padding: "px-[var(--spacing-x3)] py-[var(--spacing-x2)]",
        iconSize: 20,
    },
    xl: {
        height: "h-component-xl",
        fontSize: "text-md-rem",
        borderRadius: "rounded-lg",
        padding: "px-[var(--spacing-x4)] py-[var(--spacing-x3)]",
        iconSize: 22,
    },
    xxl: {
        height: "h-component-xxl",
        fontSize: "text-lg-rem",
        borderRadius: "rounded-lg",
        padding: "px-[var(--spacing-x5)] py-[var(--spacing-x4)]",
        iconSize: 24,
    },
};

/**
 * Get size styles for a given size
 */
export function getDropdownSizeStyles(size: ComponentSize = 'md'): SizeStyles {
    return sizeStylesMap[size];
}
