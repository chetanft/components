import React from 'react';
import { CellTextType } from './TableCellText';
import { IconName } from '../Icons';
export interface TableCellItemProps {
    text?: string;
    textType?: CellTextType;
    prefixIcon?: IconName;
    suffixIcon?: IconName;
    badge?: React.ReactNode;
    className?: string;
}
export declare const TableCellItem: React.FC<TableCellItemProps>;
//# sourceMappingURL=TableCellItem.d.ts.map