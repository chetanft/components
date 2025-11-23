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
  format,
  parse,
  isValid
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
  "relative flex items-center border transition-all duration-200 font-sans font-normal bg-surface dark:bg-surface-dark box-border",
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
  // Map DatePicker legacy size to unified component styles
  const componentSize: ComponentSize = 
    size === "m" ? "md" : 
    size === "l" ? "lg" : 
    size === "xl" ? "xxl" : 
    size as ComponentSize;
  const componentStyles = getComponentStyles(componentSize);
  
  // Size-specific vertical padding for inner content
  const verticalPaddingMap: Record<ComponentSize, string> = {
    xxs: "py-0.5",
    xs: "py-1",
    sm: "py-2",
    md: "py-3",
    lg: "py-4",
    xl: "py-5",
    xxl: "py-6"
  };
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(startValue ? new Date(startValue) : null);
  const [endDate, setEndDate] = useState<Date | null>(endValue ? new Date(endValue) : null);
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [startInputValue, setStartInputValue] = useState<string>('');
  const [endInputValue, setEndInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Create portal container on mount
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof document !== 'undefined') {
      // Look for existing container or create one
      let container = document.getElementById('datepicker-portal-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'datepicker-portal-container';
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

  // Parse date from various formats (MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD, etc.)
  const parseDateInput = (input: string): Date | null => {
    if (!input || input.trim() === '') return null;
    
    const trimmed = input.trim();
    
    // Try common formats
    const formats = [
      'MM/dd/yyyy',
      'dd/MM/yyyy',
      'yyyy-MM-dd',
      'MM-dd-yyyy',
      'dd-MM-yyyy',
      'M/d/yyyy',
      'd/M/yyyy',
      'yyyy/M/d',
      'M/d/yy',
      'd/M/yy'
    ];
    
    for (const fmt of formats) {
      try {
        const parsed = parse(trimmed, fmt, new Date());
        if (isValid(parsed)) {
          return parsed;
        }
      } catch {
        continue;
      }
    }
    
    // Fallback to native Date parsing
    try {
      const nativeDate = new Date(trimmed);
      if (isValid(nativeDate) && !isNaN(nativeDate.getTime())) {
        return nativeDate;
      }
    } catch {
      // Invalid date
    }
    
    return null;
  };

  // Sync value prop with internal state for single date
  useEffect(() => {
    if (value && !range && !isTyping) {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          setStartDate(date);
          setInputValue(date.toLocaleDateString());
        }
      } catch {
        // Invalid date, ignore
      }
    }
  }, [value, range, isTyping]);

  // Sync startValue and endValue props with internal state for range
  useEffect(() => {
    if (range && !isTyping) {
      if (startValue) {
        try {
          const date = new Date(startValue);
          if (!isNaN(date.getTime())) {
            setStartDate(date);
            setStartInputValue(date.toLocaleDateString());
          }
        } catch {
          // Invalid date, ignore
        }
      } else {
        setStartInputValue('');
      }
      if (endValue) {
        try {
          const date = new Date(endValue);
          if (!isNaN(date.getTime())) {
            setEndDate(date);
            setEndInputValue(date.toLocaleDateString());
          }
        } catch {
          // Invalid date, ignore
        }
      } else {
        setEndInputValue('');
      }
    }
  }, [startValue, endValue, range, isTyping]);

  // Create a value array for the Calendar component when in range mode
  const calendarValue = range && startDate 
    ? (endDate ? [startDate, endDate] as [Date, Date] : [startDate, startDate] as [Date, Date])
    : startDate;

  // Calculate calendar position when it opens
  useEffect(() => {
    const updateCalendarPosition = () => {
      if (isOpen && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        
        // Position calendar below the input field (using viewport coordinates for fixed positioning)
        const top = rect.bottom + 8;
        
        // Check if we have enough space to the right for the calendar
        // For range picker, we need more space
        // Single calendar: 314px (282px content + 32px padding)
        const calendarWidth = range ? 814 : 314;
        let left = rect.left;
        
        // If not enough space to the right, align to the right edge of the screen with some padding
        if (left + calendarWidth > window.innerWidth) {
          left = Math.max(10, window.innerWidth - calendarWidth - 10);
        }
        
        // If not enough space below, position above
        const calendarHeight = range ? 400 : 350;
        const finalTop = spaceBelow < calendarHeight 
          ? rect.top - calendarHeight - 8
          : top;
        
        setCalendarPosition({ top: finalTop, left });
      }
    };

    updateCalendarPosition();
    
    // Recalculate on scroll and resize
    window.addEventListener('scroll', updateCalendarPosition, true);
    window.addEventListener('resize', updateCalendarPosition);
    
    return () => {
      window.removeEventListener('scroll', updateCalendarPosition, true);
      window.removeEventListener('resize', updateCalendarPosition);
    };
  }, [isOpen, range]);

  const handleDateChange = (date: Date | [Date, Date]) => {
    if (Array.isArray(date)) {
      // Handle range selection
      setStartDate(date[0]);
      setEndDate(date[1]);
      setStartInputValue(date[0].toLocaleDateString());
      setEndInputValue(date[1].toLocaleDateString());
      setIsTyping(false);
      
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
      setInputValue(date.toLocaleDateString());
      setIsTyping(false);
      
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

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedDropdownValue(null);
    if (onStartChange) {
      onStartChange('');
    }
    if (onEndChange) {
      onEndChange('');
    }
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

  // Handle single date input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsTyping(true);
    setInputError(null);
    
    if (newValue.trim() === '') {
      setStartDate(null);
      if (onChange) {
        onChange('');
      }
      return;
    }
    
    const parsedDate = parseDateInput(newValue);
    if (parsedDate) {
      setStartDate(parsedDate);
      setInputError(null);
      if (onChange) {
        onChange(parsedDate.toISOString());
      }
    }
  };

  // Handle single date input blur
  const handleInputBlur = () => {
    setIsTyping(false);
    if (inputValue.trim() === '') {
      setInputValue('');
      setInputError(null);
      return;
    }
    
    const parsedDate = parseDateInput(inputValue);
    if (parsedDate) {
      setInputValue(parsedDate.toLocaleDateString());
      setInputError(null);
    } else {
      setInputError('Invalid date format');
      // Revert to last valid date
      if (startDate) {
        setInputValue(startDate.toLocaleDateString());
      } else {
        setInputValue('');
      }
    }
  };

  // Handle range start date input change
  const handleStartInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setStartInputValue(newValue);
    setIsTyping(true);
    setInputError(null);
    
    if (newValue.trim() === '') {
      setStartDate(null);
      if (onStartChange) {
        onStartChange('');
      }
      return;
    }
    
    const parsedDate = parseDateInput(newValue);
    if (parsedDate) {
      setStartDate(parsedDate);
      setInputError(null);
      if (onStartChange) {
        onStartChange(parsedDate.toISOString());
      }
      // Clear preset selection when manually typing
      setSelectedDropdownValue(null);
    }
  };

  // Handle range start date input blur
  const handleStartInputBlur = () => {
    setIsTyping(false);
    if (startInputValue.trim() === '') {
      setStartInputValue('');
      setInputError(null);
      return;
    }
    
    const parsedDate = parseDateInput(startInputValue);
    if (parsedDate) {
      setStartInputValue(parsedDate.toLocaleDateString());
      setInputError(null);
    } else {
      setInputError('Invalid start date format');
      if (startDate) {
        setStartInputValue(startDate.toLocaleDateString());
      } else {
        setStartInputValue('');
      }
    }
  };

  // Handle range end date input change
  const handleEndInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEndInputValue(newValue);
    setIsTyping(true);
    setInputError(null);
    
    if (newValue.trim() === '') {
      setEndDate(null);
      if (onEndChange) {
        onEndChange('');
      }
      return;
    }
    
    const parsedDate = parseDateInput(newValue);
    if (parsedDate) {
      setEndDate(parsedDate);
      setInputError(null);
      if (onEndChange) {
        onEndChange(parsedDate.toISOString());
      }
      // Clear preset selection when manually typing
      setSelectedDropdownValue(null);
    }
  };

  // Handle range end date input blur
  const handleEndInputBlur = () => {
    setIsTyping(false);
    if (endInputValue.trim() === '') {
      setEndInputValue('');
      setInputError(null);
      return;
    }
    
    const parsedDate = parseDateInput(endInputValue);
    if (parsedDate) {
      setEndInputValue(parsedDate.toLocaleDateString());
      setInputError(null);
    } else {
      setInputError('Invalid end date format');
      if (endDate) {
        setEndInputValue(endDate.toLocaleDateString());
      } else {
        setEndInputValue('');
      }
    }
  };

  const fieldState = disabled ? 'disabled' : error || inputError || isOpen ? 'focused' : 'default';

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
            componentStyles.borderRadius,
            "px-3 min-w-[320px]",
            !range ? "cursor-pointer" : ""
          )}
          onClick={() => !disabled && !range && setIsOpen(true)}
        >
          <div className={cn("flex flex-1 items-center gap-1 w-full", verticalPaddingMap[componentSize])}>
            {range ? (
              <>
                <input
                  type="text"
                  value={isTyping ? startInputValue : (startDate ? startDate.toLocaleDateString() : startInputValue)}
                  placeholder="MM/DD/YYYY"
                  disabled={disabled}
                  onChange={handleStartInputChange}
                  onBlur={handleStartInputBlur}
                  onFocus={() => setIsTyping(true)}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "flex-1 bg-transparent border-none outline-none text-base font-normal leading-[1.4]",
                    startDate || startInputValue
                      ? "text-input dark:text-input-dark" 
                      : "text-placeholder dark:text-placeholder-dark",
                    "placeholder:text-placeholder dark:placeholder:text-placeholder-dark"
                  )}
                />
                <span className="text-base font-normal leading-[1.4] text-placeholder dark:text-placeholder-dark">
                  →
                </span>
                <input
                  type="text"
                  value={isTyping ? endInputValue : (endDate ? endDate.toLocaleDateString() : endInputValue)}
                  placeholder="MM/DD/YYYY"
                  disabled={disabled}
                  onChange={handleEndInputChange}
                  onBlur={handleEndInputBlur}
                  onFocus={() => setIsTyping(true)}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "flex-1 bg-transparent border-none outline-none text-base font-normal leading-[1.4]",
                    endDate || endInputValue
                      ? "text-input dark:text-input-dark" 
                      : "text-placeholder dark:text-placeholder-dark",
                    "placeholder:text-placeholder dark:placeholder:text-placeholder-dark"
                  )}
                />
              </>
            ) : (
              <input
                ref={ref}
                type="text"
                value={isTyping ? inputValue : (startDate ? startDate.toLocaleDateString() : inputValue)}
                placeholder={placeholder?.replace(/\\$/, '') || "MM/DD/YYYY"}
                disabled={disabled}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={() => {
                  setIsTyping(true);
                  setIsOpen(true);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                className="flex-1 bg-transparent border-none outline-none text-base font-normal leading-[1.4] text-input dark:text-input-dark placeholder:text-placeholder dark:placeholder:text-placeholder-dark"
              />
            )}
            <button
              type="button"
              onClick={() => !disabled && setIsOpen(true)}
              className={cn(
                "flex-shrink-0 cursor-pointer",
                disabled && "cursor-not-allowed"
              )}
              disabled={disabled}
            >
              <Icon 
                name={includeDropdown ? "chevron-down" : "calendar"} 
                size={16} 
                className={cn(
                  disabled 
                    ? "text-input-disabled dark:text-input-disabled-dark" 
                    : "text-icon dark:text-icon-dark"
                )}
              />
            </button>
          </div>
        </div>
        {inputError && (
          <div className="absolute top-full left-0 mt-1 px-2 py-1 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-xs text-red-600 dark:text-red-400 z-10">
            {inputError}
          </div>
        )}
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
                onClear={range ? handleClear : undefined}
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