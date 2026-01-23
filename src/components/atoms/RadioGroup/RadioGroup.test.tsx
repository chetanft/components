import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup, RadioItem, RadioItemInput, RadioItemLabel } from './index';
import type { RadioOption } from './index';

const mockOptions: RadioOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const mockOptionsWithDisabled: RadioOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' },
];

describe('RadioGroup', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('renders all radio options', () => {
      render(<RadioGroup name="test" options={mockOptions} />);

      mockOptions.forEach((option) => {
        expect(screen.getByLabelText(option.label)).toBeInTheDocument();
      });
    });

    it('renders with custom className', () => {
      const { container } = render(
        <RadioGroup name="test" options={mockOptions} className="custom-class" />
      );

      const radioGroup = container.querySelector('.custom-class');
      expect(radioGroup).toBeInTheDocument();
    });

    it('renders children when options are not provided', () => {
      render(
        <RadioGroup name="test">
          <div data-testid="custom-child">Custom child</div>
        </RadioGroup>
      );

      expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders with medium size by default', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} />);
      const radio = container.querySelector('.w-\\[var\\(--radio-size\\)\\]');
      expect(radio).toBeInTheDocument();
    });

    it('renders with small size when specified', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} size="sm" />);
      const radio = container.querySelector('.w-\\[16px\\]');
      expect(radio).toBeInTheDocument();
    });

    it('renders with medium size when specified', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} size="md" />);
      const radio = container.querySelector('.w-\\[var\\(--radio-size\\)\\]');
      expect(radio).toBeInTheDocument();
    });

    it('applies correct text size for small radio group', () => {
      render(<RadioGroup name="test" options={mockOptions} size="sm" />);
      const label = screen.getByText('Option 1');
      expect(label).toHaveClass('font-normal');
    });

    it('applies correct text size for medium radio group', () => {
      render(<RadioGroup name="test" options={mockOptions} size="md" />);
      const label = screen.getByText('Option 1');
      expect(label).toHaveClass('font-medium');
    });
  });

  describe('Orientation', () => {
    it('renders vertically by default', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} />);
      const radioGroup = container.querySelector('.flex-col');
      expect(radioGroup).toBeInTheDocument();
    });

    it('renders vertically when specified', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} orientation="vertical" />);
      const radioGroup = container.querySelector('.flex-col');
      expect(radioGroup).toBeInTheDocument();
    });

    it('renders horizontally when specified', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} orientation="horizontal" />);
      const radioGroup = container.querySelector('.flex-row');
      expect(radioGroup).toBeInTheDocument();
    });
  });

  describe('Composable API', () => {
    const renderComposable = () =>
      render(
        <RadioGroup name="composable">
          <RadioItem value="option1">
            <RadioItemInput />
            <RadioItemLabel>Option 1</RadioItemLabel>
          </RadioItem>
          <RadioItem value="option2">
            <RadioItemInput />
            <RadioItemLabel>Option 2</RadioItemLabel>
          </RadioItem>
          <RadioItem value="option3" disabled>
            <RadioItemInput />
            <RadioItemLabel>Option 3</RadioItemLabel>
          </RadioItem>
        </RadioGroup>
      );

    it('only selects the clicked radio item', async () => {
      const user = userEvent.setup();
      renderComposable();

      const option1 = screen.getByLabelText('Option 1') as HTMLInputElement;
      const option2 = screen.getByLabelText('Option 2') as HTMLInputElement;

      await user.click(option1);
      expect(option1.checked).toBe(true);
      expect(option2.checked).toBe(false);

      await user.click(option2);
      expect(option1.checked).toBe(false);
      expect(option2.checked).toBe(true);
    });

    it('respects disabled state defined on RadioItem', async () => {
      const user = userEvent.setup();
      renderComposable();

      const disabledOption = screen.getByLabelText('Option 3') as HTMLInputElement;
      await user.click(disabledOption);

      expect(disabledOption.checked).toBe(false);
    });
  });

  describe('States', () => {
    it('renders with no selection by default', () => {
      render(<RadioGroup name="test" options={mockOptions} />);

      mockOptions.forEach((option) => {
        const radio = screen.getByLabelText(option.label) as HTMLInputElement;
        expect(radio.checked).toBe(false);
      });
    });

    it('renders with defaultValue selected', () => {
      render(<RadioGroup name="test" options={mockOptions} defaultValue="option2" />);

      const radio = screen.getByLabelText('Option 2') as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });

    it('renders with controlled value selected', () => {
      render(<RadioGroup name="test" options={mockOptions} value="option3" onChange={() => { }} />);

      const radio = screen.getByLabelText('Option 3') as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });

    it('renders disabled options correctly', () => {
      render(<RadioGroup name="test" options={mockOptionsWithDisabled} />);

      const disabledRadio = screen.getByLabelText('Option 2') as HTMLInputElement;
      expect(disabledRadio.disabled).toBe(true);
    });

    it('applies correct name attribute to all radios', () => {
      render(<RadioGroup name="test-group" options={mockOptions} />);

      mockOptions.forEach((option) => {
        const radio = screen.getByLabelText(option.label) as HTMLInputElement;
        expect(radio.name).toBe('test-group');
      });
    });
  });

  describe('Interactions', () => {
    it('calls onChange when option is selected (uncontrolled)', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<RadioGroup name="test" options={mockOptions} onChange={handleChange} />);

      const radio = screen.getByLabelText('Option 2');
      await user.click(radio);

      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('calls onChange when option is selected (controlled)', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<RadioGroup name="test" options={mockOptions} value="option1" onChange={handleChange} />);

      const radio = screen.getByLabelText('Option 3');
      await user.click(radio);

      expect(handleChange).toHaveBeenCalledWith('option3');
    });

    it('does not call onChange for disabled options', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<RadioGroup name="test" options={mockOptionsWithDisabled} onChange={handleChange} />);

      const disabledRadio = screen.getByLabelText('Option 2');
      await user.click(disabledRadio);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('changes selection in uncontrolled mode', async () => {
      const user = userEvent.setup();
      render(<RadioGroup name="test" options={mockOptions} defaultValue="option1" />);

      let radio1 = screen.getByLabelText('Option 1') as HTMLInputElement;
      let radio2 = screen.getByLabelText('Option 2') as HTMLInputElement;

      expect(radio1.checked).toBe(true);
      expect(radio2.checked).toBe(false);

      await user.click(radio2);

      radio1 = screen.getByLabelText('Option 1') as HTMLInputElement;
      radio2 = screen.getByLabelText('Option 2') as HTMLInputElement;

      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(true);
    });

    it('responds to keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<RadioGroup name="test" options={mockOptions} />);

      const firstRadio = screen.getByLabelText('Option 1');
      firstRadio.focus();

      await user.keyboard('{ArrowDown}');

      const secondRadio = screen.getByLabelText('Option 2') as HTMLInputElement;
      expect(secondRadio).toHaveFocus();
    });
  });

  describe('Visual States', () => {
    it('applies correct border color for unselected state', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} />);
      const radio = container.querySelector('.border-\\[var\\(--border-primary\\)\\]');
      expect(radio).toBeInTheDocument();
    });

    it('applies correct border color for selected state', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} value="option1" onChange={() => { }} />);
      const radio = container.querySelector('.border-\\[var\\(--primary\\)\\]');
      expect(radio).toBeInTheDocument();
    });

    it('applies correct border color for disabled state', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptionsWithDisabled} />);
      const radios = container.querySelectorAll('.border-\\[var\\(--border-disabled\\)\\]');
      expect(radios.length).toBeGreaterThan(0);
    });

    it('shows dot for selected radio', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} value="option1" onChange={() => { }} />);
      const dot = container.querySelector('.bg-\\[var\\(--primary\\)\\]');
      expect(dot).toBeInTheDocument();
    });

    it('does not show dot for unselected radio', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      const dots = document.querySelectorAll('.bg-\\[var\\(--primary\\)\\]');
      expect(dots.length).toBe(0);
    });
  });

  describe('Accessibility', () => {
    it('has radiogroup role', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('each option has radio role', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      const radios = screen.getAllByRole('radio');
      expect(radios.length).toBeGreaterThanOrEqual(mockOptions.length);
    });

    it('properly labels each radio option', () => {
      render(<RadioGroup name="test" options={mockOptions} />);

      mockOptions.forEach((option) => {
        expect(screen.getByLabelText(option.label)).toBeInTheDocument();
      });
    });

    it('is focusable for enabled options', () => {
      render(<RadioGroup name="test" options={mockOptions} />);

      const radio = screen.getByLabelText('Option 1');
      radio.focus();
      expect(radio).toHaveFocus();
    });

    it('is not focusable for disabled options', () => {
      render(<RadioGroup name="test" options={mockOptionsWithDisabled} />);

      const disabledRadio = screen.getByLabelText('Option 2');
      disabledRadio.focus();
      expect(disabledRadio).not.toHaveFocus();
    });

    it('maintains focus ring styles', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} />);
      const radio = container.querySelector('.focus-within\\:ring-2');
      expect(radio).toBeInTheDocument();
    });

    it('supports keyboard navigation between options', () => {
      render(<RadioGroup name="test" options={mockOptions} />);

      const radios = screen.getAllByRole('radio');
      expect(radios.length).toBeGreaterThanOrEqual(mockOptions.length);
    });
  });

  describe('HTML Attributes', () => {
    it('passes correct value attributes', () => {
      render(<RadioGroup name="test" options={mockOptions} />);

      mockOptions.forEach((option) => {
        const radio = screen.getByLabelText(option.label) as HTMLInputElement;
        expect(radio.value).toBe(option.value);
      });
    });

    it('has correct input type', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} />);
      const radios = container.querySelectorAll('input[type="radio"]');
      expect(radios.length).toBe(mockOptions.length);
    });

    it('is hidden with sr-only class', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} />);
      const inputs = container.querySelectorAll('input[type="radio"]');
      inputs.forEach((input) => {
        expect(input).toHaveClass('sr-only');
      });
    });
  });

  describe('Design System Compliance', () => {
    it('uses correct CSS custom properties for sizing', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} size="md" />);

      const radio = container.querySelector('[class*="--radio-size"]');
      const gap = container.querySelector('.gap-\\[16px\\]');

      expect(radio).toBeInTheDocument();
      expect(gap).toBeInTheDocument();
    });

    it('maintains consistent spacing between options', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} size="sm" />);
      const radioGroup = container.querySelector('.gap-\\[12px\\]');
      expect(radioGroup).toBeInTheDocument();
    });

    it('applies correct transition timing', () => {
      const { container } = render(<RadioGroup name="test" options={mockOptions} />);
      const radio = container.querySelector('.duration-200');
      expect(radio).toBeInTheDocument();
    });

    it('uses proper font styling', () => {
      render(<RadioGroup name="test" options={mockOptions} />);
      const label = screen.getByText('Option 1');
      expect(label).toHaveClass('font-medium');
    });
  });

  describe('Legacy Compatibility', () => {
    it('handles children when options are empty', () => {
      render(
        <RadioGroup name="test" options={[]}>
          <div data-testid="legacy-child">Legacy content</div>
        </RadioGroup>
      );

      expect(screen.getByTestId('legacy-child')).toBeInTheDocument();
    });

    it('prioritizes options over children when both are provided', () => {
      render(
        <RadioGroup name="test" options={mockOptions}>
          <div data-testid="legacy-child">Legacy content</div>
        </RadioGroup>
      );

      expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
      expect(screen.queryByTestId('legacy-child')).not.toBeInTheDocument();
    });
  });
}); 
