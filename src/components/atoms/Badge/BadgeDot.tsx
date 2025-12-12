"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface BadgeDotProps extends Omit<ComposableProps<'span'>, 'children'> {
    /** Dot color variant */
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    /** Animate the dot (pulsing) */
    pulse?: boolean;
    /** Children are not supported for BadgeDot */
    children?: never;
}

/**
 * BadgeDot - Simple dot indicator
 * 
 * Renders a small circular dot for notification or status indication.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Badge>
 *   <BadgeDot color="danger" pulse />
 *   <BadgeText>New</BadgeText>
 * </Badge>
 * ```
 */
export const BadgeDot = React.forwardRef<HTMLSpanElement, BadgeDotProps>(
    ({ color = 'default', pulse = false, className, asChild, ...props }, ref) => {
        const Comp = asChild ? Slot : 'span';

        const colorClasses = {
            default: 'bg-[var(--neutral)]',
            primary: 'bg-[var(--primary)]',
            success: 'bg-[var(--positive)]',
            warning: 'bg-[var(--warning)]',
            danger: 'bg-[var(--danger)]',
        }[color];

        return (
            <Comp
                ref={ref}
                className={cn(
                    "inline-block w-2 h-2 rounded-full",
                    colorClasses,
                    pulse && "animate-pulse",
                    className
                )}
                aria-hidden="true"
                {...props}
            />
        );
    }
);

BadgeDot.displayName = 'Badge.Dot';
