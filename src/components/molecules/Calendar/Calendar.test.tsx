import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from './Calendar';

describe('Calendar Component', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Calendar />);
      expect(screen.getByText('Sun')).toBeInTheDocument();
    });

    it('renders default weekday labels', () => {
      render(<Calendar />);
      expect(screen.getByText('Sun')).toBeInTheDocument();
      expect(screen.getByText('Mon')).toBeInTheDocument();
      expect(screen.getByText('Tue')).toBeInTheDocument();
      expect(screen.getByText('Wed')).toBeInTheDocument();
      expect(screen.getByText('Thu')).toBeInTheDocument();
      expect(screen.getByText('Fri')).toBeInTheDocument();
      expect(screen.getByText('Sat')).toBeInTheDocument();
    });
  });

  describe('Custom Labels', () => {
    it('renders custom weekday labels when provided', () => {
      const customWeekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
      render(<Calendar weekdayLabels={customWeekdays} />);
      
      expect(screen.getByText('S')).toBeInTheDocument();
      expect(screen.getByText('M')).toBeInTheDocument();
      expect(screen.getByText('T')).toBeInTheDocument();
      expect(screen.getByText('W')).toBeInTheDocument();
      expect(screen.getByText('F')).toBeInTheDocument();
      // Default labels should not be present
      expect(screen.queryByText('Sun')).not.toBeInTheDocument();
    });

    it('renders custom month labels when provided', () => {
      const customMonths = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
      render(<Calendar mode="year" monthLabels={customMonths} />);
      
      // Should render custom month labels in year view
      expect(screen.getByText('J')).toBeInTheDocument();
      expect(screen.getByText('F')).toBeInTheDocument();
    });

    it('renders custom full month labels when provided', () => {
      const customMonthsFull = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      render(<Calendar monthLabelsFull={customMonthsFull} />);
      
      const currentMonth = new Date().getMonth();
      expect(screen.getByText(customMonthsFull[currentMonth])).toBeInTheDocument();
    });

    it('uses locale-based defaults when locale is zh', () => {
      render(<Calendar locale="zh" />);
      // Chinese weekday labels should be rendered
      expect(screen.getByText('日')).toBeInTheDocument();
      expect(screen.getByText('一')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onSelect when a date is clicked', async () => {
      const user = userEvent.setup();
      const handleSelect = jest.fn();
      render(<Calendar onSelect={handleSelect} />);
      
      // Find a date button
      const dateButtons = screen.getAllByRole('button');
      const dateButton = Array.from(dateButtons).find(button => 
        button.textContent && /^\d+$/.test(button.textContent) && 
        parseInt(button.textContent, 10) > 0 && 
        parseInt(button.textContent, 10) <= 31
      );
      
      if (dateButton) {
        await user.click(dateButton);
        expect(handleSelect).toHaveBeenCalled();
      }
    });
  });
});
