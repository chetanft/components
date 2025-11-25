"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';
import { FigmaBadge } from '../../atoms/FigmaBadge';
import { Button } from '../../atoms/Button/Button';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  message?: React.ReactNode;
  icon?: IconName;
  closable?: boolean;
  banner?: boolean;
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
    action,
    onClose,
    showFigmaBadge = false, // Changed default to false for cleaner usage
    className,
    children,
    ...props
  }, ref) => {
    // Variant styles using FT Design System tokens
    const variantStyles = {
      info: {
        bg: 'bg-[var(--color-neutral-light)]',
        border: 'border-[var(--color-neutral)]',
        text: 'text-[var(--color-neutral-dark)]',
        icon: 'alert-informational' as IconName,
        iconColor: 'text-[var(--color-neutral)]',
      },
      success: {
        bg: 'bg-[var(--color-positive-light)]',
        border: 'border-[var(--color-positive)]',
        text: 'text-[var(--color-positive-dark)]',
        icon: 'check' as IconName,
        iconColor: 'text-[var(--color-positive)]',
      },
      warning: {
        bg: 'bg-[var(--color-warning-light)]',
        border: 'border-[var(--color-warning)]',
        text: 'text-[var(--color-warning-dark)]',
        icon: 'triangle-alert' as IconName,
        iconColor: 'text-[var(--color-warning)]',
      },
      danger: {
        bg: 'bg-[var(--color-critical-light)]',
        border: 'border-[var(--color-critical)]',
        text: 'text-[var(--color-critical-dark)]',
        icon: 'alert-critical' as IconName,
        iconColor: 'text-[var(--color-critical)]',
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
            "relative flex gap-3 p-4",
            !banner && "rounded-[var(--radius-md)] border border-solid",
            banner && "border-b rounded-none",
            "font-[var(--font-family-primary)]",
            styles.bg,
            styles.border,
            styles.text,
            className
          )}
          role="alert"
        >
          {displayIcon && (
            <Icon
              name={displayIcon}
              size={20}
              className={cn("flex-shrink-0 mt-0.5", styles.iconColor)}
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
