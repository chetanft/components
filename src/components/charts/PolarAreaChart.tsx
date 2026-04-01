import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { createPolarAreaGlowPlugin, defaultColors, defaultChartOptions, ftChartColors } from './chartConfig';

export interface PolarAreaChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'polarArea'>;
  options?: ChartOptions<'polarArea'>;
  glow?: boolean;
}

export const PolarAreaChart: React.FC<PolarAreaChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  glow = true,
  defaultColors: customDefaultColors,
  ...props
}) => {
  // Use custom defaultColors if provided, otherwise fall back to imported defaultColors
  const colors = customDefaultColors || defaultColors;
  
  // Apply default colors to dataset if not provided
  const processedData: ChartData<'polarArea'> = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || colors.map(color => `${color}80`),
      borderColor: dataset.borderColor || colors,
      borderWidth: dataset.borderWidth ?? 2,
    })),
  };

  const chartOptions: ChartOptions<'polarArea'> = {
    ...defaultChartOptions,
    scales: {
      r: {
        grid: {
          color: ftChartColors.grid,
        },
        ticks: {
          color: ftChartColors.text.secondary,
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
          },
        },
        pointLabels: {
          color: ftChartColors.text.secondary,
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
  const plugins: Plugin<'polarArea'>[] | undefined = glow ? [createPolarAreaGlowPlugin<'polarArea'>('ftPolarGlow')] : undefined;

  return (
    <BaseChart title={title} height={height} className={className} defaultColors={customDefaultColors} {...props}>
      <PolarArea data={processedData} options={chartOptions} plugins={plugins} />
    </BaseChart>
  );
};
