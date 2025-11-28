"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { cn, getComponentStyles, type ComponentSize } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Label } from '../../atoms/Label/Label';
import { Button } from '../../atoms/Button/Button';

// ============================================================================
// Types
// ============================================================================

export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'> {
  /** Label text */
  label?: string;
  /** Whether the field is mandatory */
  labelMandatory?: boolean;
  /** Whether to show optional indicator */
  labelOptional?: boolean;
  /** Whether to show suffix icon on label */
  labelSuffixIcon?: boolean;
  /** Custom label icon */
  labelIcon?: React.ReactNode;
  /** Error message */
  error?: string;
  /** Warning message */
  warning?: string;
  /** Success message */
  success?: string;
  /** Helper text */
  helperText?: string;
  /** Component size */
  size?: ComponentSize;
  /** Time value in HH:mm:ss or HH:mm format */
  value?: string;
  /** Default time value */
  defaultValue?: string;
  /** Called when time changes */
  onChange?: (value: string) => void;
  /** Time format (12 or 24 hour) */
  use12Hours?: boolean;
  /** Show seconds selector */
  showSecond?: boolean;
  /** Hour step */
  hourStep?: number;
  /** Minute step */
  minuteStep?: number;
  /** Second step */
  secondStep?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Format string for display */
  format?: string;
  /** Allow clearing the value */
  allowClear?: boolean;
  /** Disabled hours (array of hours to disable) */
  disabledHours?: () => number[];
  /** Disabled minutes (array of minutes to disable for selected hour) */
  disabledMinutes?: (selectedHour: number) => number[];
  /** Disabled seconds (array of seconds to disable for selected hour and minute) */
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
}

// ============================================================================
// Helper Functions
// ============================================================================

const padZero = (num: number): string => num.toString().padStart(2, '0');

const parseTimeValue = (value: string | undefined): { hour: number; minute: number; second: number; period: 'AM' | 'PM' } => {
  if (!value) return { hour: 0, minute: 0, second: 0, period: 'AM' };

  const parts = value.split(':');
  const hour = parseInt(parts[0], 10) || 0;
  const minute = parseInt(parts[1], 10) || 0;
  const second = parseInt(parts[2], 10) || 0;

  return {
    hour: hour > 12 ? hour - 12 : hour === 0 ? 12 : hour,
    minute,
    second,
    period: hour >= 12 ? 'PM' : 'AM',
  };
};

const formatTimeValue = (hour: number, minute: number, second: number, use12Hours: boolean, period: 'AM' | 'PM', showSecond: boolean): string => {
  let h = hour;
  if (use12Hours) {
    if (period === 'PM' && hour !== 12) h = hour + 12;
    if (period === 'AM' && hour === 12) h = 0;
  }

  if (showSecond) {
    return `${padZero(h)}:${padZero(minute)}:${padZero(second)}`;
  }
  return `${padZero(h)}:${padZero(minute)}`;
};

// ============================================================================
// TimeColumn Component
// ============================================================================

interface TimeColumnProps {
  type: 'hour' | 'minute' | 'second' | 'period';
  value: number | string;
  onChange: (value: number | string) => void;
  options: (number | string)[];
  disabledOptions?: number[];
  use12Hours?: boolean;
}

const TimeColumn: React.FC<TimeColumnProps> = ({ type, value, onChange, options, disabledOptions = [], use12Hours }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to selected value
    if (containerRef.current) {
      const selectedIndex = options.findIndex(opt => opt === value);
      if (selectedIndex >= 0) {
        containerRef.current.scrollTop = selectedIndex * 32;
      }
    }
  }, [value, options]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-border-primary)]",
        "border-r border-[var(--color-border-secondary)] last:border-r-0"
      )}
    >
      {options.map((option) => {
        const isSelected = option === value;
        const isDisabled = typeof option === 'number' && disabledOptions.includes(option);

        return (
          <button
            key={option}
            type="button"
            onClick={() => !isDisabled && onChange(option)}
            disabled={isDisabled}
            className={cn(
              "px-[var(--spacing-x3)] py-[var(--spacing-x2)] text-center transition-colors min-w-[56px]",
              "text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)]",
              isSelected && "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]",
              isDisabled && "text-[var(--color-tertiary)] cursor-not-allowed opacity-50"
            )}
          >
            {typeof option === 'number' ? padZero(option) : option}
          </button>
        );
      })}
    </div>
  );
};

