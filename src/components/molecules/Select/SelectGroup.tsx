"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Group content
   */
  children: React.ReactNode;
}

/**
 * SelectGroup Component
 * 
 * Shadcn-compatible select group wrapper.
 * Groups related SelectItems together.
 * 
 * @public
 */
export const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn('p-1', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SelectGroup.displayName = 'SelectGroup';

