"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useCheckboxContext } from './CheckboxContext';

export interface CheckboxLabelProps extends ComposableProps<'span'> {
  /**
   * The label text.
   */
  children: React.ReactNode;
}

/**
 * CheckboxLabel Component
 *
 * A composable label component for Checkbox inputs.
 * Automatically associates with the checkbox for accessibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Checkbox>
 *   <CheckboxInput />
 *   <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
 * </Checkbox>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<span>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled based on checkbox state and context.
 * - Accessible: maintains proper label-checkbox association.
 */
export const CheckboxLabel = React.forwardRef<HTMLSpanElement, CheckboxLabelProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { size, disabled: contextDisabled, hasError } = useCheckboxContext();
    
    const sizeConfig = {
      sm: { text: "text-sm" },
      md: { text: "text-base" }
    };

    const currentSize = sizeConfig[size];
    
    const labelStyles = cn(
      "font-medium leading-relaxed cursor-pointer select-none",
      currentSize.text,
      contextDisabled
        ? "text-[var(--secondary)] cursor-not-allowed"
        : hasError
          ? "text-critical"
          : "text-[var(--primary)]"
    );

    const Comp = asChild ? Slot : 'span';
    
    return (
      <Comp
        ref={ref}
        className={cn(labelStyles, className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CheckboxLabel.displayName = 'CheckboxLabel';

