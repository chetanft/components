"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Dropdown } from '../../molecules/Dropdown/Dropdown';
import type { DropdownOption } from '../../molecules/Dropdown';
import type { DataEntryCellState } from './DataEntryTableCell';

export interface DataEntryTableCellDropdownProps {
  value?: string | number;
  placeholder?: string;
  error?: string;
  state?: DataEntryCellState;
  options?: DropdownOption[];
  onChange?: (value: string | number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

export const DataEntryTableCellDropdown: React.FC<DataEntryTableCellDropdownProps> = ({
  value,
  placeholder = 'Value',
  error,
  state = 'default',
  options = [],
  onChange,
  onFocus,
  onBlur,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
        setIsFocused(false);
        setDropdownPosition(null);
        onBlur?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onBlur]);

  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
    
    // Calculate position for fixed dropdown
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
    
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsOpen(false);
    setDropdownPosition(null);
    onBlur?.();
  };

  const handleChange = (newValue: string | number) => {
    onChange?.(newValue);
  };

  // Determine effective state
  const effectiveState = error && state !== 'disabled' ? 'error-filled' : 
                         isFocused || isOpen ? 'focused' :
                         value ? 'filled' :
                         state;

  // Get border and background styles based on state
  const getStateStyles = () => {
    switch (effectiveState) {
      case 'hover':
        return {
          border: 'border-[var(--primary)]',
          bg: 'bg-[var(--bg-primary)]',
          boxShadow: undefined,
        };
      case 'focused':
        return {
          border: 'border-[var(--primary)]',
          bg: 'bg-[var(--bg-primary)]',
          boxShadow: '0px 0px 0px 2px var(--border-primary)',
        };
      case 'error-filled':
        return {
          border: 'border-[var(--critical)]',
          bg: 'bg-[var(--bg-primary)]',
          boxShadow: '0px 0px 0px 2px var(--critical-light)',
        };
      case 'disabled':
      case 'pre-filled':
        return {
          border: 'border-[var(--border-secondary)]',
          bg: 'bg-[var(--bg-secondary)]',
          boxShadow: undefined,
        };
      case 'filled':
        return {
          border: 'border-[var(--border-secondary)]',
          bg: 'bg-[var(--bg-primary)]',
          boxShadow: undefined,
        };
      default:
        return {
          border: 'border-[var(--border-secondary)]',
          bg: 'bg-[var(--bg-primary)]',
          boxShadow: undefined,
        };
    }
  };

  const stateStyles = getStateStyles();
  const hasValue = value !== undefined && value !== null && value !== '';

  // For table cell context, we need a compact dropdown without label
  // Use loose equality to handle string/number mismatches
  const selectedOption = options.find(opt => {
    // Handle both strict and loose equality for value matching
    return opt.value === value || String(opt.value) === String(value) || opt.value == value;
  });

  return (
    <div ref={dropdownRef} className={cn("relative w-full h-full", className)}>
      <div
        ref={triggerRef}
        className={cn(
          "flex items-center justify-between px-[var(--x3)] py-[var(--x0)]",
          "h-[var(--component-height-md)]",
          "bg-[var(--bg-primary)] border border-[var(--border-secondary)] border-solid box-border",
          "relative shrink-0",
          "transition-all duration-200 cursor-pointer",
          stateStyles.border,
          effectiveState === 'disabled' && "cursor-not-allowed",
          "w-full"
        )}
        style={{
          boxShadow: stateStyles.boxShadow,
        }}
        onClick={() => {
          if (effectiveState !== 'disabled') {
            handleFocus();
          }
        }}
      >
        <div className="box-border flex flex-[1_0_0] gap-[var(--x1)] h-[var(--component-height-md)] items-center min-h-px min-w-px px-[var(--x0)] py-[var(--x5)] relative rounded-[var(--radius-md)] shrink-0">
          <p className={cn(
            "flex-[1_0_0] font-normal leading-[1.4] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 whitespace-nowrap",
            hasValue ? "text-[var(--primary)]" : "text-[var(--tertiary)]",
            effectiveState === 'disabled' && "text-[var(--tertiary)]"
          )}
          style={{
            fontSize: 'var(--font-size-md)',
          }}
          >
            {hasValue 
              ? (typeof selectedOption?.label === 'string' ? selectedOption.label : String(value))
              : placeholder
            }
          </p>
          <Icon
            name="chevron-down"
            size={16}
            className={cn(
              "overflow-clip relative shrink-0",
              "transition-transform duration-200",
              isOpen && "rotate-180",
              effectiveState === 'disabled' 
                ? "text-[var(--tertiary)]" 
                : "text-[var(--primary)]"
            )}
          />
        </div>
      </div>
      {isOpen && options.length > 0 && dropdownPosition && (
        <div
          className="fixed z-[9999]"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
          }}
        >
          <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-[var(--radius-md)] shadow-lg overflow-y-auto" style={{ maxHeight: 'var(--x20, 80px)' }}>
            {options.map((option) => (
              <button
                key={String(option.value)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleChange(option.value);
                  handleBlur();
                }}
                disabled={option.disabled}
                className={cn(
                  "w-full px-[var(--spacing-x3)] py-[var(--spacing-x2)]",
                  "text-left leading-[1.4] font-normal font-sans",
                  "text-[length:var(--font-size-md)]",
                  "text-[var(--primary)]",
                  "hover:bg-[var(--bg-secondary)]",
                  "transition-colors duration-150",
                  "border-0 bg-transparent cursor-pointer",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  option.value === value && "bg-[var(--bg-secondary)]"
                )}
              >
                {typeof option.label === 'string' ? option.label : String(option.value)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

DataEntryTableCellDropdown.displayName = 'DataEntryTableCellDropdown';

