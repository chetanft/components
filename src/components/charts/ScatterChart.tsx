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
  defaultColors: customDefaultColors,
  ...props
}) => {
  // Use custom defaultColors if provided, otherwise fall back to imported defaultColors
  const colors = customDefaultColors || defaultColors;
  
  // Apply default colors to datasets if not provided
  const processedData: ChartData<'scatter'> = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || colors[index % colors.length],
      borderColor: dataset.borderColor || colors[index % colors.length],
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
    <BaseChart title={title} height={height} className={className} defaultColors={customDefaultColors} {...props}>
      <Scatter data={processedData} options={chartOptions} />
    </BaseChart>
  );
};


















