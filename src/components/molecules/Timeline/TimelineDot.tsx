"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, type IconName } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';

export type TimelineDotColor = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

export interface TimelineDotProps extends ComposableProps<'div'> {
  /**
   * Dot color
   * @default 'primary'
   */
  color?: TimelineDotColor;
  /**
   * Custom icon name or element
   */
  icon?: IconName | React.ReactNode;
  /**
   * Custom dot content (when using asChild)
   */
  children?: React.ReactNode;
}

const colorMap = {
  primary: 'bg-[var(--color-primary)] border-[var(--color-primary)]',
  success: 'bg-[var(--color-positive)] border-[var(--color-positive)]',
  warning: 'bg-[var(--color-warning)] border-[var(--color-warning)]',
  danger: 'bg-[var(--color-critical)] border-[var(--color-critical)]',
  neutral: 'bg-[var(--color-neutral)] border-[var(--color-neutral)]',
};

const iconColorMap = {
  primary: 'text-[var(--color-primary)]',
  success: 'text-[var(--color-positive)]',
  warning: 'text-[var(--color-warning)]',
  danger: 'text-[var(--color-critical)]',
  neutral: 'text-[var(--color-neutral)]',
};

/**
 * TimelineDot Component
 *
 * A composable component for the dot/icon of a timeline item.
 * Typically used within TimelineItem.
 *
 * @public
 *
 * @example
 * ```tsx
 * <TimelineItem>
 *   <TimelineDot color="success" icon="check" />
 *   <TimelineContent>Completed</TimelineContent>
 * </TimelineItem>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled based on color prop.
 */
export const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, color = 'primary', icon, children, asChild, ...props }, ref) => {
    const renderDot = () => {
      if (React.isValidElement(icon)) {
        return icon;
      }

      if (typeof icon === 'string') {
        return (
          <Icon
            name={icon as IconName}
            size={16}
            className={iconColorMap[color]}
          />
        );
      }

      // Default dot
      return (
        <div
          className={cn(
            "w-[var(--spacing-x2)] h-[var(--spacing-x2)] rounded-full border-2",
            colorMap[color]
          )}
        />
      );
    };
    
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          {children || renderDot()}
        </Slot>
      );
    }
    
    return (
      <div ref={ref} className={cn("flex-shrink-0", className)} {...props}>
        {children || renderDot()}
      </div>
    );
  }
);

TimelineDot.displayName = 'TimelineDot';

