"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * ButtonText component props
 * 
 * @public
 */
export interface ButtonTextProps extends ComposableProps<'span'> {
  /**
   * Text content
   */
  children: React.ReactNode;
}

/**
 * ButtonText Component
 * 
 * A composable text wrapper for buttons.
 * Can be used within Button or standalone with asChild.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Within Button
 * <Button>
 *   <ButtonIcon icon="add" />
 *   <ButtonText>Add Item</ButtonText>
 * </Button>
 * 
 * // With asChild
 * <ButtonText asChild>
 *   <strong>Bold Text</strong>
 * </ButtonText>
 * ```
 * 
 * @remarks
 * - Wraps button text content with consistent styling
 * - Supports `asChild` prop for custom element composition
 * - Use with ButtonIcon for complete button composition
 */
export const ButtonText = React.forwardRef<HTMLSpanElement, ButtonTextProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    
    return (
      <Comp
        ref={ref}
        className={cn("inline-flex items-center", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ButtonText.displayName = 'ButtonText';

