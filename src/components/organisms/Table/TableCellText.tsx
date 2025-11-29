import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';

export type CellTextType = 'primary' | 'secondary';

export interface TableCellTextProps {
  type?: CellTextType;
  children: React.ReactNode;
  className?: string;
  singleLine?: boolean; // If true, join lines with space instead of splitting
}

export const TableCellText: React.FC<TableCellTextProps> = ({
  type = 'primary',
  children,
  className,
  singleLine = false
}) => {
  // Handle multi-line text
  const renderContent = () => {
    if (typeof children === 'string' && children.includes('\n')) {
      if (singleLine) {
        // Join lines with space for single-line display
        return children.replace(/\n/g, ' ');
      }
      // Split into multiple divs for multi-line display
      return children.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ));
    }
    return children;
  };

  return (
    <Typography
      variant="body-primary-regular"
      className={cn(
        // Type-specific colors from Figma
        type === 'primary' && "text-[var(--primary)]",
        type === 'secondary' && "text-[var(--secondary)]",
        className
      )}
    >
      {renderContent()}
    </Typography>
  );
}; 