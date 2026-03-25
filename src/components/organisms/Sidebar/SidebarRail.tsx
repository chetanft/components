"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { useSidebar } from './SidebarContext';

/**
 * SidebarRail component props
 *
 * @public
 */
export interface SidebarRailProps extends React.HTMLAttributes<HTMLButtonElement> {}

/**
 * SidebarRail Component
 *
 * A thin rail visible along the sidebar edge. When clicked, toggles the sidebar.
 * In collapsed icon mode, hovering the rail can provide a visual cue for expansion.
 *
 * @public
 */
export const SidebarRail = React.forwardRef<HTMLButtonElement, SidebarRailProps>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar, side } = useSidebar();

    return (
      <button
        ref={ref}
        data-slot="sidebar-rail"
        aria-label="Toggle sidebar"
        tabIndex={-1}
        className={cn(
          'absolute top-0 bottom-0 z-20 w-1 cursor-pointer',
          'bg-transparent hover:bg-[var(--border-primary)]',
          'transition-colors duration-150',
          side === 'left' ? '-right-0.5' : '-left-0.5',
          className
        )}
        onClick={toggleSidebar}
        {...props}
      />
    );
  }
);

SidebarRail.displayName = 'SidebarRail';
