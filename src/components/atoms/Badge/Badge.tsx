"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { Icon, IconName } from '../Icons';
import { Typography } from '../Typography';

/**
 * Badge component props
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Simple badge (Shadcn-style)
 * <Badge variant="success" size="sm">Active</Badge>
 * 
 * // Composable API
 * <Badge variant="success">
 *   <BadgeIcon icon="check" />
 *   <BadgeText>Active</BadgeText>
 * </Badge>
 * 
 * // Badge with count
 * <Badge variant="error" count={5}>Notifications</Badge>
 * 
 * // Dot badge
 * <Badge variant="warning" dot />
 * 
 * // With asChild
 * <Badge variant="info" asChild>
 *   <span>Custom Badge</span>
 * </Badge>
 * ```
 */
export interface BadgeProps extends ComposableProps<'div'> {
  /**
   * Badge variant for semantic coloring
   * @default 'default'
   * 
   * - `default`: Neutral gray badge
   * - `error` / `danger`: Red badge for errors
   * - `success`: Green badge for success states
   * - `warning`: Orange badge for warnings
   * - `info` / `neutral`: Blue badge for informational content
   * - `normal`: Default neutral styling
   */
  variant?: 'default' | 'error' | 'success' | 'warning' | 'info' | 'neutral' | 'normal' | 'danger';
  
  /**
   * Count number or custom React node to display
   * When number exceeds overflowCount, shows "overflowCount+"
   */
  count?: number | React.ReactNode;
  
  /**
   * Show count even when it's zero
   * @default false
   */
  showZero?: boolean;
  
  /**
   * Maximum count to display before showing "overflowCount+"
   * @default 99
   */
  overflowCount?: number;
  
  /**
   * Display as a dot instead of count/text
   * @default false
   */
  dot?: boolean;
  
  /**
   * Offset position [x, y] in pixels
   * Useful for positioning badge on corners
   */
  offset?: [number, number];
  
  /**
   * Status indicator variant
   * Alternative to variant prop for status badges
   */
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  
  /**
   * Badge text content
   * Alternative to children prop
   */
  text?: React.ReactNode;
  
  /**
   * Badge size
   * @default 'md'
   * 
   * Available sizes: `xs`, `sm`, `md`, `lg`
   * 
   * @deprecated `default` and `small` are deprecated, use `md` and `sm` instead
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'default' | 'small';
  
  /**
   * Custom color (legacy prop)
   * @deprecated Use variant prop instead
   */
  color?: string;
  
  /**
   * Icon displayed before badge content
   * @see {@link IconName} for available icons
   */
  leadingIcon?: IconName;
  
  /**
   * Icon displayed after badge content
   * @see {@link IconName} for available icons
   */
  trailingIcon?: IconName;
  
  /**
   * Enable hover interaction styles
   * @default false
   */
  interaction?: boolean;
  
  /**
   * Badge content (text or React nodes)
   */
  children?: React.ReactNode;
}

export interface BadgeRibbonProps {
  className?: string;
  text?: React.ReactNode;
  placement?: 'start' | 'end';
  color?: string;
  children?: React.ReactNode;
}

const Ribbon: React.FC<BadgeRibbonProps> = ({
  className,
  text,
  placement = 'end',
  color,
  children
}) => {
  return (
    <div className="relative inline-block">
      {children}
      <div
        className={cn(
          "absolute top-0 px-2 py-1 text-white text-xs-rem whitespace-nowrap z-10 font-semibold shadow-sm",
          placement === 'end' ? "right-0 rounded-l-md" : "left-0 rounded-r-md",
          className
        )}
        style={{ backgroundColor: color || 'var(--primary)' }}
      >
        {text}
        {/* Optional corner triangle for ribbon effect could be added here */}
      </div>
    </div>
  );
};

