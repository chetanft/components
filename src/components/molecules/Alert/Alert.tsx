"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { AlertProvider } from './AlertContext';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type AlertRadius = 'none' | 'sm' | 'md' | 'lg';

export interface AlertProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  /**
   * Alert content (composable API)
   */
  children?: React.ReactNode;
  /**
   * Alert variant/style
   * @default 'info'
   */
  variant?: AlertVariant;
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
   * Glass morphism variant
   */
  glass?: GlassVariant;
  /**
   * Close callback
   */
  onClose?: () => void;
}

/**
 * Alert Component
 *
 * A versatile alert component for displaying important messages to users.
 * Uses a composable API with sub-components for maximum flexibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Alert variant="info" radius="md">
 *   <AlertIcon />
 *   <AlertTitle>Information</AlertTitle>
 *   <AlertDescription>This is an info alert message</AlertDescription>
 *   <AlertAction>
 *     <Button>Action</Button>
 *   </AlertAction>
 *   <AlertClose />
 * </Alert>
 * ```
 *
 * @remarks
 * - All sub-components (AlertIcon, AlertTitle, AlertDescription, etc.) support `asChild`
 * - Supports multiple variants: info, success, warning, danger
 * - Accessible: includes ARIA attributes and proper role
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    variant = 'info',
    children,
    closable = false,
    banner = false,
    radius,
    glass,
    onClose,
    className,
    asChild,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);

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
              glass
                ? getGlassClasses(resolvedGlass, styles.bg, styles.border)
                : cn(styles.bg, styles.border),
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
);

Alert.displayName = 'Alert';
