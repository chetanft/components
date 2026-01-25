import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultColors, defaultChartOptions } from './chartConfig';

export interface BarChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
  horizontal?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  horizontal = false,
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
      borderWidth: dataset.borderWidth || 0,
      borderRadius: dataset.borderRadius || 4,
    })),
  };

  const chartOptions: ChartOptions<'bar'> = {
    ...defaultChartOptions,
    indexAxis: horizontal ? 'y' : 'x',
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


















