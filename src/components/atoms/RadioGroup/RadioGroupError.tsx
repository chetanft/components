"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useRadioGroupContext } from './RadioGroupContext';

export interface RadioGroupErrorProps extends ComposableProps<'p'> {
  /**
   * The error message content.
   */
  children: React.ReactNode;
}

/**
 * RadioGroupError Component
 *
 * A composable component for displaying error messages below a RadioGroup.
 * Automatically applies error styling and accessibility attributes.
 *
 * @public
 *
 * @example
 * ```tsx
 * <RadioGroup name="choice" value={value} onValueChange={setValue}>
 *   <RadioGroupLabel>Select an option</RadioGroupLabel>
 *   <RadioItem value="option1">...</RadioItem>
 *   <RadioGroupError>Please select an option</RadioGroupError>
 * </RadioGroup>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets ID and role for accessibility.
 * - Styled with error color from design system.
 */
export const RadioGroupError = React.forwardRef<HTMLParagraphElement, RadioGroupErrorProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { errorId } = useRadioGroupContext();
    const Comp = asChild ? Slot : 'p';
    
    return (
      <Comp
        ref={ref}
        id={errorId}
        role="alert"
        className={cn("mt-2 text-sm text-critical", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

RadioGroupError.displayName = 'RadioGroupError';

