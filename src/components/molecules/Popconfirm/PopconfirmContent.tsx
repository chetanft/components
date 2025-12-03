"use client";

import React, { useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { usePopconfirmContext } from './PopconfirmContext';

export interface PopconfirmContentProps extends ComposableProps<'div'> {
  /**
   * Content (typically PopconfirmTitle, PopconfirmDescription, PopconfirmActions).
   */
  children: React.ReactNode;
}

/**
 * PopconfirmContent Component
 *
 * A composable component for the popconfirm popup content.
 * Typically wraps PopconfirmTitle, PopconfirmDescription, and PopconfirmActions.
 *
 * @public
 *
 * @example
 * ```tsx
 * <PopconfirmContent>
 *   <PopconfirmTitle>Are you sure?</PopconfirmTitle>
 *   <PopconfirmDescription>This action cannot be undone.</PopconfirmDescription>
 *   <PopconfirmActions />
 * </PopconfirmContent>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles positioning and click-outside closing.
 */
export const PopconfirmContent = React.forwardRef<HTMLDivElement, PopconfirmContentProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { open, setOpen, placement, containerRef } = usePopconfirmContext();
    
    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      if (open) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [open, setOpen, containerRef]);
    
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
          "absolute z-50 min-w-[200px] max-w-[300px]",
          "bg-[var(--color-bg-primary)] rounded-[var(--radius-md)]",
          "border border-[var(--color-border-secondary)]",
          "p-[var(--spacing-x4)]",
          placementStyles[placement],
          className
        )}
        style={{ boxShadow: 'var(--shadow-lg)' }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

PopconfirmContent.displayName = 'PopconfirmContent';

