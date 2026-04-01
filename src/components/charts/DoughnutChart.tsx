import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { createArcGlowPlugin, defaultColors, defaultChartOptions, ftChartColors } from './chartConfig';

export interface DoughnutChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'doughnut'>;
  options?: ChartOptions<'doughnut'>;
  innerRadius?: number;
  glow?: boolean;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  innerRadius,
  glow = false,
  defaultColors: customDefaultColors,
  ...props
}) => {
  // Use custom defaultColors if provided, otherwise fall back to imported defaultColors
  const colors = customDefaultColors || defaultColors;
  
  // Apply default colors to dataset if not provided
  const processedData: ChartData<'doughnut'> = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || colors,
      borderColor: dataset.borderColor || ftChartColors.background.primary,
      borderWidth: dataset.borderWidth ?? 2,
    })),
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    ...defaultChartOptions,
    scales: undefined, // Doughnut charts don't use scales
    cutout: innerRadius !== undefined ? `${innerRadius}%` : '50%',
    ...options,
    maintainAspectRatio: false,
    responsive: true,
  };
  const plugins: Plugin<'doughnut'>[] | undefined = glow ? [createArcGlowPlugin<'doughnut'>('ftArcGlow')] : undefined;

  return (
    <BaseChart title={title} height={height} className={className} defaultColors={customDefaultColors} {...props}>
      <Doughnut data={processedData} options={chartOptions} plugins={plugins} />
    </BaseChart>
  );
};
