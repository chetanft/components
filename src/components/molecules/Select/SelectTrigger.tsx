"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { useSelectContext } from './SelectContext';
import type { ComponentSize } from '../../../lib/utils';

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Trigger size
   * @default 'md'
   */
  size?: ComponentSize;
  
  /**
   * Error state
   * @default false
   */
  error?: boolean;
  
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
}

/**
 * SelectTrigger Component
 * 
 * Shadcn-compatible select trigger button.
 * Opens/closes the select dropdown.
 * 
 * @public
 */
export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({
    children,
    className,
    size = 'md',
    error = false,
    disabled = false,
    ...props
  }, ref) => {
    const { open, onOpenChange, setSize } = useSelectContext();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

    // Combine refs
    React.useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement);

    // Set size in context so SelectValue can access it
    useEffect(() => {
      setSize(size);
    }, [size, setSize]);

    // Calculate position for dropdown
    useEffect(() => {
      if (open && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width
        });
      }
    }, [open]);

    const handleClick = () => {
      if (!disabled) {
        onOpenChange(!open);
      }
    };

    const sizeStyles = {
      xxs: 'h-component-xxs text-xs-rem px-[var(--spacing-x1)]',
      xs: 'h-component-xs text-xs-rem px-[var(--spacing-x1)] py-[var(--spacing-x1)]',
      sm: 'h-component-sm text-sm-rem px-[var(--spacing-x2)]',
      md: 'h-component-md text-md-rem px-[var(--spacing-x2)] py-[var(--spacing-x2)]',
      lg: 'h-component-lg text-md-rem px-[var(--spacing-x3)] py-[var(--spacing-x2)]',
      xl: 'h-component-xl text-md-rem px-[var(--spacing-x4)] py-[var(--spacing-x3)]',
      xxl: 'h-component-xxl text-lg-rem px-[var(--spacing-x5)] py-[var(--spacing-x4)]'
    };

    return (
      <>
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          disabled={disabled}
          onClick={handleClick}
          className={cn(
            'relative w-full border transition-all duration-200 font-sans font-normal',
            'bg-surface text-[var(--primary)]',
            'cursor-pointer flex items-center justify-between',
            sizeStyles[size],
            'rounded-lg',
            error
              ? 'border-critical focus-within:border-critical'
              : disabled
                ? 'bg-surface-alt dark:bg-surface-alt-dark border-border-disabled dark:border-border-disabled-dark text-input-disabled dark:text-input-disabled-dark cursor-not-allowed'
                : 'border-[var(--border-primary)] dark:border-border-dark hover:border-[var(--primary)] dark:hover:border-[var(--primary)] focus-within:border-primary dark:focus-within:border-primary-dark',
            className
          )}
          {...props}
        >
          {children}
          <Icon
            name="chevron-down"
            size={18}
            className={cn(
              'transition-transform duration-200',
              open && 'rotate-180',
              disabled ? 'text-input-disabled dark:text-input-disabled-dark' : 'text-[var(--primary)]'
            )}
          />
        </button>
        {/* Store position in data attribute for SelectContent */}
        <div
          data-select-position={JSON.stringify(position)}
          style={{ display: 'none' }}
          aria-hidden="true"
        />
      </>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

