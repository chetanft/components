import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, Progress } from './ProgressBar';
import { useState, useEffect } from 'react';

const meta: Meta<typeof ProgressBar> = {
  title: 'Molecules/Progress',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Progress indicator with line, circle, and dashboard types. Built with FT Design System tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'circle', 'dashboard'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'active'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 50,
    className: 'w-[300px]',
  },
};

export const LineProgress: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <Progress value={30} />
      <Progress value={50} variant="success" />
      <Progress value={70} variant="warning" />
      <Progress value={100} variant="danger" />
    </div>
  ),
};

// Figma Design - State=Not started, Type=Neutral/Critical/Success
export const FigmaNotStarted: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Neutral - Not Started</p>
        <Progress value={0} showPercentage={false} />
      </div>
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Critical - Not Started</p>
        <Progress value={0} variant="danger" showPercentage={false} />
      </div>
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Success - Not Started</p>
        <Progress value={0} variant="success" showPercentage={false} />
      </div>
    </div>
  ),
};

// Figma Design - State=In progress (23%), Type=Neutral/Critical/Success
export const FigmaInProgress: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Neutral - In Progress</p>
        <Progress value={23} showPercentage={false} />
      </div>
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Critical - In Progress</p>
        <Progress value={23} variant="danger" showPercentage={false} />
      </div>
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Success - In Progress</p>
        <Progress value={23} variant="success" showPercentage={false} />
      </div>
    </div>
  ),
};

// Figma Design - State=Completed (100%), Type=Neutral/Critical/Success
export const FigmaCompleted: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Neutral - Completed</p>
        <Progress value={100} showPercentage={false} />
      </div>
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Critical - Completed</p>
        <Progress value={100} variant="danger" showPercentage={false} />
      </div>
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Success - Completed</p>
        <Progress value={100} variant="success" showPercentage={false} />
      </div>
    </div>
  ),
};

// Figma Design - With Percentage Display
export const FigmaWithPercentage: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Neutral - 0%</p>
        <Progress value={0} showPercentage={true} />
      </div>
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Neutral - 23%</p>
        <Progress value={23} showPercentage={true} />
      </div>
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Neutral - 100%</p>
        <Progress value={100} showPercentage={true} />
      </div>
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Critical - 23%</p>
        <Progress value={23} variant="danger" showPercentage={true} />
      </div>
      <div>
        <p className="text-sm text-[var(--tertiary)] mb-2">Success - 100%</p>
        <Progress value={100} variant="success" showPercentage={true} />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <p className="text-sm text-[var(--tertiary)]">Small</p>
      <Progress value={50} size="sm" />
      <p className="text-sm text-[var(--tertiary)]">Medium</p>
      <Progress value={50} size="md" />
      <p className="text-sm text-[var(--tertiary)]">Large</p>
      <Progress value={50} size="lg" />
    </div>
  ),
};

export const Circle: Story = {
  render: () => (
    <div className="flex gap-8">
      <Progress type="circle" value={75} />
      <Progress type="circle" value={50} variant="success" />
      <Progress type="circle" value={25} variant="warning" width={80} />
    </div>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <div className="flex gap-8">
      <Progress type="dashboard" value={75} />
      <Progress type="dashboard" value={50} variant="success" gapDegree={90} />
      <Progress type="dashboard" value={25} variant="danger" gapPosition="top" />
    </div>
  ),
};

export const Steps: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <Progress value={60} steps={5} />
      <Progress value={40} steps={10} variant="success" />
      <Progress value={80} steps={8} variant="warning" />
    </div>
  ),
};

export const CustomFormat: Story = {
  render: () => (
    <div className="flex gap-8">
      <Progress 
        type="circle" 
        value={100} 
        variant="success"
        format={(percent) => 'Done'}
      />
      <Progress 
        type="circle" 
        value={75} 
        format={(percent) => `${percent} Days`}
      />
      <Progress 
        type="dashboard" 
        value={50} 
        format={(percent) => (
          <div className="text-center">
            <div className="text-xl font-bold">{percent}</div>
            <div className="text-xs text-[var(--tertiary)]">Score</div>
          </div>
        )}
      />
    </div>
  ),
};

const AnimatedProgressStory = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <Progress value={percent} animated className="w-[300px]" />
      <div className="flex gap-8">
        <Progress type="circle" value={percent} animated width={100} />
        <Progress type="dashboard" value={percent} animated width={100} />
      </div>
    </div>
  );
};

export const Animated: Story = {
  render: () => <AnimatedProgressStory />,
};

export const ActiveStatus: Story = {
  args: {
    value: 60,
    variant: 'active',
    className: 'w-[300px]',
  },
};

export const CircleSizes: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <Progress type="circle" value={75} width={60} strokeWidth={4} />
      <Progress type="circle" value={75} width={80} strokeWidth={5} />
      <Progress type="circle" value={75} width={100} strokeWidth={6} />
      <Progress type="circle" value={75} width={120} strokeWidth={8} />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="flex gap-8">
      <Progress 
        type="circle" 
        value={75} 
        strokeColor="var(--neutral)"
        trailColor="var(--neutral-light)"
      />
      <Progress 
        type="circle" 
        value={50} 
        strokeColor="#8B5CF6"
        trailColor="#EDE9FE"
      />
      <Progress 
        type="dashboard" 
        value={60} 
        strokeColor="var(--positive)"
      />
    </div>
  ),
};
