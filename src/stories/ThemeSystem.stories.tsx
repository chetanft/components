import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, ThemeSwitch, useTheme } from '../components';
import { Button } from '../components/atoms/Button/Button';
import { Badge } from '../components/atoms/Badge/Badge';
import { Typography } from '../components/atoms/Typography/Typography';
import { ProgressBar } from '../components/molecules/ProgressBar/ProgressBar';
import { RadioGroup } from '../components/atoms/RadioGroup/RadioGroup';

const meta = {
  title: 'Theme System/Multi-Theme Demo',
  component: ThemeSwitch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Complete theme system supporting Light, Dark, and Night modes with automatic component adaptation.',
      },
    },
  },
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

// Demo component that shows theme-aware components
const ThemeDemo: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="space-y-8">
      <div className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg p-6">
        <Typography variant="h3" color="primary" className="mb-4">
          Current Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)} Mode
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Buttons Section */}
          <div className="space-y-3">
            <Typography variant="h4" color="primary" className="mb-3">Buttons</Typography>
            <div className="space-y-2">
              <Button variant="primary" size="md">Primary Action</Button>
              <Button variant="secondary" size="md">Secondary Action</Button>
              <Button variant="destructive" size="md">Delete Item</Button>
            </div>
          </div>
          
          {/* Badges Section */}
          <div className="space-y-3">
            <Typography variant="h4" color="primary" className="mb-3">Badges</Typography>
            <div className="flex flex-wrap gap-2">
              <Badge variant="normal">Normal</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Error</Badge>
            </div>
          </div>
          
          {/* Progress Bars Section */}
          <div className="space-y-3">
            <Typography variant="h4" color="primary" className="mb-3">Progress</Typography>
            <div className="space-y-3">
              <ProgressBar variant="primary" value={75} />
              <ProgressBar variant="success" value={90} />
              <ProgressBar variant="warning" value={45} />
              <ProgressBar variant="danger" value={25} />
            </div>
          </div>
        </div>
        
        {/* Radio Group Section */}
        <div className="mt-6">
          <Typography variant="h4" color="primary" className="mb-3">Form Controls</Typography>
          <RadioGroup
            name="demo-options"
            options={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3' },
            ]}
            defaultValue="option1"
          />
        </div>
        
        {/* Typography Section */}
        <div className="mt-6">
          <Typography variant="h4" color="primary" className="mb-3">Typography</Typography>
          <div className="space-y-2">
            <Typography variant="h1" color="primary">Heading 1 - Primary Color</Typography>
            <Typography variant="h2" color="secondary">Heading 2 - Secondary Color</Typography>
            <Typography variant="p" color="primary">
              This is body text using the primary color. It automatically adapts to the current theme.
            </Typography>
            <Typography variant="p" color="secondary">
              This is muted text using the secondary color for less prominent information.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component for theme demonstration
const ThemeWrapper: React.FC<{ children: React.ReactNode; defaultTheme?: 'light' | 'dark' | 'night' }> = ({ 
  children, 
  defaultTheme = 'light' 
}) => (
  <ThemeProvider defaultTheme={defaultTheme}>
    <div className="min-h-screen bg-[var(--bg-secondary)] p-4 transition-colors duration-200">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Typography variant="h2" color="primary">FT Design System - Multi-Theme Demo</Typography>
          <ThemeSwitch />
        </div>
        {children}
      </div>
    </div>
  </ThemeProvider>
);

export const InteractiveDemo: Story = {
  render: () => (
    <ThemeWrapper>
      <ThemeDemo />
    </ThemeWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing all themes. Use the theme switcher in the top right to see how all components adapt.',
      },
    },
  },
};

export const LightTheme: Story = {
  render: () => (
    <ThemeWrapper defaultTheme="light">
      <ThemeDemo />
    </ThemeWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Light theme demonstration - clean and bright for daytime use.',
      },
    },
  },
};

export const DarkTheme: Story = {
  render: () => (
    <ThemeWrapper defaultTheme="dark">
      <ThemeDemo />
    </ThemeWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dark theme demonstration - comfortable for low-light environments.',
      },
    },
  },
};

export const NightTheme: Story = {
  render: () => (
    <ThemeWrapper defaultTheme="night">
      <ThemeDemo />
    </ThemeWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Night theme demonstration - deep contrast for extended night-time use.',
      },
    },
  },
};

export const ThemeComparison = () => (
  <div className="space-y-8">
    <Typography variant="h2" className="text-center mb-8">Theme Comparison</Typography>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Light Theme */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-2 text-center font-semibold">Light Theme</div>
        <ThemeWrapper defaultTheme="light">
          <div className="p-4 space-y-4">
            <Button variant="primary" size="sm">Primary Button</Button>
            <Badge variant="success">Success Badge</Badge>
            <Typography variant="p" color="primary">Sample text content</Typography>
            <ProgressBar variant="primary" value={60} />
          </div>
        </ThemeWrapper>
      </div>
      
      {/* Dark Theme */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-2 text-center font-semibold">Dark Theme</div>
        <ThemeWrapper defaultTheme="dark">
          <div className="p-4 space-y-4">
            <Button variant="primary" size="sm">Primary Button</Button>
            <Badge variant="success">Success Badge</Badge>
            <Typography variant="p" color="primary">Sample text content</Typography>
            <ProgressBar variant="primary" value={60} />
          </div>
        </ThemeWrapper>
      </div>
      
      {/* Night Theme */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-2 text-center font-semibold">Night Theme</div>
        <ThemeWrapper defaultTheme="night">
          <div className="p-4 space-y-4">
            <Button variant="primary" size="sm">Primary Button</Button>
            <Badge variant="success">Success Badge</Badge>
            <Typography variant="p" color="primary">Sample text content</Typography>
            <ProgressBar variant="primary" value={60} />
          </div>
        </ThemeWrapper>
      </div>
    </div>
    
    <div className="bg-gray-50 p-6 rounded-lg">
      <Typography variant="h3" className="mb-4">Implementation Guide</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Typography variant="h4" className="mb-2">Setup</Typography>
          <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
{`import { ThemeProvider } from 'ft-design-system';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      {/* Your app content */}
    </ThemeProvider>
  );
}`}
          </pre>
        </div>
        
        <div>
          <Typography variant="h4" className="mb-2">Usage</Typography>
          <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
{`import { useTheme, ThemeSwitch } from 'ft-design-system';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <ThemeSwitch />
      <p>Current theme: {theme}</p>
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  </div>
); 