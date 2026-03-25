import React from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Button } from '../../atoms/Button/Button';
import { Divider } from '../../atoms/Divider';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface FooterProps extends ComposableProps<'footer'> {
  /** Glassmorphism variant */
  glass?: GlassVariant;
  /**
   * Footer content
   */
  children?: React.ReactNode;
}

export interface FooterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'text' | 'link';
  /**
   * Whether this button should be on the left side (for 3+ buttons)
   */
  leftSide?: boolean;
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({
    glass,
    className,
    children,
    asChild,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
    const Comp = asChild ? Slot : 'footer';
    const childrenArray = React.Children.toArray(children);
    const footerButtons = childrenArray.filter(child =>
      React.isValidElement(child) && child.type === FooterButton
    );
    const leftSideButtons = footerButtons.filter((child): child is React.ReactElement<FooterButtonProps> =>
      React.isValidElement<FooterButtonProps>(child) && child.props.leftSide === true
    );
    const rightSideButtons = footerButtons.filter((child): child is React.ReactElement<FooterButtonProps> =>
      React.isValidElement<FooterButtonProps>(child) && child.props.leftSide !== true
    );

    const hasLeftSide = leftSideButtons.length > 0;
    const layoutClasses = hasLeftSide
      ? "flex justify-between items-center"
      : "flex justify-end items-center";

    return (
      <Comp ref={ref} className={cn("w-full max-w-full", getGlassClasses(resolvedGlass, 'bg-surface', ''), className)} {...props}>
        <Divider type="primary" className="w-full" />
        <div
          className={cn(
            "px-[var(--spacing-x5)] py-[var(--spacing-x4)] gap-[22.875rem] max-w-full overflow-x-auto",
            layoutClasses
          )}
        >
          {hasLeftSide && (
            <div className="flex items-center gap-[var(--spacing-x5)]">
              {leftSideButtons}
            </div>
          )}
          {rightSideButtons.length > 0 && (
            <div className="flex items-center gap-[var(--spacing-x5)]">
              {rightSideButtons}
            </div>
          )}
          {childrenArray.filter(child =>
            !React.isValidElement(child) || child.type !== FooterButton
          )}
        </div>
      </Comp>
    );
  }
);

Footer.displayName = 'Footer';

/**
 * FooterButton Component
 *
 * A composable component for individual buttons in a Footer.
 * Typically wraps Button components.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Footer>
 *   <FooterButton variant="secondary">Cancel</FooterButton>
 *   <FooterButton variant="primary">Save</FooterButton>
 * </Footer>
 * ```
 */
export const FooterButton = React.forwardRef<HTMLButtonElement, FooterButtonProps>(
  ({ className, children, variant = 'primary', leftSide: _leftSide, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        className={cn(className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

FooterButton.displayName = 'FooterButton'; 