/**
 * Badge Component
 * 
 * A composable badge component for displaying status, labels, and notifications.
 * Supports Shadcn-style simple API and composable API with BadgeIcon and BadgeText.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Simple API (Shadcn-style)
 * <Badge variant="success" size="sm">Active</Badge>
 * 
 * // Composable API
 * <Badge variant="success">
 *   <BadgeIcon icon="check" />
 *   <BadgeText>Active</BadgeText>
 * </Badge>
 * 
 * // With asChild
 * <Badge variant="info" asChild>
 *   <span>Custom Badge</span>
 * </Badge>
 * ```
 * 
 * @remarks
 * - Supports `asChild` prop for custom element composition
 * - Use composable API with BadgeIcon and BadgeText for maximum flexibility
 * - Automatically handles notification badges when used as wrapper
 * - Accessible: maintains proper semantics
 */
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({
    className,
    variant = 'default',
    count,
    showZero = false,
    overflowCount = 99,
    dot = false,
    offset,
    status,
    text,
    size = 'md',
    color,
    leadingIcon,
    trailingIcon,
    interaction = false,
    children,
    asChild,
    ...props
  }, ref) => {

    // Map old variant names to new standard names
    let normalizedVariant = variant;
    if (variant === 'normal') {
      console.warn('Badge: `variant="normal"` is deprecated. Use `variant="default"` instead.');
      normalizedVariant = 'default';
    } else if (variant === 'danger') {
      console.warn('Badge: `variant="danger"` is deprecated. Use `variant="error"` instead.');
      normalizedVariant = 'error';
    }

    // CASE 1: Status Badge (Dot + Text)
    if (status || (color && !children && !count && !dot)) {
      const getStatusDotColor = () => {
        if (color) return color;
        switch (status) {
          case 'success': return 'var(--positive)';
          case 'processing': return 'var(--primary)';
          case 'error': return 'var(--critical)';
          case 'warning': return 'var(--warning)';
          case 'default':
          default: return 'var(--neutral-400)';
        }
      };

      return (
        <span className={cn("inline-flex items-center gap-2", className)} ref={ref} {...props}>
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full flex-shrink-0",
              status === 'processing' && "animate-pulse" // Simple processing effect
            )}
            style={{ backgroundColor: getStatusDotColor() }}
          />
          {text && <span className="text-sm-rem">{text}</span>}
          {children && !text && <span className="text-sm-rem">{children}</span>}
        </span>
      );
    }

    // CASE 2: Notification Badge (Wrapper around children)
    if (children && (count !== undefined || dot)) {
      // Logic for rendering sup
      let displayCount: React.ReactNode = count;
      if (typeof count === 'number' && count > overflowCount) {
        displayCount = `${overflowCount}+`;
      }

      const isHidden = (count === 0 || count === null) && !showZero && !dot;

      return (
        <span className={cn("relative inline-block", className)} ref={ref} {...props}>
          {children}
          {!isHidden && (
            <sup
              className={cn(
                "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2",
                "flex items-center justify-center text-xs-rem font-normal",
                dot ? "w-2 h-2 p-0 rounded-full min-w-0" : "h-5 px-1.5 rounded-full min-w-[20px]",
                (size === 'small' || size === 'sm' || size === 'xs') && !dot && "h-4 min-w-[16px] px-1",
                (size === 'small' || size === 'sm' || size === 'xs') && !dot && "text-xs-rem",
                (size === 'lg') && !dot && "h-6 px-2 text-sm-rem"
              )}
              style={{
                backgroundColor: color || 'var(--danger)',
                color: 'var(--color-bg-primary)',
                borderColor: 'var(--color-bg-primary)',
                borderWidth: '1px',
                borderStyle: 'solid',
                ...(offset ? { right: -offset[0], marginTop: offset[1] } : {})
              }}
            >
              {!dot && displayCount}
            </sup>
          )}
        </span>
      );
    }

    // CASE 3: Standard Tag-like Badge (Legacy FT Design)
    // Keep existing implementation
    const baseStyles = "inline-flex items-center justify-center transition-colors";

    // Reduced padding to hug content tightly
    const sizeStylesMap: Record<string, string> = {
      xs: "px-1 py-0 gap-0.5 rounded", // Minimal padding to hug content
      sm: "px-1.5 py-0 gap-1 rounded", // Minimal padding to hug content
      small: "px-1.5 py-0 gap-1 rounded", // Alias for sm
      md: "px-2 py-0.5 gap-1 rounded", // Minimal padding to hug content
      default: "px-2 py-0.5 gap-1 rounded", // Alias for md
      lg: "px-2.5 py-0.5 gap-1.5 rounded" // Minimal padding to hug content
    };

    const fontSizeMap: Record<string, string> = {
      xs: "text-[0.714rem]", // 10px
      sm: "text-[0.857rem]", // 12px
      small: "text-[0.857rem]", // 12px
      md: "text-[1rem]", // 14px
      default: "text-[1rem]", // 14px
      lg: "text-[1.143rem]" // 16px
    };

    const sizeStyles = sizeStylesMap[size] || sizeStylesMap.md;

    // Get background and text colors for inline styles (avoiding Tailwind arbitrary values)
    const getBgColor = () => {
      switch (normalizedVariant) {
        case 'error':
        case 'danger': return 'var(--badge-danger-bg)';
        case 'success': return 'var(--badge-success-bg)';
        case 'warning': return 'var(--badge-warning-bg)';
        case 'neutral': return 'var(--badge-neutral-bg)';
        case 'default':
        case 'normal':
        case 'info':
        default: return 'var(--badge-normal-bg)';
      }
    };

    const getTextColor = () => {
      switch (normalizedVariant) {
        case 'error':
        case 'danger': return 'var(--badge-danger-text)';
        case 'success': return 'var(--badge-success-text)';
        case 'warning': return 'var(--badge-warning-text)';
        case 'neutral': return 'var(--badge-neutral-text)';
        case 'default':
        case 'normal':
        case 'info':
        default: return 'var(--badge-normal-text)';
      }
    };

    const getBorderColor = () => {
      if (!isInteractive) return undefined;
      switch (normalizedVariant) {
        case 'error':
        case 'danger': return 'var(--badge-danger-border)';
        case 'success': return 'var(--badge-success-border)';
        case 'warning': return 'var(--badge-warning-border)';
        case 'neutral': return 'var(--badge-neutral-border)';
        case 'default':
        case 'normal':
        case 'info':
        default: return 'var(--badge-normal-border)';
      }
    };

    const getHoverBgColor = () => {
      if (!isInteractive) return undefined;
      switch (normalizedVariant) {
        case 'error':
        case 'danger': return 'var(--badge-danger-hover-bg)';
        case 'success': return 'var(--badge-success-hover-bg)';
        case 'warning': return 'var(--badge-warning-hover-bg)';
        case 'neutral': return 'var(--badge-neutral-hover-bg)';
        case 'default':
        case 'normal':
        case 'info':
        default: return 'var(--badge-normal-hover-bg)';
      }
    };

    const getHoverBorderColor = () => {
      if (!isInteractive) return undefined;
      switch (normalizedVariant) {
        case 'error':
        case 'danger': return 'var(--badge-danger-hover-border)';
        case 'success': return 'var(--badge-success-hover-border)';
        case 'warning': return 'var(--badge-warning-hover-border)';
        case 'neutral': return 'var(--badge-neutral-hover-border)';
        case 'default':
        case 'normal':
        case 'info':
        default: return 'var(--badge-normal-hover-border)';
      }
    };

    const getHoverTextColor = () => {
      if (!isInteractive) return undefined;
      if (normalizedVariant === 'error' || normalizedVariant === 'danger') {
        return 'var(--badge-danger-hover-text)';
      }
      return undefined;
    };

    const iconSize = 14;

    const isInteractive = interaction || props.onClick || props.onMouseEnter || props.onFocus;

    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(true);
      props.onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false);
      props.onMouseLeave?.(e);
    };

    const baseStyle: React.CSSProperties = {
      backgroundColor: isHovered && isInteractive ? getHoverBgColor() : getBgColor(),
      color: isHovered && isInteractive ? getHoverTextColor() || getTextColor() : getTextColor(),
      ...(isInteractive && (isHovered ? getHoverBorderColor() : getBorderColor()) ? {
        borderColor: isHovered && isInteractive ? getHoverBorderColor() : getBorderColor(),
        borderWidth: '1px',
        borderStyle: 'solid'
      } : {}),
    };

    // If count is provided but no children, it renders as a standalone badge (capsule)
    // But here we fallback to Legacy style if not strictly matching notification pattern
    // Actually if someone passes `count` to a standalone badge, it usually means notification bubble without children.
    // But FT Badge is a Label.

    // Let's stick to legacy rendering if no 'status' or 'dot' or 'children+count'
    const Comp = asChild ? Slot : 'div';
    
    return (
      <Comp
        className={cn(
          baseStyles,
          sizeStyles,
          className
        )}
        style={baseStyle}
        onMouseEnter={isInteractive ? handleMouseEnter : props.onMouseEnter}
        onMouseLeave={isInteractive ? handleMouseLeave : props.onMouseLeave}
        ref={ref}
        {...props}
      >
        {leadingIcon && <Icon name={leadingIcon} size={iconSize} />}
        <span
          className={cn(
            fontSizeMap[size] || fontSizeMap.md,
            "font-semibold leading-[1.4]"
          )}
        >
          {children || count}
        </span>
        {trailingIcon && <Icon name={trailingIcon} size={iconSize} />}
      </Comp>
    );
  }
);

Badge.displayName = 'Badge';

// Attach Ribbon
(Badge as any).Ribbon = Ribbon;
export { Ribbon };
