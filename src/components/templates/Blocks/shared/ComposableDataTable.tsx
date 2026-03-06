"use client";

import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../../organisms/Table';
import type { TableColumn, TableRowData } from '../../../organisms/Table';

export function ComposableDataTable<T extends TableRowData>({
  columns,
  data,
}: {
  columns: TableColumn<T>[];
  data: T[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={String(column.key)}>
              {String((column as { title?: string; label?: string; header?: string }).title ?? (column as { label?: string }).label ?? (column as { header?: string }).header ?? column.key)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={String(row.id)}>
            {columns.map((column) => (
              <TableCell key={`${String(row.id)}-${String(column.key)}`}>
                {column.render
                  ? column.render((row as Record<string, unknown>)[String(column.key)], row, rowIndex)
                  : String((row as Record<string, unknown>)[String(column.key)] ?? '')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
