import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupLabel, RadioItem, RadioItemInput, RadioItemLabel, RadioGroupHelper, RadioGroupError } from './index';


const meta: Meta<typeof RadioGroup> = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A radio button group component with support for horizontal and vertical layouts.',
      },
    },
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
      baseStory: 'ExplorerBase',
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'layout',
          label: 'Layout',
          scenarios: [
            { id: 'vertical', label: 'Vertical', story: 'ExplorerBase', args: { orientation: 'vertical' } },
            { id: 'horizontal', label: 'Horizontal', story: 'ExplorerBase', args: { orientation: 'horizontal' } },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'sm', label: 'SM', story: 'ExplorerBase', args: { size: 'sm' } },
            { id: 'md', label: 'MD', story: 'ExplorerBase', args: { size: 'md' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { stateVariant: 'default' } },
            { id: 'error', label: 'Error', story: 'ExplorerBase', args: { stateVariant: 'error' } },
          ],
        },
      ],
      defaultRowId: 'layout',
      defaultScenarioId: 'vertical',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the radio buttons',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const [value, setValue] = React.useState(args.stateVariant === 'error' ? '' : 'option1');
    return (
      <RadioGroup
        name="explorer-radio"
        value={value}
        onValueChange={setValue}
        size={args.size ?? 'md'}
        orientation={args.orientation ?? 'vertical'}
      >
        <RadioGroupLabel>Select an option</RadioGroupLabel>
        <RadioItem value="option1"><RadioItemInput /><RadioItemLabel>Option 1</RadioItemLabel></RadioItem>
        <RadioItem value="option2"><RadioItemInput /><RadioItemLabel>Option 2</RadioItemLabel></RadioItem>
        <RadioItem value="option3"><RadioItemInput /><RadioItemLabel>Option 3</RadioItemLabel></RadioItem>
        {args.stateVariant === 'error' ? <RadioGroupError>Please select an option</RadioGroupError> : null}
      </RadioGroup>
    );
  },
};

// Composable API Examples
function ComposableBasicComponent() {
  const [value, setValue] = React.useState('option1');
  return (
    <RadioGroup name="composable-basic" value={value} onValueChange={setValue} size="md" orientation="vertical">
      <RadioGroupLabel>Select an option</RadioGroupLabel>
      <RadioItem value="option1">
        <RadioItemInput />
        <RadioItemLabel>Option 1</RadioItemLabel>
      </RadioItem>
      <RadioItem value="option2">
        <RadioItemInput />
        <RadioItemLabel>Option 2</RadioItemLabel>
      </RadioItem>
      <RadioItem value="option3">
        <RadioItemInput />
        <RadioItemLabel>Option 3</RadioItemLabel>
      </RadioItem>
    </RadioGroup>
  );
}

export const Default: Story = {
  render: () => <ComposableBasicComponent />,
};

function ComposableHorizontalComponent() {
  const [value, setValue] = React.useState('yes');
  return (
    <RadioGroup name="composable-horizontal" value={value} onValueChange={setValue} size="md" orientation="horizontal">
      <RadioItem value="yes">
        <RadioItemInput />
        <RadioItemLabel>Yes</RadioItemLabel>
      </RadioItem>
      <RadioItem value="no">
        <RadioItemInput />
        <RadioItemLabel>No</RadioItemLabel>
      </RadioItem>
      <RadioItem value="maybe">
        <RadioItemInput />
        <RadioItemLabel>Maybe</RadioItemLabel>
      </RadioItem>
    </RadioGroup>
  );
}

export const DocsHorizontal: Story = {
  render: () => <ComposableHorizontalComponent />,

  parameters: { docsOnly: true },
}