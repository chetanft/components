"use client";

import React from 'react';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useModalContext } from './ModalContext';

/**
 * ModalTrigger component props
 * 
 * @public
 */
export interface ModalTriggerProps extends ComposableProps<'button'> {
  /**
   * Trigger content
   */
  children: React.ReactNode;
}

/**
 * ModalTrigger Component
 * 
 * A composable trigger button that opens the modal when clicked.
 * Must be used within a Modal component.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Modal>
 *   <ModalTrigger>
 *     <Button>Open Modal</Button>
 *   </ModalTrigger>
 *   <ModalContent>
 *     // modal content
 *   </ModalContent>
 * </Modal>
 * ```
 * 
 * @remarks
 * - Automatically handles opening the modal on click
 * - Supports `asChild` prop to merge props with child element
 * - Use with Button or any clickable element
 */
export const ModalTrigger = React.forwardRef<HTMLButtonElement, ModalTriggerProps>(
  ({ children, asChild, onClick, ...props }, ref) => {
    const { setOpen } = useModalContext();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(true);
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
        {...props}
      >
        {children}
      </button>
    );
  }
);

ModalTrigger.displayName = 'ModalTrigger';

