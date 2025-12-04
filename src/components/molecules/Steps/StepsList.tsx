"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useStepsContext } from './StepsContext';

export interface StepsListProps extends ComposableProps<'div'> {
  /**
   * Steps list content (typically StepItem components).
   */
  children?: React.ReactNode;
}

/**
 * StepsList Component
 *
 * A composable component for the container of step items.
 * Typically wraps StepItem components.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Steps currentStep={1}>
 *   <StepsList>
 *     <StepItem value={1}>...</StepItem>
 *     <StepItem value={2}>...</StepItem>
 *   </StepsList>
 * </Steps>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled based on direction and device from context.
 */
export const StepsList = React.forwardRef<HTMLDivElement, StepsListProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { direction, device } = useStepsContext();
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex",
          direction === 'vertical' ? "flex-col gap-[var(--spacing-x5)]" : "flex-row items-start",
          direction === 'horizontal' && device === "desktop" ? "gap-[var(--spacing-x3)]" : "gap-[var(--spacing-x2)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

StepsList.displayName = 'StepsList';

