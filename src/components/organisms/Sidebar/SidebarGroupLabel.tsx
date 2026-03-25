"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { useSidebar } from './SidebarContext';

/**
 * SidebarGroupLabel component props
 *
 * @public
 */
export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * SidebarGroupLabel Component
 *
 * Heading label for a sidebar group. Hidden when sidebar is collapsed to icon mode.
 *
 * @public
 */
export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className, children, ...props }, ref) => {
    const { open, collapsible } = useSidebar();
    const isCollapsedIcon = !open && collapsible === 'icon';

    return (
      <div
        ref={ref}
        data-slot="sidebar-group-label"
        className={cn(
          'px-2 py-1.5 text-xs font-semibold tracking-wide uppercase',
          'text-[var(--text-tertiary)]',
          'truncate',
          isCollapsedIcon && 'sr-only',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SidebarGroupLabel.displayName = 'SidebarGroupLabel';
