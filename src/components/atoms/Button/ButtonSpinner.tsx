"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ButtonSpinnerProps extends ComposableProps<'span'> {
    /** Icon size (defaults to 18) */
    size?: number;
}

/**
 * ButtonSpinner - Loading spinner for Button loading state
 * 
 * Renders an animated spinner icon for indicating loading states.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Button loading>
 *   <ButtonSpinner />
 *   <ButtonText>Saving...</ButtonText>
 * </Button>
 * ```
 * 
 * @remarks
 * - Supports `asChild` for custom spinner elements
 * - Includes aria-label for accessibility
 * - Automatically uses rotating animation
 */
export const ButtonSpinner = React.forwardRef<HTMLSpanElement, ButtonSpinnerProps>(
    ({ size = 18, children, className, asChild, ...props }, ref) => {
        const Comp = asChild ? Slot : 'span';

        const content = (children ?? <Icon name="loading" size={size} />) as React.ReactElement;

        return (
            <Comp
                ref={ref}
                className={cn("inline-flex shrink-0 animate-spin", className)}
                aria-label="Loading"
                {...props}
            >
                {content}
            </Comp>
        );
    }
);

ButtonSpinner.displayName = 'Button.Spinner';
