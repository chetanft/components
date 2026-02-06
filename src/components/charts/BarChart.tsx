import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultColors, defaultChartOptions } from './chartConfig';

export interface BarChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
  /** Display bars horizontally */
  horizontal?: boolean;
  /** Enable stacked bars */
  stacked?: boolean;
  /** Bar thickness in pixels */
  barThickness?: number;
  /** Maximum bar thickness in pixels */
  maxBarThickness?: number;
  /** Border radius for bars (default: 4) */
  borderRadius?: number;
  /** Show data labels on bars */
  showLabels?: boolean;
  /** Custom label formatter function */
  labelFormatter?: (value: number | string) => string;
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
          color: '#434f64',
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

  return (
    <BaseChart title={title} height={height} className={className} defaultColors={customDefaultColors} {...props}>
      <Bar data={processedData} options={chartOptions} />
    </BaseChart>
  );
};


















