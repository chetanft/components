import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from './Calendar';

describe('Calendar Component', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Calendar />);
      expect(screen.getByText('Su')).toBeInTheDocument();
      expect(screen.getByText('Mo')).toBeInTheDocument();
      expect(screen.getByText('Tu')).toBeInTheDocument();
      expect(screen.getByText('We')).toBeInTheDocument();
      expect(screen.getByText('Th')).toBeInTheDocument();
      expect(screen.getByText('Fr')).toBeInTheDocument();
      expect(screen.getByText('Sa')).toBeInTheDocument();
    });

    it('renders current month by default', () => {
      render(<Calendar />);
      const currentMonth = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      expect(screen.getByText(currentMonth)).toBeInTheDocument();
    });

    it('renders navigation buttons', () => {
      const { container } = render(<Calendar />);
      // Should have 4 navigation buttons (prev/next month and prev/next year)
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Range Selection', () => {
    it('renders two months when range is true', () => {
      render(<Calendar range={true} />);
      const currentMonth = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      // Get next month
      const nextMonthDate = new Date();
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      const nextMonth = nextMonthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      expect(screen.getByText(currentMonth)).toBeInTheDocument();
      expect(screen.getByText(nextMonth)).toBeInTheDocument();
    });

    it('renders quick select options when range is true', () => {
      render(<Calendar range={true} />);
      expect(screen.getByText('This week')).toBeInTheDocument();
      expect(screen.getByText('Next week')).toBeInTheDocument();
      expect(screen.getByText('This month')).toBeInTheDocument();
      expect(screen.getByText('Next month')).toBeInTheDocument();
    });

    it('renders action buttons when range is true', () => {
      render(<Calendar range={true} onApply={() => {}} onCancel={() => {}} />);
      expect(screen.getByText('Apply')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when a date is clicked', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<Calendar onChange={handleChange} />);
      
      // Find a date button (e.g., day 15 if it exists)
      const dateButtons = screen.getAllByRole('button');
      const dateButton = Array.from(dateButtons).find(button => 
        button.textContent && /^\d+$/.test(button.textContent) && 
        parseInt(button.textContent, 10) > 0 && 
        parseInt(button.textContent, 10) <= 31
      );
      
      if (dateButton) {
        await user.click(dateButton);
        expect(handleChange).toHaveBeenCalled();
      }
    });

    it('changes month when navigation buttons are clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<Calendar />);
      
      // Get the current month display
      const currentMonthText = screen.getByText(/[A-Za-z]+ \d{4}/).textContent;
      
      // Find the next month button (usually has a chevron right icon)
      const buttons = container.querySelectorAll('button');
      const nextMonthButton = Array.from(buttons).find(button => 
        button.querySelector('svg') && 
        button.parentElement?.textContent !== currentMonthText
      );
      
      if (nextMonthButton) {
        await user.click(nextMonthButton);
        
        // The month should have changed
        const newMonthText = screen.getByText(/[A-Za-z]+ \d{4}/).textContent;
        expect(newMonthText).not.toBe(currentMonthText);
      }
    });
  });
}); 