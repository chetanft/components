"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';

// ============================================================================
// Types
// ============================================================================

export type TimelineMode = 'left' | 'right' | 'alternate';

export interface TimelineItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Custom dot element or icon name */
  dot?: React.ReactNode | IconName;
  /** Dot color */
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  /** Label content (shown on opposite side in alternate mode) */
  label?: React.ReactNode;
  /** Whether this item is pending (shows dashed line) */
  pending?: boolean;
  /** Position override for this item */
  position?: 'left' | 'right';
  /** Item children */
  children?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Timeline mode - left, right, or alternate */
  mode?: TimelineMode;
  /** Whether the last item is pending */
  pending?: boolean | React.ReactNode;
  /** Custom pending dot */
  pendingDot?: React.ReactNode;
  /** Reverse the timeline order */
  reverse?: boolean;
  /** Timeline items */
  children?: React.ReactNode;
}

// ============================================================================
// Color Mapping
// ============================================================================

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

// ============================================================================
// TimelineItem Component
// ============================================================================

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({
    className,
    dot,
    color = 'primary',
    label,
    pending = false,
    position,
    children,
    ...props
  }, ref) => {
    const renderDot = () => {
      if (React.isValidElement(dot)) {
        return dot;
      }

      if (typeof dot === 'string') {
        return (
          <Icon
            name={dot as IconName}
            size={16}
            className={iconColorMap[color]}
          />
        );
      }

      // Default dot
      return (
        <div
          className={cn(
            "w-[10px] h-[10px] rounded-full border-2",
            colorMap[color]
          )}
        />
      );
    };

    return (
      <li
        ref={ref}
        className={cn(
          "relative flex",
          className
        )}
        data-position={position}
        data-pending={pending}
        {...props}
      >
        {/* Timeline connector line - rendered by parent */}
        <div className="timeline-dot-container flex items-start justify-center w-[24px] relative z-10">
          <div className="mt-[6px]">
            {renderDot()}
          </div>
        </div>
        <div className="timeline-content flex-1 pb-[var(--spacing-x6)] pl-[var(--spacing-x3)]">
          {children}
        </div>
        {label && (
          <div className="timeline-label hidden">
            {label}
          </div>
        )}
      </li>
    );
  }
);

TimelineItem.displayName = 'Timeline.Item';

// ============================================================================
// Timeline Component
// ============================================================================

export const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(
  ({
    className,
    mode = 'left',
    pending,
    pendingDot,
    reverse = false,
    children,
    ...props
  }, ref) => {
    // Process children
    let items = React.Children.toArray(children);

    // Add pending item if needed
    if (pending) {
      const pendingItem = (
        <TimelineItem
          key="timeline-pending"
          pending
          dot={pendingDot || <Icon name="loading" size={16} className="animate-spin text-[var(--color-primary)]" />}
        >
          {typeof pending === 'boolean' ? null : pending}
        </TimelineItem>
      );
      items = [...items, pendingItem];
    }

    // Reverse if needed
    if (reverse) {
      items = items.reverse();
    }

    // Calculate positions for alternate mode
    const processedItems = items.map((child, index) => {
      if (!React.isValidElement<TimelineItemProps>(child)) return child;

      let position: 'left' | 'right' = 'left';
      if (mode === 'alternate') {
        position = index % 2 === 0 ? 'left' : 'right';
      } else if (mode === 'right') {
        position = 'right';
      }

      // Use item's own position if specified
      const itemPosition = child.props.position || position;
      const isLast = index === items.length - 1;
      const isPending = child.props.pending || (pending && isLast);

      return React.cloneElement(child, {
        position: itemPosition,
        pending: isPending,
      } as Partial<TimelineItemProps>);
    });

    return (
      <ul
        ref={ref}
        className={cn(
          "relative list-none p-0 m-0",
          mode === 'alternate' && 'timeline-alternate',
          mode === 'right' && 'timeline-right',
          className
        )}
        data-mode={mode}
        {...props}
      >
        {processedItems.map((child, index) => {
          if (!React.isValidElement<TimelineItemProps>(child)) return child;

          const isLast = index === processedItems.length - 1;
          const isPending = child.props.pending;
          const position = child.props.position || 'left';

          // Wrapper for positioning
          return (
            <div
              key={child.key || index}
              className={cn(
                "relative",
                mode === 'alternate' && position === 'right' && 'flex flex-row-reverse',
                mode === 'right' && 'flex flex-row-reverse'
              )}
            >
              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute top-[20px] w-[2px] h-[calc(100%-20px)]",
                    mode === 'left' && 'left-[11px]',
                    mode === 'right' && 'right-[11px]',
                    mode === 'alternate' && position === 'left' && 'left-[11px]',
                    mode === 'alternate' && position === 'right' && 'right-[11px]',
                    isPending
                      ? 'border-l-2 border-dashed border-[var(--color-border-primary)]'
                      : 'bg-[var(--color-border-primary)]'
                  )}
                />
              )}
              {/* Label for alternate mode */}
              {mode === 'alternate' && child.props.label && (
                <div
                  className={cn(
                    "flex-1 text-[var(--color-tertiary)] pt-[6px]",
                    position === 'left' ? 'text-right pr-[var(--spacing-x3)]' : 'text-left pl-[var(--spacing-x3)]'
                  )}
                >
                  <Typography variant="body-secondary-regular">
                    {child.props.label}
                  </Typography>
                </div>
              )}
              {/* Content wrapper */}
              <div className={cn(mode === 'alternate' && 'flex-1')}>
                {child}
              </div>
              {/* Empty spacer for alternate mode */}
              {mode === 'alternate' && !child.props.label && (
                <div className="flex-1" />
              )}
            </div>
          );
        })}
      </ul>
    );
  }
);

Timeline.displayName = 'Timeline';

// Attach Item to Timeline
(Timeline as any).Item = TimelineItem;

export default Timeline;

