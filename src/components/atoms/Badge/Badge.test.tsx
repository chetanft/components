import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge } from './Badge';

// Mock the Icon component
jest.mock('../Icons', () => ({
  Icon: ({ name, size }: any) => (
    <span data-testid={`icon-${name}`} data-size={size}>
      {name}
    </span>
  )
}));

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Badge ref={ref}>Test</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('renders as div element', () => {
      render(<Badge>Test</Badge>);
      const badge = screen.getByText('Test');
      expect(badge.tagName).toBe('DIV');
    });
  });

  describe('Variants', () => {
    it('applies normal variant by default', () => {
      render(<Badge>Normal</Badge>);
      const badge = screen.getByText('Normal');
      expect(badge).toHaveClass('bg-[var(--badge-normal-bg)]', 'text-[var(--badge-normal-text)]');
    });

    it('applies danger variant styles', () => {
      render(<Badge variant="danger">Error</Badge>);
      const badge = screen.getByText('Error');
      expect(badge).toHaveClass('bg-[var(--badge-danger-bg)]', 'text-[var(--badge-danger-text)]');
    });

    it('applies success variant styles', () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText('Success');
      expect(badge).toHaveClass('bg-[var(--badge-success-bg)]', 'text-[var(--badge-success-text)]');
    });

    it('applies warning variant styles', () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText('Warning');
      expect(badge).toHaveClass('bg-[var(--badge-warning-bg)]', 'text-[var(--badge-warning-text)]');
    });

    it('applies neutral variant styles', () => {
      render(<Badge variant="neutral">Info</Badge>);
      const badge = screen.getByText('Info');
      expect(badge).toHaveClass('bg-[var(--badge-neutral-bg)]', 'text-[var(--badge-neutral-text)]');
    });
  });

  describe('Sizes', () => {
    it('applies medium size by default', () => {
      render(<Badge>Medium</Badge>);
      const badge = screen.getByText('Medium');
      expect(badge).toHaveClass('px-[8px]', 'py-[2px]', 'gap-[8px]');
    });

    it('applies small size styles', () => {
      render(<Badge size="sm">Small</Badge>);
      const badge = screen.getByText('Small');
      expect(badge).toHaveClass('px-[6px]', 'py-[1px]', 'gap-[6px]', 'text-[12px]');
    });
  });

  describe('Icons', () => {
    it('renders icon when provided', () => {
      render(<Badge icon="check">With Icon</Badge>);
      expect(screen.getByTestId('icon-check')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('sizes icon correctly for medium badge', () => {
      render(<Badge icon="check" size="md">Medium Badge</Badge>);
      const icon = screen.getByTestId('icon-check');
      expect(icon).toHaveAttribute('data-size', '14');
    });

    it('sizes icon correctly for small badge', () => {
      render(<Badge icon="check" size="sm">Small Badge</Badge>);
      const icon = screen.getByTestId('icon-check');
      expect(icon).toHaveAttribute('data-size', '12');
    });

    it('renders without icon when not provided', () => {
      render(<Badge>No Icon</Badge>);
      expect(screen.queryByTestId(/icon-/)).not.toBeInTheDocument();
      expect(screen.getByText('No Icon')).toBeInTheDocument();
    });
  });

  describe('Interactive States', () => {
    it('applies interactive styles when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<Badge onClick={handleClick}>Clickable</Badge>);
      const badge = screen.getByText('Clickable');
      expect(badge).toHaveClass('border-[var(--badge-normal-border)]');
    });

    it('applies interactive styles when onMouseEnter is provided', () => {
      const handleMouseEnter = jest.fn();
      render(<Badge onMouseEnter={handleMouseEnter}>Hoverable</Badge>);
      const badge = screen.getByText('Hoverable');
      expect(badge).toHaveClass('border-[var(--badge-normal-border)]');
    });

    it('applies interactive styles when onFocus is provided', () => {
      const handleFocus = jest.fn();
      render(<Badge onFocus={handleFocus}>Focusable</Badge>);
      const badge = screen.getByText('Focusable');
      expect(badge).toHaveClass('border-[var(--badge-normal-border)]');
    });

    it('does not apply interactive styles by default', () => {
      render(<Badge>Static</Badge>);
      const badge = screen.getByText('Static');
      expect(badge).not.toHaveClass('border-[var(--badge-normal-border)]');
    });
  });

  describe('Event Handling', () => {
    it('handles click events', () => {
      const handleClick = jest.fn();
      render(<Badge onClick={handleClick}>Clickable</Badge>);
      
      fireEvent.click(screen.getByText('Clickable'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles mouse enter events', () => {
      const handleMouseEnter = jest.fn();
      render(<Badge onMouseEnter={handleMouseEnter}>Hoverable</Badge>);
      
      fireEvent.mouseEnter(screen.getByText('Hoverable'));
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('handles focus events', () => {
      const handleFocus = jest.fn();
      render(<Badge onFocus={handleFocus}>Focusable</Badge>);
      
      fireEvent.focus(screen.getByText('Focusable'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events', () => {
      const handleKeyDown = jest.fn();
      render(<Badge onKeyDown={handleKeyDown}>Keyboard</Badge>);
      
      fireEvent.keyDown(screen.getByText('Keyboard'), { key: 'Enter' });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('has proper base styles for accessibility', () => {
      render(<Badge>Accessible</Badge>);
      const badge = screen.getByText('Accessible');
      expect(badge).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    it('applies custom className', () => {
      render(<Badge className="custom-class">Custom</Badge>);
      const badge = screen.getByText('Custom');
      expect(badge).toHaveClass('custom-class');
    });

    it('passes through additional HTML attributes', () => {
      render(<Badge data-testid="custom-badge" title="Tooltip">Custom</Badge>);
      const badge = screen.getByTestId('custom-badge');
      expect(badge).toHaveAttribute('title', 'Tooltip');
    });

    it('supports ARIA attributes', () => {
      render(<Badge aria-label="Status badge" role="status">Active</Badge>);
      const badge = screen.getByText('Active');
      expect(badge).toHaveAttribute('aria-label', 'Status badge');
      expect(badge).toHaveAttribute('role', 'status');
    });
  });

  describe('Integration', () => {
    it('combines multiple props correctly', () => {
      const handleClick = jest.fn();
      render(
        <Badge 
          variant="success" 
          size="sm" 
          icon="check"
          onClick={handleClick}
          className="custom-class"
        >
          Complete
        </Badge>
      );
      
      const badge = screen.getByText('Complete');
      expect(badge).toHaveClass(
        'bg-[var(--badge-success-bg)]',
        'text-[var(--badge-success-text)]',
        'px-[6px]',
        'py-[1px]',
        'text-[12px]',
        'custom-class'
      );
      expect(screen.getByTestId('icon-check')).toBeInTheDocument();
      
      fireEvent.click(badge);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders correctly with only icon and no text', () => {
      render(<Badge icon="check"> </Badge>);
      expect(screen.getByTestId('icon-check')).toBeInTheDocument();
      // Badge should still render even with minimal content
    });

    it('renders correctly with complex children', () => {
      render(
        <Badge variant="warning">
          <span>Complex</span> Content
        </Badge>
      );
      
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('CSS Variables', () => {
    it('uses CSS variables for styling', () => {
      render(<Badge variant="danger">Error Badge</Badge>);
      const badge = screen.getByText('Error Badge');
      
      // Check that CSS variable classes are applied
      expect(badge.className).toContain('bg-[var(--badge-danger-bg)]');
      expect(badge.className).toContain('text-[var(--badge-danger-text)]');
    });

    it('uses design token classes for base styling', () => {
      render(<Badge>Token Badge</Badge>);
      const badge = screen.getByText('Token Badge');
      
      expect(badge.className).toContain('font-[var(--badge-font-weight)]');
      // Font size is applied via the size-specific styles, not the base styles
      expect(badge).toHaveClass('px-[8px]', 'py-[2px]'); // Medium size styles are applied
    });
  });
}); 