import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ProgressList } from '../components/molecules/ProgressList/ProgressList';

const meta: Meta<typeof ProgressList> = {
  title: 'Molecules/ProgressList',
  component: ProgressList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A progress list component that matches the exact Figma timeline design with proper 3-column layout (Time | Path | Content), point types, and badge system.'
      }
    }
  },
  argTypes: {
    showTime: {
      control: { type: 'boolean' },
      description: 'Whether to show time columns'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ProgressList>;

// Figma Timeline Example with Time
export const FigmaTimelineWithTime: Story = {
  args: {
    showTime: true,
    items: [
      {
        type: 'divider',
        id: 'div1',
        label: '13 March 2023'
      },
      {
        id: '1',
        title: 'En Route to Loading',
        description: 'Distance travelled: 1242 km',
        state: 'completed',
        pointType: 'parent',
        lineType: 'solid',
        timeLabel: 'Start time',
        startTime: '09:34 AM',
        endTime: '09:34 AM',
        icon: 'arrow-down',
        headerType: 'primary',
        showHeaderLine: true,
        collapsible: true
      },
      {
        id: '2',
        title: 'In Transit by Road',
        description: 'Distance travelled: 122 km',
        state: 'completed',
        pointType: 'icon',
        lineType: 'solid',
        icon: 'road',
        headerType: 'secondary',
        badges: [
          {
            label: 'Run time: 2 hr 30 min',
            variant: 'normal'
          }
        ]
      },
      {
        id: '3',
        title: 'Forward Trip',
        description: 'Distance travelled: 1242 km',
        state: 'completed',
        pointType: 'parent',
        lineType: 'solid',
        timeLabel: 'Start time',
        startTime: '09:34 AM',
        endTime: '-',
        icon: 'arrow-down',
        headerType: 'primary',
        showHeaderLine: true,
        collapsible: true
      },
      {
        id: '4',
        title: 'Origin',
        description: 'Distance travelled: 1242 km',
        state: 'completed',
        pointType: 'label',
        lineType: 'solid',
        timeLabel: 'Gate In',
        startTime: '09:34 AM',
        endTime: '09:34 AM',
        pointLabel: 'OR',
        icon: 'plant',
        headerType: 'secondary',
        badges: [
          {
            label: 'TAT: 3 hrs',
            variant: 'normal'
          },
          {
            label: '30 min',
            icon: 'clock',
            variant: 'danger'
          },
          {
            label: 'Detained',
            variant: 'danger'
          }
        ]
      },
      {
        type: 'divider',
        id: 'div2',
        label: '14 March 2023'
      },
      {
        id: '5',
        title: 'In Transit by Road',
        description: 'Distance travelled: 122 km',
        state: 'completed',
        pointType: 'icon',
        lineType: 'solid',
        icon: 'road',
        headerType: 'secondary',
        badges: [
          {
            label: 'Run time: 2 hr 30 min',
            variant: 'normal'
          },
          {
            label: '30 min',
            icon: 'clock',
            variant: 'danger'
          },
          {
            label: 'Long Stoppage',
            variant: 'danger'
          }
        ]
      },
      {
        id: '6',
        title: 'Waypoint',
        description: 'Chandigarh',
        state: 'completed',
        pointType: 'primary',
        lineType: 'solid',
        timeLabel: 'Passed at',
        startTime: '09:34 AM',
        icon: 'location'
      },
      {
        id: '7',
        title: 'Drop 1 & Pickup 1',
        description: 'Sai Traders, Delhi',
        state: 'completed',
        pointType: 'label',
        lineType: 'solid',
        timeLabel: 'Gate In',
        startTime: '09:34 AM',
        endTime: '09:34 AM',
        icon: 'plant',
        headerType: 'secondary',
        multiplePoints: [
          { type: 'label', label: 'D1', active: true },
          { type: 'label', label: 'P1', active: true }
        ],
        badges: [
          {
            label: 'TAT: 2 hrs',
            variant: 'normal'
          },
          {
            label: '30 min',
            icon: 'clock',
            variant: 'danger'
          },
          {
            label: 'Detained',
            variant: 'danger'
          }
        ]
      },
      {
        id: '8',
        title: 'Pickup 2',
        description: 'Sai Traders, Delhi',
        state: 'completed',
        pointType: 'label',
        lineType: 'solid',
        timeLabel: 'Gate In',
        startTime: '09:34 AM',
        endTime: '09:34 AM',
        pointLabel: 'P2',
        icon: 'plant',
        headerType: 'secondary',
        badges: [
          {
            label: 'TAT: 2 hrs',
            variant: 'normal'
          },
          {
            label: '30 min',
            icon: 'clock',
            variant: 'danger'
          }
        ]
      },
      {
        id: '9',
        title: 'In Transit by Road',
        description: 'Ambala, Madhya Pradesh.',
        state: 'current',
        pointType: 'icon',
        lineType: 'dashed',
        icon: 'tracker',
        headerType: 'secondary',
        badges: [
          {
            label: 'Run time: 2 hr 30 min',
            variant: 'normal'
          },
          {
            label: '30 min',
            icon: 'clock',
            variant: 'danger'
          },
          {
            label: 'Long Stoppage, +2',
            variant: 'danger'
          },
          {
            label: '+1 Closed',
            variant: 'danger'
          }
        ]
      },
      {
        type: 'divider',
        id: 'div3',
        label: '15 March 2023'
      },
      {
        id: '10',
        title: 'Waypoint',
        description: 'Chandigarh',
        state: 'upcoming',
        pointType: 'primary',
        lineType: 'dashed',
        timeLabel: 'ETA',
        startTime: '09:34 AM',
        icon: 'location'
      },
      {
        id: '11',
        title: 'Pickup 2',
        description: 'Jai shri ram, Ahmedabad, Gujarat',
        state: 'upcoming',
        pointType: 'label',
        lineType: 'dashed',
        timeLabel: 'ETA',
        startTime: '09:34 AM',
        pointLabel: 'P2',
        icon: 'plant',
        headerType: 'secondary',
        badges: [
          {
            label: '30 min',
            icon: 'clock',
            variant: 'danger'
          }
        ]
      },
      {
        id: '12',
        title: 'Drop 2',
        description: 'Jai shri ram, Ahmedabad, Gujarat',
        state: 'upcoming',
        pointType: 'label',
        lineType: 'dashed',
        timeLabel: 'ETA',
        startTime: '09:34 AM',
        pointLabel: 'D2',
        icon: 'warehouse',
        headerType: 'secondary',
        badges: [
          {
            label: '30 min',
            icon: 'clock',
            variant: 'danger'
          }
        ]
      },
      {
        id: '13',
        title: 'Origin',
        description: 'MDC Labs Ltd, Amritsar, Punjab',
        state: 'upcoming',
        pointType: 'label',
        lineType: 'none',
        timeLabel: 'ETA',
        startTime: '09:34 AM',
        pointLabel: 'OR',
        icon: 'plant',
        headerType: 'secondary',
        badges: [
          {
            label: '30 min',
            icon: 'clock',
            variant: 'danger'
          }
        ]
      }
    ]
  }
};

// Simple Timeline without Time
export const FigmaTimelineNoTime: Story = {
  args: {
    showTime: false,
    items: [
      {
        id: '1',
        title: 'Order Information',
        state: 'completed',
        pointType: 'parent',
        lineType: 'solid',
        headerType: 'primary',
        showHeaderLine: true,
        collapsible: true
      },
      {
        id: '2',
        title: 'Processing Started',
        description: 'Your order is being processed',
        state: 'completed',
        pointType: 'icon',
        lineType: 'solid',
        icon: 'check',
        headerType: 'secondary',
        badges: [
          {
            label: 'Completed',
            variant: 'success'
          }
        ]
      },
      {
        id: '3',
        title: 'Quality Check',
        description: 'Items under quality inspection',
        state: 'current',
        pointType: 'primary',
        lineType: 'solid',
        icon: 'loading',
        headerType: 'secondary',
        badges: [
          {
            label: 'In Progress',
            variant: 'warning'
          }
        ]
      },
      {
        id: '4',
        title: 'Ready for Shipment',
        description: 'Package ready to be shipped',
        state: 'upcoming',
        pointType: 'label',
        lineType: 'dashed',
        pointLabel: 'OR',
        icon: 'vehicle',
        headerType: 'secondary'
      }
    ]
  }
};

// Point Types Showcase
export const PointTypesShowcase: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Parent Point (Collapsible)',
        description: 'Used for collapsible sections with chevron icon',
        state: 'completed',
        pointType: 'parent',
        lineType: 'solid',
        collapsible: true,
        content: (
          <div className="p-4 bg-blue-50 rounded">
            <p>This is expanded content for the parent point!</p>
          </div>
        )
      },
      {
        id: '2',
        title: 'Icon Point',
        description: 'Circular point with custom icon',
        state: 'completed',
        pointType: 'icon',
        lineType: 'solid',
        icon: 'tracker'
      },
      {
        id: '3',
        title: 'Primary Point',
        description: 'Circle with border design',
        state: 'current',
        pointType: 'primary',
        lineType: 'solid'
      },
      {
        id: '4',
        title: 'Label Point',
        description: 'Point with text label',
        state: 'upcoming',
        pointType: 'label',
        lineType: 'dashed',
        pointLabel: 'OR'
      }
    ]
  }
};

