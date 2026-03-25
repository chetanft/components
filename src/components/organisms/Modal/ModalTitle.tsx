"use client";

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../../lib/utils';
import type { ComposableProps } from '../../../lib/slot';

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
 * - Automatically receives proper ARIA attributes via Radix
 * - Use within ModalHeader for consistent styling
 */
export const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ children, className, asChild, ...props }, ref) => {
    return (
      <DialogPrimitive.Title
        ref={ref}
        asChild={asChild}
        className={cn(
          "text-[length:var(--font-size-xl-rem)] font-semibold text-[var(--primary)]",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Title>
    );
  }
);

ModalTitle.displayName = 'ModalTitle';
