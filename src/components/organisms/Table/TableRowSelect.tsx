"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Checkbox } from '../../atoms/Checkbox';
import { useTableSelection } from './TableSelectionContext';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface TableRowSelectProps extends Omit<ComposableProps<'div'>, 'onChange'> {
    /** Row identifier - required */
    rowId: string | number;
    /** Custom checkbox renderer */
    renderCheckbox?: (props: {
        checked: boolean;
        onChange: () => void
    }) => React.ReactNode;
}

/**
 * TableRowSelect - Checkbox for individual row selection
 * 
 * Renders a checkbox for selecting/deselecting a specific table row.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Table selectedRows={selected} onSelectionChange={setSelected}>
 *   <TableBody>
 *     {data.map(row => (
 *       <TableRow key={row.id}>
 *         <TableCell><TableRowSelect rowId={row.id} /></TableCell>
 *         <TableCell>{row.name}</TableCell>
 *       </TableRow>
 *     ))}
 *   </TableBody>
 * </Table>
 * ```
 * 
 * @remarks
 * - Supports `asChild` for custom wrapper elements
 * - Supports custom checkbox via renderCheckbox prop
 * - Must be used within a Table with selection enabled
 * - rowId must be unique for each row
 */
export const TableRowSelect = React.forwardRef<HTMLDivElement, TableRowSelectProps>(
    ({ rowId, renderCheckbox, className, asChild, children, ...props }, ref) => {
        const { isRowSelected, toggleRow } = useTableSelection();
        const checked = isRowSelected(rowId);

        const handleChange = React.useCallback(() => {
            toggleRow(rowId);
        }, [toggleRow, rowId]);

        const Comp = asChild ? Slot : 'div';

        const checkboxProps = {
            checked,
            onChange: handleChange,
        };

        const content = (children ?? (renderCheckbox ? (
            renderCheckbox(checkboxProps)
        ) : (
            <Checkbox
                checked={checked}
                onChange={handleChange}
                aria-label={`Select row ${rowId}`}
            />
        ))) as React.ReactElement | null;

        return (
            <Comp ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
                {content}
            </Comp>
        );
    }
);

TableRowSelect.displayName = 'TableRowSelect';
