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
      expect(badge).toHaveClass('bg-[#F0F1F7]', 'text-[#434F64]');
    });

    it('applies danger variant styles', () => {
      render(<Badge variant="danger">Error</Badge>);
      const badge = screen.getByText('Error');
      expect(badge).toHaveClass('bg-[#FFEAEA]', 'text-[#FF3533]');
    });

    it('applies success variant styles', () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText('Success');
      expect(badge).toHaveClass('bg-[#DFFFE8]', 'text-[#00763D]');
    });

    it('applies warning variant styles', () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText('Warning');
      expect(badge).toHaveClass('bg-[#FFEBDC]', 'text-[#FF6C19]');
    });

    it('applies neutral variant styles', () => {
      render(<Badge variant="neutral">Info</Badge>);
      const badge = screen.getByText('Info');
      expect(badge).toHaveClass('bg-[#ECF6FF]', 'text-[#1890FF]');
    });
  });

  describe('Icons', () => {
    it('renders leading icon when provided', () => {
      render(<Badge leadingIcon="add">With Icon</Badge>);
      expect(screen.getByTestId('icon-add')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('renders trailing icon when provided', () => {
      render(<Badge trailingIcon="chevron-right">With Icon</Badge>);
      expect(screen.getByTestId('icon-chevron-right')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('renders both leading and trailing icons', () => {
      render(<Badge leadingIcon="add" trailingIcon="chevron-right">Label</Badge>);
      expect(screen.getByTestId('icon-add')).toBeInTheDocument();
      expect(screen.getByTestId('icon-chevron-right')).toBeInTheDocument();
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('sizes icon correctly', () => {
      render(<Badge leadingIcon="add">Badge</Badge>);
      const icon = screen.getByTestId('icon-add');
      expect(icon).toHaveAttribute('data-size', '14');
    });

    it('renders without icons when not provided', () => {
      render(<Badge>No Icon</Badge>);
      expect(screen.queryByTestId(/icon-/)).not.toBeInTheDocument();
      expect(screen.getByText('No Icon')).toBeInTheDocument();
    });
  });

  describe('Interactive States', () => {
    it('applies interactive styles when interaction prop is true', () => {
      render(<Badge interaction>Interactive</Badge>);
      const badge = screen.getByText('Interactive');
      expect(badge).toHaveClass('border', 'border-[#CED1D7]');
    });

    it('applies interactive styles when onClick is provided', () => {
      const handleClick = jest.fn();
      render(<Badge onClick={handleClick}>Clickable</Badge>);
      const badge = screen.getByText('Clickable');
      expect(badge).toHaveClass('border', 'border-[#CED1D7]');
    });

    it('applies interactive styles when onMouseEnter is provided', () => {
      const handleMouseEnter = jest.fn();
      render(<Badge onMouseEnter={handleMouseEnter}>Hoverable</Badge>);
      const badge = screen.getByText('Hoverable');
      expect(badge).toHaveClass('border', 'border-[#CED1D7]');
    });

    it('applies interactive styles when onFocus is provided', () => {
      const handleFocus = jest.fn();
      render(<Badge onFocus={handleFocus}>Focusable</Badge>);
      const badge = screen.getByText('Focusable');
      expect(badge).toHaveClass('border', 'border-[#CED1D7]');
    });

    it('applies correct border color for danger variant when interactive', () => {
      render(<Badge variant="danger" interaction>Danger</Badge>);
      const badge = screen.getByText('Danger');
      expect(badge).toHaveClass('border', 'border-[#FF3533]');
    });

    it('does not apply interactive styles by default', () => {
      render(<Badge>Static</Badge>);
      const badge = screen.getByText('Static');
      expect(badge).not.toHaveClass('border');
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
          leadingIcon="add"
          trailingIcon="chevron-right"
          interaction
          onClick={handleClick}
          className="custom-class"
        >
          Complete
        </Badge>
      );
      
      const badge = screen.getByText('Complete');
      expect(badge).toHaveClass(
        'bg-[#DFFFE8]',
        'text-[#00763D]',
        'px-[8px]',
        'py-[2px]',
        'border',
        'border-[#00763D]',
        'custom-class'
      );
      expect(screen.getByTestId('icon-add')).toBeInTheDocument();
      expect(screen.getByTestId('icon-chevron-right')).toBeInTheDocument();
      
      fireEvent.click(badge);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders correctly with only leading icon and minimal text', () => {
      render(<Badge leadingIcon="add"> </Badge>);
      expect(screen.getByTestId('icon-add')).toBeInTheDocument();
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

  describe('Styling', () => {
    it('uses exact Figma colors for styling', () => {
      render(<Badge variant="danger">Error Badge</Badge>);
      const badge = screen.getByText('Error Badge');
      
      // Check that exact Figma color classes are applied
      expect(badge.className).toContain('bg-[#FFEAEA]');
      expect(badge.className).toContain('text-[#FF3533]');
    });

    it('applies correct base styling from Figma', () => {
      render(<Badge>Badge</Badge>);
      const badge = screen.getByText('Badge');
      
      // Check base styles from Figma design
      expect(badge).toHaveClass('px-[8px]', 'py-[2px]', 'gap-[8px]', 'rounded-[4px]');
    });
  });
}); 