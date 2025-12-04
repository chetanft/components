"use client";

import React from 'react';
import { Button } from '../../atoms/Button';
import type { ButtonProps } from '../../atoms/Button';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface ButtonGroupItem {
  id?: string;
  label: React.ReactNode;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  icon?: ButtonProps['icon'];
  iconPosition?: ButtonProps['iconPosition'];
  loading?: ButtonProps['loading'];
  disabled?: ButtonProps['disabled'];
  className?: string;
  onClick?: ButtonProps['onClick'];
  type?: ButtonProps['type'];
  'aria-label'?: string;
}

export interface ButtonGroupProps extends ComposableProps<'div'> {
  /**
   * Buttons array (for declarative API)
   * @deprecated Use ButtonGroupItem components as children instead
   */
  buttons?: ButtonGroupItem[];
  equalWidth?: boolean;
  wrap?: boolean;
  /**
   * Button group content (for composable API)
   */
  children?: React.ReactNode;
}

export interface ButtonGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Whether this item should take equal width
   */
  equalWidth?: boolean;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      buttons,
      equalWidth = false,
      wrap = false,
      className,
      children,
      asChild,
      ...props
    },
    ref
  ) => {
    // Check if using composable API (has children)
    const hasComposableChildren = React.Children.count(children) > 0;
    
    // If using composable API, render with children
    if (hasComposableChildren) {
      // Show deprecation warning if using old props with composable API
      if (process.env.NODE_ENV !== 'production' && buttons?.length) {
        console.warn(
          'ButtonGroup: Using deprecated props (buttons array) with composable API. ' +
          'Please use ButtonGroupItem components as children instead. ' +
          'See migration guide: docs/migrations/composable-migration.md'
        );
      }
      
      const Comp = asChild ? Slot : 'div';
      return (
        <Comp
          ref={ref}
          className={cn(
            'inline-flex items-center gap-[var(--spacing-x2)]',
            wrap ? 'flex-wrap' : 'flex-nowrap',
            equalWidth && 'w-full',
            className
          )}
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement<ButtonGroupItemProps>(child) && child.type === ButtonGroupItem) {
              return React.cloneElement(child, {
                equalWidth,
              });
            }
            return child;
          })}
        </Comp>
      );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && buttons?.length) {
      console.warn(
        'ButtonGroup: Declarative API (buttons array prop) is deprecated. ' +
        'Please migrate to composable API using ButtonGroupItem components as children. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }
    
    if (!buttons?.length) {
      return null;
    }

    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center gap-[var(--spacing-x2)]',
          wrap ? 'flex-wrap' : 'flex-nowrap',
          equalWidth && 'w-full',
          className
        )}
        {...props}
      >
        {buttons.map((button, index) => {
          const { id, label, className: buttonClassName, ...buttonProps } = button;
          return (
            <Button
              key={id ?? index}
              className={cn(equalWidth && 'flex-1', buttonClassName)}
              {...buttonProps}
            >
              {label}
            </Button>
          );
        })}
      </Comp>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

/**
 * ButtonGroupItem Component
 *
 * A composable component for individual buttons in a ButtonGroup.
 * Typically wraps Button components.
 *
 * @public
 *
 * @example
 * ```tsx
 * <ButtonGroup equalWidth>
 *   <ButtonGroupItem>
 *     <Button variant="primary">Save</Button>
 *   </ButtonGroupItem>
 *   <ButtonGroupItem>
 *     <Button variant="secondary">Cancel</Button>
 *   </ButtonGroupItem>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroupItem = React.forwardRef<HTMLDivElement, ButtonGroupItemProps>(
  ({ className, children, equalWidth, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(equalWidth && 'flex-1', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroupItem.displayName = 'ButtonGroupItem';

export default ButtonGroup;
