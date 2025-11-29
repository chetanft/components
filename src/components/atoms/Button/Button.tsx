import React from 'react';
import { cn, type ComponentSize } from '../../../lib/utils';
import { Icon, IconName } from '../Icons';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'text' | 'link' | 'ghost' | 'dashed';
export type ButtonSize = ComponentSize; // Use unified sizing
export type IconPosition = 'leading' | 'trailing' | 'only';

/**
 * Complete theme system supporting Light, Dark, and Night modes with automatic component adaptation.
 */
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
  // Icon-only buttons: circular for primary/secondary/destructive variants
  // Text variant icon-only buttons are square by default (only rounded if rounded-full is in className)
  const shouldBeCircular = className?.includes('rounded-full') ||
    (isIconOnly && variant !== 'link' && variant !== 'text');
  const isLink = variant === 'link';
  // Text variant icon-only buttons should keep text variant styling (borderless) per Figma design
  const effectiveVariant = variant;

  // Button-specific sizing from Figma design
  const buttonSizing = {
    xxs: {
      padding: 'p-0.5', // 2px all sides
      fontSize: 'text-xs', // 12px
      iconSize: 12,
      borderRadius: 'rounded-component',
      height: 'h-4', // 16px
      width: 'w-4', // 16px for icon-only
    },
    xs: {
      padding: 'p-1', // 4px all sides
      fontSize: 'text-sm', // 14px
      iconSize: 12,
      borderRadius: 'rounded-component',
      height: 'h-6', // 24px
      width: 'w-6', // 24px for icon-only
    },
    sm: {
      padding: 'p-3', // 12px all around
      fontSize: 'text-base', // 16px
      iconSize: 16,
      borderRadius: 'rounded-component',
      height: 'h-8', // 32px
      width: 'w-8', // 32px for icon-only
    },
    md: {
      padding: 'p-3', // 12px all sides
      fontSize: 'text-base', // 16px
      iconSize: 16,
      borderRadius: 'rounded-component',
      height: 'h-10', // 40px
      width: 'w-10', // 40px for icon-only
    },
    lg: {
      padding: 'p-3', // 12px all sides
      fontSize: 'text-lg', // 20px
      iconSize: 24,
      borderRadius: 'rounded-component',
      height: 'h-12', // 48px
      width: 'w-12', // 48px for icon-only
    },
    xl: {
      padding: 'p-4', // 16px all sides
      fontSize: 'text-xl', // 24px
      iconSize: 24,
      borderRadius: 'rounded-component',
      height: 'h-14', // 56px
      width: 'w-14', // 56px for icon-only
    },
    xxl: {
      padding: 'p-5', // 20px all sides
      fontSize: 'text-[28px]', // 28px
      iconSize: 24,
      borderRadius: 'rounded-component',
      height: 'h-16', // 64px
      width: 'w-16', // 64px for icon-only
    },
  };

  const buttonSize = buttonSizing[size];

  // Base styles using unified design system
  const focusRingClass = isLink
    ? "focus-visible:ring-0 focus-visible:ring-offset-0"
    : "focus-visible:ring-2 focus-visible:ring-offset-2";

  const interactiveClass = "hover:shadow-button active:transform active:translate-y-px";

  const baseStyles = cn(
    // Layout and display
    "inline-flex items-center justify-center",
    "font-medium transition-all duration-200",
    "focus-visible:outline-none",
    focusRingClass,
    "disabled:cursor-not-allowed",
    // Accessibility
    "select-none whitespace-nowrap",
    // Interaction states
    !isLink && !isDisabled && interactiveClass,
    isDisabled && "opacity-disabled",
    // Icon-only buttons: circular only if shouldBeCircular is true
    isIconOnly && shouldBeCircular && "!rounded-full"
  );

  // Use button-specific sizing from Figma design
  const sizeStyles = !isLink ? cn(
    buttonSize.height,
    buttonSize.fontSize,
    "gap-2", // 8px gap consistent across all sizes
    // Apply border radius based on button type
    !isIconOnly && buttonSize.borderRadius,
    // Icon-only buttons: square dimensions with no padding
    isIconOnly && buttonSize.height,
    isIconOnly && buttonSize.width,
    isIconOnly && "p-0",
    // Icon-only buttons: apply border radius
    // Text variant icon-only: square (no border radius) unless rounded-full is specified
    // Other variants: rounded unless rounded-full makes them circular
    isIconOnly && !shouldBeCircular && variant !== 'text' && buttonSize.borderRadius,
    // Regular buttons: use padding
    !isIconOnly && buttonSize.padding
  ) : cn(
    buttonSize.fontSize,
    "gap-2"
  );

  // Variant styles using CSS variables that adapt to themes automatically
  const variantStyles: Record<ButtonVariant, string> = {
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
      "bg-transparent text-[var(--neutral)] border-0 h-auto p-0 no-underline underline-offset-2",
      "justify-start gap-2 items-center",
      "hover:text-[var(--neutral-dark)] hover:underline hover:shadow-none",
      "focus-visible:text-[var(--neutral-dark)] focus-visible:underline focus-visible:shadow-none",
      "active:underline active:translate-y-0 active:shadow-none",
      "disabled:text-[var(--border-primary)] disabled:no-underline disabled:pointer-events-none"
    ),
    // 🆕 NEW: Ghost variant - transparent with border, fills on hover
    ghost: cn(
      "bg-transparent text-[var(--button-primary-bg)] border border-[var(--button-primary-bg)]",
      "hover:bg-[var(--button-primary-bg)] hover:text-[var(--button-primary-text)]",
      "focus-visible:ring-[var(--primary)]",
      "disabled:text-[var(--tertiary)] disabled:border-[var(--tertiary)] disabled:opacity-50"
    ),
    // 🆕 NEW: Dashed variant - dashed border style
    dashed: cn(
      "bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] border border-dashed border-[var(--button-secondary-border)]",
      "hover:border-[var(--primary)] hover:text-[var(--primary)]",
      "focus-visible:ring-[var(--primary)]",
      "disabled:text-[var(--tertiary)] disabled:border-[var(--border-primary)] disabled:opacity-50"
    ),
  };

  // Determine accessible name
  const accessibleName = props['aria-label'] ||
    (typeof children === 'string' ? children : undefined) ||
    (isIconOnly ? 'Button' : undefined);

  // Remove conflicting border-radius classes from className for icon-only circular buttons
  const cleanedClassName = isIconOnly && shouldBeCircular && className
    ? className.replace(/\brounded-\[?[^\s\]]+\]?|\brounded-(none|sm|md|lg|xl|2xl|3xl|full)\b/g, '').trim()
    : className;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        baseStyles,
        sizeStyles,
        variantStyles[effectiveVariant],
        cleanedClassName,
        // Ensure rounded-full is always last for circular icon-only buttons
        isIconOnly && shouldBeCircular && "!rounded-full"
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