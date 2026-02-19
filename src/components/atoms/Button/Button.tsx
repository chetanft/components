import React from 'react';
import { cn, type ComponentSize } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { Icon, IconName } from '../Icons';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

/**
 * Button variant options
 * @public
 */
export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'text' | 'link' | 'ghost' | 'dashed';

/**
 * Button size options - uses unified ComponentSize
 * @public
 */
export type ButtonSize = ComponentSize;

/**
 * Icon position relative to button text
 * @public
 */
export type IconPosition = 'leading' | 'trailing' | 'only';

/**
 * Button component props
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Primary button (default variant)
 * <Button>Save</Button>
 * 
 * // Primary button with icon
 * <Button variant="primary" icon="add" iconPosition="leading">
 *   Add Item
 * </Button>
 * 
 * // Composable API with ButtonIcon and ButtonText
 * <Button>
 *   <ButtonIcon icon="add" />
 *   <ButtonText>Add Item</ButtonText>
 * </Button>
 * 
 * // Icon-only button
 * <Button variant="secondary" icon="edit" iconPosition="only" />
 * 
 * // Loading state
 * <Button variant="primary" loading>
 *   Saving...
 * </Button>
 * 
 * // Link variant
 * <Button variant="link" href="/about">
 *   Learn More
 * </Button>
 * 
 * // With asChild
 * <Button asChild>
 *   <a href="/about">Link Button</a>
 * </Button>
 * ```
 */
export interface ButtonProps extends Omit<ComposableProps<'button'>, 'children'> {
  /**
   * Visual style variant
   * @default 'primary'
   * 
   * - `primary`: Main call-to-action, dark background
   * - `secondary`: Secondary actions, outlined style
   * - `destructive`: Delete/dangerous actions, red
   * - `text`: Text-only button, minimal styling
   * - `link`: Link-style button with underline
   * - `ghost`: Transparent with border, fills on hover
   * - `dashed`: Dashed border style
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   * @default 'md'
   * 
   * Available sizes: `xxs` (24px), `xs` (32px), `sm` (36px), `md` (40px), 
   * `lg` (48px), `xl` (56px), `xxl` (64px)
   */
  size?: ButtonSize;
  
  /**
   * Icon name from FT Design System icon library or custom React component
   * Can be an IconName string or a custom React component
   * @see {@link IconName} for available icon names
   */
  icon?: IconName | React.ReactNode;
  
  /**
   * Icon size (only applies when icon is IconName string)
   * @default Based on button size
   */
  iconSize?: number;
  
  /**
   * Custom className for icon wrapper (only applies when icon is IconName string)
   */
  iconClassName?: string;
  
  /**
   * Icon position relative to text
   * @default 'leading'
   * 
   * - `leading`: Icon before text
   * - `trailing`: Icon after text
   * - `only`: Icon-only button (no text)
   */
  iconPosition?: IconPosition;
  
  /**
   * Enable glassmorphism effect (only applies to ghost variant)
   * - `true`: Standard glass effect
   * - `'subtle'`: Subtle glass effect
   * - `'prominent'`: Prominent glass effect
   */
  glass?: GlassVariant;

  /**
   * Shows loading spinner and disables button
   * @default false
   */
  loading?: boolean;
  
  /**
   * Button content (text or React nodes)
   * Not required for icon-only buttons (`iconPosition="only"`)
   */
  children?: React.ReactNode;
}

