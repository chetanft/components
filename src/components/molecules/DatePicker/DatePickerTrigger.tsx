"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { Icon } from '../../atoms/Icons';
import { useDatePickerContext } from './DatePickerContext';

export interface DatePickerTriggerProps extends ComposableProps<'button'> {
  /**
   * Trigger content (typically DatePickerInput).
   */
  children?: React.ReactNode;
  /**
   * Icon name
   * @default 'calendar'
   */
  icon?: 'calendar' | 'chevron-down';
}

/**
 * DatePickerTrigger Component
 *
 * A composable component for the trigger button/input wrapper of a DatePicker.
 * Typically wraps DatePickerInput.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DatePicker value={date}>
 *   <DatePickerTrigger>
 *     <DatePickerInput />
 *   </DatePickerTrigger>
 *   <DatePickerCalendar />
 * </DatePicker>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<button>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles open/close state and icon display.
 */
export const DatePickerTrigger = React.forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  ({ className, children, icon = 'calendar', asChild, onClick, ...props }, ref) => {
    const { isOpen, setIsOpen, disabled, includeDropdown } = useDatePickerContext();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        setIsOpen(true);
      }
      onClick?.(e);
    };
    
    const iconName = includeDropdown ? 'chevron-down' : icon;
    
    if (asChild) {
      return (
        <Slot
          ref={ref}
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            "flex-shrink-0 cursor-pointer flex items-center justify-center",
            disabled && "cursor-not-allowed",
            className
          )}
          {...props}
        >
          {children || (
            <Icon
              name={iconName}
              size={16}
              className={cn(
                disabled
                  ? "text-input-disabled dark:text-input-disabled-dark"
                  : "text-icon dark:text-icon-dark"
              )}
            />
          )}
        </Slot>
      );
    }
    
    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "flex-shrink-0 cursor-pointer flex items-center justify-center",
          disabled && "cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children || (
          <Icon
            name={iconName}
            size={16}
            className={cn(
              disabled
                ? "text-input-disabled dark:text-input-disabled-dark"
                : "text-icon dark:text-icon-dark"
            )}
          />
        )}
      </button>
    );
  }
);

DatePickerTrigger.displayName = 'DatePickerTrigger';

