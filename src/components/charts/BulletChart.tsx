import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions, Plugin } from 'chart.js';
import { BaseChart } from './BaseChart';
import { defaultChartOptions, ftChartColors, getCssVar, toRgba } from './chartConfig';

export interface BulletChartProps {
  label: string;
  current: number;
  target: number;
  ranges: [number, number, number];
  title?: string;
  height?: number;
}

const bulletTargetMarkerPlugin: Plugin<'bar'> = {
  id: 'ftBulletTargetMarker',
  afterDatasetsDraw(chart) {
    const markerTarget = (chart.options.plugins?.ftBulletTargetMarker as { target?: number } | undefined)?.target;
    if (typeof markerTarget !== 'number') return;

    const xScale = chart.scales.x;
    const yScale = chart.scales.y;
    if (!xScale || !yScale) return;

    const x = xScale.getPixelForValue(markerTarget);
    const centerY = yScale.getPixelForValue(0);
    const ctx = chart.ctx;

    ctx.save();
    ctx.strokeStyle = ftChartColors.text.primary;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, centerY - 18);
    ctx.lineTo(x, centerY + 18);
    ctx.stroke();
    ctx.restore();
  },
};

export const BulletChart: React.FC<BulletChartProps> = ({
  label,
  current,
  target,
  ranges,
  title,
  height = 120,
}) => {
  const safeMax = Math.max(ranges[2], current, target);
  const rangeSegments = [
    ranges[0],
    ranges[1] - ranges[0],
    ranges[2] - ranges[1],
  ];

  const chartData: ChartData<'bar'> = {
    labels: [label],
    datasets: [
      {
        label: 'Poor',
        data: [rangeSegments[0]],
        backgroundColor: ftChartColors.border.secondary,
        borderColor: 'transparent',
        borderWidth: 0,
        stack: 'ranges',
        grouped: false,
        borderRadius: {
          topLeft: 999,
          bottomLeft: 999,
          topRight: 0,
          bottomRight: 0,
        },
        borderSkipped: false,
        barThickness: 18,
        order: 2,
      },
      {
        label: 'Average',
        data: [rangeSegments[1]],
        backgroundColor: toRgba(ftChartColors.border.primary, 0.72),
        borderColor: 'transparent',
        borderWidth: 0,
        stack: 'ranges',
        grouped: false,
        borderRadius: 0,
        borderSkipped: false,
        barThickness: 18,
        order: 2,
      },
      {
        label: 'Excellent',
        data: [rangeSegments[2]],
        backgroundColor: toRgba(getCssVar('--positive', '#00c637'), 0.24),
        borderColor: 'transparent',
        borderWidth: 0,
        stack: 'ranges',
        grouped: false,
        borderRadius: {
          topLeft: 0,
          bottomLeft: 0,
          topRight: 999,
          bottomRight: 999,
        },
        borderSkipped: false,
        barThickness: 18,
        order: 2,
      },
      {
        label: 'Current',
        data: [current],
        backgroundColor: ftChartColors.text.primary,
        borderColor: ftChartColors.text.primary,
        borderWidth: 0,
        grouped: false,
        borderRadius: 999,
        borderSkipped: false,
        barThickness: 12,
        order: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    ...defaultChartOptions,
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ...defaultChartOptions.scales.x,
        stacked: true,
        min: 0,
        max: safeMax,
        grid: {
          display: false,
          drawTicks: false,
        },
        ticks: {
          ...defaultChartOptions.scales.x.ticks,
          color: ftChartColors.text.secondary,
        },
        border: {
          color: toRgba(ftChartColors.border.primary, 0.9),
        },
      },
      y: {
        ...defaultChartOptions.scales.y,
        stacked: true,
        grid: {
          display: false,
          drawTicks: false,
        },
        ticks: {
          ...defaultChartOptions.scales.y.ticks,
          color: ftChartColors.text.primary,
        },
        border: {
          color: toRgba(ftChartColors.border.primary, 0.9),
        },
      },
    },
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        display: false,
      },
      title: {
        ...defaultChartOptions.plugins.title,
        display: false,
      },
      tooltip: {
        ...defaultChartOptions.plugins.tooltip,
        enabled: true,
      },
      ftBulletTargetMarker: {
        target,
      },
    },
  };

  return (
    <BaseChart title={title} height={height}>
      <Bar data={chartData} options={chartOptions} plugins={[bulletTargetMarkerPlugin]} />
    </BaseChart>
  );
};
