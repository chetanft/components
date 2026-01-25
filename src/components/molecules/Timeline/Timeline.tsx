"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { TimelineDot } from './TimelineDot';
import { TimelineContent } from './TimelineContent';
import { TimelineLabel } from './TimelineLabel';

// ============================================================================
// Types
// ============================================================================

export type TimelineMode = 'left' | 'right' | 'alternate';

export interface TimelineItemProps extends ComposableProps<'li'> {
  /**
   * Custom dot element or icon name (for declarative API)
   * @deprecated Use TimelineDot component instead
   */
  dot?: React.ReactNode | IconName;
  /**
   * Dot color (for declarative API)
   * @deprecated Use TimelineDot component instead
   */
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  /**
   * Label content (for declarative API)
   * @deprecated Use TimelineLabel component instead
   */
  label?: React.ReactNode;
  /**
   * Whether this item is pending (shows dashed line)
   * @default false
   */
  pending?: boolean;
  /**
   * Position override for this item
   */
  position?: 'left' | 'right';
  /**
   * Whether to show the connector line to the next item
   * @default false
   */
  showConnector?: boolean;
  /**
   * Item children (for composable API)
   */
  children?: React.ReactNode;
}

export interface TimelineProps extends ComposableProps<'ul'> {
  /**
   * Timeline mode - left, right, or alternate
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
}

// ============================================================================
// Color Mapping
// ============================================================================

const _colorMap = {
  primary: 'bg-[var(--color-primary)] border-[var(--color-primary)]',
  success: 'bg-[var(--color-positive)] border-[var(--color-positive)]',
  warning: 'bg-[var(--color-warning)] border-[var(--color-warning)]',
  danger: 'bg-[var(--color-critical)] border-[var(--color-critical)]',
  neutral: 'bg-[var(--color-neutral)] border-[var(--color-neutral)]',
};

const _iconColorMap = {
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
    showConnector = false,
    children,
    asChild,
    ...props
  }, ref) => {
    // Check if using composable API (has children with Timeline sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
        child?.type?.displayName?.startsWith('Timeline')
    );
    
    const renderDot = () => {
      if (dot) {
        return <TimelineDot color={color} icon={dot as any} />;
      }

      return <TimelineDot color={color} />;
    };

    const Connector = () => (
      <div
        className={cn(
          "absolute w-px left-1/2 -translate-x-1/2",
          pending
            ? 'border-l-2 border-dashed border-[var(--color-border-primary)]'
            : 'bg-[var(--color-border-primary)]'
        )}
        style={{
          top: 'calc(var(--spacing-x3) + var(--spacing-x2))',
          height: 'calc(100% - (var(--spacing-x3) + var(--spacing-x2)))',
        }}
      />
    );

    // If using composable API, render with sub-components
    if (hasComposableChildren) {
        const Comp = asChild ? Slot : 'li';
        const isReversed = position === 'right';
        
        return (
            <Comp
                ref={ref}
                className={cn(
                    "relative flex w-full",
                    isReversed && "flex-row-reverse",
                    pending && "opacity-50",
                    className
                )}
                data-position={position}
                data-pending={pending}
                {...props}
            >
                <div className={cn(
                  "timeline-dot-container flex-shrink-0 w-[var(--spacing-x6)] flex flex-col justify-start items-center relative z-10"
                )}>
                    {showConnector && <Connector />}
                    <div className="mt-[var(--spacing-x1)] flex items-center justify-center">
                      {renderDot()}
                    </div>
                </div>
                <div className={cn(
                    "flex-1 pb-[var(--spacing-x6)]",
                    isReversed ? "pr-[var(--spacing-x3)] text-right" : "pl-[var(--spacing-x3)]"
                )}>
                    <TimelineContent>
                        {children}
                    </TimelineContent>
                    {label && <TimelineLabel>{label}</TimelineLabel>}
                </div>
            </Comp>
        );
    }
    
    // Otherwise use declarative API (deprecated)
    const Comp = asChild ? Slot : 'li';
    const isReversed = position === 'right';
    // Cast children and label to exclude bigint which Slot doesn't accept
    const safeChildren = children as Exclude<React.ReactNode, bigint> | undefined;
    const safeLabel = label as Exclude<React.ReactNode, bigint> | undefined;
    
    return (
        <Comp
            ref={ref}
            className={cn(
                "relative flex w-full",
                isReversed && "flex-row-reverse",
                className
            )}
            data-position={position}
            data-pending={pending}
            {...props}
        >
            {/* Timeline connector line - rendered by parent in old version, now here */}
            <div className="timeline-dot-container flex flex-col items-center justify-start w-[var(--spacing-x6)] relative z-10">
                {showConnector && <Connector />}
                <div className="mt-[var(--spacing-x1)] flex items-center justify-center">
                    {renderDot()}
                </div>
            </div>
            <div
              className={cn(
                "timeline-content flex-1 flex flex-col w-full pb-[var(--spacing-x6)]",
                isReversed ? "pr-[var(--spacing-x3)] text-right" : "pl-[var(--spacing-x3)]"
              )}
            >
                {safeChildren}
            </div>
            {safeLabel && (
                <div className="timeline-label hidden">
                    {safeLabel}
                </div>
            )}
        </Comp>
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
    asChild,
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
      const showConnector = !isLast;

      return React.cloneElement(child, {
        position: itemPosition,
        pending: isPending,
        showConnector,
      } as Partial<TimelineItemProps>);
    });

    const Comp = asChild ? Slot : 'ul';
    return (
      <Comp
        ref={ref}
        className={cn(
          "relative list-none p-0 m-0 flex flex-col",
          mode === 'alternate' && 'timeline-alternate',
          mode === 'right' && 'timeline-right',
          className
        )}
        data-mode={mode}
        {...props}
      >
        {processedItems.map((child, index) => {
          if (!React.isValidElement<TimelineItemProps>(child)) return child;

          const position = child.props.position || 'left';

          // Wrapper for positioning
          const labelNode = mode === 'alternate' && child.props.label ? (
            <div
              className={cn(
                "flex-1 text-[var(--color-tertiary)] pt-[var(--spacing-x1)]",
                position === 'left'
                  ? 'text-left pl-[var(--spacing-x3)]'
                  : 'text-right pr-[var(--spacing-x3)]'
              )}
            >
              <Typography variant="body-secondary-regular">
                {child.props.label}
              </Typography>
            </div>
          ) : null;

          const contentNode = (
            <div className={cn(mode === 'alternate' && 'flex-1')}>
              {child}
            </div>
          );

          return (
            <div
              key={child.key || index}
              className={cn(
                "relative flex",
                mode === 'right' && 'flex-row-reverse'
              )}
            >
              {/* Connector line removed - now in TimelineItem */}
              {mode === 'alternate' ? (
                <>
                  {position === 'left' ? contentNode : labelNode}
                  {position === 'left' ? labelNode : contentNode}
                  {!child.props.label && <div className="flex-1" />}
                </>
              ) : (
                <>
                  {labelNode}
                  {contentNode}
                </>
              )}
            </div>
          );
        })}
      </Comp>
    );
  }
);

Timeline.displayName = 'Timeline';

// Attach Item to Timeline
(Timeline as any).Item = TimelineItem;

export default Timeline;