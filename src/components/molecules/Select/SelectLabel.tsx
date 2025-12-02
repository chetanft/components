"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

export interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Label text
   */
  children: React.ReactNode;
}

/**
 * SelectLabel Component
 * 
 * Shadcn-compatible select label component.
 * Used within SelectGroup to label a group of items.
 * 
 * @public
 */
export const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'py-[var(--spacing-x2)] px-[var(--spacing-x3)] text-xs font-semibold text-[var(--secondary)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectLabel.displayName = 'SelectLabel';

