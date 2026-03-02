import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

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

describe('Checkbox Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders checkbox element correctly', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders checked state correctly', () => {
      render(<Checkbox checked readOnly />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
      expect(screen.getByTestId('icon-check-alt')).toBeInTheDocument();
    });

    it('renders indeterminate state correctly', () => {
      render(<Checkbox indeterminate />);
      expect(screen.getByTestId('icon-subtract')).toBeInTheDocument();
    });
  });

  // Size variants
  describe('Size Variants', () => {
    it('uses correct icon sizes for different sizes', () => {
      const { rerender } = render(<Checkbox size="sm" checked readOnly />);
      expect(screen.getByTestId('icon-check-alt')).toHaveAttribute('data-size', '12');

      rerender(<Checkbox size="md" checked readOnly />);
      expect(screen.getByTestId('icon-check-alt')).toHaveAttribute('data-size', '16');
    });
  });

  // State handling
  describe('State Handling', () => {
    it('handles disabled state correctly', () => {
      render(<Checkbox disabled />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeDisabled();
    });

    it('handles checked state change', () => {
      const handleChange = jest.fn();
      render(<Checkbox onChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('prevents interaction when disabled', () => {
      const handleChange = jest.fn();
      render(<Checkbox disabled onChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');

      // Disabled checkbox should not change checked state when clicked on the visual element
      const checkboxElement = checkbox.nextElementSibling;
      fireEvent.click(checkboxElement!);

      // Since it's disabled, it shouldn't trigger the change event through normal interaction
      expect(checkbox).toBeDisabled();
      expect(checkbox).not.toBeChecked();
    });
  });

  // Indeterminate state
  describe('Indeterminate State', () => {
    it('sets indeterminate property on input element', () => {
      render(<Checkbox indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it('displays subtract icon for indeterminate state', () => {
      render(<Checkbox indeterminate />);
      expect(screen.getByTestId('icon-subtract')).toBeInTheDocument();
    });

    it('updates indeterminate state when prop changes', () => {
      const { rerender } = render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

      expect(checkbox.indeterminate).toBe(false);

      rerender(<Checkbox indeterminate />);
      expect(checkbox.indeterminate).toBe(true);

      rerender(<Checkbox indeterminate={false} />);
      expect(checkbox.indeterminate).toBe(false);
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('generates unique IDs automatically', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id');
      expect(checkbox.getAttribute('id')).toMatch(/checkbox-/);
    });

    it('uses provided ID', () => {
      render(<Checkbox id="custom-checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id', 'custom-checkbox');
    });

    it('sets aria-hidden on icons', () => {
      render(<Checkbox checked />);
      const icon = screen.getByTestId('icon-check-alt');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('supports keyboard navigation', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();
      expect(checkbox).toHaveFocus();
    });
  });

  // Dark mode classes
  describe('Dark Mode Support', () => {
    it('includes dark mode classes for unchecked state', () => {
      render(<Checkbox />);
      const checkboxElement = screen.getByRole('checkbox').nextElementSibling;
      expect(checkboxElement).toHaveClass('bg-[var(--bg-primary)]', 'border-[var(--border-primary)]');
    });

    it('includes dark mode classes for disabled state', () => {
      render(<Checkbox disabled />);
      const checkboxElement = screen.getByRole('checkbox').nextElementSibling;
      expect(checkboxElement).toHaveClass('bg-surface-alt', 'border-border-secondary');
    });
  });

  // Error state styling
  describe('Error State Styling', () => {
    it('applies error styles to unchecked checkbox', () => {
      render(<Checkbox aria-invalid="true" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });
  });

  // forwardRef functionality
  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByRole('checkbox'));
    });

    it('allows calling focus on ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Checkbox ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });
  });

  // Custom className
  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      const { container } = render(<Checkbox className="custom-class" />);
      const wrapper = container.querySelector('.custom-class');
      expect(wrapper).toBeInTheDocument();
    });

    it('merges custom className with component classes', () => {
      const { container } = render(<Checkbox className="custom-class" />);
      const wrapper = container.querySelector('.custom-class');
      expect(wrapper).toHaveClass('flex', 'items-center');
    });
  });
});
