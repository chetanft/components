"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { IconName } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { AlertProvider } from './AlertContext';
import { AlertIcon } from './AlertIcon';
import { AlertTitle } from './AlertTitle';
import { AlertDescription } from './AlertDescription';
import { AlertAction } from './AlertAction';
import { AlertClose } from './AlertClose';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type AlertRadius = 'none' | 'sm' | 'md' | 'lg';

export interface AlertProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  /**
   * Alert content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Alert variant/style
   * @default 'info'
   */
  variant?: AlertVariant;
  /**
   * Title text (for declarative API)
   * @deprecated Use AlertTitle component instead
   */
  title?: string;
  /**
   * Message content (for declarative API)
   * @deprecated Use AlertDescription component instead
   */
  message?: React.ReactNode;
  /**
   * Icon name (for declarative API)
   * @deprecated Use AlertIcon component instead
   */
  icon?: IconName;
  /**
   * Show close button
   * @default false
   */
  closable?: boolean;
  /**
   * Banner style (full width, no border radius)
   * @default false
   */
  banner?: boolean;
  /**
   * Border radius
   */
  radius?: AlertRadius;
  /**
   * Action content (for declarative API)
   * @deprecated Use AlertAction component instead
   */
  action?: React.ReactNode;
  /**
   * Close callback
   */
  onClose?: () => void;
}

/**
 * Alert Component
 * 
 * A versatile alert component for displaying important messages to users.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Alert variant="info" radius="md">
 *   <AlertIcon />
 *   <AlertTitle>Information</AlertTitle>
 *   <AlertDescription>This is an info alert message</AlertDescription>
 *   <AlertAction>
 *     <Button>Action</Button>
 *   </AlertAction>
 *   <AlertClose />
 * </Alert>
 * 
 * // Declarative API (deprecated)
 * <Alert variant="info" title="Info" message="Message" action={<Button>Action</Button>} />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (AlertIcon, AlertTitle, AlertDescription, etc.) support `asChild`
 * - Supports multiple variants: info, success, warning, danger
 * - Accessible: includes ARIA attributes and proper role
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    variant = 'info',
    children,
    title,
    message,
    icon,
    closable = false,
    banner = false,
    radius,
    action,
    onClose,
    className,
    asChild,
    ...props
  }, ref) => {
    // Check if using composable API (has children with Alert sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
      child?.type?.displayName?.startsWith('Alert')
    );
    
    // If using composable API, wrap with context provider
    if (hasComposableChildren) {
      // Show deprecation warning if using old props with composable API
      if (process.env.NODE_ENV !== 'production' && (title || message || icon || action)) {
        console.warn(
          'Alert: Using deprecated props (title, message, icon, action) with composable API. ' +
          'Please use AlertIcon, AlertTitle, AlertDescription, AlertAction components instead. ' +
          'See migration guide: docs/migrations/composable-migration.md'
        );
      }
      
      const radiusClass = radius === 'none' 
        ? 'rounded-none' 
        : radius === 'sm'
        ? 'rounded-sm'
        : radius === 'lg'
        ? 'rounded-lg'
        : banner
        ? 'rounded-none'
        : 'rounded-md';
      
      const variantStyles = {
        info: {
          bg: 'bg-[var(--neutral-light)]',
          border: 'border-[var(--neutral)]',
          text: 'text-[var(--neutral-dark)]',
        },
        success: {
          bg: 'bg-[var(--positive-light)]',
          border: 'border-[var(--positive)]',
          text: 'text-[var(--positive-dark)]',
        },
        warning: {
          bg: 'bg-[var(--warning-light)]',
          border: 'border-[var(--warning)]',
          text: 'text-[var(--warning-dark)]',
        },
        danger: {
          bg: 'bg-[var(--danger-100)]',
          border: 'border-[var(--danger-500)]',
          text: 'text-[var(--danger-500)]',
        },
      };
      
      const styles = variantStyles[variant];
      
      const Comp = asChild ? Slot : 'div';
      return (
        <AlertProvider
          value={{
            variant,
            radius,
            banner,
            closable,
            onClose,
          }}
        >
          <div ref={ref} {...props}>
            <Comp
              className={cn(
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
              {children}
            </Comp>
          </div>
        </AlertProvider>
      );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && (title || message || icon || action)) {
      console.warn(
        'Alert: Declarative API (title, message, icon, action props) is deprecated. ' +
        'Please migrate to composable API using AlertIcon, AlertTitle, AlertDescription, AlertAction components. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }
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
      <AlertProvider
        value={{
          variant,
          radius,
          banner,
          closable,
          onClose,
        }}
      >
        <div ref={ref} {...props}>
          <div
            className={cn(
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
            {displayIcon && <AlertIcon icon={displayIcon} />}
            <div className="flex-1 min-w-0">
              {title && <AlertTitle>{title}</AlertTitle>}
              {(message || children) && (
                <AlertDescription className={title ? "mt-1" : ""}>
                  {message || children}
                </AlertDescription>
              )}
            </div>
            {action && <AlertAction>{action}</AlertAction>}
            {closable && <AlertClose />}
          </div>
        </div>
      </AlertProvider>
    );
  }
);

Alert.displayName = 'Alert';
