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
    'rounded-[4px] p-2 min-w-[119px] max-w-[300px] relative',
    color === 'white' ? 'bg-white text-[#434F64]' : 'bg-[#434F64] text-white'
  );

  // Tip base styles - using exact dimensions from Figma
  const tipBaseClasses = 'absolute w-0 h-0 border-[6px] border-transparent';

  // Tip placement classes
  const tipPlacementClasses = {
    top: cn(
      tipBaseClasses,
      'bottom-[-6px] border-b-0',
      color === 'white' ? 'border-t-white' : 'border-t-[#434F64]'
    ),
    bottom: cn(
      tipBaseClasses,
      'top-[-6px] border-t-0',
      color === 'white' ? 'border-b-white' : 'border-b-[#434F64]'
    ),
    left: cn(
      tipBaseClasses,
      'right-[-6px] border-r-0',
      color === 'white' ? 'border-l-white' : 'border-l-[#434F64]'
    ),
    right: cn(
      tipBaseClasses,
      'left-[-6px] border-l-0',
      color === 'white' ? 'border-r-white' : 'border-r-[#434F64]'
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
              <Typography variant="h6" className="font-semibold">
                {heading}
              </Typography>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
                aria-label="Close tooltip"
              >
                <Icon name="cross" size={16} className={color === 'white' ? 'text-[#434F64]' : 'text-white'} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="text-sm">
          {children}
        </div>

        {/* Actions */}
        {(primaryActionText || secondaryActionText) && (
          <div className="flex gap-2 mt-5 justify-end">
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