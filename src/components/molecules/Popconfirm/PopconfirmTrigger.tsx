"use client";

import React from 'react';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { usePopconfirmContext } from './PopconfirmContext';

export interface PopconfirmTriggerProps extends ComposableProps<'div'> {
  /**
   * Trigger content.
   */
  children: React.ReactNode;
}

/**
 * PopconfirmTrigger Component
 *
 * A composable component for the trigger element of a Popconfirm.
 * Typically wraps a button or clickable element.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Popconfirm title="Are you sure?" onConfirm={handleConfirm}>
 *   <PopconfirmTrigger>
 *     <Button>Delete</Button>
 *   </PopconfirmTrigger>
 *   <PopconfirmContent>
 *     <PopconfirmTitle>Are you sure?</PopconfirmTitle>
 *     <PopconfirmActions />
 *   </PopconfirmContent>
 * </Popconfirm>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles click to open popconfirm.
 */
export const PopconfirmTrigger = React.forwardRef<HTMLDivElement, PopconfirmTriggerProps>(
  ({ className, children, asChild, onClick, ...props }, ref) => {
    const { open: _open, setOpen, disabled } = usePopconfirmContext();
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled) {
        setOpen(true);
      }
      onClick?.(e);
    };
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

PopconfirmTrigger.displayName = 'PopconfirmTrigger';

