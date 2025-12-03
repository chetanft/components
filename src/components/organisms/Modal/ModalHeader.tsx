"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * ModalHeader component props
 * 
 * @public
 */
export interface ModalHeaderProps extends ComposableProps<'div'> {
  /**
   * Header content (typically ModalTitle and ModalDescription)
   */
  children: React.ReactNode;
}

/**
 * ModalHeader Component
 * 
 * A composable header section for the modal.
 * Typically contains ModalTitle and ModalDescription.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <ModalContent>
 *   <ModalHeader>
 *     <ModalTitle>Confirm Action</ModalTitle>
 *     <ModalDescription>
 *       Are you sure you want to proceed?
 *     </ModalDescription>
 *   </ModalHeader>
 *   <ModalBody>Content</ModalBody>
 * </ModalContent>
 * ```
 * 
 * @remarks
 * - Wraps header content with consistent styling
 * - Supports `asChild` prop for custom element composition
 * - Use with ModalTitle and ModalDescription for best results
 */
export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center justify-between px-[var(--spacing-x6)] py-[var(--spacing-x4)] border-b border-[var(--border-secondary)]",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

