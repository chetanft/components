"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { cn, type ComponentSize } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import type { ComposableProps } from '../../../lib/slot';
import { InputNumberProvider } from './InputNumberContext';
import { InputNumberWrapper } from './InputNumberWrapper';
import { InputNumberField } from './InputNumberField';
import { InputNumberControls } from './InputNumberControls';
import { InputNumberPrefix } from './InputNumberPrefix';
import { InputNumberSuffix } from './InputNumberSuffix';

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
   * Prefix content (for declarative API)
   * @deprecated Use InputNumberPrefix component instead
   */
  prefix?: React.ReactNode;
  /**
   * Suffix content (for declarative API)
   * @deprecated Use InputNumberSuffix component instead
   */
  suffix?: React.ReactNode;
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
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <InputNumber value={10} min={0} max={100} step={1}>
 *   <InputNumberWrapper>
 *     <InputNumberPrefix>$</InputNumberPrefix>
 *     <InputNumberField />
 *     <InputNumberSuffix>USD</InputNumberSuffix>
 *     <InputNumberControls />
 *   </InputNumberWrapper>
 * </InputNumber>
 * 
 * // Declarative API (deprecated)
 * <InputNumber value={10} prefix="$" suffix="USD" />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (InputNumberWrapper, InputNumberField, etc.) support `asChild`
 * - Supports formatting, parsing, min/max constraints, and custom controls
 * - Declarative API is deprecated but still functional for backward compatibility
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
    prefix,
    suffix,
    error = false,
    disabled = false,
    onChange,
    formatter,
    parser,
    className,
    children,
    asChild: _asChild,
    ...props
  }, ref) => {
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

    // Handle input change
    const _handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      setInputValue(rawValue);

      // Allow empty input
      if (rawValue === '' || rawValue === '-') {
        return;
      }

      // Parse value
      const parsedValue = parser
        ? parser(rawValue)
        : parseFloat(rawValue.replace(/[^\d.-]/g, ''));

      if (!isNaN(parsedValue)) {
        updateValue(parsedValue);
      }
    }, [parser, updateValue]);

    // Handle blur - finalize value
    const _handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);

      if (inputValue === '' || inputValue === '-') {
        updateValue(null);
        setInputValue('');
      } else {
        const parsedValue = parser
          ? parser(inputValue)
          : parseFloat(inputValue.replace(/[^\d.-]/g, ''));

        if (!isNaN(parsedValue)) {
          const clamped = clampValue(parsedValue);
          updateValue(clamped);
        }
      }

      props.onBlur?.(e);
    }, [inputValue, parser, clampValue, updateValue, props]);

    // Handle focus
    const _handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (actualValue !== null) {
        setInputValue(String(actualValue));
      }
      props.onFocus?.(e);
    }, [actualValue, props]);

    // Handle keyboard
    const _handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleIncrement();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleDecrement();
      }
      props.onKeyDown?.(e);
    }, [handleIncrement, handleDecrement, props]);

    // Size configurations
    const sizeConfig = {
      xxs: { height: 'h-4', padding: 'px-1.5', text: 'text-xs', icon: 10, button: 'w-4' },
      xs: { height: 'h-6', padding: 'px-2', text: 'text-sm', icon: 12, button: 'w-5' },
      sm: { height: 'h-8', padding: 'px-2.5', text: 'text-sm', icon: 14, button: 'w-6' },
      md: { height: 'h-10', padding: 'px-3', text: 'text-base', icon: 16, button: 'w-8' },
      lg: { height: 'h-12', padding: 'px-4', text: 'text-lg', icon: 18, button: 'w-10' },
      xl: { height: 'h-14', padding: 'px-5', text: 'text-xl', icon: 20, button: 'w-11' },
      xxl: { height: 'h-16', padding: 'px-6', text: 'text-2xl', icon: 22, button: 'w-12' },
    };

    const config = sizeConfig[size];

    const canIncrement = actualValue === null || actualValue < max;
    const canDecrement = actualValue === null || actualValue > min;
    
    // Check if using composable API (has children with InputNumber sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
        child?.type?.displayName?.startsWith('InputNumber')
    );
    
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
    
    // If using composable API, render with context provider
    if (hasComposableChildren) {
        // Show deprecation warning if using old props with composable API
        if (process.env.NODE_ENV !== 'production' && (prefix || suffix)) {
            console.warn(
                'InputNumber: Using deprecated props (prefix, suffix) with composable API. ' +
                'Please use InputNumberPrefix and InputNumberSuffix components instead. ' +
                'See migration guide: docs/migrations/composable-migration.md'
            );
        }
        
        return (
            <InputNumberProvider value={contextValue}>
                {children}
            </InputNumberProvider>
        );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && (prefix || suffix)) {
        console.warn(
            'InputNumber: Declarative API (prefix, suffix props) is deprecated. ' +
            'Please migrate to composable API using InputNumberWrapper, InputNumberField, InputNumberPrefix, InputNumberSuffix, and InputNumberControls components. ' +
            'See migration guide: docs/migrations/composable-migration.md'
        );
    }
    
    // Control button component
    const ControlButton = ({
      direction,
      onClick
    }: {
      direction: 'up' | 'down';
      onClick: () => void;
    }) => (
      <button
        type="button"
        tabIndex={-1}
        disabled={disabled || (direction === 'up' ? !canIncrement : !canDecrement)}
        onClick={onClick}
        className={cn(
          "flex items-center justify-center",
          "transition-colors duration-150",
          "text-[var(--tertiary)] hover:text-[var(--primary)]",
          "hover:bg-[var(--border-secondary)]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          controlsPosition === 'right' && "border-l border-[var(--border-primary)]",
          controlsPosition === 'right' && config.button,
          controlsPosition === 'both' && config.button,
        )}
      >
        <Icon
          name={direction === 'up' ? 'chevron-up' : 'chevron-down'}
          size={config.icon}
        />
      </button>
    );

    return (
        <InputNumberProvider value={contextValue}>
            <InputNumberWrapper className={className}>
                {/* Left control (both mode) */}
                {controls && controlsPosition === 'both' && (
                    <ControlButton direction="down" onClick={handleDecrement} />
                )}

                {/* Prefix */}
                {prefix && <InputNumberPrefix>{prefix}</InputNumberPrefix>}

                {/* Input */}
                <InputNumberField ref={ref} {...props} />

                {/* Suffix */}
                {suffix && <InputNumberSuffix>{suffix}</InputNumberSuffix>}

                {/* Right controls */}
                {controls && controlsPosition === 'right' && (
                    <div className="flex flex-col h-full border-l border-[var(--border-primary)]">
                        <button
                            type="button"
                            tabIndex={-1}
                            disabled={disabled || !canIncrement}
                            onClick={handleIncrement}
                            className={cn(
                                "flex-1 flex items-center justify-center",
                                "transition-colors duration-150",
                                "text-[var(--tertiary)] hover:text-[var(--primary)]",
                                "hover:bg-[var(--border-secondary)]",
                                "border-b border-[var(--border-primary)]",
                                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                                config.button
                            )}
                        >
                            <Icon name="chevron-up" size={config.icon - 2} />
                        </button>
                        <button
                            type="button"
                            tabIndex={-1}
                            disabled={disabled || !canDecrement}
                            onClick={handleDecrement}
                            className={cn(
                                "flex-1 flex items-center justify-center",
                                "transition-colors duration-150",
                                "text-[var(--tertiary)] hover:text-[var(--primary)]",
                                "hover:bg-[var(--border-secondary)]",
                                "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                                config.button
                            )}
                        >
                            <Icon name="chevron-down" size={config.icon - 2} />
                        </button>
                    </div>
                )}

                {/* Both mode - right control */}
                {controls && controlsPosition === 'both' && (
                    <ControlButton direction="up" onClick={handleIncrement} />
                )}
            </InputNumberWrapper>
        </InputNumberProvider>
    );
  }
);

InputNumber.displayName = 'InputNumber';

