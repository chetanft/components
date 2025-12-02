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
  // Icon-only buttons: square by default for all variants
  // Only circular if rounded-full is explicitly in className
  const shouldBeCircular = className?.includes('rounded-full');
  const isLink = variant === 'link';
  // Text variant icon-only buttons should keep text variant styling (borderless) per Figma design
  const effectiveVariant = variant;

  // Button-specific sizing from Figma design
  const buttonSizing = {
    xxs: {
      padding: 'px-1.5 py-0.5', // Increased padding
      fontSize: 'text-xs-rem', // 12px → 0.857rem (responsive)
      iconSize: 12,
      borderRadius: 'rounded-component',
      height: 'h-6', // Increased height
      width: 'w-6', // 24px for icon-only
    },
    xs: {
      padding: 'px-2.5 py-1', // Increased padding
      fontSize: 'text-sm-rem', // 14px → 1rem (responsive)
      iconSize: 14, // Slightly larger icon
      borderRadius: 'rounded-component',
      height: 'h-8', // Increased height
      width: 'w-8', // 32px for icon-only
    },
    sm: {
      padding: 'px-3.5 py-1.5', // Increased padding
      fontSize: 'text-md-rem', // 16px → 1.143rem (responsive)
      iconSize: 16,
      borderRadius: 'rounded-component',
      height: 'h-9', // Increased height
      width: 'w-9', // 36px for icon-only
    },
    md: {
      padding: 'px-4 py-2', // Increased padding
      fontSize: 'text-md-rem', // 16px → 1.143rem (responsive)
      iconSize: 18, // Larger icon
      borderRadius: 'rounded-component',
      height: 'h-10', // 40px
      width: 'w-10', // 40px for icon-only
    },
    lg: {
      padding: 'px-5 py-2.5', // Increased padding
      fontSize: 'text-lg-rem', // 20px → 1.429rem (responsive)
      iconSize: 20, // Larger icon
      borderRadius: 'rounded-component',
      height: 'h-12', // 48px
      width: 'w-12', // 48px for icon-only
    },
    xl: {
      padding: 'px-6 py-3', // Increased padding
      fontSize: 'text-xl-rem', // 24px → 1.714rem (responsive)
      iconSize: 24,
      borderRadius: 'rounded-component',
      height: 'h-14', // 56px
      width: 'w-14', // 56px for icon-only
    },
    xxl: {
      padding: 'px-7 py-3.5', // Increased padding
      fontSize: 'text-xxl-rem', // 28px → 2rem (responsive)
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
    // Icon-only buttons: rounded corners by default (unless rounded-full is specified)
    isIconOnly && !shouldBeCircular && buttonSize.borderRadius,
    // Regular buttons: use padding
    !isIconOnly && buttonSize.padding
  ) : cn(
    buttonSize.fontSize,
    "gap-2"
  );

  // Variant styles using CSS variables that adapt to themes automatically
  const variantStyles: Record<ButtonVariant, string> = {
    primary: cn(
      "bg-[var(--primary-700)] text-white border border-[var(--primary-700)] shadow-sm",
      "hover:bg-[var(--primary-800)] hover:border-[var(--primary-800)] hover:shadow-md",
      "focus-visible:ring-[var(--primary-700)]",
      "disabled:bg-[var(--tertiary)] disabled:border-[var(--tertiary)] disabled:text-white disabled:opacity-50 disabled:shadow-none"
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