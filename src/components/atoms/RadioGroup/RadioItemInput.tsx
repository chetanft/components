"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useRadioGroupContext } from './RadioGroupContext';
import { useRadioItemContext } from './RadioItemContext';

export interface RadioItemInputProps extends Omit<ComposableProps<'input'>, 'type' | 'name' | 'value' | 'checked' | 'onChange'> {
  /**
   * The value of this radio item (inherited from RadioItem)
   */
  value?: string;
}

/**
 * RadioItemInput Component
 *
 * A composable radio input component that wraps the HTML `<input type="radio">` element.
 * Automatically handles selection state based on RadioGroup context.
 *
 * @public
 *
 * @example
 * ```tsx
 * <RadioGroup name="choice" value={value} onValueChange={setValue}>
 *   <RadioItem value="option1">
 *     <RadioItemInput />
 *     <RadioItemLabel>Option 1</RadioItemLabel>
 *   </RadioItem>
 * </RadioGroup>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<input type="radio">` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically applies selection state styling based on context.
 * - Accessible: includes ARIA attributes and keyboard navigation.
 */
export const RadioItemInput = React.forwardRef<HTMLInputElement, RadioItemInputProps>(
  ({
    className,
    value: propValue,
    disabled,
    asChild,
    ...props
  }, ref) => {
    const { name, value: groupValue, onChange, size, disabled: groupDisabled, hasError } = useRadioGroupContext();
    const radioItemContext = useRadioItemContext();
    const derivedValue = radioItemContext?.value;
    const derivedDisabled = radioItemContext?.disabled;

    const itemValue = propValue ?? derivedValue ?? '';
    const isSelected = groupValue === itemValue;
    const isDisabled = (disabled ?? derivedDisabled) ?? groupDisabled;
    
    const sizeStyles = {
      sm: {
        radio: "w-[16px] h-[16px]",
        dot: "w-[6px] h-[6px]",
      },
      md: {
        radio: "w-[var(--radio-size)] h-[var(--radio-size)]",
        dot: "w-[10px] h-[10px]",
      }
    };

    const currentSize = sizeStyles[size];

    const radioStyles = cn(
      "relative shrink-0 rounded-full border-2 transition-all duration-200 cursor-pointer",
      currentSize.radio,
      isDisabled
        ? "bg-transparent border-[var(--border-disabled)] cursor-not-allowed opacity-50"
        : isSelected
          ? "bg-transparent border-[var(--primary)] hover:bg-[var(--bg-secondary)] hover:border-[var(--primary)]"
          : "bg-transparent border-[var(--border-primary)] hover:border-[var(--primary)]",
      "focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--primary)] focus-within:ring-offset-2",
      hasError && "border-critical",
      className
    );

    const inputId = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (!isDisabled && onChange) {
        onChange(itemValue);
      }
    };

    const handleClick = (e: React.MouseEvent) => {
      // Stop propagation to prevent multiple triggers
      e.stopPropagation();
      if (!isDisabled && inputRef.current) {
        // Directly call onChange instead of clicking the input
        // This ensures only this radio's value is set
        handleChange();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        handleChange();
      }
    };

    if (asChild) {
      return (
        <div className="relative">
          <Slot
            ref={inputRef}
            id={inputId}
            {...({ type: "radio", name, value: itemValue, checked: isSelected, onChange: handleChange } as any)}
            disabled={isDisabled}
            className="sr-only"
            aria-invalid={hasError ? 'true' : 'false'}
            {...props}
          />
          <div 
            className={radioStyles} 
            tabIndex={isDisabled ? -1 : 0}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
          >
            {isSelected && !isDisabled && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className={cn(
                    "rounded-full bg-[var(--primary)]",
                    currentSize.dot
                  )}
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          type="radio"
          name={name}
          value={itemValue}
          checked={isSelected}
          disabled={isDisabled}
          onChange={handleChange}
          className="sr-only"
          aria-invalid={hasError ? 'true' : 'false'}
          {...props}
        />
        <div 
          className={radioStyles} 
          tabIndex={isDisabled ? -1 : 0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="radio"
          aria-checked={isSelected}
          aria-disabled={isDisabled}
          style={{ pointerEvents: 'auto' }}
        >
          {isSelected && !isDisabled && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className={cn(
                  "rounded-full bg-[var(--primary)]",
                  currentSize.dot
                )}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

RadioItemInput.displayName = 'RadioItemInput';
