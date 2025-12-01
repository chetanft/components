"use client";

import React from 'react';
import { cn } from '../../../lib/utils';

const DEFAULT_COLORS = ['#ffb3c3', '#ff809a', '#ff6384'] as const;

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
  data: StackedBarData[];
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
}

const buildLegendFromData = (data: StackedBarData[]): StackedBarLegendItem[] => {
  const legendMap = new Map<string, string>();

  data.forEach((bar) => {
    bar.segments.forEach((segment, index) => {
      if (!segment.label || legendMap.has(segment.label)) {
        return;
      }

      const fallbackColor =
        segment.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];

      legendMap.set(segment.label, fallbackColor);
    });
  });

  return Array.from(legendMap.entries()).map(([label, color]) => ({
    label,
    color,
  }));
};

export const StackedBarChart = React.forwardRef(
  (
    {
      data,
      title = 'AGEING',
      legend,
      maxValue,
      barHeight = 172,
      className,
      ...props
    }: StackedBarChartProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    if (!data?.length) {
      return null;
    }

    const computedMax =
      maxValue ??
      (Math.max(
        ...data.map((bar) =>
          bar.segments.reduce((sum, segment) => sum + (segment.value || 0), 0)
        )
      ) || 1);

    const resolvedLegend = legend ?? buildLegendFromData(data);

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
          {data.map((bar, barIndex) => (
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
                    DEFAULT_COLORS[segmentIndex % DEFAULT_COLORS.length];
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

export default StackedBarChart;
