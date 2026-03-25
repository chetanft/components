"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { TimelineDot, type TimelineDotProps } from './TimelineDot';
import { TimelineContent } from './TimelineContent';

// ============================================================================
// Types
// ============================================================================

export type TimelineMode = 'left' | 'right' | 'alternate';

export interface TimelineItemProps {
  /**
   * Whether this item is pending (shows dashed connector + reduced opacity)
   * @default false
   */
  pending?: boolean;
  /**
   * Position override for this item (used by alternate mode)
   */
  position?: 'left' | 'right';
  /**
   * Whether to show the connector line to the next item.
   * Automatically set by Timeline — no need to pass manually.
   * @default true
   */
  showConnector?: boolean;
  /**
   * Item children — should contain TimelineDot + TimelineContent
   */
  children?: React.ReactNode;
  className?: string;
}

export interface TimelineProps {
  /**
   * Timeline mode
   * @default 'left'
   */
  mode?: TimelineMode;
  /**
   * Whether the last item is pending
   * @default false
   */
  pending?: boolean | React.ReactNode;
  /**
   * Custom pending dot
   */
  pendingDot?: React.ReactNode;
  /**
   * Reverse the timeline order
   * @default false
   */
  reverse?: boolean;
  /**
   * Timeline items (typically TimelineItem components)
   */
  children?: React.ReactNode;
  className?: string;
}

// ============================================================================
// Helpers — extract TimelineDot from children
// ============================================================================

function extractDotAndContent(children: React.ReactNode): {
  dot: React.ReactElement | null;
  rest: React.ReactNode[];
} {
  let dot: React.ReactElement | null = null;
  const rest: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (
      !dot &&
      React.isValidElement(child) &&
      (child.type === TimelineDot || (child as any)?.type?.slot === 'timeline-dot')
    ) {
      dot = child;
    } else {
      rest.push(child);
    }
  });

  return { dot, rest };
}

// ============================================================================
// TimelineItem Component
// ============================================================================

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({
    className,
    pending = false,
    position,
    showConnector = true,
    children,
    ...props
  }, ref) => {
    const { dot, rest } = extractDotAndContent(children);
    const isRight = position === 'right';
    const hasIcon = dot != null;

    return (
      <li
        ref={ref}
        className={cn(
          "relative flex",
          isRight && "flex-row-reverse",
          pending && "opacity-50",
          className,
        )}
        data-position={position}
        data-pending={pending || undefined}
        {...props}
      >
        {/* Separator column: dot + connector line */}
        <div className="relative flex flex-col items-center flex-shrink-0" style={{ width: 24 }}>
          {/* Dot */}
          <div className="relative z-10 flex items-center justify-center" style={{ height: 24 }}>
            {dot || <TimelineDot />}
          </div>

          {/* Connector line — from below the dot to the bottom of the item */}
          {showConnector && (
            <div
              className={cn(
                "flex-1 w-px",
                pending
                  ? "border-l border-dashed border-[var(--border-primary)]"
                  : "bg-[var(--border-primary)]",
              )}
            />
          )}
        </div>

        {/* Content column */}
        <div
          className={cn(
            "flex-1 min-w-0 pb-[var(--spacing-x6)]",
            isRight ? "pr-[var(--spacing-x3)] text-right" : "pl-[var(--spacing-x3)]",
          )}
        >
          {rest}
        </div>
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
    // Collect children
    let items = React.Children.toArray(children);

    // Append pending item if needed
    if (pending) {
      const pendingItem = (
        <TimelineItem key="timeline-pending" pending>
          <TimelineDot>
            {pendingDot || (
              <Icon
                name="loading"
                size={12}
                className="animate-spin text-[var(--primary)]"
              />
            )}
          </TimelineDot>
          {typeof pending === 'boolean' ? null : (
            <TimelineContent>{pending}</TimelineContent>
          )}
        </TimelineItem>
      );
      items = [...items, pendingItem];
    }

    // Reverse
    if (reverse) {
      items = items.reverse();
    }

    // Calculate positions + showConnector
    const processedItems = items.map((child, index) => {
      if (!React.isValidElement<TimelineItemProps>(child)) return child;

      let position: 'left' | 'right' = 'left';
      if (mode === 'alternate') {
        position = index % 2 === 0 ? 'left' : 'right';
      } else if (mode === 'right') {
        position = 'right';
      }

      const itemPosition = child.props.position || position;
      const isLast = index === items.length - 1;
      const isPending = child.props.pending || (pending && isLast);
      const showConnector = !isLast;

      return React.cloneElement(child, {
        position: itemPosition,
        pending: isPending,
        showConnector,
      } as Partial<TimelineItemProps>);
    });

    return (
      <ul
        ref={ref}
        className={cn(
          "relative list-none p-0 m-0 flex flex-col",
          className,
        )}
        data-mode={mode}
        {...props}
      >
        {processedItems}
      </ul>
    );
  }
);

Timeline.displayName = 'Timeline';

// Attach Item to Timeline for convenience
type TimelineWithSubcomponents = typeof Timeline & {
  Item: typeof TimelineItem;
};
(Timeline as TimelineWithSubcomponents).Item = TimelineItem;

export default Timeline;
