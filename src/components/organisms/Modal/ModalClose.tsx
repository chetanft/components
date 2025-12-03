"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { Icon } from '../../atoms/Icons';
import { useModalContext } from './ModalContext';

/**
 * ModalClose component props
 * 
 * @public
 */
export interface ModalCloseProps extends Omit<ComposableProps<'button'>, 'children'> {
  /**
   * Custom close button content (optional)
   * If not provided, uses default close icon
   */
  children?: React.ReactNode;
}

/**
 * ModalClose Component
 * 
 * A composable close button for the modal header.
 * Automatically closes the modal when clicked.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <ModalHeader>
 *   <ModalTitle>Title</ModalTitle>
 *   <ModalClose />
 * </ModalHeader>
 * 
 * // Custom close button
 * <ModalClose asChild>
 *   <Button variant="ghost" size="sm">Close</Button>
 * </ModalClose>
 * ```
 * 
 * @remarks
 * - Automatically handles closing the modal
 * - Supports `asChild` prop to merge with custom button
 * - Uses default close icon if no children provided
 * - Accessible: includes proper ARIA labels
 */
export const ModalClose = React.forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ className, asChild, children, onClick, ...props }, ref) => {
    const { setOpen } = useModalContext();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
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
          "rounded-[var(--radius-sm)]",
          "flex items-center justify-center",
          "transition-colors duration-[var(--transition-fast)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--neutral)] focus:ring-offset-2",
          "cursor-pointer",
          "relative z-50",
          "w-[var(--spacing-x7)] h-[var(--spacing-x7)] p-0 m-0",
          "hover:bg-[var(--bg-secondary)]",
          className
        )}
        aria-label="Close modal"
        {...props}
      >
        {children || (
          <Icon
            name="cross"
            size="md"
            className="text-[var(--tertiary)] pointer-events-none flex items-center justify-center m-0 p-0"
          />
        )}
      </button>
    );
  }
);

ModalClose.displayName = 'ModalClose';

