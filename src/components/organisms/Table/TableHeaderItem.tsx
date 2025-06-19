import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);

  // Color mappings from Figma - exact specifications
  const getBackgroundColor = () => {
    switch (colorVariant) {
      case 'dark25': return 'bg-[#838C9D]'; // Primary variant header
      case 'bg': return 'bg-[#F8F8F9]'; // Secondary variant header  
      case 'white': return 'bg-[#FFFFFF]';
      default: return 'bg-[#838C9D]';
    }
  };

  const getTextColor = () => {
    switch (colorVariant) {
      case 'dark25': return 'text-[#FFFFFF]'; // White text on dark header
      case 'bg': return 'text-[#5F697B]'; // Dark text on light header
      case 'white': return 'text-[#5F697B]';
      default: return 'text-[#FFFFFF]';
    }
  };

  const getBorderStyles = () => {
    switch (colorVariant) {
      case 'dark25': return ''; // No border for primary dark header
      case 'bg': return 'border border-[#F0F1F7]'; // Light border for secondary
      case 'white': return 'border border-[#F0F1F7]';
      default: return '';
    }
  };

  const getIconColor = () => {
    return colorVariant === 'dark25' ? '#FFFFFF' : '#5F697B';
  };

  // Size-based padding from Figma design
  const getPadding = () => {
    if (type === 'checkbox') {
      return "py-[15px] px-[20px] pl-[8px]"; // Checkbox columns have consistent padding
    }
    
    switch (size) {
      case 'md': return "py-[15px] px-[20px] pl-[8px]";
      case 'lg': return "py-[15px] px-[16px] pl-[8px]";
      case 'xl': return "py-[15px] px-[20px] pl-[8px]";
      default: return "py-[15px] px-[20px] pl-[8px]";
    }
  };

  return (
    <th
      className={cn(
        // Base styles from Figma
        "h-[50px] text-left transition-colors", // Fixed height from Figma
        // Size-based padding
        getPadding(),
        getBackgroundColor(),
        getBorderStyles(),
        // Cursor for interactive elements
        (sortable || onClick) && "cursor-pointer hover:opacity-80 transition-opacity",
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "flex items-center h-full",
        // Center checkbox in its column to match data row alignment
        type === 'checkbox' ? "justify-center" : "justify-start"
      )}>
        {/* Drag Handle */}
        {draggable && (
          <div className="flex flex-col gap-[2px] w-[8px] h-[8px] mr-[10px]">
            <div className={cn("w-full h-[1px]", colorVariant === 'dark25' ? "bg-[#FFFFFF]" : "bg-[#5F697B]")} />
            <div className={cn("w-full h-[1px]", colorVariant === 'dark25' ? "bg-[#FFFFFF]" : "bg-[#5F697B]")} />
            <div className={cn("w-full h-[1px]", colorVariant === 'dark25' ? "bg-[#FFFFFF]" : "bg-[#5F697B]")} />
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
          <div className="flex items-center gap-[6px]">
            <span
              className={cn(
                // Typography from Figma
                size === 'md' ? "text-[14px]" : "text-[16px]",
                "font-semibold font-inter leading-[1.21]",
                getTextColor()
              )}
            >
              {children}
            </span>
            
            {/* Sort Indicators - Inline with text for better alignment */}
            {sortable && (
              <div className="flex flex-col items-center justify-center w-[10px] h-[14px]">
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