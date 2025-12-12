"use client";

import React from 'react';

export interface TableSelectionContextValue {
    selectedRows: (string | number)[];
    allRowIds: (string | number)[];
    onSelectionChange?: (ids: (string | number)[]) => void;
    isRowSelected: (id: string | number) => boolean;
    toggleRow: (id: string | number) => void;
    toggleAll: () => void;
    isAllSelected: boolean;
    isSomeSelected: boolean;
}

const TableSelectionContext = React.createContext<TableSelectionContextValue | null>(null);

/**
 * Default values for when sub-components are used outside of a Table with selection.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: TableSelectionContextValue = {
    selectedRows: [],
    allRowIds: [],
    onSelectionChange: undefined,
    isRowSelected: () => false,
    toggleRow: () => {},
    toggleAll: () => {},
    isAllSelected: false,
    isSomeSelected: false,
};

/**
 * Hook to access Table selection context
 */
export const useTableSelection = () => {
    const context = React.useContext(TableSelectionContext);
    
    if (!context) {
        return defaultContext;
    }
    return context;
};

/**
 * Optional hook that returns null if outside context
 */
export const useTableSelectionOptional = () => {
    return React.useContext(TableSelectionContext);
};

export interface TableSelectionProviderProps {
    children: React.ReactNode;
    selectedRows?: (string | number)[];
    onSelectionChange?: (ids: (string | number)[]) => void;
    allRowIds: (string | number)[];
}

/**
 * TableSelectionProvider - Context provider for table row selection
 * 
 * Manages selection state for composable table selection components.
 */
export const TableSelectionProvider: React.FC<TableSelectionProviderProps> = ({
    children,
    selectedRows = [],
    onSelectionChange,
    allRowIds,
}) => {
    const isRowSelected = React.useCallback(
        (id: string | number) => selectedRows.includes(id),
        [selectedRows]
    );

    const toggleRow = React.useCallback(
        (id: string | number) => {
            const newSelection = isRowSelected(id)
                ? selectedRows.filter(r => r !== id)
                : [...selectedRows, id];
            onSelectionChange?.(newSelection);
        },
        [selectedRows, isRowSelected, onSelectionChange]
    );

    const toggleAll = React.useCallback(() => {
        const newSelection = selectedRows.length === allRowIds.length ? [] : [...allRowIds];
        onSelectionChange?.(newSelection);
    }, [selectedRows.length, allRowIds, onSelectionChange]);

    const value: TableSelectionContextValue = React.useMemo(() => ({
        selectedRows,
        allRowIds,
        onSelectionChange,
        isRowSelected,
        toggleRow,
        toggleAll,
        isAllSelected: selectedRows.length === allRowIds.length && allRowIds.length > 0,
        isSomeSelected: selectedRows.length > 0 && selectedRows.length < allRowIds.length,
    }), [selectedRows, allRowIds, onSelectionChange, isRowSelected, toggleRow, toggleAll]);

    return (
        <TableSelectionContext.Provider value={value}>
            {children}
        </TableSelectionContext.Provider>
    );
};

TableSelectionProvider.displayName = 'TableSelectionProvider';
