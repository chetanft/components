import React from 'react';
import { render } from '@testing-library/react';
import type { ChartData, ChartOptions } from 'chart.js';
import { RadarChart } from './RadarChart';
import { ftChartColors } from './chartConfig';

const radarMock = jest.fn(() => <div data-testid="radar-chart-mock" />);

jest.mock('react-chartjs-2', () => ({
  Radar: (props: { data: ChartData<'radar'>; options: ChartOptions<'radar'> }) => {
    radarMock(props);
    return <div data-testid="radar-chart-mock" />;
  },
}));

describe('RadarChart glow styling', () => {
  const baseData: ChartData<'radar'> = {
    labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
    datasets: [
      {
        label: 'Product A',
        data: [85, 90, 75, 95, 80, 70],
      },
    ],
  };

  beforeEach(() => {
    radarMock.mockClear();
  });

  it('applies thicker FT-styled defaults and circular grid treatment', () => {
    render(<RadarChart data={baseData} title="Product Performance" />);

    expect(radarMock).toHaveBeenCalledTimes(1);

    const props = radarMock.mock.calls[0][0] as {
      data: ChartData<'radar'>;
      options: ChartOptions<'radar'>;
    };
    const dataset = props.data.datasets[0];

    expect(dataset.borderWidth).toBe(4);
    expect(dataset.pointRadius).toBe(0);
    expect(dataset.pointHoverRadius).toBe(5);
    expect(dataset.pointBorderWidth).toBe(2);
    expect(props.options.scales?.r?.grid?.circular).toBe(true);
    expect(props.options.scales?.r?.grid?.color).toBe('rgba(225, 226, 228, 0.72)');
    expect(props.options.scales?.r?.angleLines?.color).toBe('rgba(225, 226, 228, 0.52)');
    expect(props.options.scales?.r?.ticks?.color).toBe(ftChartColors.text.secondary);
  });
});
