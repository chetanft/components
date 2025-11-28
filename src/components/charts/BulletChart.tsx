import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart } from './BaseChart';
import { defaultChartOptions, chartColors } from './chartConfig';

export interface BulletChartProps {
  label: string;
  current: number;
  target: number;
  ranges: [number, number, number]; // bad, satisfactory, good (e.g., [50, 75, 100])
  title?: string;
  height?: number;
}

export const BulletChart: React.FC<BulletChartProps> = ({
  label,
  current,
  ranges,
  title,
  height = 120,
}) => {
  // Bullet chart implementation using stacked bars is tricky for ranges
  // Easier approach: Multiple datasets overlapping
  // Ranges: Background bar
  // Current: Narrower bar
  // Target: Vertical line (simulated or plugin)

  // Since we don't have plugins, we'll use a stacked bar approach where "ranges" are segments
  // And "current" is a bar on top (using mixed type chart or just CSS overlap? No, Chart.js supports multiple datasets)
  // Actually Bullet chart in Chart.js usually needs a plugin or very custom dataset config.

  // Simplified implementation:
  // Dataset 1: Range 1 (Bad) - Color 1
  // Dataset 2: Range 2 (Satisfactory) - Color 2
  // Dataset 3: Range 3 (Good) - Color 3
  // Dataset 4: Current Value - Narrow bar (BarPercentage)
  // Target: We can use a scatter point or just skip for now if too complex without plugin.

  const chartData: ChartData<'bar'> = {
    labels: [label],
    datasets: [
      // Current Value (Top Layer)
      {
        label: 'Current',
        data: [current],
        backgroundColor: chartColors.indigo, // Dark strong color
        barPercentage: 0.3,
        categoryPercentage: 1, // Full width of category
        // zIndex: 10, // Removed to fix type error
        order: 1,
      },
      // Ranges (Background Layers)
      // We need them to be separate bars or stacked?
      // If we make them stacked, they add up.
      // So: Range 1 = val[0]
      // Range 2 = val[1] - val[0]
      // Range 3 = val[2] - val[1]
      {
        label: 'Bad',
        data: [ranges[0]],
        backgroundColor: 'var(--color-neutral-light)',
        barPercentage: 1,
        categoryPercentage: 1,
        stack: 'ranges',
        order: 2,
      },
      {
        label: 'Satisfactory',
        data: [ranges[1] - ranges[0]],
        backgroundColor: 'var(--color-border-secondary)',
        barPercentage: 1,
        categoryPercentage: 1,
        stack: 'ranges',
        order: 2,
      },
      {
        label: 'Good',
        data: [ranges[2] - ranges[1]],
        backgroundColor: 'var(--color-border-primary)',
        barPercentage: 1,
        categoryPercentage: 1,
        stack: 'ranges',
        order: 2,
      }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    ...defaultChartOptions,
    indexAxis: 'y',
    scales: {
      x: {
        display: true,
        max: ranges[2], // Max range
        grid: { display: false }
      },
      y: {
        display: true,
        grid: { display: false },
        stacked: true // Stack the ranges
      }
    },
    plugins: {
      legend: { display: false },
      title: { display: !!title, text: title }
    }
  };

  return (
    <BaseChart title={title} height={height}>
      <Bar data={chartData} options={chartOptions} />
    </BaseChart>
  );
};
