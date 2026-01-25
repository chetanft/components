import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultColors, defaultChartOptions } from './chartConfig';

export interface LineChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'line'>;
  options?: ChartOptions<'line'>;
  fill?: boolean;
  stepped?: boolean;
  tension?: number;
  showDots?: boolean;
  dotRadius?: number;
  dotColors?: string[];
  showLabel?: boolean;
  labelFormatter?: (value: number) => string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  fill = false,
  stepped = false,
  tension = 0.4,
  showDots = false,
  dotRadius = 4,
  dotColors,
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
      const dotColor = dotColors?.[index] || baseColor;

      return {
        ...dataset,
        backgroundColor: fill
          ? dataset.backgroundColor || `${baseColor}80`
          : dataset.backgroundColor,
        borderColor: dataset.borderColor || baseColor,
        borderWidth: dataset.borderWidth || 2,
        fill: fill,
        stepped: stepped ? 'after' : false,
        tension: stepped ? 0 : (dataset.tension ?? tension),
        pointRadius: showDots ? (dataset.pointRadius ?? dotRadius) : 0,
        pointHoverRadius: showDots ? (dataset.pointHoverRadius ?? dotRadius + 2) : 0,
        pointBackgroundColor: dataset.pointBackgroundColor || dotColor,
        pointBorderColor: dataset.pointBorderColor || 'var(--color-bg-primary)',
        pointBorderWidth: dataset.pointBorderWidth ?? 2,
      };
    }),
  };

  const chartOptions: ChartOptions<'line'> = {
    ...defaultChartOptions,
    ...options,
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <BaseChart title={title} height={height} className={className} defaultColors={customDefaultColors} {...props}>
      <Line data={processedData} options={chartOptions} />
    </BaseChart>
  );
};
