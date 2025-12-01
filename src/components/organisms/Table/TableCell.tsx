"use client";
import React, { useState, useMemo } from 'react';
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
  
  // Determine background color based on state priority
  const getBackgroundClass = () => {
    if (state === 'selected' || showHoverState) {
      return "bg-[var(--border-secondary)]";
    }
    return backgroundColor === 'white' 
      ? "bg-[var(--bg-primary)]" 
      : "bg-[var(--bg-secondary)]";
  };

  // For single line variant, process children to replace newlines with spaces
  const processedChildren = useMemo(() => {
    if (lineVariant === 'single') {
      // Recursively process children to replace newlines
      const processNode = (node: React.ReactNode): React.ReactNode => {
        if (typeof node === 'string') {
          return node.replace(/\n/g, ' ');
        }
        if (React.isValidElement(node)) {
          // If it's a React element, process its children
          if (node.props?.children) {
            const processedChildren = React.Children.map(node.props.children, processNode);
            return React.cloneElement(node, { ...node.props, children: processedChildren });
          }
        }
        return node;
      };
      return React.Children.map(children, processNode);
    }
    return children;
  }, [children, lineVariant]);

  // Get horizontal padding based on size
  const getHorizontalPadding = () => {
    switch (size) {
      case 'md': return "px-[16px] pl-[8px]";
      case 'lg': return "px-[16px] pl-[8px]";
      case 'xl': return "px-[20px] pl-[8px]";
      default: return "px-[16px] pl-[8px]";
    }
  };

  return (
    <td
      className={cn(
        // Base styles
        "transition-colors duration-200 border-b border-[var(--border-primary)]",
        
        // Size variants - horizontal padding only (vertical padding via inline style)
        getHorizontalPadding(),
        
        // Background color
        getBackgroundClass(),
        
        // Selected state can have additional styling if needed
        state === 'selected' && "relative",
        
        // Vertical alignment
        "align-top",
        className
      )}
      style={{
        paddingTop: 'var(--table-cell-padding-y)',
        paddingBottom: 'var(--table-cell-padding-y)'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        // Line variant affects the layout direction
        lineVariant === 'single' 
          ? "flex items-center whitespace-nowrap" // Single line: horizontal layout, no wrapping
          : "flex flex-col justify-center", // Double line: vertical layout
        // Line variant affects the gap between child elements
        lineVariant === 'single' && "gap-[4px]",
        lineVariant === 'double' && "gap-[8px]",
        // Size affects min-height
        "min-h-[19px]"
      )}>
        {processedChildren}
      </div>
    </td>
  );
}; 
