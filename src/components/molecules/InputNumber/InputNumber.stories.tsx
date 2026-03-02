import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { InputNumber, InputNumberWrapper, InputNumberField, InputNumberControls, InputNumberPrefix, InputNumberSuffix } from './index';

const meta: Meta<typeof InputNumber> = {
  title: 'Molecules/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '🆕 NEW: Numeric input with increment/decrement controls built with FT Design System tokens.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      baseStory: 'ExplorerBase',
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { typeVariant: 'default' } },
            { id: 'prefix', label: 'With Prefix', story: 'ExplorerBase', args: { typeVariant: 'prefix' } },
            { id: 'suffix', label: 'With Suffix', story: 'ExplorerBase', args: { typeVariant: 'suffix' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { disabled: false, error: false } },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { disabled: true } },
            { id: 'error', label: 'Error', story: 'ExplorerBase', args: { error: true } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    controlsPosition: {
      control: 'select',
      options: ['right', 'both'],
    },
    disabled: {
      control: 'boolean',
    },
    controls: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputNumber>;

export const ExplorerBase: Story = {
  render: (args: any) => (
    <div className="p-6">
      <InputNumber defaultValue={args.error ? -5 : args.typeVariant === 'prefix' ? 100 : args.typeVariant === 'suffix' ? 50 : 0} disabled={Boolean(args.disabled)} error={Boolean(args.error)}>
        <InputNumberWrapper>
          {args.typeVariant === 'prefix' ? <InputNumberPrefix>$</InputNumberPrefix> : null}
          <InputNumberField />
          {args.typeVariant === 'suffix' ? <InputNumberSuffix>%</InputNumberSuffix> : null}
          <InputNumberControls />
        </InputNumberWrapper>
      </InputNumber>
    </div>
  ),
};

// Composable API Examples (Recommended)
export const Default: Story = {
  render: () => (
    <div className="p-6">
      <InputNumber defaultValue={0}>
        <InputNumberWrapper>
          <InputNumberField />
          <InputNumberControls />
        </InputNumberWrapper>
      </InputNumber>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '✅ **Composable API**: Use InputNumberWrapper, InputNumberField, InputNumberControls, InputNumberPrefix, and InputNumberSuffix sub-components for flexible input composition.',
      },
    },
  },
};

export const WithPrefix: Story = {
  render: () => (
    <div className="p-6">
      <InputNumber defaultValue={100}>
        <InputNumberWrapper>
          <InputNumberPrefix>$</InputNumberPrefix>
          <InputNumberField />
          <InputNumberControls />
        </InputNumberWrapper>
      </InputNumber>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use InputNumberPrefix for prefix content like currency symbols.',
      },
    },
  },
};

export const WithSuffix: Story = {
  render: () => (
    <div className="p-6">
      <InputNumber defaultValue={50}>
        <InputNumberWrapper>
          <InputNumberField />
          <InputNumberSuffix>%</InputNumberSuffix>
          <InputNumberControls />
        </InputNumberWrapper>
      </InputNumber>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use InputNumberSuffix for suffix content like units.',
      },
    },
  },
};

export const DocsVariants: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-8">
      <div>
        <p className="text-sm font-semibold mb-2">Default (with controls)</p>
        <InputNumber defaultValue={0}>
          <InputNumberWrapper>
            <InputNumberField />
            <InputNumberControls />
          </InputNumberWrapper>
        </InputNumber>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">With Prefix</p>
        <InputNumber defaultValue={100}>
          <InputNumberWrapper>
            <InputNumberPrefix>$</InputNumberPrefix>
            <InputNumberField />
            <InputNumberControls />
          </InputNumberWrapper>
        </InputNumber>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">With Suffix</p>
        <InputNumber defaultValue={50}>
          <InputNumberWrapper>
            <InputNumberField />
            <InputNumberSuffix>%</InputNumberSuffix>
            <InputNumberControls />
          </InputNumberWrapper>
        </InputNumber>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">With Prefix & Suffix</p>
        <InputNumber defaultValue={250}>
          <InputNumberWrapper>
            <InputNumberPrefix>$</InputNumberPrefix>
            <InputNumberField />
            <InputNumberSuffix>USD</InputNumberSuffix>
            <InputNumberControls />
          </InputNumberWrapper>
        </InputNumber>
      </div>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'All visual variants of the InputNumber component shown side-by-side: default, with prefix, suffix, and both.',
      },
    },
  },
};

export const DocsStates: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-8">
      <div>
        <p className="text-sm font-semibold mb-2">Default</p>
        <InputNumber defaultValue={25}>
          <InputNumberWrapper>
            <InputNumberField />
            <InputNumberControls />
          </InputNumberWrapper>
        </InputNumber>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Disabled</p>
        <InputNumber defaultValue={25} disabled>
          <InputNumberWrapper>
            <InputNumberField />
            <InputNumberControls />
          </InputNumberWrapper>
        </InputNumber>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Error</p>
        <InputNumber defaultValue={-5} error>
          <InputNumberWrapper>
            <InputNumberField />
            <InputNumberControls />
          </InputNumberWrapper>
        </InputNumber>
      </div>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'InputNumber states: default, disabled, and error.',
      },
    },
  },
};

export const DisabledState: Story = {
  render: () => (
    <div className="p-6">
      <InputNumber defaultValue={25} disabled>
        <InputNumberWrapper>
          <InputNumberField />
          <InputNumberControls />
        </InputNumberWrapper>
      </InputNumber>
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="p-6">
      <InputNumber defaultValue={-5} error>
        <InputNumberWrapper>
          <InputNumberField />
          <InputNumberControls />
        </InputNumberWrapper>
      </InputNumber>
    </div>
  ),
};
