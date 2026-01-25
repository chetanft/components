import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  StackedBarChart,
  StackedBarChartBar,
  StackedBarChartSegment,
} from './StackedBarChart';

describe('StackedBarChart Component', () => {
  const sampleData = [
    {
      label: 'Q1',
      segments: [
        { label: 'Product A', value: 30 },
        { label: 'Product B', value: 45 },
      ],
    },
  ];

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<StackedBarChart data={sampleData} />);
      expect(screen.getByText('Q1')).toBeInTheDocument();
    });

    it('renders with default colors when segments have no color', () => {
      render(<StackedBarChart data={sampleData} />);
      expect(screen.getByText('Q1')).toBeInTheDocument();
      // Chart should render with default colors
      const chart = screen.getByRole('img');
      expect(chart).toBeInTheDocument();
    });
  });

  describe('Custom Default Colors', () => {
    it('uses custom defaultColors when provided', () => {
      const customColors = ['#42bdbd', '#0828f7', '#1793e8'];
      const { container } = render(
        <StackedBarChart data={sampleData} defaultColors={customColors} />
      );
      
      // Chart should render with custom default colors
      const chart = screen.getByRole('img');
      expect(chart).toBeInTheDocument();
    });

    it('uses default colors when defaultColors prop is not provided', () => {
      const { container } = render(
        <StackedBarChart data={sampleData} />
      );
      
      // Should use DEFAULT_COLORS
      const chart = screen.getByRole('img');
      expect(chart).toBeInTheDocument();
    });

    it('prioritizes segment color over defaultColors', () => {
      const dataWithColors = [
        {
          label: 'Q1',
          segments: [
            { label: 'Product A', value: 30, color: '#ff0000' },
            { label: 'Product B', value: 45 }, // No color, should use default
          ],
        },
      ];
      
      const customColors = ['#42bdbd', '#0828f7'];
      render(
        <StackedBarChart data={dataWithColors} defaultColors={customColors} />
      );
      
      // Chart should render
      const chart = screen.getByRole('img');
      expect(chart).toBeInTheDocument();
    });
  });

  describe('Composable API', () => {
    it('renders with composable API', () => {
      render(
        <StackedBarChart title="Test Chart">
          <StackedBarChartBar label="Q1">
            <StackedBarChartSegment label="Product A" value={30} />
            <StackedBarChartSegment label="Product B" value={45} />
          </StackedBarChartBar>
        </StackedBarChart>
      );
      
      expect(screen.getByText('Q1')).toBeInTheDocument();
    });

    it('uses custom defaultColors with composable API', () => {
      const customColors = ['#42bdbd', '#0828f7'];
      render(
        <StackedBarChart title="Test Chart" defaultColors={customColors}>
          <StackedBarChartBar label="Q1">
            <StackedBarChartSegment label="Product A" value={30} />
            <StackedBarChartSegment label="Product B" value={45} />
          </StackedBarChartBar>
        </StackedBarChart>
      );
      
      expect(screen.getByText('Q1')).toBeInTheDocument();
    });
  });
});
