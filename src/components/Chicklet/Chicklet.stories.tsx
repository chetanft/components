import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chicklet } from './Chicklet';
import type { ChickletVariant } from './Chicklet';

const meta = {
  title: 'Components/Chicklet',
  component: Chicklet,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Chicklet component built from Figma specifications. A small tag-like element with two variants (rectangular and pill-shaped) and interactive states.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The text content displayed in the chicklet',
    },
    variant: {
      control: 'select',
      options: ['rectangular', 'rounded'],
      description: 'Shape variant - rectangular (4px radius) or rounded (pill-shaped)',
    },
    showClose: {
      control: 'boolean',
      description: 'Whether to show the close icon',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chicklet is disabled',
    },
    onClose: {
      action: 'close clicked',
      description: 'Callback when close icon is clicked',
    },
    onClick: {
      action: 'chicklet clicked',
      description: 'Callback when chicklet is clicked',
    },
  },
} satisfies Meta<typeof Chicklet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    variant: 'rectangular',
    showClose: true,
  },
};

export const Rounded: Story = {
  args: {
    label: 'Label',
    variant: 'rounded',
    showClose: true,
  },
};

export const WithoutClose: Story = {
  args: {
    label: 'No Close Icon',
    variant: 'rectangular',
    showClose: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    variant: 'rectangular',
    showClose: true,
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    label: 'This is a longer label text',
    variant: 'rectangular',
    showClose: true,
  },
};

export const AllVariants = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold mb-4">Rectangular Variant</h3>
      <div className="flex flex-wrap gap-4">
        <Chicklet label="Default" variant="rectangular" />
        <Chicklet label="Without Close" variant="rectangular" showClose={false} />
        <Chicklet label="Disabled" variant="rectangular" disabled />
        <Chicklet label="Longer Text Example" variant="rectangular" />
      </div>
    </div>
    
    <div>
      <h3 className="text-lg font-semibold mb-4">Rounded Variant (Pill)</h3>
      <div className="flex flex-wrap gap-4">
        <Chicklet label="Default" variant="rounded" />
        <Chicklet label="Without Close" variant="rounded" showClose={false} />
        <Chicklet label="Disabled" variant="rounded" disabled />
        <Chicklet label="Longer Text Example" variant="rounded" />
      </div>
    </div>
  </div>
);

export const FigmaVariants = () => (
  <div className="space-y-12 p-6">
    <div>
      <h2 className="text-xl font-bold mb-6 text-gray-800">Chicklet Component - Figma Specifications</h2>
      <p className="text-gray-600 mb-8">
        Built exactly from Figma design with two shape variants and interactive hover states.
        Each chicklet includes a close icon and supports click interactions.
      </p>
    </div>

    {/* Rectangular Variants */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Rectangular (4px Border Radius)</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-3">Default State</h4>
          <div className="flex flex-wrap gap-3">
            <Chicklet label="Tag 1" variant="rectangular" />
            <Chicklet label="Category" variant="rectangular" />
            <Chicklet label="Filter Applied" variant="rectangular" />
            <Chicklet label="Selected Item" variant="rectangular" />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-3">Without Close Icon</h4>
          <div className="flex flex-wrap gap-3">
            <Chicklet label="Read Only" variant="rectangular" showClose={false} />
            <Chicklet label="Status" variant="rectangular" showClose={false} />
            <Chicklet label="Information" variant="rectangular" showClose={false} />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-3">Disabled State</h4>
          <div className="flex flex-wrap gap-3">
            <Chicklet label="Unavailable" variant="rectangular" disabled />
            <Chicklet label="Locked" variant="rectangular" disabled />
          </div>
        </div>
      </div>
    </div>

    {/* Rounded Variants */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Rounded (Pill Shape)</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-3">Default State</h4>
          <div className="flex flex-wrap gap-3">
            <Chicklet label="Skill" variant="rounded" />
            <Chicklet label="Technology" variant="rounded" />
            <Chicklet label="Department" variant="rounded" />
            <Chicklet label="Team Member" variant="rounded" />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-3">Without Close Icon</h4>
          <div className="flex flex-wrap gap-3">
            <Chicklet label="Badge" variant="rounded" showClose={false} />
            <Chicklet label="Achievement" variant="rounded" showClose={false} />
            <Chicklet label="Level" variant="rounded" showClose={false} />
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-3">Disabled State</h4>
          <div className="flex flex-wrap gap-3">
            <Chicklet label="Expired" variant="rounded" disabled />
            <Chicklet label="Pending" variant="rounded" disabled />
          </div>
        </div>
      </div>
    </div>

    {/* Interactive Demo */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Interactive Demo</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-3">Hover to see state changes</h4>
          <div className="flex flex-wrap gap-3">
            <Chicklet 
              label="Hover Me (Rect)" 
              variant="rectangular" 
              onClick={() => alert('Chicklet clicked!')}
              onClose={() => alert('Close clicked!')}
            />
            <Chicklet 
              label="Hover Me (Pill)" 
              variant="rounded" 
              onClick={() => alert('Chicklet clicked!')}
              onClose={() => alert('Close clicked!')}
            />
            <Chicklet 
              label="Long Text Example to Test Layout" 
              variant="rectangular" 
              onClick={() => alert('Long text chicklet clicked!')}
            />
          </div>
        </div>
      </div>
    </div>

    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium text-gray-700 mb-2">Design Specifications</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>• <strong>Rectangular:</strong> 4px border radius, 2px vertical padding, 8px horizontal padding</li>
        <li>• <strong>Rounded:</strong> 100px border radius (pill shape), same padding as rectangular</li>
        <li>• <strong>Typography:</strong> Inter font, 500 weight, 14px size, 1.4 line height</li>
        <li>• <strong>Colors:</strong> Default background #F0F1F7, hover #CED1D7, text #434F64</li>
        <li>• <strong>Close Icon:</strong> 14x14px cross icon, same color as text</li>
        <li>• <strong>Spacing:</strong> 8px gap between label and close icon</li>
        <li>• <strong>States:</strong> Default, hover, and disabled with appropriate visual feedback</li>
      </ul>
    </div>
  </div>
);

export const InteractiveDemo = () => {
  const [tags, setTags] = React.useState([
    { id: 1, label: 'React', variant: 'rectangular' as ChickletVariant },
    { id: 2, label: 'TypeScript', variant: 'rounded' as ChickletVariant },
    { id: 3, label: 'Design System', variant: 'rectangular' as ChickletVariant },
    { id: 4, label: 'Figma', variant: 'rounded' as ChickletVariant },
  ]);

  const removeTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const addTag = () => {
    const newId = Math.max(...tags.map(t => t.id), 0) + 1;
    const variants: ChickletVariant[] = ['rectangular', 'rounded'];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    setTags([...tags, { 
      id: newId, 
      label: `Tag ${newId}`, 
      variant: randomVariant 
    }]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Interactive Tag Management</h3>
        <p className="text-gray-600 mb-4">
          Click the close icons to remove tags, or add new ones with the button below.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 min-h-[60px] p-4 border-2 border-dashed border-gray-300 rounded-lg">
        {tags.length === 0 ? (
          <p className="text-gray-500 text-sm">No tags selected</p>
        ) : (
          tags.map(tag => (
            <Chicklet
              key={tag.id}
              label={tag.label}
              variant={tag.variant}
              onClose={() => removeTag(tag.id)}
              onClick={() => console.log(`Clicked: ${tag.label}`)}
            />
          ))
        )}
      </div>
      
      <button
        onClick={addTag}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Add Random Tag
      </button>
    </div>
  );
}; 