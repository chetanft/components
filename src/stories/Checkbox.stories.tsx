import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Checkbox } from '../components/Checkbox/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id="terms1" />
        <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Accept terms and conditions
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="terms2" checked />
        <label htmlFor="terms2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Subscribe to newsletter
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="terms3" disabled />
        <label htmlFor="terms3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Disabled option
        </label>
      </div>
    </div>
  ),
};

export const DesignShowcase: Story = {
  render: () => (
    <div className="p-8 bg-white">
      <h2 className="text-lg font-semibold mb-6 text-gray-800">Checkbox States - Exact Figma Design</h2>
      
      <div className="flex flex-row gap-12 items-center">
        <div className="text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">Unselected</div>
          <Checkbox />
        </div>
        
        <div className="text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">Selected</div>
          <Checkbox checked />
        </div>
        
        <div className="text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">Disabled</div>
          <Checkbox disabled />
        </div>
        
        <div className="text-center">
          <div className="mb-3 text-sm font-medium text-gray-600">Disabled Selected</div>
          <Checkbox disabled checked />
        </div>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Checkbox id="unselected" />
          <label htmlFor="unselected" className="text-sm">Unselected</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="selected" checked />
          <label htmlFor="selected" className="text-sm">Selected</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled-unselected" disabled />
          <label htmlFor="disabled-unselected" className="text-sm">Disabled</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled-selected" disabled checked />
          <label htmlFor="disabled-selected" className="text-sm">Disabled Selected</label>
        </div>
      </div>
    </div>
  ),
};

export const FigmaComparison: Story = {
  render: () => (
    <div className="p-8 bg-white space-y-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Checkbox States - Figma Accurate Implementation</h2>
      
      {/* States with Labels - Matches Figma exactly */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">With Labels (Exact Figma States)</h3>
        <div className="flex flex-wrap gap-8">
          <div className="text-center">
            <div className="mb-2 text-sm font-medium text-gray-600">Unselected</div>
            <Checkbox label="Label" />
            <div className="mt-1 text-xs text-gray-500">State=Unselected, Label=True</div>
          </div>
          
          <div className="text-center">
            <div className="mb-2 text-sm font-medium text-gray-600">Selected</div>
            <Checkbox label="Label" checked />
            <div className="mt-1 text-xs text-gray-500">State=Selected, Label=True</div>
          </div>
          
          <div className="text-center">
            <div className="mb-2 text-sm font-medium text-gray-600">All Selected (Indeterminate)</div>
            <Checkbox label="Label" indeterminate />
            <div className="mt-1 text-xs text-gray-500">State=All Selected, Label=True</div>
            <div className="mt-1 text-xs text-blue-600 font-medium">Used in table headers</div>
          </div>
          
          <div className="text-center">
            <div className="mb-2 text-sm font-medium text-gray-600">Disabled</div>
            <Checkbox label="Label" disabled />
            <div className="mt-1 text-xs text-gray-500">State=Disabled, Label=True</div>
          </div>
        </div>
      </div>

      {/* States without Labels */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Without Labels</h3>
        <div className="flex flex-wrap gap-8">
          <div className="text-center">
            <div className="mb-2 text-sm font-medium text-gray-600">Unselected</div>
            <Checkbox />
            <div className="mt-1 text-xs text-gray-500">State=Unselected, Label=False</div>
          </div>
          
          <div className="text-center">
            <div className="mb-2 text-sm font-medium text-gray-600">Selected</div>
            <Checkbox checked />
            <div className="mt-1 text-xs text-gray-500">State=Selected, Label=False</div>
          </div>
          
          <div className="text-center">
            <div className="mb-2 text-sm font-medium text-gray-600">All Selected (Indeterminate)</div>
            <Checkbox indeterminate />
            <div className="mt-1 text-xs text-gray-500">State=All Selected, Label=False</div>
            <div className="mt-1 text-xs text-blue-600 font-medium">Table header use case</div>
          </div>
          
          <div className="text-center">
            <div className="mb-2 text-sm font-medium text-gray-600">Disabled</div>
            <Checkbox disabled />
            <div className="mt-1 text-xs text-gray-500">State=Disabled, Label=False</div>
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Interactive Demo</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox id="demo1" label="Accept terms and conditions" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="demo2" label="Subscribe to newsletter" checked />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="demo3" label="Select all items" indeterminate />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="demo4" label="Disabled option" disabled />
          </div>
        </div>
      </div>

      {/* Color Reference */}
      <div className="space-y-2 text-sm text-gray-600">
        <h3 className="text-base font-medium text-gray-700">Figma Color Reference</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p><strong>Unselected:</strong> Border #838C9D, Background transparent, Label #838C9D</p>
            <p><strong>Selected:</strong> Background #434F64, Checkmark #FFFFFF, Label #434F64</p>
          </div>
          <div>
            <p><strong>Hover (Unselected):</strong> Background #CED1D7, Border #838C9D</p>
            <p><strong>Hover (Selected):</strong> Background #1D2A38, Border #1D2A38</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const TableRowSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<number[]>([1, 3]);
    const totalRows = 5;
    const allSelected = selectedRows.length === totalRows;
    const someSelected = selectedRows.length > 0 && selectedRows.length < totalRows;
    
    const handleSelectAll = () => {
      if (allSelected) {
        setSelectedRows([]);
      } else {
        setSelectedRows([1, 2, 3, 4, 5]);
      }
    };
    
    const handleRowToggle = (rowId: number) => {
      setSelectedRows(prev => 
        prev.includes(rowId) 
          ? prev.filter(id => id !== rowId)
          : [...prev, rowId]
      );
    };

    return (
      <div className="p-8 bg-white space-y-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Table Row Selection - Indeterminate State</h2>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-2">
            <strong>Use Case:</strong> Table header checkbox showing indeterminate state when some (but not all) rows are selected
          </div>
          
          {/* Table Header with Select All */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <Checkbox 
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                />
                <span className="font-medium text-gray-700">
                  Select All ({selectedRows.length} of {totalRows} selected)
                </span>
              </div>
            </div>
            
            {/* Table Rows */}
            <div className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((rowId) => (
                <div key={rowId} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={selectedRows.includes(rowId)}
                      onChange={() => handleRowToggle(rowId)}
                      id={`row-${rowId}`}
                    />
                    <label htmlFor={`row-${rowId}`} className="text-gray-700 cursor-pointer flex-1">
                      Row {rowId} - Sample data item
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* State Indicators */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Current State:</h3>
            <div className="text-sm text-blue-800">
              {allSelected && "✅ All rows selected (checked state)"}
              {someSelected && "➖ Some rows selected (indeterminate state)"}
              {selectedRows.length === 0 && "☐ No rows selected (unchecked state)"}
            </div>
          </div>
        </div>
      </div>
    );
  },
}; 