"use client";

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ComposableProps } from '../../../lib/slot';

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
  ({ children, asChild, ...props }, ref) => {
    return (
      <DialogPrimitive.Trigger
        ref={ref}
        asChild={asChild}
        {...props}
      >
        {children}
      </DialogPrimitive.Trigger>
    );
  }
);

ModalTrigger.displayName = 'ModalTrigger';
