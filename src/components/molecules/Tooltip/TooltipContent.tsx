"use client";

import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../../../lib/utils';
import { useResolvedGlass, getGlassClasses, type GlassVariant } from '../../../lib/glass';
import type { ComposableProps } from '../../../lib/slot';
import { useTooltipContext } from './TooltipContext';
import { Icon } from '../../atoms/Icons';

export interface TooltipContentProps extends ComposableProps<'div'> {
  /**
   * The tooltip content.
   */
  children?: React.ReactNode;
  /**
   * Show close button
   * @default false
   */
  showClose?: boolean;
  /**
   * Close callback
   */
  onClose?: () => void;
  /**
   * Apply glassmorphism effect to the tooltip surface.
   * @default false
   */
  glass?: GlassVariant;
}

/**
 * TooltipContent Component
 *
 * A composable component for the tooltip content panel.
 * Renders in a portal with collision detection and animations.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tooltip>
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     <TooltipTitle>Tooltip Title</TooltipTitle>
 *     <TooltipDescription>Tooltip description</TooltipDescription>
 *   </TooltipContent>
 * </Tooltip>
 * ```
 *
 * @remarks
 * - Renders inside a portal to avoid overflow clipping.
 * - Uses Radix collision detection to stay within the viewport.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Accessible: includes ARIA attributes for tooltip panels.
 */
export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, children, showClose = false, onClose, glass, asChild: _asChild, ...props }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
    const { placement, align, color } = useTooltipContext();

    const bgClass = resolvedGlass
      ? getGlassClasses(resolvedGlass, '', '')
      : (color === 'white'
        ? 'bg-[var(--bg-primary)] text-[var(--primary)]'
        : 'bg-[var(--primary)] text-[var(--bg-primary)]');

    const tooltipClasses = cn(
      'z-50 rounded-[var(--radius-sm)] p-[var(--spacing-x2)] min-w-[var(--spacing-x14)] max-w-[var(--spacing-x38)] relative shadow-md',
      bgClass,
      resolvedGlass && 'text-[var(--primary)]',
      'data-[state=delayed-open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    );

    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          className={tooltipClasses}
          side={placement}
          align={align}
          sideOffset={5}
          role="tooltip"
          {...props}
        >
          {children}
          {showClose && onClose && (
            <button
              onClick={onClose}
              className="absolute top-[var(--spacing-x2)] right-[var(--spacing-x2)] p-[var(--spacing-x1)] hover:bg-[var(--bg-secondary)] rounded-[var(--radius-full)]"
              aria-label="Close tooltip"
            >
              <Icon
                name="cross"
                size={16}
                className={color === 'white' ? 'text-[var(--primary)]' : 'text-[var(--bg-primary)]'}
              />
            </button>
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';
