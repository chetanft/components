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

  // Variant styles using CSS variables that adapt to themes automatically
  const variantStyles = {
    primary: cn(
      "bg-[var(--primary)] text-white border border-[var(--primary)]",
      "hover:bg-[var(--secondary)] hover:border-[var(--secondary)]", 
      "focus-visible:ring-[var(--primary)]",
      "disabled:bg-[var(--tertiary)] disabled:border-[var(--tertiary)] disabled:text-white"
    ),
    secondary: cn(
      "bg-white text-[var(--primary)] border border-[var(--border-primary)]",
      "hover:bg-[var(--border-secondary)] hover:border-[var(--tertiary)]",
      "focus-visible:ring-[var(--primary)]", 
      "disabled:text-[var(--tertiary)] disabled:border-[var(--border-primary)]"
    ),
    destructive: cn(
      "bg-[var(--critical)] text-white border border-[var(--critical)]",
      "hover:bg-[var(--critical-dark)] hover:border-[var(--critical-dark)]",
      "focus-visible:ring-[var(--critical)]",
      "disabled:bg-[var(--critical)]/50 disabled:border-[var(--critical)]/50 disabled:text-white"
    ),
    text: cn(
      "bg-transparent text-[var(--primary)] border-transparent",
      "hover:bg-[var(--border-secondary)] hover:text-[var(--secondary)]",
      "focus-visible:ring-[var(--primary)]",
      "disabled:text-[var(--tertiary)]"
    ),
    link: cn(
      "bg-transparent text-[var(--neutral)] border-0 underline p-0 h-auto",
      "hover:text-[var(--neutral-dark)] hover:no-underline hover:shadow-none", 
      "focus-visible:ring-[var(--neutral)]",
      "disabled:text-[var(--tertiary)] disabled:no-underline"
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