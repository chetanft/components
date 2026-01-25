import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Molecules/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loader>;

// Component for animated progress story
const AnimatedLoader = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{ width: '500px', height: '300px', padding: '20px' }}>
      <Loader value={progress} />
    </div>
  );
};

export const Default: Story = {
  render: () => <AnimatedLoader />,
};

export const Static: Story = {
  args: {
    value: 65,
  },
  render: (args: React.ComponentProps<typeof Loader>) => (
    <div style={{ width: '500px', height: '300px', padding: '20px' }}>
      <Loader {...args} />
    </div>
  ),
};

export const WithoutLogo: Story = {
  args: {
    value: 50,
    showLogo: false,
  },
  render: (args: React.ComponentProps<typeof Loader>) => (
    <div style={{ width: '500px', height: '100px', padding: '20px' }}>
      <Loader {...args} />
    </div>
  ),
};

export const NoProgressBar: Story = {
  args: {
    value: 60,
    showProgressBar: false,
  },
  render: (args: React.ComponentProps<typeof Loader>) => (
    <div style={{ width: '500px', height: '200px', padding: '20px' }}>
      <Loader {...args} />
    </div>
  ),
};

export const CustomProgressBar: Story = {
  args: {
    value: 45,
    progressHeight: 10,
    progressClassName: "rounded-full bg-[var(--color-border-secondary)]",
    progressBarClassName: "rounded-full",
    progressBarStyle: { backgroundColor: 'var(--color-primary)' },
  },
  render: (args: React.ComponentProps<typeof Loader>) => (
    <div style={{ width: '500px', height: '200px', padding: '20px' }}>
      <Loader {...args} />
    </div>
  ),
};

export const CustomLogo: Story = {
  args: {
    value: 75,
    logo: (
      <div style={{ width: 120, height: 120, backgroundColor: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        Custom Logo
      </div>
    ),
  },
  render: (args: React.ComponentProps<typeof Loader>) => (
    <div style={{ width: '500px', height: '300px', padding: '20px' }}>
      <Loader {...args} />
    </div>
  ),
};

export const SmallLogo: Story = {
  args: {
    value: 40,
    logoSize: 120,
  },
  render: (args: React.ComponentProps<typeof Loader>) => (
    <div style={{ width: '500px', height: '250px', padding: '20px' }}>
      <Loader {...args} />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    value: 85,
  },
  render: (args: React.ComponentProps<typeof Loader>) => (
    <div style={{ width: '100%', height: '400px', padding: '40px' }}>
      <Loader {...args} />
    </div>
  ),
};
