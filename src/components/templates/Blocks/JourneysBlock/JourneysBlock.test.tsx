import React from 'react';
import { render, screen } from '@testing-library/react';
import { JourneysBlock } from './JourneysBlock';
import { DEFAULT_JOURNEYS, JOURNEY_TABS } from './JourneysBlock.constants';

// Mock Icon component
jest.mock('../../../atoms/Icons', () => ({
  Icon: ({ name, ...props }: any) => (
    <span data-testid={`icon-${name}`} {...props}>
      {name}
    </span>
  ),
}));

// Mock AppHeader
jest.mock('../../../organisms/AppHeader', () => ({
  AppHeader: () => <div data-testid="app-header" />,
}));

// Mock Typography - render children as-is
jest.mock('../../../atoms/Typography', () => ({
  Typography: ({ children, ...props }: any) => <span {...props}>{children}</span>,
}));

// Mock Button
jest.mock('../../../atoms/Button/Button', () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid={props['data-testid'] || undefined} aria-label={props['aria-label']}>
      {children}
    </button>
  ),
}));

// Mock Input
jest.mock('../../../atoms/Input', () => ({
  Input: (props: any) => <input data-testid="search-input" placeholder={props.placeholder} />,
}));

// Mock Dropdown components
jest.mock('../../../molecules/Dropdown', () => ({
  Dropdown: ({ children }: any) => <div data-testid="dropdown">{children}</div>,
  DropdownOption: () => null,
}));
jest.mock('../../../molecules/Dropdown/DropdownTrigger', () => ({
  DropdownTrigger: () => <div data-testid="dropdown-trigger" />,
}));
jest.mock('../../../molecules/Dropdown/DropdownContent', () => ({
  DropdownContent: ({ children }: any) => <div>{children}</div>,
}));
jest.mock('../../../molecules/DropdownMenu', () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
}));
jest.mock('../../../molecules/DropdownMenu/DropdownMenuList', () => ({
  DropdownMenuList: ({ children }: any) => <div>{children}</div>,
}));
jest.mock('../../../molecules/DropdownMenu/DropdownMenuItem', () => ({
  DropdownMenuItem: ({ label }: any) => <div>{label}</div>,
}));

// Mock DatePicker
jest.mock('../../../molecules/DatePicker', () => ({
  DatePicker: () => <div data-testid="date-picker" />,
}));

// Mock Tabs
jest.mock('../../../organisms/Tabs', () => ({
  Tabs: ({ children }: any) => <div data-testid="tabs">{children}</div>,
  TabsList: ({ children }: any) => <div data-testid="tabs-list">{children}</div>,
  TabsTrigger: ({ children, value }: any) => (
    <button data-testid={`tab-${value}`} role="tab">
      {children}
    </button>
  ),
}));

// Mock SegmentedTabs
jest.mock('../../../molecules/SegmentedTabs', () => ({
  SegmentedTabs: ({ children }: any) => <div data-testid="segmented-tabs">{children}</div>,
  SegmentedTabItem: ({ label }: any) => <div>{label}</div>,
}));

// Mock ComposableDataTable
jest.mock('../shared/ComposableDataTable', () => ({
  ComposableDataTable: ({ data }: any) => (
    <table data-testid="data-table">
      <tbody>
        {data?.map((row: any, i: number) => (
          <tr key={i}>
            <td>{row.feed_unique_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

// Mock renderQuickFilters
jest.mock('../shared/renderQuickFilters', () => ({
  renderQuickFilters: () => <div data-testid="quick-filters" />,
}));

// Mock JourneyMobileCard
jest.mock('./JourneyMobileCard', () => ({
  JourneyMobileCard: ({ journey }: any) => (
    <div data-testid={`mobile-card-${journey.journey_id}`}>{journey.feed_unique_id}</div>
  ),
}));

// Mock getJourneyColumns
jest.mock('./JourneysBlock.columns', () => ({
  getJourneyColumns: () => [],
}));

describe('JourneysBlock', () => {
  beforeEach(() => {
    // Set desktop viewport width so we get the full desktop layout
    Object.defineProperty(window, 'innerWidth', { value: 1920, writable: true });
    window.dispatchEvent(new Event('resize'));
  });

  it('renders without crashing', () => {
    render(<JourneysBlock />);
    expect(screen.getByTestId('app-header')).toBeInTheDocument();
  });

  it('renders "My Journeys" heading', () => {
    render(<JourneysBlock />);
    expect(screen.getByText('My Journeys')).toBeInTheDocument();
  });

  it('shows journey count text with default data', () => {
    render(<JourneysBlock />);
    expect(screen.getByText(`${DEFAULT_JOURNEYS.length} Journeys available`)).toBeInTheDocument();
  });

  it('shows journey count for custom data', () => {
    const customJourneys = DEFAULT_JOURNEYS.slice(0, 1);
    render(<JourneysBlock journeys={customJourneys} />);
    expect(screen.getByText('1 Journeys available')).toBeInTheDocument();
  });

  it('renders tabs for all journey statuses', () => {
    render(<JourneysBlock />);
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
    expect(screen.getByTestId('tabs-list')).toBeInTheDocument();
    JOURNEY_TABS.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });
  });

  it('renders the data table', () => {
    render(<JourneysBlock />);
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
  });

  it('renders journey data in the data table', () => {
    render(<JourneysBlock />);
    DEFAULT_JOURNEYS.forEach((journey) => {
      expect(screen.getByText(journey.feed_unique_id)).toBeInTheDocument();
    });
  });

  it('renders the "Add Journey" button', () => {
    render(<JourneysBlock />);
    expect(screen.getByText('Add Journey')).toBeInTheDocument();
  });

  it('renders quick filters on desktop', () => {
    render(<JourneysBlock />);
    expect(screen.getByTestId('quick-filters')).toBeInTheDocument();
  });

  it('renders segmented tabs (list/map view toggle) on desktop', () => {
    render(<JourneysBlock />);
    expect(screen.getByTestId('segmented-tabs')).toBeInTheDocument();
  });

  it('renders the my-trip icon', () => {
    render(<JourneysBlock />);
    expect(screen.getByTestId('icon-my-trip')).toBeInTheDocument();
  });
});
