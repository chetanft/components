"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { useSelectContext } from './SelectContext';

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Item value (required)
   */
  value: string;
  
  /**
   * Whether item is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Item content (can include icons, badges, etc.)
   */
  children: React.ReactNode;
}

/**
 * SelectItem Component
 * 
 * Shadcn-compatible select item component.
 * Accepts any React children for custom content (icons, badges, etc.).
 * 
 * @public
 */
export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({
    value,
    disabled = false,
    children,
    className,
    onClick,
    ...props
  }, ref) => {
    const { value: selectedValue, onValueChange, onOpenChange, selectedLabel, setSelectedLabel } = useSelectContext();
    const isSelected = selectedValue === value;
    const itemRef = useRef<HTMLDivElement>(null);

    // Sync label into context when this item matches the current value on mount
    // (handles defaultValue / controlled value without a prior click)
    useEffect(() => {
      if (isSelected && !selectedLabel) {
        const label = typeof children === 'string'
          ? children
          : itemRef.current?.textContent || value;
        setSelectedLabel(label);
      }
    }, [isSelected, selectedLabel, children, value, setSelectedLabel]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      
      // Extract text content for display
      const textContent = typeof children === 'string' 
        ? children 
        : (e.currentTarget.textContent || value);
      setSelectedLabel(textContent);
      
      onValueChange?.(value);
      onOpenChange(false);
      onClick?.(e);
    };

    // Combine forwarded ref with local ref
    React.useImperativeHandle(ref, () => itemRef.current as HTMLDivElement);

    return (
      <div
        ref={itemRef}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        onClick={handleClick}
        className={cn(
          'relative flex w-full cursor-pointer select-none items-center rounded-sm py-[var(--spacing-x3)] px-[var(--spacing-x3)]',
          'text-sm outline-none transition-colors',
          'focus:bg-[var(--bg-secondary)] focus:text-[var(--primary)]',
          disabled
            ? 'pointer-events-none opacity-50'
            : 'hover:bg-[var(--bg-secondary)] hover:text-[var(--primary)]',
          isSelected && 'bg-[var(--bg-secondary)]',
          className
        )}
        {...props}
      >
        {children}
        {isSelected && (
          <Icon
            name="check-alt"
            size={16}
            className="ml-auto text-[var(--primary)]"
          />
        )}
      </div>
    );
  }
);

SelectItem.displayName = 'SelectItem';

