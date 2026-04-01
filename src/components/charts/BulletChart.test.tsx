import React from 'react';
import { render } from '@testing-library/react';
import type { ChartData, ChartOptions, Plugin } from 'chart.js';
import { BulletChart } from './BulletChart';

const barMock = jest.fn(() => <div data-testid="bullet-chart-mock" />);

jest.mock('react-chartjs-2', () => ({
  Bar: (props: { data: ChartData<'bar'>; options: ChartOptions<'bar'>; plugins?: Plugin<'bar'>[] }) => {
    barMock(props);
    return <div data-testid="bullet-chart-mock" />;
  },
}));

describe('BulletChart styling', () => {
  beforeEach(() => {
    barMock.mockClear();
  });

  it('renders qualitative ranges with an overlaid measure and a target marker plugin', () => {
    render(
      <BulletChart
        title="Sales Performance"
        label="Revenue"
        current={72}
        target={80}
        ranges={[50, 75, 100]}
        height={120}
      />
    );

    const props = barMock.mock.calls[0][0] as {
      data: ChartData<'bar'>;
      options: ChartOptions<'bar'>;
      plugins?: Plugin<'bar'>[];
    };

    expect(props.data.datasets).toHaveLength(4);
    expect(props.data.datasets[0].label).toBe('Poor');
    expect(props.data.datasets[1].label).toBe('Average');
    expect(props.data.datasets[2].label).toBe('Excellent');
    expect(props.data.datasets[3].label).toBe('Current');
    expect(props.data.datasets[0].backgroundColor).toBe('#f0f1f7');
    expect(props.data.datasets[1].backgroundColor).toBe('rgba(206, 209, 215, 0.72)');
    expect(props.data.datasets[2].backgroundColor).toBe('rgba(0, 198, 55, 0.24)');
    expect(props.data.datasets[3].backgroundColor).toBe('#434f64');
    expect(props.data.datasets[3].grouped).toBe(false);
    expect(props.data.datasets[3].barThickness).toBe(12);
    expect(props.options.scales?.x?.max).toBe(100);
    expect(props.plugins?.some((plugin) => plugin.id === 'ftBulletTargetMarker')).toBe(true);
  });
});
