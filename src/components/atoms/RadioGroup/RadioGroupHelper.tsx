"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useRadioGroupContext } from './RadioGroupContext';

export interface RadioGroupHelperProps extends ComposableProps<'p'> {
  /**
   * The helper text content.
   */
  children: React.ReactNode;
}

/**
 * RadioGroupHelper Component
 *
 * A composable component for displaying helper text below a RadioGroup.
 * Provides additional context or instructions for the user.
 *
 * @public
 *
 * @example
 * ```tsx
 * <RadioGroup name="choice" value={value} onValueChange={setValue}>
 *   <RadioGroupLabel>Select an option</RadioGroupLabel>
 *   <RadioItem value="option1">...</RadioItem>
 *   <RadioGroupHelper>Choose the best option for you</RadioGroupHelper>
 * </RadioGroup>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets ID for accessibility.
 * - Styled with helper text color from design system.
 */
export const RadioGroupHelper = React.forwardRef<HTMLParagraphElement, RadioGroupHelperProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { helperId } = useRadioGroupContext();
    const Comp = asChild ? Slot : 'p';
    
    return (
      <Comp
        ref={ref}
        id={helperId}
        className={cn("mt-2 text-sm text-[var(--secondary)]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

RadioGroupHelper.displayName = 'RadioGroupHelper';

