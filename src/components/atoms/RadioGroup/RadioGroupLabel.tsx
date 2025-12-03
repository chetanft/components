"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface RadioGroupLabelProps extends ComposableProps<'label'> {
  /**
   * The label text for the radio group.
   */
  children: React.ReactNode;
}

/**
 * RadioGroupLabel Component
 *
 * A composable label component for RadioGroup.
 * Provides a label for the entire radio group.
 *
 * @public
 *
 * @example
 * ```tsx
 * <RadioGroup name="choice" value={value} onValueChange={setValue}>
 *   <RadioGroupLabel>Select an option</RadioGroupLabel>
 *   <RadioItem value="option1">
 *     <RadioItemInput />
 *     <RadioItemLabel>Option 1</RadioItemLabel>
 *   </RadioItem>
 * </RadioGroup>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<label>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Accessible: maintains proper label-group association.
 */
export const RadioGroupLabel = React.forwardRef<HTMLLabelElement, RadioGroupLabelProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'label';
    return (
      <Comp
        ref={ref}
        className={cn("block text-sm font-medium text-[var(--primary)] mb-2", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

RadioGroupLabel.displayName = 'RadioGroupLabel';

