"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

/**
 * TableFooter component props
 * 
 * @public
 */
export interface TableFooterProps extends ComposableProps<'tfoot'> {
  /**
   * Footer content
   */
  children: React.ReactNode;
}

/**
 * TableFooter Component
 * 
 * A composable table footer component that wraps the `<tfoot>` element.
 * Use this to add footer rows to your table.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Total</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     // rows
 *   </TableBody>
 *   <TableFooter>
 *     <TableRow>
 *       <TableCell colSpan={2} className="text-right font-semibold">
 *         Total: $1,234.56
 *       </TableCell>
 *     </TableRow>
 *   </TableFooter>
 * </Table>
 * ```
 * 
 * @remarks
 * - Wraps the HTML `<tfoot>` element
 * - Supports `asChild` prop for custom element composition
 * - Use with TableRow and TableCell components for consistent styling
 * - Accessible: maintains proper table structure semantics
 */
export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'tfoot';
    
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

TableFooter.displayName = 'TableFooter';

