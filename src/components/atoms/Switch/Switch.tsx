"use client";

import React from 'react';
import { SwitchProvider } from './SwitchContext';
import { SwitchWrapper } from './SwitchWrapper';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Switch content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Switch size
   * @default 'md'
   */
  size?: 'sm' | 'md';
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
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (SwitchInput, SwitchLabel, SwitchHelper, etc.) support `asChild`
 * - Supports checked and unchecked states with smooth animations
 * - Automatically generates accessible IDs for labels and error messages
 * - Accessible: includes ARIA attributes and keyboard navigation
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, children, size = 'md', disabled, id, ...props }, ref) => {
    const generatedId = React.useId();
    const switchId = id ?? `switch-${generatedId}`;

    return (
      <SwitchProvider
        value={{
          switchId,
          size,
          disabled,
          hasError: false,
          helperId: undefined,
          errorId: undefined,
        }}
      >
        <SwitchWrapper className={className}>
          {children}
        </SwitchWrapper>
      </SwitchProvider>
    );
  }
);

Switch.displayName = 'Switch'; 