import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

// Date picker field variants using standardized component sizing
const datePickerFieldVariants = cva(
  "relative flex items-center gap-[var(--spacing-x1)] rounded-[var(--radius-md)] border transition-colors",
  {
    variants: {
      size: {
        xl: "h-component-xl px-[var(--spacing-x3)] text-[var(--component-font-size-lg)]", // 64px height, 16px font
        l: "h-component-lg px-[var(--spacing-x3)] text-[var(--component-font-size-lg)]",  // 52px height, 16px font
        m: "h-component-md px-[var(--spacing-x3)] text-[var(--component-font-size-md)]"  // 44px height, 16px font
      },
      state: {
        default: "",
        filled: "",
        disabled: "cursor-not-allowed opacity-60",
        prefilled: "",
        hover: "",
        focused: "",
        typing: ""
      },
      type: {
        normal: "border-[var(--color-border)] bg-[var(--color-white)]",
        error: "border-[var(--color-critical)] bg-[var(--color-white)]",
        warning: "border-[var(--color-warning)] bg-[var(--color-white)]", 
        success: "border-[var(--color-positive)] bg-[var(--color-white)]"
      }
    },
    compoundVariants: [
      // Default state variations using design tokens
      {
        state: "default",
        type: "normal",
        className: "hover:border-[var(--color-dark-100)] focus-within:border-[var(--color-dark-100)] focus-within:shadow-[0_0_0_2px_var(--color-neutral-light)]"
      },
      {
        state: "default", 
        type: "error",
        className: "hover:border-[var(--color-critical)] focus-within:border-[var(--color-critical)] focus-within:shadow-[0_0_0_2px_var(--color-critical-light)]"
      },
      {
        state: "default",
        type: "warning", 
        className: "hover:border-[var(--color-warning)] focus-within:border-[var(--color-warning)] focus-within:shadow-[0_0_0_2px_var(--color-warning-light)]"
      },
      {
        state: "default",
        type: "success",
        className: "hover:border-[var(--color-positive)] focus-within:border-[var(--color-positive)] focus-within:shadow-[0_0_0_2px_var(--color-positive-light)]"
      },
      // Disabled state using design tokens
      {
        state: "disabled",
        className: "bg-[var(--color-background)] border-[var(--color-border)]"
      },
      // Pre-filled state using design tokens
      {
        state: "prefilled",
        className: "bg-[var(--color-background)] border-[var(--color-border)]"
      },
      // Hover state using design tokens
      {
        state: "hover",
        type: "normal",
        className: "border-[var(--color-dark-100)]"
      },
      {
        state: "hover",
        type: "error", 
        className: "border-[var(--color-critical)]"
      },
      {
        state: "hover",
        type: "warning",
        className: "border-[var(--color-warning)]"
      },
      {
        state: "hover", 
        type: "success",
        className: "border-[var(--color-positive)]"
      },
      // Focused state using design tokens
      {
        state: "focused",
        type: "normal",
        className: "border-[var(--color-dark-100)] shadow-[0_0_0_2px_var(--color-neutral-light)]"
      },
      {
        state: "focused",
        type: "error",
        className: "border-[var(--color-critical)] shadow-[0_0_0_2px_var(--color-critical-light)]"
      },
      {
        state: "focused",
        type: "warning", 
        className: "border-[var(--color-warning)] shadow-[0_0_0_2px_var(--color-warning-light)]"
      },
      {
        state: "focused",
        type: "success",
        className: "border-[var(--color-positive)] shadow-[0_0_0_2px_var(--color-positive-light)]"
      },
      // Typing state (same as focused) using design tokens
      {
        state: "typing",
        type: "normal",
        className: "border-[var(--color-dark-100)] shadow-[0_0_0_2px_var(--color-neutral-light)]"
      },
      {
        state: "typing",
        type: "error",
        className: "border-[var(--color-critical)] shadow-[0_0_0_2px_var(--color-critical-light)]"
      },
      {
        state: "typing",
        type: "warning",
        className: "border-[var(--color-warning)] shadow-[0_0_0_2px_var(--color-warning-light)]"
      },
      {
        state: "typing",
        type: "success", 
        className: "border-[var(--color-positive)] shadow-[0_0_0_2px_var(--color-positive-light)]"
      }
    ],
    defaultVariants: {
      size: "xl",
      state: "default", 
      type: "normal"
    }
  }
);

// Text input variants using design tokens
const inputTextVariants = cva(
  "flex-1 border-0 bg-transparent outline-none font-[var(--font-family-primary)]",
  {
    variants: {
      state: {
        default: "text-[var(--color-dark-50)] placeholder:text-[var(--color-dark-50)]",
        filled: "text-[var(--color-dark-100)]",
        disabled: "text-[var(--color-dark-25)] cursor-not-allowed",
        prefilled: "text-[var(--color-dark-100)]",
        hover: "text-[var(--color-dark-50)]",
        focused: "text-[var(--color-dark-50)]", 
        typing: "text-[var(--color-dark-100)]"
      }
    },
    defaultVariants: {
      state: "default"
    }
  }
);

// Calendar icon component
const CalendarIcon = ({ className }: { className?: string }) => (
  <Icon name="calendar" size={16} className={className} />
);

// Time icon component using our built icon
const TimeIcon = ({ className }: { className?: string }) => (
  <Icon name="clock" size={16} className={className} />
);

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
  ({ size, state, type, value, placeholder = "Value", disabled, showTime, className, onChange, onFocus, onBlur, ...props }, ref) => {
    const iconColor = state === "disabled" ? "text-gray-400" : "text-gray-800";
    
    return (
      <div className={cn(datePickerFieldVariants({ size, state, type, className }))}>
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
          <TimeIcon className={cn("w-4 h-4", iconColor)} />
        ) : (
          <CalendarIcon className={cn("w-4 h-4", iconColor)} />
        )}
      </div>
    );
  }
);

DatePickerField.displayName = "DatePickerField";

// Label component
export interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ children, required, className }) => (
  <label className={cn("flex items-center gap-1 text-sm font-medium text-gray-700", className)}>
    {required && <span className="text-red-500 text-xs">*</span>}
    {children}
  </label>
);

// Main DatePicker component
export interface DatePickerProps extends Omit<DatePickerFieldProps, 'size'> {
  label?: string;
  labelPosition?: "top" | "left" | "none";
  required?: boolean;
  size?: "xl" | "l" | "m";
  showTime?: boolean;
  className?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, labelPosition = "top", required, size = "xl", showTime, className, ...fieldProps }, ref) => {
    const renderLabel = () => {
      if (!label || labelPosition === "none") return null;
      return <Label required={required}>{label}</Label>;
    };

    const renderField = () => (
      <DatePickerField
        ref={ref}
        size={size}
        showTime={showTime}
        {...fieldProps}
      />
    );

    if (labelPosition === "left") {
      return (
        <div className={cn("flex items-center gap-4", className)}>
          {renderLabel()}
          {renderField()}
        </div>
      );
    }

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {renderLabel()}
        {renderField()}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker; 