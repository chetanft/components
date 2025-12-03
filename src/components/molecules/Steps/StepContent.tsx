"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface StepContentProps extends ComposableProps<'div'> {
  /**
   * Step content (typically StepTitle and StepDescription).
   */
  children?: React.ReactNode;
}

/**
 * StepContent Component
 *
 * A composable component for the content area of a step.
 * Typically wraps StepTitle and StepDescription.
 *
 * @public
 *
 * @example
 * ```tsx
 * <StepItem value={1}>
 *   <StepIcon />
 *   <StepContent>
 *     <StepTitle>Step 1</StepTitle>
 *     <StepDescription>Description</StepDescription>
 *   </StepContent>
 * </StepItem>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with flex layout.
 */
export const StepContent = React.forwardRef<HTMLDivElement, StepContentProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex flex-col",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

StepContent.displayName = 'StepContent';

