"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Button } from '../../atoms/Button/Button';

// ============================================================================
// Types
// ============================================================================

export type CalendarMode = 'month' | 'year' | 'decade';

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'> {
  /** Current selected date */
  value?: Date;
  /** Default selected date */
  defaultValue?: Date;
  /** Callback when date is selected */
  onSelect?: (date: Date) => void;
  /** Callback when panel changes */
  onPanelChange?: (date: Date, mode: CalendarMode) => void;
  /** Current display mode */
  mode?: CalendarMode;
  /** Full screen mode */
  fullscreen?: boolean;
  /** Custom date cell render */
  dateCellRender?: (date: Date) => React.ReactNode;
  /** Custom month cell render */
  monthCellRender?: (date: Date) => React.ReactNode;
  /** Disabled date function */
  disabledDate?: (date: Date) => boolean;
  /** Header render function */
  headerRender?: (props: { value: Date; type: CalendarMode; onChange: (date: Date) => void; onTypeChange: (type: CalendarMode) => void }) => React.ReactNode;
  /** Valid date range */
  validRange?: [Date, Date];
  /** Locale */
  locale?: 'en' | 'zh';
}

// ============================================================================
// Constants
// ============================================================================

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// ============================================================================
// Helper Functions
// ============================================================================

const isSameDay = (a: Date | null | undefined, b: Date | null | undefined): boolean => {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
};

const isSameMonth = (a: Date, b: Date): boolean => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
};

const isToday = (date: Date): boolean => isSameDay(date, new Date());

const getDaysInMonth = (year: number, month: number): Date[] => {
  const days: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Add days from previous month
  const startPadding = firstDay.getDay();
  for (let i = startPadding - 1; i >= 0; i--) {
    days.push(new Date(year, month, -i));
  }
  
  // Add days of current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  
  // Add days from next month
  const endPadding = 42 - days.length; // 6 weeks
  for (let i = 1; i <= endPadding; i++) {
    days.push(new Date(year, month + 1, i));
  }
  
  return days;
};

