"use client";
import React, { forwardRef, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, type ComponentSize } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Label } from '../../atoms/Label/Label';
import type { SegmentedTabItem } from '../SegmentedTabs';
import { DropdownMenu, type DropdownMenuOption } from '../DropdownMenu';
import { DropdownProvider } from './DropdownContext';
import { DropdownTrigger } from './DropdownTrigger';
import { DropdownContent } from './DropdownContent';
import type { DropdownOption } from './DropdownTypes';

// Unified dropdown field variants using the design system
const dropdownFieldVariants = cva(
  "relative w-full border transition-all duration-200 font-sans font-normal bg-surface text-[var(--primary)]",
  {
    variants: {
      size: {
        xxs: "text-xs-rem",
        xs: "text-xs-rem",
        sm: "text-sm-rem",
        md: "text-md-rem",
        lg: "text-md-rem",
        xl: "text-md-rem",
        xxl: "text-lg-rem",
      },
      state: {
        default: "border-[var(--border-primary)] dark:border-border-dark hover:border-[var(--primary)] dark:hover:border-[var(--primary)] focus-within:border-primary dark:focus-within:border-primary-dark",
        error: "border-critical focus-within:border-critical",
        disabled: "bg-surface-alt dark:bg-surface-alt-dark border-border-disabled dark:border-border-disabled-dark text-input-disabled dark:text-input-disabled-dark cursor-not-allowed",
      },
      type: {
        normal: "",
        search: "",
        groups: "",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
      type: "normal",
    },
  }
);


export interface DropdownProps extends VariantProps<typeof dropdownFieldVariants> {
  /**
   * Options array (for declarative API)
   * @deprecated Use DropdownContent with DropdownItem components instead
   */
  options?: DropdownOption[];
  /**
   * Selected value
   */
  value?: string | number;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Component size
   * @default 'md'
   */
  size?: ComponentSize;
  /**
   * Component state
   * @default 'default'
   */
  state?: 'default' | 'error' | 'disabled';
  /**
   * Dropdown type
   * @default 'normal'
   */
  type?: 'normal' | 'search' | 'groups';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Change handler
   */
  onChange?: (value: string | number) => void;
  /**
   * Search handler
   */
  onSearch?: (query: string) => void;
  /**
   * Label text (for declarative API)
   * @deprecated Use Label component with composable API
   */
  label?: string;
  /**
   * Label mandatory indicator
   */
  labelMandatory?: boolean;
  /**
   * Label optional indicator
   */
  labelOptional?: boolean;
  /**
   * Label suffix icon
   */
  labelSuffixIcon?: boolean;
  /**
   * Label icon
   */
  labelIcon?: React.ReactNode;
  /**
   * Label position
   * @default 'top'
   */
  labelPosition?: 'top' | 'left';
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Required indicator
   */
  required?: boolean;
  /**
   * @deprecated Use `onChange` instead. Will be removed in v3.0.0.
   */
  onSelect?: (value: string) => void;
  /**
   * Segments for segmented search
   */
  segments?: SegmentedTabItem[];
  /**
   * Selected segment
   */
  selectedSegment?: string;
  /**
   * Segment change handler
   */
  onSegmentChange?: (value: string) => void;
  /**
   * Dropdown content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Custom portal container for the dropdown menu.
   * Use this when you need deterministic positioning (e.g., app-level portal node).
   */
  portalContainer?: HTMLElement;
  /**
   * Optional ID assigned to the portal container.
   */
  portalId?: string;
  /**
   * Extra class name applied to the portal wrapper.
   */
  portalClassName?: string;
  /**
   * Additional inline styles applied to the portal wrapper.
   */
  portalStyle?: React.CSSProperties;
  /**
   * Additional class name applied to the `DropdownMenu`.
   */
  menuClassName?: string;
  /**
   * Additional inline styles applied to the `DropdownMenu`.
   */
  menuStyle?: React.CSSProperties;
}

interface SizeStyles {
  height: string;
  fontSize: string;
  borderRadius: string;
  padding: string;
  iconSize: number;
}

const sizeStylesMap: Record<ComponentSize, SizeStyles> = {
  xxs: {
    height: "h-component-xxs",
    fontSize: "text-xs-rem",
    borderRadius: "rounded-lg",
    padding: "px-[var(--spacing-x1)]",
    iconSize: 12,
  },
  xs: {
    height: "h-component-xs",
    fontSize: "text-xs-rem",
    borderRadius: "rounded-lg",
    padding: "px-[var(--spacing-x1)] py-[var(--spacing-x1)]",
    iconSize: 14,
  },
  sm: {
    height: "h-component-sm",
    fontSize: "text-sm-rem",
    borderRadius: "rounded-lg",
    padding: "px-[var(--spacing-x2)]",
    iconSize: 16,
  },
  md: {
    height: "h-component-md",
    fontSize: "text-md-rem",
    borderRadius: "rounded-lg",
    padding: "px-[var(--spacing-x2)] py-[var(--spacing-x2)]",
    iconSize: 18,
  },
  lg: {
    height: "h-component-lg",
    fontSize: "text-md-rem",
    borderRadius: "rounded-lg",
    padding: "px-[var(--spacing-x3)] py-[var(--spacing-x2)]",
    iconSize: 20,
  },
  xl: {
    height: "h-component-xl",
    fontSize: "text-md-rem",
    borderRadius: "rounded-lg",
    padding: "px-[var(--spacing-x4)] py-[var(--spacing-x3)]",
    iconSize: 22,
  },
  xxl: {
    height: "h-component-xxl",
    fontSize: "text-lg-rem",
    borderRadius: "rounded-lg",
    padding: "px-[var(--spacing-x5)] py-[var(--spacing-x4)]",
    iconSize: 24,
  },
};

/**
 * Dropdown Component
 * 
 * A dropdown select component with menu popup.
 * Supports both composable API (maximum control) and declarative API (simple usage).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Simple declarative API (most common)
 * <Dropdown
 *   value={selectedValue}
 *   onChange={setValue}
 *   options={options}
 *   placeholder="Select an option"
 * />
 * 
 * // Composable API (for custom layouts)
 * <Dropdown value={selectedValue} onChange={setValue} options={options}>
 *   <DropdownTrigger />
 *   <DropdownContent />
 * </Dropdown>
 * ```
 * 
 * @remarks
 * - Declarative API: Simple, no composition needed - use for most cases
 * - Composable API: Full control over layout, supports `asChild` prop
 * - Supports search, groups, and segmented tabs
 * 
 * @important
 * If using DropdownTrigger or DropdownContent sub-components, they MUST be wrapped
 * in a parent <Dropdown>. For simple use cases, use the declarative API instead.
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options = [],
      value,
      placeholder = "Select an option",
      size = "md",
      state = "default",
      type = "normal",
      className,
      onChange,
      onSearch: _onSearch,
      label,
      labelMandatory,
      labelOptional,
      labelSuffixIcon,
      labelIcon,
      labelPosition = "top",
      error,
      helperText,
      required: _required = false,
      onSelect,
      segments,
      selectedSegment,
      onSegmentChange,
      portalContainer: customPortalContainer,
      portalId,
      portalClassName,
      portalStyle,
      menuClassName,
      menuStyle,
      children,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedValue, setSelectedValue] = useState(value);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
    const [internalPortalContainer, setInternalPortalContainer] = useState<HTMLElement | null>(null);

    const sizeStyles = sizeStylesMap[size];

    useEffect(() => {
      if (customPortalContainer) {
        setInternalPortalContainer(null);
        return;
      }

      const container = document.createElement('div');
      container.setAttribute('data-dropdown-portal', 'true');
      if (portalId) {
        container.id = portalId;
      }
      document.body.appendChild(container);
      setInternalPortalContainer(container);

      return () => {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      };
    }, [customPortalContainer, portalId]);

    // Calculate menu position when it opens or window scrolls/resizes
    useEffect(() => {
      const updateMenuPosition = () => {
        if (isOpen && dropdownRef.current) {
          const rect = dropdownRef.current.getBoundingClientRect();
          // For fixed positioning, use viewport coordinates directly
          const top = rect.bottom + 4;
          const left = rect.left;
          const width = rect.width;
          setMenuPosition({ top, left, width });
        }
      };

      updateMenuPosition();

      if (isOpen) {
        window.addEventListener('scroll', updateMenuPosition, true);
        window.addEventListener('resize', updateMenuPosition);
      }

      return () => {
        window.removeEventListener('scroll', updateMenuPosition, true);
        window.removeEventListener('resize', updateMenuPosition);
      };
    }, [isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchQuery("");
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Filter options based on search query
    const filteredOptions = options.filter((option: DropdownOption) => {
      const searchTarget = option.searchValue || (typeof option.label === 'string' ? option.label : String(option.value));
      return searchTarget.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const selectedOption = (options || []).find((option: DropdownOption) => option.value === selectedValue);
    const resolvedPortalContainer = customPortalContainer ?? internalPortalContainer;

    const handleSelect = (optionValue: string | number) => {
      setSelectedValue(optionValue);
      setIsOpen(false);
      setSearchQuery("");

      // Deprecation warning for onSelect
      if (onSelect) {
        console.warn('Dropdown: `onSelect` is deprecated. Use `onChange` instead. This prop will be removed in v3.0.0.');
        onSelect(String(optionValue));
      }

      onChange?.(optionValue);
    };
    
    // Check if using composable API (has children with Dropdown sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
        child?.type?.displayName?.startsWith('Dropdown')
    );
    
    // Create context value
    const contextValue = {
      isOpen,
      setIsOpen,
      value: selectedValue,
      setValue: (newValue: string | number) => {
        setSelectedValue(newValue);
        onChange?.(newValue);
      },
      options,
      placeholder,
      size,
      state,
      type,
      searchQuery,
      setSearchQuery,
      onChange,
      onSearch: _onSearch,
      dropdownRef,
      menuRef,
      menuPosition,
      setMenuPosition,
      portalContainer: resolvedPortalContainer,
      setPortalContainer: () => {},
      handleSelect,
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
          ref={(node) => {
            if (dropdownRef) {
              (dropdownRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={fieldClasses}
          onClick={(e) => {
            e.stopPropagation();
            if (state !== "disabled") {
              setIsOpen(!isOpen);
            }
          }}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={isOpen ? "dropdown-menu" : undefined}
          aria-disabled={state === "disabled"}
          data-size={size}
          {...props}
        >
          <span className={cn(
            selectedOption ? "text-[var(--primary)]" : "text-[var(--tertiary)]",
            sizeStyles.fontSize
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
        </div>
      );
    };

    const renderMenu = () => {
      if (!isOpen || !resolvedPortalContainer) return null;

      const hasSegments = Array.isArray(segments) && segments.length > 0;
      const segmentsArray = hasSegments ? segments : [];

      // Convert DropdownOption to DropdownMenuOption
      const menuOptions: DropdownMenuOption[] = filteredOptions.map((option) => ({
        value: String(option.value),
        label: option.label,
        description: option.description,
        icon: option.icon,
        group: option.group,
        searchValue: option.searchValue,
        state: option.disabled ? 'disabled' : selectedValue === option.value ? 'selected' : 'default',
        prefix: option.icon ? 'icon' : 'none',
        suffix: false,
        showCheckmark: true,
      }));

      // Determine property type for DropdownMenu
      let property: 'default' | 'search' | 'search-segmented' | 'groups' = 'default';
      if (type === 'search' && hasSegments) {
        property = 'search-segmented';
      } else if (type === 'search') {
        property = 'search';
      } else if (type === 'groups') {
        property = 'groups';
      }

      const wrapperStyle: React.CSSProperties = {
        position: 'fixed',
        top: menuPosition.top,
        left: menuPosition.left,
        width: menuPosition.width,
        zIndex: 9999,
        ...(portalStyle ?? {})
      };

      return ReactDOM.createPortal(
        <div
          ref={menuRef}
          className={cn(
            portalClassName,
            "w-full"
          )}
          style={wrapperStyle}
          onClick={(e) => e.stopPropagation()}
          id="dropdown-menu"
        >
          <DropdownMenu
            property={property}
            options={menuOptions}
            segments={segmentsArray}
            selectedSegment={selectedSegment}
            onSegmentChange={onSegmentChange}
            onSelect={(value) => {
              const option = options.find((opt) => String(opt.value) === value);
              if (option && !option.disabled) {
                handleSelect(option.value);
              }
            }}
            className={cn("w-full", menuClassName)}
            style={menuStyle}
          />
        </div>,
        resolvedPortalContainer
      );
    };

    const renderHelperText = () => {
      if (!helperText && !error) return null;

      return (
        <p className={cn(
          "text-sm-rem leading-relaxed mt-[var(--spacing-x2)]",
          error ? "text-critical" : "text-secondary"
        )}>
          {error || helperText}
        </p>
      );
    };

    // If using composable API, render with context provider
    if (hasComposableChildren) {
        if (process.env.NODE_ENV !== 'production' && (label || options.length > 0)) {
            console.warn(
                'Dropdown: Using deprecated props (label, options) with composable API. ' +
                'Please use DropdownTrigger and DropdownContent components instead. ' +
                'See migration guide: docs/migrations/composable-migration.md'
            );
        }
        
        return (
            <DropdownProvider value={contextValue}>
                <div className="w-full space-y-2">
                    {label && (
                        <div className={cn(
                            "flex items-center",
                            labelPosition === "left" && "mb-0 mr-[var(--spacing-x4)]"
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
                    <div className="relative">
                        {children}
                        {(error || helperText) && renderHelperText()}
                    </div>
                </div>
            </DropdownProvider>
        );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && options.length > 0) {
        console.warn(
            'Dropdown: Declarative API (options prop) is deprecated. ' +
            'Please migrate to composable API using DropdownTrigger and DropdownContent components. ' +
            'See migration guide: docs/migrations/composable-migration.md'
        );
    }
    
    return (
        <DropdownProvider value={contextValue}>
            <div className="w-full space-y-2">
                {/* Label */}
                {label && (
                    <div className={cn(
                        "flex items-center",
                        labelPosition === "left" && "mb-0 mr-[var(--spacing-x4)]"
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
                    {renderMenu()}
                    {(error || helperText) && renderHelperText()}
                </div>
            </div>
        </DropdownProvider>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;

export { dropdownFieldVariants }; 
export type { DropdownOption } from './DropdownTypes';
