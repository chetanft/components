import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressList, ProgressListItem, ProgressListDivider } from './ProgressList';
import type { IconName } from '../../atoms/Icons/Icon';

describe('ProgressList', () => {
  it('renders progress items correctly', () => {
    render(
      <ProgressList>
        <ProgressListItem
          id="1"
          title="Step 1"
          description="This is step 1"
          state="completed"
          pointType="primary"
          lineType="solid"
          icon={'check' as IconName}
        />
        <ProgressListItem
          id="2"
          title="Step 2"
          description="This is step 2"
          state="current"
          pointType="parent"
          lineType="solid"
          icon={'loading' as IconName}
          collapsible
        />
        <ProgressListItem
          id="3"
          title="Step 3"
          description="This is step 3"
          state="upcoming"
          pointType="icon"
          lineType="dashed"
          icon={'map' as IconName}
        />
      </ProgressList>
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('This is step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders time columns when showTime is true', () => {
    render(
      <ProgressList showTime={true}>
        <ProgressListItem
          id="1"
          title="Step 1"
          description="This is step 1"
          state="completed"
          pointType="primary"
          lineType="solid"
          timeLabel="Start time"
          startTime="09:30 AM"
          endTime="10:00 AM"
        />
        <ProgressListItem
          id="2"
          title="Step 2"
          description="This is step 2"
          state="current"
          pointType="label"
          lineType="dashed"
          pointLabel="OR"
          timeLabel="ETA"
          startTime="11:00 AM"
        />
      </ProgressList>
    );

    expect(screen.getByText('Start time')).toBeInTheDocument();
    expect(screen.getByText('09:30 AM')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('ETA')).toBeInTheDocument();
    expect(screen.getByText('11:00 AM')).toBeInTheDocument();
  });

  it('does not render time columns when showTime is false', () => {
    render(
      <ProgressList showTime={false}>
        <ProgressListItem
          id="1"
          title="Step 1"
          description="This is step 1"
          state="completed"
          pointType="primary"
          lineType="solid"
          timeLabel="Start time"
          startTime="09:30 AM"
        />
      </ProgressList>
    );

    expect(screen.queryByText('Start time')).not.toBeInTheDocument();
    expect(screen.queryByText('09:30 AM')).not.toBeInTheDocument();
  });

  it('renders badges correctly', () => {
    render(
      <ProgressList>
        <ProgressListItem
          id="1"
          title="Step with badges"
          description="This step has badges"
          state="completed"
          pointType="icon"
          lineType="solid"
          icon={'check' as IconName}
          badges={[
            { label: 'Completed', variant: 'normal' as const },
            { label: '30 min', icon: 'clock' as IconName, variant: 'danger' as const },
          ]}
        />
      </ProgressList>
    );

    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
  });

  it('handles collapsible items', () => {
    render(
      <ProgressList>
        <ProgressListItem
          id="1"
          title="Collapsible item"
          state="completed"
          pointType="parent"
          lineType="solid"
          collapsible
        >
          <div>Expanded content</div>
        </ProgressListItem>
      </ProgressList>
    );

    expect(screen.queryByText('Expanded content')).not.toBeInTheDocument();

    const collapseButton = screen.getByRole('button');
    fireEvent.click(collapseButton);

    expect(screen.getByText('Expanded content')).toBeInTheDocument();
  });

  it('renders divider items correctly', () => {
    render(
      <ProgressList>
        <ProgressListItem
          id="1"
          title="Step 1"
          state="completed"
          pointType="primary"
          lineType="solid"
        />
        <ProgressListDivider id="div1" label="March 14, 2023" />
        <ProgressListItem
          id="2"
          title="Step 2"
          state="upcoming"
          pointType="primary"
          lineType="dashed"
        />
      </ProgressList>
    );

    expect(screen.getByText('March 14, 2023')).toBeInTheDocument();
  });

  it('renders different point types correctly', () => {
    render(
      <ProgressList>
        <ProgressListItem
          id="1"
          title="Parent Point"
          state="completed"
          pointType="parent"
          lineType="solid"
          collapsible
        />
        <ProgressListItem
          id="2"
          title="Icon Point"
          state="completed"
          pointType="icon"
          lineType="solid"
          icon={'check' as IconName}
        />
        <ProgressListItem
          id="3"
          title="Primary Point"
          state="current"
          pointType="primary"
          lineType="solid"
        />
        <ProgressListItem
          id="4"
          title="Label Point"
          state="upcoming"
          pointType="label"
          lineType="dashed"
          pointLabel="OR"
        />
      </ProgressList>
    );

    expect(screen.getByText('Parent Point')).toBeInTheDocument();
    expect(screen.getByText('Icon Point')).toBeInTheDocument();
    expect(screen.getByText('Primary Point')).toBeInTheDocument();
    expect(screen.getByText('Label Point')).toBeInTheDocument();
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('renders headers with lines correctly', () => {
    render(
      <ProgressList>
        <ProgressListItem
          id="1"
          title="Header Title"
          state="completed"
          pointType="parent"
          lineType="solid"
          headerType="primary"
          showHeaderLine
        />
        <ProgressListItem
          id="2"
          title="Secondary Header"
          state="current"
          pointType="icon"
          lineType="solid"
          headerType="secondary"
          icon={'check' as IconName}
        />
      </ProgressList>
    );

    expect(screen.getByText('Header Title')).toBeInTheDocument();
    expect(screen.getByText('Secondary Header')).toBeInTheDocument();
  });

  it('renders multiple points correctly', () => {
    render(
      <ProgressList>
        <ProgressListItem
          id="1"
          title="Multiple Points"
          state="completed"
          pointType="label"
          lineType="solid"
          multiplePoints={[
            { type: 'label' as const, label: 'D1', active: true },
            { type: 'label' as const, label: 'P1', active: true },
          ]}
        />
      </ProgressList>
    );

    expect(screen.getByText('Multiple Points')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProgressList className="custom-class">
        <ProgressListItem
          id="1"
          title="Step 1"
          state="completed"
          pointType="primary"
          lineType="solid"
        />
      </ProgressList>
    );

    expect(container.firstChild).toHaveClass('progress-list', 'custom-class');
  });

  it('handles items with no line (lineType: none)', () => {
    render(
      <ProgressList>
        <ProgressListItem
          id="1"
          title="Step 1"
          state="completed"
          pointType="primary"
          lineType="solid"
        />
        <ProgressListItem
          id="2"
          title="Step 2"
          state="upcoming"
          pointType="label"
          lineType="none"
          pointLabel="END"
        />
      </ProgressList>
    );

    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('END')).toBeInTheDocument();
  });
});
