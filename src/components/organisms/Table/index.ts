export { Table } from './Table';
export type { 
  TableProps, 
  TableColumn, 
  TableRow as TableRowData,
  SortDirection, 
  ColumnType,
  TableVariant,
  TableLayout
} from './Table';

// Composable Table Components (Shadcn-compatible)
export { TableHeader } from './TableHeader';
export type { TableHeaderProps } from './TableHeader';

export { TableHead } from './TableHead';
export type { TableHeadProps } from './TableHead';

export { TableBody } from './TableBody';
export type { TableBodyProps } from './TableBody';

export { TableRow } from './TableRow';
export type { TableRowProps } from './TableRow';

// Atomic Table Components
export { TableCellText } from './TableCellText';
export type { TableCellTextProps, CellTextType } from './TableCellText';

export { TableCellItem } from './TableCellItem';
export type { TableCellItemProps } from './TableCellItem';

export { TableCell } from './TableCell';
export type { TableCellProps, CellBackgroundColor, CellLineVariant } from './TableCell';

export { TableHeaderItem } from './TableHeaderItem';
export type { TableHeaderItemProps, HeaderItemType, HeaderColorVariant } from './TableHeaderItem'; 