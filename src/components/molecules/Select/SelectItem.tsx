"use client";

import React from 'react';
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
    const { value: selectedValue, onValueChange, onOpenChange, setSelectedLabel } = useSelectContext();
    const isSelected = selectedValue === value;

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

    return (
      <div
        ref={ref}
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

