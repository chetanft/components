import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultChartOptions, defaultColors } from './chartConfig';

export interface HorizontalBarChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
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
  const chartOptions: ChartOptions<'bar'> = {
    ...defaultChartOptions,
    indexAxis: 'y' as const,
    scales: {
        x: {
            ...defaultChartOptions.scales.x,
            grid: {
                display: true,
                ...defaultChartOptions.scales.x.grid
            }
        },
        y: {
            ...defaultChartOptions.scales.y,
            grid: {
                display: false, // Cleaner look for labels on Y
                ...defaultChartOptions.scales.y.grid
            }
        }
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

