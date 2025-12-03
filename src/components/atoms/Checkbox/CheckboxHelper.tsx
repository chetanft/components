"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useCheckboxContext } from './CheckboxContext';

export interface CheckboxHelperProps extends ComposableProps<'p'> {
  /**
   * The helper text content.
   */
  children: React.ReactNode;
}

/**
 * CheckboxHelper Component
 *
 * A composable component for displaying helper text below a Checkbox.
 * Provides additional context or instructions for the user.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Checkbox>
 *   <CheckboxInput />
 *   <CheckboxLabel>Subscribe to newsletter</CheckboxLabel>
 *   <CheckboxHelper>You can unsubscribe at any time</CheckboxHelper>
 * </Checkbox>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<p>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically sets ID for accessibility.
 * - Styled with helper text color from design system.
 */
export const CheckboxHelper = React.forwardRef<HTMLParagraphElement, CheckboxHelperProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { descriptionId, size, disabled: contextDisabled, hasError } = useCheckboxContext();
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
        id={descriptionId}
        className={cn(
          "text-sm leading-relaxed mt-1",
          contextDisabled
            ? "text-[var(--secondary)]"
            : hasError
              ? "text-critical"
              : "text-[var(--secondary)]",
          className
        )}
        style={{ marginLeft, ...props.style }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

CheckboxHelper.displayName = 'CheckboxHelper';