// Badge Variants
export const BadgeVariants: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Normal Badges',
        description: 'Standard information badges',
        state: 'completed',
        pointType: 'icon',
        lineType: 'solid',
        icon: 'check',
        badges: [
          {
            label: 'TAT: 3 hrs',
            variant: 'normal'
          },
          {
            label: 'Run time: 2 hr 30 min',
            variant: 'normal'
          }
        ]
      },
      {
        id: '2',
        title: 'Danger Badges',
        description: 'Warning and error badges',
        state: 'current',
        pointType: 'primary',
        lineType: 'solid',
        badges: [
          {
            label: '30 min',
            icon: 'clock',
            variant: 'danger'
          },
          {
            label: 'Detained',
            variant: 'danger'
          },
          {
            label: 'Long Stoppage',
            variant: 'danger'
          }
        ]
      }
    ]
  }
};

// Multiple Points Example
export const MultiplePoints: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Single Point',
        description: 'Regular single point',
        state: 'completed',
        pointType: 'label',
        lineType: 'solid',
        pointLabel: 'P1'
      },
      {
        id: '2',
        title: 'Multiple Points',
        description: 'Drop and Pickup at same location',
        state: 'completed',
        pointType: 'label',
        lineType: 'solid',
        multiplePoints: [
          { type: 'label', label: 'D1', active: true },
          { type: 'label', label: 'P1', active: true }
        ],
        badges: [
          {
            label: 'Combined operation',
            variant: 'normal'
          }
        ]
      },
      {
        id: '3',
        title: 'Final Point',
        description: 'End of journey',
        state: 'upcoming',
        pointType: 'label',
        lineType: 'none',
        pointLabel: 'END'
      }
    ]
  }
};

