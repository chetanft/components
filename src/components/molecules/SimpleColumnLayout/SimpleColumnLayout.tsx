"use client";

import React from 'react';
import { Table } from '../../organisms/Table';
import type { TableColumn, TableRowData } from '../../organisms/Table';

export interface SimpleColumnCell {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'start' | 'end'; // Kept for backward compatibility but not used
}

export interface SimpleColumnRow {
  id?: string | number;
  left: SimpleColumnCell;
  right: SimpleColumnCell;
  /**
   * Force highlight regardless of stripe order
   */
  accent?: boolean; // Kept for backward compatibility but not used
}

export interface SimpleColumnLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  rows: SimpleColumnRow[];
  /**
   * Alternate row backgrounds to match Figma visual
   */
  striped?: boolean;
}

/**
 * SimpleColumnLayout Component
 * 
 * @deprecated This component is now a wrapper around Table with layout="simple".
 * Consider using Table directly with layout="simple" for better type safety and features.
 * 
 * This component is maintained for backward compatibility.
 */
export const SimpleColumnLayout = React.forwardRef<
  HTMLDivElement,
  SimpleColumnLayoutProps
>(
  (
    {
      headerLeft = 'Column header',
      headerRight = 'Column header',
      rows,
      striped = true,
      className,
      ...props
    },
    ref
  ) => {
    if (!rows?.length) {
      return null;
    }

    // Convert SimpleColumnRow format to Table format
    const tableData: TableRowData[] = rows.map((row, index) => {
      // Helper to convert ReactNode to string
      const nodeToString = (node: React.ReactNode): string => {
        if (node == null) return '';
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return String(node);
        if (typeof node === 'boolean') return '';
        // For React elements, try to extract text content
        if (React.isValidElement(node)) {
          if (typeof node.props?.children === 'string') {
            return node.props.children;
          }
          return String(node);
        }
        return String(node);
      };

      const leftTitle = nodeToString(row.left.title);
      const leftSubtitle = row.left.subtitle ? nodeToString(row.left.subtitle) : undefined;
      const leftValue = leftSubtitle 
        ? `${leftTitle}\n${leftSubtitle}`
        : leftTitle;
      
      const rightTitle = nodeToString(row.right.title);
      const rightSubtitle = row.right.subtitle ? nodeToString(row.right.subtitle) : undefined;
      const rightValue = rightSubtitle 
        ? `${rightTitle}\n${rightSubtitle}`
        : rightTitle;

      return {
        id: row.id ?? `row-${index}`,
        left: leftValue,
        right: rightValue,
      };
    });

    // Helper to convert ReactNode to string
    const nodeToString = (node: React.ReactNode): string => {
      if (node == null) return '';
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return String(node);
      if (typeof node === 'boolean') return '';
      // For React elements, try to extract text content
      if (React.isValidElement(node)) {
        if (typeof node.props?.children === 'string') {
          return node.props.children;
        }
        return String(node);
      }
      return String(node);
    };

    const columns: TableColumn[] = [
      { key: 'left', title: headerLeft ? nodeToString(headerLeft) : 'Label' },
      { key: 'right', title: headerRight ? nodeToString(headerRight) : 'Value' },
    ];

    return (
      <div ref={ref} className={className} {...props}>
        <Table
          columns={columns}
          data={tableData}
          layout="simple"
          headerLeft={headerLeft}
          headerRight={headerRight}
          striped={striped}
          className="border-0 rounded-none"
        />
      </div>
    );
  }
);

SimpleColumnLayout.displayName = 'SimpleColumnLayout';

export default SimpleColumnLayout;
