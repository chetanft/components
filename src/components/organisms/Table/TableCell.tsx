"use client";
import React, { useState, useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export type CellBackgroundColor = 'white' | 'bg';
export type CellLineVariant = 'single' | 'double';
export type CellSize = 'md' | 'lg' | 'xl';
export type CellState = 'default' | 'hover' | 'selected';
export type CellType = 'text' | 'checkbox';

/**
 * TableCell component props
 * 
 * @public
 */
export interface TableCellProps extends Omit<ComposableProps<'td'>, 'children'> {
  /**
   * Cell content
   */
  children: React.ReactNode;
  
  /**
   * Background color variant
   * @default 'white'
   */
  backgroundColor?: CellBackgroundColor;
  
  /**
   * Line variant (single or double line layout)
   * @default 'single'
   */
  lineVariant?: CellLineVariant;
  
  /**
   * Cell size
   * @default 'md'
   */
  size?: CellSize;
  
  /**
   * Cell state (affects styling)
   * @default 'default'
   */
  state?: CellState;
  
  /**
   * Cell type
   * @default 'text'
   */
  type?: CellType;
  
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * TableCell Component
 * 
 * A composable table cell component that wraps the `<td>` element.
 * Used within TableRow to create data cells in the table body.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <TableRow>
 *   <TableCell>John Doe</TableCell>
 *   <TableCell>
 *     <Badge variant="success">Active</Badge>
 *   </TableCell>
 *   <TableCell className="text-right font-semibold">
 *     $1,234.56
 *   </TableCell>
 * </TableRow>
 * ```
 * 
 * @remarks
 * - Wraps the HTML `<td>` element
 * - Supports `asChild` prop for custom element composition
 * - Automatically handles hover states and background colors
 * - Supports single-line and double-line layouts
 * - Use with TableRow for proper table structure
 * - Accessible: maintains proper cell semantics
 */
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({
  backgroundColor = 'white',
  lineVariant = 'single',
  size = 'md',
  state = 'default',
  type = 'text',
  children,
  className,
  onClick,
  asChild,
  ...props
}, ref) => {
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

  // Get horizontal padding based on size and type
  const getHorizontalPadding = () => {
    // Checkbox columns use equal padding on both sides since checkbox is centered
    if (type === 'checkbox') {
      return "px-[var(--spacing-x4)]"; // Equal padding for centered checkbox
    }

    switch (size) {
      case 'md': return "pl-[var(--spacing-x2)] pr-[var(--spacing-x4)]"; // 8px left, 16px right
      case 'lg': return "pl-[var(--spacing-x2)] pr-[var(--spacing-x4)]"; // 8px left, 16px right
      case 'xl': return "pl-[var(--spacing-x2)] pr-[var(--spacing-x5)]"; // 8px left, 24px right
      default: return "pl-[var(--spacing-x2)] pr-[var(--spacing-x4)]"; // 8px left, 16px right
    }
  };

  if (asChild) {
    const Comp = Slot;
    return (
      <Comp
        ref={ref}
        className={cn(className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <td
      ref={ref}
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
          ? "flex items-center whitespace-nowrap min-w-0" // Single line: horizontal layout, no wrapping, allow truncation
          : "flex flex-col justify-center", // Double line: vertical layout
        // Line variant affects the gap between child elements
        lineVariant === 'single' && "gap-[var(--spacing-x1)]",
        lineVariant === 'double' && "gap-[var(--spacing-x2)]",
        // Size affects min-height
        "min-h-[19px]"
      )}>
        {processedChildren}
      </div>
    </td>
  );
});

TableCell.displayName = 'TableCell'; 
