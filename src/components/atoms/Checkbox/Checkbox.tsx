"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../Icons';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  indeterminate?: boolean;
  size?: 'sm' | 'md';
  error?: boolean;
  description?: string;
  children?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    className,
    label,
    indeterminate,
    size = 'md',
    disabled,
    error,
    description,
    id,
    'aria-describedby': ariaDescribedBy,
    children,
    ...props
  }, ref) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    const generatedId = React.useId();

    React.useImperativeHandle(ref, () => checkboxRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

    // Generate IDs for accessibility (always call useId to avoid conditional hooks)
    const checkboxId = id ?? `checkbox-${generatedId}`;
    const descriptionId = description ? `${checkboxId}-description` : undefined;
    const describedBy = [descriptionId, ariaDescribedBy].filter(Boolean).join(' ') || undefined;

    // Size configuration using design tokens
    const sizeConfig = {
      sm: {
        checkbox: "w-4 h-4",
        icon: 12,
        gap: "gap-2",
        text: "text-sm"
      },
      md: {
        checkbox: "w-5 h-5",
        icon: 16,
        gap: "gap-2.5",
        text: "text-base"
      }
    };

    const currentSize = sizeConfig[size];

    // Checkbox styles using design tokens and dark mode
    const checkboxStyles = cn(
      // Base styles
      "relative shrink-0 rounded border-2 transition-all duration-200 cursor-pointer",
      "flex items-center justify-center",
      // Size
      currentSize.checkbox,
      // State styles with dark mode support
      disabled
        ? "bg-surface-alt border-border-secondary cursor-not-allowed"
        : error
          ? props.checked || indeterminate
            ? "bg-critical border-critical text-[var(--color-bg-primary)] hover:bg-critical/90 hover:border-critical/90"
            : "border-critical bg-surface text-critical hover:bg-critical/5"
          : props.checked || indeterminate
            ? "bg-[var(--primary)] border-[var(--primary)] text-[var(--color-bg-primary)] hover:bg-[var(--primary)]/90 hover:border-[var(--primary)]/90"
            : "border-[var(--border-primary)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] hover:border-[var(--border-hover)]",
      // Focus styles
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]",
      error
        ? "focus-visible:ring-critical/50"
        : "focus-visible:ring-[var(--primary)]/50",
      className
    );

    // Label styles with dark mode
    const labelStyles = cn(
      "font-medium leading-relaxed cursor-pointer select-none",
      currentSize.text,
      disabled
        ? "text-[var(--secondary)] cursor-not-allowed"
        : error
          ? "text-critical"
          : "text-[var(--primary)]"
    );

    // Description styles
    const descriptionStyles = cn(
      "text-sm leading-relaxed mt-1",
      disabled
        ? "text-[var(--secondary)]"
        : error
          ? "text-critical"
          : "text-[var(--secondary)]"
    );

    // Container styles - use items-center for perfect middle alignment
    const containerStyles = cn(
      "inline-flex items-center",
      currentSize.gap
    );

    // Handle controlled/uncontrolled checkbox
    const isControlled = props.checked !== undefined;
    const hasOnChange = props.onChange !== undefined;
    // Children is already extracted, so props won't contain it
    const inputProps = { ...props };

    // If checked is provided without onChange, use defaultChecked for uncontrolled
    if (isControlled && !hasOnChange && 'checked' in inputProps) {
      inputProps.defaultChecked = inputProps.checked;
      delete inputProps.checked;
    }

    return (
      <div className="flex flex-col">
        <label className={containerStyles}>
          <div className="relative flex items-center">
            <input
              id={checkboxId}
              type="checkbox"
              className="sr-only"
              ref={checkboxRef}
              disabled={disabled}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={describedBy}
              {...inputProps}
            />
            <div className={checkboxStyles} tabIndex={disabled ? -1 : 0}>
              {/* Checkmark icon */}
              {(props.checked || indeterminate) && (
                <Icon
                  name={indeterminate ? "subtract" : "check-alt"}
                  size={currentSize.icon}
                  className="transition-opacity"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
          {children ? (
            <span className={labelStyles}>{children}</span>
          ) : label ? (
            <span className={labelStyles}>{label}</span>
          ) : null}
        </label>
        {description && (
          <p
            id={descriptionId}
            className={descriptionStyles}
            style={{ marginLeft: `calc(${currentSize.checkbox.split(' ')[0].replace('w-', '')} * 0.25rem + ${currentSize.gap.replace('gap-', '').replace('[', '').replace(']', '')} * 0.25rem)` }}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox'; 
