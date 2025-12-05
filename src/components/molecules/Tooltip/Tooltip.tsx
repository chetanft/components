"use client";

import React from 'react';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icons';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { TooltipProvider } from './TooltipContext';
import { TooltipTrigger } from './TooltipTrigger';
import { TooltipContent } from './TooltipContent';
import { TooltipTitle } from './TooltipTitle';
import { TooltipDescription } from './TooltipDescription';
import { TooltipArrow } from './TooltipArrow';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlignment = 'start' | 'center' | 'end';
export type TooltipColor = 'white' | 'dark';

export interface TooltipProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  /**
   * Tooltip content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * The heading text (for declarative API)
   * @deprecated Use TooltipTitle component instead
   */
  heading?: string;
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
   * Primary action button text (for declarative API)
   * @deprecated Use Button components inside TooltipContent instead
   */
  primaryActionText?: string;
  /**
   * Primary action callback
   */
  onPrimaryAction?: () => void;
  /**
   * Secondary action button text (for declarative API)
   * @deprecated Use Button components inside TooltipContent instead
   */
  secondaryActionText?: string;
  /**
   * Secondary action callback
   */
  onSecondaryAction?: () => void;
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
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
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
 * 
 * // Declarative API (deprecated)
 * <Tooltip heading="Title" primaryActionText="Action">
 *   Content
 * </Tooltip>
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (TooltipTrigger, TooltipContent, TooltipTitle, etc.) support `asChild`
 * - Supports multiple placements and alignments
 * - Accessible: includes ARIA attributes and keyboard navigation
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(({
  children,
  heading,
  showClose = false,
  onClose,
  primaryActionText,
  onPrimaryAction,
  secondaryActionText,
  onSecondaryAction,
  placement = 'top',
  align = 'center',
  color = 'white',
  className = '',
  open: controlledOpen,
  defaultOpen = false,
  asChild,
  ...props
}, ref) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  // Check if using composable API (has children with Tooltip sub-components)
  const hasComposableChildren = React.Children.toArray(children).some((child: any) =>
    child?.type?.displayName?.startsWith('Tooltip')
  );

  // If using composable API, wrap with context provider
  if (hasComposableChildren) {
    // Show deprecation warning if using old props with composable API
    if (process.env.NODE_ENV !== 'production' && (heading || primaryActionText || secondaryActionText)) {
      console.warn(
        'Tooltip: Using deprecated props (heading, primaryActionText, secondaryActionText) with composable API. ' +
        'Please use TooltipTitle, TooltipDescription, and Button components inside TooltipContent instead. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }

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
  }

  // Otherwise use declarative API (deprecated)
  if (process.env.NODE_ENV !== 'production' && (heading || primaryActionText || secondaryActionText)) {
    console.warn(
      'Tooltip: Declarative API (heading, primaryActionText, secondaryActionText props) is deprecated. ' +
      'Please migrate to composable API using TooltipTrigger, TooltipContent, TooltipTitle, TooltipDescription components. ' +
      'See migration guide: docs/migrations/composable-migration.md'
    );
  }
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
        <TooltipContent showClose={showClose} onClose={onClose}>
          {heading && <TooltipTitle>{heading}</TooltipTitle>}
          <TooltipDescription>{children}</TooltipDescription>
          {(primaryActionText || secondaryActionText) && (
            <div className="flex gap-[var(--spacing-x2)] mt-[var(--spacing-x6)] justify-end">
              {secondaryActionText && (
                <Button
                  variant="text"
                  size="sm"
                  onClick={onSecondaryAction}
                >
                  {secondaryActionText}
                </Button>
              )}
              {primaryActionText && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onPrimaryAction}
                >
                  {primaryActionText}
                </Button>
              )}
            </div>
          )}
        </TooltipContent>
      </Comp>
    </TooltipProvider>
  );
});

Tooltip.displayName = 'Tooltip';
