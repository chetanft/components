"use client";

import React, { useState } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../../lib/utils';
import { useTabsContext } from './TabsContext';
import { Icon } from '../../atoms/Icons';

export interface TabsTriggerProps extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, 'asChild'> {
  /**
   * The value of this tab (used to match with TabsContent)
   */
  value: string;
  /**
   * Whether this tab is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon to display in the tab
   */
  icon?: boolean | React.ReactNode;
  /**
   * Badge to display in the tab
   */
  badge?: boolean;
  /**
   * Badge count value
   */
  badgeCount?: string | number;
  /**
   * Notification dot indicator
   */
  notification?: boolean;
  /**
   * The label text for the tab
   */
  children: React.ReactNode;
  /**
   * Support asChild pattern (forwarded to Radix)
   */
  asChild?: boolean;
}

/**
 * TabsTrigger Component
 *
 * A composable component for individual tab triggers.
 * Built on Radix Tabs.Trigger — provides roving tabindex and
 * keyboard navigation out of the box.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tabs>
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2" badge badgeCount={5}>Tab 2</TabsTrigger>
 *   </TabsList>
 * </Tabs>
 * ```
 *
 * @remarks
 * - Wraps Radix Tabs.Trigger for accessibility.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically applies selection state styling based on context.
 * - Accessible: includes ARIA attributes, roving tabindex, and keyboard navigation.
 */
export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(
  ({
    className,
    value,
    disabled = false,
    icon,
    badge,
    badgeCount,
    notification,
    children,
    asChild,
    ...props
  }, ref) => {
    const { type } = useTabsContext();
    const [isHovered, setIsHovered] = useState(false);

    const gapClass = notification ? "gap-[var(--spacing-x1)]" : "gap-[var(--spacing-x2)]";

    // Build class names using Radix data-state attribute for selection styling.
    // Radix puts data-state="active" or data-state="inactive" on the trigger element.

    const baseStyles = cn(
      // Use 'group' so children can style based on parent data-state
      "group",
      "relative flex flex-col gap-[var(--spacing-x2-5)] items-start transition-all cursor-pointer flex-shrink-0",
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      type === 'primary'
        ? "px-[var(--spacing-x8)] py-[var(--spacing-x3)]"
        : "px-[var(--spacing-x4)] py-[var(--spacing-x2)]",
      type === 'primary' && "rounded-none",
      type === 'secondary' && "rounded-lg",
      type === 'tertiary' && "rounded-full",

      // Primary border styles
      type === 'primary' && [
        "border-l-0 border-r-0 border-t-0 border-solid",
        // Selected (active) state — bottom indicator bar
        "data-[state=active]:border-b-0 data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[var(--spacing-x1)] data-[state=active]:after:bg-[var(--primary)]",
        // Inactive state — bottom border
        "data-[state=inactive]:border-b data-[state=inactive]:border-b-[var(--border-primary)]",
      ],

      // Secondary/tertiary border styles
      (type === 'secondary' || type === 'tertiary') && [
        "border border-solid border-[var(--tertiary)]",
      ],

      // Background: selected state
      (type === 'secondary' || type === 'tertiary') && "data-[state=active]:bg-[var(--border-secondary)]",

      // Background: unselected
      "data-[state=inactive]:bg-transparent",

      className
    );

    // Hover styles applied dynamically since they interact with data-state + mouse.
    const hoverStyles = isHovered ? cn(
      type === 'primary' && [
        // Inactive hover: show border and bg
        "data-[state=inactive]:!border-b data-[state=inactive]:!border-b-[var(--tertiary)] data-[state=inactive]:bg-[var(--border-secondary)]",
      ],
      (type === 'secondary' || type === 'tertiary') && [
        "!border-[var(--primary)]",
        "data-[state=inactive]:bg-[var(--bg-secondary)]",
      ],
    ) : undefined;

    const containerAlignment = type === 'primary'
      ? "group-data-[state=active]:justify-center group-data-[state=inactive]:justify-start"
      : "justify-center";

    return (
      <TabsPrimitive.Trigger
        ref={ref}
        value={value}
        disabled={disabled}
        asChild={asChild}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(baseStyles, hoverStyles)}
        {...props}
      >
        <div className={cn("flex items-center", gapClass, containerAlignment)}>
          {icon && (
            <div className="overflow-clip relative shrink-0 size-[var(--spacing-x4)]">
              {typeof icon === 'boolean' ? (
                <Icon name="check" size={16} className="text-[var(--primary)]" />
              ) : (
                icon
              )}
            </div>
          )}
          <span className={cn(
            "leading-[1.4] relative shrink-0 text-[var(--primary)] text-[length:var(--font-size-md-rem)]",
            "group-data-[state=active]:font-semibold group-data-[state=inactive]:font-normal"
          )}>
            {children}
          </span>
          {badge && (
            <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] border-solid box-border content-stretch flex gap-[var(--spacing-x2)] h-[var(--spacing-x6)] items-center justify-center px-[var(--spacing-x1)] py-0 relative rounded-[var(--radius-sm)] shrink-0">
              <span className="font-semibold leading-[1.4] relative shrink-0 text-[var(--primary)] text-sm">
                {badgeCount}
              </span>
            </div>
          )}
          {notification && (
            <div className="relative shrink-0 size-[0.375rem]">
              <div className="absolute inset-0 bg-[var(--critical)] rounded-full" />
            </div>
          )}
        </div>
      </TabsPrimitive.Trigger>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';
