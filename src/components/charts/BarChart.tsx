import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { createBarGlowPlugin, defaultColors, defaultChartOptions, ftChartColors } from './chartConfig';

export interface BarChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
  /** Display bars horizontally */
  horizontal?: boolean;
  /** Enable stacked bars */
  stacked?: boolean;
  /** Bar thickness */
  barThickness?: number;
  /** Maximum bar thickness */
  maxBarThickness?: number;
  /** Border radius for bars (default: 4) */
  borderRadius?: number;
  /** Show data labels on bars */
  showLabels?: boolean;
  /** Custom label formatter function */
  labelFormatter?: (value: number | string) => string;
  /** Optional glow treatment for emphasized bar charts */
  glow?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  horizontal = false,
  stacked = false,
  barThickness,
  maxBarThickness,
  borderRadius = 4,
  showLabels = false,
  labelFormatter,
  glow = false,
  defaultColors: customDefaultColors,
  ...props
}) => {
  // Use custom defaultColors if provided, otherwise fall back to imported defaultColors
  const colors = customDefaultColors || defaultColors;

  // Apply default colors to datasets if not provided
  const processedData: ChartData<'bar'> = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || colors[index % colors.length],
      borderColor: dataset.borderColor || colors[index % colors.length],
      borderWidth: dataset.borderWidth ?? 0,
      borderRadius: dataset.borderRadius ?? borderRadius,
      barThickness: barThickness,
      maxBarThickness: maxBarThickness,
    })),
  };

  // Build chart options with convenience props
  const chartOptions: ChartOptions<'bar'> = {
    ...defaultChartOptions,
    indexAxis: horizontal ? 'y' : 'x',
    scales: {
      ...defaultChartOptions.scales,
      x: {
        ...defaultChartOptions.scales.x,
        stacked: stacked,
        ...options?.scales?.x,
      },
      y: {
        ...defaultChartOptions.scales.y,
        stacked: stacked,
        ...options?.scales?.y,
      },
    },
    plugins: {
      ...defaultChartOptions.plugins,
      ...options?.plugins,
      ...(showLabels && {
        datalabels: {
          display: true,
          color: ftChartColors.text.primary,
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
            weight: 500,
          },
          formatter: labelFormatter || ((value: number) => value),
          anchor: 'end' as const,
          align: 'end' as const,
        },
      }),
    },
    ...options,
    maintainAspectRatio: false,
    responsive: true,
  };
  const plugins: Plugin<'bar'>[] | undefined = glow ? [createBarGlowPlugin<'bar'>('ftBarGlow')] : undefined;

  return (
    <BaseChart title={title} height={height} className={className} defaultColors={customDefaultColors} {...props}>
      <Bar data={processedData} options={chartOptions} plugins={plugins} />
    </BaseChart>
  );
};

















