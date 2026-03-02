"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export interface ButtonGroupProps extends ComposableProps<'div'> {
  equalWidth?: boolean;
  wrap?: boolean;
  /** Glass morphism variant */
  glass?: GlassVariant;
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
      equalWidth = false,
      wrap = false,
      glass,
      className,
      children,
      asChild,
      ...props
    },
    ref
  ) => {
    const resolvedGlass = useResolvedGlass(glass);

    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center gap-[var(--spacing-x2)]',
          wrap ? 'flex-wrap' : 'flex-nowrap',
          equalWidth && 'w-full',
          getGlassClasses(resolvedGlass, '', ''),
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
