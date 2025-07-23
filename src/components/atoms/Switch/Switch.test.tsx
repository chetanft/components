import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Switch />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders with label when provided', () => {
      render(<Switch label="Enable notifications" />);
      expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument();
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    });

    it('renders without label when not provided', () => {
      render(<Switch />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Switch className="custom-class" />);
      const trackElement = container.querySelector('.custom-class');
      expect(trackElement).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders with medium size by default', () => {
      const { container } = render(<Switch />);
      const track = container.querySelector('.w-\\[34px\\]');
      expect(track).toBeInTheDocument();
    });

    it('renders with small size when specified', () => {
      const { container } = render(<Switch size="sm" />);
      const track = container.querySelector('.w-\\[30px\\]');
      expect(track).toBeInTheDocument();
    });

    it('renders with medium size when specified', () => {
      const { container } = render(<Switch size="md" />);
      const track = container.querySelector('.w-\\[34px\\]');
      expect(track).toBeInTheDocument();
    });

    it('applies correct text size for small switch with label', () => {
      const { container } = render(<Switch size="sm" label="Small switch" />);
      const label = container.querySelector('.text-\\[12px\\]');
      expect(label).toBeInTheDocument();
    });

    it('applies correct text size for medium switch with label', () => {
      const { container } = render(<Switch size="md" label="Medium switch" />);
      const label = container.querySelector('.text-\\[14px\\]');
      expect(label).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('renders unchecked by default', () => {
      render(<Switch />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('renders checked when checked prop is true', () => {
      render(<Switch checked onChange={() => {}} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('renders disabled when disabled prop is true', () => {
      render(<Switch disabled />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);
    });

    it('applies disabled styles to track when disabled', () => {
      const { container } = render(<Switch disabled />);
      const track = container.querySelector('.bg-\\[var\\(--switch-disabled-bg\\)\\]');
      expect(track).toBeInTheDocument();
    });

    it('applies disabled styles to label when disabled', () => {
      const { container } = render(<Switch disabled label="Disabled switch" />);
      const label = container.querySelector('.text-\\[var\\(--color-tertiary\\)\\]');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Switch onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('calls onChange when label is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Switch label="Click me" onChange={handleChange} />);
      
      const label = screen.getByText('Click me');
      await user.click(label);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Switch disabled onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('responds to keyboard events', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Switch onChange={handleChange} />);
      
      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      await user.keyboard(' ');
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Visual States', () => {
    it('applies correct track color when unchecked', () => {
      const { container } = render(<Switch />);
      const track = container.querySelector('.bg-\\[var\\(--switch-off-bg\\)\\]');
      expect(track).toBeInTheDocument();
    });

    it('applies correct track color when checked', () => {
      const { container } = render(<Switch checked onChange={() => {}} />);
      const track = container.querySelector('.bg-\\[var\\(--switch-on-bg\\)\\]');
      expect(track).toBeInTheDocument();
    });

    it('applies correct thumb position when unchecked', () => {
      const { container } = render(<Switch />);
      const thumb = container.querySelector('.translate-x-\\[-3px\\]');
      expect(thumb).toBeInTheDocument();
    });

    it('applies correct thumb position when checked', () => {
      const { container } = render(<Switch checked onChange={() => {}} />);
      const thumb = container.querySelector('.translate-x-\\[14px\\]');
      expect(thumb).toBeInTheDocument();
    });

    it('applies correct thumb color when unchecked', () => {
      const { container } = render(<Switch />);
      const thumb = container.querySelector('.bg-\\[var\\(--switch-thumb-off\\)\\]');
      expect(thumb).toBeInTheDocument();
    });

    it('applies correct thumb color when checked', () => {
      const { container } = render(<Switch checked onChange={() => {}} />);
      const thumb = container.querySelector('.bg-\\[var\\(--switch-thumb-on\\)\\]');
      expect(thumb).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has checkbox role', () => {
      render(<Switch />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('is properly labeled when label is provided', () => {
      render(<Switch label="Enable feature" />);
      expect(screen.getByLabelText('Enable feature')).toBeInTheDocument();
    });

    it('is focusable', () => {
      render(<Switch />);
      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      expect(checkbox).toHaveFocus();
    });

    it('is not focusable when disabled', () => {
      render(<Switch disabled />);
      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();
      expect(checkbox).not.toHaveFocus();
    });

    it('supports ARIA attributes', () => {
      render(<Switch aria-describedby="help-text" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'help-text');
    });

    it('maintains focus ring styles', () => {
      const { container } = render(<Switch />);
      const track = container.querySelector('.focus-within\\:ring-2');
      expect(track).toBeInTheDocument();
    });
  });

  describe('HTML Attributes', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Switch ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('passes through HTML attributes', () => {
      render(<Switch data-testid="custom-switch" name="settings" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-testid', 'custom-switch');
      expect(checkbox).toHaveAttribute('name', 'settings');
    });

    it('has correct input type', () => {
      render(<Switch />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.type).toBe('checkbox');
    });

    it('is hidden with sr-only class', () => {
      const { container } = render(<Switch />);
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toHaveClass('sr-only');
    });
  });

  describe('Design System Compliance', () => {
    it('uses correct CSS custom properties for colors', () => {
      const { container } = render(<Switch checked onChange={() => {}} />);
      
      // Check that the component uses CSS custom properties
      const track = container.querySelector('[class*="--switch-on-bg"]');
      const thumb = container.querySelector('[class*="--switch-thumb-on"]');
      
      expect(track).toBeInTheDocument();
      expect(thumb).toBeInTheDocument();
    });

    it('maintains consistent spacing', () => {
      const { container } = render(<Switch size="sm" label="Test" />);
      const wrapper = container.querySelector('.gap-\\[6px\\]');
      expect(wrapper).toBeInTheDocument();
    });

    it('applies correct transition timing', () => {
      const { container } = render(<Switch />);
      const track = container.querySelector('.duration-200');
      const thumb = container.querySelector('.duration-200');
      
      expect(track).toBeInTheDocument();
      expect(thumb).toBeInTheDocument();
    });

    it('uses proper shadow styling', () => {
      const { container } = render(<Switch />);
      const thumb = container.querySelector('.shadow-\\[0px_1px_2px_0px_rgba\\(0\\,0\\,0\\,0\\.35\\)\\]');
      expect(thumb).toBeInTheDocument();
    });
  });
}); 