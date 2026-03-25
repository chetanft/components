"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * SidebarContent component props
 *
 * @public
 */
export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * SidebarContent Component
 *
 * Scrollable middle section of the sidebar containing navigation groups.
 *
 * @public
 */
export const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-content"
        className={cn(
          'flex-1 overflow-y-auto overflow-x-hidden',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarContent.displayName = 'SidebarContent';
