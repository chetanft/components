import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart } from './BaseChart';
import { defaultChartOptions, chartColors } from './chartConfig';

export interface GaugeChartProps {
  value: number; // 0-100
  min?: number;
  max?: number;
  title?: string;
  height?: number;
  color?: string;
  backgroundColor?: string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  min = 0,
  max = 100,
  title,
  height = 300,
  color = chartColors.indigo,
  backgroundColor = '#e1e2e4',
}) => {
  // Normalize value to percentage for display
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const dataValues = [percentage * 100, 100 - (percentage * 100)];

  const chartData: ChartData<'doughnut'> = {
    labels: ['Value', 'Remaining'],
    datasets: [
      {
        data: dataValues,
        backgroundColor: [color, backgroundColor],
        borderWidth: 0,
        circumference: 180,
        rotation: -90,
      },
    ],
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    ...defaultChartOptions,
    cutout: '75%',
    plugins: {
      ...defaultChartOptions.plugins,
      legend: { display: false },
      tooltip: { enabled: false }, // Custom tooltip logic needed for gauge usually
      title: {
        ...defaultChartOptions.plugins.title,
        display: !!title,
        text: title,
      },
    },
  };

  return (
    <BaseChart title={title} height={height}>
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-bold text-[var(--color-primary)]">{value}</div>
          <div className="text-sm text-[var(--color-secondary)]">Min: {min} - Max: {max}</div>
        </div>
      </div>
    </BaseChart>
  );
};

// Re-import colors for use inside component since we can't import internal var easily if not exported
const _ftChartColors = {
  text: {
    primary: '#434f64',
  }
};

