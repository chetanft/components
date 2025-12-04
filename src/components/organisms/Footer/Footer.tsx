import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Divider } from '../../atoms/Divider';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface FooterProps extends ComposableProps<'footer'> {
  /**
   * Number of buttons to display (1-4) - for declarative API
   * @deprecated Use FooterButton components as children instead
   */
  buttonCount?: 1 | 2 | 3 | 4;
  /**
   * Whether to show the left side button (only for 3+ button layouts) - for declarative API
   * @deprecated Use FooterButton components as children instead
   */
  leftSideButton?: boolean;
  /**
   * Custom button texts - if not provided, defaults to "Button" - for declarative API
   * @deprecated Use FooterButton components as children instead
   */
  buttonTexts?: string[];
  /**
   * Custom button variants for each button - for declarative API
   * @deprecated Use FooterButton components as children instead
   */
  buttonVariants?: Array<'primary' | 'secondary' | 'text' | 'link'>;
  /**
   * Custom click handlers for each button - for declarative API
   * @deprecated Use FooterButton components as children instead
   */
  onButtonClick?: Array<() => void>;
  /**
   * Footer content (for composable API)
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
    buttonCount = 1,
    leftSideButton = false,
    buttonTexts = [],
    buttonVariants = [],
    onButtonClick = [],
    className,
    children,
    asChild,
    ...props
  }, ref) => {
    // Check if using composable API (has children)
    const hasComposableChildren = React.Children.count(children) > 0;
    
    // If using composable API, render with children
    if (hasComposableChildren) {
      // Show deprecation warning if using old props with composable API
      if (process.env.NODE_ENV !== 'production' && (buttonTexts.length > 0 || buttonVariants.length > 0 || onButtonClick.length > 0)) {
        console.warn(
          'Footer: Using deprecated props (buttonTexts, buttonVariants, onButtonClick) with composable API. ' +
          'Please use FooterButton components as children instead. ' +
          'See migration guide: docs/migrations/composable-migration.md'
        );
      }
      
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
        <Comp ref={ref} className={cn("w-full bg-surface max-w-full", className)} {...props}>
          <Divider type="primary" className="w-full" />
          <div
            className={cn(
              "px-5 py-4 gap-[366px] max-w-full overflow-x-auto",
              layoutClasses
            )}
          >
            {hasLeftSide && (
              <div className="flex items-center gap-5">
                {leftSideButtons}
              </div>
            )}
            {rightSideButtons.length > 0 && (
              <div className="flex items-center gap-5">
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
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && buttonTexts.length > 0) {
      console.warn(
        'Footer: Declarative API (buttonTexts, buttonVariants, onButtonClick props) is deprecated. ' +
        'Please migrate to composable API using FooterButton components as children. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }

    // Generate default button texts if not provided
    const defaultTexts = Array.from({ length: buttonCount }, (_, i) => buttonTexts[i] || 'Button');

    // Generate default button variants based on Figma design patterns
    const getDefaultVariants = () => {
      const variants: Array<'primary' | 'secondary' | 'text' | 'link'> = [];

      if (buttonCount === 1) {
        variants.push('primary');
      } else if (buttonCount === 2) {
        variants.push('secondary', 'primary');
      } else if (buttonCount === 3) {
        if (leftSideButton) {
          variants.push('text', 'secondary', 'primary');
        } else {
          variants.push('text', 'secondary', 'primary');
        }
      } else if (buttonCount === 4) {
        variants.push('text', 'text', 'secondary', 'primary');
      }

      return variants;
    };

    const finalVariants = buttonVariants.length > 0 ? buttonVariants : getDefaultVariants();

    // Render buttons with proper layout
    const renderButtons = () => {
      const buttons = defaultTexts.map((text, index) => (
        <Button
          key={index}
          variant={finalVariants[index] || 'primary'}
          size="lg"
          icon="add"
          iconPosition="leading"
          onClick={onButtonClick[index]}
          className="min-w-[188px] h-12"
        >
          {text}
        </Button>
      ));

      // Layout logic based on Figma design
      if (buttonCount === 1) {
        return buttons[0];
      }

      if (buttonCount === 2) {
        return (
          <div className="flex items-center gap-5">
            {buttons}
          </div>
        );
      }

      if (buttonCount === 3) {
        if (leftSideButton) {
          return (
            <>
              {buttons[0]}
              <div className="flex items-center gap-5">
                {buttons[1]}
                {buttons[2]}
              </div>
            </>
          );
        } else {
          return (
            <div className="flex items-center gap-5">
              {buttons}
            </div>
          );
        }
      }

      if (buttonCount === 4) {
        return (
          <>
            {buttons[0]}
            <div className="flex items-center gap-5">
              {buttons[1]}
              {buttons[2]}
              {buttons[3]}
            </div>
          </>
        );
      }

      return null;
    };

    // Layout classes based on button configuration
    const getLayoutClasses = () => {
      if (buttonCount === 1) {
        return "flex justify-end items-center";
      }

      if (buttonCount >= 3 && leftSideButton) {
        return "flex justify-between items-center";
      }

      return "flex justify-end items-center";
    };

    const Comp = asChild ? Slot : 'footer';
    return (
      <Comp ref={ref} className={cn("w-full bg-surface max-w-full", className)} {...props}>
        <Divider type="primary" className="w-full" />
        <div
          className={cn(
            "px-5 py-4 gap-[366px] max-w-full overflow-x-auto", // Large gap as specified in Figma design
            getLayoutClasses()
          )}
        >
          {renderButtons()}
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
  ({ className, children, variant = 'primary', leftSide, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size="lg"
        className={cn("min-w-[188px] h-12", className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

FooterButton.displayName = 'FooterButton'; 