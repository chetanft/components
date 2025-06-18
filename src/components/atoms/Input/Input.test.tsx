import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

// Mock the Icon component
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

describe('Input Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders input element correctly', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Email" placeholder="Enter email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Input helperText="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Input error="Invalid email format" />);
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('prioritizes error over helper text', () => {
      render(<Input error="Error message" helperText="Helper text" />);
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });
  });

  // Size variants
  describe('Size Variants', () => {
    it('applies small size correctly', () => {
      render(<Input size="sm" placeholder="Small input" />);
      const input = screen.getByPlaceholderText('Small input');
      expect(input).toHaveClass('h-component-sm', 'px-3', 'py-2');
    });

    it('applies medium size correctly (default)', () => {
      render(<Input placeholder="Medium input" />);
      const input = screen.getByPlaceholderText('Medium input');
      expect(input).toHaveClass('h-component-md', 'px-4', 'py-3');
    });

    it('applies large size classes', () => {
      render(<Input size="lg" placeholder="Large input" />);
      const input = screen.getByPlaceholderText('Large input');
      expect(input).toHaveClass('h-component-lg', 'px-5', 'py-4');
    });
  });

  // Variant styles
  describe('Variant Styles', () => {
    it('applies default variant styles', () => {
      render(<Input variant="default" placeholder="Default input" />);
      const input = screen.getByPlaceholderText('Default input');
      expect(input).toHaveClass('bg-surface', 'border-2', 'border-border');
    });

    it('applies filled variant styles', () => {
      render(<Input variant="filled" placeholder="Filled input" />);
      const input = screen.getByPlaceholderText('Filled input');
      expect(input).toHaveClass('bg-surface-alt', 'border-2', 'border-transparent');
    });

    it('applies outlined variant styles', () => {
      render(<Input variant="outlined" placeholder="Outlined input" />);
      const input = screen.getByPlaceholderText('Outlined input');
      expect(input).toHaveClass('bg-transparent', 'border', 'border-border');
    });
  });

  // State handling
  describe('State Handling', () => {
    it('handles disabled state correctly', () => {
      render(<Input disabled placeholder="Disabled input" />);
      const input = screen.getByPlaceholderText('Disabled input');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('cursor-not-allowed', 'text-neutral-400');
    });

    it('handles error state correctly', () => {
      render(<Input error="Error message" placeholder="Error input" />);
      const input = screen.getByPlaceholderText('Error input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveClass('border-critical');
    });

    it('handles focus state', () => {
      render(<Input placeholder="Focus input" />);
      const input = screen.getByPlaceholderText('Focus input');
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  // Icon rendering
  describe('Icon Rendering', () => {
    it('renders leading icon correctly', () => {
      render(<Input leadingIcon="search" placeholder="Search" />);
      expect(screen.getByTestId('icon-search')).toBeInTheDocument();
      const input = screen.getByPlaceholderText('Search');
      expect(input).toHaveClass('pl-11'); // Medium size padding
    });

    it('renders trailing icon correctly', () => {
      render(<Input trailingIcon="eye-invisible" placeholder="Password" />);
      expect(screen.getByTestId('icon-eye-invisible')).toBeInTheDocument();
      const input = screen.getByPlaceholderText('Password');
      expect(input).toHaveClass('pr-11'); // Medium size padding
    });

    it('renders both leading and trailing icons', () => {
      render(<Input leadingIcon="search" trailingIcon="cross" placeholder="Search" />);
      expect(screen.getByTestId('icon-search')).toBeInTheDocument();
      expect(screen.getByTestId('icon-cross')).toBeInTheDocument();
      const input = screen.getByPlaceholderText('Search');
      expect(input).toHaveClass('pl-11', 'pr-11');
    });

    it('adjusts icon padding based on size', () => {
      render(<Input size="sm" leadingIcon="search" placeholder="Small search" />);
      const input = screen.getByPlaceholderText('Small search');
      expect(input).toHaveClass('pl-9'); // Small size padding
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('generates unique IDs automatically', () => {
      render(<Input label="Email" />);
      const input = screen.getByLabelText('Email');
      const label = screen.getByText('Email');
      expect(input).toHaveAttribute('id');
      expect(label).toHaveAttribute('for', input.getAttribute('id'));
    });

    it('uses provided ID', () => {
      render(<Input id="custom-input" label="Custom" />);
      const input = screen.getByLabelText('Custom');
      expect(input).toHaveAttribute('id', 'custom-input');
    });

    it('connects error message with aria-describedby', () => {
      render(<Input error="Error message" placeholder="Error input" />);
      const input = screen.getByPlaceholderText('Error input');
      const errorMessage = screen.getByRole('alert');
      expect(input).toHaveAttribute('aria-describedby', errorMessage.getAttribute('id'));
    });

    it('connects helper text with aria-describedby', () => {
      render(<Input helperText="Helper text" placeholder="Helper input" />);
      const input = screen.getByPlaceholderText('Helper input');
      const helperText = screen.getByText('Helper text');
      expect(input).toHaveAttribute('aria-describedby', helperText.getAttribute('id'));
    });

    it('combines multiple aria-describedby values', () => {
      render(<Input error="Error" aria-describedby="external-description" placeholder="Complex input" />);
      const input = screen.getByPlaceholderText('Complex input');
      const describedBy = input.getAttribute('aria-describedby');
      expect(describedBy).toContain('external-description');
      expect(describedBy).toContain('error');
    });

    it('sets aria-hidden on icons', () => {
      render(<Input leadingIcon="search" placeholder="Search" />);
      const icon = screen.getByTestId('icon-search');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // Event handling
  describe('Event Handling', () => {
    it('handles onChange events', () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} placeholder="Change input" />);
      const input = screen.getByPlaceholderText('Change input');
      fireEvent.change(input, { target: { value: 'new value' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('handles onFocus events', () => {
      const handleFocus = jest.fn();
      render(<Input onFocus={handleFocus} placeholder="Focus input" />);
      const input = screen.getByPlaceholderText('Focus input');
      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('handles onBlur events', () => {
      const handleBlur = jest.fn();
      render(<Input onBlur={handleBlur} placeholder="Blur input" />);
      const input = screen.getByPlaceholderText('Blur input');
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  // Dark mode classes
  describe('Dark Mode Support', () => {
    it('includes dark mode classes for default variant', () => {
      render(<Input placeholder="Dark mode input" />);
      const input = screen.getByPlaceholderText('Dark mode input');
      expect(input).toHaveClass('dark:bg-neutral-900', 'dark:border-neutral-700', 'dark:text-neutral-100');
    });

    it('includes dark mode classes for filled variant', () => {
      render(<Input variant="filled" placeholder="Dark filled input" />);
      const input = screen.getByPlaceholderText('Dark filled input');
      expect(input).toHaveClass('dark:bg-neutral-800');
    });

    it('includes dark mode classes for disabled state', () => {
      render(<Input disabled placeholder="Dark disabled input" />);
      const input = screen.getByPlaceholderText('Dark disabled input');
      expect(input).toHaveClass('dark:text-neutral-500');
    });
  });

  // forwardRef functionality
  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} placeholder="Ref input" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByPlaceholderText('Ref input'));
    });
  });

  // Input types
  describe('Input Types', () => {
    it('supports different input types', () => {
      render(<Input type="email" placeholder="Email input" />);
      const input = screen.getByPlaceholderText('Email input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('defaults to text type', () => {
      render(<Input placeholder="Default type" />);
      const input = screen.getByPlaceholderText('Default type');
      expect(input).toHaveAttribute('type', 'text');
    });
  });

  // Custom className
  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      render(<Input className="custom-class" placeholder="Custom input" />);
      const input = screen.getByPlaceholderText('Custom input');
      expect(input).toHaveClass('custom-class');
    });

    it('merges custom className with component classes', () => {
      render(<Input className="custom-class" placeholder="Merged input" />);
      const input = screen.getByPlaceholderText('Merged input');
      expect(input).toHaveClass('custom-class', 'w-full', 'border-2');
    });
  });
}); 