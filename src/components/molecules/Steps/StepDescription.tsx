"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import type { StepState } from './StepsContext';

export interface StepDescriptionProps extends ComposableProps<'div'> {
  /**
   * Description text.
   */
  children: React.ReactNode;
  /**
   * Step state (auto-determined if not provided)
   */
  state?: StepState;
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
 * - Automatically styled based on step state.
 */
export const StepDescription = React.forwardRef<HTMLDivElement, StepDescriptionProps>(
  ({ className, children, state: propState, asChild, ...props }, ref) => {
    const state = propState || 'unselected';
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "font-primary font-normal text-md-rem leading-[1.4] transition-colors",
          state === "selected" || state === "completed"
            ? "text-[var(--primary)]"
            : "text-[var(--tertiary)]",
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

