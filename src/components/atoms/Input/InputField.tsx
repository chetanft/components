"use client";

import React from 'react';
import { cn, getComponentStyles } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useInputContext } from './InputContext';
import { Icon, IconName } from '../Icons';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export interface InputFieldProps extends Omit<ComposableProps<'input'>, 'size'> {
  /**
   * Icon displayed on the left side of input
   * Can be an IconName string or a custom React component
   */
  leadingIcon?: IconName | React.ReactNode;
  /**
   * Icon displayed on the right side of input
   * Can be an IconName string or a custom React component
   */
  trailingIcon?: IconName | React.ReactNode;
  /**
   * Size for leading icon
   */
  leadingIconSize?: number;
  /**
   * Size for trailing icon
   */
  trailingIconSize?: number;
  /**
   * Additional CSS classes for leading icon container
   */
  leadingIconClassName?: string;
  /**
   * Additional CSS classes for trailing icon container
   */
  trailingIconClassName?: string;
  /**
   * Additional CSS classes for the wrapper div
   */
  wrapperClassName?: string;
  /**
   * Additional inline styles for the wrapper div
   */
  wrapperStyle?: React.CSSProperties;
  /**
   * Enable glassmorphism effect on input background
   * - `true`: Standard glass effect
   * - `'subtle'`: Subtle glass effect
   * - `'prominent'`: Prominent glass effect
   */
  glass?: GlassVariant;
}

