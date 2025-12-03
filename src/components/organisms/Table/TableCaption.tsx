"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * TableCaption component props
 * 
 * @public
 */
export interface TableCaptionProps extends ComposableProps<'caption'> {
  /**
   * Caption text or content
   */
  children: React.ReactNode;
}

/**
 * TableCaption Component
 * 
 * A composable table caption component that wraps the `<caption>` element.
 * Provides an accessible description for the table.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Table>
 *   <TableCaption>
 *     Monthly sales data for Q1 2024
 *   </TableCaption>
 *   <TableHeader>
 *     // header rows
 *   </TableHeader>
 *   <TableBody>
 *     // data rows
 *   </TableBody>
 * </Table>
 * ```
 * 
 * @remarks
 * - Wraps the HTML `<caption>` element
 * - Supports `asChild` prop for custom element composition
 * - Important for accessibility: screen readers use captions to describe tables
 * - Typically placed as the first child of the table element
 * - Use for descriptive text, not for styling purposes
 */
export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'caption';
    
    return (
      <Comp
        ref={ref}
        className={cn(className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

TableCaption.displayName = 'TableCaption';

