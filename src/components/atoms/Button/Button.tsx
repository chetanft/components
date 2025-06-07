import React from 'react';
import { cn, filterAIClasses } from '../../../lib/utils';
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
  const safeClassName = filterAIClasses(className);
  const isIconOnly = iconPosition === 'only' || (!children && icon);
  const isDisabled = disabled || loading;
  const isCircular = className?.includes('rounded-full');

  // Base styles using design tokens and Tailwind classes
  const baseStyles = cn(
    // Layout and display
    "inline-flex items-center justify-center",
    "font-medium transition-all duration-200",
    "border border-transparent rounded-button", // Using design token
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    // Accessibility
    "select-none whitespace-nowrap",
    // Interaction states
    isDisabled ? "opacity-disabled" : "hover:shadow-button active:transform active:translate-y-px",
    // Override border radius for circular buttons
    isCircular && "!rounded-full"
  );

  // Size configurations using standardized component variables
  const sizeStyles = {
    sm: cn(
      "h-component-sm gap-2 text-[var(--component-font-size-sm)] font-medium", // 36px height, 14px font
      isIconOnly && isCircular ? "w-component-sm p-0" : isIconOnly ? "w-component-sm px-0" : "px-3"
    ),
    md: cn(
      "h-component-md gap-2 text-[var(--component-font-size-md)] font-medium", // 44px height, 16px font
      isIconOnly && isCircular ? "w-component-md p-0" : isIconOnly ? "w-component-md px-0" : "px-4"
    ),
    lg: cn(
      "h-component-lg gap-2 text-[var(--component-font-size-lg)] font-medium", // 52px height, 16px font
      isIconOnly && isCircular ? "w-component-lg p-0" : isIconOnly ? "w-component-lg px-0" : "px-5"
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

  // Icon size based on button size - using standardized component variables
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 16; // var(--component-icon-size-sm)
      case 'md': return 20; // var(--component-icon-size-md)
      case 'lg': return 24; // var(--component-icon-size-lg)
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
        safeClassName
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