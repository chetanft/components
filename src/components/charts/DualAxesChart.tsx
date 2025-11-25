import React from 'react';
import { Chart } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart } from './BaseChart';
import { defaultChartOptions, defaultColors } from './chartConfig';

export interface DualAxesChartProps {
  data: ChartData<'bar' | 'line'>;
  title?: string;
  height?: number;
  options?: ChartOptions<'bar' | 'line'>;
}

export const DualAxesChart: React.FC<DualAxesChartProps> = ({
  data,
  title,
  height = 400,
  options,
}) => {
  const chartOptions: ChartOptions<'bar' | 'line'> = {
    ...defaultChartOptions,
    scales: {
      x: defaultChartOptions.scales.x,
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: defaultChartOptions.scales.y.grid,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
    plugins: {
      ...defaultChartOptions.plugins,
      title: {
        ...defaultChartOptions.plugins.title,
        display: !!title,
        text: title,
      },
    },
    interaction: {
        mode: 'index',
        intersect: false,
    },
    ...options,
  };

  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      backgroundColor: defaultColors[index % defaultColors.length],
      borderColor: defaultColors[index % defaultColors.length],
      yAxisID: index === 0 ? 'y' : 'y1', // Simplistic assignment, should be passed in data usually
      ...dataset,
    })),
  };

  return (
    <BaseChart title={title} height={height}>
      <Chart type='bar' data={chartData} options={chartOptions} />
    </BaseChart>
  );
};

