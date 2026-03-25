"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { useSidebar } from './SidebarContext';

/**
 * SidebarMenuButton component props
 *
 * @public
 */
export interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether this menu item represents the current/active page */
  isActive?: boolean;
  /** Child elements (typically an Icon and label text) */
  children?: React.ReactNode;
}

/**
 * SidebarMenuButton Component
 *
 * Clickable menu button with icon support. Supports active state highlighting
 * and adapts its layout when the sidebar is collapsed to icon-only mode.
 *
 * @public
 */
export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, isActive = false, children, ...props }, ref) => {
    const { open, collapsible } = useSidebar();
    const isCollapsedIcon = !open && collapsible === 'icon';

    return (
      <button
        ref={ref}
        data-slot="sidebar-menu-button"
        data-active={isActive || undefined}
        className={cn(
          'flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium',
          'text-[var(--text-secondary)]',
          'transition-colors duration-150',
          'hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-primary)]',
          isActive && 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]',
          isCollapsedIcon && 'justify-center px-0',
          className
        )}
        title={isCollapsedIcon ? (typeof children === 'string' ? children : undefined) : undefined}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          // When collapsed to icon mode, only show the first child (the icon)
          if (isCollapsedIcon && index > 0) {
            return (
              <span className="sr-only">{child}</span>
            );
          }
          return child;
        })}
      </button>
    );
  }
);

SidebarMenuButton.displayName = 'SidebarMenuButton';
