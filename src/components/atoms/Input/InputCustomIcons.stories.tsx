import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Icon } from '../Icons';
import { Badge } from '../Badge';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input/Custom Icons',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Input component with custom icon support. Icons can be IconName strings or custom React components.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export function CustomLeadingIcon() {
  return (
    <div className="space-y-4">
      <Input
        label="Search with custom icon"
        placeholder="Search..."
        leadingIcon={<Icon name="search" size={20} className="text-blue-500" />}
      />
      <Input
        label="Email with badge icon"
        placeholder="Enter email"
        leadingIcon={
          <div className="flex items-center">
            <Badge>@</Badge>
          </div>
        }
      />
    </div>
  );
}

export function CustomTrailingIcon() {
  return (
    <div className="space-y-4">
      <Input
        label="Password with custom trailing icon"
        type="password"
        placeholder="Enter password"
        trailingIcon={<Icon name="eye-invisible" size={18} className="text-gray-500" />}
      />
      <Input
        label="Input with badge trailing icon"
        placeholder="Enter value"
        trailingIcon={<Badge>✓</Badge>}
      />
    </div>
  );
}

export function CustomIconSizing() {
  return (
    <div className="space-y-4">
      <Input
        label="Small icon (16px)"
        placeholder="Search..."
        leadingIcon="search"
        leadingIconSize={16}
      />
      <Input
        label="Medium icon (20px)"
        placeholder="Search..."
        leadingIcon="search"
        leadingIconSize={20}
      />
      <Input
        label="Large icon (24px)"
        placeholder="Search..."
        leadingIcon="search"
        leadingIconSize={24}
      />
    </div>
  );
}

export function CustomIconStyling() {
  return (
    <div className="space-y-4">
      <Input
        label="Blue icon"
        placeholder="Search..."
        leadingIcon="search"
        leadingIconClassName="text-blue-500"
      />
      <Input
        label="Red icon"
        placeholder="Search..."
        leadingIcon="search"
        leadingIconClassName="text-red-500"
      />
      <Input
        label="Green trailing icon"
        placeholder="Search..."
        trailingIcon="check"
        trailingIconClassName="text-green-500"
      />
    </div>
  );
}

export function MixedIcons() {
  return (
    <div className="space-y-4">
      <Input
        label="Custom leading + string trailing"
        placeholder="Search..."
        leadingIcon={<Badge>🔍</Badge>}
        trailingIcon="cross"
      />
      <Input
        label="String leading + custom trailing"
        placeholder="Email"
        leadingIcon="mail"
        trailingIcon={<Badge>✓</Badge>}
      />
    </div>
  );
}

