"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useCheckboxContext } from './CheckboxContext';
import { Icon } from '../Icons';
import { getGlassClasses, useResolvedGlass, getGlassInnerBg, type GlassVariant } from '../../../lib/glass';

export interface CheckboxInputProps extends Omit<ComposableProps<'input'>, 'type' | 'size'> {
  /**
   * Indeterminate state (shows minus icon instead of check)
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Enable glassmorphism effect on checkbox background
   * - `true`: Standard glass effect
   * - `'subtle'`: Subtle glass effect
   * - `'prominent'`: Prominent glass effect
   */
  glass?: GlassVariant;
}

/**
 * CheckboxInput Component
 *
 * A composable checkbox input component with custom visual styling.
 * Supports checked, unchecked, and indeterminate states.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Checkbox>
 *   <CheckboxInput checked={isChecked} onChange={handleChange} />
 *   <CheckboxLabel>Accept terms</CheckboxLabel>
 * </Checkbox>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<input type="checkbox">` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically applies validation state styling based on context.
 * - Accessible: includes ARIA attributes and keyboard navigation.
 */
export const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({
    className,
    indeterminate = false,
    glass,
    asChild,
    disabled,
    checked,
    'aria-describedby': ariaDescribedBy,
    onChange,
    readOnly,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
    const { checkboxId, size, disabled: contextDisabled, hasError, descriptionId } = useCheckboxContext();
    const isDisabled = disabled ?? contextDisabled;
    const checkboxRef = React.useRef<HTMLInputElement>(null);
    
    React.useImperativeHandle(ref, () => checkboxRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

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
    const describedBy = [descriptionId, ariaDescribedBy].filter(Boolean).join(' ') || undefined;
    const isControlledWithoutOnChange = checked !== undefined && !onChange;
    const effectiveReadOnly = readOnly ?? isControlledWithoutOnChange;

    const checkboxStyles = cn(
      "relative shrink-0 rounded border-2 transition-all duration-200 cursor-pointer",
      "flex items-center justify-center",
      currentSize.checkbox,
      isDisabled
        ? "bg-surface-alt border-border-secondary cursor-not-allowed"
        : hasError
          ? checked || indeterminate
            ? "bg-critical border-critical text-[var(--color-bg-primary)] hover:bg-critical/90 hover:border-critical/90"
            : "border-critical bg-surface text-critical hover:bg-critical/5"
          : checked || indeterminate
            ? "bg-[var(--primary)] border-[var(--primary)] text-[var(--color-bg-primary)] hover:bg-[var(--primary)]/90 hover:border-[var(--primary)]/90"
            : cn("border-[var(--border-primary)]", resolvedGlass ? "bg-white/10 dark:bg-white/10 hover:bg-white/15 dark:hover:bg-white/15" : "bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)]", "hover:border-[var(--border-hover)]"),
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]",
      hasError
        ? "focus-visible:ring-critical/50"
        : "focus-visible:ring-[var(--primary)]/50",
      className
    );

    if (asChild) {
      return (
        <label className={cn("inline-flex items-center", currentSize.gap)}>
          <div className="relative flex items-center">
            <Slot
              ref={checkboxRef}
              id={checkboxId}
              {...({ type: "checkbox" } as any)}
              className="sr-only"
              disabled={isDisabled}
              aria-invalid={hasError ? 'true' : 'false'}
              aria-describedby={describedBy}
              checked={checked}
              onChange={onChange}
              readOnly={effectiveReadOnly}
              {...props}
            />
            <div className={checkboxStyles} tabIndex={isDisabled ? -1 : 0}>
              {(checked || indeterminate) && (
                <Icon
                  name={indeterminate ? "subtract" : "check-alt"}
                  size={currentSize.icon}
                  className="transition-opacity"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </label>
      );
    }

    return (
      <label className={cn("inline-flex items-center", currentSize.gap)}>
        <div className="relative flex items-center">
          <input
            id={checkboxId}
            type="checkbox"
            className="sr-only"
            ref={checkboxRef}
            disabled={isDisabled}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={describedBy}
            checked={checked}
            onChange={onChange}
            readOnly={effectiveReadOnly}
            {...props}
          />
          <div className={checkboxStyles} tabIndex={isDisabled ? -1 : 0}>
            {(checked || indeterminate) && (
              <Icon
                name={indeterminate ? "subtract" : "check-alt"}
                size={currentSize.icon}
                className="transition-opacity"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </label>
    );
  }
);

CheckboxInput.displayName = 'CheckboxInput';
