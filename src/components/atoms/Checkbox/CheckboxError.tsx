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
      sm: { checkbox: "w-4", gap: "gap-2" },
      md: { checkbox: "w-5", gap: "gap-2.5" }
    };

    const currentSize = sizeConfig[size];
    const marginLeft = `calc(${currentSize.checkbox.replace('w-', '')} * 0.25rem + ${currentSize.gap.replace('gap-', '').replace('[', '').replace(']', '')} * 0.25rem)`;
    
    return (
      <Comp
        ref={ref}
        role="alert"
        className={cn("text-sm leading-relaxed mt-1 text-critical", className)}
        style={{ marginLeft, ...props.style }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CheckboxError.displayName = 'CheckboxError';

