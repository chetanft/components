import React, { forwardRef, useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Button } from '../../atoms/Button/Button';
import { Divider } from '../../atoms/Divider';
import {
  startOfToday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  isSameDay,
  addWeeks,
  addMonths,
  subWeeks,
  subMonths,
  subDays,
  addDays,
  format,
  startOfDay,
  isAfter,
  isBefore,
  differenceInDays
} from 'date-fns';

interface CalendarProps {
  range?: boolean;
  value?: Date | [Date, Date] | null;
  onChange?: (date: Date | [Date, Date]) => void;
  onCancel?: () => void;
  onApply?: () => void;
  onClear?: () => void;
  minDate?: Date;
  maxDate?: Date;
  maxRangeDays?: number; // Maximum allowed range in days
  className?: string;
}

const calendarVariants = cva(
  "bg-white dark:bg-surface-dark rounded-lg shadow-[0px_6px_6px_0px_rgba(0,0,0,0.16)] flex flex-col overflow-hidden",
  {
    variants: {
      range: {
        true: "w-[814px] p-4 gap-4",
        false: "w-[314px] p-4 gap-4"
      }
    },
    defaultVariants: {
      range: false
    }
  }
);

const monthHeaderVariants = cva(
  "flex items-center justify-between px-0 py-3 border-b border-border dark:border-border-dark",
  {
    variants: {
      range: {
        true: "",
        false: ""
      }
    }
  }
);

const navigationButtonVariants = cva(
  "p-2 hover:bg-surface-hover dark:hover:bg-surface-hover-dark rounded-full",
  {
    variants: {
      year: {
        true: "mx-1",
        false: ""
      }
    },
    defaultVariants: {
      year: false
    }
  }
);

const weekDayVariants = cva(
  "flex gap-3 px-0 pt-0 pb-3",
  {
    variants: {
      range: {
        true: "",
        false: ""
      }
    }
  }
);

const dateGridVariants = cva(
  "flex flex-col gap-3 px-0 pb-0",
  {
    variants: {
      range: {
        true: "",
        false: ""
      }
    }
  }
);

const dateButtonVariants = cva(
  "w-[30px] h-[30px] flex-shrink-0 flex items-center justify-center rounded-[4px] transition-colors",
  {
    variants: {
      type: {
        default: "bg-white dark:bg-surface-dark text-[var(--primary)] dark:text-primary-dark hover:bg-[var(--border-primary)] dark:hover:bg-[var(--border-primary)]",
        selected: "bg-[var(--border-secondary)] dark:bg-[var(--border-secondary)] text-[var(--primary)] dark:text-primary-dark",
        hover: "bg-[var(--border-primary)] dark:bg-[var(--border-primary)] text-[var(--primary)] dark:text-primary-dark",
        disabled: "bg-white dark:bg-surface-dark text-[var(--border-secondary)] dark:text-[var(--border-secondary)] cursor-not-allowed",
        rangeSelected: "bg-[var(--border-primary)] dark:bg-[var(--border-primary)] text-[var(--primary)] dark:text-primary-dark",
        rangeStart: "bg-[var(--border-secondary)] dark:bg-[var(--border-secondary)] text-[var(--primary)] dark:text-primary-dark",
        rangeEnd: "bg-[var(--border-secondary)] dark:bg-[var(--border-secondary)] text-[var(--primary)] dark:text-primary-dark"
      },
      inRange: {
        true: "bg-[var(--border-primary)] dark:bg-[var(--border-primary)]",
        false: ""
      }
    },
    defaultVariants: {
      type: "default",
      inRange: false
    }
  }
);

const quickSelectVariants = cva(
  "flex flex-col border-r border-border dark:border-border-dark py-0 overflow-y-auto",
  {
    variants: {
      range: {
        true: "w-[170px] h-[331px]",
        false: "hidden"
      }
    },
    defaultVariants: {
      range: false
    }
  }
);

const quickSelectButtonVariants = cva(
  "text-left px-3 py-3 text-base text-primary dark:text-primary-dark transition-colors rounded-lg",
  {
    variants: {
      selected: {
        true: "bg-white dark:bg-surface-dark",
        false: "bg-white dark:bg-surface-dark hover:bg-surface-hover dark:hover:bg-surface-hover-dark"
      }
    },
    defaultVariants: {
      selected: false
    }
  }
);

