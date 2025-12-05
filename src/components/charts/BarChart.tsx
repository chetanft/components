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
  ...props
}) => {
  // Apply default colors to datasets if not provided
  const processedData: ChartData<'bar'> = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || defaultColors[index % defaultColors.length],
      borderColor: dataset.borderColor || defaultColors[index % defaultColors.length],
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
    <BaseChart title={title} height={height} className={className} {...props}>
      <Bar data={processedData} options={chartOptions} />
    </BaseChart>
  );
};
















