import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../components/ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Upload & Files/Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A progress bar component for showing upload progress and other completion states. Based on the Figma upload file design specifications.'
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value from 0 to 100'
    },
    variant: {
      control: 'radio',
      options: ['primary', 'success', 'warning', 'danger'],
      description: 'Visual variant of the progress bar'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the progress bar'
    },
    showPercentage: {
      control: 'boolean',
      description: 'Whether to show the percentage text'
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate progress changes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

// Default progress bar
export const Default: Story = {
  args: {
    value: 23,
    variant: 'primary',
    size: 'md',
    showPercentage: true,
    animated: false
  }
};

// Upload Progress Example
export const UploadProgress: Story = {
  args: {
    value: 23,
    variant: 'primary',
    size: 'md',
    showPercentage: true,
    animated: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar for file upload, showing 23% progress as seen in Figma design.'
      }
    }
  }
};

// Success state
export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
    size: 'md',
    showPercentage: true
  }
};

// Error state
export const Error: Story = {
  args: {
    value: 23,
    variant: 'danger',
    size: 'md',
    showPercentage: true
  }
};

// Warning state
export const Warning: Story = {
  args: {
    value: 67,
    variant: 'warning',
    size: 'md',
    showPercentage: true
  }
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small</h3>
        <ProgressBar value={45} size="sm" variant="primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Medium (Default)</h3>
        <ProgressBar value={67} size="md" variant="primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Large</h3>
        <ProgressBar value={89} size="lg" variant="primary" />
      </div>
    </div>
  )
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Primary</h3>
        <ProgressBar value={23} variant="primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Success</h3>
        <ProgressBar value={100} variant="success" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Warning</h3>
        <ProgressBar value={67} variant="warning" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Danger</h3>
        <ProgressBar value={23} variant="danger" />
      </div>
    </div>
  )
};

// Without percentage
export const WithoutPercentage: Story = {
  args: {
    value: 45,
    showPercentage: false
  }
};

// Animated Progress Demo
export const AnimatedDemo: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);
    
    React.useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 50);
      
      return () => clearInterval(timer);
    }, []);
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Animated Progress</h3>
        <ProgressBar 
          value={progress} 
          variant="primary" 
          animated={true}
          showPercentage={true}
        />
      </div>
    );
  }
}; 