"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * SidebarMenu component props
 *
 * @public
 */
export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode;
}

/**
 * SidebarMenu Component
 *
 * Menu list wrapper (ul) for sidebar menu items.
 *
 * @public
 */
export const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        data-slot="sidebar-menu"
        className={cn('flex flex-col gap-0.5 list-none p-0 m-0', className)}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

SidebarMenu.displayName = 'SidebarMenu';
