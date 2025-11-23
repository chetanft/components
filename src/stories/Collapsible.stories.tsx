import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from '../components/organisms/Collapsible/Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Organisms/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Collapsible component with multiple variants for showing/hiding content.'
      }
    }
  },
  argTypes: {
    bg: {
      control: 'select',
      options: ['Primary', 'Secondary'],
      description: 'Background variant of the collapsible',
      defaultValue: 'Secondary'
    },
    type: {
      control: 'select',
      options: ['Primary', 'Secondary', 'Tertiary'],
      description: 'Type variant of the collapsible',
      defaultValue: 'Primary'
    },
    badges: {
      control: 'boolean',
      description: 'Whether to show badges',
      defaultValue: false
    },
    isExpanded: {
      control: 'boolean',
      description: 'Whether the collapsible is expanded',
      defaultValue: false
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story with controls
export const Default: Story = {
  args: {
    header: 'Collapsible header',
    children: <div className="p-4">Collapsible content goes here</div>,
    bg: 'Secondary',
    type: 'Primary',
    badges: false,
    isExpanded: false
  }
};

// Controlled example with state
export const Controlled: StoryObj<typeof Collapsible> = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div className="w-[600px]">
        <Collapsible 
          header="Controlled Collapsible"
          isExpanded={isExpanded}
          onToggle={setIsExpanded}
          bg="Primary"
          type="Primary"
        >
          <div className="p-4">
            <p>This collapsible is controlled by React state.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'} from outside
            </button>
          </div>
        </Collapsible>
      </div>
    );
  }
};

// All variants showcase
export const AllVariants: StoryObj<typeof Collapsible> = {
  render: () => {
    return (
      <div className="flex flex-col gap-8 w-[800px]">
        <h2 className="text-xl font-bold">Primary Type Variants</h2>
        
        {/* Primary, Secondary BG */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Primary Type, Secondary BG</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="Primary, Expanded, Secondary BG" 
              type="Primary" 
              bg="Secondary" 
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="Primary, Collapsed, Secondary BG" 
              type="Primary" 
              bg="Secondary" 
              isExpanded={false}
            />
          </div>
        </div>
        
        {/* Primary, Primary BG */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Primary Type, Primary BG</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="Primary, Expanded, Primary BG" 
              type="Primary" 
              bg="Primary" 
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="Primary, Collapsed, Primary BG" 
              type="Primary" 
              bg="Primary" 
              isExpanded={false}
            />
          </div>
        </div>
        
        <h2 className="text-xl font-bold mt-8">Secondary Type Variants</h2>
        
        {/* Secondary, Secondary BG */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Secondary Type, Secondary BG</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="Secondary, Expanded, Secondary BG" 
              type="Secondary" 
              bg="Secondary" 
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="Secondary, Collapsed, Secondary BG" 
              type="Secondary" 
              bg="Secondary" 
              isExpanded={false}
            />
          </div>
        </div>
        
        {/* Secondary, Primary BG */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Secondary Type, Primary BG</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="Secondary, Expanded, Primary BG" 
              type="Secondary" 
              bg="Primary" 
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="Secondary, Collapsed, Primary BG" 
              type="Secondary" 
              bg="Primary" 
              isExpanded={false}
            />
          </div>
        </div>
        
        <h2 className="text-xl font-bold mt-8">Tertiary Type Variants</h2>
        
        {/* Tertiary, Secondary BG */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Tertiary Type, Secondary BG</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="Tertiary, Expanded, Secondary BG" 
              type="Tertiary" 
              bg="Secondary" 
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="Tertiary, Collapsed, Secondary BG" 
              type="Tertiary" 
              bg="Secondary" 
              isExpanded={false}
            />
          </div>
        </div>
        
        {/* Tertiary, Primary BG */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Tertiary Type, Primary BG</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="Tertiary, Expanded, Primary BG" 
              type="Tertiary" 
              bg="Primary" 
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="Tertiary, Collapsed, Primary BG" 
              type="Tertiary" 
              bg="Primary" 
              isExpanded={false}
            />
          </div>
        </div>
        
        {/* With Badges */}
        <div>
          <h3 className="text-lg font-semibold mb-2">With Badges</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="Collapsible with Badges" 
              type="Primary" 
              bg="Secondary" 
              badges={true}
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="Collapsible with Badges" 
              type="Primary" 
              bg="Secondary" 
              badges={true}
              isExpanded={false}
            />
          </div>
        </div>
      </div>
    );
  }
}; 