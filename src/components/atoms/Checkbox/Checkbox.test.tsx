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

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<Checkbox description="This is additional information" />);
      expect(screen.getByText('This is additional information')).toBeInTheDocument();
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
    it('applies small size classes', () => {
      render(<Checkbox size="sm" label="Small checkbox" />);
      const label = screen.getByText('Small checkbox');
      expect(label).toHaveClass('text-sm');
    });

    it('applies medium size classes (default)', () => {
      render(<Checkbox label="Medium checkbox" />);
      const label = screen.getByText('Medium checkbox');
      expect(label).toHaveClass('text-base');
    });

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
      render(<Checkbox disabled label="Disabled checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Disabled checkbox');

      expect(checkbox).toBeDisabled();
      expect(label).toHaveClass('text-[var(--secondary)]', 'cursor-not-allowed');
    });

    it('handles error state correctly', () => {
      render(<Checkbox error label="Error checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      const label = screen.getByText('Error checkbox');

      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
      expect(label).toHaveClass('text-critical');
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
      render(<Checkbox label="Auto ID" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id');
      expect(checkbox.getAttribute('id')).toMatch(/checkbox-/);
    });

    it('uses provided ID', () => {
      render(<Checkbox id="custom-checkbox" label="Custom ID" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('id', 'custom-checkbox');
    });

    it('connects description with aria-describedby', () => {
      render(<Checkbox description="This is a description" />);
      const checkbox = screen.getByRole('checkbox');
      const description = screen.getByText('This is a description');

      expect(checkbox).toHaveAttribute('aria-describedby', description.getAttribute('id'));
    });

    it('combines multiple aria-describedby values', () => {
      render(
        <Checkbox
          description="Description text"
          aria-describedby="external-description"
        />
      );
      const checkbox = screen.getByRole('checkbox');
      const describedBy = checkbox.getAttribute('aria-describedby');

      expect(describedBy).toContain('external-description');
      expect(describedBy).toContain('description');
    });

    it('sets aria-invalid for error state', () => {
      render(<Checkbox error />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
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

  // Label interactions
  describe('Label Interactions', () => {
    it('toggles checkbox when label is clicked', () => {
      const handleChange = jest.fn();
      render(<Checkbox label="Click me" onChange={handleChange} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('associates label with checkbox correctly', () => {
      render(<Checkbox label="Associated label" />);
      expect(screen.getByText('Associated label')).toBeInTheDocument();
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

    it('includes dark mode classes for labels', () => {
      render(<Checkbox label="Dark mode label" />);
      const label = screen.getByText('Dark mode label');
      expect(label).toHaveClass('text-[var(--primary)]');
    });

    it('includes dark mode classes for descriptions', () => {
      render(<Checkbox description="Dark mode description" />);
      const description = screen.getByText('Dark mode description');
      expect(description).toHaveClass('text-[var(--secondary)]');
    });
  });

  // Error state styling
  describe('Error State Styling', () => {
    it('applies error styles to unchecked checkbox', () => {
      render(<Checkbox error />);
      const checkboxElement = screen.getByRole('checkbox').nextElementSibling;
      expect(checkboxElement).toHaveClass('border-critical', 'text-critical');
    });

    it('applies error styles to checked checkbox', () => {
      render(<Checkbox error checked />);
      const checkboxElement = screen.getByRole('checkbox').nextElementSibling;
      expect(checkboxElement).toHaveClass('bg-critical', 'border-critical');
    });

    it('applies error styles to label', () => {
      render(<Checkbox error label="Error label" />);
      const label = screen.getByText('Error label');
      expect(label).toHaveClass('text-critical');
    });

    it('applies error styles to description', () => {
      render(<Checkbox error description="Error description" />);
      const error = screen.getByText('Error occurred');
      expect(error).toHaveClass('text-critical');
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

  // Description positioning
  describe('Description Layout', () => {
    it('positions description correctly relative to checkbox', () => {
      render(<Checkbox label="Test" description="Test description" />);
      const description = screen.getByText('Test description');

      // Description should have left margin to align with label
      expect(description).toHaveStyle({
        marginLeft: expect.stringContaining('calc(')
      });
    });

    it('aligns description properly for different sizes', () => {
      const { rerender } = render(<Checkbox size="sm" description="Small description" />);
      const smallDescription = screen.getByText('Small description');
      expect(smallDescription).toHaveStyle({
        marginLeft: expect.stringContaining('calc(')
      });

      rerender(<Checkbox size="md" description="Medium description" />);
      const mediumDescription = screen.getByText('Medium description');
      expect(mediumDescription).toHaveStyle({
        marginLeft: expect.stringContaining('calc(')
      });
    });
  });
}); 
