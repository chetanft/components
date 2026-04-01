import React from 'react';
import { render } from '@testing-library/react';
import type { ChartData, ChartOptions, Plugin } from 'chart.js';
import { ScatterChart } from './ScatterChart';

const scatterMock = jest.fn(() => <div data-testid="scatter-chart-mock" />);

jest.mock('react-chartjs-2', () => ({
  Scatter: (props: { data: ChartData<'scatter'>; options: ChartOptions<'scatter'>; plugins?: Plugin<'scatter'>[] }) => {
    scatterMock(props);
    return <div data-testid="scatter-chart-mock" />;
  },
}));

describe('ScatterChart highlight styling', () => {
  const baseData: ChartData<'scatter'> = {
    datasets: [
      {
        label: 'Sales',
        data: [
          { x: 10, y: 120 },
          { x: 20, y: 250 },
          { x: 30, y: 380 },
          { x: 40, y: 520 },
        ],
      },
    ],
  };

  beforeEach(() => {
    scatterMock.mockClear();
  });

  it('uses a darker default point color for non-highlighted datasets', () => {
    render(<ScatterChart data={baseData} title="Sales Report" />);

    const props = scatterMock.mock.calls[0][0] as {
      data: ChartData<'scatter'>;
    };

    expect(props.data.datasets[0].backgroundColor).toBe('#2E8484');
    expect(props.data.datasets[0].borderColor).toBe('#2E8484');
  });

  it('splits highlighted points into a focus layer with glow', () => {
    render(
      <ScatterChart
        data={baseData}
        title="Sales Report"
        highlightedPoints={[{ datasetIndex: 0, pointIndex: 1 }, { datasetIndex: 0, pointIndex: 3 }]}
      />
    );

    const props = scatterMock.mock.calls[0][0] as {
      data: ChartData<'scatter'>;
      plugins?: Plugin<'scatter'>[];
    };

    expect(props.data.datasets).toHaveLength(2);
    expect(props.data.datasets[0].data).toHaveLength(2);
    expect(props.data.datasets[1].data).toHaveLength(2);
    expect(props.data.datasets[1].pointRadius).toBe(8);
    expect(props.data.datasets[0].pointRadius).toBe(5);
    expect((props.data.datasets[1] as { ftGlow?: boolean }).ftGlow).toBe(true);
    expect(props.plugins?.some((plugin) => plugin.id === 'ftScatterGlow')).toBe(true);
  });

  it('marks every highlighted layer for glow across multiple datasets', () => {
    render(
      <ScatterChart
        data={{
          datasets: [
            {
              label: 'A',
              data: [{ x: 1, y: 1 }, { x: 2, y: 2 }],
            },
            {
              label: 'B',
              data: [{ x: 3, y: 3 }, { x: 4, y: 4 }],
            },
          ],
        }}
        highlightedPoints={[
          { datasetIndex: 0, pointIndex: 1 },
          { datasetIndex: 1, pointIndex: 0 },
        ]}
      />
    );

    const props = scatterMock.mock.calls[0][0] as {
      data: ChartData<'scatter'>;
    };

    const glowLayers = props.data.datasets.filter((dataset) => (dataset as { ftGlow?: boolean }).ftGlow);
    expect(glowLayers).toHaveLength(2);
  });
});
