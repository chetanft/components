"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useHoverCardContext } from './HoverCardContext';

export interface HoverCardContentProps extends ComposableProps<'div'> {
  /**
   * Content.
   */
  children: React.ReactNode;
}

/**
 * HoverCardContent Component
 *
 * A composable component for the card content of a HoverCard.
 * Typically used within HoverCard.
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
 * - Automatically positioned based on placement.
 */
export const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ className, children, asChild, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const { open, setOpen, placement, width, closeDelay, openTimeoutRef, closeTimeoutRef } = useHoverCardContext();
    
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
        openTimeoutRef.current = null;
      }
      setOpen(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      closeTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, closeDelay);
      onMouseLeave?.(e);
    };
    
    if (!open) return null;
    
    const placementStyles = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "absolute z-50",
          "bg-[var(--color-bg-primary)] rounded-[var(--radius-md)]",
          "border border-[var(--color-border-secondary)]",
          "p-[var(--spacing-x4)]",
          placementStyles[placement],
          className
        )}
        style={{ boxShadow: 'var(--shadow-xl)', width }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

HoverCardContent.displayName = 'HoverCardContent';

