import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  NavigationPopover,
  NavigationSection,
  NavigationSectionHero,
  NavigationSectionMetric,
  NavigationSectionSubCategory,
  NavigationSectionSubCategoryItem,
} from './NavigationPopover';

describe('NavigationPopover', () => {
  const renderWithSections = (props: Partial<React.ComponentProps<typeof NavigationPopover>> = {}) =>
    render(
      <NavigationPopover open {...props}>
        <NavigationSection id="overview" label="Overview" icon="dashboard">
          <NavigationSectionHero title="Overview" description="High-level overview of logistics KPIs." />
          <NavigationSectionMetric label="Active Orders" value="25" />
        </NavigationSection>
        <NavigationSection id="details" label="Details" icon="planning">
          <NavigationSectionSubCategory title="Operations">
            <NavigationSectionSubCategoryItem label="Route Planning" icon="planning" />
            <NavigationSectionSubCategoryItem label="Live Tracking" icon="gps" />
          </NavigationSectionSubCategory>
        </NavigationSection>
      </NavigationPopover>
    );

  it('renders first section content by default', () => {
    renderWithSections();
    expect(screen.getAllByRole('heading', { name: 'Overview' })[0]).toBeInTheDocument();
    expect(screen.getAllByText('High-level overview of logistics KPIs.')[0]).toBeInTheDocument();
    expect(screen.getByText('Active Orders')).toBeInTheDocument();
  });

  it('switches layout to subcategory panel when section has nested items', () => {
    renderWithSections();

    fireEvent.click(screen.getByRole('button', { name: /details/i }));

    expect(screen.getByText('Operations')).toBeInTheDocument();
    expect(screen.getByText('Route Planning')).toBeInTheDocument();
  });

  it('invokes onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    renderWithSections({ onClose: handleClose });

    fireEvent.click(screen.getByRole('button', { name: /close navigation menu/i }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('fires onSectionChange callback with selected id', () => {
    const handleSectionChange = jest.fn();
    renderWithSections({ onSectionChange: handleSectionChange });

    fireEvent.click(screen.getByRole('button', { name: /details/i }));

    expect(handleSectionChange).toHaveBeenCalledWith('details');
  });
});
