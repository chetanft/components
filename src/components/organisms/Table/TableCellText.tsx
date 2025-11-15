import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';

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
  // Handle multi-line text
  const renderContent = () => {
    if (typeof children === 'string' && children.includes('\n')) {
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