/**
 * Button Component
 * 
 * A versatile, composable button component with multiple variants, sizes, and icon support.
 * Supports all standard HTML button attributes and accessibility features.
 * Defaults to primary variant for better developer experience.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * import { Button, ButtonIcon, ButtonText } from 'ft-design-system';
 * 
 * function MyComponent() {
 *   return (
 *     <div>
 *       // Default primary button
 *       <Button onClick={() => alert('Clicked!')}>
 *         Primary Action
 *       </Button>
 *       
 *       // Composable API
 *       <Button>
 *         <ButtonIcon icon="add" />
 *         <ButtonText>Add Item</ButtonText>
 *       </Button>
 *       
 *       // Secondary with icon
 *       <Button variant="secondary" icon="edit" iconPosition="leading">
 *         Edit
 *       </Button>
 *       
 *       // Loading state
 *       <Button variant="destructive" loading>
 *         Delete
 *       </Button>
 *       
 *       // With asChild
 *       <Button asChild>
 *         <a href="/about">Link Button</a>
 *       </Button>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @remarks
 * - Defaults to `variant="primary"` for better DX
 * - Supports composable API with ButtonIcon and ButtonText sub-components
 * - Supports `asChild` prop to merge props with child element
 * - Automatically adapts to light/dark/night themes via CSS variables
 * - Icon-only buttons are square by default, circular if `rounded-full` class is added
 * - Loading state shows spinner and disables interaction
 * - Accessible: includes ARIA labels and keyboard navigation support
 * - AI-protected by default. Use `ft-design-system/core` for unprotected version
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  icon,
  iconSize,
  iconClassName,
  iconPosition = 'leading',
  glass,
  loading = false,
  disabled = false,
  children,
  className,
  type = 'button',
  asChild,
  ...props
}, ref) => {
  // Core component implementation (AI protection applied at export layer)
  const resolvedGlass = useResolvedGlass(glass);
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
    "font-semibold transition-all duration-200",
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
    ghost: cn(
      resolvedGlass
        ? cn(getGlassClasses(resolvedGlass, 'bg-transparent', 'border border-[var(--button-primary-bg)]'), "text-[var(--button-primary-bg)]")
        : "bg-transparent text-[var(--button-primary-bg)] border border-[var(--button-primary-bg)]",
      !resolvedGlass && "hover:bg-[var(--button-primary-bg)] hover:text-[var(--button-primary-text)]",
      "focus-visible:ring-[var(--primary)]",
      "disabled:text-[var(--tertiary)] disabled:border-[var(--tertiary)] disabled:opacity-50"
    ),
    dashed: cn(
      "bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] border border-dashed border-[var(--button-secondary-border)]",
      "hover:border-[var(--primary)] hover:text-[var(--primary)]",
      "focus-visible:ring-[var(--primary)]",
      "disabled:text-[var(--tertiary)] disabled:border-[var(--border-primary)] disabled:opacity-50"
    ),
  };

  const variantStyleOverrides: React.CSSProperties | undefined = effectiveVariant === 'primary'
    ? { color: 'var(--button-primary-text)' }
    : undefined;

  // Icon-only buttons: enforce square dimensions and no padding via inline styles
  // This overrides any external inline styles that might interfere
  const iconOnlyStyleOverrides: React.CSSProperties | undefined = isIconOnly
    ? {
        padding: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
      }
    : undefined;

  // For icon-only buttons, filter out conflicting style properties from props.style
  const getFilteredStyle = (style?: React.CSSProperties): React.CSSProperties | undefined => {
    if (!isIconOnly || !style) return style;
    const { padding: _padding, paddingTop: _paddingTop, paddingBottom: _paddingBottom, paddingLeft: _paddingLeft, paddingRight: _paddingRight, width: _width, minWidth: _minWidth, ...rest } = style;
    return rest;
  };

  // Determine accessible name
  const accessibleName = props['aria-label'] ||
    (typeof children === 'string' ? children : undefined) ||
    (isIconOnly ? 'Button' : undefined);

  // Remove conflicting border-radius classes from className for icon-only circular buttons
  const cleanedClassName = isIconOnly && shouldBeCircular && className
    ? className.replace(/\brounded-\[?[^\s\]]+\]?|\brounded-(none|sm|md|lg|xl|2xl|3xl|full)\b/g, '').trim()
    : className;

  if (asChild) {
    // Filter out button-specific props that Slot doesn't accept
    // Slot will merge these with the child element
    const { type: _type, disabled: _disabled, ...slotProps } = { type, disabled: isDisabled, ...props };
    
    return (
      <Slot
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles,
          variantStyles[effectiveVariant],
          cleanedClassName,
          isIconOnly && shouldBeCircular && "!rounded-full"
        )}
        aria-label={accessibleName}
        aria-busy={loading}
        data-size={size}
        style={{ ...variantStyleOverrides, ...getFilteredStyle(slotProps.style), ...iconOnlyStyleOverrides }}
        {...slotProps}
      >
        {children}
      </Slot>
    );
  }

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
      style={{ ...variantStyleOverrides, ...getFilteredStyle(props.style), ...iconOnlyStyleOverrides }}
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
        typeof icon === 'string' ? (
          <Icon
            name={icon as IconName}
            size={iconSize ?? buttonSize.iconSize}
            className={iconClassName}
            aria-hidden="true"
          />
        ) : (
          icon
        )
      )}

      {!loading && !isIconOnly && (
        <>
          {icon && iconPosition === 'leading' && (
            typeof icon === 'string' ? (
              <Icon
                name={icon as IconName}
                size={iconSize ?? buttonSize.iconSize}
                className={iconClassName}
                aria-hidden="true"
              />
            ) : (
              icon
            )
          )}

          {children}

          {icon && iconPosition === 'trailing' && (
            typeof icon === 'string' ? (
              <Icon
                name={icon as IconName}
                size={iconSize ?? buttonSize.iconSize}
                className={iconClassName}
                aria-hidden="true"
              />
            ) : (
              icon
            )
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button'; 