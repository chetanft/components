"use client";

import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../../lib/utils';
import { useTabsContext } from './TabsContext';

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /**
   * The tab triggers.
   */
  children?: React.ReactNode;
  /**
   * Support asChild pattern (forwarded to Radix)
   */
  asChild?: boolean;
}

/**
 * TabsList Component
 *
 * A composable component that contains TabsTrigger components.
 * Built on Radix Tabs.List — provides arrow-key navigation and
 * roving tabindex out of the box.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tabs>
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 *
 * @remarks
 * - Wraps Radix Tabs.List for keyboard navigation.
 * - Primary type: no gap between tabs (flush bottom borders).
 * - Secondary/Tertiary type: gap between tabs.
 * - When showLine=true (primary type), a trailing line fills remaining width.
 */
export const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, children, asChild, ...props }, ref) => {
  const { type, showLine } = useTabsContext();

  return (
    <TabsPrimitive.List
      ref={ref}
      asChild={asChild}
      className={cn(
        "flex items-center",
        // Primary: no gap (tabs sit flush). Secondary/Tertiary: gap between pills.
        type === 'primary' ? "gap-0" : "gap-[var(--spacing-x3)]",
        className
      )}
      {...props}
    >
      {children}
      {/* Trailing line — fills remaining width after last tab (primary only) */}
      {type === 'primary' && showLine && (
        <div
          className="border-b border-[var(--border-primary)] flex-[1_0_0] min-h-px min-w-px self-stretch"
          aria-hidden="true"
        />
      )}
    </TabsPrimitive.List>
  );
});

TabsList.displayName = 'TabsList';
