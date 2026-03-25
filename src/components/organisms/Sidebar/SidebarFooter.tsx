"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * SidebarFooter component props
 *
 * @public
 */
export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * SidebarFooter Component
 *
 * Bottom section of the sidebar, typically used for user info or secondary actions.
 *
 * @public
 */
export const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-footer"
        className={cn(
          'flex items-center gap-2 px-4 py-3 shrink-0 border-t border-[var(--border-secondary)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarFooter.displayName = 'SidebarFooter';
