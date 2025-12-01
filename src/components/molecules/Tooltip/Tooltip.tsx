import React from 'react';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icons';
import { cn } from '../../../lib/utils';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlignment = 'start' | 'center' | 'end';
export type TooltipColor = 'white' | 'dark';

export interface TooltipProps {
  /** The content to display in the tooltip */
  children: React.ReactNode;
  /** The heading text (optional) */
  heading?: string;
  /** Whether to show the close button */
  showClose?: boolean;
  /** Callback when close button is clicked */
  onClose?: () => void;
  /** Primary action button text (optional) */
  primaryActionText?: string;
  /** Primary action callback */
  onPrimaryAction?: () => void;
  /** Secondary action button text (optional) */
  secondaryActionText?: string;
  /** Secondary action callback */
  onSecondaryAction?: () => void;
  /** Tooltip placement relative to target */
  placement?: TooltipPlacement;
  /** Tooltip alignment along the placement edge */
  align?: TooltipAlignment;
  /** Color theme */
  color?: TooltipColor;
  /** Additional CSS class name */
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
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
}) => {
  const baseClasses = 'relative inline-flex flex-col';
  const tooltipClasses = cn(
    'rounded-[var(--radius-sm)] p-[var(--spacing-x2)] min-w-[var(--spacing-x14)] max-w-[var(--spacing-x38)] relative',
    color === 'white'
      ? 'bg-[var(--color-bg-primary)] text-[var(--color-primary)]'
      : 'bg-[var(--color-primary)] text-[var(--color-bg-primary)]'
  );

  // Tip base styles - using exact dimensions from Figma
  const tipBaseClasses = 'absolute w-0 h-0 border-[var(--spacing-x1)] border-transparent';

  // Tip placement classes
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

  // Tip alignment classes
  const tipAlignClasses = {
    start: placement === 'top' || placement === 'bottom' ? 'left-4' : 'top-4',
    center: placement === 'top' || placement === 'bottom' ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2',
    end: placement === 'top' || placement === 'bottom' ? 'right-4 left-auto' : 'bottom-4 top-auto',
  };

  return (
    <div className={cn(baseClasses, className)}>
      <div className={tooltipClasses}>
        {/* Header */}
        {(heading || showClose) && (
          <div className="flex justify-between items-center mb-1">
            {heading && (
              <Typography variant="body-secondary-semibold">
                {heading}
              </Typography>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="p-[var(--spacing-x1)] hover:bg-[var(--color-bg-secondary)] rounded-[var(--radius-full)]"
                aria-label="Close tooltip"
              >
                <Icon
                  name="cross"
                  size={16}
                  className={color === 'white' ? 'text-[var(--color-primary)]' : 'text-[var(--color-bg-primary)]'}
                />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ fontSize: 'var(--font-size-sm-rem)' }}>
          {/* 14px → 1rem (responsive) */}
          {children}
        </div>

        {/* Actions */}
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

        {/* Tooltip Tip */}
        <div className={cn(tipPlacementClasses[placement], tipAlignClasses[align])} />
      </div>
    </div>
  );
}; 
