"use client";

import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { TooltipProvider } from './TooltipContext';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlignment = 'start' | 'center' | 'end';
export type TooltipColor = 'white' | 'dark';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tooltip content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Whether to show the close button
   * @default false
   */
  showClose?: boolean;
  /**
   * Callback when close button is clicked
   */
  onClose?: () => void;
  /**
   * Tooltip placement relative to target
   * @default 'top'
   */
  placement?: TooltipPlacement;
  /**
   * Tooltip alignment along the placement edge
   * @default 'center'
   */
  align?: TooltipAlignment;
  /**
   * Color theme
   * @default 'white'
   */
  color?: TooltipColor;
  /**
   * Open state (controlled)
   */
  open?: boolean;
  /**
   * Default open state (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
}

/**
 * Tooltip Component
 *
 * A versatile tooltip component for displaying contextual information.
 * Uses composable API with sub-components for maximum flexibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tooltip placement="top" align="center" color="white">
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     <TooltipTitle>Tooltip Title</TooltipTitle>
 *     <TooltipDescription>Tooltip description</TooltipDescription>
 *     <TooltipArrow />
 *   </TooltipContent>
 * </Tooltip>
 * ```
 *
 * @remarks
 * - All sub-components (TooltipTrigger, TooltipContent, TooltipTitle, etc.) support `asChild`
 * - Supports multiple placements and alignments
 * - Accessible: includes ARIA attributes and keyboard navigation
 * - Renders in a portal to avoid overflow clipping
 * - Automatic collision detection to stay within viewport
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({
  children,
  showClose: _showClose,
  onClose: _onClose,
  placement = 'top',
  align = 'center',
  color = 'white',
  open: controlledOpen,
  defaultOpen = false,
}, _ref) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        open={controlledOpen}
        defaultOpen={defaultOpen}
        delayDuration={200}
      >
        <TooltipProvider value={{ color, placement, align }}>
          {children}
        </TooltipProvider>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
});

Tooltip.displayName = 'Tooltip';
