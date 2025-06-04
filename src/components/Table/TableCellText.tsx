import React from 'react';
import { cn } from '../../lib/utils';

export type CellTextType = 'primary' | 'secondary';

export interface TableCellTextProps {
  type?: CellTextType;
  children: React.ReactNode;
  className?: string;
}

export const TableCellText: React.FC<TableCellTextProps> = ({
  type = 'primary',
  children,
  className
}) => {
  return (
    <div
      className={cn(
        // Base styles from Figma
        "text-[16px] font-normal font-inter leading-[1.4]",
        // Type-specific colors from Figma
        type === 'primary' && "text-[#434F64]", // --color-dark-100
        type === 'secondary' && "text-[#5F697B]", // --color-dark-50
        className
      )}
    >
      {children}
    </div>
  );
}; 