import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultChartOptions, defaultColors } from './chartConfig';

export interface StackedBarChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
  horizontal?: boolean;
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  horizontal = false,
  defaultColors: customDefaultColors,
  ...props
}) => {
  // Use custom defaultColors if provided, otherwise fall back to imported defaultColors
  const colors = customDefaultColors || defaultColors;
  const chartOptions: ChartOptions<'bar'> = {
    ...defaultChartOptions,
    indexAxis: horizontal ? 'y' : 'x',
    scales: {
      x: {
        ...defaultChartOptions.scales.x,
        stacked: true,
      },
      y: {
        ...defaultChartOptions.scales.y,
        stacked: true,
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
    ...options,
  };

  // Ensure colors are applied if not present
  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset, index) => ({
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length],
      borderWidth: 1,
      borderRadius: 4,
      ...dataset,
    })),
  };

  return (
    <BaseChart title={title} height={height} className={className} defaultColors={customDefaultColors} {...props}>
      <Bar data={chartData} options={chartOptions} />
    </BaseChart>
  );
};

