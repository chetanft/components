import React, { forwardRef, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, getComponentStyles, type ComponentSize } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Label } from '../../atoms/Label/Label';
import { Calendar } from './Calendar';
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

// Utility function to omit specific props
const omitProps = <T extends Record<string, any>, K extends (keyof T)[]>(
  obj: T,
  keys: K
): Omit<T, K[number]> => {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
};

// Date picker field variants using unified design system
const datePickerFieldVariants = cva(
  "relative flex items-center gap-2 border transition-all duration-200 font-sans font-normal bg-surface dark:bg-surface-dark",
  {
    variants: {
      size: {
        xxs: "h-component-xxs text-xs",
        xs: "h-component-xs text-xs",
        sm: "h-component-sm text-sm",
        md: "h-component-md text-sm",
        lg: "h-component-lg text-base",
        xl: "h-component-xl text-base",
        xxl: "h-component-xxl text-lg",
        // Legacy support - will be removed in future version
        m: "h-component-md text-sm",
        l: "h-component-lg text-base",
      },
      state: {
        default: "border-border dark:border-border-dark hover:border-border-hover dark:hover:border-border-hover-dark",
        filled: "border-border dark:border-border-dark",
        disabled: "border-border-disabled dark:border-border-disabled-dark bg-surface-disabled dark:bg-surface-disabled-dark cursor-not-allowed",
        focused: "border-primary dark:border-primary-dark",
        prefilled: "border-border dark:border-border-dark",
        hover: "border-border dark:border-border-dark",
        typing: "border-border dark:border-border-dark"
      }
    },
    defaultVariants: {
      size: "m",
      state: "default"
    }
  }
);

// Text input variants using unified design system
const inputTextVariants = cva(
  "flex-1 border-0 bg-transparent outline-none font-sans font-normal",
  {
    variants: {
      state: {
        default: "text-input dark:text-input-dark placeholder:text-placeholder dark:placeholder:text-placeholder-dark",
        filled: "text-input dark:text-input-dark",
        disabled: "text-input-disabled dark:text-input-disabled-dark cursor-not-allowed",
        prefilled: "text-input dark:text-input-dark",
        hover: "text-input dark:text-input-dark",
        focused: "text-input dark:text-input-dark", 
        typing: "text-input dark:text-input-dark"
      }
    },
    defaultVariants: {
      state: "default"
    }
  }
);

// Icons handled inline using unified Icon component

export interface DatePickerFieldProps extends VariantProps<typeof datePickerFieldVariants>, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'onFocus' | 'onBlur'> {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  showTime?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const DatePickerField = forwardRef<HTMLInputElement, DatePickerFieldProps>(
  ({ size = "m", state = "default", value, placeholder = "Value", disabled, showTime, className, onChange, onFocus, onBlur, ...props }, ref) => {
    // Map DatePicker legacy size to unified component styles
    const componentSize: ComponentSize = 
      size === "m" ? "md" : 
      size === "l" ? "lg" : 
      size === "xl" ? "xxl" : 
      size as ComponentSize; // Allow direct ComponentSize values (xs, sm, md, lg, xl, xxl)
    const componentStyles = getComponentStyles(componentSize);
    
    const iconColor = state === "disabled" 
      ? "text-input-disabled dark:text-input-disabled-dark" 
      : "text-icon dark:text-icon-dark";
    
    return (
      <div className={cn(
        datePickerFieldVariants({ size, state }),
        componentStyles.borderRadius,
        "px-3",
        className
      )}>
        <input
          ref={ref}
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(inputTextVariants({ state }))}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />
        {showTime ? (
          <Icon 
            name="clock" 
            size={16}
            className={cn(iconColor, "flex-shrink-0")} 
          />
        ) : (
          <Icon 
            name="calendar" 
            size={16}
            className={cn(iconColor, "flex-shrink-0")} 
          />
        )}
      </div>
    );
  }
);

DatePickerField.displayName = "DatePickerField";

// Using unified Label component from atoms

