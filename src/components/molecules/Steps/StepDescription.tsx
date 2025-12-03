"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface StepDescriptionProps extends ComposableProps<'div'> {
  /**
   * Description text.
   */
  children: React.ReactNode;
}

/**
 * StepDescription Component
 *
 * A composable component for step descriptions.
 * Typically used within StepContent.
 *
 * @public
 *
 * @example
 * ```tsx
 * <StepContent>
 *   <StepTitle>Step 1</StepTitle>
 *   <StepDescription>Description text</StepDescription>
 * </StepContent>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Uses secondary text styling.
 */
export const StepDescription = React.forwardRef<HTMLDivElement, StepDescriptionProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "text-xs text-[var(--text-tertiary)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

StepDescription.displayName = 'StepDescription';

