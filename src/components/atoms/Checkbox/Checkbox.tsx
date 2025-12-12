"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../Icons';
import { CheckboxProvider } from './CheckboxContext';
import { CheckboxWrapper } from './CheckboxWrapper';
import { CheckboxInput } from './CheckboxInput';
import { CheckboxLabel } from './CheckboxLabel';
import { CheckboxHelper } from './CheckboxHelper';
import { CheckboxError } from './CheckboxError';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Checkbox content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Label text displayed next to checkbox (for declarative API)
   * @deprecated Use CheckboxLabel component instead
   */
  label?: string;
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
  /**
   * Error state (for declarative API)
   * @deprecated Use CheckboxError component instead
   */
  error?: boolean;
  /**
   * Description/helper text (for declarative API)
   * @deprecated Use CheckboxHelper component instead
   */
  description?: string;
}

/**
 * Checkbox Component
 * 
 * A versatile checkbox component with label, validation states, and helper text.
 * Supports both composable API (recommended) and declarative API (deprecated).
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
 * // Declarative API (deprecated)
 * <Checkbox label="Accept terms" checked={isChecked} onChange={handleChange} />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (CheckboxInput, CheckboxLabel, CheckboxHelper, etc.) support `asChild`
 * - Supports checked, unchecked, and indeterminate states
 * - Automatically generates accessible IDs for labels and descriptions
 * - Accessible: includes ARIA attributes and keyboard navigation
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    className,
    children,
    label,
    indeterminate,
    size = 'md',
    disabled,
    error,
    description,
    id,
    'aria-describedby': ariaDescribedBy,
    ...props
  }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? `checkbox-${generatedId}`;
    const descriptionId = description ? `${checkboxId}-description` : undefined;
    
    // Determine if using legacy declarative API (has label/error/description props but no children,
    // or children are plain text/elements, not Checkbox sub-components)
    // Note: We no longer rely on displayName detection as it's unreliable in bundled code.
    // Instead, we check for the presence of legacy props.
    const hasLegacyProps = !!(label || error || description);
    const hasChildren = React.Children.count(children) > 0;
    
    // If has children, treat as composable API (children could be CheckboxInput, CheckboxLabel, etc.)
    // The sub-components will work correctly because we always provide context.
    // If they're not Checkbox sub-components, they'll still render (just as regular children).
    if (hasChildren && !hasLegacyProps) {
      return (
        <CheckboxProvider
          value={{
            checkboxId,
            size,
            disabled,
            hasError: !!error,
            descriptionId,
          }}
        >
          <CheckboxWrapper className={className}>
            {children}
          </CheckboxWrapper>
        </CheckboxProvider>
      );
    }
    
    // Legacy declarative API - create the internal structure
    // This handles: <Checkbox label="Text" /> or <Checkbox>Text</Checkbox> patterns
    return (
      <CheckboxProvider
        value={{
          checkboxId,
          size,
          disabled,
          hasError: !!error,
          descriptionId,
        }}
      >
        <CheckboxWrapper className={className}>
          <CheckboxInput
            ref={ref}
            indeterminate={indeterminate}
            disabled={disabled}
            aria-describedby={ariaDescribedBy}
            {...props}
          />
          {children ? (
            <CheckboxLabel>{children}</CheckboxLabel>
          ) : label ? (
            <CheckboxLabel>{label}</CheckboxLabel>
          ) : null}
          {error && <CheckboxError>Error occurred</CheckboxError>}
          {description && !error && <CheckboxHelper>{description}</CheckboxHelper>}
        </CheckboxWrapper>
      </CheckboxProvider>
    );
  }
);

Checkbox.displayName = 'Checkbox'; 
