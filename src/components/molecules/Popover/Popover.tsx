"use client";

import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

export interface PopoverProps {
  /**
   * Popover content (composable sub-components)
   */
  children?: React.ReactNode;
  /**
   * Open state (controlled)
   */
  open?: boolean;
  /**
   * Default open state (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether the popover is modal (blocks interaction with outside elements)
   * @default false
   */
  modal?: boolean;
}

/**
 * Popover Component
 *
 * A floating panel for displaying rich content triggered by a button.
 * Uses composable API with sub-components for maximum flexibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>
 *     <Button>Open popover</Button>
 *   </PopoverTrigger>
 *   <PopoverContent side="bottom" align="center">
 *     <p>Popover content goes here</p>
 *     <PopoverClose />
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @remarks
 * - All sub-components support `asChild` for custom element rendering
 * - Supports controlled and uncontrolled open state
 * - Accessible: includes ARIA attributes and keyboard navigation
 * - Renders in a portal to avoid overflow clipping
 * - Automatic collision detection to stay within viewport
 */
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  modal = false,
}, _ref) => {
  return (
    <PopoverPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      {children}
    </PopoverPrimitive.Root>
  );
});

Popover.displayName = 'Popover';
