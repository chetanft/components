"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * ModalBody component props
 * 
 * @public
 */
export interface ModalBodyProps extends ComposableProps<'div'> {
  /**
   * Body content
   */
  children: React.ReactNode;
}

/**
 * ModalBody Component
 * 
 * A composable body section for the modal content.
 * Contains the main content of the modal.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <ModalContent>
 *   <ModalHeader>
 *     <ModalTitle>Title</ModalTitle>
 *   </ModalHeader>
 *   <ModalBody>
 *     <p>Main content goes here</p>
 *   </ModalBody>
 * </ModalContent>
 * ```
 * 
 * @remarks
 * - Provides scrollable content area
 * - Supports `asChild` prop for custom element composition
 * - Use with ModalHeader and ModalFooter for complete modal structure
 */
export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex-1 overflow-y-auto px-[var(--spacing-x6)] py-[var(--spacing-x4)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ModalBody.displayName = 'ModalBody';

