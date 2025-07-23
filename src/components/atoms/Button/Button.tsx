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

  // Variant styles using semantic colors that adapt to themes
  const variantStyles = {
    primary: cn(
      "bg-primary text-white border border-primary",
      "hover:bg-secondary hover:border-secondary",
      "dark:bg-primary dark:text-black dark:border-primary",
      "dark:hover:bg-secondary dark:hover:border-secondary",
      "focus-visible:ring-primary",
      "disabled:bg-tertiary disabled:border-tertiary disabled:text-white"
    ),
    secondary: cn(
      "bg-white text-primary border border-border-primary",
      "hover:bg-border-secondary hover:border-tertiary",
      "dark:bg-white dark:text-primary dark:border-border-primary",
      "dark:hover:bg-border-secondary dark:hover:border-tertiary",
      "focus-visible:ring-primary",
      "disabled:text-tertiary disabled:border-border-primary"
    ),
    destructive: cn(
      "bg-critical text-white border border-critical",
      "hover:bg-critical-dark hover:border-critical-dark",
      "focus-visible:ring-critical",
      "disabled:bg-critical/50 disabled:border-critical/50 disabled:text-white"
    ),
    text: cn(
      "bg-transparent text-primary border-transparent",
      "hover:bg-border-secondary hover:text-secondary",
      "dark:text-primary",
      "dark:hover:bg-border-secondary dark:hover:text-secondary",
      "focus-visible:ring-primary",
      "disabled:text-tertiary"
    ),
    link: cn(
      "bg-transparent text-neutral border-0 underline p-0 h-auto",
      "hover:text-neutral-dark hover:no-underline hover:shadow-none",
      "focus-visible:ring-neutral",
      "disabled:text-tertiary disabled:no-underline"
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