// Main DatePicker component
export interface DatePickerProps extends VariantProps<typeof datePickerFieldVariants> {
  label?: string;
  labelPosition?: 'top' | 'left';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  showTime?: boolean;
  range?: boolean;
  startValue?: string;
  endValue?: string;
  onStartChange?: (value: string) => void;
  onEndChange?: (value: string) => void;
  className?: string;
  includeDropdown?: boolean;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({
  label,
  labelPosition = 'top',
  placeholder,
  value,
  onChange,
  disabled,
  error,
  showTime,
  range,
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  size = 'm',
  className,
  includeDropdown = false
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(startValue ? new Date(startValue) : null);
  const [endDate, setEndDate] = useState<Date | null>(endValue ? new Date(endValue) : null);
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string | null>(null);

  // Create portal container on mount
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof document !== 'undefined') {
      // Look for existing container or create one
      let container = document.getElementById('datepicker-portal-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'datepicker-portal-container';
        container.style.position = 'relative';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
      }
      setPortalContainer(container);
      
      // Cleanup on unmount
      return () => {
        try {
          if (container && container.parentNode && container.childNodes.length === 0) {
            container.parentNode.removeChild(container);
          }
        } catch (error) {
          console.error('Error removing datepicker portal container:', error);
        }
      };
    }
  }, []);

  // Create a value array for the Calendar component when in range mode
  const calendarValue = range && startDate 
    ? (endDate ? [startDate, endDate] as [Date, Date] : [startDate, startDate] as [Date, Date])
    : startDate;

  // Calculate calendar position when it opens
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      
      // Check if we have enough space below for the calendar
      const top = rect.bottom + window.scrollY + 8;
      
      // Check if we have enough space to the right for the calendar
      // For range picker, we need more space
      const calendarWidth = range ? 814 : 282;
      let left = rect.left + window.scrollX;
      
      // If not enough space to the right, align to the right edge of the screen with some padding
      if (left + calendarWidth > window.innerWidth) {
        left = Math.max(10, window.innerWidth - calendarWidth - 10);
      }
      
      setCalendarPosition({ top, left });
    }
  }, [isOpen, range]);

  const handleDateChange = (date: Date | [Date, Date]) => {
    if (Array.isArray(date)) {
      // Handle range selection
      setStartDate(date[0]);
      setEndDate(date[1]);
      
      if (onStartChange) {
        onStartChange(date[0].toISOString());
      }
      
      if (onEndChange) {
        onEndChange(date[1].toISOString());
      }
      
      // Update dropdown selection if applicable
      const today = new Date();
      const weekStart = startOfWeek(today);
      const weekEnd = endOfWeek(today);
      const nextWeekStart = addWeeks(weekStart, 1);
      const nextWeekEnd = endOfWeek(nextWeekStart);
      const lastWeekStart = subWeeks(weekStart, 1);
      const lastWeekEnd = endOfWeek(lastWeekStart);
      const monthStart = startOfMonth(today);
      const monthEnd = endOfMonth(today);
      const nextMonthStart = startOfMonth(addMonths(today, 1));
      const nextMonthEnd = endOfMonth(nextMonthStart);
      const lastMonthStart = startOfMonth(subMonths(today, 1));
      const lastMonthEnd = endOfMonth(lastMonthStart);
      
      if (isSameDay(date[0], lastWeekStart) && isSameDay(date[1], lastWeekEnd)) {
        setSelectedDropdownValue('Last week');
      } else if (isSameDay(date[0], weekStart) && isSameDay(date[1], weekEnd)) {
        setSelectedDropdownValue('This week');
      } else if (isSameDay(date[0], nextWeekStart) && isSameDay(date[1], nextWeekEnd)) {
        setSelectedDropdownValue('Next week');
      } else if (isSameDay(date[0], lastMonthStart) && isSameDay(date[1], lastMonthEnd)) {
        setSelectedDropdownValue('Last month');
      } else if (isSameDay(date[0], monthStart) && isSameDay(date[1], monthEnd)) {
        setSelectedDropdownValue('This month');
      } else if (isSameDay(date[0], nextMonthStart) && isSameDay(date[1], nextMonthEnd)) {
        setSelectedDropdownValue('Next month');
      } else {
        setSelectedDropdownValue(null);
      }
    } else {
      // Handle single date selection
      setStartDate(date);
      
      if (onChange) {
        onChange(date.toISOString());
      }
      
      // Close the calendar when a single date is selected
      if (!range) {
        setIsOpen(false);
      }
    }
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setStartDate(startValue ? new Date(startValue) : null);
    setEndDate(endValue ? new Date(endValue) : null);
    setIsOpen(false);
  };

  // Close the calendar when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click was inside the input container
      const isClickInsideContainer = containerRef.current && 
        containerRef.current.contains(event.target as Node);
      
      // Check if the click was inside the calendar
      const portalElement = document.getElementById('datepicker-portal-container');
      const isClickInsidePortal = portalElement && 
        portalElement.contains(event.target as Node);
      
      // Close only if click was outside both the input and calendar
      if (!isClickInsideContainer && !isClickInsidePortal) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const fieldState = disabled ? 'disabled' : error || isOpen ? 'focused' : 'default';

  // Format display value based on selected dropdown or date range
  const getDisplayValue = () => {
    if (selectedDropdownValue) {
      return selectedDropdownValue;
    }
    
    if (range) {
      if (startValue && endValue) {
        const startDate = new Date(startValue);
        const endDate = new Date(endValue);
        return `${startDate.toLocaleDateString()} → ${endDate.toLocaleDateString()}`;
      }
      return '';
    }
    
    return value || '';
  };

  return (
    <div className={cn(
      "flex",
      labelPosition === 'left' ? "flex-row items-center gap-4" : "flex-col items-start gap-2",
      className
    )}>
      {label && (
        <Label>
          {label}
        </Label>
      )}
      <div className="relative" ref={containerRef}>
        <div
          className={cn(
            datePickerFieldVariants({ size, state: fieldState }),
            "rounded-lg px-3 min-w-[320px] cursor-pointer"
          )}
          onClick={() => !disabled && setIsOpen(true)}
        >
          <input
            ref={ref}
            type="text"
            value={getDisplayValue()}
            placeholder={range ? (showTime ? "Start date & time → End date & time" : "Start date → End date") : placeholder}
            disabled={disabled}
            readOnly
            className="w-full bg-transparent border-none outline-none text-input dark:text-input-dark placeholder:text-input-muted dark:placeholder:text-input-muted-dark cursor-pointer"
          />
          <Icon 
            name={includeDropdown ? "chevron-down" : "calendar"} 
            size={16} 
            className="text-input dark:text-input-dark flex-shrink-0" 
          />
        </div>
        {isOpen && !disabled && portalContainer && ReactDOM.createPortal(
          <>
            {/* Semi-transparent backdrop */}
            <div 
              className="fixed inset-0 bg-black/5 z-[9998]" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Calendar */}
            <div 
              className="fixed z-[9999]" 
              style={{ 
                top: calendarPosition.top, 
                left: calendarPosition.left 
              }}
            >
              <Calendar
                ref={calendarRef}
                range={range}
                value={calendarValue}
                onChange={handleDateChange}
                onCancel={handleCancel}
                onApply={handleApply}
              />
            </div>
          </>,
          portalContainer
        )}
      </div>
    </div>
  );
});

DatePicker.displayName = "DatePicker";

export default DatePicker; 