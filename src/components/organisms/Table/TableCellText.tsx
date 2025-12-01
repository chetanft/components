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
  const isMultiLine = typeof children === 'string' && children.includes('\n') && !singleLine;
  
  if (isMultiLine) {
    // Split into multiple Typography components for multi-line display
    // First line uses primary color, second line uses secondary color
    return (
      <>
        {children.split('\n').map((line, index) => (
          <Typography
            key={index}
            variant="body-primary-regular"
            className={cn(
              index === 0 ? "text-[var(--primary)]" : "text-[var(--secondary)]"
            )}
          >
            {line}
          </Typography>
        ))}
      </>
    );
  }

  // Single line or non-string content
  const content = typeof children === 'string' && children.includes('\n') && singleLine
    ? children.replace(/\n/g, ' ')
    : children;

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
      {content}
    </Typography>
  );
}; 