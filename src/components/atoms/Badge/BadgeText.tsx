"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * BadgeText component props
 * 
 * @public
 */
export interface BadgeTextProps extends ComposableProps<'span'> {
  /**
   * Text content
   */
  children: React.ReactNode;
}

/**
 * BadgeText Component
 * 
 * A composable text wrapper for badges.
 * Can be used within Badge or standalone with asChild.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Within Badge
 * <Badge variant="success">
 *   <BadgeIcon icon="check" />
 *   <BadgeText>Active</BadgeText>
 * </Badge>
 * 
 * // With asChild
 * <BadgeText asChild>
 *   <strong>Bold Text</strong>
 * </BadgeText>
 * ```
 * 
 * @remarks
 * - Wraps badge text content with consistent styling
 * - Supports `asChild` prop for custom element composition
 * - Use with BadgeIcon for complete badge composition
 */
export const BadgeText = React.forwardRef<HTMLSpanElement, BadgeTextProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    
    return (
      <Comp
        ref={ref}
        className={cn("inline-flex items-center font-semibold leading-[1.4]", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

BadgeText.displayName = 'BadgeText';

