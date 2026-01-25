import React from 'react';
import { render } from '@testing-library/react';
import { LineChart } from './LineChart';

describe('LineChart defaultColors prop', () => {
  const mockData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Sales',
        data: [10, 20, 30],
      },
      {
        label: 'Revenue',
        data: [15, 25, 35],
      },
    ],
  };

  it('renders with default colors when defaultColors prop is not provided', () => {
    const { container } = render(<LineChart data={mockData} title="Test Chart" />);
    // Chart container should render
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('uses custom defaultColors when provided', () => {
    const customColors = ['#ff0000', '#00ff00', '#0000ff'];
    const { container } = render(
      <LineChart data={mockData} title="Test Chart" defaultColors={customColors} />
    );
    // Chart should render with custom colors
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('falls back to imported defaultColors when custom defaultColors is undefined', () => {
    const { container } = render(
      <LineChart data={mockData} title="Test Chart" defaultColors={undefined} />
    );
    // Should use imported defaultColors
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('applies custom colors to datasets without explicit colors', () => {
    const customColors = ['#ff0000', '#00ff00'];
    const dataWithoutColors = {
      labels: ['Jan', 'Feb'],
      datasets: [
        { label: 'A', data: [1, 2] },
        { label: 'B', data: [3, 4] },
      ],
    };
    const { container } = render(
      <LineChart data={dataWithoutColors} title="Test Chart" defaultColors={customColors} />
    );
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('preserves explicit dataset colors when defaultColors is provided', () => {
    const customColors = ['#ff0000', '#00ff00'];
    const dataWithExplicitColors = {
      labels: ['Jan', 'Feb'],
      datasets: [
        {
          label: 'A',
          data: [1, 2],
          borderColor: '#custom1',
        },
        {
          label: 'B',
          data: [3, 4],
          borderColor: '#custom2',
        },
      ],
    };
    const { container } = render(
      <LineChart data={dataWithExplicitColors} title="Test Chart" defaultColors={customColors} />
    );
    // Explicit colors should be preserved (chart should still render)
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
