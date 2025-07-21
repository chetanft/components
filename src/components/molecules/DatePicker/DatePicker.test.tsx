import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker, DatePickerField } from './DatePicker';
import { Label } from '../../atoms/Label/Label';

describe('DatePicker Components', () => {
  describe('Label Component', () => {
    it('renders children correctly', () => {
      render(<Label>Test Label</Label>);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('shows required indicator when required', () => {
      render(<Label required>Required Label</Label>);
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.getByText('Required Label')).toBeInTheDocument();
    });

    it('does not show required indicator by default', () => {
      render(<Label>Optional Label</Label>);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Label className="custom-label">Label</Label>);
      const label = container.querySelector('.custom-label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('DatePickerField Component', () => {
    describe('Rendering', () => {
      it('renders without crashing', () => {
        render(<DatePickerField />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
      });

      it('renders with placeholder', () => {
        render(<DatePickerField placeholder="Select date" />);
        expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
      });

      it('renders with value', () => {
        render(<DatePickerField value="2024-01-01" />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value).toBe('2024-01-01');
      });

      it('renders calendar icon by default', () => {
        const { container } = render(<DatePickerField />);
        // The calendar icon should be rendered as part of the Icon component
        expect(container.querySelector('svg')).toBeInTheDocument();
      });

      it('renders time icon when showTime is true', () => {
        const { container } = render(<DatePickerField showTime />);
        // The time icon should be rendered as part of the Icon component
        expect(container.querySelector('svg')).toBeInTheDocument();
      });
    });

    describe('Sizes', () => {
      it('applies medium size by default', () => {
        const { container } = render(<DatePickerField />);
        const field = container.querySelector('.h-component-md');
        expect(field).toBeInTheDocument();
      });

      it('applies large size', () => {
        const { container } = render(<DatePickerField size="l" />);
        const field = container.querySelector('.h-component-lg');
        expect(field).toBeInTheDocument();
      });

      it('applies medium size', () => {
        const { container } = render(<DatePickerField size="m" />);
        const field = container.querySelector('.h-component-md');
        expect(field).toBeInTheDocument();
      });
    });

    describe('Types', () => {
      it('applies normal type by default', () => {
        const { container } = render(<DatePickerField />);
        const field = container.querySelector('.border-\\[var\\(--color-border\\)\\]');
        expect(field).toBeInTheDocument();
      });

      it('applies error type', () => {
        const { container } = render(<DatePickerField type="error" />);
        const field = container.querySelector('.border-\\[var\\(--color-critical\\)\\]');
        expect(field).toBeInTheDocument();
      });

      it('applies warning type', () => {
        const { container } = render(<DatePickerField type="warning" />);
        const field = container.querySelector('.border-\\[var\\(--color-warning\\)\\]');
        expect(field).toBeInTheDocument();
      });

      it('applies success type', () => {
        const { container } = render(<DatePickerField type="success" />);
        const field = container.querySelector('.border-\\[var\\(--color-positive\\)\\]');
        expect(field).toBeInTheDocument();
      });
    });

    describe('States', () => {
      it('renders disabled state', () => {
        render(<DatePickerField disabled />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.disabled).toBe(true);
      });

      it('applies disabled styling', () => {
        const { container } = render(<DatePickerField disabled state="disabled" />);
        const field = container.querySelector('.cursor-not-allowed');
        expect(field).toBeInTheDocument();
      });

      it('applies filled state styling', () => {
        const { container } = render(<DatePickerField state="filled" />);
        const input = container.querySelector('input');
        expect(input).toHaveClass('text-[var(--color-dark-100)]');
      });

      it('applies prefilled state styling', () => {
        const { container } = render(<DatePickerField state="prefilled" />);
        const field = container.querySelector('.bg-\\[var\\(--color-background\\)\\]');
        expect(field).toBeInTheDocument();
      });
    });

    describe('Interactions', () => {
      it('calls onChange when input value changes', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        render(<DatePickerField onChange={handleChange} />);
        
        const input = screen.getByRole('textbox');
        await user.type(input, '2024-01-01');
        
        expect(handleChange).toHaveBeenCalled();
      });

      it('calls onFocus when input is focused', async () => {
        const user = userEvent.setup();
        const handleFocus = jest.fn();
        render(<DatePickerField onFocus={handleFocus} />);
        
        const input = screen.getByRole('textbox');
        await user.click(input);
        
        expect(handleFocus).toHaveBeenCalledTimes(1);
      });

      it('calls onBlur when input loses focus', async () => {
        const user = userEvent.setup();
        const handleBlur = jest.fn();
        render(<DatePickerField onBlur={handleBlur} />);
        
        const input = screen.getByRole('textbox');
        await user.click(input);
        await user.tab();
        
        expect(handleBlur).toHaveBeenCalledTimes(1);
      });

      it('does not call onChange when disabled', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        render(<DatePickerField disabled onChange={handleChange} />);
        
        const input = screen.getByRole('textbox');
        await user.type(input, '2024-01-01');
        
        expect(handleChange).not.toHaveBeenCalled();
      });
    });

    describe('Accessibility', () => {
      it('forwards ref to input element', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<DatePickerField ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
      });

      it('has correct input type', () => {
        render(<DatePickerField />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.type).toBe('text');
      });

      it('passes through HTML attributes', () => {
        render(<DatePickerField data-testid="date-input" name="date" />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveAttribute('data-testid', 'date-input');
        expect(input).toHaveAttribute('name', 'date');
      });
    });

    describe('Design System Compliance', () => {
      it('uses CSS custom properties for colors', () => {
        const { container } = render(<DatePickerField />);
        
        // Check that the component uses CSS custom properties
        const field = container.querySelector('[class*="--color-border"]');
        expect(field).toBeInTheDocument();
      });

      it('applies transition styles', () => {
        const { container } = render(<DatePickerField />);
        const field = container.querySelector('.transition-colors');
        expect(field).toBeInTheDocument();
      });

      it('uses design token spacing', () => {
        const { container } = render(<DatePickerField />);
        const field = container.querySelector('[class*="--spacing-x"]');
        expect(field).toBeInTheDocument();
      });
    });
  });

  describe('DatePicker Component', () => {
    describe('Rendering', () => {
      it('renders without crashing', () => {
        render(<DatePicker />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
      });

      it('renders with label on top by default', () => {
        render(<DatePicker label="Select Date" />);
        expect(screen.getByText('Select Date')).toBeInTheDocument();
        
        const container = screen.getByText('Select Date').closest('div');
        expect(container).toHaveClass('flex-col');
      });

      it('renders with label on left', () => {
        render(<DatePicker label="Select Date" labelPosition="left" />);
        expect(screen.getByText('Select Date')).toBeInTheDocument();
        
        const container = screen.getByText('Select Date').closest('div');
        expect(container).toHaveClass('flex');
        expect(container).toHaveClass('items-center');
      });

      it('renders without label when labelPosition is none', () => {
        render(<DatePicker label="Select Date" labelPosition="none" />);
        expect(screen.queryByText('Select Date')).not.toBeInTheDocument();
      });

      it('does not render label when label is not provided', () => {
        const { container } = render(<DatePicker />);
        expect(container.querySelector('label')).not.toBeInTheDocument();
      });
    });

    describe('Label Variations', () => {
      it('renders required label', () => {
        render(<DatePicker label="Required Date" required />);
        expect(screen.getByText('Required Date')).toBeInTheDocument();
        expect(screen.getByText('*')).toBeInTheDocument();
      });

      it('renders optional label', () => {
        render(<DatePicker label="Optional Date" />);
        expect(screen.getByText('Optional Date')).toBeInTheDocument();
        expect(screen.queryByText('*')).not.toBeInTheDocument();
      });
    });

    describe('Size Variations', () => {
      it('applies extra large size by default', () => {
        const { container } = render(<DatePicker />);
        const field = container.querySelector('.h-component-xl');
        expect(field).toBeInTheDocument();
      });

      it('applies large size', () => {
        const { container } = render(<DatePicker size="l" />);
        const field = container.querySelector('.h-component-lg');
        expect(field).toBeInTheDocument();
      });

      it('applies medium size', () => {
        const { container } = render(<DatePicker size="m" />);
        const field = container.querySelector('.h-component-md');
        expect(field).toBeInTheDocument();
      });
    });

    describe('Icon Variants', () => {
      it('shows calendar icon by default', () => {
        const { container } = render(<DatePicker />);
        expect(container.querySelector('svg')).toBeInTheDocument();
      });

      it('shows time icon when showTime is true', () => {
        const { container } = render(<DatePicker showTime />);
        expect(container.querySelector('svg')).toBeInTheDocument();
      });
    });

    describe('Event Forwarding', () => {
      it('forwards onChange to DatePickerField', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        render(<DatePicker onChange={handleChange} />);
        
        const input = screen.getByRole('textbox');
        await user.type(input, '2024-01-01');
        
        expect(handleChange).toHaveBeenCalled();
      });

      it('forwards onFocus to DatePickerField', async () => {
        const user = userEvent.setup();
        const handleFocus = jest.fn();
        render(<DatePicker onFocus={handleFocus} />);
        
        const input = screen.getByRole('textbox');
        await user.click(input);
        
        expect(handleFocus).toHaveBeenCalledTimes(1);
      });

      it('forwards onBlur to DatePickerField', async () => {
        const user = userEvent.setup();
        const handleBlur = jest.fn();
        render(<DatePicker onBlur={handleBlur} />);
        
        const input = screen.getByRole('textbox');
        await user.click(input);
        await user.tab();
        
        expect(handleBlur).toHaveBeenCalledTimes(1);
      });
    });

    describe('Accessibility', () => {
      it('forwards ref to input element', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<DatePicker ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
      });

      it('associates label with input', () => {
        render(<DatePicker label="Birth Date" />);
        const input = screen.getByRole('textbox');
        const label = screen.getByText('Birth Date');
        
        // The label should be associated with the input
        expect(label.tagName).toBe('LABEL');
      });
    });

    describe('Custom Styling', () => {
      it('applies custom className', () => {
        const { container } = render(<DatePicker className="custom-datepicker" />);
        const datePicker = container.querySelector('.custom-datepicker');
        expect(datePicker).toBeInTheDocument();
      });

      it('combines custom className with component classes', () => {
        const { container } = render(<DatePicker className="custom-class" />);
        const datePicker = container.querySelector('.custom-class');
        expect(datePicker).toHaveClass('flex', 'flex-col', 'gap-2');
      });
    });

    describe('State Forwarding', () => {
      it('forwards all DatePickerField props', () => {
        render(
          <DatePicker 
            value="2024-01-01"
            placeholder="Select date"
            disabled
            type="error"
            state="disabled"
          />
        );
        
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(input.value).toBe('2024-01-01');
        expect(input.placeholder).toBe('Select date');
        expect(input.disabled).toBe(true);
      });
    });
  });
}); 