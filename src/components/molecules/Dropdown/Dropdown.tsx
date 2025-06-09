import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, getComponentStyles, type ComponentSize } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Label } from '../../atoms/Label/Label';

// Unified dropdown field variants using the design system
const dropdownFieldVariants = cva(
  // Base styles - unified across all components
  "relative w-full border-2 transition-all duration-200 font-sans font-normal bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus-within:ring-2 focus-within:ring-neutral-200 dark:focus-within:ring-neutral-700",
  {
    variants: {
      size: {
        sm: "", // Styles applied via unified system
        md: "", // Styles applied via unified system  
        lg: "", // Styles applied via unified system
        xl: "", // Styles applied via unified system
      },
      state: {
        default: "border-neutral-200 dark:border-neutral-700 focus-within:border-neutral-400 dark:focus-within:border-neutral-500",
        error: "border-critical focus-within:border-critical focus-within:ring-critical/20",
        disabled: "bg-neutral-50 dark:bg-neutral-800 border-neutral-100 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed",
      },
      type: {
        normal: "",
        search: "",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
      type: "normal",
    },
  }
);

export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends VariantProps<typeof dropdownFieldVariants> {
  options: DropdownOption[];
  value?: string | number;
  placeholder?: string;
  size?: ComponentSize; // Use unified sizing
  state?: 'default' | 'error' | 'disabled';
  type?: 'normal' | 'search';
  className?: string;
  onChange?: (value: string | number) => void;
  onSearch?: (query: string) => void;
  label?: string;
  labelMandatory?: boolean;
  labelOptional?: boolean;
  labelSuffixIcon?: boolean;
  labelIcon?: React.ReactNode;
  labelPosition?: 'top' | 'left';
  error?: string;
  helperText?: string;
  required?: boolean; // Keep for backward compatibility
  onSelect?: (value: string) => void;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      value,
      placeholder = "Select an option",
      size = "md",
      state = "default",
      type = "normal",
      className,
      onChange,
      onSearch,
      label,
      labelMandatory,
      labelOptional,
      labelSuffixIcon,
      labelIcon,
      labelPosition = "top",
      error,
      helperText,
      required = false,
      onSelect,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedValue, setSelectedValue] = useState(value);

    // Core component - no AI filtering (use ft-design-system/ai for AI protection)
    const componentStyles = getComponentStyles(size);

    // Filter options based on search query
    const filteredOptions = options.filter((option: DropdownOption) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedOption = options.find((option: DropdownOption) => option.value === selectedValue);

    const handleSelect = (optionValue: string | number) => {
      setSelectedValue(optionValue);
      setIsOpen(false);
      setSearchQuery("");
      onChange?.(optionValue);
      onSelect?.(String(optionValue));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearch?.(query);
    };

    const renderField = () => {
      const fieldClasses = cn(
        dropdownFieldVariants({ size, state, type }),
        componentStyles.height,
        componentStyles.fontSize,
        componentStyles.borderRadius,
        componentStyles.padding,
        "cursor-pointer flex items-center justify-between",
        state === "disabled" && "pointer-events-none",
        className
      );

      return (
        <div
          ref={ref}
          className={fieldClasses}
          onClick={() => !state || state === "default" ? setIsOpen(!isOpen) : undefined}
          data-size={size}
          {...props}
        >
          <span className={selectedOption ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <Icon
            name="chevron-down"
            size={componentStyles.iconSize}
            className={cn(
              "transition-transform duration-200",
              isOpen && "rotate-180",
              state === "disabled" ? "text-neutral-400 dark:text-neutral-500" : "text-neutral-500 dark:text-neutral-400"
            )}
          />
          
          {/* Dropdown Menu */}
          {isOpen && (
            <div className={cn(
              "absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg max-h-60 overflow-auto",
              componentStyles.borderRadius
            )}>
              {type === "search" && (
                <div className="p-2 border-b border-neutral-200 dark:border-neutral-700">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={cn(
                      "w-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100",
                      componentStyles.fontSize,
                      componentStyles.borderRadius,
                      "px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700"
                    )}
                    autoFocus
                  />
                </div>
              )}
              
              {filteredOptions.length === 0 ? (
                <div className="p-3 text-neutral-500 dark:text-neutral-400 text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option: DropdownOption) => (
                  <div
                    key={option.value}
                    className={cn(
                      "px-3 py-2 cursor-pointer transition-colors",
                      componentStyles.fontSize,
                      option.disabled
                        ? "text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
                        : "text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800",
                      selectedValue === option.value && "bg-neutral-100 dark:bg-neutral-700"
                    )}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                  >
                    {option.label}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      );
    };

    const renderLabel = () => {
      if (!label) return null;
      
      // Determine if field is mandatory: either explicitly set or required for backward compatibility
      const isMandatory = labelMandatory || (required && !labelOptional);
      
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

    const renderHelperText = () => {
      if (!helperText && !error) return null;
      
      return (
        <p className={cn(
          "text-sm leading-relaxed mt-1.5",
          error ? "text-critical" : "text-neutral-600 dark:text-neutral-400"
        )}>
          {error || helperText}
        </p>
      );
    };

    if (labelPosition === "left") {
      return (
        <div className={cn("flex items-start gap-4", className)}>
          {renderLabel()}
          <div className="flex flex-col gap-2 flex-1 relative">
            {renderField()}
            {renderHelperText()}
          </div>
        </div>
      );
    }

    return (
      <div className={cn("flex flex-col gap-2 relative", className)}>
        {renderLabel()}
        {renderField()}
        {renderHelperText()}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown; 

export { dropdownFieldVariants }; 