const dropdownVariants = cva(
  "flex items-center justify-between w-full h-10 min-h-[40px] px-3 border border-border dark:border-border-dark rounded-lg cursor-pointer bg-white dark:bg-surface-dark",
  {
    variants: {
      open: {
        true: "border-primary dark:border-primary-dark",
        false: "hover:border-border-hover dark:hover:border-border-hover-dark"
      }
    },
    defaultVariants: {
      open: false
    }
  }
);

const dropdownMenuVariants = cva(
  "absolute z-[10000] w-full mt-1 bg-white dark:bg-surface-dark border border-border dark:border-border-dark rounded-lg shadow-lg overflow-hidden",
  {
    variants: {
      open: {
        true: "block",
        false: "hidden"
      }
    },
    defaultVariants: {
      open: false
    }
  }
);

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Helper function to get quarter start and end dates
const getQuarterStart = (date: Date): Date => {
  const quarter = Math.floor(date.getMonth() / 3);
  return new Date(date.getFullYear(), quarter * 3, 1);
};

const getQuarterEnd = (date: Date): Date => {
  const quarter = Math.floor(date.getMonth() / 3);
  return new Date(date.getFullYear(), (quarter + 1) * 3, 0);
};

const QUICK_SELECT_OPTIONS = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'last-7-days' },
  { label: 'Last 14 days', value: 'last-14-days' },
  { label: 'Last 30 days', value: 'last-30-days' },
  { label: 'This week', value: 'this-week' },
  { label: 'Previous week', value: 'previous-week' },
  { label: 'This month', value: 'this-month' },
  { label: 'Previous month', value: 'previous-month' },
  { label: 'This quarter', value: 'this-quarter' },
  { label: 'Previous quarter', value: 'previous-quarter' },
  { label: 'This year', value: 'this-year' },
  { label: 'Previous year', value: 'previous-year' }
];

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({
  range = false,
  value,
  onChange,
  onCancel,
  onApply,
  onClear,
  minDate,
  maxDate,
  maxRangeDays,
  className
}, ref) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [secondMonth, setSecondMonth] = useState(() => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + 1);
    return date;
  });
  const [activeQuickSelect, setActiveQuickSelect] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<string>("Created Date");
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [rangeError, setRangeError] = useState<string | null>(null);

  const validateRange = (start: Date, end: Date): string | null => {
    const normalizedStart = startOfDay(start);
    const normalizedEnd = startOfDay(end);
    
    // Check if end is before start
    if (isBefore(normalizedEnd, normalizedStart)) {
      return 'End date must be after start date';
    }
    
    // Check max range limit
    if (maxRangeDays) {
      const daysDiff = differenceInDays(normalizedEnd, normalizedStart);
      if (daysDiff > maxRangeDays) {
        return `Maximum range allowed: ${maxRangeDays} days`;
      }
    }
    
    return null;
  };

  const handleDateChange = (date: Date) => {
    if (!range) {
      onChange?.(date);
      setRangeError(null);
      return;
    }

    const rangeValue = value as [Date, Date] | undefined | null;
    
    // If no range exists, start a new range
    if (!rangeValue || !Array.isArray(rangeValue) || rangeValue.length !== 2) {
      onChange?.([date, date]);
      setRangeError(null);
      return;
    }

    const [start, end] = rangeValue;
    const normalizedStart = startOfDay(start);
    const normalizedEnd = startOfDay(end);
    const normalizedDate = startOfDay(date);
    
    // If both dates are the same, clicking any date starts a new range
    if (isSameDay(start, end)) {
      onChange?.([date, date]);
      setRangeError(null);
      return;
    }
    
    // Determine the actual start and end (in case they're reversed)
    const actualStart = isAfter(normalizedStart, normalizedEnd) ? end : start;
    const actualEnd = isAfter(normalizedStart, normalizedEnd) ? start : end;
    const normalizedActualStart = startOfDay(actualStart);
    const normalizedActualEnd = startOfDay(actualEnd);
    
    let newStart: Date;
    let newEnd: Date;
    
    // Always allow updating the start date by clicking any date
    // If clicked date is before or equal to the current start, make it the new start
    if (isBefore(normalizedDate, normalizedActualStart) || isSameDay(normalizedDate, normalizedActualStart)) {
      newStart = date;
      newEnd = actualEnd;
    } 
    // If clicked date is after the current end, make it the new end
    else if (isAfter(normalizedDate, normalizedActualEnd)) {
      newStart = actualStart;
      newEnd = date;
    }
    // If clicked date is between start and end, update the start date
    else {
      newStart = date;
      newEnd = actualEnd;
    }
    
    // Validate the new range
    const error = validateRange(newStart, newEnd);
    setRangeError(error);
    
    if (!error) {
      onChange?.([newStart, newEnd]);
    }
  };

  const handleQuickSelect = (option: string) => {
    setActiveQuickSelect(option);
    setRangeError(null);
    const today = startOfToday();
    
    let start: Date;
    let end: Date;
    
    switch(option) {
      case 'today': {
        start = today;
        end = today;
        break;
      }
      case 'yesterday': {
        const yesterday = subDays(today, 1);
        start = yesterday;
        end = yesterday;
        break;
      }
      case 'last-7-days': {
        start = subDays(today, 6);
        end = today;
        break;
      }
      case 'last-14-days': {
        start = subDays(today, 13);
        end = today;
        break;
      }
      case 'last-30-days': {
        start = subDays(today, 29);
        end = today;
        break;
      }
      case 'this-week': {
        start = startOfWeek(today);
        end = endOfWeek(today);
        break;
      }
      case 'previous-week': {
        const lastWeekStart = subWeeks(startOfWeek(today), 1);
        start = lastWeekStart;
        end = endOfWeek(lastWeekStart);
        break;
      }
      case 'this-month': {
        start = startOfMonth(today);
        end = endOfMonth(today);
        break;
      }
      case 'previous-month': {
        const lastMonthStart = startOfMonth(subMonths(today, 1));
        start = lastMonthStart;
        end = endOfMonth(lastMonthStart);
        break;
      }
      case 'this-quarter': {
        start = getQuarterStart(today);
        end = today;
        break;
      }
      case 'previous-quarter': {
        const currentQuarterStart = getQuarterStart(today);
        const previousQuarterEnd = subDays(currentQuarterStart, 1);
        start = getQuarterStart(previousQuarterEnd);
        end = getQuarterEnd(previousQuarterEnd);
        break;
      }
      case 'this-year': {
        start = startOfYear(today);
        end = today;
        break;
      }
      case 'previous-year': {
        const lastYear = subMonths(today, 12);
        start = startOfYear(lastYear);
        end = endOfYear(lastYear);
        break;
      }
      default:
        return;
    }
    
    // Validate preset range
    const error = validateRange(start, end);
    setRangeError(error);
    
    if (!error) {
      onChange?.([start, end]);
    }
  };

  const handleDateRangeSelect = (option: string) => {
    setSelectedDateRange(option);
    setIsDropdownOpen(false);
  };

  const isQuickSelectActive = (option: string) => {
    if (activeQuickSelect === option) return true;
    
    if (!value || !Array.isArray(value) || value.length !== 2) return false;
    
    const [start, end] = value;
    const today = startOfToday();
    const normalizedStart = startOfDay(start);
    const normalizedEnd = startOfDay(end);
    
    switch(option) {
      case 'today': {
        return isSameDay(start, today) && isSameDay(end, today);
      }
      case 'yesterday': {
        const yesterday = subDays(today, 1);
        return isSameDay(start, yesterday) && isSameDay(end, yesterday);
      }
      case 'last-7-days': {
        const last7Start = subDays(today, 6);
        return isSameDay(normalizedStart, startOfDay(last7Start)) && isSameDay(normalizedEnd, today);
      }
      case 'last-14-days': {
        const last14Start = subDays(today, 13);
        return isSameDay(normalizedStart, startOfDay(last14Start)) && isSameDay(normalizedEnd, today);
      }
      case 'last-30-days': {
        const last30Start = subDays(today, 29);
        return isSameDay(normalizedStart, startOfDay(last30Start)) && isSameDay(normalizedEnd, today);
      }
      case 'this-week': {
        const weekStart = startOfWeek(today);
        const weekEnd = endOfWeek(today);
        return isSameDay(start, weekStart) && isSameDay(end, weekEnd);
      }
      case 'previous-week': {
        const lastWeekStart = subWeeks(startOfWeek(today), 1);
        const lastWeekEnd = endOfWeek(lastWeekStart);
        return isSameDay(start, lastWeekStart) && isSameDay(end, lastWeekEnd);
      }
      case 'this-month': {
        const monthStart = startOfMonth(today);
        const monthEnd = endOfMonth(today);
        return isSameDay(start, monthStart) && isSameDay(end, monthEnd);
      }
      case 'previous-month': {
        const lastMonthStart = startOfMonth(subMonths(today, 1));
        const lastMonthEnd = endOfMonth(lastMonthStart);
        return isSameDay(start, lastMonthStart) && isSameDay(end, lastMonthEnd);
      }
      case 'this-quarter': {
        const quarterStart = getQuarterStart(today);
        return isSameDay(start, quarterStart) && isSameDay(end, today);
      }
      case 'previous-quarter': {
        const currentQuarterStart = getQuarterStart(today);
        const previousQuarterEnd = subDays(currentQuarterStart, 1);
        const prevQuarterStart = getQuarterStart(previousQuarterEnd);
        const prevQuarterEnd = getQuarterEnd(previousQuarterEnd);
        return isSameDay(start, prevQuarterStart) && isSameDay(end, prevQuarterEnd);
      }
      case 'this-year': {
        const yearStart = startOfYear(today);
        return isSameDay(start, yearStart) && isSameDay(end, today);
      }
      case 'previous-year': {
        const lastYear = subMonths(today, 12);
        const yearStart = startOfYear(lastYear);
        const yearEnd = endOfYear(lastYear);
        return isSameDay(start, yearStart) && isSameDay(end, yearEnd);
      }
      default:
        return false;
    }
  };

  const renderMonth = (date: Date) => (
    <div className={cn("flex-1 flex flex-col gap-2", range ? "w-[282px] flex-shrink-0" : "w-full")}>
      <div className={monthHeaderVariants({ range })}>
        <div className="flex items-center">
          <button
            className={navigationButtonVariants({ year: true })}
            onClick={() => {
              const newDate = new Date(date);
              newDate.setFullYear(newDate.getFullYear() - 1);
              if (range) {
                if (date === currentMonth) {
                  setCurrentMonth(newDate);
                  const newSecondMonth = new Date(newDate);
                  newSecondMonth.setMonth(newSecondMonth.getMonth() + 1);
                  setSecondMonth(newSecondMonth);
                } else {
                  setSecondMonth(newDate);
                }
              } else {
                setCurrentMonth(newDate);
              }
            }}
          >
            <Icon name="backward" className="w-4 h-4" />
          </button>
          <button
            className={navigationButtonVariants()}
            onClick={() => {
              const newDate = new Date(date);
              newDate.setMonth(newDate.getMonth() - 1);
              if (range) {
                if (date === currentMonth) {
                  setCurrentMonth(newDate);
                  const newSecondMonth = new Date(newDate);
                  newSecondMonth.setMonth(newSecondMonth.getMonth() + 1);
                  setSecondMonth(newSecondMonth);
                } else {
                  setSecondMonth(newDate);
                }
              } else {
                setCurrentMonth(newDate);
              }
            }}
          >
            <Icon name="chevron-left" className="w-4 h-4" />
          </button>
        </div>
        <span className="text-sm font-medium text-primary dark:text-primary-dark">{format(date, 'MMM yyyy')}</span>
        <div className="flex items-center">
          <button
            className={navigationButtonVariants()}
            onClick={() => {
              const newDate = new Date(date);
              newDate.setMonth(newDate.getMonth() + 1);
              if (range) {
                if (date === secondMonth) {
                  setSecondMonth(newDate);
                } else {
                  setCurrentMonth(newDate);
                  setSecondMonth(new Date(newDate.getFullYear(), newDate.getMonth() + 1));
                }
              } else {
                setCurrentMonth(newDate);
              }
            }}
          >
            <Icon name="chevron-right" className="w-4 h-4" />
          </button>
          <button
            className={navigationButtonVariants({ year: true })}
            onClick={() => {
              const newDate = new Date(date);
              newDate.setFullYear(newDate.getFullYear() + 1);
              if (range) {
                if (date === secondMonth) {
                  setSecondMonth(newDate);
                } else {
                  setCurrentMonth(newDate);
                  setSecondMonth(new Date(newDate.getFullYear(), newDate.getMonth() + 1));
                }
              } else {
                setCurrentMonth(newDate);
              }
            }}
          >
            <Icon name="forward" className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className={weekDayVariants({ range })}>
        {WEEKDAYS.map((day) => (
          <div key={day} className="w-[30px] flex-shrink-0 flex items-center justify-center text-sm text-tertiary dark:text-tertiary-dark font-normal">
            {day}
          </div>
        ))}
      </div>

      <div className={dateGridVariants({ range })}>
        {getDaysInMonth(date).map((week, weekIndex) => (
          <div key={weekIndex} className="flex gap-3 items-center">
            {week.map((day, dayIndex) => {
              if (!day) {
                return <div key={`${weekIndex}-${dayIndex}`} className="w-[30px] h-[30px] flex-shrink-0" />;
              }

              const isRangeValue = value && Array.isArray(value) && value.length === 2;
              const [rangeStart, rangeEnd] = isRangeValue ? value : [null, null];
              
              // Normalize dates to start of day for comparison
              const normalizedDay = startOfDay(day);
              const normalizedStart = rangeStart ? startOfDay(rangeStart) : null;
              const normalizedEnd = rangeEnd ? startOfDay(rangeEnd) : null;
              
              // Determine which date is actually the start and which is the end
              // (in case they were passed in reverse order)
              const actualStartDate = isRangeValue && normalizedStart && normalizedEnd
                ? (isAfter(normalizedStart, normalizedEnd) ? rangeEnd : rangeStart)
                : rangeStart;
              const actualEndDate = isRangeValue && normalizedStart && normalizedEnd
                ? (isAfter(normalizedStart, normalizedEnd) ? rangeStart : rangeEnd)
                : rangeEnd;
              
              const actualStart = actualStartDate ? startOfDay(actualStartDate) : null;
              const actualEnd = actualEndDate ? startOfDay(actualEndDate) : null;
              
              const isStartDate = isRangeValue && actualStartDate && isSameDay(day, actualStartDate);
              const isEndDate = isRangeValue && actualEndDate && isSameDay(day, actualEndDate);
              const isSelected = value
                ? Array.isArray(value)
                  ? isStartDate || isEndDate
                  : isSameDay(value, day)
                : false;

              // Check if date is in range (between start and end, excluding start and end)
              // Ensure we have valid start and end dates that are different
              const hasValidRange = isRangeValue && actualStart && actualEnd && 
                                    actualStartDate && actualEndDate &&
                                    !isSameDay(actualStartDate, actualEndDate);
              
              const isInRange = hasValidRange && !isStartDate && !isEndDate
                ? (isAfter(normalizedDay, actualStart) && isBefore(normalizedDay, actualEnd))
                : false;

              // Hover preview: if hovering and we have a start date but no end date, show preview range
              let isInHoverRange = false;
              if (hoveredDate && isRangeValue && actualStartDate && !hasValidRange) {
                const hoverNormalized = startOfDay(hoveredDate);
                const startNormalized = startOfDay(actualStartDate);
                if (isAfter(hoverNormalized, startNormalized)) {
                  isInHoverRange = isAfter(normalizedDay, startNormalized) && isBefore(normalizedDay, hoverNormalized);
                } else {
                  isInHoverRange = isAfter(normalizedDay, hoverNormalized) && isBefore(normalizedDay, startNormalized);
                }
              }

              const isDisabled = (minDate && day < minDate) || (maxDate && day > maxDate);

              let dateType: 'default' | 'selected' | 'hover' | 'disabled' | 'rangeSelected' | 'rangeStart' | 'rangeEnd' = 'default';
              if (isDisabled) {
                dateType = 'disabled';
              } else if (isStartDate || isEndDate) {
                dateType = isStartDate ? 'rangeStart' : 'rangeEnd';
              } else if (isSelected && !isRangeValue) {
                dateType = 'selected';
              } else if (isInRange) {
                dateType = 'rangeSelected';
              } else if (isInHoverRange) {
                dateType = 'hover';
              }

              return (
                <button
                  key={`${weekIndex}-${dayIndex}`}
                  className={cn(
                    dateButtonVariants({
                      type: dateType
                    })
                  )}
                  onClick={() => !isDisabled && handleDateChange(day)}
                  onMouseEnter={() => !isDisabled && range && setHoveredDate(day)}
                  onMouseLeave={() => setHoveredDate(null)}
                  disabled={isDisabled}
                >
                  <span className={cn(
                    "text-sm leading-[1.4]",
                    (isStartDate || isEndDate || (isSelected && !isRangeValue)) 
                      ? "font-medium" 
                      : "font-normal"
                  )}>
                    {format(day, 'd')}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={cn(calendarVariants({ range }), className)} ref={ref}>
      {range && (
        <div className="flex flex-col gap-2.5">
          <div className="relative w-[257px]">
            <div 
              className={dropdownVariants({ open: isDropdownOpen })}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex flex-1 items-center gap-1 w-full py-3">
                <span className="flex-1 text-base font-normal leading-[1.4] text-placeholder dark:text-placeholder-dark overflow-ellipsis overflow-hidden whitespace-nowrap">{selectedDateRange}</span>
                <Icon name="chevron-down" size={16} className="text-icon dark:text-icon-dark flex-shrink-0" />
              </div>
            </div>
            <div className={dropdownMenuVariants({ open: isDropdownOpen })}>
              {["Created Date", "Modified Date", "Due Date"].map((option) => (
                <div 
                  key={option}
                  className="px-3 py-3 text-base font-normal leading-[1.4] text-primary dark:text-primary-dark hover:bg-surface-hover dark:hover:bg-surface-hover-dark cursor-pointer rounded-lg"
                  onClick={() => handleDateRangeSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="flex">
        {range && (
          <div className={quickSelectVariants({ range })}>
            {QUICK_SELECT_OPTIONS.map((option) => (
              <button
                key={option.value}
                className={cn(
                  quickSelectButtonVariants({
                    selected: isQuickSelectActive(option.value)
                  })
                )}
                onClick={() => handleQuickSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        <div className={cn("flex-1", range && "flex gap-8 h-[331px]")}>
          {renderMonth(currentMonth)}
          {range && renderMonth(secondMonth)}
        </div>
      </div>
      {rangeError && (
        <div className="w-full px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{rangeError}</p>
        </div>
      )}
      {range && (onCancel || onApply || onClear) && (
        <div className="w-full flex justify-between items-center gap-5">
          {onClear && (
            <Button variant="text" onClick={onClear} className="h-10 px-4 py-3 text-base font-medium text-primary dark:text-primary-dark">
              Clear
            </Button>
          )}
          <div className="flex gap-5 ml-auto">
            {onCancel && (
              <Button variant="text" onClick={onCancel} className="h-10 px-4 py-3 text-base font-medium">
                Cancel
              </Button>
            )}
            {onApply && (
              <Button variant="primary" onClick={onApply} className="h-10 px-4 py-3 text-base font-medium" disabled={!!rangeError}>
                Apply
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

Calendar.displayName = 'Calendar';

function getDaysInMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  
  const calendar: (Date | null)[][] = [];
  let week: (Date | null)[] = Array(startingDay).fill(null);
  
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(new Date(year, month, day));
    
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }
  
  if (week.length > 0) {
    calendar.push([...week, ...Array(7 - week.length).fill(null)]);
  }
  
  return calendar;
}

export { Calendar }; 