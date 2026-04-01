import React from 'react';
import { render } from '@testing-library/react';
import type { ChartData, ChartOptions, Plugin } from 'chart.js';
import { PolarAreaChart } from './PolarAreaChart';

const polarMock = jest.fn(() => <div data-testid="polar-chart-mock" />);

jest.mock('react-chartjs-2', () => ({
  PolarArea: (props: { data: ChartData<'polarArea'>; options: ChartOptions<'polarArea'>; plugins?: Plugin<'polarArea'>[] }) => {
    polarMock(props);
    return <div data-testid="polar-chart-mock" />;
  },
}));

describe('PolarAreaChart glow styling', () => {
  const baseData: ChartData<'polarArea'> = {
    labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
    datasets: [
      {
        data: [65, 72, 58, 74, 61],
      },
    ],
  };

  beforeEach(() => {
    polarMock.mockClear();
  });

  it('adds the polar glow plugin by default', () => {
    render(<PolarAreaChart data={baseData} title="Vehicle Performance" />);

    const props = polarMock.mock.calls[0][0] as { plugins?: Plugin<'polarArea'>[] };
    expect(props.plugins?.some((plugin) => plugin.id === 'ftPolarGlow')).toBe(true);
  });
});
