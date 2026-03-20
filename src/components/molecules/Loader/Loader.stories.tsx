import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Molecules/Loader',
  component: Loader,
  argTypes: {
    value: {
      control: 'number',
      description: 'Progress value from 0 to 100.',
    },
    logoSize: {
      control: 'number',
      description: 'Size of the logo/icon in pixels.',
    },
    showLogo: {
      control: 'boolean',
      description: 'Whether to show the logo/icon.',
    },
    logo: {
      control: false,
      description: 'Custom logo component to display.',
    },
    showProgressBar: {
      control: 'boolean',
      description: 'Whether to show the progress bar.',
    },
    progressHeight: {
      control: 'text',
      description: 'Height of the progress bar (CSS length or number in px).',
    },
  },
  parameters: {
    layout: 'centered',
    explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'static', label: 'Static', story: 'ExplorerBase', args: { contentType: 'static' } },
            { id: 'without-logo', label: 'Without Logo', story: 'ExplorerBase', args: { contentType: 'without-logo' } },
            { id: 'small-logo', label: 'Small Logo', story: 'ExplorerBase', args: { contentType: 'small-logo' } },
            { id: 'full-width', label: 'Full Width', story: 'ExplorerBase', args: { contentType: 'full-width' } },
          ],
        },
        {
          id: 'content',
          label: 'Content',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
            { id: 'no-progress-bar', label: 'No Progress Bar', story: 'ExplorerBase', args: { showProgressBar: false } },
            { id: 'custom-progress-bar', label: 'Custom Progress Bar', story: 'ExplorerBase', args: { contentType: 'custom-progress' } },
          ],
        },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const showProgressBar = args.showProgressBar !== false;
    const [progress, setProgress] = useState(0);
    const syncKey = JSON.stringify({ contentType, showProgressBar });

    useEffect(() => {
      if (contentType === 'static' || contentType === 'small-logo' || contentType === 'custom-progress') {
        setProgress(65);
        return;
      }
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) { clearInterval(interval); return 100; }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }, [contentType]);

    const width = contentType === 'full-width' ? '100%' : '500px';
    const height = contentType === 'without-logo' ? '100px' : contentType === 'full-width' ? '400px' : contentType === 'custom-progress' || !showProgressBar ? '200px' : '300px';

    return (
      <div key={syncKey} style={{ width, height, padding: '20px' }}>
        <Loader
          value={progress}
          showLogo={contentType !== 'without-logo'}
          showProgressBar={showProgressBar}
          logoSize={contentType === 'small-logo' ? 120 : undefined}
          progressHeight={contentType === 'custom-progress' ? 10 : undefined}
          progressClassName={contentType === 'custom-progress' ? "rounded-full bg-[var(--color-border-secondary)]" : undefined}
          progressBarClassName={contentType === 'custom-progress' ? "rounded-full" : undefined}
          progressBarStyle={contentType === 'custom-progress' ? { backgroundColor: 'var(--color-primary)' } : undefined}
        />
      </div>
    );
  },
};

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
  parameters: {
    docs: {
      source: {
        code: `const [progress, setProgress] = useState(0);

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

<Loader value={progress} />`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Loader value={65} />`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Loader value={50} showLogo={false} />`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Loader value={60} showProgressBar={false} />`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Loader
  value={45}
  progressHeight={10}
  progressClassName="rounded-full bg-[var(--color-border-secondary)]"
  progressBarClassName="rounded-full"
  progressBarStyle={{ backgroundColor: 'var(--color-primary)' }}
/>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Loader
  value={75}
  logo={
    <div style={{ width: 120, height: 120, backgroundColor: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      Custom Logo
    </div>
  }
/>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Loader value={40} logoSize={120} />`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Loader value={85} />`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};
