"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';
import { FigmaBadge } from '../../atoms/FigmaBadge';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type AlertRadius = 'none' | 'sm' | 'md' | 'lg';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  message?: React.ReactNode;
  icon?: IconName;
  closable?: boolean;
  banner?: boolean;
  radius?: AlertRadius;
  action?: React.ReactNode;
  onClose?: () => void;
  showFigmaBadge?: boolean;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    variant = 'info',
    title,
    message,
    icon,
    closable = false,
    banner = false,
    radius,
    action,
    onClose,
    showFigmaBadge = false, // Changed default to false for cleaner usage
    className,
    children,
    ...props
  }, ref) => {
    // Determine radius class
    const radiusClass = radius === 'none' 
      ? 'rounded-none' 
      : radius === 'sm'
      ? 'rounded-sm'
      : radius === 'lg'
      ? 'rounded-lg'
      : banner
      ? 'rounded-none' // Default for banner: no radius
      : 'rounded-md'; // Default for regular alerts: medium radius

    // Variant styles using FT Design System tokens
    const variantStyles = {
      info: {
        bg: 'bg-[var(--neutral-light)]',
        border: 'border-[var(--neutral)]',
        text: 'text-[var(--neutral-dark)]',
        icon: 'alert-informational' as IconName,
        iconColor: 'text-[var(--neutral)]',
      },
      success: {
        bg: 'bg-[var(--positive-light)]',
        border: 'border-[var(--positive)]',
        text: 'text-[var(--positive-dark)]',
        icon: 'check' as IconName,
        iconColor: 'text-[var(--positive)]',
      },
      warning: {
        bg: 'bg-[var(--warning-light)]',
        border: 'border-[var(--warning)]',
        text: 'text-[var(--warning-dark)]',
        icon: 'triangle-alert' as IconName,
        iconColor: 'text-[var(--warning)]',
      },
      danger: {
        bg: 'bg-[var(--danger-100)]',
        border: 'border-[var(--danger-500)]',
        text: 'text-[var(--danger-500)]',
        icon: 'alert-critical' as IconName,
        iconColor: 'text-[var(--danger-500)]',
      },
    };

    const styles = variantStyles[variant];
    const displayIcon = icon || styles.icon;

    return (
      <div ref={ref} {...props}>
        {showFigmaBadge && (
          <div className="mb-2">
            <FigmaBadge />
          </div>
        )}
        <div
          className={cn(
            // Base styles using FT Design System tokens
            "relative flex items-center gap-2 p-4",
            radiusClass,
            !banner && "border border-solid",
            banner && "border-b",
            styles.bg,
            styles.border,
            styles.text,
            className
          )}
          style={{
            fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
          }}
          role="alert"
        >
          {displayIcon && (
            <Icon
              name={displayIcon}
              size={20}
              className={cn("flex-shrink-0", styles.iconColor)}
            />
          )}
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className={cn(
                "font-semibold mb-1",
                "text-base"
              )}>
                {title}
              </h4>
            )}
            {(message || children) && (
              <div className={cn(
                "text-sm",
                title && "mt-1"
              )}>
                {message || children}
              </div>
            )}
          </div>
          {action && (
              <div className="flex-shrink-0 ml-4 flex items-center">
                  {action}
              </div>
          )}
          {closable && (
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "flex-shrink-0 ml-2 h-fit",
                "p-1 rounded-[var(--radius-sm)]",
                "hover:bg-black/5",
                "transition-colors duration-[var(--transition-fast)]",
                "focus:outline-none focus:ring-2 focus:ring-[var(--color-neutral)] focus:ring-opacity-20"
              )}
              aria-label="Close alert"
            >
              <Icon name="cross" size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
