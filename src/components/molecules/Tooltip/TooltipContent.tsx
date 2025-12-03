"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
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
}

/**
 * TooltipContent Component
 *
 * A composable component for the tooltip content panel.
 * Only displays when the Tooltip is open.
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
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically shows/hides based on open state.
 * - Accessible: includes ARIA attributes for tooltip panels.
 */
export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, children, showClose = false, onClose, asChild, ...props }, ref) => {
    const { open, placement, align, color } = useTooltipContext();
    
    if (!open) return null;
    
    const tooltipClasses = cn(
      'rounded-[var(--radius-sm)] p-[var(--spacing-x2)] min-w-[var(--spacing-x14)] max-w-[var(--spacing-x38)] relative',
      color === 'white'
        ? 'bg-[var(--color-bg-primary)] text-[var(--color-primary)]'
        : 'bg-[var(--color-primary)] text-[var(--color-bg-primary)]'
    );
    
    const tipBaseClasses = 'absolute w-0 h-0 border-[var(--spacing-x1)] border-transparent';
    
    const tipPlacementClasses = {
      top: cn(
        tipBaseClasses,
        'bottom-[-var(--spacing-x1)] border-b-0',
        color === 'white' ? 'border-t-[var(--color-bg-primary)]' : 'border-t-[var(--color-primary)]'
      ),
      bottom: cn(
        tipBaseClasses,
        'top-[-var(--spacing-x1)] border-t-0',
        color === 'white' ? 'border-b-surface' : 'border-b-primary'
      ),
      left: cn(
        tipBaseClasses,
        'right-[-var(--spacing-x1)] border-r-0',
        color === 'white' ? 'border-l-surface' : 'border-l-primary'
      ),
      right: cn(
        tipBaseClasses,
        'left-[-var(--spacing-x1)] border-l-0',
        color === 'white' ? 'border-r-surface' : 'border-r-primary'
      ),
    };
    
    const tipAlignClasses = {
      start: placement === 'top' || placement === 'bottom' ? 'left-[var(--spacing-x4)]' : 'top-[var(--spacing-x4)]',
      center: placement === 'top' || placement === 'bottom' ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2',
      end: placement === 'top' || placement === 'bottom' ? 'right-[var(--spacing-x4)] left-auto' : 'bottom-[var(--spacing-x4)] top-auto',
    };
    
    const Comp = asChild ? Slot : 'div';
    return (
      <div className="relative inline-flex flex-col">
        <Comp
          ref={ref}
          className={cn(tooltipClasses, className)}
          role="tooltip"
          {...props}
        >
          {children}
          {showClose && onClose && (
            <button
              onClick={onClose}
              className="absolute top-[var(--spacing-x2)] right-[var(--spacing-x2)] p-[var(--spacing-x1)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-full)]"
              aria-label="Close tooltip"
            >
              <Icon
                name="cross"
                size={16}
                className={color === 'white' ? 'text-[var(--color-primary)]' : 'text-[var(--color-bg-primary)]'}
              />
            </button>
          )}
          <div className={cn(tipPlacementClasses[placement], tipAlignClasses[align])} />
        </Comp>
      </div>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';

