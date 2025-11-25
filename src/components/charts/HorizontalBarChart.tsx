import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart } from './BaseChart';
import { defaultChartOptions, defaultColors } from './chartConfig';

export interface HorizontalBarChartProps {
  data: ChartData<'bar'>;
  title?: string;
  height?: number;
  options?: ChartOptions<'bar'>;
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  title,
  height = 400,
  options,
}) => {
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
      backgroundColor: defaultColors[index % defaultColors.length],
      borderColor: defaultColors[index % defaultColors.length],
      borderWidth: 1,
      borderRadius: 4,
      ...dataset,
    })),
  };

  return (
    <BaseChart title={title} height={height}>
      <Bar data={chartData} options={chartOptions} />
    </BaseChart>
  );
};

