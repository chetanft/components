"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, type IconName } from '../../atoms/Icons';

export type TimelineDotColor = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

export interface TimelineDotProps {
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
   * Custom dot content
   */
  children?: React.ReactNode;
  className?: string;
}

const dotBgMap: Record<TimelineDotColor, string> = {
  primary: 'border-[var(--color-primary)] bg-[var(--color-primary)]',
  success: 'border-[var(--color-positive)] bg-[var(--color-positive)]',
  warning: 'border-[var(--color-warning)] bg-[var(--color-warning)]',
  danger: 'border-[var(--color-critical)] bg-[var(--color-critical)]',
  neutral: 'border-[var(--color-neutral)] bg-[var(--color-neutral)]',
};

const iconRingMap: Record<TimelineDotColor, string> = {
  primary: 'border-[var(--color-primary)] text-[var(--color-primary)]',
  success: 'border-[var(--color-positive)] text-[var(--color-positive)]',
  warning: 'border-[var(--color-warning)] text-[var(--color-warning)]',
  danger: 'border-[var(--color-critical)] text-[var(--color-critical)]',
  neutral: 'border-[var(--color-neutral)] text-[var(--color-neutral)]',
};

export const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, color = 'primary', icon, children }, ref) => {
    // Custom children override everything
    if (children) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-bg-primary)] border-2",
            iconRingMap[color],
            className,
          )}
        >
          {children}
        </div>
      );
    }

    // Icon mode: icon inside a ring
    if (icon) {
      const iconElement = React.isValidElement(icon) ? icon : (
        <Icon name={icon as IconName} size={12} />
      );

      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-bg-primary)] border-2",
            iconRingMap[color],
            className,
          )}
        >
          {iconElement}
        </div>
      );
    }

    // Default: solid dot
    return (
      <div
        ref={ref}
        className={cn(
          "w-2.5 h-2.5 rounded-full border-2",
          dotBgMap[color],
          className,
        )}
      />
    );
  }
);

TimelineDot.displayName = 'TimelineDot';
