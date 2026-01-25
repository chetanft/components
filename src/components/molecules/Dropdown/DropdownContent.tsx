"use client";

import React from 'react';
import ReactDOM from 'react-dom';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { DropdownMenu, type DropdownMenuOption } from '../DropdownMenu';
import { useDropdownContext } from './DropdownContext';

export interface DropdownContentProps extends ComposableProps<'div'> {
  /**
   * Content (typically DropdownItem components or DropdownMenu).
   */
  children?: React.ReactNode;
}

/**
 * DropdownContent Component
 *
 * A composable component for the dropdown menu content.
 * Typically wraps DropdownMenu or custom menu items.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Dropdown value={selectedValue} onChange={setValue} options={options}>
 *   <DropdownTrigger />
 *   <DropdownContent />
 * </Dropdown>
 * ```
 *
 * @remarks
 * - Automatically renders in a portal when Dropdown is open
 * - Supports custom content via children
 * - Handles positioning automatically
 * 
 * @important
 * ⚠️ MUST be used inside a parent Dropdown component. Cannot be used standalone.
 */
export const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const {
      isOpen,
      portalContainer,
      menuPosition,
      menuRef,
      options,
      value,
      type,
      searchQuery,
      handleSelect,
    } = useDropdownContext();
    
    if (!isOpen || !portalContainer) {
      return null;
    }
    
    // Convert DropdownOption to DropdownMenuOption
    const menuOptions: DropdownMenuOption[] = options
      .filter((option) => {
        const searchTarget = option.searchValue || (typeof option.label === 'string' ? option.label : String(option.value));
        return searchTarget.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .map((option) => ({
        value: String(option.value),
        label: option.label,
        description: option.description,
        icon: option.icon,
        group: option.group,
        searchValue: option.searchValue,
        state: option.disabled ? 'disabled' : value === option.value ? 'selected' : 'default',
        prefix: option.icon ? 'icon' : 'none',
        suffix: false,
        showCheckmark: true,
      }));
    
    // Determine property type for DropdownMenu
    let property: 'default' | 'search' | 'search-segmented' | 'groups' = 'default';
    if (type === 'search') {
      property = 'search';
    } else if (type === 'groups') {
      property = 'groups';
    }
    
    const content = children || (
      <DropdownMenu
        property={property}
        options={menuOptions}
        onSelect={(val) => {
          const option = options.find((opt) => String(opt.value) === val);
          if (option && !option.disabled) {
            handleSelect(option.value);
          }
        }}
        className="w-full"
      />
    );
    
    const Comp = asChild ? Slot : 'div';
    return ReactDOM.createPortal(
      <Comp
        ref={ref || menuRef}
        style={{
          position: 'fixed',
          top: menuPosition.top,
          left: menuPosition.left,
          width: menuPosition.width,
          zIndex: 9999,
        }}
        onClick={(e) => e.stopPropagation()}
        id="dropdown-menu"
        className={className}
        {...props}
      >
        {content}
      </Comp>,
      portalContainer
    );
  }
);

DropdownContent.displayName = 'DropdownContent';

