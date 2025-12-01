import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';

export type HeaderItemType = 'text' | 'checkbox';
export type HeaderColorVariant = 'dark25' | 'bg' | 'white';
export type HeaderSize = 'md' | 'lg' | 'xl';

export interface TableHeaderItemProps {
  type?: HeaderItemType;
  colorVariant?: HeaderColorVariant;
  size?: HeaderSize;
  sortable?: boolean;
  draggable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  checkboxProps?: {
    checked?: boolean;
    indeterminate?: boolean;
    onChange?: () => void;
  };
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const TableHeaderItem: React.FC<TableHeaderItemProps> = ({
  type = 'text',
  colorVariant = 'dark25',
  size = 'md',
  sortable = false,
  draggable = false,
  sortDirection = null,
  checkboxProps,
  children,
  onClick,
  className
}) => {
  // Color mappings from Figma - use CSS variables instead of hardcoded
  const getBackgroundColor = () => {
    switch (colorVariant) {
      case 'dark25': return 'bg-[var(--tertiary)]'; // Primary variant header
      case 'bg': return 'bg-[var(--bg-secondary)]'; // Secondary variant header  
      case 'white': return 'bg-[var(--bg-primary)]';
      default: return 'bg-[var(--tertiary)]';
    }
  };

  const getTextColorStyle = () => {
    switch (colorVariant) {
      case 'dark25': return { color: 'var(--bg-primary)' }; // White text on tertiary background (Primary variant)
      case 'bg': return { color: 'var(--secondary)' }; // Dark text on light header (Secondary variant)
      case 'white': return { color: 'var(--secondary)' };
      default: return { color: 'var(--bg-primary)' };
    }
  };

  const getBorderStyles = () => {
    switch (colorVariant) {
      case 'dark25': return ''; // No border for primary dark header
      case 'bg': return 'border border-[var(--border-secondary)]'; // Light border for secondary
      case 'white': return 'border border-[var(--border-secondary)]';
      default: return '';
    }
  };

  const getIconColor = () => {
    return colorVariant === 'dark25' ? 'var(--bg-primary)' : 'var(--secondary)';
  };

  // Size-based padding from Figma design - compact for better alignment
  const getPadding = () => {
    if (type === 'checkbox') {
      return "py-[var(--spacing-x3)] px-[var(--spacing-x4)] pl-[var(--spacing-x2)]"; // Checkbox columns have consistent padding
    }

    switch (size) {
      case 'md': return "py-[var(--spacing-x3)] px-[var(--spacing-x4)] pl-[var(--spacing-x2)]";
      case 'lg': return "py-[var(--spacing-x4)] px-[var(--spacing-x4)] pl-[var(--spacing-x2)]";
      case 'xl': return "py-[var(--spacing-x5)] px-[var(--spacing-x5)] pl-[var(--spacing-x2)]";
      default: return "py-[var(--spacing-x3)] px-[var(--spacing-x4)] pl-[var(--spacing-x2)]";
    }
  };

  const getAriaSort = (): 'ascending' | 'descending' | 'none' | undefined => {
    if (!sortable) return undefined;
    if (sortDirection === 'asc') return 'ascending';
    if (sortDirection === 'desc') return 'descending';
    return 'none';
  };

  return (
    <th
      className={cn(
        // Base styles from Figma - Responsive height: 40px default, 48px for >= 1440px
        "text-left transition-colors box-border",
        // Size-based padding
        getPadding(),
        getBackgroundColor(),
        getBorderStyles(),
        // Cursor for interactive elements
        (sortable || onClick) && "cursor-pointer hover:opacity-80 transition-opacity",
        className
      )}
      style={{ height: 'var(--table-header-height)', minHeight: 'var(--table-header-height)', maxHeight: 'var(--table-header-height)' }}
      onClick={onClick}
      aria-sort={getAriaSort()}
    >
      <div className={cn(
        "flex items-center h-full",
        // Center checkbox in its column to match data row alignment
        type === 'checkbox' ? "justify-center" : "justify-start"
      )}>
        {/* Drag Handle */}
        {draggable && (
          <div className="flex flex-col gap-[calc(var(--spacing-x1)/2)] w-[var(--spacing-x2)] h-[var(--spacing-x2)] mr-[calc(var(--spacing-x2)+var(--spacing-x1)/2)]">
            <div className={cn("w-full h-[calc(var(--spacing-x1)/4)]", colorVariant === 'dark25' ? "bg-[var(--bg-primary)]" : "bg-[var(--secondary)]")} />
            <div className={cn("w-full h-[calc(var(--spacing-x1)/4)]", colorVariant === 'dark25' ? "bg-[var(--bg-primary)]" : "bg-[var(--secondary)]")} />
            <div className={cn("w-full h-[calc(var(--spacing-x1)/4)]", colorVariant === 'dark25' ? "bg-[var(--bg-primary)]" : "bg-[var(--secondary)]")} />
          </div>
        )}

        {/* Checkbox Type - Perfectly centered to align with data rows */}
        {type === 'checkbox' && (
          <div className="flex items-center justify-center w-full">
            <Checkbox
              {...checkboxProps}
              size="md"
            />
          </div>
        )}

        {/* Text Type - Inline sort indicators aligned with text */}
        {type === 'text' && (
          <div className="flex items-center gap-[calc(var(--spacing-x2)-var(--spacing-x1)/2)]">
            <span
              className={cn(
                // Typography from Figma - 14px/16px semibold
                size === 'md' ? "text-[var(--font-size-sm)]" : "text-[var(--font-size-md)]",
                "font-semibold leading-[1.4] whitespace-nowrap"
              )}
              style={getTextColorStyle()}
            >
              {children}
            </span>

            {/* Sort Indicators - Inline with text for better alignment */}
            {sortable && (
              <div className="flex flex-col items-center justify-center w-[calc(var(--spacing-x2)+var(--spacing-x1)/2)] h-[calc(var(--spacing-x2)+var(--spacing-x1)+var(--spacing-x1)/2)]">
                <Icon
                  name="chevron-up"
                  size={8}
                  color={sortDirection === 'asc' ? getIconColor() : `${getIconColor()}40`}
                />
                <Icon
                  name="chevron-down"
                  size={8}
                  color={sortDirection === 'desc' ? getIconColor() : `${getIconColor()}40`}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </th>
  );
}; 
