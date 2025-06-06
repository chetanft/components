import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

// Mock the Icon component since it might have complex dependencies
jest.mock('../Icons', () => ({
  Icon: ({ name, size, className, ...props }: any) => (
    <span 
      data-testid={`icon-${name}`} 
      data-size={size}
      className={className}
      {...props}
    >
      {name}
    </span>
  )
}));

describe('Button Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('renders as button element by default', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Test</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('applies primary variant styles by default', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-dark-100', 'text-white', 'border-dark-100');
    });

    it('applies secondary variant styles', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent', 'text-dark-100', 'border-box-border');
    });

    it('applies destructive variant styles', () => {
      render(<Button variant="destructive">Delete</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-critical', 'text-white', 'border-critical');
    });

    it('applies text variant styles', () => {
      render(<Button variant="text">Text Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent', 'text-dark-100', 'border-transparent');
    });

    it('applies link variant styles', () => {
      render(<Button variant="link">Link Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent', 'text-dark-100', 'border-transparent', 'underline');
    });
  });

  // Size tests
  describe('Sizes', () => {
    it('applies medium size by default', () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-11', 'px-5', 'text-xl');
    });

    it('applies small size styles', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9', 'px-4', 'text-xl');
    });

    it('applies large size styles', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-13', 'px-6', 'text-xl');
    });
  });

  // State tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-disabled');
    });

    it('handles loading state', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(screen.getByTestId('icon-loading')).toBeInTheDocument();
    });

    it('shows loading icon when loading', () => {
      render(<Button loading>Loading</Button>);
      const loadingIcon = screen.getByTestId('icon-loading');
      expect(loadingIcon).toHaveClass('animate-spin');
    });
  });

  // Icon tests
  describe('Icons', () => {
    it('renders leading icon', () => {
      render(<Button icon="add" iconPosition="leading">Add Item</Button>);
      const icon = screen.getByTestId('icon-add');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders trailing icon', () => {
      render(<Button icon="chevron-right" iconPosition="trailing">Next</Button>);
      const icon = screen.getByTestId('icon-chevron-right');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders icon-only button', () => {
      render(<Button icon="add" iconPosition="only" aria-label="Add item" />);
      const button = screen.getByRole('button', { name: 'Add item' });
      const icon = screen.getByTestId('icon-add');
      expect(button).toHaveClass('w-11', 'px-0'); // Icon-only styling
      expect(icon).toBeInTheDocument();
      expect(screen.queryByText('Add item')).not.toBeInTheDocument(); // No text content
    });

    it('sizes icons correctly for different button sizes', () => {
      const { rerender } = render(<Button size="sm" icon="add">Small</Button>);
      expect(screen.getByTestId('icon-add')).toHaveAttribute('data-size', '16');

      rerender(<Button size="md" icon="add">Medium</Button>);
      expect(screen.getByTestId('icon-add')).toHaveAttribute('data-size', '20');

      rerender(<Button size="lg" icon="add">Large</Button>);
      expect(screen.getByTestId('icon-add')).toHaveAttribute('data-size', '24');
    });
  });

  // Event handling tests
  describe('Event Handling', () => {
    it('handles click events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger click when disabled', () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not trigger click when loading', () => {
      const handleClick = jest.fn();
      render(<Button loading onClick={handleClick}>Loading</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Custom props tests
  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('supports custom type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });
}); 