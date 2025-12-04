"use client";

import React, { createContext, useContext } from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

// Row context for gutter
interface RowContextValue {
  gutter: [number, number];
}

const RowContext = createContext<RowContextValue>({ gutter: [0, 0] });

// Breakpoints aligned with FT Design System
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// ==================== ROW COMPONENT ====================

export type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch';
export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';

export interface RowProps extends ComposableProps<'div'> {
  /** Horizontal and vertical gutter [horizontal, vertical] or single number */
  gutter?: number | [number, number];
  /** Vertical alignment */
  align?: RowAlign;
  /** Horizontal distribution */
  justify?: RowJustify;
  /** Allow wrapping */
  wrap?: boolean;
}

/**
 * Row component - Grid row container built with FT Design System tokens.
 * 
 * Uses:
 * - Spacing: var(--x1) to var(--x12) for gutters
 * - Flex layout for alignment
 */
export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({
    gutter = 0,
    align = 'top',
    justify = 'start',
    wrap = true,
    children,
    className,
    style,
    asChild,
    ...props
  }, ref) => {
    // Normalize gutter to [horizontal, vertical]
    const normalizedGutter: [number, number] = Array.isArray(gutter)
      ? gutter
      : [gutter, gutter];

    // Alignment mapping
    const alignMap: Record<RowAlign, string> = {
      top: 'items-start',
      middle: 'items-center',
      bottom: 'items-end',
      stretch: 'items-stretch',
    };

    // Justify mapping
    const justifyMap: Record<RowJustify, string> = {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      'space-around': 'justify-around',
      'space-between': 'justify-between',
      'space-evenly': 'justify-evenly',
    };

    // Calculate negative margins to offset column padding
    const rowStyle: React.CSSProperties = {
      ...style,
      marginLeft: normalizedGutter[0] > 0 ? `-${normalizedGutter[0] / 2}px` : undefined,
      marginRight: normalizedGutter[0] > 0 ? `-${normalizedGutter[0] / 2}px` : undefined,
      rowGap: normalizedGutter[1] > 0 ? `${normalizedGutter[1]}px` : undefined,
    };

    const Comp = asChild ? Slot : 'div';

    return (
      <RowContext.Provider value={{ gutter: normalizedGutter }}>
        <Comp
          ref={ref}
          className={cn(
            "flex",
            wrap ? "flex-wrap" : "flex-nowrap",
            alignMap[align],
            justifyMap[justify],
            className
          )}
          style={rowStyle}
          {...props}
        >
          {children}
        </Comp>
      </RowContext.Provider>
    );
  }
);

Row.displayName = 'Row';

// ==================== COL COMPONENT ====================

export interface ColSize {
  span?: number;
  offset?: number;
  order?: number;
  pull?: number;
  push?: number;
}

export interface ColProps extends ComposableProps<'div'> {
  /** Number of columns to span (1-24) */
  span?: number;
  /** Number of columns to offset from left */
  offset?: number;
  /** Flex order */
  order?: number;
  /** Move columns to left */
  pull?: number;
  /** Move columns to right */
  push?: number;
  /** Flex property */
  flex?: string | number;
  /** Responsive xs breakpoint */
  xs?: number | ColSize;
  /** Responsive sm breakpoint */
  sm?: number | ColSize;
  /** Responsive md breakpoint */
  md?: number | ColSize;
  /** Responsive lg breakpoint */
  lg?: number | ColSize;
  /** Responsive xl breakpoint */
  xl?: number | ColSize;
  /** Responsive xxl breakpoint */
  xxl?: number | ColSize;
}

/**
 * Col component - Grid column built with FT Design System tokens.
 * 
 * Uses 24-column grid system.
 */
export const Col = React.forwardRef<HTMLDivElement, ColProps>(
  ({
    span,
    offset,
    order,
    pull,
    push,
    flex,
    xs: _xs,
    sm: _sm,
    md: _md,
    lg: _lg,
    xl: _xl,
    xxl: _xxl,
    children,
    className,
    style,
    asChild,
    ...props
  }, ref) => {
    const { gutter } = useContext(RowContext);

    // Calculate column styles
    const colStyle: React.CSSProperties = {
      ...style,
      // Gutter padding
      paddingLeft: gutter[0] > 0 ? `${gutter[0] / 2}px` : undefined,
      paddingRight: gutter[0] > 0 ? `${gutter[0] / 2}px` : undefined,
      // Offset
      marginLeft: offset ? `${(offset / 24) * 100}%` : undefined,
      // Order
      order: order,
      // Push/Pull
      left: push ? `${(push / 24) * 100}%` : undefined,
      right: pull ? `${(pull / 24) * 100}%` : undefined,
      position: (push || pull) ? 'relative' : undefined,
      // Flex
      flex: flex !== undefined ? (typeof flex === 'number' ? `${flex} ${flex} auto` : flex) : undefined,
    };

    // Calculate width based on span
    const getWidthStyle = (): React.CSSProperties => {
      if (flex !== undefined) return {};
      
      if (span !== undefined) {
        if (span === 0) return { display: 'none' };
        return {
          flex: `0 0 ${(span / 24) * 100}%`,
          maxWidth: `${(span / 24) * 100}%`,
        };
      }

      // Default: flexible width
      return { flex: '1 1 0%' };
    };

    // Responsive styles (simplified - for full responsive, use media queries or CSS-in-JS)
    const getResponsiveStyles = (): React.CSSProperties => {
      // For now, return empty. In a real implementation, you'd generate
      // proper media query classes or use CSS variables
      return {};
    };

    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(
          "relative min-h-px",
          className
        )}
        style={{
          ...colStyle,
          ...getWidthStyle(),
          ...getResponsiveStyles(),
        }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Col.displayName = 'Col';

// ==================== GRID NAMESPACE ====================

export const Grid = {
  Row,
  Col,
};

export default Grid;
