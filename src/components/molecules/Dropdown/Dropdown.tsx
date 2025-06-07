import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, filterAIClasses } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

// Dropdown field variants using standardized component sizing
const dropdownFieldVariants = cva(
  "relative flex items-center gap-[var(--spacing-x1)] border transition-colors cursor-pointer",
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
      size: "m",
      state: "default", 
      type: "normal"
    }
  }
);

// Text variants using design tokens
const textVariants = cva(
  "flex-1 bg-transparent outline-none font-[var(--font-family-primary)] cursor-pointer",
  {
    variants: {
      state: {
        default: "text-[var(--color-dark-50)]",
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

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <Icon name="chevron-down" size={16} className={className} />
);

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <Icon name="chevron-up" size={16} className={className} />
);

export interface DropdownFieldProps extends VariantProps<typeof dropdownFieldVariants> {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  open?: boolean;
  className?: string;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const DropdownField = forwardRef<HTMLDivElement, DropdownFieldProps>(
  ({ size, state, type, value, placeholder = "Value", disabled, open, className, onClick, onFocus, onBlur, ...props }, ref) => {
    const iconColor = state === "disabled" ? "text-gray-400" : "text-gray-800";
    
    return (
      <div 
        ref={ref}
        className={cn(dropdownFieldVariants({ size, state, type, className }))}
        onClick={!disabled ? onClick : undefined}
        onFocus={!disabled ? onFocus : undefined}
        onBlur={onBlur}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        {...props}
      >
        <span className={cn(textVariants({ state }))}>
          {value || placeholder}
        </span>
        {open ? (
          <ChevronUpIcon className={cn("w-4 h-4", iconColor)} />
        ) : (
          <ChevronDownIcon className={cn("w-4 h-4", iconColor)} />
        )}
      </div>
    );
  }
);

DropdownField.displayName = "DropdownField";

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

// Caption component
export interface CaptionProps {
  children: React.ReactNode;
  type?: "default" | "error" | "warning" | "success";
  className?: string;
}

export const Caption: React.FC<CaptionProps> = ({ children, type = "default", className }) => {
  const captionColors = {
    default: "text-gray-600",
    error: "text-red-500",
    warning: "text-orange-500",
    success: "text-green-500"
  };

  return (
    <p className={cn("text-sm pl-4", captionColors[type], className)}>
      {children}
    </p>
  );
};

// Main Dropdown component
export interface DropdownProps extends Omit<DropdownFieldProps, 'size'> {
  label?: string;
  labelPosition?: "top" | "left" | "none";
  required?: boolean;
  size?: "xl" | "l" | "m";
  caption?: string;
  showCaption?: boolean;
  className?: string;
  options?: Array<{ value: string; label: string }>;
  onSelect?: (value: string) => void;
}



export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ 
    label, 
    labelPosition = "top", 
    required, 
    size = "xl", 
    caption = "This is caption under text",
    showCaption = false,
    className, 
    options = [],
    onSelect,
    ...fieldProps 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(fieldProps.value || "");

    const handleClick = () => {
      if (!fieldProps.disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleSelect = (value: string) => {
      setSelectedValue(value);
      setIsOpen(false);
      onSelect?.(value);
    };

    const renderLabel = () => {
      if (!label || labelPosition === "none") return null;
      return <Label required={required}>{label}</Label>;
    };

    const renderField = () => (
      <DropdownField
        ref={ref}
        size={size}
        open={isOpen}
        value={selectedValue}
        onClick={handleClick}
        {...fieldProps}
      />
    );

    const renderCaption = () => {
      if (!showCaption) return null;
      const captionType = fieldProps.type === "normal" || !fieldProps.type ? "default" : fieldProps.type;
      return <Caption type={captionType}>{caption}</Caption>;
    };

    const renderDropdownOptions = () => {
      if (!isOpen || options.length === 0) return null;
      
      return (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      );
    };

         const safeClassName = filterAIClasses(className);

    if (labelPosition === "left") {
      return (
        <div className={cn("flex items-start gap-4", safeClassName)}>
          {renderLabel()}
          <div className="flex flex-col gap-2 flex-1 relative">
            {renderField()}
            {renderDropdownOptions()}
            {renderCaption()}
          </div>
        </div>
      );
    }

    return (
      <div className={cn("flex flex-col gap-2 relative", safeClassName)}>
        {renderLabel()}
        {renderField()}
        {renderDropdownOptions()}
        {renderCaption()}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown; 