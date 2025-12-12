"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export type BadgeStatusType = 'default' | 'success' | 'processing' | 'warning' | 'error';

export interface BadgeStatusProps extends ComposableProps<'span'> {
    /** Status type */
    status?: BadgeStatusType;
    /** Status text */
    text?: React.ReactNode;
}

/**
 * BadgeStatus - Status indicator with optional text
 * 
 * Displays a colored status dot with optional text label.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <BadgeStatus status="success" text="Active" />
 * <BadgeStatus status="processing" text="Loading" />
 * <BadgeStatus status="error" text="Failed" />
 * ```
 */
export const BadgeStatus = React.forwardRef<HTMLSpanElement, BadgeStatusProps>(
    ({ status = 'default', text, children, className, asChild, ...props }, ref) => {
        const Comp = asChild ? Slot : 'span';

        const statusDotClasses = {
            default: 'bg-[var(--neutral)]',
            success: 'bg-[var(--positive)]',
            processing: 'bg-[var(--primary)] animate-pulse',
            warning: 'bg-[var(--warning)]',
            error: 'bg-[var(--danger)]',
        }[status];

        const displayText = text ?? children;

        return (
            <Comp
                ref={ref}
                className={cn("inline-flex items-center gap-2", className)}
                {...props}
            >
                {[
                    <span
                        key="dot"
                        className={cn("w-1.5 h-1.5 rounded-full", statusDotClasses)}
                        aria-hidden="true"
                    />,
                    displayText && (
                        <span key="text" className="text-sm text-[var(--primary)]">
                            {String(displayText)}
                        </span>
                    )
                ] as React.ReactElement[]}
            </Comp>
        );
    }
);

BadgeStatus.displayName = 'Badge.Status';
