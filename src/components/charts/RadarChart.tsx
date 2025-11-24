import React from 'react';
import { Radar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { defaultColors, defaultChartOptions } from './chartConfig';

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
  showDots = true,
  linesOnly = false,
  labelFormatter,
  gridType = 'default',
  showLegend = true,
  ...props
}) => {
  // Apply default colors to datasets if not provided
  const processedData: ChartData<'radar'> = {
    ...data,
    datasets: data.datasets.map((dataset, index) => {
      const baseColor = defaultColors[index % defaultColors.length];
      const bgOpacity = gridType === 'filled' ? '80' : '40';
      
      return {
        ...dataset,
        backgroundColor: dataset.backgroundColor || (linesOnly ? 'transparent' : `${baseColor}${bgOpacity}`),
        borderColor: dataset.borderColor || baseColor,
        borderWidth: dataset.borderWidth || 2,
        pointRadius: showDots ? (dataset.pointRadius ?? 4) : 0,
        pointHoverRadius: showDots ? (dataset.pointHoverRadius ?? 6) : 0,
        pointBackgroundColor: dataset.pointBackgroundColor || baseColor,
        pointBorderColor: dataset.pointBorderColor || '#ffffff',
        pointHoverBackgroundColor: dataset.pointHoverBackgroundColor || baseColor,
        pointHoverBorderColor: dataset.pointHoverBorderColor || '#ffffff',
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
          color: '#e1e2e4',
        };
      case 'filled':
        return {
          color: '#e1e2e4',
        };
      default:
        return {
          color: '#e1e2e4',
        };
    }
  };

  const chartOptions: ChartOptions<'radar'> = {
    ...defaultChartOptions,
    scales: {
      r: {
        grid: getGridConfig(),
        ticks: {
          display: gridType !== 'none',
          color: '#5f697b',
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
          },
        },
        pointLabels: {
          color: '#5f697b',
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

  return (
    <BaseChart title={title} height={height} className={className} {...props}>
      <Radar data={processedData} options={chartOptions} />
    </BaseChart>
  );
};

