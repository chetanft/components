"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface TabsListProps extends ComposableProps<'div'> {
  /**
   * The tab triggers.
   */
  children?: React.ReactNode;
}

/**
 * TabsList Component
 *
 * A composable component that contains TabsTrigger components.
 * Provides the container for the tab navigation.
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
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides default styling for tab list container.
 */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex items-center gap-0", className)}
        role="tablist"
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

TabsList.displayName = 'TabsList';

