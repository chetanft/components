"use client";

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../../lib/utils';
import type { ComposableProps } from '../../../lib/slot';

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
 * - Automatically receives proper ARIA attributes via Radix
 * - Use within ModalHeader for consistent styling
 */
export const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ children, className, asChild, ...props }, ref) => {
    return (
      <DialogPrimitive.Description
        ref={ref}
        asChild={asChild}
        className={cn(
          "text-[length:var(--font-size-sm-rem)] text-[var(--tertiary)] mt-[var(--spacing-x1)]",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Description>
    );
  }
);

ModalDescription.displayName = 'ModalDescription';
