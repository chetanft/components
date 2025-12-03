"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useStepsContext } from './StepsContext';
import type { StepState, StepDevice } from './StepsContext';

export interface StepTitleProps extends ComposableProps<'div'> {
  /**
   * Title text.
   */
  children: React.ReactNode;
  /**
   * Step state (auto-determined if not provided)
   */
  state?: StepState;
}

/**
 * StepTitle Component
 *
 * A composable component for step titles.
 * Typically used within StepContent.
 *
 * @public
 *
 * @example
 * ```tsx
 * <StepContent>
 *   <StepTitle>Step 1</StepTitle>
 *   <StepDescription>Description</StepDescription>
 * </StepContent>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled based on step state.
 */
export const StepTitle = React.forwardRef<HTMLDivElement, StepTitleProps>(
  ({ className, children, state: propState, asChild, ...props }, ref) => {
    const { device } = useStepsContext();
    const state = propState || 'unselected';
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "font-primary font-semibold text-lg-rem leading-[1.4] transition-colors",
          state === "selected" || state === "completed"
            ? "text-[var(--primary)]"
            : "text-[var(--border-primary)]",
          device === "mobile" && "sr-only",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

StepTitle.displayName = 'StepTitle';

