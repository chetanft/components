import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioSelector, RadioSelectorOption } from './RadioSelector';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof RadioSelector> = {
  title: 'Molecules/RadioSelector',
  component: RadioSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A radio selector component for choosing from a set of options with rich content. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'icons', label: 'With Icons', story: 'ExplorerBase', args: { contentType: 'icons' } },
            { id: 'no-radio', label: 'Without Radio', story: 'ExplorerBase', args: { contentType: 'no-radio' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { contentType: 'disabled' } },
            { id: 'controlled', label: 'Controlled', story: 'ExplorerBase', args: { contentType: 'controlled' } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioSelector>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const [value, setValue] = useState(contentType === 'controlled' ? 'option1' : '');
    const syncKey = JSON.stringify({ contentType });
    return (
      <div key={syncKey}>
        <RadioSelector name="choice" value={value} onChange={setValue}>
          {contentType === 'icons' ? (
            <>
              <RadioSelectorOption value="option1" header="Option 1" description="This is option 1" icon={<Icon name="check" size={24} />} />
              <RadioSelectorOption value="option2" header="Option 2" description="This is option 2" icon={<Icon name="settings" size={24} />} />
              <RadioSelectorOption value="option3" header="Option 3" description="This is option 3" icon={<Icon name="user" size={24} />} />
            </>
          ) : contentType === 'no-radio' ? (
            <>
              <RadioSelectorOption value="option1" header="Option 1" description="This option hides the radio button" hideRadio />
              <RadioSelectorOption value="option2" header="Option 2" description="This option also hides the radio button" hideRadio />
            </>
          ) : contentType === 'disabled' ? (
            <>
              <RadioSelectorOption value="option1" header="Option 1" description="This is enabled" />
              <RadioSelectorOption value="option2" header="Option 2" description="This is disabled" disabled />
              <RadioSelectorOption value="option3" header="Option 3" description="This is enabled" />
            </>
          ) : (
            <>
              <RadioSelectorOption value="option1" header="Option 1" description="This is option 1" />
              <RadioSelectorOption value="option2" header="Option 2" description="This is option 2" />
              <RadioSelectorOption value="option3" header="Option 3" description="This is option 3" />
            </>
          )}
        </RadioSelector>
      </div>
    );
  },
};

// Composable API Examples
function ComposableBasicComponent() {
  const [value, setValue] = useState('');
  return (
    <RadioSelector name="choice" value={value} onChange={setValue}>
      <RadioSelectorOption
        value="option1"
        header="Option 1"
        description="This is option 1"
      />
      <RadioSelectorOption
        value="option2"
        header="Option 2"
        description="This is option 2"
      />
      <RadioSelectorOption
        value="option3"
        header="Option 3"
        description="This is option 3"
      />
    </RadioSelector>
  );
}

export const Default: Story = {
  render: () => <ComposableBasicComponent />,
};

function ComposableWithIconsComponent() {
  const [value, setValue] = useState('');
  return (
    <RadioSelector name="choice" value={value} onChange={setValue}>
      <RadioSelectorOption
        value="option1"
        header="Option 1"
        description="This is option 1"
        icon={<Icon name="check" size={24} />}
      />
      <RadioSelectorOption
        value="option2"
        header="Option 2"
        description="This is option 2"
        icon={<Icon name="settings" size={24} />}
      />
      <RadioSelectorOption
        value="option3"
        header="Option 3"
        description="This is option 3"
        icon={<Icon name="user" size={24} />}
      />
    </RadioSelector>
  );
}

export const WithIcons: Story = {
  render: () => <ComposableWithIconsComponent />,
};

function ComposableWithoutRadioComponent() {
  const [value, setValue] = useState('');
  return (
    <RadioSelector name="choice" value={value} onChange={setValue}>
      <RadioSelectorOption
        value="option1"
        header="Option 1"
        description="This option hides the radio button"
        hideRadio
      />
      <RadioSelectorOption
        value="option2"
        header="Option 2"
        description="This option also hides the radio button"
        hideRadio
      />
    </RadioSelector>
  );
}

export const WithoutRadio: Story = {
  render: () => <ComposableWithoutRadioComponent />,
};

function ComposableWithDisabledComponent() {
  const [value, setValue] = useState('');
  return (
    <RadioSelector name="choice" value={value} onChange={setValue}>
      <RadioSelectorOption
        value="option1"
        header="Option 1"
        description="This is enabled"
      />
      <RadioSelectorOption
        value="option2"
        header="Option 2"
        description="This is disabled"
        disabled
      />
      <RadioSelectorOption
        value="option3"
        header="Option 3"
        description="This is enabled"
      />
    </RadioSelector>
  );
}

export const WithDisabled: Story = {
  render: () => <ComposableWithDisabledComponent />,
};

function ComposableControlledComponent() {
  const [value, setValue] = useState('option1');
  return (
    <RadioSelector name="choice" value={value} onChange={setValue}>
      <RadioSelectorOption
        value="option1"
        header="Option 1"
        description="This is option 1 (controlled)"
      />
      <RadioSelectorOption
        value="option2"
        header="Option 2"
        description="This is option 2 (controlled)"
      />
      <RadioSelectorOption
        value="option3"
        header="Option 3"
        description="This is option 3 (controlled)"
      />
    </RadioSelector>
  );
}

export const Controlled: Story = {
  render: () => <ComposableControlledComponent />,
};

