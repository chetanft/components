"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { useSidebar } from './SidebarContext';

/**
 * SidebarTrigger component props
 *
 * @public
 */
export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

/**
 * SidebarTrigger Component
 *
 * Toggle button to open/close the sidebar. Renders a hamburger/close icon
 * by default, or accepts custom children.
 *
 * @public
 */
export const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, children, onClick, ...props }, ref) => {
    const { toggleSidebar, open } = useSidebar();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      toggleSidebar();
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        data-slot="sidebar-trigger"
        data-sidebar-open={open}
        aria-label={open ? 'Close sidebar' : 'Open sidebar'}
        className={cn(
          'inline-flex items-center justify-center rounded-md p-2',
          'text-[var(--text-secondary)]',
          'hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-primary)]',
          'transition-colors duration-150',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children ?? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="2" y1="4" x2="14" y2="4" />
            <line x1="2" y1="8" x2="14" y2="8" />
            <line x1="2" y1="12" x2="14" y2="12" />
          </svg>
        )}
      </button>
    );
  }
);

SidebarTrigger.displayName = 'SidebarTrigger';
