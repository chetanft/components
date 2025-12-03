"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * TableBody component props
 * 
 * @public
 */
export interface TableBodyProps extends ComposableProps<'tbody'> {
  /**
   * Body content (table rows)
   */
  children: React.ReactNode;
}

/**
 * TableBody Component
 * 
 * A composable table body component that wraps the `<tbody>` element.
 * Contains the data rows of the table.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 * 
 * @remarks
 * - Wraps the HTML `<tbody>` element
 * - Supports `asChild` prop for custom element composition
 * - Use with TableRow and TableCell components for consistent styling
 * - Accessible: maintains proper table structure semantics
 */
export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'tbody';
    
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

TableBody.displayName = 'TableBody';

