"use client";

import React, { useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useInputNumberContext } from './InputNumberContext';

export interface InputNumberFieldProps extends Omit<ComposableProps<'input'>, 'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'value' | 'disabled'> {
  /**
   * Custom input element (when using asChild)
   */
  children?: React.ReactNode;
}

/**
 * InputNumberField Component
 *
 * A composable component for the input field of an InputNumber.
 * Typically used within InputNumberWrapper.
 *
 * @public
 *
 * @example
 * ```tsx
 * <InputNumber value={10}>
 *   <InputNumberWrapper>
 *     <InputNumberField />
 *   </InputNumberWrapper>
 * </InputNumber>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<input>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles value formatting, parsing, and keyboard navigation.
 */
export const InputNumberField = React.forwardRef<HTMLInputElement, InputNumberFieldProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const {
      inputValue,
      setInputValue,
      setIsFocused,
      disabled,
      size,
      parser,
      updateValue,
      clampValue,
      handleIncrement,
      handleDecrement,
      value,
    } = useInputNumberContext();
    
    const sizeConfig = {
      xxs: { padding: 'px-1.5', text: 'text-xs' },
      xs: { padding: 'px-2', text: 'text-sm' },
      sm: { padding: 'px-2.5', text: 'text-sm' },
      md: { padding: 'px-3', text: 'text-base' },
      lg: { padding: 'px-4', text: 'text-lg' },
      xl: { padding: 'px-5', text: 'text-xl' },
      xxl: { padding: 'px-6', text: 'text-2xl' },
    };
    
    const config = sizeConfig[size];
    
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      setInputValue(rawValue);

      if (rawValue === '' || rawValue === '-') {
        return;
      }

      const parsedValue = parser
        ? parser(rawValue)
        : parseFloat(rawValue.replace(/[^\d.-]/g, ''));

      if (!isNaN(parsedValue)) {
        updateValue(parsedValue);
      }
    }, [parser, updateValue, setInputValue]);
    
    const handleBlurInternal = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
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
    }, [inputValue, parser, clampValue, updateValue, setIsFocused, setInputValue]);
    
    const handleFocusInternal = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (value !== null) {
        setInputValue(String(value));
      }
    }, [setIsFocused, setInputValue, value]);
    
    const handleKeyDownInternal = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleIncrement();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleDecrement();
      }
    }, [handleIncrement, handleDecrement]);
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          {...({ type: "text", inputMode: "decimal", value: inputValue, onChange: handleInputChange, onFocus: handleFocusInternal, onBlur: handleBlurInternal, onKeyDown: handleKeyDownInternal } as any)}
          disabled={disabled}
          className={cn(
            "flex-1 min-w-0 bg-transparent border-none outline-none",
            "text-[var(--primary)] placeholder:text-[var(--tertiary)]",
            "text-center",
            config.padding,
            config.text,
            disabled && "cursor-not-allowed",
            className
          )}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    
    return (
      <input
        ref={ref}
        type="text"
        inputMode="decimal"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocusInternal}
        onBlur={handleBlurInternal}
        onKeyDown={handleKeyDownInternal}
        disabled={disabled}
        className={cn(
          "flex-1 min-w-0 bg-transparent border-none outline-none",
          "text-[var(--primary)] placeholder:text-[var(--tertiary)]",
          "text-center",
          config.padding,
          config.text,
          disabled && "cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

InputNumberField.displayName = 'InputNumberField';

