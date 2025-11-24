import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultColors, defaultChartOptions } from './chartConfig';

export interface PieChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'pie'>;
  options?: ChartOptions<'pie'>;
  separatorWidth?: number;
  showLabels?: boolean;
  labelFormatter?: (label: string, value: number, total: number) => string;
  showLegend?: boolean;
  donut?: boolean;
  donutActive?: boolean;
  donutText?: string;
  stacked?: boolean;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  separatorWidth = 2,
  showLabels = false,
  labelFormatter,
  showLegend = true,
  donut = false,
  donutActive = false,
  donutText,
  stacked = false,
  ...props
}) => {
  // Apply default colors to dataset if not provided
  const processedData: ChartData<'pie'> = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || defaultColors,
      borderColor: dataset.borderColor || '#ffffff',
      borderWidth: separatorWidth > 0 ? separatorWidth : 0,
    })),
  };

  const chartOptions: ChartOptions<'pie'> = {
    ...defaultChartOptions,
    scales: undefined, // Pie charts don't use scales
    ...options,
    maintainAspectRatio: false,
    responsive: true,
    cutout: donut ? '50%' : undefined,
    plugins: {
      ...defaultChartOptions.plugins,
      ...options?.plugins,
      legend: {
        ...defaultChartOptions.plugins?.legend,
        display: showLegend,
        ...options?.plugins?.legend,
      },
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        ...(labelFormatter && {
          callbacks: {
            label: (context: any) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              return labelFormatter(label, value, total);
            },
          },
        }),
        ...options?.plugins?.tooltip,
      },
    },
  };

  return (
    <BaseChart title={title} height={height} className={className} {...props}>
      <Pie data={processedData} options={chartOptions} />
    </BaseChart>
  );
};

