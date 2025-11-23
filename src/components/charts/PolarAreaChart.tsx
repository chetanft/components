import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultColors, defaultChartOptions } from './chartConfig';

export interface PolarAreaChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'polarArea'>;
  options?: ChartOptions<'polarArea'>;
}

export const PolarAreaChart: React.FC<PolarAreaChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  ...props
}) => {
  // Apply default colors to dataset if not provided
  const processedData: ChartData<'polarArea'> = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || defaultColors.map(color => `${color}80`),
      borderColor: dataset.borderColor || defaultColors,
      borderWidth: dataset.borderWidth ?? 2,
    })),
  };

  const chartOptions: ChartOptions<'polarArea'> = {
    ...defaultChartOptions,
    scales: {
      r: {
        grid: {
          color: '#e1e2e4',
        },
        ticks: {
          color: '#5f697b',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
          },
        },
        pointLabels: {
          color: '#5f697b',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
            weight: 500,
          },
        },
      },
    },
    ...options,
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <BaseChart title={title} height={height} className={className} {...props}>
      <PolarArea data={processedData} options={chartOptions} />
    </BaseChart>
  );
};