// Collapsible Functionality Example
export const WithCollapsible: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Shipment Details',
        description: 'Click to expand shipping information',
        state: 'completed',
        pointType: 'parent',
        lineType: 'solid',
        collapsible: true,
        headerType: 'primary',
        showHeaderLine: true,
        content: (
          <div className="p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Origin</p>
                <p className="text-sm text-gray-600">Delhi Warehouse</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Destination</p>
                <p className="text-sm text-gray-600">Mumbai Distribution Center</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Vehicle</p>
                <p className="text-sm text-gray-600">DL-01-AB-1234</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Driver</p>
                <p className="text-sm text-gray-600">Rajesh Kumar</p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: '2',
        title: 'Order Processing',
        description: 'Click to see order details',
        state: 'completed',
        pointType: 'parent',
        lineType: 'solid',
        collapsible: true,
        headerType: 'primary',
        showHeaderLine: true,
        content: (
          <div className="p-4 bg-blue-50 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Order ID:</span>
              <span className="text-sm">#ORD-2024-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Items:</span>
              <span className="text-sm">15 packages</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Weight:</span>
              <span className="text-sm">250 kg</span>
            </div>
          </div>
        )
      },
      {
        id: '3',
        title: 'Quality Check',
        description: 'Items under inspection',
        state: 'current',
        pointType: 'icon',
        lineType: 'solid',
        icon: 'loading',
        badges: [
          {
            label: 'In Progress',
            variant: 'normal'
          }
        ]
      },
      {
        id: '4',
        title: 'Ready for Delivery',
        description: 'Package ready for final delivery',
        state: 'upcoming',
        pointType: 'label',
        lineType: 'dashed',
        pointLabel: 'D1',
        icon: 'vehicle'
      }
    ]
  }
}; 