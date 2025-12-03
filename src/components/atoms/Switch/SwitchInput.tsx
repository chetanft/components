"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useSwitchContext } from './SwitchContext';

export interface SwitchInputProps extends Omit<ComposableProps<'input'>, 'type' | 'size'> {
  /**
   * Additional className for the track element
   */
  trackClassName?: string;
  /**
   * Additional className for the thumb element
   */
  thumbClassName?: string;
}

/**
 * SwitchInput Component
 *
 * A composable switch input component with custom visual styling.
 * Supports checked and unchecked states with smooth animations.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Switch>
 *   <SwitchInput checked={isEnabled} onChange={handleChange} />
 *   <SwitchLabel>Enable notifications</SwitchLabel>
 * </Switch>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<input type="checkbox">` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically applies validation state styling based on context.
 * - Accessible: includes ARIA attributes and keyboard navigation.
 */
export const SwitchInput = React.forwardRef<HTMLInputElement, SwitchInputProps>(
  ({
    className,
    trackClassName,
    thumbClassName,
    asChild,
    disabled,
    checked,
    ...props
  }, ref) => {
    const { switchId, size, disabled: contextDisabled, hasError } = useSwitchContext();
    const isDisabled = disabled ?? contextDisabled;
    
    const sizeStyles = {
      sm: {
        track: "w-[30px] h-[16px]",
        thumb: "w-[14px] h-[14px]",
        gap: "gap-[6px]",
      },
      md: {
        track: "w-[34px] h-[14px]",
        thumb: "w-[20px] h-[20px]",
        gap: "gap-[8px]",
      }
    };

    const currentSize = sizeStyles[size];

    const trackStyles = cn(
      "relative inline-flex shrink-0 rounded-full border-0 transition-all duration-200 cursor-pointer",
      currentSize.track,
      isDisabled
        ? "bg-[var(--switch-disabled-bg)]"
        : checked
          ? "bg-[var(--primary)]"
          : "bg-[var(--neutral-300)]",
      "focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-neutral-light)] focus-within:ring-offset-2",
      hasError && "ring-2 ring-critical",
      trackClassName,
      className
    );

    const thumbStyles = cn(
      "absolute top-1/2 transform -translate-y-1/2 rounded-full transition-all duration-200 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.35)]",
      currentSize.thumb,
      checked
        ? "translate-x-[14px]"
        : "translate-x-[-3px]",
      isDisabled
        ? checked
          ? "bg-[var(--switch-disabled-thumb-on)]"
          : "bg-[var(--switch-disabled-thumb)]"
        : "bg-[var(--color-bg-primary)]",
      thumbClassName
    );

    if (asChild) {
      return (
        <label className={cn("inline-flex items-center", currentSize.gap)}>
          <div className={trackStyles}>
            <Slot
              ref={ref}
              id={switchId}
              {...({ type: "checkbox", checked } as any)}
              className="sr-only"
              disabled={isDisabled}
              aria-invalid={hasError ? 'true' : 'false'}
              {...props}
            />
            <div className={thumbStyles} />
          </div>
        </label>
      );
    }

    return (
      <label className={cn("inline-flex items-center", currentSize.gap)}>
        <div className={trackStyles}>
          <input
            id={switchId}
            type="checkbox"
            className="sr-only"
            ref={ref}
            disabled={isDisabled}
            checked={checked}
            aria-invalid={hasError ? 'true' : 'false'}
            {...props}
          />
          <div className={thumbStyles} />
        </div>
      </label>
    );
  }
);

SwitchInput.displayName = 'SwitchInput';

