"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * ModalDescription component props
 * 
 * @public
 */
export interface ModalDescriptionProps extends ComposableProps<'p'> {
  /**
   * Description text
   */
  children: React.ReactNode;
}

/**
 * ModalDescription Component
 * 
 * A composable description component for the modal header.
 * Provides accessible description text for screen readers.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <ModalHeader>
 *   <ModalTitle>Confirm Action</ModalTitle>
 *   <ModalDescription>
 *     This action cannot be undone.
 *   </ModalDescription>
 * </ModalHeader>
 * ```
 * 
 * @remarks
 * - Renders as a paragraph element by default
 * - Supports `asChild` prop for custom element composition
 * - Automatically receives proper ARIA attributes
 * - Use within ModalHeader for consistent styling
 */
export const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    
    return (
      <Comp
        ref={ref}
        id="modal-description"
        className={cn(
          "text-sm text-[var(--tertiary)] mt-[var(--spacing-x1)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ModalDescription.displayName = 'ModalDescription';

