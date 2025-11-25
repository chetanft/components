"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { cn, type ComponentSize } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value' | 'defaultValue' | 'prefix' | 'suffix'> {
  /** Current value */
  value?: number | null;
  /** Default value */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step for increment/decrement */
  step?: number;
  /** Decimal precision */
  precision?: number;
  /** Component size */
  size?: ComponentSize;
  /** Whether to show controls */
  controls?: boolean;
  /** Controls position */
  controlsPosition?: 'right' | 'both';
  /** Prefix content */
  prefix?: React.ReactNode;
  /** Suffix content */
  suffix?: React.ReactNode;
  /** Error state */
  error?: boolean;
  /** Change handler */
  onChange?: (value: number | null) => void;
  /** Formatter for display */
  formatter?: (value: number | undefined) => string;
  /** Parser from string to number */
  parser?: (displayValue: string) => number;
}

/**
 * InputNumber component - Numeric input with increment/decrement controls.
 * Built with FT Design System tokens.
 * 
 * Uses:
 * - Colors: var(--primary), var(--border-primary), var(--tertiary)
 * - Spacing: var(--x2), var(--x3), var(--x4)
 * - Border radius: var(--radius-md)
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
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
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
    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (actualValue !== null) {
        setInputValue(String(actualValue));
      }
      props.onFocus?.(e);
    }, [actualValue, props]);

    // Handle keyboard
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
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
      <div
        className={cn(
          "inline-flex items-center",
          "border-2 rounded-[var(--radius-md)]",
          "bg-[var(--bg-primary)]",
          "transition-colors duration-200",
          config.height,
          // Border colors
          error
            ? "border-[var(--critical)]"
            : isFocused
            ? "border-[var(--primary)]"
            : "border-[var(--border-primary)] hover:border-[var(--primary)]",
          // Disabled state
          disabled && "bg-[var(--border-secondary)] cursor-not-allowed opacity-60",
          className
        )}
      >
        {/* Left control (both mode) */}
        {controls && controlsPosition === 'both' && (
          <ControlButton direction="down" onClick={handleDecrement} />
        )}

        {/* Prefix */}
        {prefix && (
          <span className={cn("text-[var(--tertiary)] pl-[var(--x3)]", config.text)}>
            {prefix}
          </span>
        )}

        {/* Input */}
        <input
          ref={ref}
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            "flex-1 min-w-0 bg-transparent border-none outline-none",
            "text-[var(--primary)] placeholder:text-[var(--tertiary)]",
            "text-center",
            config.padding,
            config.text,
            disabled && "cursor-not-allowed"
          )}
          {...props}
        />

        {/* Suffix */}
        {suffix && (
          <span className={cn("text-[var(--tertiary)] pr-[var(--x3)]", config.text)}>
            {suffix}
          </span>
        )}

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
      </div>
    );
  }
);

InputNumber.displayName = 'InputNumber';

