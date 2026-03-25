"use client";

import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../../lib/utils';

export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  /**
   * The value of this tab content (must match TabsTrigger value)
   */
  value: string;
  /**
   * The content of the tab panel.
   */
  children?: React.ReactNode;
  /**
   * Support asChild pattern (forwarded to Radix)
   */
  asChild?: boolean;
}

/**
 * TabsContent Component
 *
 * A composable component for tab content panels.
 * Built on Radix Tabs.Content — automatically shows/hides based on active tab.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tabs>
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">
 *     <p>Content for Tab 1</p>
 *   </TabsContent>
 * </Tabs>
 * ```
 *
 * @remarks
 * - Wraps Radix Tabs.Content for automatic show/hide.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Accessible: includes ARIA attributes for tab panels.
 */
export const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, value, children, asChild, ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      value={value}
      asChild={asChild}
      className={cn("mt-[var(--spacing-x4)]", className)}
      {...props}
    >
      {children}
    </TabsPrimitive.Content>
  );
});

TabsContent.displayName = 'TabsContent';
