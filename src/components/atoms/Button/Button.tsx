import React from 'react';
import { cn, getComponentStyles, type ComponentSize } from '../../../lib/utils';
import { Icon, IconName } from '../Icons';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'text' | 'link';
export type ButtonSize = ComponentSize; // Use unified sizing
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
  // Core component - no AI filtering (use ft-design-system/ai for AI protection)
  const componentStyles = getComponentStyles(size);
  const isIconOnly = iconPosition === 'only' || (!children && icon);
  const isDisabled = disabled || loading;
  const isCircular = className?.includes('rounded-full');
  const isLink = variant === 'link';

  // Base styles using unified design system
  const baseStyles = cn(
    // Layout and display
    "inline-flex items-center justify-center",
    "font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    // Accessibility
    "select-none whitespace-nowrap",
    // Interaction states
    isDisabled ? "opacity-disabled" : "hover:shadow-button active:transform active:translate-y-px",
    // Override border radius for circular buttons
    isCircular && "!rounded-full"
  );

  // Use unified component styles for consistent sizing
  const sizeStyles = !isLink ? cn(
    componentStyles.height,
    componentStyles.fontSize,
    componentStyles.gap,
    componentStyles.borderRadius,
    // Adjust padding for icon-only buttons
    isIconOnly && isCircular ? `w-${componentStyles.height.replace('h-', '')} p-0` : 
    isIconOnly ? `w-${componentStyles.height.replace('h-', '')} px-0` : 
    componentStyles.padding
  ) : cn(
    componentStyles.fontSize,
    componentStyles.gap
  );

  // Variant styles with design tokens and dark mode support
  const variantStyles = {
    primary: cn(
      "bg-dark-100 text-white border border-dark-100",
      "hover:bg-dark-50 hover:border-dark-50",
      "focus-visible:ring-dark-100",
      "dark:bg-dark-100 dark:text-white dark:border-dark-100",
      "dark:hover:bg-dark-50 dark:hover:border-dark-50",
      "disabled:bg-dark-25 disabled:border-dark-25 disabled:text-white"
    ),
    secondary: cn(
      "bg-white text-dark-100 border border-box-border",
      "hover:bg-divider hover:border-dark-25",
      "focus-visible:ring-dark-100",
      "dark:text-dark-100 dark:border-dark-25",
      "dark:hover:bg-dark-25/20 dark:hover:border-dark-50",
      "disabled:text-dark-25 disabled:border-box-border"
    ),
    destructive: cn(
      "bg-critical text-white border border-critical",
      "hover:bg-critical-dark hover:border-critical-dark",
      "focus-visible:ring-critical",
      "dark:bg-critical dark:text-white dark:border-critical",
      "dark:hover:bg-critical-dark dark:hover:border-critical-dark",
      "disabled:bg-critical/50 disabled:border-critical/50 disabled:text-white"
    ),
    text: cn(
      "bg-transparent text-dark-100 border-transparent",
      "hover:bg-[#F8F8F9] hover:text-dark-50",
      "focus-visible:ring-dark-100",
      "dark:text-dark-100",
      "dark:hover:bg-[#F8F8F9] dark:hover:text-dark-50",
      "disabled:text-dark-25"
    ),
    link: cn(
      "bg-transparent text-neutral border-0 underline p-0 h-auto",
      "hover:text-neutral-dark hover:no-underline hover:shadow-none",
      "focus-visible:ring-neutral",
      "dark:text-neutral",
      "dark:hover:text-neutral-dark",
      "disabled:text-dark-25 disabled:no-underline"
    ),
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
        sizeStyles,
        variantStyles[variant],
        className
      )}
      aria-label={accessibleName}
      aria-busy={loading}
      data-size={size}
      {...props}
    >
      {loading && (
        <Icon 
          name="loading" 
          size={componentStyles.iconSize} 
          className="animate-spin" 
          aria-hidden="true"
        />
      )}
      
      {!loading && isIconOnly && icon && (
        <Icon 
          name={icon} 
          size={componentStyles.iconSize} 
          aria-hidden="true"
        />
      )}
      
      {!loading && !isIconOnly && (
        <>
          {icon && iconPosition === 'leading' && (
            <Icon 
              name={icon} 
              size={componentStyles.iconSize} 
              aria-hidden="true"
            />
          )}
          
          {children}
          
          {icon && iconPosition === 'trailing' && (
            <Icon 
              name={icon} 
              size={componentStyles.iconSize} 
              aria-hidden="true"
            />
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button'; 