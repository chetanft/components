"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useDatePickerContext } from './DatePickerContext';

export interface DatePickerInputProps extends Omit<ComposableProps<'input'>, 'onChange' | 'onFocus' | 'onBlur' | 'value' | 'placeholder' | 'disabled'> {
  /**
   * Input type ('single' for single date, 'start' or 'end' for range)
   * @default 'single'
   */
  type?: 'single' | 'start' | 'end';
  /**
   * Custom input content (when using asChild)
   */
  children?: React.ReactNode;
}

/**
 * DatePickerInput Component
 *
 * A composable component for the input field of a DatePicker.
 * Typically used within DatePickerTrigger.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DatePickerTrigger>
 *   <DatePickerInput type="single" />
 * </DatePickerTrigger>
 * 
 * // Range mode
 * <DatePickerTrigger>
 *   <DatePickerInput type="start" />
 *   <span>→</span>
 *   <DatePickerInput type="end" />
 * </DatePickerTrigger>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<input>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles value formatting, parsing, and validation.
 */
export const DatePickerInput = React.forwardRef<HTMLInputElement, DatePickerInputProps>(
  ({ className, type = 'single', children, asChild, ...props }, ref) => {
    const {
      value,
      startValue,
      endValue,
      startInputValue,
      endInputValue,
      inputValue,
      setInputValue,
      setStartInputValue,
      setEndInputValue,
      setIsTyping,
      setIsOpen,
      disabled,
      placeholder,
      isTyping,
      onChange: onValueChange,
      onStartChange,
      onEndChange,
    } = useDatePickerContext();
    
    // Helper functions from context
    const formatDateForDisplay = (date: Date | null): string => {
      if (!date) return '';
      try {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      } catch {
        try {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${month}/${day}/${year}`;
        } catch {
          return '';
        }
      }
    };
    
    const parseDateInput = (input: string): Date | null => {
      if (!input || input.trim() === '') return null;
      const trimmed = input.trim();
      try {
        const nativeDate = new Date(trimmed);
        if (!isNaN(nativeDate.getTime())) {
          return nativeDate;
        }
      } catch {
        // Invalid date
      }
      return null;
    };
    
    const getDisplayValue = () => {
      if (type === 'start') {
        return isTyping ? startInputValue : (startValue ? formatDateForDisplay(new Date(startValue)) : startInputValue);
      } else if (type === 'end') {
        return isTyping ? endInputValue : (endValue ? formatDateForDisplay(new Date(endValue)) : endInputValue);
      } else {
        return isTyping ? inputValue : (value ? formatDateForDisplay(new Date(value)) : inputValue);
      }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      
      if (type === 'start') {
        setStartInputValue(newValue);
        setIsTyping(true);
        
        if (newValue.trim() === '') {
          onStartChange?.('');
          return;
        }
        
        const parsedDate = parseDateInput(newValue);
        if (parsedDate) {
          onStartChange?.(parsedDate.toISOString());
        }
      } else if (type === 'end') {
        setEndInputValue(newValue);
        setIsTyping(true);
        
        if (newValue.trim() === '') {
          onEndChange?.('');
          return;
        }
        
        const parsedDate = parseDateInput(newValue);
        if (parsedDate) {
          onEndChange?.(parsedDate.toISOString());
        }
      } else {
        setInputValue(newValue);
        setIsTyping(true);
        
        if (newValue.trim() === '') {
          onValueChange?.('');
          return;
        }
        
        const parsedDate = parseDateInput(newValue);
        if (parsedDate) {
          onValueChange?.(parsedDate.toISOString());
        }
      }
    };
    
    const handleFocus = (_e: React.FocusEvent<HTMLInputElement>) => {
      setIsTyping(true);
      if (type === 'single') {
        setIsOpen(true);
      }
    };
    
    const handleBlur = (_e: React.FocusEvent<HTMLInputElement>) => {
      setIsTyping(false);
      // Format and validate on blur
      const currentValue = getDisplayValue();
      if (currentValue.trim() === '') {
        if (type === 'start') {
          setStartInputValue('');
        } else if (type === 'end') {
          setEndInputValue('');
        } else {
          setInputValue('');
        }
      } else {
        const parsedDate = parseDateInput(currentValue);
        if (parsedDate) {
          const formatted = formatDateForDisplay(parsedDate);
          if (type === 'start') {
            setStartInputValue(formatted);
          } else if (type === 'end') {
            setEndInputValue(formatted);
          } else {
            setInputValue(formatted);
          }
        }
      }
    };
    
    const displayValue = getDisplayValue();
    const inputPlaceholder = type === 'start' ? 'Start date' : type === 'end' ? 'End date' : (placeholder || 'MM/DD/YYYY');
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          {...({ type: "text", value: displayValue, placeholder: inputPlaceholder, onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur } as any)}
          disabled={disabled}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "bg-transparent border-none outline-none text-base font-normal leading-[1.4]",
            displayValue
              ? "text-[var(--primary)] dark:text-[var(--primary)]"
              : "text-placeholder dark:text-placeholder-dark",
            "placeholder:text-placeholder dark:placeholder:text-placeholder-dark",
            type === 'single' ? "flex-1" : "inline-block w-auto pr-[12px]",
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
        value={displayValue}
        placeholder={inputPlaceholder}
        disabled={disabled}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={(e) => e.stopPropagation()}
        size={displayValue ? displayValue.length || 10 : 10}
        className={cn(
          "bg-transparent border-none outline-none text-base font-normal leading-[1.4]",
          displayValue
            ? "text-[var(--primary)] dark:text-[var(--primary)]"
            : "text-placeholder dark:text-placeholder-dark",
          "placeholder:text-placeholder dark:placeholder:text-placeholder-dark",
          type === 'single' ? "flex-1" : "inline-block w-auto pr-[12px]",
          className
        )}
        {...props}
      />
    );
  }
);

DatePickerInput.displayName = 'DatePickerInput';

