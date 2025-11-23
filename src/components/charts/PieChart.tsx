import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultColors, defaultChartOptions } from './chartConfig';

export interface PieChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'pie'>;
  options?: ChartOptions<'pie'>;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  ...props
}) => {
  // Apply default colors to dataset if not provided
  const processedData: ChartData<'pie'> = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || defaultColors,
      borderColor: dataset.borderColor || '#ffffff',
      borderWidth: dataset.borderWidth ?? 2,
    })),
  };

  const chartOptions: ChartOptions<'pie'> = {
    ...defaultChartOptions,
    scales: undefined, // Pie charts don't use scales
    ...options,
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <BaseChart title={title} height={height} className={className} {...props}>
      <Pie data={processedData} options={chartOptions} />
    </BaseChart>
  );
};

