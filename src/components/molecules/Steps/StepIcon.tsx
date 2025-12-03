"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useStepsContext } from './StepsContext';
import type { StepState, StepDirection, StepType } from './StepsContext';

export interface StepIconProps extends ComposableProps<'div'> {
  /**
   * Step state (auto-determined if not provided)
   */
  state?: StepState;
  /**
   * Step type override
   */
  type?: StepType;
}

/**
 * StepIcon Component
 *
 * A composable component for step icons/indicators.
 * Typically used within StepItem.
 *
 * @public
 *
 * @example
 * ```tsx
 * <StepItem value={1}>
 *   <StepIcon />
 *   <StepContent>
 *     <StepTitle>Step 1</StepTitle>
 *   </StepContent>
 * </StepItem>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled based on step state and type.
 */
export const StepIcon = React.forwardRef<HTMLDivElement, StepIconProps>(
  ({ className, state: propState, type: propType, asChild, ...props }, ref) => {
    const { type: contextType, direction } = useStepsContext();
    const type = propType || contextType;
    
    // For dot type, render dot indicator
    if (type === 'dot') {
      const state = propState || 'unselected';
      const Comp = asChild ? Slot : 'div';
      return (
        <Comp
          ref={ref}
          className={cn("relative flex items-center justify-center", className)}
          {...props}
        >
          <div className={cn(
            "rounded-full transition-all duration-300",
            state === 'selected' ? "w-2.5 h-2.5 bg-[var(--primary)]" : "w-2 h-2 bg-[var(--border-secondary)]",
            state === 'completed' && "bg-[var(--primary)]"
          )} />
        </Comp>
      );
    }
    
    // For default type, render progress bar
    const state = propState || 'unselected';
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "rounded-[var(--radius-md)] transition-colors",
          direction === 'vertical' ? "w-1 h-full min-h-[32px]" : "w-full h-2",
          state === "selected" || state === "completed"
            ? "bg-[var(--primary)]"
            : "bg-[var(--border-secondary)]",
          className
        )}
        {...props}
      />
    );
  }
);

StepIcon.displayName = 'StepIcon';

