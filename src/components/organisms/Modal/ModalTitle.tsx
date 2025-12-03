"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * ModalTitle component props
 * 
 * @public
 */
export interface ModalTitleProps extends ComposableProps<'h2'> {
  /**
   * Title text
   */
  children: React.ReactNode;
}

/**
 * ModalTitle Component
 * 
 * A composable title component for the modal header.
 * Provides accessible heading semantics.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <ModalHeader>
 *   <ModalTitle>Confirm Action</ModalTitle>
 *   <ModalClose />
 * </ModalHeader>
 * ```
 * 
 * @remarks
 * - Renders as an h2 element by default
 * - Supports `asChild` prop for custom element composition
 * - Automatically receives proper ARIA attributes
 * - Use within ModalHeader for consistent styling
 */
export const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h2';
    
    return (
      <Comp
        ref={ref}
        id="modal-title"
        className={cn(
          "text-xl font-semibold text-[var(--primary)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ModalTitle.displayName = 'ModalTitle';

