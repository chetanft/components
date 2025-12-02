"use client";

import React from 'react';
import { cn, getComponentStyles, type ComponentSize } from '../../../lib/utils';
import { Icon, IconName } from '../Icons';
import { Label } from '../Label/Label';

/**
 * Input component props
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Basic input with label
 * <Input label="Email" type="email" placeholder="Enter your email" />
 * 
 * // Input with validation states
 * <Input 
 *   label="Password" 
 *   type="password" 
 *   error="Password must be at least 8 characters"
 * />
 * 
 * // Input with icons
 * <Input 
 *   label="Search" 
 *   leadingIcon="search" 
 *   placeholder="Search..."
 * />
 * 
 * // Input with helper text
 * <Input 
 *   label="Username" 
 *   helperText="Choose a unique username"
 * />
 * ```
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Label text displayed above the input
   */
  label?: string;
  
  /**
   * Shows mandatory indicator (*) next to label
   * @default false
   */
  labelMandatory?: boolean;
  
  /**
   * Shows optional indicator next to label
   * @default false
   */
  labelOptional?: boolean;
  
  /**
   * Shows suffix icon in label
   * @default false
   */
  labelSuffixIcon?: boolean;
  
  /**
   * Custom icon component for label
   */
  labelIcon?: React.ReactNode;
  
  /**
   * Error message displayed below input
   * When provided, input shows error styling
   */
  error?: string;
  
  /**
   * Warning message displayed below input
   * When provided, input shows warning styling
   */
  warning?: string;
  
  /**
   * Success message displayed below input
   * When provided, input shows success styling
   */
  success?: string;
  
  /**
   * Helper text displayed below input
   * Provides additional context or instructions
   */
  helperText?: string;
  
  /**
   * Icon name displayed on the left side of input
   * @see {@link IconName} for available icons
   */
  leadingIcon?: IconName;
  
  /**
   * Icon name displayed on the right side of input
   * @see {@link IconName} for available icons
   */
  trailingIcon?: IconName;
  
  /**
   * Input size
   * @default 'md'
   * 
   * Available sizes: `xxs` (16px), `xs` (24px), `sm` (32px), `md` (40px), 
   * `lg` (48px), `xl` (56px), `xxl` (64px)
   */
  size?: ComponentSize;
  
  /**
   * Visual style variant
   * @default 'default'
   * 
   * - `default`: Standard input with border
   * - `filled`: Filled background style
   * - `outlined`: Outlined border style
   */
  variant?: 'default' | 'filled' | 'outlined';
}

