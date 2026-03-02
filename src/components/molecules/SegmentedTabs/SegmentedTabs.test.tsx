import React from 'react';
import { render, screen } from '@testing-library/react';
import { SegmentedTabs, SegmentedTabItem } from './SegmentedTabs';

describe('SegmentedTabs', () => {
  it('renders composable SegmentedTabItem children', () => {
    render(
      <SegmentedTabs defaultValue="a">
        <SegmentedTabItem value="a" label="Tab A" />
        <SegmentedTabItem value="b" label="Tab B" />
        <SegmentedTabItem value="c" label="Tab C" />
      </SegmentedTabs>
    );
    expect(screen.getByText('Tab A')).toBeInTheDocument();
    expect(screen.getByText('Tab B')).toBeInTheDocument();
    expect(screen.getByText('Tab C')).toBeInTheDocument();
  });
});
