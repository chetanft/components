import React from 'react';
export type SortDirection = 'asc' | 'desc' | null;
export type ColumnType = 'text' | 'number' | 'date' | 'actions';
export type TableVariant = 'primary' | 'secondary';
export interface TableColumn<T = any> {
    key: string;
    title: string;
    type?: ColumnType;
    sortable?: boolean;
    width?: string;
    render?: (value: any, row: T, index: number) => React.ReactNode;
}
export interface TableRow {
    id: string | number;
    [key: string]: any;
}
export interface TableProps<T extends TableRow = TableRow> {
    columns: TableColumn<T>[];
    data: T[];
    variant?: TableVariant;
    selectable?: boolean;
    selectedRows?: (string | number)[];
    onSelectionChange?: (selectedRows: (string | number)[]) => void;
    onSort?: (column: string, direction: SortDirection) => void;
    sortColumn?: string;
    sortDirection?: SortDirection;
    pagination?: {
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        onPageChange: (page: number) => void;
    };
    loading?: boolean;
    emptyMessage?: string;
    className?: string;
}
export declare const Table: {
    <T extends TableRow = TableRow>({ columns, data, variant, selectable, selectedRows, onSelectionChange, onSort, sortColumn, sortDirection, pagination, loading, emptyMessage, className }: TableProps<T>): import("react/jsx-runtime").JSX.Element | null;
    displayName: string;
};
//# sourceMappingURL=Table.d.ts.map