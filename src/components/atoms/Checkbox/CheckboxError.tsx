"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useCheckboxContext } from './CheckboxContext';

export interface CheckboxErrorProps extends ComposableProps<'p'> {
  /**
   * The error message content.
   */
  children: React.ReactNode;
}

/**
 * CheckboxError Component
 *
 * A composable component for displaying error messages below a Checkbox.
 * Automatically applies error styling and accessibility attributes.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Checkbox>
 *   <CheckboxInput />
 *   <CheckboxLabel>Accept terms</CheckboxLabel>
 *   <CheckboxError>You must accept the terms</CheckboxError>
 * </Checkbox>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets ID and role for accessibility.
 * - Styled with error color from design system.
 */
export const CheckboxError = React.forwardRef<HTMLParagraphElement, CheckboxErrorProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { size } = useCheckboxContext();
    const Comp = asChild ? Slot : 'p';
    
    const sizeConfig = {
      sm: { checkboxWidth: "var(--spacing-x4)", gap: "var(--spacing-x2)", text: "text-sm-rem" },
      md: { checkboxWidth: "var(--spacing-x5)", gap: "var(--spacing-x2-5)", text: "text-sm-rem" }
    };

    const currentSize = sizeConfig[size];
    const marginLeft = `calc(${currentSize.checkboxWidth} + ${currentSize.gap})`;
    
    return (
      <Comp
        ref={ref}
        role="alert"
        className={cn("basis-full w-full leading-relaxed mt-[var(--spacing-x1)] text-critical", currentSize.text, className)}
        style={{ marginLeft, ...props.style }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CheckboxError.displayName = 'CheckboxError';
