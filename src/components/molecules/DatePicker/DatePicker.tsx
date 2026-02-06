"use client";
import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, getComponentStyles, type ComponentSize } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Label } from '../../atoms/Label/Label';
import { Calendar, type QuickSelectOption } from './Calendar';
import { DatePickerProvider } from './DatePickerContext';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameDay,
  addWeeks,
  addMonths,
  subWeeks,
  subMonths,
  parse,
  isValid
} from 'date-fns';

const getSpacingValue = (token: string, fallback: number): number => {
  if (typeof window === 'undefined') {
    return fallback;
  }
  const rawValue = window.getComputedStyle(document.documentElement).getPropertyValue(token);
  const parsed = parseFloat(rawValue);
  return Number.isNaN(parsed) ? fallback : parsed;
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
        default: "border-border dark:border-border-dark hover:border-[var(--color-primary)] dark:hover:border-[var(--color-primary)]",
        filled: "border-border dark:border-border-dark",
        disabled: "border-border-disabled dark:border-border-disabled-dark bg-surface-disabled dark:bg-surface-disabled-dark cursor-not-allowed",
        focused: "border-primary dark:border-primary-dark",
        prefilled: "border-border dark:border-border-dark",
        hover: "border-[var(--color-primary)] dark:border-[var(--color-primary)]",
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
        default: "text-[var(--primary)] dark:text-[var(--primary)] placeholder:text-placeholder dark:placeholder:text-placeholder-dark",
        filled: "text-[var(--primary)] dark:text-[var(--primary)]",
        disabled: "text-input-disabled dark:text-input-disabled-dark cursor-not-allowed",
        prefilled: "text-[var(--primary)] dark:text-[var(--primary)]",
        hover: "text-[var(--primary)] dark:text-[var(--primary)]",
        focused: "text-[var(--primary)] dark:text-[var(--primary)]",
        typing: "text-[var(--primary)] dark:text-[var(--primary)]"
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
        "px-[var(--spacing-x3)]",
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
/**
 * DatePicker component props
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Single date picker
 * <DatePicker
 *   label="Select Date"
 *   value={date}
 *   onChange={(value) => setDate(value)}
 * />
 * 
 * // Date range picker
 * <DatePicker
 *   range
 *   startValue={startDate}
 *   endValue={endDate}
 *   onStartChange={setStartDate}
 *   onEndChange={setEndDate}
 * />
 * ```
 */
export interface DatePickerProps extends VariantProps<typeof datePickerFieldVariants> {
  /**
   * Label text displayed above or beside the input (for declarative API)
   * @deprecated Use Label component with composable API
   */
  label?: string;
  
  /**
   * Label position relative to input
   * @default 'top'
   */
  labelPosition?: 'top' | 'left';
  
  /**
   * Placeholder text when no date is selected
   */
  placeholder?: string;
  
  /**
   * Selected date value (ISO string format)
   * Controlled component value
   */
  value?: string;
  
  /**
   * Callback when date changes
   * @param value - Selected date as ISO string
   */
  onChange?: (value: string) => void;
  
  /**
   * Disable the date picker
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Show error state styling
   * @default false
   */
  error?: boolean;
  
  /**
   * Show time picker (not currently implemented)
   * @default false
   * @deprecated Time picker functionality not yet available
   */
  showTime?: boolean;
  
  /**
   * Enable date range selection
   * @default false
   */
  range?: boolean;
  
  /**
   * Start date value for range picker (ISO string)
   */
  startValue?: string;
  
  /**
   * End date value for range picker (ISO string)
   */
  endValue?: string;
  
  /**
   * Callback when start date changes
   * @param value - Start date as ISO string
   */
  onStartChange?: (value: string) => void;
  
  /**
   * Callback when end date changes
   * @param value - End date as ISO string
   */
  onEndChange?: (value: string) => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Include dropdown calendar picker
   * @default false
   */
  includeDropdown?: boolean;

  /**
   * Preset options shown in the range dropdown menu
   */
  dropdownPresets?: string[];
  /**
   * Callback when dropdown preset changes (range mode only).
   */
  onDropdownPresetChange?: (preset: string) => void;

  /**
   * CSS class applied to the portal container wrapping the calendar popup
   */
  portalClassName?: string;

  /**
   * Inline styles applied to the portal container
   */
  portalStyle?: React.CSSProperties;

  /**
   * Override the portal container element ID (defaults to 'datepicker-portal-container')
   */
  portalContainerId?: string;
  
  /**
   * Quick select options shown in the left sidebar (range mode only)
   * @default [{ label: 'This week', value: 'this-week' }, { label: 'Next week', value: 'next-week' }, { label: 'This month', value: 'this-month' }, { label: 'Next month', value: 'next-month' }]
   * Use `getRange` to provide custom date ranges.
   */
  quickSelectOptions?: QuickSelectOption[];
  
  /**
   * DatePicker content (for composable API)
   */
  children?: React.ReactNode;
}

/**
 * DatePicker Component
 * 
 * A complete date selection component with calendar popup and optional range selection.
 * Supports single date and date range picking with keyboard navigation.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Simple single date picker
 * <DatePicker
 *   label="Select Date"
 *   value={date}
 *   onChange={setDate}
 *   placeholder="Choose a date"
 * />
 * 
 * // Date range picker
 * <DatePicker
 *   label="Select Range"
 *   range
 *   startValue={startDate}
 *   endValue={endDate}
 *   onStartChange={setStartDate}
 *   onEndChange={setEndDate}
 * />
 * ```
 * 
 * @remarks
 * - Calendar popup opens on focus or click
 * - Supports keyboard navigation (arrow keys, Enter, Escape)
 * - Date range mode allows selecting start and end dates
 * - Accessible: includes ARIA labels and keyboard support
 * - DatePicker manages all internals - sub-components (DatePickerInput, etc.) are internal only
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({
  label,
  labelPosition = 'top',
  placeholder,
  value,
  onChange,
  disabled,
  error,
  showTime: _showTime,
  range,
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  size = 'm',
  className,
  includeDropdown = false,
  dropdownPresets,
  onDropdownPresetChange,
  portalClassName,
  portalStyle,
  portalContainerId,
  quickSelectOptions,
  children
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
    xxs: "py-[2px]",
    xs: "py-[var(--spacing-x1)]",
    sm: "py-[var(--spacing-x2)]",
    md: "py-[var(--spacing-x3)]",
    lg: "py-[var(--spacing-x4)]",
    xl: "py-[var(--spacing-x5)]",
    xxl: "py-[var(--spacing-x6)]"
  };
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(startValue ? new Date(startValue) : null);
  const [endDate, setEndDate] = useState<Date | null>(endValue ? new Date(endValue) : null);
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [_selectedDropdownValue, setSelectedDropdownValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [startInputValue, setStartInputValue] = useState<string>('');
  const [endInputValue, setEndInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Create portal container on mount
  const resolvedPortalId = portalContainerId ?? 'datepicker-portal-container';

  useEffect(() => {
    if (typeof document === 'undefined') return;

    let container = document.getElementById(resolvedPortalId);
    let created = false;
    if (!container) {
      container = document.createElement('div');
      container.id = resolvedPortalId;
      document.body.appendChild(container);
      created = true;
    }
    setPortalContainer(container);

    return () => {
      if (created && container && container.parentNode && container.childNodes.length === 0) {
        container.parentNode.removeChild(container);
      }
    };
  }, [resolvedPortalId]);

  // Format date consistently
  const formatDateForDisplay = useCallback((date: Date | null): string => {
    if (!date) return '';
    try {
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      // Fallback to manual formatting if locale formatting fails
      try {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
      } catch {
        return '';
      }
    }
  }, []);

  // Parse date from various formats (DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, etc.)
  const parseDateInput = useCallback((input: string): Date | null => {
    if (!input || input.trim() === '') return null;

    const trimmed = input.trim();

    // Try common formats
    const formats = [
      'dd/MM/yyyy',
      'MM/dd/yyyy',
      'yyyy-MM-dd',
      'dd-MM-yyyy',
      'MM-dd-yyyy',
      'd/M/yyyy',
      'M/d/yyyy',
      'yyyy/M/d',
      'd/M/yy',
      'M/d/yy'
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
  }, []);

  // Sync value prop with internal state for single date
  useEffect(() => {
    if (value && !range && !isTyping) {
      try {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          setStartDate(date);
          setInputValue(formatDateForDisplay(date));
        }
      } catch {
        // Invalid date, ignore
      }
    }
  }, [value, range, isTyping, formatDateForDisplay]);

  // Sync startValue and endValue props with internal state for range
  useEffect(() => {
    if (range && !isTyping) {
      if (startValue) {
        try {
          const date = new Date(startValue);
          if (!isNaN(date.getTime())) {
            setStartDate(date);
            setStartInputValue(formatDateForDisplay(date));
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
            setEndInputValue(formatDateForDisplay(date));
          }
        } catch {
          // Invalid date, ignore
        }
      } else {
        setEndInputValue('');
      }
    }
  }, [startValue, endValue, range, isTyping, formatDateForDisplay]);

  // Create a value array for the Calendar component when in range mode
  const calendarValue = range && startDate
    ? (endDate ? [startDate, endDate] as [Date, Date] : [startDate, startDate] as [Date, Date])
    : startDate;

  // Calculate calendar position when it opens
  useEffect(() => {
    const spacingX1 = getSpacingValue('--spacing-x1', 4);
    const spacingX2 = getSpacingValue('--spacing-x2', 8);
    const viewportPadding = spacingX2 + spacingX1 / 2;
    let animationFrameId: number | null = null;

    const updateCalendarPosition = () => {
      if (!isOpen || !containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const top = rect.bottom + spacingX2;
      const calendarElement = calendarRef.current;

      if (!calendarElement) {
        animationFrameId = window.requestAnimationFrame(updateCalendarPosition);
        return;
      }

      const calendarRect = calendarElement.getBoundingClientRect();
      const calendarWidth = calendarRect.width;
      const calendarHeight = calendarRect.height;
      let left = rect.left;

      if (left + calendarWidth > window.innerWidth - viewportPadding) {
        left = Math.max(viewportPadding, window.innerWidth - calendarWidth - viewportPadding);
      }

      const spaceBelow = window.innerHeight - rect.bottom;
      const finalTop = spaceBelow < calendarHeight
        ? rect.top - calendarHeight - spacingX2
        : top;

      setCalendarPosition({ top: finalTop, left });
    };

    updateCalendarPosition();

    // Recalculate on scroll and resize
    window.addEventListener('scroll', updateCalendarPosition, true);
    window.addEventListener('resize', updateCalendarPosition);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('scroll', updateCalendarPosition, true);
      window.removeEventListener('resize', updateCalendarPosition);
    };
  }, [isOpen, range]);

  const handleDateChange = (date: Date | [Date, Date]) => {
    if (Array.isArray(date)) {
      // Handle range selection
      setStartDate(date[0]);
      setEndDate(date[1]);
      setStartInputValue(formatDateForDisplay(date[0]));
      setEndInputValue(formatDateForDisplay(date[1]));
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
      setInputValue(formatDateForDisplay(date));
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
      setInputValue(formatDateForDisplay(parsedDate));
      setInputError(null);
    } else {
      setInputError('Invalid date format');
      // Revert to last valid date
      if (startDate) {
        setInputValue(formatDateForDisplay(startDate));
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
      setStartInputValue(formatDateForDisplay(parsedDate));
      setInputError(null);
    } else {
      setInputError('Invalid start date format');
      if (startDate) {
        setStartInputValue(formatDateForDisplay(startDate));
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
      setEndInputValue(formatDateForDisplay(parsedDate));
      setInputError(null);
    } else {
      setInputError('Invalid end date format');
      if (endDate) {
        setEndInputValue(formatDateForDisplay(endDate));
      } else {
        setEndInputValue('');
      }
    }
  };

  const fieldState = disabled ? 'disabled' : error || inputError || isOpen ? 'focused' : 'default';

  // Compute input values
  const getStartInputDisplayValue = () => {
    if (isTyping) return startInputValue;
    if (startDate) return formatDateForDisplay(startDate);
    return startInputValue;
  };

  const getEndInputDisplayValue = () => {
    if (isTyping) return endInputValue;
    if (endDate) return formatDateForDisplay(endDate);
    return endInputValue;
  };

  const getSingleInputDisplayValue = () => {
    if (isTyping) return inputValue;
    if (startDate) return formatDateForDisplay(startDate);
    return inputValue;
  };
  
  // Check if using composable API (has children with DatePicker sub-components)
  const hasComposableChildren = React.Children.toArray(children || []).some((child: any) => 
      child?.type?.displayName?.startsWith('DatePicker')
  );
  
  // Create context value
  const contextValue = {
    isOpen,
    setIsOpen,
    value,
    setValue: (newValue: string) => {
      onChange?.(newValue);
    },
    startValue,
    setStartValue: (newValue: string) => {
      onStartChange?.(newValue);
    },
    endValue,
    setEndValue: (newValue: string) => {
      onEndChange?.(newValue);
    },
    range: range || false,
    disabled: disabled || false,
    error: error || false,
    size: size ?? undefined,
    placeholder,
    includeDropdown,
    dropdownPresets,
    onDropdownPresetChange,
    quickSelectOptions,
    onChange,
    onStartChange,
    onEndChange,
    containerRef,
    calendarRef,
    calendarPosition,
    setCalendarPosition,
    portalContainer,
    setPortalContainer,
    portalClassName,
    portalStyle,
    portalContainerId: resolvedPortalId,
    inputValue,
    setInputValue,
    startInputValue,
    setStartInputValue,
    endInputValue,
    setEndInputValue,
    inputError,
    setInputError,
    isTyping,
    setIsTyping,
    formatDateForDisplay,
    parseDateInput,
    handleDateChange,
    handleApply,
    handleCancel,
    handleClear,
  };
  
  // If using composable API, render with context provider
  if (hasComposableChildren) {
      if (process.env.NODE_ENV !== 'production' && label) {
          console.warn(
              'DatePicker: Using deprecated props (label) with composable API. ' +
              'Please use Label component instead. ' +
              'See migration guide: docs/migrations/composable-migration.md'
          );
      }
      
      return (
          <DatePickerProvider value={contextValue}>
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
                  {children}
              </div>
          </DatePickerProvider>
      );
  }
  
  // Otherwise use declarative API (deprecated)
  if (process.env.NODE_ENV !== 'production' && label) {
      console.warn(
          'DatePicker: Declarative API (label prop) is deprecated. ' +
          'Please migrate to composable API using DatePickerTrigger, DatePickerInput, and DatePickerCalendar components. ' +
          'See migration guide: docs/migrations/composable-migration.md'
      );
  }

  return (
      <DatePickerProvider value={contextValue}>
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
            range ? "pl-[var(--spacing-x3)] pr-[var(--spacing-x2)]" : "px-[var(--spacing-x3)] min-w-[calc(var(--spacing-x10)*8)]",
            !range ? "cursor-pointer" : ""
          )}
          onClick={() => !disabled && !range && setIsOpen(true)}
        >
          <div className={cn("flex items-center gap-1", range ? "" : "flex-1 w-full", verticalPaddingMap[componentSize])}>
            {range ? (
              <>
                <input
                  type="text"
                  value={getStartInputDisplayValue()}
                  placeholder="Start date"
                  disabled={disabled}
                  onChange={handleStartInputChange}
                  onBlur={handleStartInputBlur}
                  onFocus={() => setIsTyping(true)}
                  onClick={(e) => e.stopPropagation()}
                  size={startDate || startInputValue ? getStartInputDisplayValue().length || 10 : 10}
                  className={cn(
                    "bg-transparent border-none outline-none text-base font-normal leading-[1.4]",
                    startDate || startInputValue
                      ? "text-[var(--primary)] dark:text-[var(--primary)]"
                      : "text-placeholder dark:text-placeholder-dark",
                    "placeholder:text-placeholder dark:placeholder:text-placeholder-dark",
                    "inline-block w-auto pr-[12px]"
                  )}
                />
                <span className="text-base font-normal leading-[1.4] text-placeholder dark:text-placeholder-dark flex-shrink-0">
                  →
                </span>
                <input
                  type="text"
                  value={getEndInputDisplayValue()}
                  placeholder="End date"
                  disabled={disabled}
                  onChange={handleEndInputChange}
                  onBlur={handleEndInputBlur}
                  onFocus={() => setIsTyping(true)}
                  onClick={(e) => e.stopPropagation()}
                  size={endDate || endInputValue ? getEndInputDisplayValue().length || 8 : 8}
                  className={cn(
                    "bg-transparent border-none outline-none text-base font-normal leading-[1.4]",
                    endDate || endInputValue
                      ? "text-[var(--primary)] dark:text-[var(--primary)]"
                      : "text-placeholder dark:text-placeholder-dark",
                    "placeholder:text-placeholder dark:placeholder:text-placeholder-dark",
                    "inline-block w-auto pr-[12px]"
                  )}
                />
              </>
            ) : (
              <input
                ref={ref}
                type="text"
                value={getSingleInputDisplayValue()}
                placeholder={placeholder?.replace(/\\$/, '') || "DD/MM/YYYY"}
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
                className="flex-1 bg-transparent border-none outline-none text-base font-normal leading-[1.4] text-[var(--primary)] dark:text-[var(--primary)] placeholder:text-placeholder dark:placeholder:text-placeholder-dark"
              />
            )}
            <button
              type="button"
              onClick={() => !disabled && setIsOpen(true)}
              className={cn(
                "flex-shrink-0 cursor-pointer flex items-center justify-center",
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
              className="fixed inset-0 bg-overlay z-[9998]"
              onClick={() => setIsOpen(false)}
            />

            {/* Calendar */}
            <div
              className={cn("fixed z-[9999]", portalClassName)}
              style={{
                top: calendarPosition.top,
                left: calendarPosition.left,
                ...(portalStyle ?? {})
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
                dropdownPresets={dropdownPresets}
                onDropdownPresetChange={onDropdownPresetChange}
                quickSelectOptions={quickSelectOptions}
              />
            </div>
          </>,
          portalContainer
        )}
      </div>
    </div>
      </DatePickerProvider>
  );
});

DatePicker.displayName = "DatePicker";

export default DatePicker; 
