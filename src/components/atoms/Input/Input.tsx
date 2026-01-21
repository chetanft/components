"use client";

import React from 'react';
import { cn, getComponentStyles, type ComponentSize } from '../../../lib/utils';
import { Icon, IconName } from '../Icons';
import { Label } from '../Label/Label';
import { InputProvider } from './InputContext';
import { InputWrapper } from './InputWrapper';
import { InputLabel } from './InputLabel';
import { InputField } from './InputField';
import { InputHelper } from './InputHelper';
import { InputError } from './InputError';
import { InputWarning } from './InputWarning';
import { InputSuccess } from './InputSuccess';

/**
 * Input component props
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Input size="md" variant="default">
 *   <InputLabel mandatory>Email</InputLabel>
 *   <InputField type="email" leadingIcon="mail" placeholder="Enter email" />
 *   <InputError>Invalid email</InputError>
 * </Input>
 * 
 * // Declarative API (deprecated)
 * <Input label="Email" type="email" placeholder="Enter your email" />
 * ```
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input content (for composable API)
   */
  children?: React.ReactNode;
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
   * Icon displayed on the left side of input
   * Can be an IconName string or a custom React component
   * @see {@link IconName} for available icon names
   */
  leadingIcon?: IconName | React.ReactNode;
  
  /**
   * Icon displayed on the right side of input
   * Can be an IconName string or a custom React component
   * @see {@link IconName} for available icon names
   */
  trailingIcon?: IconName | React.ReactNode;
  
  /**
   * Size for leading icon (only applies when leadingIcon is IconName string)
   * @default Based on input size
   */
  leadingIconSize?: number;
  
  /**
   * Size for trailing icon (only applies when trailingIcon is IconName string)
   * @default Based on input size
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
   * Additional CSS classes for InputField wrapper div
   */
  wrapperClassName?: string;
  
  /**
   * Additional inline styles for InputField wrapper div
   */
  wrapperStyle?: React.CSSProperties;
  
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
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * import { Input, InputLabel, InputField, InputError, InputHelper } from 'ft-design-system';
 * 
 * function MyForm() {
 *   const [email, setEmail] = useState('');
 *   const [error, setError] = useState('');
 * 
 *   return (
 *     <Input size="md" variant="default">
 *       <InputLabel mandatory>Email Address</InputLabel>
 *       <InputField 
 *         type="email" 
 *         value={email}
 *         onChange={(e) => setEmail(e.target.value)}
 *         leadingIcon="mail"
 *         placeholder="Enter your email"
 *       />
 *       {error && <InputError>{error}</InputError>}
 *       <InputHelper>We'll never share your email</InputHelper>
 *     </Input>
 *   );
 * }
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (InputLabel, InputField, InputError, etc.) support `asChild`
 * - Automatically generates accessible IDs for labels and error messages
 * - Supports validation states: error, warning, success
 * - Icon positioning adapts to input size
 * - Accessible: includes ARIA attributes and keyboard navigation
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    children,
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
    leadingIconSize,
    trailingIconSize,
    leadingIconClassName,
    trailingIconClassName,
    size = 'md',
    variant = 'default',
    disabled,
    id,
    'aria-describedby': ariaDescribedBy,
    ...props
  }, ref) => {
    // Check if using composable API (has children with Input sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
      child?.type?.displayName?.startsWith('Input')
    );
    
    // If using composable API, wrap with context provider
    if (hasComposableChildren) {
      // Show deprecation warning if using old props with composable API
      if (process.env.NODE_ENV !== 'production' && (label || error || warning || success || helperText || leadingIcon || trailingIcon)) {
        console.warn(
          'Input: Using deprecated props (label, error, warning, success, helperText, leadingIcon, trailingIcon) with composable API. ' +
          'Please use InputLabel, InputField, InputError, InputWarning, InputSuccess, InputHelper components instead. ' +
          'See migration guide: docs/migrations/composable-migration.md'
        );
      }
      
      const generatedId = React.useId();
      const inputId = id ?? `input-${generatedId}`;
      const errorId = error ? `${inputId}-error` : undefined;
      const warningId = warning ? `${inputId}-warning` : undefined;
      const successId = success ? `${inputId}-success` : undefined;
      const helperId = helperText ? `${inputId}-helper` : undefined;
      
      return (
        <InputProvider
          value={{
            inputId,
            size,
            variant,
            disabled,
            hasError: !!error,
            hasWarning: !!warning,
            hasSuccess: !!success,
            errorId,
            warningId,
            successId,
            helperId,
          }}
        >
          <InputWrapper className={className}>
            {children}
          </InputWrapper>
        </InputProvider>
      );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'Input: Declarative API (label, error, warning, success, helperText props) is deprecated. ' +
        'Please migrate to composable API using InputLabel, InputField, InputError, InputWarning, InputSuccess, InputHelper components. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }
    // Declarative API implementation
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
      <InputProvider
        value={{
          inputId,
          size,
          variant,
          disabled,
          hasError: !!error,
          hasWarning: !!warning,
          hasSuccess: !!success,
          errorId,
          warningId,
          successId,
          helperId,
        }}
      >
        <InputWrapper className={className}>
          {label && (
            <InputLabel
              mandatory={labelMandatory}
              optional={labelOptional}
              suffixIcon={labelSuffixIcon}
              icon={labelIcon}
            >
              {label}
            </InputLabel>
          )}
          <InputField
            ref={ref}
            type={type}
            leadingIcon={leadingIcon}
            trailingIcon={trailingIcon}
            leadingIconSize={leadingIconSize}
            trailingIconSize={trailingIconSize}
            leadingIconClassName={leadingIconClassName}
            trailingIconClassName={trailingIconClassName}
            disabled={disabled}
            aria-describedby={ariaDescribedBy}
            {...props}
          />
          {error && <InputError>{error}</InputError>}
          {warning && <InputWarning>{warning}</InputWarning>}
          {success && <InputSuccess>{success}</InputSuccess>}
          {helperText && !error && !warning && !success && <InputHelper>{helperText}</InputHelper>}
        </InputWrapper>
      </InputProvider>
    );
  }
);

Input.displayName = 'Input'; 