/**
 * Input Component
 * 
 * A versatile text input component with label, validation states, icons, and helper text.
 * Supports all standard HTML input attributes and types.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * import { Input } from 'ft-design-system';
 * 
 * function MyForm() {
 *   const [email, setEmail] = useState('');
 *   const [error, setError] = useState('');
 * 
 *   return (
 *     <Input
 *       label="Email Address"
 *       type="email"
 *       value={email}
 *       onChange={(e) => setEmail(e.target.value)}
 *       error={error}
 *       helperText="We'll never share your email"
 *       leadingIcon="mail"
 *     />
 *   );
 * }
 * ```
 * 
 * @remarks
 * - Automatically generates accessible IDs for labels and error messages
 * - Supports validation states: error, warning, success
 * - Icon positioning adapts to input size
 * - Accessible: includes ARIA attributes and keyboard navigation
 * - Use `ft-design-system/ai` import for AI-protected version
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    label,
    labelMandatory = false,
    labelOptional = false,
    labelSuffixIcon = false,
    labelIcon,
    error,
    warning,
    success,
    helperText,
    leadingIcon,
    trailingIcon,
    size = 'md',
    variant = 'default',
    disabled,
    id,
    'aria-describedby': ariaDescribedBy,
    ...props
  }, ref) => {
    // Core component - no AI filtering (use ft-design-system/ai for AI protection)
    const componentStyles = getComponentStyles(size);

    // Determine input type state (Normal, Error, Warning, Success)
    const inputType = error ? 'error' : warning ? 'warning' : success ? 'success' : 'normal';

    const generatedId = React.useId();
    // Generate IDs for accessibility (ensure useId always executed)
    const inputId = id ?? `input-${generatedId}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const warningId = warning ? `${inputId}-warning` : undefined;
    const successId = success ? `${inputId}-success` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const describedBy = [errorId, warningId, successId, helperId, ariaDescribedBy].filter(Boolean).join(' ') || undefined;

    // Icon positioning based on unified sizing
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

    // Input styles using unified design system
    const inputStyles = cn(
      // Base styles
      "w-full transition-all duration-200",
      "font-sans font-normal",
      "placeholder:text-placeholder dark:placeholder:text-placeholder-dark",
      // Unified component styles
      componentStyles.height,
      componentStyles.fontSize,
      componentStyles.borderRadius,
      componentStyles.padding,
      // Variant styles with dark mode
      variant === 'filled'
        ? "bg-surface-alt dark:bg-surface-alt-dark border-2 border-[var(--border-primary)] dark:border-[var(--border-primary)] focus:bg-surface dark:focus:bg-surface-dark focus:border-[var(--primary)] dark:focus:border-[var(--primary)]"
        : variant === 'outlined'
          ? "bg-transparent border border-border dark:border-border-dark hover:border-[var(--primary)] dark:hover:border-[var(--primary)] focus:border-primary"
          : "bg-surface dark:bg-surface-dark border-2 border-border dark:border-border-dark hover:border-[var(--primary)] dark:hover:border-[var(--primary)]",
      // State styles with dark mode support
      disabled
        ? "bg-surface-alt dark:bg-surface-alt-dark border-border-disabled dark:border-border-disabled-dark text-input-disabled dark:text-input-disabled-dark cursor-not-allowed"
        : inputType === 'error'
          ? "border-critical text-[var(--primary)] dark:text-[var(--primary)] focus:border-critical"
          : inputType === 'warning'
            ? "border-warning text-[var(--primary)] dark:text-[var(--primary)] focus:border-warning"
            : inputType === 'success'
              ? "border-positive text-[var(--primary)] dark:text-[var(--primary)] focus:border-positive"
              : "text-[var(--primary)] dark:text-[var(--primary)] focus:border-primary dark:focus:border-primary-dark",
      // Focus styles
      "focus:outline-none",
      className
    );

    // Helper/error/warning/success text styles with dark mode
    const helperStyles = cn(
      "text-sm leading-relaxed mt-1.5",
      error
        ? "text-critical"
        : warning
          ? "text-warning"
          : success
            ? "text-positive"
            : "text-helper dark:text-helper-dark"
    );

    return (
      <div className="w-full space-y-2">
        {/* Label */}
        {label && (
          <div>
            <Label
              htmlFor={inputId}
              mandatory={labelMandatory}
              optional={labelOptional}
              suffixIcon={labelSuffixIcon}
              icon={labelIcon}
            >
              {label}
            </Label>
          </div>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Leading Icon */}
          {leadingIcon && (
            <div className={cn("absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none", currentIconOffset.split(' ')[0])}>
              <Icon
                name={leadingIcon}
                size={componentStyles.iconSize}
                className={cn(
                  "transition-colors",
                  disabled
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
            </div>
          )}

          {/* Input */}
          <input
            id={inputId}
            type={type}
            className={cn(
              inputStyles,
              leadingIcon && currentIconPadding.left,
              trailingIcon && currentIconPadding.right
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            data-size={size}
            data-type={inputType}
            {...props}
          />

          {/* Trailing Icon */}
          {trailingIcon && (
            <div className={cn("absolute top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none", currentIconOffset.split(' ')[1])}>
              <Icon
                name={trailingIcon}
                size={componentStyles.iconSize}
                className={cn(
                  "transition-colors",
                  disabled
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
            </div>
          )}
        </div>

        {/* Helper Text, Error, Warning, or Success */}
        {(helperText || error || warning || success) && (
          <p
            id={error ? errorId : warning ? warningId : success ? successId : helperId}
            className={helperStyles}
            role={(error || warning || success) ? 'alert' : undefined}
          >
            {error || warning || success || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 
