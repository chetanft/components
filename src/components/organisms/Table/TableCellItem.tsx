import React from 'react';
import { cn } from '../../../lib/utils';
import { TableCellText, CellTextType } from './TableCellText';
import { Icon, IconName } from '../../atoms/Icons';

export interface TableCellItemProps {
  text?: string;
  textType?: CellTextType;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
  badge?: React.ReactNode;
  className?: string;
}

export const TableCellItem: React.FC<TableCellItemProps> = ({
  text,
  textType = 'primary',
  prefixIcon,
  suffixIcon,
  badge,
  className
}) => {
  return (
    <div
      className={cn(
        // Base layout from Figma: row with center alignment and 8px gap
        "flex items-center gap-[var(--spacing-x2)]",
        className
      )}
    >
      {/* Prefix Icon */}
      {prefixIcon && (
        <Icon 
          name={prefixIcon} 
          size={14} 
          color="var(--color-primary)" // --color-dark-100 from Figma
        />
      )}
      
      {/* Text Content */}
      {text && (
        <TableCellText type={textType}>
          {text}
        </TableCellText>
      )}
      
      {/* Badge */}
      {badge}
      
      {/* Suffix Icon */}
      {suffixIcon && (
        <Icon 
          name={suffixIcon} 
          size={16} 
          color="var(--color-primary)" // --color-dark-100 from Figma
        />
      )}
    </div>
  );
}; 
