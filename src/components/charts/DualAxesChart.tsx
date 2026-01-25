import React from 'react';
import { Chart } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultChartOptions, defaultColors } from './chartConfig';

export interface DualAxesChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'bar' | 'line'>;
  options?: ChartOptions<'bar' | 'line'>;
}

export const DualAxesChart: React.FC<DualAxesChartProps> = ({
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
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      yAxisID: index === 0 ? 'y' : 'y1', // Simplistic assignment, should be passed in data usually
      ...dataset,
    })),
  };

  return (
    <BaseChart title={title} height={height} className={className} defaultColors={customDefaultColors} {...props}>
      <Chart type='bar' data={chartData} options={chartOptions} />
    </BaseChart>
  );
};

