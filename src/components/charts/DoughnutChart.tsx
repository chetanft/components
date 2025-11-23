import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultColors, defaultChartOptions } from './chartConfig';

export interface DoughnutChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'doughnut'>;
  options?: ChartOptions<'doughnut'>;
  innerRadius?: number;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  innerRadius,
  ...props
}) => {
  // Apply default colors to dataset if not provided
  const processedData: ChartData<'doughnut'> = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || defaultColors,
      borderColor: dataset.borderColor || '#ffffff',
      borderWidth: dataset.borderWidth ?? 2,
    })),
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    ...defaultChartOptions,
    scales: undefined, // Doughnut charts don't use scales
    cutout: innerRadius !== undefined ? `${innerRadius}%` : '50%',
    ...options,
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <BaseChart title={title} height={height} className={className} {...props}>
      <Doughnut data={processedData} options={chartOptions} />
    </BaseChart>
  );
};

