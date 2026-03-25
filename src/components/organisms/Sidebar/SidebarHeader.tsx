"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * SidebarHeader component props
 *
 * @public
 */
export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * SidebarHeader Component
 *
 * Top section of the sidebar, typically used for branding or app name.
 *
 * @public
 */
export const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-header"
        className={cn(
          'flex items-center gap-2 px-4 py-3 shrink-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarHeader.displayName = 'SidebarHeader';
