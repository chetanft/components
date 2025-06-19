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
    background: {
      control: 'select',
      options: ['bg', 'white'],
      description: 'Background color of the collapsible',
      defaultValue: 'bg'
    },
    stage: {
      control: 'select',
      options: ['default', 'submitted'],
      description: 'Stage of the collapsible',
      defaultValue: 'default'
    },
    type: {
      control: 'select',
      options: ['form', 'text'],
      description: 'Type of the collapsible',
      defaultValue: 'form'
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
    background: 'bg',
    stage: 'default',
    type: 'form',
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
          background="white"
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
        <h2 className="text-xl font-bold">Form Type Variants</h2>
        
        {/* BG, Default Stage */}
        <div>
          <h3 className="text-lg font-semibold mb-2">BG, Default Stage</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="BG, Open, Default, Form" 
              type="form" 
              background="bg" 
              stage="default" 
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="BG, Closed, Default, Form" 
              type="form" 
              background="bg" 
              stage="default" 
              isExpanded={false}
            />
          </div>
        </div>
        
        {/* BG, Submitted Stage */}
        <div>
          <h3 className="text-lg font-semibold mb-2">BG, Submitted Stage</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="Update header name with key value" 
              type="form" 
              background="bg" 
              stage="submitted" 
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="Update header name with key value" 
              type="form" 
              background="bg" 
              stage="submitted" 
              isExpanded={false}
            />
          </div>
        </div>
        
        {/* White, Default Stage */}
        <div>
          <h3 className="text-lg font-semibold mb-2">White, Default Stage</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="White, Open, Default, Form" 
              type="form" 
              background="white" 
              stage="default" 
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="White, Closed, Default, Form" 
              type="form" 
              background="white" 
              stage="default" 
              isExpanded={false}
            />
          </div>
        </div>
        
        {/* White, Submitted Stage */}
        <div>
          <h3 className="text-lg font-semibold mb-2">White, Submitted Stage</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="Update header name with key value" 
              type="form" 
              background="white" 
              stage="submitted" 
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="Update header name with key value" 
              type="form" 
              background="white" 
              stage="submitted" 
              isExpanded={false}
            />
          </div>
        </div>
        
        <h2 className="text-xl font-bold mt-8">Text Type Variants</h2>
        
        {/* BG, Default Stage */}
        <div>
          <h3 className="text-lg font-semibold mb-2">BG, Default Stage</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="BG, Open, Default, Text" 
              type="text" 
              background="bg" 
              stage="default" 
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="BG, Closed, Default, Text" 
              type="text" 
              background="bg" 
              stage="default" 
              isExpanded={false}
            />
          </div>
        </div>
        
        {/* White, Default Stage */}
        <div>
          <h3 className="text-lg font-semibold mb-2">White, Default Stage</h3>
          <div className="flex flex-col gap-4">
            <Collapsible 
              header="White, Open, Default, Text" 
              type="text" 
              background="white" 
              stage="default" 
              isExpanded={true}
            >
              <div className="p-2">Content</div>
            </Collapsible>
            
            <Collapsible 
              header="White, Closed, Default, Text" 
              type="text" 
              background="white" 
              stage="default" 
              isExpanded={false}
            />
          </div>
        </div>
        
        {/* Custom Badges */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Custom Badges</h3>
          <Collapsible 
            header="Collapsible with Custom Badges" 
            type="form" 
            background="white" 
            badges={{
              loads: 10,
              invoices: 5,
              materials: 3,
              custom: 7
            }}
          />
        </div>
      </div>
    );
  }
}; 