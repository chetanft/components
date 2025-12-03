"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { Icon } from '../../atoms/Icons';
import { useDrawerContext } from './DrawerContext';

/**
 * DrawerClose component props
 * 
 * @public
 */
export interface DrawerCloseProps extends Omit<ComposableProps<'button'>, 'children'> {
  /**
   * Custom close button content (optional)
   * If not provided, uses default close icon
   */
  children?: React.ReactNode;
}

/**
 * DrawerClose Component
 * 
 * A composable close button for the drawer header.
 * Automatically closes the drawer when clicked.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <DrawerHeader>
 *   <DrawerTitle>Title</DrawerTitle>
 *   <DrawerClose />
 * </DrawerHeader>
 * 
 * // Custom close button
 * <DrawerClose asChild>
 *   <Button variant="ghost" size="sm">Close</Button>
 * </DrawerClose>
 * ```
 * 
 * @remarks
 * - Automatically handles closing the drawer
 * - Supports `asChild` prop to merge with custom button
 * - Uses default close icon if no children provided
 * - Accessible: includes proper ARIA labels
 */
export const DrawerClose = React.forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ className, asChild, children, onClick, ...props }, ref) => {
    const { setOpen } = useDrawerContext();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      onClick?.(e);
    };
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    
    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          "p-[var(--spacing-x1)] rounded-[var(--radius-sm)]",
          "hover:bg-[var(--color-bg-secondary)]",
          "transition-colors duration-[var(--transition-fast)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-neutral)] focus:ring-opacity-20",
          className
        )}
        aria-label="Close drawer"
        {...props}
      >
        {children || (
          <Icon name="cross" size={20} className="text-[var(--color-tertiary)]" />
        )}
      </button>
    );
  }
);

DrawerClose.displayName = 'DrawerClose';

