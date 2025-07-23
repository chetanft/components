import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, getComponentStyles, type ComponentSize } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Label } from '../../atoms/Label/Label';
import { SegmentedTabs, type SegmentedTabItem } from '../SegmentedTabs';

// Unified dropdown field variants using the design system
const dropdownFieldVariants = cva(
  "relative w-full border transition-all duration-200 font-sans font-normal bg-white dark:bg-surface-dark text-[var(--primary)] dark:text-input-dark focus-within:ring-2 focus-within:ring-focus-ring",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-base",
        xl: "text-base",
      },
      state: {
        default: "border-[var(--border-primary)] dark:border-border-dark focus-within:border-focus dark:focus-within:border-focus-dark",
        error: "border-critical focus-within:border-critical focus-within:ring-critical/20",
        disabled: "bg-surface-alt dark:bg-surface-alt-dark border-border-disabled dark:border-border-disabled-dark text-input-disabled dark:text-input-disabled-dark cursor-not-allowed",
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

// Dropdown menu item variants
const dropdownMenuItemVariants = cva(
  "flex items-center px-3 py-2 cursor-pointer transition-colors rounded-lg text-[var(--primary)] text-base",
  {
    variants: {
      state: {
        default: "hover:bg-[var(--border-secondary)] focus:bg-[var(--border-primary)]",
        selected: "bg-[var(--bg-secondary)]",
        disabled: "text-[var(--tertiary)] cursor-not-allowed",
      },
    },
    defaultVariants: {
      state: "default",
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
  size?: ComponentSize;
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
  required?: boolean;
  onSelect?: (value: string) => void;
  segments?: SegmentedTabItem[];
  selectedSegment?: string;
  onSegmentChange?: (value: string) => void;
}

interface SizeStyles {
  height: string;
  fontSize: string;
  borderRadius: string;
  padding: string;
  iconSize: number;
}

const sizeStylesMap: Record<ComponentSize, SizeStyles> = {
  sm: {
    height: "h-8",
    fontSize: "text-sm",
    borderRadius: "rounded-lg",
    padding: "px-3",
    iconSize: 16,
  },
  md: {
    height: "h-10",
    fontSize: "text-base",
    borderRadius: "rounded-lg",
    padding: "px-3 py-2",
    iconSize: 16,
  },
  lg: {
    height: "h-12",
    fontSize: "text-base",
    borderRadius: "rounded-lg",
    padding: "px-4 py-2",
    iconSize: 16,
  },
  xl: {
    height: "h-16",
    fontSize: "text-base",
    borderRadius: "rounded-lg",
    padding: "px-3 py-5",
    iconSize: 16,
  },
};

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
      segments,
      selectedSegment,
      onSegmentChange,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedValue, setSelectedValue] = useState(value);

    const componentStyles = getComponentStyles(size);
    const sizeStyles = sizeStylesMap[size];

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
        sizeStyles.height,
        sizeStyles.fontSize,
        sizeStyles.borderRadius,
        sizeStyles.padding,
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
          <span className={cn(
            selectedOption ? "text-[var(--primary)]" : "text-[var(--tertiary)]",
            "text-base"
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <Icon
            name="chevron-down"
            size={sizeStyles.iconSize}
            className={cn(
              "transition-transform duration-200",
              isOpen && "rotate-180",
              state === "disabled" ? "text-input-disabled dark:text-input-disabled-dark" : "text-[var(--primary)]"
            )}
          />
          
          {/* Dropdown Menu */}
          {isOpen && (
            <div className={cn(
              "absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-surface-dark border border-[var(--border-primary)] dark:border-border-dark shadow-lg rounded-lg overflow-hidden",
              "p-2 flex flex-col gap-1"
            )}>
              {segments && (
                <div className="mb-4">
                  <SegmentedTabs
                    items={segments}
                    value={selectedSegment}
                    onChange={onSegmentChange}
                  />
                </div>
              )}
              
              {type === "search" && (
                <div className="mb-2">
                  <div className="relative">
                    <Icon
                      name="search"
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--tertiary)]"
                    />
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="w-full pl-9 pr-3 py-2 border border-[var(--border-primary)] dark:border-border-dark rounded-lg text-base text-[var(--primary)] placeholder-[var(--tertiary)] focus:outline-none focus:ring-2 focus:ring-focus-ring focus:border-focus"
                    />
                  </div>
                </div>
              )}
              
              <div className="max-h-60 overflow-y-auto">
                {filteredOptions.map((option: DropdownOption) => (
                  <div
                    key={option.value}
                    className={cn(
                      dropdownMenuItemVariants({
                        state: option.disabled ? "disabled" : selectedValue === option.value ? "selected" : "default",
                      })
                    )}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                  >
                    <span className="flex-1">{option.label}</span>
                    {selectedValue === option.value && (
                      <Icon name="check" size={16} className="text-[var(--primary)] ml-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    };

    const renderLabel = () => {
      if (!label) return null;

      return (
        <div className={cn(
          "flex items-center",
          labelPosition === "left" ? "mr-4" : "mb-2"
        )}>
          <Label
            mandatory={labelMandatory}
            optional={labelOptional}
            suffixIcon={labelSuffixIcon}
            icon={labelIcon}
          >
            {label}
          </Label>
        </div>
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

    return (
      <div className="w-full space-y-2">
        {/* Label */}
        {label && (
          <div className={cn(
            "flex items-center",
            labelPosition === "left" && "mb-0 mr-4"
          )}>
            <Label
              mandatory={labelMandatory}
              optional={labelOptional}
              suffixIcon={labelSuffixIcon}
              icon={labelIcon}
            >
              {label}
            </Label>
          </div>
        )}

        {/* Main Content */}
        <div className="relative">
          {renderField()}
          {(error || helperText) && renderHelperText()}
        </div>
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;

export { dropdownFieldVariants }; 