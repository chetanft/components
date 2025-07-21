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
  subWeeks,
  subMonths,
  format
} from 'date-fns';

interface CalendarProps {
  range?: boolean;
  value?: Date | [Date, Date] | null;
  onChange?: (date: Date | [Date, Date]) => void;
  onCancel?: () => void;
  onApply?: () => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const calendarVariants = cva(
  "bg-white dark:bg-surface-dark rounded-lg shadow-xl flex flex-col border border-border dark:border-border-dark",
  {
    variants: {
      range: {
        true: "min-w-[814px]",
        false: "min-w-[282px]"
      }
    },
    defaultVariants: {
      range: false
    }
  }
);

const monthHeaderVariants = cva(
  "flex items-center justify-between px-6 py-4 border-b border-border dark:border-border-dark",
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
  "grid grid-cols-7 gap-2 px-6 pt-4 pb-2",
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
  "grid grid-cols-7 gap-2 px-6 pb-6",
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
  "w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors",
  {
    variants: {
      type: {
        default: "bg-white text-[#434F64] hover:bg-surface-hover dark:hover:bg-surface-hover-dark",
        selected: "bg-[#434F64] text-white hover:bg-[#434F64]/90",
        disabled: "text-[#F0F1F7] cursor-not-allowed",
        rangeSelected: "bg-[#CED1D7] text-[#434F64]"
      },
      inRange: {
        true: "bg-[#CED1D7]/50",
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
  "flex flex-col border-r border-border dark:border-border-dark py-0",
  {
    variants: {
      range: {
        true: "w-[170px]",
        false: "hidden"
      }
    },
    defaultVariants: {
      range: false
    }
  }
);

const quickSelectButtonVariants = cva(
  "text-left px-4 py-3 text-sm text-input dark:text-input-dark transition-colors",
  {
    variants: {
      selected: {
        true: "bg-[#434F64] text-white",
        false: "hover:bg-[#F5F6F8] dark:hover:bg-surface-hover-dark"
      }
    },
    defaultVariants: {
      selected: false
    }
  }
);

const dropdownVariants = cva(
  "flex items-center justify-between w-full px-3 py-3 border border-border dark:border-border-dark rounded-lg cursor-pointer",
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
  "absolute z-10 w-full mt-1 bg-white dark:bg-surface-dark border border-border dark:border-border-dark rounded-lg shadow-lg overflow-hidden",
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

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const QUICK_SELECT_OPTIONS = [
  { label: 'Last week', value: 'last-week' },
  { label: 'This week', value: 'this-week' },
  { label: 'Next week', value: 'next-week' },
  { label: 'Last month', value: 'last-month' },
  { label: 'This month', value: 'this-month' },
  { label: 'Next month', value: 'next-month' }
];

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({
  range = false,
  value,
  onChange,
  onCancel,
  onApply,
  minDate,
  maxDate,
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

  const handleDateChange = (date: Date) => {
    if (!range) {
      onChange?.(date);
      return;
    }

    const rangeValue = value as [Date, Date] | undefined | null;
    if (!rangeValue || rangeValue.length === 2) {
      onChange?.([date, date]);
    } else {
      const [start] = rangeValue;
      if (date > start) {
        onChange?.([start, date]);
      } else {
        onChange?.([date, start]);
      }
    }
  };

  const handleQuickSelect = (option: string) => {
    setActiveQuickSelect(option);
    const today = new Date();
    
    switch(option) {
      case 'last-week': {
        const lastWeekStart = subWeeks(startOfWeek(today), 1);
        const lastWeekEnd = endOfWeek(lastWeekStart);
        onChange?.([lastWeekStart, lastWeekEnd]);
        break;
      }
      case 'this-week': {
        const weekStart = startOfWeek(today);
        const weekEnd = endOfWeek(today);
        onChange?.([weekStart, weekEnd]);
        break;
      }
      case 'next-week': {
        const nextWeekStart = addWeeks(startOfWeek(today), 1);
        const nextWeekEnd = endOfWeek(nextWeekStart);
        onChange?.([nextWeekStart, nextWeekEnd]);
        break;
      }
      case 'last-month': {
        const lastMonthStart = startOfMonth(subMonths(today, 1));
        const lastMonthEnd = endOfMonth(lastMonthStart);
        onChange?.([lastMonthStart, lastMonthEnd]);
        break;
      }
      case 'this-month': {
        const monthStart = startOfMonth(today);
        const monthEnd = endOfMonth(today);
        onChange?.([monthStart, monthEnd]);
        break;
      }
      case 'next-month': {
        const nextMonthStart = startOfMonth(addMonths(today, 1));
        const nextMonthEnd = endOfMonth(nextMonthStart);
        onChange?.([nextMonthStart, nextMonthEnd]);
        break;
      }
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
    const today = new Date();
    
    switch(option) {
      case 'last-week': {
        const lastWeekStart = subWeeks(startOfWeek(today), 1);
        const lastWeekEnd = endOfWeek(lastWeekStart);
        return isSameDay(start, lastWeekStart) && isSameDay(end, lastWeekEnd);
      }
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
      case 'last-month': {
        const lastMonthStart = startOfMonth(subMonths(today, 1));
        const lastMonthEnd = endOfMonth(lastMonthStart);
        return isSameDay(start, lastMonthStart) && isSameDay(end, lastMonthEnd);
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
    <div className="flex-1">
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
        <span className="text-sm font-medium">{format(date, 'MMM yyyy')}</span>
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
          <div key={day} className="h-8 flex items-center justify-center text-xs text-[#838C9D]">
            {day}
          </div>
        ))}
      </div>

      <div className={dateGridVariants({ range })}>
        {getDaysInMonth(date).map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day, dayIndex) => {
              if (!day) {
                return <div key={`${weekIndex}-${dayIndex}`} className="w-8 h-8" />;
              }

              const isSelected = value
                ? Array.isArray(value)
                  ? value.some(d => isSameDay(d, day))
                  : isSameDay(value, day)
                : false;

              const isInRange = value && Array.isArray(value) && value.length === 2
                ? day > value[0] && day < value[1]
                : false;

              const isDisabled = (minDate && day < minDate) || (maxDate && day > maxDate);

              let dateType = 'default';
              if (isDisabled) dateType = 'disabled';
              else if (isSelected) dateType = 'selected';
              else if (isInRange) dateType = 'rangeSelected';

              return (
                <button
                  key={`${weekIndex}-${dayIndex}`}
                  className={cn(
                    dateButtonVariants({
                      type: dateType as any,
                      inRange: isInRange && !isSelected
                    })
                  )}
                  onClick={() => !isDisabled && handleDateChange(day)}
                  disabled={isDisabled}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <div className={cn(calendarVariants({ range }), className)} ref={ref}>
      {range && (
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <div 
              className={dropdownVariants({ open: isDropdownOpen })}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-sm text-input dark:text-input-dark">{selectedDateRange}</span>
              <Icon name="chevron-down" size={16} className="text-input dark:text-input-dark" />
            </div>
            <div className={dropdownMenuVariants({ open: isDropdownOpen })}>
              {["Created Date", "Modified Date", "Due Date"].map((option) => (
                <div 
                  key={option}
                  className="px-4 py-3 text-sm text-input dark:text-input-dark hover:bg-[#F5F6F8] dark:hover:bg-surface-hover-dark cursor-pointer"
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
        <div className={cn("flex-1", range && "flex gap-8 px-4 py-4")}>
          {renderMonth(currentMonth)}
          {range && renderMonth(secondMonth)}
        </div>
      </div>
      {range && (onCancel || onApply) && (
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-border dark:border-border-dark">
          {onCancel && (
            <Button variant="text" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {onApply && (
            <Button variant="primary" onClick={onApply}>
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