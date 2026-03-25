"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * SidebarGroup component props
 *
 * @public
 */
export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * SidebarGroup Component
 *
 * Groups related menu items together within the sidebar content area.
 *
 * @public
 */
export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-group"
        className={cn('flex flex-col gap-1 px-2 py-2', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarGroup.displayName = 'SidebarGroup';
