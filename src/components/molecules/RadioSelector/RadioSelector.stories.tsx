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

// Declarative API Examples
/** @deprecated Use composable API instead. */
export const LegacyDeclarativeBasic: Story = {
  args: {
    name: 'choice',
    options: [
      {
        value: 'option1',
        header: 'Option 1',
        description: 'This is option 1',
      },
      {
        value: 'option2',
        header: 'Option 2',
        description: 'This is option 2',
      },
      {
        value: 'option3',
        header: 'Option 3',
        description: 'This is option 3',
      },
    ],
  },
};

/** @deprecated Use composable API instead. */
export const LegacyDeclarativeWithIcons: Story = {
  args: {
    name: 'choice',
    options: [
      {
        value: 'option1',
        header: 'Option 1',
        description: 'This is option 1',
        icon: <Icon name="check" size={24} />,
      },
      {
        value: 'option2',
        header: 'Option 2',
        description: 'This is option 2',
        icon: <Icon name="settings" size={24} />,
      },
    ],
  },
};

/** @deprecated Use composable API instead. */
export const LegacyDeclarativeWithoutRadio: Story = {
  args: {
    name: 'choice',
    options: [
      {
        value: 'option1',
        header: 'Option 1',
        description: 'This option hides the radio button',
        hideRadio: true,
      },
      {
        value: 'option2',
        header: 'Option 2',
        description: 'This option also hides the radio button',
        hideRadio: true,
      },
    ],
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

