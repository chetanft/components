import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProgressList } from './ProgressList';
import { IconName } from '../../atoms/Icons/types';

describe('ProgressList', () => {
  const mockItems = [
    {
      id: '1',
      title: 'Step 1',
      description: 'This is step 1',
      state: 'completed' as const,
      pointType: 'primary' as const,
      lineType: 'solid' as const,
      icon: 'check' as IconName,
    },
    {
      id: '2',
      title: 'Step 2',
      description: 'This is step 2',
      state: 'current' as const,
      pointType: 'parent' as const,
      lineType: 'solid' as const,
      icon: 'loading' as IconName,
      collapsible: true,
    },
    {
      id: '3',
      title: 'Step 3',
      description: 'This is step 3',
      state: 'upcoming' as const,
      pointType: 'icon' as const,
      lineType: 'dashed' as const,
      icon: 'map' as IconName,
    },
  ];

  const mockItemsWithTime = [
    {
      id: '1',
      title: 'Step 1',
      description: 'This is step 1',
      state: 'completed' as const,
      pointType: 'primary' as const,
      lineType: 'solid' as const,
      timeLabel: 'Start time',
      startTime: '09:30 AM',
      endTime: '10:00 AM',
    },
    {
      id: '2',
      title: 'Step 2',
      description: 'This is step 2',
      state: 'current' as const,
      pointType: 'label' as const,
      lineType: 'dashed' as const,
      pointLabel: 'OR',
      timeLabel: 'ETA',
      startTime: '11:00 AM',
    },
  ];

  const mockItemsWithBadges = [
    {
      id: '1',
      title: 'Step with badges',
      description: 'This step has badges',
      state: 'completed' as const,
      pointType: 'icon' as const,
      lineType: 'solid' as const,
      icon: 'check' as IconName,
      badges: [
        {
          label: 'Completed',
          variant: 'normal' as const,
        },
        {
          label: '30 min',
          icon: 'clock' as IconName,
          variant: 'danger' as const,
        },
      ],
    },
  ];

  it('renders progress items correctly', () => {
    render(<ProgressList items={mockItems} />);
    
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('This is step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders time columns when showTime is true', () => {
    render(<ProgressList items={mockItemsWithTime} showTime={true} />);
    
    expect(screen.getByText('Start time')).toBeInTheDocument();
    expect(screen.getByText('09:30 AM')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('ETA')).toBeInTheDocument();
    expect(screen.getByText('11:00 AM')).toBeInTheDocument();
  });

  it('does not render time columns when showTime is false', () => {
    render(<ProgressList items={mockItemsWithTime} showTime={false} />);
    
    expect(screen.queryByText('Start time')).not.toBeInTheDocument();
    expect(screen.queryByText('09:30 AM')).not.toBeInTheDocument();
  });

  it('renders badges correctly', () => {
    render(<ProgressList items={mockItemsWithBadges} />);
    
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
  });

  it('handles collapsible items', () => {
    const itemsWithContent = [
      {
        id: '1',
        title: 'Collapsible item',
        state: 'completed' as const,
        pointType: 'parent' as const,
        lineType: 'solid' as const,
        collapsible: true,
        content: <div>Expanded content</div>,
      },
    ];

    render(<ProgressList items={itemsWithContent} />);
    
    expect(screen.queryByText('Expanded content')).not.toBeInTheDocument();
    
    const collapseButton = screen.getByRole('button');
    fireEvent.click(collapseButton);
    
    expect(screen.getByText('Expanded content')).toBeInTheDocument();
  });

  it('renders divider items correctly', () => {
    const itemsWithDivider = [
      {
        id: '1',
        title: 'Step 1',
        state: 'completed' as const,
        pointType: 'primary' as const,
        lineType: 'solid' as const,
      },
      {
        type: 'divider' as const,
        id: 'div1',
        label: 'March 14, 2023',
      },
      {
        id: '2',
        title: 'Step 2',
        state: 'upcoming' as const,
        pointType: 'primary' as const,
        lineType: 'dashed' as const,
      },
    ];

    render(<ProgressList items={itemsWithDivider} />);
    
    expect(screen.getByText('March 14, 2023')).toBeInTheDocument();
  });

  it('renders different point types correctly', () => {
    const pointTypeItems = [
      {
        id: '1',
        title: 'Parent Point',
        state: 'completed' as const,
        pointType: 'parent' as const,
        lineType: 'solid' as const,
        collapsible: true,
      },
      {
        id: '2',
        title: 'Icon Point',
        state: 'completed' as const,
        pointType: 'icon' as const,
        lineType: 'solid' as const,
        icon: 'check' as IconName,
      },
      {
        id: '3',
        title: 'Primary Point',
        state: 'current' as const,
        pointType: 'primary' as const,
        lineType: 'solid' as const,
      },
      {
        id: '4',
        title: 'Label Point',
        state: 'upcoming' as const,
        pointType: 'label' as const,
        lineType: 'dashed' as const,
        pointLabel: 'OR',
      },
    ];

    render(<ProgressList items={pointTypeItems} />);
    
    expect(screen.getByText('Parent Point')).toBeInTheDocument();
    expect(screen.getByText('Icon Point')).toBeInTheDocument();
    expect(screen.getByText('Primary Point')).toBeInTheDocument();
    expect(screen.getByText('Label Point')).toBeInTheDocument();
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('renders headers with lines correctly', () => {
    const itemsWithHeader = [
      {
        id: '1',
        title: 'Header Title',
        state: 'completed' as const,
        pointType: 'parent' as const,
        lineType: 'solid' as const,
        headerType: 'primary' as const,
        showHeaderLine: true,
      },
      {
        id: '2',
        title: 'Secondary Header',
        state: 'current' as const,
        pointType: 'icon' as const,
        lineType: 'solid' as const,
        headerType: 'secondary' as const,
        icon: 'check' as IconName,
      },
    ];

    render(<ProgressList items={itemsWithHeader} />);
    
    expect(screen.getByText('Header Title')).toBeInTheDocument();
    expect(screen.getByText('Secondary Header')).toBeInTheDocument();
  });

  it('renders multiple points correctly', () => {
    const itemsWithMultiplePoints = [
      {
        id: '1',
        title: 'Multiple Points',
        state: 'completed' as const,
        pointType: 'label' as const,
        lineType: 'solid' as const,
        multiplePoints: [
          { type: 'label' as const, label: 'D1', active: true },
          { type: 'label' as const, label: 'P1', active: true },
        ],
      },
    ];

    render(<ProgressList items={itemsWithMultiplePoints} />);
    
    expect(screen.getByText('Multiple Points')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProgressList items={mockItems} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('progress-list', 'custom-class');
  });

  it('handles items with no line (lineType: none)', () => {
    const itemsWithNoLine = [
      {
        id: '1',
        title: 'Step 1',
        state: 'completed' as const,
        pointType: 'primary' as const,
        lineType: 'solid' as const,
      },
      {
        id: '2',
        title: 'Step 2',
        state: 'upcoming' as const,
        pointType: 'label' as const,
        lineType: 'none' as const,
        pointLabel: 'END',
      },
    ];

    render(<ProgressList items={itemsWithNoLine} />);
    
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('END')).toBeInTheDocument();
  });
}); 
