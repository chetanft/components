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
        normal: "bg-surface dark:bg-surface-dark border-border dark:border-border-dark",
        error: "border-critical bg-surface dark:bg-surface-dark",
        warning: "border-warning bg-surface dark:bg-surface-dark", 
        success: "border-positive bg-surface dark:bg-surface-dark"
      }
    },
    compoundVariants: [
      // Default state variations
      {
        state: "default",
        type: "normal",
        className: "text-input dark:text-input-dark focus-within:border-focus dark:focus-within:border-focus-dark focus-within:ring-2 focus-within:ring-focus dark:focus-within:ring-focus-dark"
      },
      {
        state: "default", 
        type: "error",
        className: "text-input dark:text-input-dark focus-within:border-critical focus-within:ring-2 focus-within:ring-critical/20"
      },
      // Disabled state
      {
        state: "disabled",
        className: "bg-surface-alt dark:bg-surface-alt-dark border-border-disabled dark:border-border-disabled-dark text-input-disabled dark:text-input-disabled-dark"
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
  ({ size = "m", state = "default", type = "normal", value, placeholder = "Value", disabled, showTime, className, onChange, onFocus, onBlur, ...props }, ref) => {
    // Map DatePicker size to unified component styles
    const componentSize = size === "m" ? "sm" : size === "l" ? "md" : "lg";
    const componentStyles = getComponentStyles(componentSize);
    
    const iconColor = state === "disabled" 
      ? "text-input-disabled dark:text-input-disabled-dark" 
      : "text-icon dark:text-icon-dark";
    
    return (
      <div className={cn(
        datePickerFieldVariants({ size, state, type }),
        componentStyles.height,
        componentStyles.fontSize,
        componentStyles.borderRadius,
        componentStyles.padding,
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-focus-ring focus-within:border-dark-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900",
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