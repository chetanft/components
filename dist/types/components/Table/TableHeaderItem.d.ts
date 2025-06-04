import React from 'react';
export type HeaderItemType = 'text' | 'checkbox';
export type HeaderColorVariant = 'dark25' | 'bg' | 'white';
export interface TableHeaderItemProps {
    type?: HeaderItemType;
    colorVariant?: HeaderColorVariant;
    sortable?: boolean;
    draggable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
    checkboxProps?: {
        checked?: boolean;
        indeterminate?: boolean;
        onChange?: () => void;
    };
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}
export declare const TableHeaderItem: React.FC<TableHeaderItemProps>;
//# sourceMappingURL=TableHeaderItem.d.ts.map