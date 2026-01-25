"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

const DEFAULT_COLORS = ['#ffb3c3', '#ff809a', '#ff6384'];

export interface StackedBarSegment {
  label: string;
  value: number;
  color?: string;
}

export interface StackedBarData {
  label: string;
  segments: StackedBarSegment[];
}

export interface StackedBarLegendItem {
  label: string;
  color: string;
}

export interface StackedBarChartProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Chart data (for declarative API)
   * @deprecated Use StackedBarChartBar components as children instead
   */
  data?: StackedBarData[];
  title?: string;
  legend?: StackedBarLegendItem[];
  /**
   * Force the maximum value used for scaling (defaults to the largest bar sum)
   */
  maxValue?: number;
  /**
   * Explicit chart height in pixels (default taken from Figma)
   */
  barHeight?: number;
  /**
   * Default color palette for segments without explicit colors
   * @default ['#ffb3c3', '#ff809a', '#ff6384']
   */
  defaultColors?: string[];
  /**
   * Chart bars (for composable API)
   */
  children?: React.ReactNode;
}

export interface StackedBarChartBarComponentProps {
  /**
   * Bar label (required)
   */
  label: string;
  /**
   * Bar segments (for composable API)
   */
  children?: React.ReactNode;
}

export interface StackedBarChartSegmentComponentProps {
  /**
   * Segment label (required)
   */
  label: string;
  /**
   * Segment value (required)
   */
  value: number;
  /**
   * Children (for composition, not rendered)
   */
  children?: React.ReactNode;
  /**
   * Segment color
   */
  color?: string;
}

const buildLegendFromData = (data: StackedBarData[], defaultColors: string[]): StackedBarLegendItem[] => {
  const legendMap = new Map<string, string>();

  data.forEach((bar) => {
    bar.segments.forEach((segment, index) => {
      if (!segment.label || legendMap.has(segment.label)) {
        return;
      }

      const fallbackColor =
        segment.color ?? defaultColors[index % defaultColors.length];

      legendMap.set(segment.label, fallbackColor);
    });
  });

  return Array.from(legendMap.entries()).map(([label, color]) => ({
    label,
    color,
  }));
};

// Helper function to extract data from children
const extractDataFromChildren = (children: React.ReactNode): StackedBarData[] => {
  return React.Children.toArray(children)
    .filter((child): child is React.ReactElement<StackedBarChartBarComponentProps> => 
      React.isValidElement(child) && child.type === StackedBarChartBar
    )
    .map(child => {
      const segmentChildren = React.Children.toArray(child.props.children)
        .filter((c): c is React.ReactElement<StackedBarChartSegmentComponentProps> => 
          React.isValidElement(c) && c.type === StackedBarChartSegment
        );
      
      return {
        label: child.props.label,
        segments: segmentChildren.map(seg => ({
          label: seg.props.label,
          value: seg.props.value,
          color: seg.props.color,
        })),
      };
    });
};

