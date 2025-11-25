import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChart } from './BaseChart';
import { defaultChartOptions, chartColors } from './chartConfig';

export interface WaterfallChartProps {
  data: {
      label: string;
      value: number;
  }[];
  title?: string;
  height?: number;
}

export const WaterfallChart: React.FC<WaterfallChartProps> = ({
  data,
  title,
  height = 400,
}) => {
  // Process data for waterfall
  let runningTotal = 0;
  const processedData = data.map(item => {
      const start = runningTotal;
      runningTotal += item.value;
      const end = runningTotal;
      return {
          label: item.label,
          data: [start, end] as [number, number],
          value: item.value,
          backgroundColor: item.value >= 0 ? chartColors.teal : chartColors.pink
      };
  });

  // Add Total column if needed (optional, skipping for basic implementation)

  const chartData: ChartData<'bar'> = {
    labels: data.map(d => d.label),
    datasets: [
      {
        label: 'Value',
        data: processedData.map(d => d.data),
        backgroundColor: processedData.map(d => d.backgroundColor),
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'transparent',
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      title: {
        ...defaultChartOptions.plugins.title,
        display: !!title,
        text: title,
      },
      tooltip: {
          callbacks: {
              label: (context) => {
                  const raw = context.raw as [number, number];
                  const diff = raw[1] - raw[0];
                  return `Change: ${diff > 0 ? '+' : ''}${diff}`;
              }
          }
      }
    },
    scales: {
        y: {
            ...defaultChartOptions.scales.y,
            beginAtZero: true
        }
    }
  };

  return (
    <BaseChart title={title} height={height}>
      <Bar data={chartData} options={chartOptions} />
    </BaseChart>
  );
};

