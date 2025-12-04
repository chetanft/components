"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useStepsContext } from './StepsContext';
import type { StepState, StepDevice } from './StepsContext';

export interface StepContentProps extends ComposableProps<'div'> {
  /**
   * Step content (typically StepTitle and StepDescription).
   */
  children?: React.ReactNode;
  /**
   * Step state (passed from StepItem)
   */
  state?: StepState;
  /**
   * Device type (passed from StepItem)
   */
  device?: StepDevice;
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
 * - Forwards state and device props to children.
 */
export const StepContent = React.forwardRef<HTMLDivElement, StepContentProps>(
  ({ className, children, asChild, state, device, ...props }, ref) => {
    const { direction, type } = useStepsContext();
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex flex-col gap-[var(--spacing-x2)]",
          direction === 'horizontal' && type === 'dot' && "self-center",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child: any) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { state, device } as any);
          }
          return child;
        })}
      </Comp>
    );
  }
);

StepContent.displayName = 'StepContent';

