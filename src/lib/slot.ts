"use client";

import * as React from 'react';
import { Slot as RadixSlot } from '@radix-ui/react-slot';

/**
 * Slot component props
 * Allows components to merge props with their child element
 * 
 * @public
 */
export interface SlotProps extends React.ComponentPropsWithoutRef<typeof RadixSlot> {
  /**
   * When true, merges props with the child element instead of rendering a wrapper
   * @default false
   */
  asChild?: boolean;
}

/**
 * Slot Component
 * 
 * A composable primitive that allows you to merge props with a child element.
 * When `asChild` is true, the Slot will merge its props with the child element
 * instead of rendering a wrapper element.
 * 
 * This is essential for creating composable components that can wrap any element
 * while maintaining proper prop forwarding and event handling.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Without asChild - renders a div wrapper
 * <Slot className="custom-class">
 *   <button>Click me</button>
 * </Slot>
 * // Result: <div class="custom-class"><button>Click me</button></div>
 * 
 * // With asChild - merges props with button
 * <Slot asChild className="custom-class">
 *   <button>Click me</button>
 * </Slot>
 * // Result: <button class="custom-class">Click me</button>
 * ```
 * 
 * @remarks
 * - Based on Radix UI Slot primitive
 * - Essential for composable component architecture
 * - Maintains proper event handling and prop forwarding
 * - Use when you want components to be able to wrap any element
 */
export const Slot = React.forwardRef<
  React.ElementRef<typeof RadixSlot>,
  SlotProps
>((props, ref) => {
  return React.createElement(RadixSlot, { ...props, ref });
});

Slot.displayName = 'Slot';

/**
 * Type utility for components that support asChild prop
 * 
 * @public
 */
export type AsChildProps = {
  /**
   * When true, merges props with the child element instead of rendering a wrapper
   * @default false
   */
  asChild?: boolean;
};

/**
 * Type utility for creating composable component props
 * Merges standard HTML element props with asChild support
 * 
 * @public
 */
export type ComposableProps<T extends React.ElementType = 'div'> = AsChildProps & 
  Omit<React.ComponentPropsWithoutRef<T>, 'asChild'> & {
    /**
     * Additional CSS classes
     */
    className?: string;
  };

/**
 * Helper type to exclude bigint from React children
 * Ensures compatibility with React types that include bigint
 * 
 * @internal
 */
export type SafeReactChild = Exclude<React.ReactNode, bigint>;

