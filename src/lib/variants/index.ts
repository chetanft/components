/**
 * Shared Variant Definitions
 * 
 * Centralized CVA (class-variance-authority) variants for consistent
 * styling across FT Design System components.
 * 
 * @module lib/variants
 * @example
 * ```tsx
 * import { sizeVariants, inputStateVariants, getSizeStyles } from '@/lib/variants';
 * 
 * // Use in component
 * const className = cn(
 *   sizeVariants({ size: 'md' }),
 *   inputStateVariants({ state: 'error' })
 * );
 * ```
 */

// Size variants
export {
    sizeVariants,
    paddingVariants,
    iconSizeMap,
    getSizeStyles,
    type SizeVariantProps,
    type PaddingVariantProps,
} from './size';

// State variants
export {
    inputStateVariants,
    interactionStateVariants,
    statusVariants,
    severityVariants,
    type InputStateVariantProps,
    type InteractionStateVariantProps,
    type StatusVariantProps,
    type SeverityVariantProps,
} from './state';
