"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

export interface SelectSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional className
   */
  className?: string;
}

/**
 * SelectSeparator Component
 * 
 * Shadcn-compatible select separator component.
 * Visual divider between groups of items.
 * 
 * @public
 */
export const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn(
          '-mx-1 my-1 h-px bg-[var(--border-primary)]',
          className
        )}
        {...props}
      />
    );
  }
);

SelectSeparator.displayName = 'SelectSeparator';

