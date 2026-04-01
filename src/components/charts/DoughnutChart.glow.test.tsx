import React from 'react';
import { render } from '@testing-library/react';
import type { ChartData, ChartOptions, Plugin } from 'chart.js';
import { DoughnutChart } from './DoughnutChart';

const doughnutMock = jest.fn(() => <div data-testid="doughnut-chart-mock" />);

jest.mock('react-chartjs-2', () => ({
  Doughnut: (props: { data: ChartData<'doughnut'>; options: ChartOptions<'doughnut'>; plugins?: Plugin<'doughnut'>[] }) => {
    doughnutMock(props);
    return <div data-testid="doughnut-chart-mock" />;
  },
}));

describe('DoughnutChart glow styling', () => {
  const baseData: ChartData<'doughnut'> = {
    labels: ['A', 'B'],
    datasets: [
      {
        data: [65, 35],
      },
    ],
  };

  beforeEach(() => {
    doughnutMock.mockClear();
  });

  it('does not add glow by default', () => {
    render(<DoughnutChart data={baseData} title="Share" />);

    const props = doughnutMock.mock.calls[0][0] as { plugins?: Plugin<'doughnut'>[] };
    expect(props.plugins).toBeUndefined();
  });

  it('adds a glow plugin when glow is enabled', () => {
    render(<DoughnutChart data={baseData} title="Share" glow />);

    const props = doughnutMock.mock.calls[0][0] as { plugins?: Plugin<'doughnut'>[] };
    expect(props.plugins?.some((plugin) => plugin.id === 'ftArcGlow')).toBe(true);
  });
});
