import React from 'react';
import { cn } from '../../../lib/utils';
import { TableCellText, CellTextType } from './TableCellText';
import { Icon, IconName } from '../../atoms/Icons';

export interface TableCellItemProps {
  text?: string;
  textType?: CellTextType;
  /**
   * Icon to display before the text.
   * Replaces `prefixIcon`.
   */
  leadingIcon?: IconName;
  /**
   * Icon to display after the text.
   * Replaces `suffixIcon`.
   */
  trailingIcon?: IconName;
  /**
   * @deprecated Use `leadingIcon` instead.
   */
  prefixIcon?: IconName;
  /**
   * @deprecated Use `trailingIcon` instead.
   */
  suffixIcon?: IconName;
  badge?: React.ReactNode;
  className?: string;
}

export const TableCellItem: React.FC<TableCellItemProps> = ({
  text,
  textType = 'primary',
  leadingIcon,
  trailingIcon,
  prefixIcon,
  suffixIcon,
  badge,
  className
}) => {
  const finalLeadingIcon = leadingIcon || prefixIcon;
  const finalTrailingIcon = trailingIcon || suffixIcon;

  return (
    <div
      className={cn(
        // Base layout from Figma: row with center alignment and 8px gap
        "flex items-center gap-[var(--spacing-x2)]",
        className
      )}
    >
      {/* Leading Icon */}
      {finalLeadingIcon && (
        <Icon
          name={finalLeadingIcon}
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
      {finalTrailingIcon && (
        <Icon
          name={finalTrailingIcon}
          size={16}
          color="var(--color-primary)" // --color-dark-100 from Figma
        />
      )}
    </div>
  );
};
