import React from 'react';
import { cn } from '../../lib/utils';

export type CellBackgroundColor = 'white' | 'bg';
export type CellBorderStyle = 'single' | 'double';

export interface TableCellProps {
  backgroundColor?: CellBackgroundColor;
  borderStyle?: CellBorderStyle;
  children: React.ReactNode;
  className?: string;
}

export const TableCell: React.FC<TableCellProps> = ({
  backgroundColor = 'white',
  borderStyle = 'single',
  children,
  className
}) => {
  return (
    <td
      className={cn(
        // Base padding from Figma: 32px 20px 32px 8px for data cells
        "py-[32px] px-[20px] pl-[8px]",
        // Background colors from Figma - exact hex values
        backgroundColor === 'white' && "bg-[#FFFFFF]", // White background
        backgroundColor === 'bg' && "bg-[#F8F8F9]", // Light gray background
        // Border styles from Figma: #CED1D7 border color
        borderStyle === 'single' && "border-b border-[#CED1D7]",
        borderStyle === 'double' && "border-b-2 border-[#CED1D7]",
        // Vertical alignment
        "align-top",
        className
      )}
    >
      <div className="flex flex-col justify-center gap-[8px] min-h-[19px]">
        {children}
      </div>
    </td>
  );
}; 