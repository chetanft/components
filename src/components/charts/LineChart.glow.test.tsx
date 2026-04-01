import React from 'react';
import { render } from '@testing-library/react';
import type { ChartData, ChartOptions, Plugin } from 'chart.js';
import { LineChart } from './LineChart';

const lineMock = jest.fn(() => <div data-testid="line-chart-mock" />);

jest.mock('react-chartjs-2', () => ({
  Line: (props: { data: ChartData<'line'>; options: ChartOptions<'line'>; plugins?: Plugin<'line'>[] }) => {
    lineMock(props);
    return <div data-testid="line-chart-mock" />;
  },
}));

describe('LineChart glow styling', () => {
  const baseData: ChartData<'line'> = {
    labels: ['Mon', 'Tue', 'Wed'],
    datasets: [
      {
        label: 'Series A',
        data: [12, 18, 15],
      },
    ],
  };

  beforeEach(() => {
    lineMock.mockClear();
  });

  it('adds a glow plugin by default for the primary line', () => {
    render(<LineChart data={baseData} title="Trend" />);

    const props = lineMock.mock.calls[0][0] as { plugins?: Plugin<'line'>[] };
    expect(props.plugins?.some((plugin) => plugin.id === 'ftLineGlow')).toBe(true);
  });
});
