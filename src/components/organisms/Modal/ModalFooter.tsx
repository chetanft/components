"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * ModalFooter component props
 * 
 * @public
 */
export interface ModalFooterProps extends ComposableProps<'div'> {
  /**
   * Footer content (typically action buttons)
   */
  children: React.ReactNode;
}

/**
 * ModalFooter Component
 * 
 * A composable footer section for the modal.
 * Typically contains action buttons.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <ModalContent>
 *   <ModalHeader>
 *     <ModalTitle>Confirm</ModalTitle>
 *   </ModalHeader>
 *   <ModalBody>Content</ModalBody>
 *   <ModalFooter>
 *     <Button variant="secondary">Cancel</Button>
 *     <Button variant="primary">Confirm</Button>
 *   </ModalFooter>
 * </ModalContent>
 * ```
 * 
 * @remarks
 * - Provides consistent footer styling
 * - Supports `asChild` prop for custom element composition
 * - Use with Button components for actions
 */
export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center justify-end gap-[var(--spacing-x2)] px-[var(--spacing-x6)] py-[var(--spacing-x4)] border-t border-[var(--border-secondary)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ModalFooter.displayName = 'ModalFooter';

