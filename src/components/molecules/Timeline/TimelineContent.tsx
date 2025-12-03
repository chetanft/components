"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface TimelineContentProps extends ComposableProps<'div'> {
  /**
   * Content.
   */
  children: React.ReactNode;
}

/**
 * TimelineContent Component
 *
 * A composable component for the content of a timeline item.
 * Typically used within TimelineItem.
 *
 * @public
 *
 * @example
 * ```tsx
 * <TimelineItem>
 *   <TimelineDot />
 *   <TimelineContent>
 *     <Typography>Event description</Typography>
 *   </TimelineContent>
 * </TimelineItem>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 */
export const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    // Cast children to exclude bigint which Slot doesn't accept
    const safeChildren = children as Exclude<React.ReactNode, bigint> | undefined;
    
    return (
      <Comp
        ref={ref}
        className={cn("flex-1 min-w-0", className)}
        {...props}
      >
        {safeChildren}
      </Comp>
    );
  }
);

TimelineContent.displayName = 'TimelineContent';

