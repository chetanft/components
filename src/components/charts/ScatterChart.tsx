import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultColors, defaultChartOptions } from './chartConfig';

export interface ScatterChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'scatter'>;
  options?: ChartOptions<'scatter'>;
}

export const ScatterChart: React.FC<ScatterChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  ...props
}) => {
  // Apply default colors to datasets if not provided
  const processedData: ChartData<'scatter'> = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || defaultColors[index % defaultColors.length],
      borderColor: dataset.borderColor || defaultColors[index % defaultColors.length],
      borderWidth: dataset.borderWidth || 2,
      pointRadius: dataset.pointRadius ?? 6,
      pointHoverRadius: dataset.pointHoverRadius ?? 8,
    })),
  };

  const chartOptions: ChartOptions<'scatter'> = {
    ...defaultChartOptions,
    ...options,
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <BaseChart title={title} height={height} className={className} {...props}>
      <Scatter data={processedData} options={chartOptions} />
    </BaseChart>
  );
};

















