import React from 'react';
export type CellBackgroundColor = 'white' | 'bg';
export type CellBorderStyle = 'single' | 'double';
export interface TableCellProps {
    backgroundColor?: CellBackgroundColor;
    borderStyle?: CellBorderStyle;
    children: React.ReactNode;
    className?: string;
}
export declare const TableCell: React.FC<TableCellProps>;
//# sourceMappingURL=TableCell.d.ts.map