"use client";

import React, { createContext, useContext } from 'react';
import type { DropdownOption } from '../../molecules/Dropdown/Dropdown';
import type { DataEntryCellType, DataEntryCellState, ActionConfig } from './DataEntryTableCell';

export interface DataEntryTableContextType {
  // Selection state
  selectable: boolean;
  selectedRows: (string | number)[];
  onSelectionChange?: (selectedRows: (string | number)[]) => void;
  
  // Cell state
  focusedCell: { rowId: string | number; columnKey: string } | null;
  hoveredCell: { rowId: string | number; columnKey: string } | null;
  setFocusedCell: (cell: { rowId: string | number; columnKey: string } | null) => void;
  setHoveredCell: (cell: { rowId: string | number; columnKey: string } | null) => void;
  
  // Cell change handlers
  onCellChange?: (rowId: string | number, columnKey: string, value: string | number) => void;
  
  // Row actions
  onRowAdd?: () => void;
  onRowDelete?: (rowId: string | number) => void;
  
  // Column resizing
  resizable: boolean;
  columnWidths: Record<string, number>;
  resizingColumn: string | null;
  handleMouseDown: (columnKey: string, e: React.MouseEvent) => void;
  
  // Context menu
  showContextMenu: boolean;
  contextMenu: {
    position: { x: number; y: number };
    options: Array<{ label: string; onClick: () => void }>;
  } | null;
  setContextMenu: (menu: {
    position: { x: number; y: number };
    options: Array<{ label: string; onClick: () => void }>;
  } | null) => void;
  
  // Errors
  cellErrors: Record<string, Record<string, string>>;
}

const DataEntryTableContext = createContext<DataEntryTableContextType | null>(null);

export const useDataEntryTableContext = () => {
  const context = useContext(DataEntryTableContext);
  if (!context) {
    throw new Error('DataEntryTable sub-components must be used within a DataEntryTable component');
  }
  return context;
};

export interface DataEntryTableProviderProps {
  value: DataEntryTableContextType;
  children: React.ReactNode;
}

export const DataEntryTableProvider: React.FC<DataEntryTableProviderProps> = ({ value, children }) => {
  return (
    <DataEntryTableContext.Provider value={value}>
      {children}
    </DataEntryTableContext.Provider>
  );
};

