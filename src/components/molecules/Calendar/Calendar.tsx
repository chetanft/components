"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
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

const COMPACT_NAV_BUTTON_CLASS = "min-w-[30px] min-h-[30px] w-fit h-fit flex items-center justify-center rounded-[4px] text-[var(--tertiary)] hover:bg-[var(--border-secondary)] transition-colors focus:outline-none";

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

    const weeks = useMemo(() => {
      const chunked: Date[][] = [];
      for (let i = 0; i < days.length; i += 7) {
        chunked.push(days.slice(i, i + 7));
      }
      return chunked;
    }, [days]);

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

      if (!fullscreen && mode === 'month') {
        return (
          <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-[var(--border-primary)]">
            <div className="flex items-center gap-[8px]">
              <button
                type="button"
                onClick={() => navigateYear(-1)}
                className={COMPACT_NAV_BUTTON_CLASS}
                aria-label="Previous year"
              >
                <Icon name="backward" size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigateMonth(-1)}
                className={COMPACT_NAV_BUTTON_CLASS}
                aria-label="Previous month"
              >
                <Icon name="chevron-left" size={16} />
              </button>
            </div>

            <div className="flex items-center gap-[8px] text-[14px] font-medium text-[var(--primary)]">
              <button
                type="button"
                onClick={() => handleModeChange('month')}
                className="hover:text-[var(--primary)] focus:outline-none"
              >
                {format(viewDate, 'MMM')}
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('year')}
                className="hover:text-[var(--primary)] focus:outline-none"
              >
                {format(viewDate, 'yyyy')}
              </button>
            </div>

            <div className="flex items-center gap-[8px]">
              <button
                type="button"
                onClick={() => navigateMonth(1)}
                className={COMPACT_NAV_BUTTON_CLASS}
                aria-label="Next month"
              >
                <Icon name="chevron-right" size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigateYear(1)}
                className={COMPACT_NAV_BUTTON_CLASS}
                aria-label="Next year"
              >
                <Icon name="forward" size={16} />
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className={cn(
          "flex items-center justify-between",
          fullscreen ? "p-[24px]" : "p-[16px]"
        )}>
          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              onClick={() => navigateYear(-1)}
              className={cn(
                "p-[8px] rounded hover:bg-[var(--bg-secondary)]",
                "text-[var(--tertiary)] transition-colors"
              )}
              aria-label="Previous year"
            >
              <Icon name="backward" size={16} />
            </button>
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className={cn(
                "p-[8px] rounded hover:bg-[var(--bg-secondary)]",
                "text-[var(--tertiary)] transition-colors"
              )}
              aria-label="Previous month"
            >
              <Icon name="chevron-left" size={16} />
            </button>
          </div>

          <div className="flex items-center gap-[8px] mx-[16px]">
            <button
              type="button"
              onClick={() => handleModeChange('month')}
              className={cn(
                "text-[var(--primary)] font-medium hover:text-[var(--primary)]",
                mode === 'month' && "underline"
              )}
            >
              {MONTHS_FULL[viewDate.getMonth()]}
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('year')}
              className={cn(
                "text-[var(--primary)] font-medium hover:text-[var(--primary)]",
                mode === 'year' && "underline"
              )}
            >
              {viewDate.getFullYear()}
            </button>
          </div>

          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className={cn(
                "p-[8px] rounded hover:bg-[var(--bg-secondary)]",
                "text-[var(--tertiary)] transition-colors"
              )}
              aria-label="Next month"
            >
              <Icon name="chevron-right" size={16} />
            </button>
            <button
              type="button"
              onClick={() => navigateYear(1)}
              className={cn(
                "p-[8px] rounded hover:bg-[var(--bg-secondary)]",
                "text-[var(--tertiary)] transition-colors"
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
    const renderMonthView = () => {
      if (!fullscreen) {
        return (
          <div className="flex flex-col gap-[8px] p-[16px]">
            <div className="flex gap-[12px]">
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="w-[30px] h-[30px] flex-shrink-0 flex flex-col items-center justify-center p-[8px] text-[14px] text-[var(--tertiary)] font-normal"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[12px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex gap-[12px] items-center">
                  {week.map((date, dayIndex) => {
                    const isCurrentMonth = isSameMonth(date, viewDate);
                    const isSelected = isSameDay(date, selectedDate);
                    const isTodayDate = isToday(date);
                    const disabled = isDateDisabled(date);

                    return (
                      <button
                        key={`${weekIndex}-${dayIndex}`}
                        type="button"
                        onClick={() => handleDateSelect(date)}
                        disabled={disabled}
                        className={cn(
                          "w-[30px] h-[30px] flex-shrink-0 flex items-center justify-center p-[8px] rounded-[4px] transition-colors",
                          "bg-[var(--bg-primary)]",
                          !disabled && !isSelected && "hover:bg-[var(--border-primary)]",
                          isSelected && !disabled && "bg-[var(--border-secondary)]",
                          isTodayDate && !isSelected && !disabled && "border border-[var(--border-primary)]",
                          disabled && "cursor-not-allowed"
                        )}
                      >
                        <span
                          className={cn(
                            "text-[14px] leading-[normal]",
                            isSelected ? "font-medium" : "font-normal",
                            disabled ? "text-[var(--border-secondary)]" : "text-[var(--primary)]",
                            !isCurrentMonth && !isSelected && !disabled && "text-[var(--tertiary)]"
                          )}
                        >
                          {date.getDate()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        );
      }

      return (
        <div className="p-[24px]">
          <div className="grid grid-cols-7 gap-1 mb-[12px]">
            {WEEKDAYS.map(day => (
              <div
                key={day}
                className="text-center text-[var(--tertiary)] py-[12px] text-sm"
              >
                {day}
              </div>
            ))}
          </div>
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
                    "relative flex flex-col items-center justify-start rounded transition-colors min-h-[80px] p-[8px]",
                    !isCurrentMonth && "opacity-40",
                    isSelected && "bg-[var(--primary)] text-[var(--bg-primary)]",
                    !isSelected && isTodayDate && "border border-[var(--primary)]",
                    !isSelected && !disabled && "hover:bg-[var(--bg-secondary)]",
                    disabled && "opacity-30 cursor-not-allowed"
                  )}
                >
                  <span className="text-sm">
                    {date.getDate()}
                  </span>
                  {dateCellRender && (
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
    };

    // Year view (month selection)
    const renderYearView = () => (
      <div className={cn(
        "grid grid-cols-3 gap-[12px]",
        fullscreen ? "p-[24px]" : "p-[16px]"
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
                "py-[12px] px-[12px] rounded transition-colors",
                "text-[var(--primary)]",
                isSelected && "bg-[var(--primary)] text-[var(--bg-primary)]",
                !isSelected && "hover:bg-[var(--bg-secondary)]"
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
          "grid grid-cols-3 gap-[12px]",
          fullscreen ? "p-[24px]" : "p-[16px]"
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
                  "py-[12px] px-[12px] rounded transition-colors",
                  "text-[var(--primary)]",
                  isOutOfDecade && "opacity-40",
                  isSelected && "bg-[var(--primary)] text-[var(--bg-primary)]",
                  !isSelected && "hover:bg-[var(--bg-secondary)]"
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
          "bg-[var(--bg-primary)] rounded-[var(--radius-md)]",
          "border border-[var(--border-secondary)]",
          fullscreen ? "w-full" : "w-fit",
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
          <div className="p-[16px] border-t border-[var(--border-secondary)]">
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
