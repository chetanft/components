"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useTabsContext } from './TabsContext';

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
    const { registerValue } = useTabsContext();
    const Comp = asChild ? Slot : 'div';
    
    // Clone children and inject index prop for TabsTrigger components
    const childrenWithIndex = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        // Check if this is a TabsTrigger component
        const childType = child.type as any;
        if (childType && typeof childType === 'object' && 'displayName' in childType && childType.displayName === 'TabsTrigger') {
          const value = (child.props as any).value;
          if (value) {
            registerValue(value, index);
          }
          return React.cloneElement(child as React.ReactElement<any>, { 
            ...child.props,
            _tabIndex: index 
          });
        }
      }
      return child;
    });
    
    return (
      <Comp
        ref={ref}
        className={cn("flex items-center gap-[var(--spacing-x3)]", className)}
        role="tablist"
        {...props}
      >
        {childrenWithIndex}
      </Comp>
    );
  }
);

TabsList.displayName = 'TabsList';

