"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * SidebarInset component props
 *
 * @public
 */
export interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * SidebarInset Component
 *
 * Main content wrapper that adapts to the sidebar width. Place alongside
 * the Sidebar component inside SidebarProvider.
 *
 * @public
 */
export const SidebarInset = React.forwardRef<HTMLDivElement, SidebarInsetProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-inset"
        className={cn(
          'flex-1 flex flex-col min-w-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarInset.displayName = 'SidebarInset';
