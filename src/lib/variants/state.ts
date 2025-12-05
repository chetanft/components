/**
 * Shared State Variants
 * 
 * Common state configurations used across form components.
 * Uses FT Design System color tokens for consistent theming.
 */

import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Input/form field state variants
 */
export const inputStateVariants = cva('', {
    variants: {
        state: {
            default: 'border-[var(--border-primary)] hover:border-[var(--primary)] focus-within:border-[var(--primary)]',
            error: 'border-[var(--danger)] focus-within:border-[var(--danger)]',
            success: 'border-[var(--positive)] focus-within:border-[var(--positive)]',
            warning: 'border-[var(--warning)] focus-within:border-[var(--warning)]',
            disabled: 'border-[var(--border-disabled)] bg-[var(--bg-disabled)] text-[var(--text-disabled)] cursor-not-allowed',
        },
    },
    defaultVariants: {
        state: 'default',
    },
});

export type InputStateVariantProps = VariantProps<typeof inputStateVariants>;

/**
 * Component interaction states (for buttons, cards, etc.)
 */
export const interactionStateVariants = cva('', {
    variants: {
        state: {
            default: '',
            hover: 'hover:bg-[var(--bg-hover)]',
            active: 'bg-[var(--bg-active)]',
            focus: 'ring-2 ring-[var(--primary)] ring-opacity-50',
            disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
            loading: 'cursor-wait',
        },
    },
    defaultVariants: {
        state: 'default',
    },
});

export type InteractionStateVariantProps = VariantProps<typeof interactionStateVariants>;

/**
 * Status indicator variants (for badges, dots, etc.)
 */
export const statusVariants = cva('', {
    variants: {
        status: {
            default: 'bg-[var(--neutral)]',
            info: 'bg-[var(--informational)]',
            success: 'bg-[var(--positive)]',
            warning: 'bg-[var(--warning)]',
            error: 'bg-[var(--danger)]',
            processing: 'bg-[var(--primary)] animate-pulse',
        },
    },
    defaultVariants: {
        status: 'default',
    },
});

export type StatusVariantProps = VariantProps<typeof statusVariants>;

/**
 * Alert/notification severity variants
 */
export const severityVariants = cva('', {
    variants: {
        severity: {
            info: 'bg-[var(--neutral-light)] border-[var(--neutral)] text-[var(--neutral-dark)]',
            success: 'bg-[var(--positive-light)] border-[var(--positive)] text-[var(--positive-dark)]',
            warning: 'bg-[var(--warning-light)] border-[var(--warning)] text-[var(--warning-dark)]',
            error: 'bg-[var(--danger-100)] border-[var(--danger-500)] text-[var(--danger-500)]',
        },
    },
    defaultVariants: {
        severity: 'info',
    },
});

export type SeverityVariantProps = VariantProps<typeof severityVariants>;
