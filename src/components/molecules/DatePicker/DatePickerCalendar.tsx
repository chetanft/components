"use client";

import React from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../../lib/utils';
import type { ComposableProps } from '../../../lib/slot';
import { Calendar } from './Calendar';
import { useDatePickerContext } from './DatePickerContext';

export interface DatePickerCalendarProps extends ComposableProps<'div'> {
  /**
   * Calendar content (optional, defaults to Calendar component).
   */
  children?: React.ReactNode;
  /**
   * Portal wrapper class name overrides.
   */
  portalClassName?: string;
  /**
   * Portal wrapper inline styles.
   */
  portalStyle?: React.CSSProperties;
}

/**
 * DatePickerCalendar Component
 *
 * A composable component for the calendar popup of a DatePicker.
 * Typically used within DatePicker.
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
 * - Automatically renders in a portal when DatePicker is open
 * - Supports custom calendar content via children
 * - Handles positioning and backdrop automatically
 */
export const DatePickerCalendar = React.forwardRef<HTMLDivElement, DatePickerCalendarProps>(
  (
    { className, children, portalClassName, portalStyle, asChild: _asChild, ...props },
    ref
  ) => {
    const {
      isOpen,
      disabled,
      portalContainer,
      calendarPosition,
      calendarRef,
      range,
      value,
      startValue,
      endValue,
      dropdownPresets,
      onDropdownPresetChange,
      quickSelectOptions,
      handleDateChange,
      handleApply,
      handleCancel,
      handleClear,
      setIsOpen,
      portalClassName: contextPortalClassName,
      portalStyle: contextPortalStyle,
    } = useDatePickerContext();
    
    if (!isOpen || disabled || !portalContainer) {
      return null;
    }
    
    // Create calendar value
    const calendarValue = range && startValue
      ? (endValue ? [new Date(startValue), new Date(endValue)] as [Date, Date] : [new Date(startValue), new Date(startValue)] as [Date, Date])
      : value ? new Date(value) : null;
    
    const calendarContent = children || (
      <Calendar
        ref={calendarRef}
        range={range}
        value={calendarValue || undefined}
        onChange={handleDateChange}
        onCancel={handleCancel}
        onApply={handleApply}
        onClear={range ? handleClear : undefined}
        dropdownPresets={dropdownPresets}
        onDropdownPresetChange={onDropdownPresetChange}
        quickSelectOptions={quickSelectOptions}
      />
    );
    
    return ReactDOM.createPortal(
      <>
        {/* Semi-transparent backdrop */}
        <div
          className="fixed inset-0 bg-overlay z-[9998]"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Calendar */}
        <div
          ref={ref}
          className={cn(
            "fixed z-[9999]",
            portalClassName ?? contextPortalClassName,
            className
          )}
          style={{
            top: calendarPosition.top,
            left: calendarPosition.left,
            ...(portalStyle ?? contextPortalStyle ?? {})
          }}
          {...props}
        >
          {calendarContent}
        </div>
      </>,
      portalContainer
    );
  }
);

DatePickerCalendar.displayName = 'DatePickerCalendar';
