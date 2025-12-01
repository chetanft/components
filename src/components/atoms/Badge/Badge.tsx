"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../Icons';
import { Typography } from '../Typography';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Badge variant for semantic coloring.
   * @default 'default'
   */
  variant?: 'default' | 'error' | 'success' | 'warning' | 'info' | 'neutral' | 'normal' | 'danger';
  count?: number | React.ReactNode;
  showZero?: boolean;
  overflowCount?: number;
  dot?: boolean;
  offset?: [number, number];
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  text?: React.ReactNode;
  /**
   * The size of the badge.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'default' | 'small';
  /**
   * @deprecated Use `size="md"` instead.
   */
  // default is included in the union above
  /**
   * @deprecated Use `size="sm"` instead.
   */
  // small is included in the union above
  color?: string;
  // Legacy props
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  interaction?: boolean;
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
          "absolute top-0 px-2 py-1 text-[var(--color-bg-primary)] text-xs whitespace-nowrap z-10",
          placement === 'end' ? "right-0 rounded-l-md" : "left-0 rounded-r-md",
          "bg-[var(--primary)] shadow-sm", // Default color
          className
        )}
        style={{ backgroundColor: color }}
      >
        {text}
        {/* Optional corner triangle for ribbon effect could be added here */}
      </div>
    </div>
  );
};

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
      const statusColorMap: Record<string, string> = {
        success: 'bg-[var(--success)]',
        processing: 'bg-[var(--primary)]',
        default: 'bg-[var(--neutral-400)]',
        error: 'bg-[var(--danger)]',
        warning: 'bg-[var(--warning)]'
      };
      const dotClass = status ? statusColorMap[status] : '';

      return (
        <span className={cn("inline-flex items-center gap-2", className)} ref={ref} {...props}>
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full relative",
              dotClass,
              status === 'processing' && "animate-pulse" // Simple processing effect
            )}
            style={{ backgroundColor: color }}
          />
          {text && <span className="text-sm">{text}</span>}
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
                "flex items-center justify-center text-xs font-normal text-[var(--color-bg-primary)] bg-[var(--danger)] border border-[var(--color-bg-primary)]",
                dot ? "w-2 h-2 p-0 rounded-full min-w-0" : "h-5 px-1.5 rounded-full min-w-[20px]",
                (size === 'small' || size === 'sm') && !dot && "h-4 min-w-[16px] px-1 text-[10px]"
              )}
              style={{
                backgroundColor: color,
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
    const sizeStyles = "px-[var(--x2)] py-[2px] gap-[var(--x2)] rounded-[var(--badge-border-radius)]";

    const variantStyles: Record<string, string> = {
      default: "bg-[var(--badge-normal-bg)] text-[var(--badge-normal-text)]",
      normal: "bg-[var(--badge-normal-bg)] text-[var(--badge-normal-text)]",
      error: "bg-[var(--badge-danger-bg)] text-[var(--badge-danger-text)]",
      danger: "bg-[var(--badge-danger-bg)] text-[var(--badge-danger-text)]",
      success: "bg-[var(--badge-success-bg)] text-[var(--badge-success-text)]",
      warning: "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)]",
      info: "bg-[var(--badge-normal-bg)] text-[var(--badge-normal-text)]",
      neutral: "bg-[var(--badge-neutral-bg)] text-[var(--badge-neutral-text)]"
    };

    const interactiveBorderStyles: Record<string, string> = {
      default: "border border-[var(--badge-normal-border)]",
      normal: "border border-[var(--badge-normal-border)]",
      error: "border border-[var(--badge-danger-border)]",
      danger: "border border-[var(--badge-danger-border)]",
      success: "border border-[var(--badge-success-border)]",
      warning: "border border-[var(--badge-warning-border)]",
      info: "border border-[var(--badge-normal-border)]",
      neutral: "border border-[var(--badge-neutral-border)]"
    };

    const hoverStyles: Record<string, string> = {
      default: "hover:bg-[var(--badge-normal-hover-bg)] hover:border-[var(--badge-normal-hover-border)]",
      normal: "hover:bg-[var(--badge-normal-hover-bg)] hover:border-[var(--badge-normal-hover-border)]",
      error: "hover:bg-[var(--badge-danger-hover-bg)] hover:border-[var(--badge-danger-hover-border)] hover:text-[var(--badge-danger-hover-text)]",
      danger: "hover:bg-[var(--badge-danger-hover-bg)] hover:border-[var(--badge-danger-hover-border)] hover:text-[var(--badge-danger-hover-text)]",
      success: "hover:bg-[var(--badge-success-hover-bg)] hover:border-[var(--badge-success-hover-border)]",
      warning: "hover:bg-[var(--badge-warning-hover-bg)] hover:border-[var(--badge-warning-hover-border)]",
      info: "hover:bg-[var(--badge-normal-hover-bg)] hover:border-[var(--badge-normal-hover-border)]",
      neutral: "hover:bg-[var(--badge-neutral-hover-bg)] hover:border-[var(--badge-neutral-hover-border)]"
    };

    const iconSize = 14;

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

    const isInteractive = interaction || props.onClick || props.onMouseEnter || props.onFocus;

    // If count is provided but no children, it renders as a standalone badge (capsule)
    // But here we fallback to Legacy style if not strictly matching notification pattern
    // Actually if someone passes `count` to a standalone badge, it usually means notification bubble without children.
    // But FT Badge is a Label.

    // Let's stick to legacy rendering if no 'status' or 'dot' or 'children+count'
    return (
      <div
        className={cn(
          baseStyles,
          sizeStyles,
          variantStyles[normalizedVariant],
          isInteractive && interactiveBorderStyles[normalizedVariant],
          isInteractive && hoverStyles[normalizedVariant],
          className
        )}
        ref={ref}
        {...props}
      >
        {leadingIcon && <Icon name={leadingIcon} size={iconSize} />}
        <Typography
          variant="body-secondary-semibold"
          as="span"
          style={{ color: getTextColor() }}
        >
          {children || count}
        </Typography>
        {trailingIcon && <Icon name={trailingIcon} size={iconSize} />}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

// Attach Ribbon
(Badge as any).Ribbon = Ribbon;
export { Ribbon };
