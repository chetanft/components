import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultColors, defaultChartOptions } from './chartConfig';

export interface LineChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
  fill?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  fill = false,
  ...props
}) => {
  // Apply default colors to datasets if not provided
  const processedData: ChartData<'line'> = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: fill
        ? dataset.backgroundColor || `${defaultColors[index % defaultColors.length]}80`
        : dataset.backgroundColor,
      borderColor: dataset.borderColor || defaultColors[index % defaultColors.length],
      borderWidth: dataset.borderWidth || 2,
      fill: fill,
      tension: dataset.tension ?? 0.4,
    })),
  };

  const chartOptions: ChartOptions<'line'> = {
    ...defaultChartOptions,
    ...options,
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <BaseChart title={title} height={height} className={className} {...props}>
      <Line data={processedData} options={chartOptions} />
    </BaseChart>
  );
};

