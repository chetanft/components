"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

/**
 * SidebarSeparator component props
 *
 * @public
 */
export interface SidebarSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

/**
 * SidebarSeparator Component
 *
 * Visual divider between sidebar sections.
 *
 * @public
 */
export const SidebarSeparator = React.forwardRef<HTMLHRElement, SidebarSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        data-slot="sidebar-separator"
        className={cn(
          'mx-2 my-1 border-t border-[var(--border-secondary)]',
          className
        )}
        {...props}
      />
    );
  }
);

SidebarSeparator.displayName = 'SidebarSeparator';
