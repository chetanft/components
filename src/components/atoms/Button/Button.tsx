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
 * Button shape options
 * @public
 */
export type ButtonShape = 'default' | 'rounded';

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
   * Available sizes: `xxs` (x6), `xs` (x8), `sm` (x9), `md` (x10),
   * `lg` (x12), `xl` (x14), `xxl` (x16)
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
   * Button shape
   * @default 'default'
   *
   * - `default`: Component radius token
   * - `rounded`: Rounded corners (x3)
   */
  shape?: ButtonShape;
  
  /**
   * Enable glassmorphism effect (applies to secondary, text, and ghost variants)
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
  shape,
  glass,
  loading = false,
  disabled = false,
  children,
  className,
  type = 'button',
  asChild,
  ...props
}, ref) => {
  const isButtonTextElement = (node: React.ReactNode): boolean => {
    if (!React.isValidElement(node)) return false;
    const childType = (node as any)?.type;
    return childType?.slot === 'button-text';
  };

  const hasVisibleTextContent = (node: React.ReactNode): boolean => {
    if (node === null || node === undefined || typeof node === 'boolean') return false;
    if (typeof node === 'string') return node.trim().length > 0;
    if (typeof node === 'number') return true;
    if (Array.isArray(node)) return node.some(hasVisibleTextContent);
    if (!React.isValidElement(node)) return false;
    return hasVisibleTextContent(node.props?.children);
  };

  // Core component implementation (AI protection applied at export layer)
  const resolvedGlass = useResolvedGlass(glass);
  const classNameHasRoundedFull = className?.includes('rounded-full') ?? false;
  type ResolvedButtonShape = ButtonShape | 'pill' | 'circle';

  // Determine icon-only from content first (before shape resolution to avoid circular dependency)
  const childCount = React.Children.count(children);
  const hasButtonTextChild = React.Children.toArray(children).some(isButtonTextElement);
  const hasAnyTextContent = hasButtonTextChild || hasVisibleTextContent(children);
  const isComposableIconOnly = childCount > 0 && !hasAnyTextContent && !icon;
  const isIconOnlyByContent = iconPosition === 'only' || (!children && !!icon) || isComposableIconOnly;

  // Resolve shape: 'rounded' auto-resolves to 'circle' for icon-only, 'pill' for labeled buttons
  const legacyShape: ResolvedButtonShape | undefined = classNameHasRoundedFull
    ? (isIconOnlyByContent ? 'circle' : 'pill')
    : undefined;
  const resolvedShape: ResolvedButtonShape = (() => {
    const base = shape ?? legacyShape ?? 'default';
    if (base === 'rounded' && isIconOnlyByContent) return 'circle';
    if (base === 'rounded' && !isIconOnlyByContent) return 'pill';
    return base;
  })();
  const isIconOnly = resolvedShape === 'circle' || isIconOnlyByContent;
  const isDisabled = disabled || loading;
  const isLink = variant === 'link';
  // Text variant icon-only buttons should keep text variant styling (borderless) per Figma design
  const effectiveVariant = variant;

  // Button-specific sizing from Figma design
  const buttonSizing = {
    xxs: {
      padding: 'px-[var(--spacing-x1-5)] py-[var(--spacing-x0-5)]',
      fontSize: 'text-xs-rem',
      iconSize: 12,
      borderRadius: 'rounded-component',
      height: 'h-component-xxs',
      width: 'w-component-xxs',
    },
    xs: {
      padding: 'px-[var(--spacing-x2)] py-[var(--spacing-x1)]',
      fontSize: 'text-xs-rem',
      iconSize: 14,
      borderRadius: 'rounded-component',
      height: 'h-component-xs',
      width: 'w-component-xs',
    },
    sm: {
      padding: 'px-[var(--spacing-x3)] py-[var(--spacing-x2)]',
      fontSize: 'text-sm-rem',
      iconSize: 16,
      borderRadius: 'rounded-component',
      height: 'h-component-sm',
      width: 'w-component-sm',
    },
    md: {
      padding: 'px-[var(--spacing-x4)] py-[var(--spacing-x3)]',
      fontSize: 'text-sm-rem',
      iconSize: 18, // Larger icon
      borderRadius: 'rounded-component',
      height: 'h-component-md',
      width: 'w-component-md',
    },
    lg: {
      padding: 'px-[var(--spacing-x5)] py-[var(--spacing-x4)]',
      fontSize: 'text-md-rem',
      iconSize: 20,
      borderRadius: 'rounded-component',
      height: 'h-component-lg',
      width: 'w-component-lg',
    },
    xl: {
      padding: 'px-[var(--spacing-x6)] py-[var(--spacing-x5)]',
      fontSize: 'text-md-rem',
      iconSize: 24,
      borderRadius: 'rounded-component',
      height: 'h-component-xl',
      width: 'w-component-xl',
    },
    xxl: {
      padding: 'px-[var(--spacing-x7)] py-[var(--spacing-x6)]',
      fontSize: 'text-lg-rem',
      iconSize: 24,
      borderRadius: 'rounded-component',
      height: 'h-component-xxl',
      width: 'w-component-xxl',
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
    // Circle shape: inline shapeStyleOverrides (borderRadius: 9999) handles this
    resolvedShape === 'circle' && "rounded-full"
  );

  // Use button-specific sizing from Figma design
  const sizeStyles = !isLink ? cn(
    buttonSize.height,
    buttonSize.fontSize,
    "gap-[var(--spacing-x2)]", // x2 gap consistent across all sizes
    // Apply border radius based on button type
    !isIconOnly && buttonSize.borderRadius,
    // Icon-only buttons: square dimensions with no padding
    isIconOnly && buttonSize.height,
    isIconOnly && buttonSize.width,
    isIconOnly && "p-0",
    // Icon-only buttons: rounded corners by default unless circle shape is selected
    isIconOnly && resolvedShape !== 'circle' && buttonSize.borderRadius,
    // Regular buttons: use padding
    !isIconOnly && buttonSize.padding
  ) : cn(
    buttonSize.fontSize,
    "gap-[var(--spacing-x2)]"
  );

  // Variant styles using CSS variables that adapt to themes automatically
  const variantStyles: Record<ButtonVariant, string> = {
    primary: cn(
      "bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] border border-[var(--button-primary-border)] shadow-sm",
      "hover:bg-[var(--button-primary-hover-bg)] hover:border-[var(--button-primary-hover-bg)] hover:shadow-md",
      "focus-visible:ring-[var(--button-primary-border)]",
      "disabled:bg-[var(--tertiary)] disabled:border-[var(--tertiary)] disabled:text-white disabled:opacity-50 disabled:shadow-none"
    ),
    secondary: cn(
      resolvedGlass
        ? cn(getGlassClasses(resolvedGlass, '', ''), "text-[var(--button-secondary-text)] border border-[var(--button-secondary-border)]")
        : "bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] border border-[var(--button-secondary-border)]",
      resolvedGlass
        ? "hover:bg-[var(--glass-hover)]"
        : "hover:bg-[var(--button-secondary-hover-bg)] hover:border-[var(--button-secondary-hover-border)]",
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
      resolvedGlass
        ? cn(getGlassClasses(resolvedGlass, '', ''), "text-[var(--button-text-text)]")
        : "bg-[var(--button-text-bg)] text-[var(--button-text-text)] border-[var(--button-text-border)]",
      resolvedGlass
        ? "hover:bg-[var(--glass-hover)]"
        : "hover:bg-[var(--button-text-hover-bg)] hover:text-[var(--button-text-text)]",
      "focus-visible:ring-[var(--primary)]",
      "disabled:text-[var(--tertiary)]"
    ),
    link: cn(
      "bg-transparent text-[var(--neutral)] border-0 h-auto p-0 no-underline underline-offset-2",
      "justify-start gap-[var(--spacing-x2)] items-center",
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

  // Remove conflicting border-radius classes when explicitly forcing circle
  const cleanedClassName = resolvedShape === 'circle' && className
    ? className.replace(/\brounded-\[?[^\s\]]+\]?|\brounded-(none|sm|md|lg|xl|2xl|3xl|full)\b/g, '').trim()
    : className;

  const shapeStyleOverrides: React.CSSProperties | undefined = (() => {
    if (resolvedShape === 'rounded') {
      // Figma rounded buttons are pill-shaped across content modes.
      return { borderRadius: 9999 };
    }
    if (resolvedShape === 'pill' || resolvedShape === 'circle') return { borderRadius: 9999 };
    return undefined;
  })();

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
          resolvedShape === 'circle' && "rounded-full"
        )}
        aria-label={accessibleName}
        aria-busy={loading}
        data-size={size}
        style={{ ...variantStyleOverrides, ...getFilteredStyle(slotProps.style), ...iconOnlyStyleOverrides, ...shapeStyleOverrides }}
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
        resolvedShape === 'circle' && "rounded-full"
      )}
      aria-label={accessibleName}
      aria-busy={loading}
      data-size={size}
      style={{ ...variantStyleOverrides, ...getFilteredStyle(props.style), ...iconOnlyStyleOverrides, ...shapeStyleOverrides }}
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

      {!loading && isIconOnly && (
        icon ? (
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
        ) : (
          children
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