// ============================================================================
// TimePicker Component
// ============================================================================

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({
    className,
    label,
    labelMandatory = false,
    labelOptional = false,
    labelSuffixIcon = false,
    labelIcon,
    error,
    warning,
    success,
    helperText,
    size = 'md',
    value: controlledValue,
    defaultValue,
    onChange,
    use12Hours = false,
    showSecond = true,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    placeholder,
    format,
    allowClear = true,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    disabled,
    id,
    'aria-describedby': ariaDescribedBy,
    ...props
  }, ref) => {
    const componentStyles = getComponentStyles(size);
    const [isOpen, setIsOpen] = useState(false);
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    // Parse initial value
    const initialParsed = parseTimeValue(controlledValue || defaultValue);
    const [hour, setHour] = useState(initialParsed.hour);
    const [minute, setMinute] = useState(initialParsed.minute);
    const [second, setSecond] = useState(initialParsed.second);
    const [period, setPeriod] = useState<'AM' | 'PM'>(initialParsed.period);
    const [inputValue, setInputValue] = useState('');

    // Sync controlled value
    useEffect(() => {
      if (controlledValue) {
        const parsed = parseTimeValue(controlledValue);
        setHour(use12Hours ? parsed.hour : parseInt(controlledValue.split(':')[0], 10) || 0);
        setMinute(parsed.minute);
        setSecond(parsed.second);
        setPeriod(parsed.period);
        setInputValue(controlledValue);
      }
    }, [controlledValue, use12Hours]);

    // Create portal container
    useEffect(() => {
      if (typeof document !== 'undefined') {
        let container = document.getElementById('timepicker-portal-container');
        if (!container) {
          container = document.createElement('div');
          container.id = 'timepicker-portal-container';
          document.body.appendChild(container);
        }
        setPortalContainer(container);
      }
    }, []);

    // Update dropdown position
    useEffect(() => {
      if (isOpen && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
        });
      }
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const portal = document.getElementById('timepicker-portal-container');
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node) &&
          (!portal || !portal.contains(event.target as Node))
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Generate options
    const hourOptions = useMemo(() => {
      const hours: number[] = [];
      const max = use12Hours ? 12 : 23;
      const start = use12Hours ? 1 : 0;
      for (let i = start; i <= max; i += hourStep) {
        hours.push(i);
      }
      return hours;
    }, [use12Hours, hourStep]);

    const minuteOptions = useMemo(() => {
      const minutes: number[] = [];
      for (let i = 0; i < 60; i += minuteStep) {
        minutes.push(i);
      }
      return minutes;
    }, [minuteStep]);

    const secondOptions = useMemo(() => {
      const seconds: number[] = [];
      for (let i = 0; i < 60; i += secondStep) {
        seconds.push(i);
      }
      return seconds;
    }, [secondStep]);

    const periodOptions = ['AM', 'PM'];

    // Handle selection change
    const handleTimeChange = useCallback((newHour: number, newMinute: number, newSecond: number, newPeriod: 'AM' | 'PM') => {
      const timeStr = formatTimeValue(newHour, newMinute, newSecond, use12Hours, newPeriod, showSecond);
      setInputValue(timeStr);
      onChange?.(timeStr);
    }, [use12Hours, showSecond, onChange]);

    const handleHourChange = useCallback((val: number | string) => {
      const newHour = typeof val === 'number' ? val : parseInt(val, 10);
      setHour(newHour);
      handleTimeChange(newHour, minute, second, period);
    }, [minute, second, period, handleTimeChange]);

    const handleMinuteChange = useCallback((val: number | string) => {
      const newMinute = typeof val === 'number' ? val : parseInt(val, 10);
      setMinute(newMinute);
      handleTimeChange(hour, newMinute, second, period);
    }, [hour, second, period, handleTimeChange]);

    const handleSecondChange = useCallback((val: number | string) => {
      const newSecond = typeof val === 'number' ? val : parseInt(val, 10);
      setSecond(newSecond);
      handleTimeChange(hour, minute, newSecond, period);
    }, [hour, minute, period, handleTimeChange]);

    const handlePeriodChange = useCallback((val: number | string) => {
      const newPeriod = val as 'AM' | 'PM';
      setPeriod(newPeriod);
      handleTimeChange(hour, minute, second, newPeriod);
    }, [hour, minute, second, handleTimeChange]);

    const handleClear = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      setHour(use12Hours ? 12 : 0);
      setMinute(0);
      setSecond(0);
      setPeriod('AM');
      setInputValue('');
      onChange?.('');
    }, [use12Hours, onChange]);

    const handleNow = useCallback(() => {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();
      let p: 'AM' | 'PM' = 'AM';

      if (use12Hours) {
        p = h >= 12 ? 'PM' : 'AM';
        h = h > 12 ? h - 12 : h === 0 ? 12 : h;
      }

      setHour(h);
      setMinute(m);
      setSecond(s);
      setPeriod(p);
      handleTimeChange(h, m, s, p);
    }, [use12Hours, handleTimeChange]);

    // Generate IDs for accessibility
    const generatedId = React.useId();
    const inputId = id || `timepicker-${generatedId}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const warningId = warning ? `${inputId}-warning` : undefined;
    const successId = success ? `${inputId}-success` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const describedBy = [errorId, warningId, successId, helperId, ariaDescribedBy].filter(Boolean).join(' ') || undefined;

    const inputType = error ? 'error' : warning ? 'warning' : success ? 'success' : 'normal';

    const inputStyles = cn(
      "w-full transition-all duration-200",
      "font-sans font-normal cursor-pointer",
      "placeholder:text-placeholder dark:placeholder:text-placeholder-dark",
      componentStyles.height,
      componentStyles.fontSize,
      componentStyles.borderRadius,
      "px-[var(--spacing-x3)] pr-[var(--spacing-x8)]",
      "bg-surface dark:bg-surface-dark border-2 border-border dark:border-border-dark hover:border-[var(--primary)] dark:hover:border-[var(--primary)]",
      disabled
        ? "bg-surface-alt dark:bg-surface-alt-dark border-border-disabled dark:border-border-disabled-dark text-input-disabled dark:text-input-disabled-dark cursor-not-allowed"
        : inputType === 'error'
          ? "border-critical text-input dark:text-input-dark focus:border-critical"
          : inputType === 'warning'
            ? "border-warning text-input dark:text-input-dark focus:border-warning"
            : inputType === 'success'
              ? "border-positive text-input dark:text-input-dark focus:border-positive"
              : "text-input dark:text-input-dark focus:border-primary dark:focus:border-primary-dark",
      isOpen && "border-primary dark:border-primary-dark",
      "focus:outline-none",
      className
    );

    const helperStyles = cn(
      "text-sm leading-relaxed mt-1.5",
      error
        ? "text-critical"
        : warning
          ? "text-warning"
          : success
            ? "text-positive"
            : "text-helper dark:text-helper-dark"
    );

    const displayValue = inputValue || (format ? format : placeholder || (showSecond ? 'HH:mm:ss' : 'HH:mm'));

    return (
      <div className="w-full space-y-2">
        {label && (
          <div>
            <Label
              htmlFor={inputId}
              mandatory={labelMandatory}
              optional={labelOptional}
              suffixIcon={labelSuffixIcon}
              icon={labelIcon}
            >
              {label}
            </Label>
          </div>
        )}

        <div className="relative" ref={containerRef}>
          <input
            ref={ref}
            id={inputId}
            type="text"
            readOnly
            value={inputValue}
            placeholder={placeholder || (showSecond ? 'HH:mm:ss' : 'HH:mm')}
            disabled={disabled}
            onClick={() => !disabled && setIsOpen(true)}
            className={inputStyles}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            data-size={size}
            data-type={inputType}
            {...props}
          />

          <div className="absolute right-0 top-0 h-full flex items-center pr-[var(--spacing-x3)] gap-[var(--spacing-x1)]">
            {allowClear && inputValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="text-[var(--color-tertiary)] hover:text-[var(--color-primary)] transition-colors"
                aria-label="Clear time"
              >
                <Icon name="cross" size={componentStyles.iconSize - 4} />
              </button>
            )}
            <Icon
              name="clock"
              size={componentStyles.iconSize}
              className={cn(
                disabled
                  ? "text-input-disabled dark:text-input-disabled-dark"
                  : "text-icon dark:text-icon-dark"
              )}
            />
          </div>
        </div>

        {(helperText || error || warning || success) && (
          <p
            id={error ? errorId : warning ? warningId : success ? successId : helperId}
            className={helperStyles}
            role={(error || warning || success) ? 'alert' : undefined}
          >
            {error || warning || success || helperText}
          </p>
        )}

        {isOpen && !disabled && portalContainer && ReactDOM.createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <div
              className={cn(
                "fixed z-[9999] bg-[var(--color-bg-primary)] rounded-[var(--radius-md)]",
                "shadow-[var(--shadow-lg)] border border-[var(--color-border-secondary)]",
                "overflow-hidden"
              )}
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
              }}
            >
              <div className="flex">
                <TimeColumn
                  type="hour"
                  value={hour}
                  onChange={handleHourChange}
                  options={hourOptions}
                  disabledOptions={disabledHours?.()}
                  use12Hours={use12Hours}
                />
                <TimeColumn
                  type="minute"
                  value={minute}
                  onChange={handleMinuteChange}
                  options={minuteOptions}
                  disabledOptions={disabledMinutes?.(hour)}
                />
                {showSecond && (
                  <TimeColumn
                    type="second"
                    value={second}
                    onChange={handleSecondChange}
                    options={secondOptions}
                    disabledOptions={disabledSeconds?.(hour, minute)}
                  />
                )}
                {use12Hours && (
                  <TimeColumn
                    type="period"
                    value={period}
                    onChange={handlePeriodChange}
                    options={periodOptions}
                  />
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-[var(--spacing-x2)] border-t border-[var(--color-border-secondary)]">
                <Button
                  variant="text"
                  size="xs"
                  onClick={handleNow}
                >
                  Now
                </Button>
                <Button
                  variant="primary"
                  size="xs"
                  onClick={() => setIsOpen(false)}
                >
                  OK
                </Button>
              </div>
            </div>
          </>,
          portalContainer
        )}
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';

export default TimePicker;

