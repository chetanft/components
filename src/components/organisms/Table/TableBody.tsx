"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

/**
 * TableBody Component
 * 
 * Shadcn-compatible table body wrapper component.
 * 
 * @public
 */
export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn(className)}
        {...props}
      >
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'TableBody';

