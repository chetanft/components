"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { Icon } from '../../atoms/Icons';
import { useDropdownContext } from './DropdownContext';

export interface DropdownTriggerProps extends ComposableProps<'div'> {
  /**
   * Trigger content (optional, defaults to selected option or placeholder).
   */
  children?: React.ReactNode;
}

/**
 * DropdownTrigger Component
 *
 * A composable component for the trigger button/field of a Dropdown.
 * Typically wraps the display value and chevron icon.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Dropdown value={selectedValue} options={options}>
 *   <DropdownTrigger />
 *   <DropdownContent />
 * </Dropdown>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles open/close state and displays selected value.
 */
export const DropdownTrigger = React.forwardRef<HTMLDivElement, DropdownTriggerProps>(
  ({ className, children, asChild, onClick, ...props }, ref) => {
    const {
      isOpen,
      setIsOpen,
      value,
      options,
      placeholder,
      size,
      state,
      type,
      dropdownRef,
    } = useDropdownContext();
    
    const sizeStylesMap: Record<string, { height: string; fontSize: string; borderRadius: string; padding: string; iconSize: number }> = {
      xxs: { height: "h-component-xxs", fontSize: "text-xs-rem", borderRadius: "rounded-lg", padding: "px-[var(--spacing-x1)]", iconSize: 12 },
      xs: { height: "h-component-xs", fontSize: "text-xs-rem", borderRadius: "rounded-lg", padding: "px-[var(--spacing-x1)] py-[var(--spacing-x1)]", iconSize: 14 },
      sm: { height: "h-component-sm", fontSize: "text-sm-rem", borderRadius: "rounded-lg", padding: "px-[var(--spacing-x2)]", iconSize: 16 },
      md: { height: "h-component-md", fontSize: "text-md-rem", borderRadius: "rounded-lg", padding: "px-[var(--spacing-x2)] py-[var(--spacing-x2)]", iconSize: 18 },
      lg: { height: "h-component-lg", fontSize: "text-md-rem", borderRadius: "rounded-lg", padding: "px-[var(--spacing-x3)] py-[var(--spacing-x2)]", iconSize: 20 },
      xl: { height: "h-component-xl", fontSize: "text-md-rem", borderRadius: "rounded-lg", padding: "px-[var(--spacing-x4)] py-[var(--spacing-x3)]", iconSize: 22 },
      xxl: { height: "h-component-xxl", fontSize: "text-lg-rem", borderRadius: "rounded-lg", padding: "px-[var(--spacing-x5)] py-[var(--spacing-x4)]", iconSize: 24 },
    };
    
    const sizeStyles = sizeStylesMap[size] || sizeStylesMap.md;
    
    const selectedOption = options.find((opt) => opt.value === value);
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (state !== "disabled") {
        setIsOpen(!isOpen);
      }
      onClick?.(e);
    };
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref || dropdownRef}
        className={cn(
          "relative w-full border transition-all duration-200 font-sans font-normal bg-surface text-[var(--primary)]",
          sizeStyles.height,
          sizeStyles.fontSize,
          sizeStyles.borderRadius,
          sizeStyles.padding,
          "cursor-pointer flex items-center justify-between",
          state === "default" && "border-[var(--border-primary)] dark:border-border-dark hover:border-[var(--primary)] dark:hover:border-[var(--primary)] focus-within:border-primary dark:focus-within:border-primary-dark",
          state === "error" && "border-critical focus-within:border-critical",
          state === "disabled" && "bg-surface-alt dark:bg-surface-alt-dark border-border-disabled dark:border-border-disabled-dark text-input-disabled dark:text-input-disabled-dark cursor-not-allowed pointer-events-none",
          className
        )}
        onClick={handleClick}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? "dropdown-menu" : undefined}
        aria-disabled={state === "disabled"}
        data-size={size}
        {...props}
      >
        {children || (
          <>
            <span className={cn(
              selectedOption ? "text-[var(--primary)]" : "text-[var(--tertiary)]",
              "text-md-rem"
            )}>
              {selectedOption ? selectedOption.label : placeholder || "Select an option"}
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
          </>
        )}
      </Comp>
    );
  }
);

DropdownTrigger.displayName = 'DropdownTrigger';

