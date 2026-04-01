import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { createArcGlowPlugin, defaultColors, defaultChartOptions, ftChartColors } from './chartConfig';

export interface RadialChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'doughnut'>;
  options?: ChartOptions<'doughnut'>;
  value?: number;
  maxValue?: number;
  showLabel?: boolean;
  labelFormatter?: (value: number, maxValue: number) => string;
  showGrid?: boolean;
  shape?: 'circle' | 'round';
  stacked?: boolean;
  glow?: boolean;
}

export const RadialChart: React.FC<RadialChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  value,
  maxValue = 100,
  showLabel = false,
  labelFormatter,
  stacked = false,
  glow = true,
  defaultColors: customDefaultColors,
  ...props
}) => {
  // Use custom defaultColors if provided, otherwise fall back to imported defaultColors
  const colors = customDefaultColors || defaultColors;
  
  // For radial charts, we typically show a single value as progress
  const processedData: ChartData<'doughnut'> = {
    ...data,
    datasets: data.datasets.map((dataset, index) => {
      const baseColor = colors[index % colors.length];

      // If stacked, create multiple segments
      if (stacked && Array.isArray(dataset.data)) {
        return {
          ...dataset,
          backgroundColor: dataset.backgroundColor || colors.slice(0, dataset.data.length),
          borderColor: dataset.borderColor || ftChartColors.background.primary,
          borderWidth: dataset.borderWidth ?? 0,
        };
      }

      return {
        ...dataset,
        backgroundColor: dataset.backgroundColor || [baseColor, ftChartColors.border.secondary],
        borderColor: dataset.borderColor || ftChartColors.background.primary,
        borderWidth: dataset.borderWidth ?? 0,
      };
    }),
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    ...defaultChartOptions,
    scales: undefined,
    ...options,
    maintainAspectRatio: false,
    responsive: true,
    cutout: '75%',
    plugins: {
      ...defaultChartOptions.plugins,
      ...options?.plugins,
      legend: {
        ...defaultChartOptions.plugins?.legend,
        display: false,
        ...options?.plugins?.legend,
      },
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        enabled: true,
        ...options?.plugins?.tooltip,
      },
    },
  };
  const plugins: Plugin<'doughnut'>[] | undefined = glow && !stacked ? [createArcGlowPlugin<'doughnut'>('ftArcGlow')] : undefined;

  // Calculate percentage for label
  const percentage = value !== undefined ? Math.round((value / maxValue) * 100) : undefined;
  const displayLabel = labelFormatter && value !== undefined
    ? labelFormatter(value, maxValue)
    : percentage !== undefined
      ? `${percentage}%`
      : '';

  return (
    <BaseChart title={title} height={height} className={className} defaultColors={customDefaultColors} {...props}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Doughnut data={processedData} options={chartOptions} plugins={plugins} />
        {showLabel && displayLabel && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontSize: 'var(--spacing-x6)',
                fontWeight: 600,
                color: ftChartColors.text.primary,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              {displayLabel}
            </div>
          </div>
        )}
      </div>
    </BaseChart>
  );
};















