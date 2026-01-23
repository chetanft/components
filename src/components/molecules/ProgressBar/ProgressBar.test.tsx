import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar Component', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<ProgressBar />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
    });

    it('renders with default props', () => {
      render(<ProgressBar />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('renders with custom value', () => {
      render(<ProgressBar value={75} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('clamps value below 0', () => {
      render(<ProgressBar value={-10} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('clamps value above 100', () => {
      render(<ProgressBar value={150} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '100');
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('rounds decimal values', () => {
      render(<ProgressBar value={66.7} />);
      expect(screen.getByText('67%')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies primary variant by default', () => {
      render(<ProgressBar value={50} />);
      const progressFill = screen.getByRole('progressbar');
      expect(progressFill).toHaveStyle({ backgroundColor: 'var(--primary)' });
    });

    it('applies success variant', () => {
      render(<ProgressBar value={50} variant="success" />);
      const progressFill = screen.getByRole('progressbar');
      expect(progressFill).toHaveStyle({ backgroundColor: 'var(--positive)' });
    });

    it('applies warning variant', () => {
      render(<ProgressBar value={50} variant="warning" />);
      const progressFill = screen.getByRole('progressbar');
      expect(progressFill).toHaveStyle({ backgroundColor: 'var(--warning)' });
    });

    it('applies danger variant', () => {
      render(<ProgressBar value={50} variant="danger" />);
      const progressFill = screen.getByRole('progressbar');
      expect(progressFill).toHaveStyle({ backgroundColor: 'var(--critical)' });
    });
  });

  describe('Sizes', () => {
    it('applies medium size by default', () => {
      const { container } = render(<ProgressBar />);
      const progressContainer = container.querySelector('.h-\\[8px\\]');
      expect(progressContainer).toBeInTheDocument();
    });

    it('applies small size', () => {
      const { container } = render(<ProgressBar size="sm" />);
      const progressContainer = container.querySelector('.h-\\[4px\\]');
      expect(progressContainer).toBeInTheDocument();
    });

    it('applies large size', () => {
      const { container } = render(<ProgressBar size="lg" />);
      const progressContainer = container.querySelector('.h-\\[12px\\]');
      expect(progressContainer).toBeInTheDocument();
    });
  });

  describe('Percentage Display', () => {
    it('shows percentage by default', () => {
      render(<ProgressBar value={42} />);
      expect(screen.getByText('42%')).toBeInTheDocument();
    });

    it('hides percentage when showPercentage is false', () => {
      render(<ProgressBar value={42} showPercentage={false} />);
      expect(screen.queryByText('42%')).not.toBeInTheDocument();
    });

    it('applies correct text styling for percentage', () => {
      render(<ProgressBar value={42} />);
      const percentageText = screen.getByText('42%');
      expect(percentageText).toHaveClass('font-medium', 'text-[var(--tertiary)]');
    });
  });

  describe('Animation', () => {
    it('does not apply animation by default', () => {
      const { container } = render(<ProgressBar value={50} />);
      const progressFill = container.querySelector('.transition-all');
      expect(progressFill).not.toBeInTheDocument();
    });

    it('applies animation when animated is true', () => {
      const { container } = render(<ProgressBar value={50} animated />);
      const progressFill = container.querySelector('.transition-all');
      expect(progressFill).toBeInTheDocument();
      expect(progressFill).toHaveClass('duration-300', 'ease-out');
    });
  });

  describe('Progress Fill Width', () => {
    it('sets correct width for progress fill', () => {
      const { container } = render(<ProgressBar value={60} />);
      const progressFill = container.querySelector('[role="progressbar"]');
      expect(progressFill).toHaveStyle({ width: '60%' });
    });

    it('sets 0% width for zero value', () => {
      const { container } = render(<ProgressBar value={0} />);
      const progressFill = container.querySelector('[role="progressbar"]');
      expect(progressFill).toHaveStyle({ width: '0%' });
    });

    it('sets 100% width for maximum value', () => {
      const { container } = render(<ProgressBar value={100} />);
      const progressFill = container.querySelector('[role="progressbar"]');
      expect(progressFill).toHaveStyle({ width: '100%' });
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<ProgressBar value={75} />);
      const progressbar = screen.getByRole('progressbar');
      
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
      expect(progressbar).toHaveAttribute('aria-valuemin', '0');
      expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    });

    it('updates ARIA attributes when value changes', () => {
      const { rerender } = render(<ProgressBar value={25} />);
      let progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '25');

      rerender(<ProgressBar value={75} />);
      progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
    });

    it('has correct role', () => {
      render(<ProgressBar />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      const { container } = render(<ProgressBar className="custom-progress" />);
      const progressContainer = container.querySelector('.custom-progress');
      expect(progressContainer).toBeInTheDocument();
    });

    it('combines custom className with component classes', () => {
      const { container } = render(<ProgressBar className="custom-class" />);
      const progressContainer = container.querySelector('.custom-class');
      expect(progressContainer).toHaveClass('relative', 'w-full', 'overflow-hidden');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards ref to container element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ProgressBar ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('passes through HTML attributes', () => {
      render(<ProgressBar data-testid="progress" id="my-progress" />);
      const container = screen.getByTestId('progress');
      expect(container).toHaveAttribute('id', 'my-progress');
    });

    it('supports custom event handlers', () => {
      const handleClick = jest.fn();
      render(<ProgressBar onClick={handleClick} />);
      
      const container = screen.getByRole('progressbar').closest('div');
      container?.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Design System Compliance', () => {
    it('uses correct background color from design tokens', () => {
      const { container } = render(<ProgressBar />);
      const progressContainer = container.querySelector('.overflow-hidden');
      expect(progressContainer).toHaveStyle({ backgroundColor: 'var(--border-primary)' });
    });

    it('uses correct border radius', () => {
      const { container } = render(<ProgressBar />);
      const progressContainer = container.querySelector('.rounded-\\[var\\(--radius-md\\)\\]');
      const progressFill = container.querySelector('.rounded-\\[var\\(--radius-md\\)\\]');
      
      expect(progressContainer).toBeInTheDocument();
      expect(progressFill).toBeInTheDocument();
    });

    it('maintains consistent spacing', () => {
      const { container } = render(<ProgressBar />);
      const wrapper = container.firstChild as HTMLElement | null;
      expect(wrapper).toHaveClass('gap-[var(--x5,20px)]');
    });

    it('uses proper typography for percentage', () => {
      render(<ProgressBar value={50} />);
      const percentageText = screen.getByText('50%');
      expect(percentageText).toHaveClass('font-medium', 'leading-[1.4]');
    });

    it('applies overflow hidden to container', () => {
      const { container } = render(<ProgressBar />);
      const progressContainer = container.querySelector('.overflow-hidden');
      expect(progressContainer).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined value gracefully', () => {
      render(<ProgressBar value={undefined} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    });

    it('handles null value gracefully', () => {
      render(<ProgressBar value={null as any} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    });

    it('handles NaN value gracefully', () => {
      render(<ProgressBar value={NaN} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    });

    it('handles very large numbers', () => {
      render(<ProgressBar value={9999} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '100');
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('handles very small negative numbers', () => {
      render(<ProgressBar value={-9999} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '0');
      expect(screen.getByText('0%')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders efficiently with multiple re-renders', () => {
      const { rerender } = render(<ProgressBar value={0} />);
      
      for (let i = 1; i <= 100; i += 10) {
        rerender(<ProgressBar value={i} />);
        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).toHaveAttribute('aria-valuenow', i.toString());
      }
    });
  });
}); 
