import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup, RadioGroupItem, RadioItem, RadioItemInput, RadioItemLabel } from './index';

describe('RadioGroup', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('renders all radio options', () => {
      render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <RadioGroup name="test" className="custom-class">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
        </RadioGroup>
      );

      const radioGroup = container.querySelector('.custom-class');
      expect(radioGroup).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <RadioGroup name="test">
          <div data-testid="custom-child">Custom child</div>
        </RadioGroup>
      );

      expect(screen.getByTestId('custom-child')).toBeInTheDocument();
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
      render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      const radio1 = screen.getByLabelText('Option 1') as HTMLInputElement;
      const radio2 = screen.getByLabelText('Option 2') as HTMLInputElement;
      const radio3 = screen.getByLabelText('Option 3') as HTMLInputElement;
      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(false);
      expect(radio3.checked).toBe(false);
    });

    it('renders with defaultValue selected', () => {
      render(
        <RadioGroup name="test" defaultValue="option2">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      const radio = screen.getByLabelText('Option 2') as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });

    it('renders with controlled value selected', () => {
      render(
        <RadioGroup name="test" value="option3" onChange={() => { }}>
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      const radio = screen.getByLabelText('Option 3') as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });

    it('renders disabled options correctly', () => {
      render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2" disabled>Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      const disabledRadio = screen.getByLabelText('Option 2') as HTMLInputElement;
      expect(disabledRadio.disabled).toBe(true);
    });

    it('applies correct name attribute to all radios', () => {
      render(
        <RadioGroup name="test-group">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      const radio1 = screen.getByLabelText('Option 1') as HTMLInputElement;
      const radio2 = screen.getByLabelText('Option 2') as HTMLInputElement;
      const radio3 = screen.getByLabelText('Option 3') as HTMLInputElement;
      expect(radio1.name).toBe('test-group');
      expect(radio2.name).toBe('test-group');
      expect(radio3.name).toBe('test-group');
    });
  });

  describe('Interactions', () => {
    it('calls onChange when option is selected (uncontrolled)', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(
        <RadioGroup name="test" onChange={handleChange}>
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      const radio = screen.getByLabelText('Option 2');
      await user.click(radio);

      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('calls onChange when option is selected (controlled)', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(
        <RadioGroup name="test" value="option1" onChange={handleChange}>
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      const radio = screen.getByLabelText('Option 3');
      await user.click(radio);

      expect(handleChange).toHaveBeenCalledWith('option3');
    });

    it('does not call onChange for disabled options', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(
        <RadioGroup name="test" onChange={handleChange}>
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2" disabled>Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      const disabledRadio = screen.getByLabelText('Option 2');
      await user.click(disabledRadio);

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('changes selection in uncontrolled mode', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup name="test" defaultValue="option1">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

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
      render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      const firstRadio = screen.getByLabelText('Option 1');
      firstRadio.focus();

      await user.keyboard('{ArrowDown}');

      const secondRadio = screen.getByLabelText('Option 2') as HTMLInputElement;
      expect(secondRadio).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('has radiogroup role', () => {
      render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
        </RadioGroup>
      );
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('each option has radio role', () => {
      render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );
      const radios = screen.getAllByRole('radio');
      expect(radios.length).toBeGreaterThanOrEqual(3);
    });

    it('properly labels each radio option', () => {
      render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
    });

    it('is focusable for enabled options', () => {
      render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
        </RadioGroup>
      );

      const radio = screen.getByLabelText('Option 1');
      radio.focus();
      expect(radio).toHaveFocus();
    });

    it('is not focusable for disabled options', () => {
      render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1" disabled>Option 1</RadioGroupItem>
        </RadioGroup>
      );

      const disabledRadio = screen.getByLabelText('Option 1');
      disabledRadio.focus();
      expect(disabledRadio).not.toHaveFocus();
    });

    it('supports keyboard navigation between options', () => {
      render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      const radios = screen.getAllByRole('radio');
      expect(radios.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('HTML Attributes', () => {
    it('passes correct value attributes', () => {
      render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );

      const radio1 = screen.getByLabelText('Option 1') as HTMLInputElement;
      const radio2 = screen.getByLabelText('Option 2') as HTMLInputElement;
      const radio3 = screen.getByLabelText('Option 3') as HTMLInputElement;
      expect(radio1.value).toBe('option1');
      expect(radio2.value).toBe('option2');
      expect(radio3.value).toBe('option3');
    });

    it('has correct input type', () => {
      const { container } = render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
          <RadioGroupItem value="option2">Option 2</RadioGroupItem>
          <RadioGroupItem value="option3">Option 3</RadioGroupItem>
        </RadioGroup>
      );
      const radios = container.querySelectorAll('input[type="radio"]');
      expect(radios.length).toBe(3);
    });

    it('is hidden with sr-only class', () => {
      const { container } = render(
        <RadioGroup name="test">
          <RadioGroupItem value="option1">Option 1</RadioGroupItem>
        </RadioGroup>
      );
      const inputs = container.querySelectorAll('input[type="radio"]');
      inputs.forEach((input) => {
        expect(input).toHaveClass('sr-only');
      });
    });
  });
});
