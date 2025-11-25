import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart } from './BaseChart';
import { defaultChartOptions, defaultColors } from './chartConfig';

export interface StackedBarChartProps {
  data: ChartData<'bar'>;
  title?: string;
  height?: number;
  options?: ChartOptions<'bar'>;
  horizontal?: boolean;
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  title,
  height = 400,
  options,
  horizontal = false,
}) => {
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

