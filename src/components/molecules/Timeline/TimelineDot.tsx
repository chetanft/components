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
  primary: 'border-[var(--primary)] bg-[var(--primary)]',
  success: 'border-[var(--positive)] bg-[var(--positive)]',
  warning: 'border-[var(--warning)] bg-[var(--warning)]',
  danger: 'border-[var(--critical)] bg-[var(--critical)]',
  neutral: 'border-[var(--neutral)] bg-[var(--neutral)]',
};

const iconRingMap: Record<TimelineDotColor, string> = {
  primary: 'border-[var(--primary)] text-[var(--primary)]',
  success: 'border-[var(--positive)] text-[var(--positive)]',
  warning: 'border-[var(--warning)] text-[var(--warning)]',
  danger: 'border-[var(--critical)] text-[var(--critical)]',
  neutral: 'border-[var(--neutral)] text-[var(--neutral)]',
};

export const TimelineDot = React.forwardRef<HTMLDivElement, TimelineDotProps>(
  ({ className, color = 'primary', icon, children }, ref) => {
    // Custom children override everything
    if (children) {
      return (
        <div
          ref={ref}
          data-slot="timeline-dot"
          className={cn(
            "flex items-center justify-center w-6 h-6 rounded-full bg-[var(--bg-primary)] border-2",
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
          data-slot="timeline-dot"
          className={cn(
            "flex items-center justify-center w-6 h-6 rounded-full bg-[var(--bg-primary)] border-2",
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
        data-slot="timeline-dot"
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
(TimelineDot as any).slot = 'timeline-dot';
