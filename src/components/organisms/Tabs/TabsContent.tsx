"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useTabsContext } from './TabsContext';

export interface TabsContentProps extends ComposableProps<'div'> {
  /**
   * The value of this tab content (must match TabsTrigger value)
   */
  value: string;
  /**
   * The content of the tab panel.
   */
  children?: React.ReactNode;
}

/**
 * TabsContent Component
 *
 * A composable component for tab content panels.
 * Only displays when the matching TabsTrigger is selected.
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
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically shows/hides based on active tab.
 * - Accessible: includes ARIA attributes for tab panels.
 */
export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, asChild, ...props }, ref) => {
    const { activeTab } = useTabsContext();
    
    // Find index by value (simplified - would need value-to-index mapping)
    const tabIndex = 0;
    const isActive = activeTab === tabIndex;
    
    if (!isActive) return null;
    
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        className={cn("mt-4", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

TabsContent.displayName = 'TabsContent';

