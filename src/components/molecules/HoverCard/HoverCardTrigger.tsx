"use client";

import React from 'react';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useHoverCardContext } from './HoverCardContext';

export interface HoverCardTriggerProps extends ComposableProps<'div'> {
  /**
   * Trigger content.
   */
  children: React.ReactNode;
}

/**
 * HoverCardTrigger Component
 *
 * A composable component for the trigger element of a HoverCard.
 * Typically wraps a hoverable element.
 *
 * @public
 *
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger>
 *     <Button>Hover me</Button>
 *   </HoverCardTrigger>
 *   <HoverCardContent>
 *     <p>Card content</p>
 *   </HoverCardContent>
 * </HoverCard>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles mouse enter/leave to show/hide card.
 */
export const HoverCardTrigger = React.forwardRef<HTMLDivElement, HoverCardTriggerProps>(
  ({ className, children, asChild, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const { setOpen, openDelay, closeDelay, openTimeoutRef, closeTimeoutRef } = useHoverCardContext();
    
    const handleMouseEnter = () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      openTimeoutRef.current = setTimeout(() => {
        setOpen(true);
      }, openDelay);
      onMouseEnter?.();
    };

    const handleMouseLeave = () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
        openTimeoutRef.current = null;
      }
      closeTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, closeDelay);
      onMouseLeave?.();
    };
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

HoverCardTrigger.displayName = 'HoverCardTrigger';

