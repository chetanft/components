import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator
} from './index';
import { Badge } from '../../atoms/Badge';

// Mock Icon component
jest.mock('../../atoms/Icons', () => ({
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

describe('Composable Select Components', () => {
  describe('Select', () => {
    it('renders Select with children', () => {
      render(
        <Select value="1" onValueChange={() => {}}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>
      );

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles controlled value', () => {
      const handleValueChange = jest.fn();
      render(
        <Select value="1" onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('handles uncontrolled value with defaultValue', () => {
      render(
        <Select defaultValue="2">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      const option2 = screen.getByText('Option 2');
      expect(option2.closest('[role="option"]')).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('SelectTrigger', () => {
    it('renders trigger button', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens dropdown on click', async () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('applies custom className', () => {
      render(
        <Select>
          <SelectTrigger className="custom-trigger">
            <SelectValue />
          </SelectTrigger>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('custom-trigger');
    });

    it('handles disabled state', () => {
      render(
        <Select>
          <SelectTrigger disabled>
            <SelectValue />
          </SelectTrigger>
        </Select>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
    });
  });

  describe('SelectValue', () => {
    it('renders placeholder when no value', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
        </Select>
      );

      expect(screen.getByText('Choose option')).toBeInTheDocument();
    });

    it('renders selected value', () => {
      render(
        <Select value="1">
          <SelectTrigger>
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      fireEvent.click(screen.getByText('Option 1'));

      // Value should be displayed after selection
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  describe('SelectContent', () => {
    it('renders content in portal when open', async () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });
    });

    it('closes on outside click', async () => {
      render(
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Option 1</SelectItem>
            </SelectContent>
          </Select>
          <div data-testid="outside">Outside</div>
        </div>
      );

      fireEvent.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      fireEvent.mouseDown(screen.getByTestId('outside'));
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('closes on ESC key', async () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      fireEvent.keyDown(document, { key: 'Escape' });
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });
  });

  describe('SelectItem', () => {
    it('renders item with text', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('renders item with complex children (Badge)', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">
              <Badge>Active</Badge> Option 1
            </SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('calls onValueChange when clicked', async () => {
      const handleValueChange = jest.fn();
      render(
        <Select onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      fireEvent.click(screen.getByText('Option 1'));

      await waitFor(() => {
        expect(handleValueChange).toHaveBeenCalledWith('1');
      });
    });

    it('shows checkmark when selected', () => {
      render(
        <Select value="1">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      const option1 = screen.getByText('Option 1').closest('[role="option"]');
      expect(option1).toHaveAttribute('aria-selected', 'true');
    });

    it('handles disabled state', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1" disabled>
              Disabled Option
            </SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      const item = screen.getByText('Disabled Option').closest('[role="option"]');
      expect(item).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('SelectGroup', () => {
    it('renders group with children', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="1">Option 1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="custom-group">
              <SelectItem value="1">Option 1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      const group = screen.getByText('Option 1').closest('[role="group"]');
      expect(group).toHaveClass('custom-group');
    });
  });

  describe('SelectLabel', () => {
    it('renders label text', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Group 1</SelectLabel>
              <SelectItem value="1">Option 1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      expect(screen.getByText('Group 1')).toBeInTheDocument();
    });
  });

  describe('SelectSeparator', () => {
    it('renders separator', () => {
      render(
        <Select>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option 1</SelectItem>
            <SelectSeparator />
            <SelectItem value="2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));
      const separator = screen.getByRole('separator');
      expect(separator).toBeInTheDocument();
    });
  });

  describe('Full composable Select structure', () => {
    it('renders complete select with groups and separators', () => {
      render(
        <Select value="1">
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Group 1</SelectLabel>
              <SelectItem value="1">
                <Badge>Active</Badge> Option 1
              </SelectItem>
              <SelectItem value="2">Option 2</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Group 2</SelectLabel>
              <SelectItem value="3">Option 3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );

      fireEvent.click(screen.getByRole('combobox'));

      expect(screen.getByText('Group 1')).toBeInTheDocument();
      expect(screen.getByText('Group 2')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });
});

