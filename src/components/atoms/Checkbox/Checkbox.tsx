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
    // Check if using composable API (has children with Checkbox sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
      child?.type?.displayName?.startsWith('Checkbox')
    );
    
    // If using composable API, wrap with context provider
    if (hasComposableChildren) {
      // Show deprecation warning if using old props with composable API
      if (process.env.NODE_ENV !== 'production' && (label || error || description)) {
        console.warn(
          'Checkbox: Using deprecated props (label, error, description) with composable API. ' +
          'Please use CheckboxInput, CheckboxLabel, CheckboxHelper, CheckboxError components instead. ' +
          'See migration guide: docs/migrations/composable-migration.md'
        );
      }
      
      const generatedId = React.useId();
      const checkboxId = id ?? `checkbox-${generatedId}`;
      const descriptionId = description ? `${checkboxId}-description` : undefined;
      
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
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'Checkbox: Declarative API (label, error, description props) is deprecated. ' +
        'Please migrate to composable API using CheckboxInput, CheckboxLabel, CheckboxHelper, CheckboxError components. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }
    
    const generatedId = React.useId();
    const checkboxId = id ?? `checkbox-${generatedId}`;
    const descriptionId = description ? `${checkboxId}-description` : undefined;
    
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
