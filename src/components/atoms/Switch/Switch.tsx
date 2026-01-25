"use client";

import React from 'react';
import { SwitchProvider } from './SwitchContext';
import { SwitchWrapper } from './SwitchWrapper';
import { SwitchInput } from './SwitchInput';
import { SwitchLabel } from './SwitchLabel';
import { SwitchHelper } from './SwitchHelper';
import { SwitchError } from './SwitchError';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Switch content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Label text displayed next to switch (for declarative API)
   * @deprecated Use SwitchLabel component instead
   */
  label?: string;
  /**
   * Switch size
   * @default 'md'
   */
  size?: 'sm' | 'md';
  /**
   * Error state (for declarative API)
   * @deprecated Use SwitchError component instead
   */
  error?: boolean;
  /**
   * Helper text (for declarative API)
   * @deprecated Use SwitchHelper component instead
   */
  helperText?: string;
}

/**
 * Switch Component
 * 
 * A versatile toggle switch component with label, validation states, and helper text.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Switch size="md">
 *   <SwitchInput checked={isEnabled} onChange={handleChange} />
 *   <SwitchLabel>Enable notifications</SwitchLabel>
 *   <SwitchHelper>You can change this later</SwitchHelper>
 * </Switch>
 * 
 * // Declarative API (deprecated)
 * <Switch label="Enable notifications" checked={isEnabled} onChange={handleChange} />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (SwitchInput, SwitchLabel, SwitchHelper, etc.) support `asChild`
 * - Supports checked and unchecked states with smooth animations
 * - Automatically generates accessible IDs for labels and error messages
 * - Accessible: includes ARIA attributes and keyboard navigation
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, children, label, size = 'md', disabled, error, helperText, id, ...props }, ref) => {
    // Check if using composable API (has children with Switch sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
      child?.type?.displayName?.startsWith('Switch')
    );
    
    // If using composable API, wrap with context provider
    if (hasComposableChildren) {
      // Show deprecation warning if using old props with composable API
      if (process.env.NODE_ENV !== 'production' && (label || error || helperText)) {
        console.warn(
          'Switch: Using deprecated props (label, error, helperText) with composable API. ' +
          'Please use SwitchInput, SwitchLabel, SwitchHelper, SwitchError components instead. ' +
          'See migration guide: docs/migrations/composable-migration.md'
        );
      }
      
      const generatedId = React.useId();
      const switchId = id ?? `switch-${generatedId}`;
      const helperId = helperText ? `${switchId}-helper` : undefined;
      const errorId = error ? `${switchId}-error` : undefined;
      
      return (
        <SwitchProvider
          value={{
            switchId,
            size,
            disabled,
            hasError: !!error,
            helperId,
            errorId,
          }}
        >
          <SwitchWrapper className={className}>
            {children}
          </SwitchWrapper>
        </SwitchProvider>
      );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'Switch: Declarative API (label, error, helperText props) is deprecated. ' +
        'Please migrate to composable API using SwitchInput, SwitchLabel, SwitchHelper, SwitchError components. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }
    
    const generatedId = React.useId();
    const switchId = id ?? `switch-${generatedId}`;
    const helperId = helperText ? `${switchId}-helper` : undefined;
    const errorId = error ? `${switchId}-error` : undefined;
    return (
      <SwitchProvider
        value={{
          switchId,
          size,
          disabled,
          hasError: !!error,
          helperId,
          errorId,
        }}
      >
        <SwitchWrapper className={className}>
          <SwitchInput
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {label && <SwitchLabel>{label}</SwitchLabel>}
          {error && <SwitchError>Error occurred</SwitchError>}
          {helperText && !error && <SwitchHelper>{helperText}</SwitchHelper>}
        </SwitchWrapper>
      </SwitchProvider>
    );
  }
);

Switch.displayName = 'Switch'; 