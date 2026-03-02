"use client";

import React from 'react';
import { CheckboxProvider } from './CheckboxContext';
import { CheckboxWrapper } from './CheckboxWrapper';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Checkbox content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Indeterminate state (shows minus icon instead of check)
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Checkbox size
   * @default 'md'
   */
  size?: 'sm' | 'md';
}

/**
 * Checkbox Component
 * 
 * A versatile checkbox component with label, validation states, and helper text.
 * Uses composable API with CheckboxInput, CheckboxLabel, CheckboxHelper, and CheckboxError sub-components.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Checkbox size="md">
 *   <CheckboxInput checked={isChecked} onChange={handleChange} indeterminate={isIndeterminate} />
 *   <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
 *   <CheckboxHelper>You can change this later</CheckboxHelper>
 * </Checkbox>
 * 
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (CheckboxInput, CheckboxLabel, CheckboxHelper, etc.) support `asChild`
 * - Supports checked, unchecked, and indeterminate states
 * - Automatically generates accessible IDs for labels and descriptions
 * - Accessible: includes ARIA attributes and keyboard navigation
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    className,
    children,
    indeterminate,
    size = 'md',
    disabled,
    id,
    'aria-describedby': ariaDescribedBy,
    ...props
  }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? `checkbox-${generatedId}`;

    return (
      <CheckboxProvider
        value={{
          checkboxId,
          size,
          disabled,
          hasError: false,
          descriptionId: undefined,
        }}
      >
        <CheckboxWrapper className={className}>
          {children}
        </CheckboxWrapper>
      </CheckboxProvider>
    );
  }
);

Checkbox.displayName = 'Checkbox'; 
