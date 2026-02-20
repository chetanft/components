import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Checkbox, CheckboxInput, CheckboxLabel, CheckboxHelper, CheckboxError } from './index';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible checkbox component with support for labels, descriptions, error states, and indeterminate state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the checkbox'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size of the checkbox'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    error: {
      control: 'boolean',
      description: 'Whether the checkbox is in error state'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state'
    },
    description: {
      control: 'text',
      description: 'Additional description text below the checkbox'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked'
    }
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive Demo - all variants shown together and interactable (FIRST per plan)
/** @deprecated Use composable API instead. */
export function LegacyInteractiveDemo() {
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(true);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(true);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [errorChecked, setErrorChecked] = React.useState(false);

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold mb-4">All Checkbox Variants - Interactive</h3>

        {/* Normal States */}
        <div className="space-y-3">
          <Checkbox
            label="Unchecked"
            checked={checked1}
            onChange={(e) => setChecked1(e.target.checked)}
          />
          <Checkbox
            label="Checked"
            checked={checked2}
            onChange={(e) => setChecked2(e.target.checked)}
          />
          <Checkbox
            label="Indeterminate"
            indeterminate={indeterminate}
            checked={indeterminate}
            onChange={(e) => setIndeterminate(e.target.checked)}
          />
        </div>

        {/* With Descriptions */}
        <div className="space-y-3">
          <Checkbox
            label="Accept terms and conditions"
            description="By clicking this checkbox, you agree to the terms and conditions."
            checked={checked3}
            onChange={(e) => setChecked3(e.target.checked)}
          />
          <Checkbox
            label="Enable notifications"
            description="You can enable or disable notifications at any time."
            checked={checked4}
            onChange={(e) => setChecked4(e.target.checked)}
          />
        </div>

        {/* Error State */}
        <div className="space-y-3">
          <Checkbox
            label="Required field"
            error
            description="This field must be checked to continue"
            checked={errorChecked}
            onChange={(e) => setErrorChecked(e.target.checked)}
          />
        </div>

        {/* Disabled States */}
        <div className="space-y-3">
          <Checkbox label="Disabled unchecked" disabled />
          <Checkbox label="Disabled checked" disabled defaultChecked />
        </div>

        {/* Sizes */}
        <div className="space-y-3">
          <Checkbox label="Small checkbox" size="sm" />
          <Checkbox label="Medium checkbox" size="md" />
        </div>
      </div>
    </div>
  );
}

// Default checkbox (unchecked state)
/** @deprecated Use composable API instead. */
export const LegacyDefault: Story = {
  args: {
    label: 'Accept terms and conditions',
    size: 'md',
  },
};

// Checked state
/** @deprecated Use composable API instead. */
export const LegacyChecked: Story = {
  args: {
    label: 'Agreed to terms',
    size: 'md',
    checked: true,
  },
};

// Indeterminate state
/** @deprecated Use composable API instead. */
export const LegacyIndeterminate: Story = {
  args: {
    label: 'Select all items',
    size: 'md',
    indeterminate: true,
  },
};

// With description
/** @deprecated Use composable API instead. */
export const LegacyWithDescription: Story = {
  args: {
    label: 'Newsletter subscription',
    size: 'md',
    description: 'Receive weekly updates about new features and products',
  },
};

// Error state
/** @deprecated Use composable API instead. */
export const LegacyError: Story = {
  args: {
    label: 'Required field',
    size: 'md',
    error: true,
    description: 'This field must be checked to continue',
  },
};

// Disabled state
/** @deprecated Use composable API instead. */
export const LegacyDisabled: Story = {
  args: {
    label: 'Disabled option',
    size: 'md',
    disabled: true,
  },
};

// Disabled checked state
/** @deprecated Use composable API instead. */
export const LegacyDisabledChecked: Story = {
  args: {
    label: 'Permanently enabled',
    size: 'md',
    disabled: true,
    checked: true,
  },
};

// Normal States story - separate preview for normal states
/** @deprecated Use composable API instead. */
export function LegacyNormalStates() {
  return (
    <div className="p-6 space-y-2">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
    </div>
  );
}

// With Descriptions story - separate preview for descriptions
/** @deprecated Use composable API instead. */
export function LegacyWithDescriptions() {
  return (
    <div className="p-6 space-y-2">
      <Checkbox
        label="Newsletter subscription"
        description="Receive weekly updates about new features and products"
      />
      <Checkbox
        label="Marketing emails"
        description="Get promotional offers and special discounts"
        defaultChecked
      />
    </div>
  );
}

// Error State story - separate preview for error state
/** @deprecated Use composable API instead. */
export function LegacyErrorState() {
  return (
    <div className="p-6">
      <Checkbox
        label="Required field"
        error
        description="This field must be checked to continue"
      />
    </div>
  );
}

// Disabled States story - separate preview for disabled states
/** @deprecated Use composable API instead. */
export function LegacyDisabledStates() {
  return (
    <div className="p-6 space-y-2">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  );
}

// Sizes story - separate preview for sizes
/** @deprecated Use composable API instead. */
export function LegacySizes() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col gap-2">
        <Checkbox label="Small checkbox - 1rem (14px)" size="sm" />
        <p className="text-sm text-muted-foreground ml-6">Font: 1rem (14px)</p>
      </div>
      <div className="flex flex-col gap-2">
        <Checkbox label="Medium checkbox - 1.143rem (16px)" size="md" />
        <p className="text-sm text-muted-foreground ml-6">Font: 1.143rem (16px)</p>
      </div>
    </div>
  );
}

// Composable API Examples
function ComposableBasicComponent() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox size="md">
      <CheckboxInput checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
    </Checkbox>
  );
}

export const Default: Story = {
  render: () => <ComposableBasicComponent />,
};

function ComposableWithHelperComponent() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox size="md">
      <CheckboxInput checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <CheckboxLabel>Newsletter subscription</CheckboxLabel>
      <CheckboxHelper>Receive weekly updates about new features and products</CheckboxHelper>
    </Checkbox>
  );
}

export const WithHelper: Story = {
  render: () => <ComposableWithHelperComponent />,
};

function ComposableWithErrorComponent() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox size="md" error>
      <CheckboxInput checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <CheckboxLabel>Required field</CheckboxLabel>
      <CheckboxError>This field must be checked to continue</CheckboxError>
    </Checkbox>
  );
}

export const WithError: Story = {
  render: () => <ComposableWithErrorComponent />,
};

function ComposableIndeterminateComponent() {
  const [checked, setChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(true);
  return (
    <Checkbox size="md">
      <CheckboxInput
        checked={checked}
        indeterminate={indeterminate}
        onChange={(e) => {
          setChecked(e.target.checked);
          setIndeterminate(false);
        }}
      />
      <CheckboxLabel>Select all items</CheckboxLabel>
    </Checkbox>
  );
}

export const Indeterminate: Story = {
  render: () => <ComposableIndeterminateComponent />,
};

