import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultColors, defaultChartOptions } from './chartConfig';

export interface BubbleChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'bubble'>;
  options?: ChartOptions<'bubble'>;
}

export const BubbleChart: React.FC<BubbleChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  ...props
}) => {
  // Apply default colors to datasets if not provided
  const processedData: ChartData<'bubble'> = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || `${defaultColors[index % defaultColors.length]}80`,
      borderColor: dataset.borderColor || defaultColors[index % defaultColors.length],
      borderWidth: dataset.borderWidth || 2,
    })),
  };

  const chartOptions: ChartOptions<'bubble'> = {
    ...defaultChartOptions,
    ...options,
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <BaseChart title={title} height={height} className={className} {...props}>
      <Bubble data={processedData} options={chartOptions} />
    </BaseChart>
  );
};