export const StackedBarChart = React.forwardRef(
  (
    {
      data,
      title = 'AGEING',
      legend,
      maxValue,
      barHeight = 172,
      defaultColors = DEFAULT_COLORS,
      className,
      children,
      ...props
    }: StackedBarChartProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    // Extract data from children if using composable API
    const dataFromChildren = React.useMemo(() => {
      if (!children) return [];
      return extractDataFromChildren(children);
    }, [children]);

    // Use children data if available, otherwise use data prop
    const allData = dataFromChildren.length > 0 ? dataFromChildren : (data || []);

    // Check if using composable API
    const hasComposableChildren = React.Children.count(children) > 0 && dataFromChildren.length > 0;

    // Show deprecation warning
    if (process.env.NODE_ENV !== 'production') {
      if (hasComposableChildren && data && data.length > 0) {
        console.warn(
          'StackedBarChart: Using deprecated props (data array) with composable API. ' +
          'Please use StackedBarChartBar components as children instead. ' +
          'See migration guide: docs/migrations/composable-migration.md'
        );
      } else if (!hasComposableChildren && data && data.length > 0) {
        console.warn(
          'StackedBarChart: Declarative API (data array prop) is deprecated. ' +
          'Please migrate to composable API using StackedBarChartBar components as children. ' +
          'See migration guide: docs/migrations/composable-migration.md'
        );
      }
    }

    if (!allData.length) {
      return null;
    }

    const computedMax =
      maxValue ??
      (Math.max(
        ...allData.map((bar) =>
          bar.segments.reduce((sum, segment) => sum + (segment.value || 0), 0)
        )
      ) || 1);

    const resolvedLegend = legend ?? buildLegendFromData(allData, defaultColors);

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full flex-col gap-[var(--x3,12px)] text-left',
          className
        )}
        {...props}
      >
        {title && (
          <span className="text-xs-rem font-semibold tracking-[0.08em] text-[var(--secondary)]">
            {/* 12px → 0.857rem (responsive) */}
            {title}
          </span>
        )}

        <div className="flex gap-[var(--x5,20px)]" role="img" aria-label={title}>
          {allData.map((bar, barIndex) => (
            <div
              key={`${bar.label}-${barIndex}`}
              className="flex flex-1 min-w-0 flex-col items-center gap-[var(--x2,8px)]"
            >
              <div
                className="flex w-full flex-col justify-end rounded-[6px]"
                style={{ height: barHeight }}
              >
                {bar.segments.map((segment, segmentIndex) => {
                  const color =
                    segment.color ??
                    defaultColors[segmentIndex % defaultColors.length];
                  const height = Math.max(
                    0,
                    (segment.value / computedMax) * 100
                  );

                  return (
                    <div
                      key={`${bar.label}-${segment.label}-${segmentIndex}`}
                      className="w-full"
                      style={{ height: `${height}%`, backgroundColor: color }}
                      aria-label={`${segment.label}: ${segment.value}`}
                    />
                  );
                })}
              </div>
              <span className="text-center text-[10px] font-normal leading-[1.4] text-[var(--primary)]">
                {bar.label}
              </span>
            </div>
          ))}
        </div>

        {!!resolvedLegend.length && (
          <div className="flex flex-wrap gap-4 text-[10px] text-[var(--primary)]">
            {resolvedLegend.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span
                  className="inline-flex size-3 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

StackedBarChart.displayName = 'StackedBarChart';

/**
 * StackedBarChartBar Component
 *
 * A composable component for individual bars in a StackedBarChart.
 *
 * @public
 *
 * @example
 * ```tsx
 * <StackedBarChart title="Ageing">
 *   <StackedBarChartBar label="4+ hrs">
 *     <StackedBarChartSegment label="Laxmi Transporters" value={27} />
 *     <StackedBarChartSegment label="Singh Transporters" value={43} />
 *   </StackedBarChartBar>
 * </StackedBarChart>
 * ```
 */
export const StackedBarChartBar: React.FC<StackedBarChartBarComponentProps> = ({ children, ...props }) => {
  // This component is used for composition only - it doesn't render anything itself
  // The StackedBarChart component extracts props from StackedBarChartBar children
  return null;
};

StackedBarChartBar.displayName = 'StackedBarChartBar';

/**
 * StackedBarChartSegment Component
 *
 * A composable component for individual segments within a StackedBarChartBar.
 *
 * @public
 *
 * @example
 * ```tsx
 * <StackedBarChartBar label="4+ hrs">
 *   <StackedBarChartSegment label="Laxmi Transporters" value={27} color="#ffb3c3" />
 *   <StackedBarChartSegment label="Singh Transporters" value={43} color="#ff809a" />
 * </StackedBarChartBar>
 * ```
 */
export const StackedBarChartSegment: React.FC<StackedBarChartSegmentComponentProps> = ({ children, ...props }) => {
  // This component is used for composition only - it doesn't render anything itself
  // The StackedBarChart component extracts props from StackedBarChartSegment children
  return null;
};

StackedBarChartSegment.displayName = 'StackedBarChartSegment';

export default StackedBarChart;