// ============================================================================
// Calendar Component
// ============================================================================

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({
    className,
    value: controlledValue,
    defaultValue = new Date(),
    onSelect,
    onPanelChange,
    mode: controlledMode,
    fullscreen = false,
    dateCellRender,
    monthCellRender,
    disabledDate,
    headerRender,
    validRange,
    locale = 'en',
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue);
    const [internalMode, setInternalMode] = useState<CalendarMode>(controlledMode ?? 'month');
    const [viewDate, setViewDate] = useState(controlledValue ?? defaultValue);

    const selectedDate = controlledValue ?? internalValue;
    const mode = controlledMode ?? internalMode;

    const handleDateSelect = useCallback((date: Date) => {
      if (disabledDate?.(date)) return;
      
      if (validRange) {
        if (date < validRange[0] || date > validRange[1]) return;
      }

      if (!controlledValue) {
        setInternalValue(date);
      }
      onSelect?.(date);
    }, [controlledValue, onSelect, disabledDate, validRange]);

    const handleModeChange = useCallback((newMode: CalendarMode) => {
      if (!controlledMode) {
        setInternalMode(newMode);
      }
      onPanelChange?.(viewDate, newMode);
    }, [controlledMode, viewDate, onPanelChange]);

    const handleViewChange = useCallback((date: Date) => {
      setViewDate(date);
      onPanelChange?.(date, mode);
    }, [mode, onPanelChange]);

    const navigateMonth = useCallback((delta: number) => {
      const newDate = new Date(viewDate);
      newDate.setMonth(newDate.getMonth() + delta);
      handleViewChange(newDate);
    }, [viewDate, handleViewChange]);

    const navigateYear = useCallback((delta: number) => {
      const newDate = new Date(viewDate);
      newDate.setFullYear(newDate.getFullYear() + delta);
      handleViewChange(newDate);
    }, [viewDate, handleViewChange]);

    const days = useMemo(() => 
      getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()),
      [viewDate]
    );

    const isDateDisabled = useCallback((date: Date) => {
      if (disabledDate?.(date)) return true;
      if (validRange) {
        return date < validRange[0] || date > validRange[1];
      }
      return false;
    }, [disabledDate, validRange]);

    // Default header
    const renderHeader = () => {
      if (headerRender) {
        return headerRender({
          value: viewDate,
          type: mode,
          onChange: handleViewChange,
          onTypeChange: handleModeChange,
        });
      }

      return (
        <div className={cn(
          "flex items-center justify-between",
          fullscreen ? "p-[var(--spacing-x4)]" : "p-[var(--spacing-x2)]"
        )}>
          <div className="flex items-center gap-[var(--spacing-x1)]">
            <button
              type="button"
              onClick={() => navigateYear(-1)}
              className={cn(
                "p-[var(--spacing-x1)] rounded hover:bg-[var(--color-bg-secondary)]",
                "text-[var(--color-tertiary)] transition-colors"
              )}
              aria-label="Previous year"
            >
              <Icon name="backward" size={16} />
            </button>
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className={cn(
                "p-[var(--spacing-x1)] rounded hover:bg-[var(--color-bg-secondary)]",
                "text-[var(--color-tertiary)] transition-colors"
              )}
              aria-label="Previous month"
            >
              <Icon name="chevron-left" size={16} />
            </button>
          </div>

          <div className="flex items-center gap-[var(--spacing-x2)]">
            <button
              type="button"
              onClick={() => handleModeChange('month')}
              className={cn(
                "text-[var(--color-primary)] font-medium hover:text-[var(--color-primary)]",
                mode === 'month' && "underline"
              )}
            >
              {MONTHS_FULL[viewDate.getMonth()]}
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('year')}
              className={cn(
                "text-[var(--color-primary)] font-medium hover:text-[var(--color-primary)]",
                mode === 'year' && "underline"
              )}
            >
              {viewDate.getFullYear()}
            </button>
          </div>

          <div className="flex items-center gap-[var(--spacing-x1)]">
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className={cn(
                "p-[var(--spacing-x1)] rounded hover:bg-[var(--color-bg-secondary)]",
                "text-[var(--color-tertiary)] transition-colors"
              )}
              aria-label="Next month"
            >
              <Icon name="chevron-right" size={16} />
            </button>
            <button
              type="button"
              onClick={() => navigateYear(1)}
              className={cn(
                "p-[var(--spacing-x1)] rounded hover:bg-[var(--color-bg-secondary)]",
                "text-[var(--color-tertiary)] transition-colors"
              )}
              aria-label="Next year"
            >
              <Icon name="forward" size={16} />
            </button>
          </div>
        </div>
      );
    };

    // Month view
    const renderMonthView = () => (
      <div className={cn(fullscreen ? "p-[var(--spacing-x4)]" : "p-[var(--spacing-x2)]")}>
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-[var(--spacing-x2)]">
          {WEEKDAYS.map(day => (
            <div
              key={day}
              className={cn(
                "text-center text-[var(--color-tertiary)]",
                fullscreen ? "py-[var(--spacing-x2)] text-sm" : "py-[var(--spacing-x1)] text-xs"
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const isCurrentMonth = isSameMonth(date, viewDate);
            const isSelected = isSameDay(date, selectedDate);
            const isTodayDate = isToday(date);
            const disabled = isDateDisabled(date);

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleDateSelect(date)}
                disabled={disabled}
                className={cn(
                  "relative flex flex-col items-center justify-start rounded transition-colors",
                  fullscreen ? "min-h-[80px] p-[var(--spacing-x1)]" : "h-[32px] w-[32px] justify-center",
                  !isCurrentMonth && "opacity-40",
                  isSelected && "bg-[var(--color-primary)] text-white",
                  !isSelected && isTodayDate && "border border-[var(--color-primary)]",
                  !isSelected && !disabled && "hover:bg-[var(--color-bg-secondary)]",
                  disabled && "opacity-30 cursor-not-allowed"
                )}
              >
                <span className={cn(
                  fullscreen ? "text-sm" : "text-xs",
                  isTodayDate && !isSelected && "text-[var(--color-primary)] font-medium"
                )}>
                  {date.getDate()}
                </span>
                {fullscreen && dateCellRender && (
                  <div className="w-full mt-1 text-xs overflow-hidden">
                    {dateCellRender(date)}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );

    // Year view (month selection)
    const renderYearView = () => (
      <div className={cn(
        "grid grid-cols-3 gap-[var(--spacing-x2)]",
        fullscreen ? "p-[var(--spacing-x4)]" : "p-[var(--spacing-x2)]"
      )}>
        {MONTHS.map((month, index) => {
          const monthDate = new Date(viewDate.getFullYear(), index, 1);
          const isSelected = selectedDate && 
            selectedDate.getMonth() === index && 
            selectedDate.getFullYear() === viewDate.getFullYear();

          return (
            <button
              key={month}
              type="button"
              onClick={() => {
                handleViewChange(monthDate);
                handleModeChange('month');
              }}
              className={cn(
                "py-[var(--spacing-x3)] px-[var(--spacing-x2)] rounded transition-colors",
                "text-[var(--color-primary)]",
                isSelected && "bg-[var(--color-primary)] text-white",
                !isSelected && "hover:bg-[var(--color-bg-secondary)]"
              )}
            >
              {month}
              {fullscreen && monthCellRender && (
                <div className="mt-1 text-xs">
                  {monthCellRender(monthDate)}
                </div>
              )}
            </button>
          );
        })}
      </div>
    );

    // Decade view (year selection)
    const renderDecadeView = () => {
      const startYear = Math.floor(viewDate.getFullYear() / 10) * 10;
      const years = Array.from({ length: 12 }, (_, i) => startYear - 1 + i);

      return (
        <div className={cn(
          "grid grid-cols-3 gap-[var(--spacing-x2)]",
          fullscreen ? "p-[var(--spacing-x4)]" : "p-[var(--spacing-x2)]"
        )}>
          {years.map((year, index) => {
            const isSelected = selectedDate && selectedDate.getFullYear() === year;
            const isOutOfDecade = index === 0 || index === 11;

            return (
              <button
                key={year}
                type="button"
                onClick={() => {
                  const newDate = new Date(viewDate);
                  newDate.setFullYear(year);
                  handleViewChange(newDate);
                  handleModeChange('year');
                }}
                className={cn(
                  "py-[var(--spacing-x3)] px-[var(--spacing-x2)] rounded transition-colors",
                  "text-[var(--color-primary)]",
                  isOutOfDecade && "opacity-40",
                  isSelected && "bg-[var(--color-primary)] text-white",
                  !isSelected && "hover:bg-[var(--color-bg-secondary)]"
                )}
              >
                {year}
              </button>
            );
          })}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--color-bg-primary)] rounded-[var(--radius-md)]",
          "border border-[var(--color-border-secondary)]",
          fullscreen ? "w-full" : "w-[280px]",
          className
        )}
        {...props}
      >
        {renderHeader()}
        
        {mode === 'month' && renderMonthView()}
        {mode === 'year' && renderYearView()}
        {mode === 'decade' && renderDecadeView()}

        {/* Today button */}
        {!fullscreen && (
          <div className="p-[var(--spacing-x2)] border-t border-[var(--color-border-secondary)]">
            <Button
              variant="text"
              size="xs"
              onClick={() => {
                const today = new Date();
                handleViewChange(today);
                handleDateSelect(today);
              }}
              className="w-full"
            >
              Today
            </Button>
          </div>
        )}
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';

export default Calendar;

