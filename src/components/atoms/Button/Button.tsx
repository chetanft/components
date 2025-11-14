import React from 'react';
import { cn, type ComponentSize } from '../../../lib/utils';
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
  const isIconOnly = iconPosition === 'only' || (!children && icon);
  const isDisabled = disabled || loading;
  const isCircular = className?.includes('rounded-full');
  const isLink = variant === 'link';

  // Button-specific sizing from Figma design
  const buttonSizing = {
    xs: {
      padding: 'px-2 py-[2px]',
      fontSize: 'text-sm', // 14px
      iconSize: 12,
      borderRadius: 'rounded-[4px]',
      height: 'h-6', // 24px
    },
    sm: {
      padding: 'p-3', // 12px all around
      fontSize: 'text-base', // 16px
      iconSize: 16,
      borderRadius: 'rounded-[8px]',
      height: 'h-8', // 32px
    },
    md: {
      padding: 'px-4 py-3', // 16px horizontal, 12px vertical
      fontSize: 'text-base', // 16px
      iconSize: 16,
      borderRadius: 'rounded-[8px]',
      height: 'h-10', // 40px
    },
    lg: {
      padding: 'px-6 py-3', // 24px horizontal, 12px vertical
      fontSize: 'text-lg', // 20px
      iconSize: 24,
      borderRadius: 'rounded-[8px]',
      height: 'h-12', // 48px
    },
    xl: {
      padding: 'px-6 py-4', // 24px horizontal, 16px vertical
      fontSize: 'text-xl', // 24px
      iconSize: 24,
      borderRadius: 'rounded-[8px]',
      height: 'h-14', // 56px
    },
    xxl: {
      padding: 'px-7 py-5', // 28px horizontal, 20px vertical
      fontSize: 'text-xxl', // 28px
      iconSize: 24,
      borderRadius: 'rounded-[8px]',
      height: 'h-16', // 64px
    },
  };

  const buttonSize = buttonSizing[size];

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

  // Use button-specific sizing from Figma design
  const sizeStyles = !isLink ? cn(
    buttonSize.height,
    buttonSize.fontSize,
    "gap-2", // 8px gap consistent across all sizes
    buttonSize.borderRadius,
    // Adjust padding for icon-only buttons
    isIconOnly && isCircular ? `w-${buttonSize.height.replace('h-', '')} p-0` : 
    isIconOnly ? `w-${buttonSize.height.replace('h-', '')} px-0` : 
    buttonSize.padding
  ) : cn(
    buttonSize.fontSize,
    "gap-2"
  );

  // Variant styles using CSS variables that adapt to themes automatically
  const variantStyles = {
    primary: cn(
      "bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] border border-[var(--button-primary-border)]",
      "hover:bg-[var(--button-primary-hover-bg)] hover:border-[var(--button-primary-hover-bg)]", 
      "focus-visible:ring-[var(--primary)]",
      "disabled:bg-[var(--tertiary)] disabled:border-[var(--tertiary)] disabled:text-[var(--button-primary-text)] disabled:opacity-50"
    ),
    secondary: cn(
      "bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] border border-[var(--button-secondary-border)]",
      "hover:bg-[var(--button-secondary-hover-bg)] hover:border-[var(--button-secondary-hover-border)]",
      "focus-visible:ring-[var(--primary)]", 
      "disabled:text-[var(--tertiary)] disabled:border-[var(--border-primary)]"
    ),
    destructive: cn(
      "bg-[var(--button-destructive-bg)] text-[var(--button-destructive-text)] border border-[var(--button-destructive-border)]",
      "hover:bg-[var(--button-destructive-hover-bg)] hover:border-[var(--button-destructive-hover-bg)]",
      "focus-visible:ring-[var(--critical)]",
      "disabled:bg-[var(--critical)]/50 disabled:border-[var(--critical)]/50 disabled:text-[var(--button-destructive-text)] disabled:opacity-50"
    ),
    text: cn(
      "bg-[var(--button-text-bg)] text-[var(--button-text-text)] border-[var(--button-text-border)]",
      "hover:bg-[var(--button-text-hover-bg)] hover:text-[var(--button-text-text)]",
      "focus-visible:ring-[var(--primary)]",
      "disabled:text-[var(--tertiary)]"
    ),
    link: cn(
      "bg-[var(--button-link-bg)] text-[var(--button-link-text)] border-0 underline p-0 h-auto",
      "hover:text-[var(--button-link-hover-text)] hover:no-underline hover:shadow-none", 
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
          size={buttonSize.iconSize} 
          className="animate-spin" 
          aria-hidden="true"
        />
      )}
      
      {!loading && isIconOnly && icon && (
        <Icon 
          name={icon} 
          size={buttonSize.iconSize} 
          aria-hidden="true"
        />
      )}
      
      {!loading && !isIconOnly && (
        <>
          {icon && iconPosition === 'leading' && (
            <Icon 
              name={icon} 
              size={buttonSize.iconSize} 
              aria-hidden="true"
            />
          )}
          
          {children}
          
          {icon && iconPosition === 'trailing' && (
            <Icon 
              name={icon} 
              size={buttonSize.iconSize} 
              aria-hidden="true"
            />
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button'; 