import React, { forwardRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Button } from '../../atoms/Button/Button';
import {
  startOfToday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameDay,
  addWeeks,
  addMonths,
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
  "bg-[var(--bg-primary)] rounded-[8px] shadow-[0px_6px_6px_0px_rgba(0,0,0,0.16)] flex flex-col",
  {
    variants: {
      range: {
        true: "w-[814px] p-[16px] gap-[16px]",
        false: "w-[282px] p-[16px] gap-[16px]"
      }
    },
    defaultVariants: {
      range: false
    }
  }
);

const monthHeaderVariants = cva(
  "flex items-center justify-between px-0 py-[12px] border-b border-[var(--border-primary)]",
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
  "p-0 hover:opacity-70 transition-opacity",
  {
    variants: {
      year: {
        true: "",
        false: ""
      }
    },
    defaultVariants: {
      year: false
    }
  }
);

const weekDayVariants = cva(
  "flex gap-[12px] px-0 pt-0 pb-0",
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
  "flex flex-col gap-[12px] px-0 pb-0",
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
  "w-[30px] h-[30px] flex-shrink-0 flex flex-col items-center justify-center p-[8px] rounded-[4px] transition-colors",
  {
    variants: {
      type: {
        default: "bg-[var(--bg-primary)] text-[var(--primary)] hover:bg-[var(--border-primary)]",
        selected: "bg-[var(--border-secondary)] text-[var(--primary)]",
        hover: "bg-[var(--border-primary)] text-[var(--primary)]",
        disabled: "bg-[var(--bg-primary)] text-[var(--border-secondary)] cursor-not-allowed",
        rangeSelected: "bg-[var(--border-primary)] text-[var(--primary)]",
        rangeStart: "bg-[var(--border-secondary)] text-[var(--primary)]",
        rangeEnd: "bg-[var(--border-secondary)] text-[var(--primary)]"
      },
      inRange: {
        true: "bg-[var(--border-primary)]",
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
  "flex flex-col border-r border-[var(--border-primary)] py-0 overflow-y-auto gap-[8px]",
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
  "text-left px-[12px] py-[12px] text-[16px] font-normal leading-[1.4] text-[var(--primary)] transition-colors rounded-[8px]",
  {
    variants: {
      selected: {
        true: "bg-[var(--bg-primary)]",
        false: "bg-[var(--bg-primary)] hover:bg-[var(--border-secondary)]"
      }
    },
    defaultVariants: {
      selected: false
    }
  }
);

const dropdownVariants = cva(
  "flex items-center justify-between w-full h-[40px] min-h-[40px] px-[12px] py-[20px] border border-[var(--border-primary)] rounded-[8px] cursor-pointer bg-[var(--bg-primary)]",
  {
    variants: {
      open: {
        true: "border-[var(--primary)]",
        false: "hover:border-[var(--primary)]"
      }
    },
    defaultVariants: {
      open: false
    }
  }
);

const dropdownMenuVariants = cva(
  "absolute z-[10000] w-full mt-[4px] bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-[8px] shadow-lg overflow-hidden",
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

const QUICK_SELECT_OPTIONS = [
  { label: 'This week', value: 'this-week' },
  { label: 'Next week', value: 'next-week' },
  { label: 'This month', value: 'this-month' },
  { label: 'Next month', value: 'next-month' }
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

    switch (option) {
      case 'this-week': {
        start = startOfWeek(today);
        end = endOfWeek(today);
        break;
      }
      case 'next-week': {
        const nextWeekStart = addWeeks(startOfWeek(today), 1);
        start = nextWeekStart;
        end = endOfWeek(nextWeekStart);
        break;
      }
      case 'this-month': {
        start = startOfMonth(today);
        end = endOfMonth(today);
        break;
      }
      case 'next-month': {
        const nextMonthStart = startOfMonth(addMonths(today, 1));
        start = nextMonthStart;
        end = endOfMonth(nextMonthStart);
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

    switch (option) {
      case 'this-week': {
        const weekStart = startOfWeek(today);
        const weekEnd = endOfWeek(today);
        return isSameDay(start, weekStart) && isSameDay(end, weekEnd);
      }
      case 'next-week': {
        const nextWeekStart = addWeeks(startOfWeek(today), 1);
        const nextWeekEnd = endOfWeek(nextWeekStart);
        return isSameDay(start, nextWeekStart) && isSameDay(end, nextWeekEnd);
      }
      case 'this-month': {
        const monthStart = startOfMonth(today);
        const monthEnd = endOfMonth(today);
        return isSameDay(start, monthStart) && isSameDay(end, monthEnd);
      }
      case 'next-month': {
        const nextMonthStart = startOfMonth(addMonths(today, 1));
        const nextMonthEnd = endOfMonth(nextMonthStart);
        return isSameDay(start, nextMonthStart) && isSameDay(end, nextMonthEnd);
      }
      default:
        return false;
    }
  };

  const renderMonth = (date: Date) => (
    <div className={cn("flex-1 flex flex-col gap-[8px]", range ? "w-[282px] flex-shrink-0" : "w-full")}>
      <div className={monthHeaderVariants({ range })}>
        <div className="flex items-center gap-[8px]">
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
            <Icon name="backward" className="w-4 h-4 text-[var(--primary)]" />
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
            <Icon name="chevron-left" className="w-4 h-4 text-[var(--primary)]" />
          </button>
        </div>
        <span className="text-[14px] font-medium text-[var(--primary)]">{format(date, 'MMM yyyy')}</span>
        <div className="flex items-center gap-[8px]">
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
            <Icon name="chevron-right" className="w-4 h-4 text-[var(--primary)]" />
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
            <Icon name="forward" className="w-4 h-4 text-[var(--primary)] rotate-180" />
          </button>
        </div>
      </div>

      <div className={weekDayVariants({ range })}>
        {WEEKDAYS.map((day) => (
          <div key={day} className="w-[30px] flex-shrink-0 flex flex-col items-center justify-center p-[8px] text-[14px] text-[var(--tertiary)] font-normal">
            {day}
          </div>
        ))}
      </div>

      <div className={dateGridVariants({ range })}>
        {getDaysInMonth(date).map((week, weekIndex) => (
          <div key={weekIndex} className="flex gap-[12px] items-center">
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
                    "text-[14px] leading-[1.4]",
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
        <div className="flex flex-col gap-[10px]">
          <div className="relative w-[257px]">
            <div
              className={dropdownVariants({ open: isDropdownOpen })}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex flex-1 items-center gap-[4px] w-full">
                <span className="flex-1 text-[16px] font-normal leading-[1.4] text-[var(--tertiary)] overflow-ellipsis overflow-hidden whitespace-nowrap">{selectedDateRange}</span>
                <Icon name="chevron-down" size={16} className="text-[var(--primary)] flex-shrink-0" />
              </div>
            </div>
            <div className={dropdownMenuVariants({ open: isDropdownOpen })}>
              {["Created Date", "Modified Date", "Due Date"].map((option) => (
                <div
                  key={option}
                  className="px-[12px] py-[12px] text-[16px] font-normal leading-[1.4] text-[var(--primary)] hover:bg-[var(--border-secondary)] cursor-pointer rounded-[8px]"
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
        <div className={cn("flex-1", range && "flex gap-[32px] h-[331px]")}>
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
        <div className="w-full flex justify-end items-center gap-[20px]">
          {onCancel && (
            <Button variant="text" onClick={onCancel} className="h-[40px] px-[16px] py-[12px] text-[16px] font-medium text-[var(--primary)]">
              Cancel
            </Button>
          )}
          {onApply && (
            <Button variant="primary" onClick={onApply} className="h-[40px] px-[16px] py-[12px] text-[16px] font-medium bg-[var(--primary)] text-[var(--bg-primary)]" disabled={!!rangeError}>
              Apply
            </Button>
          )}
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