/**
 * InputField Component
 *
 * A composable input field component that wraps the HTML `<input>` element.
 * Supports icons, validation states, and all standard input attributes.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Input>
 *   <InputLabel>Email</InputLabel>
 *   <InputField type="email" leadingIcon="mail" placeholder="Enter email" />
 * </Input>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<input>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically applies validation state styling based on context.
 * - Supports leading and trailing icons.
 * - Accessible: includes ARIA attributes and keyboard navigation.
 */
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({
    className,
    type = 'text',
    leadingIcon,
    trailingIcon,
    leadingIconSize,
    trailingIconSize,
    leadingIconClassName,
    trailingIconClassName,
    wrapperClassName,
    wrapperStyle,
    glass,
    asChild,
    disabled,
    ...props
  }, ref) => {
    const { inputId, size, variant, disabled: contextDisabled, hasError, hasWarning, hasSuccess, errorId, warningId, successId, helperId, glass: contextGlass } = useInputContext();
    const isDisabled = disabled ?? contextDisabled;
    const effectiveGlass = useResolvedGlass(glass ?? contextGlass);
    const componentStyles = getComponentStyles(size);
    
    const inputType = hasError ? 'error' : hasWarning ? 'warning' : hasSuccess ? 'success' : 'normal';
    
    const iconOffsetMap = {
      xxs: "left-1.5 right-1.5",
      xs: "left-2 right-2",
      sm: "left-3 right-3",
      md: "left-4 right-4",
      lg: "left-5 right-5",
      xl: "left-6 right-6",
      xxl: "left-7 right-7"
    };

    const iconPaddingMap = {
      xxs: { left: "pl-6", right: "pr-6" },
      xs: { left: "pl-7", right: "pr-7" },
      sm: { left: "pl-9", right: "pr-9" },
      md: { left: "pl-11", right: "pr-11" },
      lg: { left: "pl-12", right: "pr-12" },
      xl: { left: "pl-14", right: "pr-14" },
      xxl: { left: "pl-16", right: "pr-16" }
    };

    const currentIconOffset = iconOffsetMap[size];
    const currentIconPadding = iconPaddingMap[size];
    
    const describedBy = [errorId, warningId, successId, helperId].filter(Boolean).join(' ') || undefined;

    const inputStyles = cn(
      "w-full transition-all duration-200",
      "font-sans font-normal",
      "placeholder:text-placeholder dark:placeholder:text-placeholder-dark",
      componentStyles.height,
      componentStyles.fontSize,
      componentStyles.borderRadius,
      componentStyles.padding,
      effectiveGlass
        ? getGlassClasses(effectiveGlass, 'bg-surface dark:bg-surface-dark', 'border-2 border-border dark:border-border-dark')
        : variant === 'filled'
          ? "bg-surface-alt dark:bg-surface-alt-dark border-2 border-[var(--border-primary)] dark:border-[var(--border-primary)] focus:bg-surface dark:focus:bg-surface-dark focus:border-[var(--primary)] dark:focus:border-[var(--primary)]"
          : variant === 'outlined'
            ? "bg-transparent border border-border dark:border-border-dark hover:border-[var(--primary)] dark:hover:border-[var(--primary)] focus:border-primary"
            : "bg-surface dark:bg-surface-dark border-2 border-border dark:border-border-dark hover:border-[var(--primary)] dark:hover:border-[var(--primary)]",
      isDisabled
        ? "bg-surface-alt dark:bg-surface-alt-dark border-border-disabled dark:border-border-disabled-dark text-input-disabled dark:text-input-disabled-dark cursor-not-allowed"
        : inputType === 'error'
          ? "border-critical text-[var(--primary)] dark:text-[var(--primary)] focus:border-critical"
          : inputType === 'warning'
            ? "border-warning text-[var(--primary)] dark:text-[var(--primary)] focus:border-warning"
            : inputType === 'success'
              ? "border-positive text-[var(--primary)] dark:text-[var(--primary)] focus:border-positive"
              : "text-[var(--primary)] dark:text-[var(--primary)] focus:border-primary dark:focus:border-primary-dark",
      "focus:outline-none",
      leadingIcon && currentIconPadding.left,
      trailingIcon && currentIconPadding.right,
      className
    );

    if (asChild) {
      // When asChild is true, merge props with child element
      // Note: Icon handling is complex with asChild, so we render the wrapper structure
      return (
        <div className={cn("relative", wrapperClassName)} style={wrapperStyle}>
          {leadingIcon && (
            <div className={cn(
              "absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none",
              currentIconOffset.split(' ')[0],
              leadingIconClassName
            )}>
              {typeof leadingIcon === 'string' ? (
                <Icon
                  name={leadingIcon as IconName}
                  size={leadingIconSize ?? componentStyles.iconSize}
                  className={cn(
                    "transition-colors",
                    isDisabled
                      ? "text-input-disabled dark:text-input-disabled-dark"
                      : inputType === 'error'
                        ? "text-critical"
                        : inputType === 'warning'
                          ? "text-warning"
                          : inputType === 'success'
                            ? "text-positive"
                            : "text-icon dark:text-icon-dark"
                  )}
                  aria-hidden="true"
                />
              ) : (
                leadingIcon
              )}
            </div>
          )}
          <Slot
            ref={ref}
            id={inputId}
            {...({ type } as any)}
            className={inputStyles}
            disabled={isDisabled}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={describedBy}
            data-size={size}
            data-type={inputType}
            {...props}
          />
          {trailingIcon && (
            <div className={cn(
              "absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none",
              currentIconOffset.split(' ')[1],
              trailingIconClassName
            )}>
              {typeof trailingIcon === 'string' ? (
                <Icon
                  name={trailingIcon as IconName}
                  size={trailingIconSize ?? componentStyles.iconSize}
                  className={cn(
                    "transition-colors",
                    isDisabled
                      ? "text-input-disabled dark:text-input-disabled-dark"
                      : inputType === 'error'
                        ? "text-critical"
                        : inputType === 'warning'
                          ? "text-warning"
                          : inputType === 'success'
                            ? "text-positive"
                            : "text-icon dark:text-icon-dark"
                  )}
                  aria-hidden="true"
                />
              ) : (
                trailingIcon
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={cn("relative", wrapperClassName)} style={wrapperStyle}>
        {leadingIcon && (
          <div className={cn(
            "absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none",
            currentIconOffset.split(' ')[0],
            leadingIconClassName
          )}>
            {typeof leadingIcon === 'string' ? (
              <Icon
                name={leadingIcon as IconName}
                size={leadingIconSize ?? componentStyles.iconSize}
                className={cn(
                  "transition-colors",
                  isDisabled
                    ? "text-input-disabled dark:text-input-disabled-dark"
                    : inputType === 'error'
                      ? "text-critical"
                      : inputType === 'warning'
                        ? "text-warning"
                        : inputType === 'success'
                          ? "text-positive"
                          : "text-icon dark:text-icon-dark"
                )}
                aria-hidden="true"
              />
            ) : (
              leadingIcon
            )}
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={inputStyles}
          ref={ref}
          disabled={isDisabled}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={describedBy}
          data-size={size}
          data-type={inputType}
          {...props}
        />
        {trailingIcon && (
          <div className={cn(
            "absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none",
            currentIconOffset.split(' ')[1],
            trailingIconClassName
          )}>
            {typeof trailingIcon === 'string' ? (
              <Icon
                name={trailingIcon as IconName}
                size={trailingIconSize ?? componentStyles.iconSize}
                className={cn(
                  "transition-colors",
                  isDisabled
                    ? "text-input-disabled dark:text-input-disabled-dark"
                    : inputType === 'error'
                      ? "text-critical"
                      : inputType === 'warning'
                        ? "text-warning"
                        : inputType === 'success'
                          ? "text-positive"
                          : "text-icon dark:text-icon-dark"
                )}
                aria-hidden="true"
              />
            ) : (
              trailingIcon
            )}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

