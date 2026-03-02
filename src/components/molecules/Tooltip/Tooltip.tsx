"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { TooltipProvider } from './TooltipContext';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlignment = 'start' | 'center' | 'end';
export type TooltipColor = 'white' | 'dark';

export interface TooltipProps extends Omit<ComposableProps<'div'>, 'onChange'> {
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
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({
  children,
  showClose = false,
  onClose: _onClose,
  placement = 'top',
  align = 'center',
  color = 'white',
  className = '',
  open: controlledOpen,
  defaultOpen = false,
  asChild,
  ...props
}, _ref) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const Comp = asChild ? Slot : 'div';
  return (
    <TooltipProvider
      value={{
        open,
        setOpen: setInternalOpen,
        placement,
        align,
        color,
      }}
    >
      <Comp className={cn("relative inline-flex flex-col", className)} {...props}>
        {children}
      </Comp>
    </TooltipProvider>
  );
});

Tooltip.displayName = 'Tooltip';
