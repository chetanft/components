"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useStepsContext } from './StepsContext';

export interface StepItemProps extends ComposableProps<'div'> {
  /**
   * Step number (1-based)
   */
  value: number;
  /**
   * Step content (typically StepIcon, StepTitle, StepDescription).
   */
  children?: React.ReactNode;
  /**
   * Whether step is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Step status override
   */
  status?: 'wait' | 'process' | 'finish' | 'error';
}

/**
 * StepItem Component
 *
 * A composable component for individual steps.
 * Typically wraps StepIcon, StepTitle, and StepDescription.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Steps currentStep={1}>
 *   <StepsList>
 *     <StepItem value={1}>
 *       <StepIcon />
 *       <StepContent>
 *         <StepTitle>Step 1</StepTitle>
 *         <StepDescription>Description</StepDescription>
 *       </StepContent>
 *     </StepItem>
 *   </StepsList>
 * </Steps>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically determines state based on currentStep and value.
 */
export const StepItem = React.forwardRef<HTMLDivElement, StepItemProps>(
  ({ className, children, value, disabled = false, status, asChild, ...props }, ref) => {
    const { currentStep, direction, device, onChange } = useStepsContext();
    
    const isSelected = value === currentStep;
    const isCompleted = value < currentStep || status === 'finish';
    const isError = status === 'error';
    
    let state: 'selected' | 'unselected' | 'completed' | 'error' = 'unselected';
    if (isError) state = 'error';
    else if (isSelected) state = 'selected';
    else if (isCompleted) state = 'completed';
    
    const handleClick = () => {
      if (!disabled && onChange) {
        onChange(value);
      }
    };
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex-1",
          direction === 'vertical' ? "w-full" : "",
          !disabled && "cursor-pointer",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {React.Children.map(children, (child: any) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { state, device, direction } as any);
          }
          return child;
        })}
      </Comp>
    );
  }
);

StepItem.displayName = 'StepItem';

