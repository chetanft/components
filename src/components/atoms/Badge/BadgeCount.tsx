"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface BadgeCountProps extends ComposableProps<'span'> {
    /** Count value */
    count?: number;
    /** Max count before showing + suffix */
    overflowCount?: number;
    /** Show zero count */
    showZero?: boolean;
}

/**
 * BadgeCount - Numeric count indicator
 * 
 * Displays a count badge, typically for notifications or item quantities.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Badge>
 *   <BadgeCount count={5} overflowCount={99} />
 * </Badge>
 * 
 * // Shows "99+" when count > 99
 * <BadgeCount count={150} overflowCount={99} />
 * ```
 */
export const BadgeCount = React.forwardRef<HTMLSpanElement, BadgeCountProps>(
    ({ count = 0, overflowCount = 99, showZero = false, children, className, asChild, ...props }, ref) => {
        const Comp = asChild ? Slot : 'span';

        // Don't render if count is 0 and showZero is false
        if (count === 0 && !showZero) {
            return null;
        }

        const displayCount = count > overflowCount ? `${overflowCount}+` : count;

        return (
            <Comp
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center",
                    "min-w-[1.25rem] h-5 px-1.5",
                    "bg-[var(--danger)] text-white",
                    "text-xs font-bold rounded-full",
                    className
                )}
                {...props}
            >
                {children ?? displayCount}
            </Comp>
        );
    }
);

BadgeCount.displayName = 'Badge.Count';
