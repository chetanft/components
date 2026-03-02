import React from 'react';
import { cn } from '../../../lib/utils';
import { TableCellText, CellTextType } from './TableCellText';
import { Icon, IconName } from '../../atoms/Icons';

export interface TableCellItemProps {
  text?: string;
  textType?: CellTextType;
  /**
   * Icon to display before the text.
   */
  leadingIcon?: IconName;
  /**
   * Icon to display after the text.
   */
  trailingIcon?: IconName;
  badge?: React.ReactNode;
  className?: string;
}

export const TableCellItem: React.FC<TableCellItemProps> = ({
  text,
  textType = 'primary',
  leadingIcon,
  trailingIcon,
  badge,
  className
}) => {
  return (
    <div
      className={cn(
        // Base layout from Figma: row with center alignment and x2 gap
        "flex items-center gap-[var(--spacing-x2)]",
        className
      )}
    >
      {/* Leading Icon */}
      {leadingIcon && (
        <Icon
          name={leadingIcon}
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

      {/* Trailing Icon */}
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          size={16}
          color="var(--color-primary)" // --color-dark-100 from Figma
        />
      )}
    </div>
  );
};
