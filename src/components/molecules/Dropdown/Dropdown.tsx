"use client";
import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn, type ComponentSize } from '../../../lib/utils';
import { type GlassVariant } from '../../../lib/glass';
import type { SegmentedTabItem } from '../SegmentedTabs';
import { DropdownProvider } from './DropdownContext';

// Unified dropdown field variants using the design system
const dropdownFieldVariants = cva(
  "relative w-full transition-all duration-200 font-sans font-normal text-[var(--primary)]",
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
  /**
   * Glass morphism variant
   */
  glass?: GlassVariant;
}


/**
 * Dropdown Component
 *
 * A dropdown select component with menu popup.
 * Uses composable API for maximum control over layout and rendering.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Dropdown value={selectedValue} onChange={setValue}>
 *   <DropdownTrigger />
 *   <DropdownContent>
 *     <DropdownMenu>
 *       <DropdownMenuList>
 *         <DropdownMenuItem value="1" label="Option 1" />
 *       </DropdownMenuList>
 *     </DropdownMenu>
 *   </DropdownContent>
 * </Dropdown>
 * ```
 *
 * @remarks
 * - Composable API: Full control over layout, supports `asChild` prop
 * - Supports search, groups, and segmented tabs
 *
 * @important
 * DropdownTrigger and DropdownContent sub-components MUST be wrapped
 * in a parent <Dropdown>.
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      value,
      placeholder = "Select an option",
      size = "md",
      state = "default",
      type = "normal",
      onChange,
      onSearch,
      error,
      helperText,
      portalContainer: customPortalContainer,
      portalId,
      children,
      glass,
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

    const resolvedPortalContainer = customPortalContainer ?? internalPortalContainer;

    const handleSelect = (optionValue: string | number) => {
      setSelectedValue(optionValue);
      setIsOpen(false);
      setSearchQuery("");
      onChange?.(optionValue);
    };

    // Create context value
    const contextValue = {
      isOpen,
      setIsOpen,
      value: selectedValue,
      setValue: (newValue: string | number) => {
        setSelectedValue(newValue);
        onChange?.(newValue);
      },
      options: [],
      placeholder,
      size,
      state,
      type,
      searchQuery,
      setSearchQuery,
      onChange,
      onSearch,
      dropdownRef,
      menuRef,
      menuPosition,
      setMenuPosition,
      portalContainer: resolvedPortalContainer,
      setPortalContainer: () => {},
      handleSelect,
      glass,
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

    return (
        <DropdownProvider value={contextValue}>
            <div className="w-full space-y-2">
                <div className="relative">
                    {children}
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
