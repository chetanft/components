"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface TimelineLabelProps extends ComposableProps<'div'> {
  /**
   * Label content.
   */
  children: React.ReactNode;
}

/**
 * TimelineLabel Component
 *
 * A composable component for the label of a timeline item.
 * Typically used within TimelineItem (shown on opposite side in alternate mode).
 *
 * @public
 *
 * @example
 * ```tsx
 * <TimelineItem>
 *   <TimelineDot />
 *   <TimelineContent>Event</TimelineContent>
 *   <TimelineLabel>2024</TimelineLabel>
 * </TimelineItem>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically positioned based on Timeline mode.
 */
export const TimelineLabel = React.forwardRef<HTMLDivElement, TimelineLabelProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    // Cast children to exclude bigint which Slot doesn't accept
    const safeChildren = children as Exclude<React.ReactNode, bigint> | undefined;
    
    return (
      <Comp
        ref={ref}
        className={cn("text-[var(--color-tertiary)] text-sm", className)}
        {...props}
      >
        {safeChildren}
      </Comp>
    );
  }
);

TimelineLabel.displayName = 'TimelineLabel';

