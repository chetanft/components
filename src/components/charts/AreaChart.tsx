import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { createLineGlowPlugin, defaultColors, defaultChartOptions, toRgba } from './chartConfig';

export interface AreaChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
  fill?: boolean;
  stepped?: boolean;
  tension?: number;
  showDots?: boolean;
  showLegend?: boolean;
  gradient?: boolean;
  glow?: boolean;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  fill = true,
  stepped = false,
  tension = 0.4,
  showDots = false,
  showLegend = true,
  gradient = false,
  glow = true,
  defaultColors: customDefaultColors,
  ...props
}) => {
  // Use custom defaultColors if provided, otherwise fall back to imported defaultColors
  const colors = customDefaultColors || defaultColors;
  
  // Apply default colors to datasets if not provided
  const processedData: ChartData<'line'> = {
    ...data,
    datasets: data.datasets.map((dataset, index) => {
      const baseColor = colors[index % colors.length];
      const backgroundColor = gradient
        ? `linear-gradient(180deg, ${baseColor}80 0%, ${baseColor}00 100%)`
        : fill
        ? toRgba(baseColor, 0.18)
        : 'transparent';

      return {
        ...dataset,
        backgroundColor: dataset.backgroundColor || backgroundColor,
        borderColor: dataset.borderColor || baseColor,
        borderWidth: dataset.borderWidth || 2,
        fill: fill,
        stepped: stepped ? 'after' : false,
        tension: stepped ? 0 : (dataset.tension ?? tension),
        pointRadius: showDots ? (dataset.pointRadius ?? 4) : 0,
        pointHoverRadius: showDots ? (dataset.pointHoverRadius ?? 6) : 0,
        pointBackgroundColor: dataset.pointBackgroundColor || baseColor,
        pointBorderColor: dataset.pointBorderColor || 'var(--bg-primary)',
        pointBorderWidth: dataset.pointBorderWidth ?? 2,
      };
    }),
  };

  const chartOptions: ChartOptions<'line'> = {
    ...defaultChartOptions,
    ...options,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      ...defaultChartOptions.plugins,
      ...options?.plugins,
      legend: {
        ...defaultChartOptions.plugins?.legend,
        display: showLegend,
        ...options?.plugins?.legend,
      },
    },
  };
  const plugins: Plugin<'line'>[] | undefined = glow ? [createLineGlowPlugin<'line'>('ftAreaGlow')] : undefined;

  return (
    <BaseChart title={title} height={height} className={className} defaultColors={customDefaultColors} {...props}>
      <Line data={processedData} options={chartOptions} plugins={plugins} />
    </BaseChart>
  );
};
















