"use client";

import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../../lib/utils';
import { Dropdown } from '../Dropdown';
import type { DropdownOption } from '../Dropdown';
import { DropdownMenu, type DropdownMenuOption } from '../DropdownMenu';
import { Button } from '../../atoms/Button/Button';
import { IconName } from '../../atoms/Icons';
import { usePageHeaderFiltersOptional } from '../PageHeaderFilters/PageHeaderFiltersContext';
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery';

export interface FilterDropdownProps {
  /**
   * Unique identifier for this filter (used for context management)
   */
  id: string;
  /**
   * Selected value
   */
  value?: string | number;
  /**
   * Callback when value changes
   */
  onChange?: (value: string | number) => void;
  /**
   * Dropdown options
   */
  options: DropdownOption[];
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Icon name for mobile icon button
   */
  icon?: IconName;
  /**
   * Label for mobile dropdown menu
   */
  label?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FilterDropdown Component
 * 
 * A responsive dropdown filter that shows full dropdown on desktop (≥1200px)
 * and icon button with dropdown menu on mobile (<1200px).
 * 
 * Works standalone or with PageHeaderFiltersProvider for multi-filter coordination.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Standalone usage (works without provider)
 * <FilterDropdown
 *   id="location-filter"
 *   value={location}
 *   onChange={setLocation}
 *   options={locationOptions}
 *   placeholder="Select location"
 * />
 * 
 * // With provider (coordinates multiple filters - only one open at a time)
 * <PageHeaderFiltersProvider>
 *   <FilterDropdown id="location" ... />
 *   <FilterDateRange id="date" ... />
 * </PageHeaderFiltersProvider>
 * ```
 */
export const FilterDropdown = React.forwardRef<HTMLDivElement, FilterDropdownProps>(
  ({ id, value, onChange, options, placeholder, icon = 'chevron-down', label, className }, ref) => {
    const isMobile = useMediaQuery('(max-width: 1199px)');
    
    // Use context if available, otherwise fall back to local state (standalone mode)
    const context = usePageHeaderFiltersOptional();
    const [localOpenFilterId, setLocalOpenFilterId] = useState<string | null>(null);
    
    // Use context values if provider exists, otherwise use local state
    const openFilterId = context?.openFilterId ?? localOpenFilterId;
    const setOpenFilterId = context?.setOpenFilterId ?? setLocalOpenFilterId;
    
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

    const isFilterOpen = openFilterId === id;

    // Create portal container on mount
    useEffect(() => {
      if (typeof document !== 'undefined') {
        const container = document.createElement('div');
        document.body.appendChild(container);
        setPortalContainer(container);
        return () => {
          document.body.removeChild(container);
        };
      }
    }, []);

    // Calculate menu position when it opens
    useEffect(() => {
      const updateMenuPosition = () => {
        if (isFilterOpen && buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const top = rect.bottom + 8;
          const left = rect.left;
          const width = Math.max(rect.width, 200);
          setMenuPosition({ top, left, width });
        }
      };

      updateMenuPosition();

      if (isFilterOpen) {
        window.addEventListener('scroll', updateMenuPosition, true);
        window.addEventListener('resize', updateMenuPosition);
      }

      return () => {
        window.removeEventListener('scroll', updateMenuPosition, true);
        window.removeEventListener('resize', updateMenuPosition);
      };
    }, [isFilterOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node) &&
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setOpenFilterId(null);
        }
      };

      if (isFilterOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isFilterOpen, setOpenFilterId]);

    // Handle keyboard
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isFilterOpen) {
          setOpenFilterId(null);
        }
      };

      if (isFilterOpen) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [isFilterOpen, setOpenFilterId]);

    const handleButtonClick = () => {
      if (isFilterOpen) {
        setOpenFilterId(null);
      } else {
        setOpenFilterId(id);
      }
    };

    const handleSelect = (selectedValue: string) => {
      onChange?.(selectedValue);
      setOpenFilterId(null);
    };

    const _selectedOption = options.find((opt) => opt.value === value);

    // Convert DropdownOption to DropdownMenuOption
    const menuOptions: DropdownMenuOption[] = options.map((option) => ({
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

    // Desktop: render full dropdown
    if (!isMobile) {
      return (
        <div ref={ref} className={cn('w-full', className)}>
          <Dropdown
            value={value}
            onChange={onChange}
            options={options}
            placeholder={placeholder}
            size="md"
            state="default"
          />
        </div>
      );
    }

    // Mobile: render icon button with dropdown menu
    return (
      <>
        <Button
          ref={buttonRef}
          variant="secondary"
          size="md"
          icon={icon}
          iconPosition="only"
          onClick={handleButtonClick}
          className={cn(
            'size-[40px] rounded-[var(--x2,8px)]',
            isFilterOpen && 'bg-[var(--bg-secondary)]'
          )}
          aria-label={label || placeholder || 'Filter'}
          aria-expanded={isFilterOpen}
        />
        {isFilterOpen && portalContainer && (
          <>
            {ReactDOM.createPortal(
              <div
                ref={menuRef}
                style={{
                  position: 'fixed',
                  top: menuPosition.top,
                  left: menuPosition.left,
                  width: menuPosition.width,
                  zIndex: 9999,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenu
                  property="default"
                  options={menuOptions}
                  onSelect={handleSelect}
                  className="w-full"
                />
              </div>,
              portalContainer
            )}
          </>
        )}
      </>
    );
  }
);

FilterDropdown.displayName = 'FilterDropdown';

