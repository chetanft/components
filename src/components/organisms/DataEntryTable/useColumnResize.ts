"use client";

import { useState, useCallback, useRef, useEffect } from 'react';

export interface ColumnResizeState {
  [key: string]: number;
}

export interface UseColumnResizeOptions {
  defaultWidths?: ColumnResizeState;
  minWidth?: number;
  onResize?: (columnKey: string, width: number) => void;
}

export const useColumnResize = (options: UseColumnResizeOptions = {}) => {
  const { defaultWidths = {}, minWidth = 100, onResize } = options;
  const [columnWidths, setColumnWidths] = useState<ColumnResizeState>(defaultWidths);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const resizeStartXRef = useRef(0);
  const resizeStartWidthRef = useRef(0);
  const resizingColumnRef = useRef<string | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const handleMouseDown = useCallback((columnKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Find the actual header cell element (th) that contains the column
    // The resize handle is a <th> element, and the column header is the previous sibling <th>
    const resizeHandle = e.currentTarget as HTMLElement;
    const headerCell = resizeHandle.previousElementSibling as HTMLElement;
    
    if (!headerCell) {
      // Fallback: try to find the header cell by traversing up
      const tableRow = resizeHandle.closest('tr');
      if (tableRow) {
        const cells = Array.from(tableRow.querySelectorAll('th'));
        const resizeHandleIndex = cells.indexOf(resizeHandle);
        if (resizeHandleIndex > 0) {
          const prevCell = cells[resizeHandleIndex - 1] as HTMLElement;
          if (prevCell) {
            const currentWidth = prevCell.getBoundingClientRect().width;
            resizeStartXRef.current = e.clientX;
            resizeStartWidthRef.current = currentWidth;
            resizingColumnRef.current = columnKey;
            setResizingColumn(columnKey);
            return;
          }
        }
      }
      return;
    }

    const currentWidth = headerCell.getBoundingClientRect().width;
    resizeStartXRef.current = e.clientX;
    resizeStartWidthRef.current = currentWidth;
    resizingColumnRef.current = columnKey;
    setResizingColumn(columnKey);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!resizingColumnRef.current) return;

    const deltaX = e.clientX - resizeStartXRef.current;
    const newWidth = Math.max(minWidth, resizeStartWidthRef.current + deltaX);
    
    setColumnWidths(prev => ({
      ...prev,
      [resizingColumnRef.current!]: newWidth,
    }));

    onResize?.(resizingColumnRef.current, newWidth);
  }, [minWidth, onResize]);

  const handleMouseUp = useCallback(() => {
    resizingColumnRef.current = null;
    setResizingColumn(null);
  }, []);

  useEffect(() => {
    if (resizingColumn) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Prevent text selection while resizing
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      };
    }
  }, [resizingColumn, handleMouseMove, handleMouseUp]);

  const getColumnWidth = useCallback((columnKey: string, defaultWidth?: string): string => {
    if (columnWidths[columnKey]) {
      return `${columnWidths[columnKey]}px`;
    }
    return defaultWidth || 'auto';
  }, [columnWidths]);

  return {
    columnWidths,
    resizingColumn,
    handleMouseDown,
    getColumnWidth,
    setColumnWidths,
  };
};

