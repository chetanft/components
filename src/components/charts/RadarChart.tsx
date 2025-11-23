import React from 'react';
import { Radar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultColors, defaultChartOptions } from './chartConfig';

export interface RadarChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'radar'>;
  options?: ChartOptions<'radar'>;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  ...props
}) => {
  // Apply default colors to datasets if not provided
  const processedData: ChartData<'radar'> = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || `${defaultColors[index % defaultColors.length]}40`,
      borderColor: dataset.borderColor || defaultColors[index % defaultColors.length],
      borderWidth: dataset.borderWidth || 2,
      pointBackgroundColor: dataset.pointBackgroundColor || defaultColors[index % defaultColors.length],
      pointBorderColor: dataset.pointBorderColor || '#ffffff',
      pointHoverBackgroundColor: dataset.pointHoverBackgroundColor || defaultColors[index % defaultColors.length],
      pointHoverBorderColor: dataset.pointHoverBorderColor || '#ffffff',
    })),
  };

  const chartOptions: ChartOptions<'radar'> = {
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
      <Radar data={processedData} options={chartOptions} />
    </BaseChart>
  );
};

