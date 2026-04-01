import React from 'react';
import { Radar } from 'react-chartjs-2';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { createLineGlowPlugin, defaultColors, defaultChartOptions, ftChartColors, toRgba } from './chartConfig';

export interface RadarChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'radar'>;
  options?: ChartOptions<'radar'>;
  showDots?: boolean;
  linesOnly?: boolean;
  labelFormatter?: (label: string) => string;
  gridType?: 'default' | 'circle' | 'none' | 'filled';
  showLegend?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  showDots = false,
  linesOnly = false,
  labelFormatter,
  gridType = 'circle',
  showLegend = true,
  defaultColors: customDefaultColors,
  ...props
}) => {
  // Use custom defaultColors if provided, otherwise fall back to imported defaultColors
  const colors = customDefaultColors || defaultColors;
  
  // Apply default colors to datasets if not provided
  const processedData: ChartData<'radar'> = {
    ...data,
    datasets: data.datasets.map((dataset, index) => {
      const baseColor = colors[index % colors.length];

      return {
        ...dataset,
        backgroundColor: dataset.backgroundColor || (linesOnly ? 'transparent' : toRgba(baseColor, gridType === 'filled' ? 0.2 : 0.12)),
        borderColor: dataset.borderColor || baseColor,
        borderWidth: dataset.borderWidth || 4,
        borderJoinStyle: dataset.borderJoinStyle || 'round',
        pointRadius: showDots ? (dataset.pointRadius ?? 3) : 0,
        pointHoverRadius: showDots ? (dataset.pointHoverRadius ?? 6) : 5,
        pointBackgroundColor: dataset.pointBackgroundColor || baseColor,
        pointBorderColor: dataset.pointBorderColor || ftChartColors.background.primary,
        pointBorderWidth: dataset.pointBorderWidth || 2,
        pointHoverBackgroundColor: dataset.pointHoverBackgroundColor || baseColor,
        pointHoverBorderColor: dataset.pointHoverBorderColor || ftChartColors.background.primary,
        pointHoverBorderWidth: dataset.pointHoverBorderWidth || 2,
      };
    }),
  };

  const getGridConfig = () => {
    switch (gridType) {
      case 'none':
        return {
          display: false,
        };
      case 'circle':
        return {
          circular: true,
          color: toRgba(ftChartColors.grid, 0.72),
        };
      case 'filled':
        return {
          color: toRgba(ftChartColors.grid, 0.72),
        };
      default:
        return {
          color: toRgba(ftChartColors.grid, 0.72),
          circular: true,
        };
    }
  };

  const chartOptions: ChartOptions<'radar'> = {
    ...defaultChartOptions,
    scales: {
      r: {
        grid: getGridConfig(),
        angleLines: {
          color: toRgba(ftChartColors.grid, 0.52),
        },
        ticks: {
          display: gridType !== 'none',
          color: ftChartColors.text.secondary,
          backdropColor: 'transparent',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 11,
          },
        },
        pointLabels: {
          color: ftChartColors.text.secondary,
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
            weight: 500,
          },
          callback: labelFormatter
            ? (label) => labelFormatter(label)
            : undefined,
        },
      },
    },
    plugins: {
      ...defaultChartOptions.plugins,
      ...options?.plugins,
      legend: {
        ...defaultChartOptions.plugins?.legend,
        display: showLegend,
        ...options?.plugins?.legend,
      },
    },
    ...options,
    maintainAspectRatio: false,
    responsive: true,
  };
  const plugins: Plugin<'radar'>[] = [createLineGlowPlugin<'radar'>('ftRadarGlow')];

  return (
    <BaseChart title={title} height={height} className={className} defaultColors={customDefaultColors} {...props}>
      <Radar data={processedData} options={chartOptions} plugins={plugins} />
    </BaseChart>
  );
};
