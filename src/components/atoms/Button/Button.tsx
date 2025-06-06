import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../Icons';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'text' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconPosition = 'leading' | 'trailing' | 'only';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: IconPosition;
  loading?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'leading',
  loading = false,
  disabled = false,
  children,
  className,
  type = 'button',
  ...props
}, ref) => {
  const isIconOnly = iconPosition === 'only' || (!children && icon);
  const isDisabled = disabled || loading;

  // Base styles using design tokens and Tailwind classes
  const baseStyles = cn(
    // Layout and display
    "inline-flex items-center justify-center",
    "font-medium transition-all duration-200",
    "border border-transparent rounded-button", // Using design token
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    // Typography
    "font-btn", // Using design token
    // Accessibility
    "select-none whitespace-nowrap",
    // Interaction states
    isDisabled ? "opacity-disabled" : "hover:shadow-button active:transform active:translate-y-px"
  );

  // Size configurations using design tokens
  const sizeStyles = {
    sm: cn(
      "h-9 px-4 text-sm gap-2", // h-9 = 36px, px-4 = 16px, gap-2 = 8px
      isIconOnly && "w-9 px-0" // w-9 = 36px for square icon buttons
    ),
    md: cn(
      "h-11 px-5 text-base gap-2", // h-11 = 44px, px-5 = 20px (special unit)
      isIconOnly && "w-11 px-0" // w-11 = 44px for square icon buttons
    ),
    lg: cn(
      "h-13 px-6 text-lg gap-2", // h-13 = 52px, px-6 = 24px
      isIconOnly && "w-13 px-0" // w-13 = 52px for square icon buttons
    ),
  };

  // Variant styles with design tokens and dark mode support
  const variantStyles = {
    primary: cn(
      "bg-dark-100 text-white border-dark-100",
      "hover:bg-dark-100/90 hover:border-dark-100/90",
      "focus-visible:ring-dark-100",
      "dark:bg-dark-100 dark:text-white dark:border-dark-100",
      "dark:hover:bg-dark-50 dark:hover:border-dark-50",
      "disabled:bg-dark-25 disabled:border-dark-25 disabled:text-white"
    ),
    secondary: cn(
      "bg-transparent text-dark-100 border-box-border",
      "hover:bg-divider hover:border-dark-25",
      "focus-visible:ring-dark-100",
      "dark:text-dark-100 dark:border-dark-25",
      "dark:hover:bg-dark-25/20 dark:hover:border-dark-50",
      "disabled:text-dark-25 disabled:border-box-border"
    ),
    destructive: cn(
      "bg-critical text-white border-critical",
      "hover:bg-critical-dark hover:border-critical-dark",
      "focus-visible:ring-critical",
      "dark:bg-critical dark:text-white dark:border-critical",
      "dark:hover:bg-critical-dark dark:hover:border-critical-dark",
      "disabled:bg-critical/50 disabled:border-critical/50 disabled:text-white"
    ),
    text: cn(
      "bg-transparent text-dark-100 border-transparent",
      "hover:bg-dark-100/10",
      "focus-visible:ring-dark-100",
      "dark:text-dark-100",
      "dark:hover:bg-dark-100/10",
      "disabled:text-dark-25"
    ),
    link: cn(
      "bg-transparent text-dark-100 border-transparent underline",
      "hover:text-dark-50 hover:no-underline",
      "focus-visible:ring-dark-100",
      "dark:text-dark-100",
      "dark:hover:text-dark-50",
      "disabled:text-dark-25 disabled:no-underline"
    ),
  };

  // Icon size based on button size using design tokens
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 16;
      case 'md': return 20;
      case 'lg': return 24;
      default: return 20;
    }
  };

  // Determine accessible name
  const accessibleName = props['aria-label'] || 
    (typeof children === 'string' ? children : undefined) ||
    (isIconOnly ? 'Button' : undefined);

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      aria-label={accessibleName}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <Icon 
          name="loading" 
          size={getIconSize()} 
          className="animate-spin" 
          aria-hidden="true"
        />
      )}
      
      {!loading && isIconOnly && icon && (
        <Icon 
          name={icon} 
          size={getIconSize()} 
          aria-hidden="true"
        />
      )}
      
      {!loading && !isIconOnly && (
        <>
          {icon && iconPosition === 'leading' && (
            <Icon 
              name={icon} 
              size={getIconSize()} 
              aria-hidden="true"
            />
          )}
          
          {children}
          
          {icon && iconPosition === 'trailing' && (
            <Icon 
              name={icon} 
              size={getIconSize()} 
              aria-hidden="true"
            />
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button'; 