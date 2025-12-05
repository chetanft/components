"use client";

import React from 'react';
import { cn } from '../../../../lib/utils';
import { Slot, type ComposableProps } from '../../../../lib/slot';
import { useCardContext } from '../Card.context';

export interface CardMetaProps extends ComposableProps<'div'> {
    /** Avatar element */
    avatar?: React.ReactNode;
}

/**
 * CardMeta - Container for avatar + title + description layout
 * 
 * Provides a standard layout for displaying user/item information
 * with an avatar on the left and text content on the right.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Card>
 *   <CardBody>
 *     <CardMeta avatar={<Avatar src="/user.jpg" />}>
 *       <CardTitle>John Doe</CardTitle>
 *       <CardDescription>Software Engineer</CardDescription>
 *     </CardMeta>
 *   </CardBody>
 * </Card>
 * ```
 * 
 * @remarks
 * - Supports `asChild` for custom wrapper elements
 * - Avatar slot is optional
 * - Text content is typically CardTitle + CardDescription
 */
export const CardMeta = React.forwardRef<HTMLDivElement, CardMetaProps>(
    ({ avatar, children, className, asChild, ...props }, ref) => {
        const Comp = asChild ? Slot : 'div';

        return (
            <Comp
                ref={ref}
                className={cn("flex gap-[var(--spacing-x4)] items-start", className)}
                {...props}
            >
                {avatar && <div className="shrink-0">{avatar}</div>}
                <div className="flex flex-col gap-[var(--spacing-x1)] flex-1 min-w-0">
                    {children}
                </div>
            </Comp>
        );
    }
);

CardMeta.displayName = 'CardMeta';
