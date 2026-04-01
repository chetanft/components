import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { ChartData, ChartDataset, ChartOptions, Plugin, ScatterDataPoint } from 'chart.js';
import { BaseChart, BaseChartProps } from './BaseChart';
import { chartColors, createScatterGlowPlugin, defaultColors, defaultChartOptions, ftChartColors, toRgba } from './chartConfig';

export interface ScatterChartProps extends Omit<BaseChartProps, 'children'> {
  data: ChartData<'scatter'>;
  options?: ChartOptions<'scatter'>;
  highlightedPoints?: Array<{ datasetIndex: number; pointIndex: number }>;
  glowHighlightedOnly?: boolean;
  baseRadius?: number;
  highlightRadius?: number;
}

export const ScatterChart: React.FC<ScatterChartProps> = ({
  data,
  title,
  height = 400,
  className,
  options,
  highlightedPoints = [],
  glowHighlightedOnly = true,
  baseRadius = 5,
  highlightRadius = 8,
  defaultColors: customDefaultColors,
  ...props
}) => {
  // Use custom defaultColors if provided, otherwise fall back to imported defaultColors
  const colors = customDefaultColors || defaultColors;
  const highlightSet = new Set(highlightedPoints.map(({ datasetIndex, pointIndex }) => `${datasetIndex}:${pointIndex}`));
  const darkerScatterColors = [
    chartColors.tealDark,
    chartColors.indigoDark,
    chartColors.blueDark,
    chartColors.pinkDark,
    chartColors.goldDark,
  ];
  
  const processedDatasets = data.datasets.flatMap((dataset, datasetIndex) => {
    const baseColor = typeof dataset.backgroundColor === 'string'
      ? dataset.backgroundColor
      : Array.isArray(dataset.backgroundColor)
        ? dataset.backgroundColor[0]
        : darkerScatterColors[datasetIndex % darkerScatterColors.length] || colors[datasetIndex % colors.length];
    const points = (dataset.data ?? []) as ScatterDataPoint[];
    const contextPoints: ScatterDataPoint[] = [];
    const focusPoints: ScatterDataPoint[] = [];

    points.forEach((point, pointIndex) => {
      if (highlightSet.has(`${datasetIndex}:${pointIndex}`)) {
        focusPoints.push(point);
      } else {
        contextPoints.push(point);
      }
    });

    const datasetsToRender: ChartDataset<'scatter'>[] = [];

    if (contextPoints.length > 0) {
      datasetsToRender.push({
        ...dataset,
        data: contextPoints,
        label: dataset.label,
        backgroundColor: glowHighlightedOnly ? baseColor : toRgba(baseColor, 0.88),
        borderColor: baseColor,
        borderWidth: dataset.borderWidth || 1,
        pointRadius: dataset.pointRadius ?? baseRadius,
        pointHoverRadius: dataset.pointHoverRadius ?? baseRadius + 1,
      });
    }

    if (focusPoints.length > 0) {
      datasetsToRender.push({
        ...dataset,
        data: focusPoints,
        label: dataset.label ? `${dataset.label} Highlights` : undefined,
        backgroundColor: baseColor,
        borderColor: baseColor,
        borderWidth: dataset.borderWidth || 1,
        pointRadius: highlightRadius,
        pointHoverRadius: highlightRadius + 1,
        ftGlow: true,
      });
    }

    return datasetsToRender.length > 0
      ? datasetsToRender
      : [{
          ...dataset,
          backgroundColor: baseColor,
          borderColor: baseColor,
          borderWidth: dataset.borderWidth || 1,
          pointRadius: dataset.pointRadius ?? baseRadius,
          pointHoverRadius: dataset.pointHoverRadius ?? baseRadius + 1,
        }];
  });

  const processedData: ChartData<'scatter'> = {
    ...data,
    datasets: processedDatasets,
  };

  const chartOptions: ChartOptions<'scatter'> = {
    ...defaultChartOptions,
    scales: {
      ...defaultChartOptions.scales,
      x: {
        ...defaultChartOptions.scales.x,
        grid: {
          ...defaultChartOptions.scales.x.grid,
          color: toRgba(ftChartColors.grid, 0.72),
        },
        ticks: {
          ...defaultChartOptions.scales.x.ticks,
          color: ftChartColors.text.secondary,
        },
      },
      y: {
        ...defaultChartOptions.scales.y,
        grid: {
          ...defaultChartOptions.scales.y.grid,
          color: toRgba(ftChartColors.grid, 0.72),
        },
        ticks: {
          ...defaultChartOptions.scales.y.ticks,
          color: ftChartColors.text.secondary,
        },
      },
    },
    ...options,
    maintainAspectRatio: false,
    responsive: true,
  };
  const plugins: Plugin<'scatter'>[] | undefined = highlightedPoints.length > 0
    ? [createScatterGlowPlugin<'scatter'>('ftScatterGlow')]
    : undefined;

  return (
    <BaseChart title={title} height={height} className={className} defaultColors={customDefaultColors} {...props}>
      <Scatter data={processedData} options={chartOptions} plugins={plugins} />
    </BaseChart>
  );
};














