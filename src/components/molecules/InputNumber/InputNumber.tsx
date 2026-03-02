"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { type ComponentSize } from '../../../lib/utils';
import type { ComposableProps } from '../../../lib/slot';
import { InputNumberProvider } from './InputNumberContext';

export interface InputNumberProps extends Omit<ComposableProps<'div'>, 'onChange' | 'size' | 'prefix'> {
  /**
   * Current value (controlled)
   */
  value?: number | null;
  /**
   * Default value (uncontrolled)
   * @default 0
   */
  defaultValue?: number;
  /**
   * Minimum value
   * @default -Infinity
   */
  min?: number;
  /**
   * Maximum value
   * @default Infinity
   */
  max?: number;
  /**
   * Step for increment/decrement
   * @default 1
   */
  step?: number;
  /**
   * Decimal precision
   */
  precision?: number;
  /**
   * Component size
   * @default 'md'
   */
  size?: ComponentSize;
  /**
   * Whether to show controls
   * @default true
   */
  controls?: boolean;
  /**
   * Controls position
   * @default 'right'
   */
  controlsPosition?: 'right' | 'both';
  /**
   * Error state
   * @default false
   */
  error?: boolean;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  /**
   * Change handler
   */
  onChange?: (value: number | null) => void;
  /**
   * Formatter for display
   */
  formatter?: (value: number | undefined) => string;
  /**
   * Parser from string to number
   */
  parser?: (displayValue: string) => number;
  /**
   * InputNumber content (for composable API)
   */
  children?: React.ReactNode;
}

/**
 * InputNumber Component
 * 
 * A numeric input component with increment/decrement controls.
 * Supports composable API with sub-components for flexible numeric input composition.
 *
 * @public
 *
 * @example
 * ```tsx
 * <InputNumber value={10} min={0} max={100} step={1}>
 *   <InputNumberWrapper>
 *     <InputNumberPrefix>$</InputNumberPrefix>
 *     <InputNumberField />
 *     <InputNumberSuffix>USD</InputNumberSuffix>
 *     <InputNumberControls />
 *   </InputNumberWrapper>
 * </InputNumber>
 * ```
 *
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (InputNumberWrapper, InputNumberField, etc.) support `asChild`
 * - Supports formatting, parsing, min/max constraints, and custom controls
 * - Uses FT Design System tokens: var(--primary), var(--border-primary), var(--tertiary)
 */
export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  ({
    value: controlledValue,
    defaultValue = 0,
    min = -Infinity,
    max = Infinity,
    step = 1,
    precision,
    size = 'md',
    controls = true,
    controlsPosition = 'right',
    error = false,
    disabled = false,
    onChange,
    formatter,
    parser,
    className: _className,
    children,
    asChild: _asChild,
    ...props
  }, _ref) => {
    const [internalValue, setInternalValue] = useState<number | null>(
      controlledValue !== undefined ? controlledValue : defaultValue
    );
    const [inputValue, setInputValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false);

    const actualValue = controlledValue !== undefined ? controlledValue : internalValue;

    // Sync input display value
    useEffect(() => {
      if (!isFocused && actualValue !== null) {
        const displayValue = formatter
          ? formatter(actualValue)
          : precision !== undefined
            ? actualValue.toFixed(precision)
            : String(actualValue);
        setInputValue(displayValue);
      }
    }, [actualValue, formatter, precision, isFocused]);

    // Clamp value to min/max
    const clampValue = useCallback((val: number): number => {
      let result = Math.max(min, Math.min(max, val));
      if (precision !== undefined) {
        result = Number(result.toFixed(precision));
      }
      return result;
    }, [min, max, precision]);

    // Update value
    const updateValue = useCallback((newValue: number | null) => {
      const clampedValue = newValue !== null ? clampValue(newValue) : null;

      if (controlledValue === undefined) {
        setInternalValue(clampedValue);
      }
      onChange?.(clampedValue);
    }, [clampValue, controlledValue, onChange]);

    // Increment
    const handleIncrement = useCallback(() => {
      if (disabled) return;
      const current = actualValue ?? 0;
      updateValue(current + step);
    }, [actualValue, step, disabled, updateValue]);

    // Decrement
    const handleDecrement = useCallback(() => {
      if (disabled) return;
      const current = actualValue ?? 0;
      updateValue(current - step);
    }, [actualValue, step, disabled, updateValue]);

    const canIncrement = actualValue === null || actualValue < max;
    const canDecrement = actualValue === null || actualValue > min;
    
    // Create context value
    const contextValue = {
      value: actualValue,
      setValue: (newValue: number | null) => {
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      inputValue,
      setInputValue,
      isFocused,
      setIsFocused,
      min,
      max,
      step,
      precision,
      size,
      controls,
      controlsPosition,
      error,
      disabled,
      formatter,
      parser,
      onChange,
      handleIncrement,
      handleDecrement,
      canIncrement,
      canDecrement,
      updateValue,
      clampValue,
    };
    
    return (
        <InputNumberProvider value={contextValue}>
            {children}
        </InputNumberProvider>
    );
  }
);

InputNumber.displayName = 'InputNumber';

