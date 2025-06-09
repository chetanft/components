import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, getComponentStyles, type ComponentSize } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Label } from '../../atoms/Label/Label';

// Date picker field variants using unified design system
const datePickerFieldVariants = cva(
  "relative flex items-center gap-2 border-2 transition-all duration-200 font-sans font-normal",
  {
    variants: {
      size: {
        xl: "", // Applied via unified system
        l: "",  // Applied via unified system
        m: ""   // Applied via unified system
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
        normal: "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700",
        error: "border-critical bg-white dark:bg-neutral-900",
        warning: "border-warning bg-white dark:bg-neutral-900", 
        success: "border-positive bg-white dark:bg-neutral-900"
      }
    },
    compoundVariants: [
      // Default state variations
      {
        state: "default",
        type: "normal",
        className: "text-neutral-900 dark:text-neutral-100 focus-within:border-neutral-400 dark:focus-within:border-neutral-500 focus-within:ring-2 focus-within:ring-neutral-200 dark:focus-within:ring-neutral-700"
      },
      {
        state: "default", 
        type: "error",
        className: "text-neutral-900 dark:text-neutral-100 focus-within:border-critical focus-within:ring-2 focus-within:ring-critical/20"
      },
      // Disabled state
      {
        state: "disabled",
        className: "bg-neutral-50 dark:bg-neutral-800 border-neutral-100 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500"
      },
    ],
    defaultVariants: {
      size: "m",
      state: "default", 
      type: "normal"
    }
  }
);

// Text input variants using unified design system
const inputTextVariants = cva(
  "flex-1 border-0 bg-transparent outline-none font-sans font-normal",
  {
    variants: {
      state: {
        default: "text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
        filled: "text-neutral-900 dark:text-neutral-100",
        disabled: "text-neutral-400 dark:text-neutral-500 cursor-not-allowed",
        prefilled: "text-neutral-900 dark:text-neutral-100",
        hover: "text-neutral-900 dark:text-neutral-100",
        focused: "text-neutral-900 dark:text-neutral-100", 
        typing: "text-neutral-900 dark:text-neutral-100"
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
  ({ size = "m", state = "default", type = "normal", value, placeholder = "Value", disabled, showTime, className, onChange, onFocus, onBlur, ...props }, ref) => {
    // Map DatePicker size to unified component styles
    const componentSize = size === "m" ? "sm" : size === "l" ? "md" : "lg";
    const componentStyles = getComponentStyles(componentSize);
    
    const iconColor = state === "disabled" 
      ? "text-neutral-400 dark:text-neutral-500" 
      : "text-neutral-500 dark:text-neutral-400";
    
    return (
      <div className={cn(
        datePickerFieldVariants({ size, state, type }),
        componentStyles.height,
        componentStyles.fontSize,
        componentStyles.borderRadius,
        componentStyles.padding,
        "focus-within:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900",
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
            size={componentStyles.iconSize}
            className={iconColor} 
          />
        ) : (
          <Icon 
            name="calendar" 
            size={componentStyles.iconSize}
            className={iconColor} 
          />
        )}
      </div>
    );
  }
);

DatePickerField.displayName = "DatePickerField";

// Using unified Label component from atoms

// Main DatePicker component
export interface DatePickerProps extends Omit<DatePickerFieldProps, 'size'> {
  label?: string;
  labelMandatory?: boolean;
  labelOptional?: boolean;
  labelSuffixIcon?: boolean;
  labelIcon?: React.ReactNode;
  labelPosition?: "top" | "left" | "none";
  required?: boolean; // Keep for backward compatibility
  size?: ComponentSize;
  showTime?: boolean;
  className?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ 
    label, 
    labelMandatory,
    labelOptional, 
    labelSuffixIcon,
    labelIcon,
    labelPosition = "top", 
    required, 
    size = "md", 
    showTime, 
    className, 
    ...fieldProps 
  }, ref) => {
    // Map unified ComponentSize to DatePickerField size
    const fieldSize = size === "sm" ? "m" : size === "md" ? "l" : "xl";
    
    // Determine if field is mandatory: either explicitly set or required for backward compatibility
    const isMandatory = labelMandatory || (required && !labelOptional);
    
    const renderLabel = () => {
      if (!label || labelPosition === "none") return null;
      return (
        <Label
          mandatory={isMandatory}
          optional={labelOptional}
          suffixIcon={labelSuffixIcon}
          icon={labelIcon}
          className={labelPosition === "left" ? "mb-0" : "mb-2"}
        >
          {label}
        </Label>
      );
    };

    const renderField = () => (
      <DatePickerField
        ref={ref}
        size={fieldSize}
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