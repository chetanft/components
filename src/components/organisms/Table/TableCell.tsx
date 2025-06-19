import React, { useState } from 'react';
import { cn } from '../../../lib/utils';

export type CellBackgroundColor = 'white' | 'bg';
export type CellLineVariant = 'single' | 'double';
export type CellSize = 'md' | 'lg' | 'xl';
export type CellState = 'default' | 'hover' | 'selected';

export interface TableCellProps {
  backgroundColor?: CellBackgroundColor;
  lineVariant?: CellLineVariant;
  size?: CellSize;
  state?: CellState;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TableCell: React.FC<TableCellProps> = ({
  backgroundColor = 'white',
  lineVariant = 'single',
  size = 'md',
  state = 'default',
  children,
  className,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine if the cell should show hover state
  const showHoverState = state === 'hover' || (state === 'default' && isHovered);
  
  return (
    <td
      className={cn(
        // Base styles
        "transition-colors duration-200 border-b border-[#CED1D7]",
        
        // Size variants from Figma
        size === 'md' && "py-[20px] px-[20px] pl-[8px]",
        size === 'lg' && "py-[20px] px-[16px] pl-[8px]",
        size === 'xl' && "py-[32px] px-[20px] pl-[8px]",
        
        // Background colors based on state
        (state === 'default' && !isHovered) && (
          backgroundColor === 'white' ? "bg-[#FFFFFF]" : "bg-[#F8F8F9]"
        ),
        (showHoverState || state === 'selected') && "bg-[#F0F1F7]",
        
        // Selected state can have additional styling if needed
        state === 'selected' && "relative",
        
        // Vertical alignment
        "align-top",
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        "flex flex-col justify-center",
        // Line variant affects the layout of child elements
        lineVariant === 'single' && "gap-[4px]",
        lineVariant === 'double' && "gap-[8px]",
        // Size affects min-height
        "min-h-[19px]"
      )}>
        {children}
      </div>
    </td>
  );
}; 