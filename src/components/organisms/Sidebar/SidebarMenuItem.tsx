"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * SidebarMenuItem component props
 *
 * @public
 */
export interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
}

/**
 * SidebarMenuItem Component
 *
 * Menu item wrapper (li) for individual sidebar menu entries.
 *
 * @public
 */
export const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        data-slot="sidebar-menu-item"
        className={cn('list-none', className)}
        {...props}
      >
        {children}
      </li>
    );
  }
);

SidebarMenuItem.displayName = 'SidebarMenuItem';
