import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationPopover, type NavigationSection } from './NavigationPopover';

const customSections: NavigationSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: 'dashboard',
    hero: {
      title: 'Overview',
      description: 'High-level overview of logistics KPIs.',
    },
    metrics: [{ label: 'Active Orders', value: '25' }],
  },
  {
    id: 'details',
    label: 'Details',
    icon: 'planning',
    subCategories: [
      {
        title: 'Operations',
        items: [
          { label: 'Route Planning', icon: 'planning' },
          { label: 'Live Tracking', icon: 'gps' },
        ],
      },
    ],
  },
];

describe('NavigationPopover', () => {
  it('renders first section content by default', () => {
    render(<NavigationPopover open sections={customSections} />);
    expect(screen.getAllByRole('heading', { name: 'Overview' })[0]).toBeInTheDocument();
    expect(screen.getAllByText('High-level overview of logistics KPIs.')[0]).toBeInTheDocument();
    expect(screen.getByText('Active Orders')).toBeInTheDocument();
  });

  it('switches layout to subcategory panel when section has nested items', () => {
    render(<NavigationPopover open sections={customSections} />);

    fireEvent.click(screen.getByRole('button', { name: /details/i }));

    expect(screen.getByText('Operations')).toBeInTheDocument();
    expect(screen.getByText('Route Planning')).toBeInTheDocument();
  });

  it('invokes onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<NavigationPopover open onClose={handleClose} sections={customSections} />);

    fireEvent.click(screen.getByRole('button', { name: /close navigation menu/i }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('fires onSectionChange callback with selected id', () => {
    const handleSectionChange = jest.fn();
    render(<NavigationPopover open onSectionChange={handleSectionChange} sections={customSections} />);

    fireEvent.click(screen.getByRole('button', { name: /details/i }));

    expect(handleSectionChange).toHaveBeenCalledWith('details');
  });
});

