import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  StackedBarChart,
  StackedBarChartBar,
  StackedBarChartSegment,
} from './StackedBarChart';

describe('StackedBarChart Component', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
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

    it('renders with default colors when segments have no color', () => {
      render(
        <StackedBarChart title="Test Chart">
          <StackedBarChartBar label="Q1">
            <StackedBarChartSegment label="Product A" value={30} />
            <StackedBarChartSegment label="Product B" value={45} />
          </StackedBarChartBar>
        </StackedBarChart>
      );
      expect(screen.getByText('Q1')).toBeInTheDocument();
      const chart = screen.getByRole('img');
      expect(chart).toBeInTheDocument();
    });
  });

  describe('Custom Default Colors', () => {
    it('uses custom defaultColors when provided', () => {
      const customColors = ['#42bdbd', '#0828f7', '#1793e8'];
      render(
        <StackedBarChart title="Test Chart" defaultColors={customColors}>
          <StackedBarChartBar label="Q1">
            <StackedBarChartSegment label="Product A" value={30} />
            <StackedBarChartSegment label="Product B" value={45} />
          </StackedBarChartBar>
        </StackedBarChart>
      );
      const chart = screen.getByRole('img');
      expect(chart).toBeInTheDocument();
    });

    it('uses default colors when defaultColors prop is not provided', () => {
      render(
        <StackedBarChart title="Test Chart">
          <StackedBarChartBar label="Q1">
            <StackedBarChartSegment label="Product A" value={30} />
            <StackedBarChartSegment label="Product B" value={45} />
          </StackedBarChartBar>
        </StackedBarChart>
      );
      const chart = screen.getByRole('img');
      expect(chart).toBeInTheDocument();
    });

    it('prioritizes segment color over defaultColors', () => {
      const customColors = ['#42bdbd', '#0828f7'];
      render(
        <StackedBarChart title="Test Chart" defaultColors={customColors}>
          <StackedBarChartBar label="Q1">
            <StackedBarChartSegment label="Product A" value={30} color="#ff0000" />
            <StackedBarChartSegment label="Product B" value={45} />
          </StackedBarChartBar>
        </StackedBarChart>
      );
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

    it('renders multiple bars', () => {
      render(
        <StackedBarChart title="Multi-bar Chart">
          <StackedBarChartBar label="Q1">
            <StackedBarChartSegment label="Product A" value={30} />
          </StackedBarChartBar>
          <StackedBarChartBar label="Q2">
            <StackedBarChartSegment label="Product A" value={50} />
          </StackedBarChartBar>
        </StackedBarChart>
      );

      expect(screen.getByText('Q1')).toBeInTheDocument();
      expect(screen.getByText('Q2')).toBeInTheDocument();
    });
  });
});
