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

export function DocsCustomLeadingIcon() {
  return (
    <div className="space-y-4">
      <Input
        label="Search with custom icon"
        placeholder="Search..."
        leadingIcon={<Icon name="search" size={20} className="text-[var(--info)]" />}
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

export function DocsCustomTrailingIcon() {
  return (
    <div className="space-y-4">
      <Input
        label="Password with custom trailing icon"
        type="password"
        placeholder="Enter password"
        trailingIcon={<Icon name="eye-invisible" size={18} className="text-[var(--tertiary)]" />}
      />
      <Input
        label="Input with badge trailing icon"
        placeholder="Enter value"
        trailingIcon={<Badge>✓</Badge>}
      />
    </div>
  );
}

export function DocsCustomIconSizing() {
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

export function DocsCustomIconStyling() {
  return (
    <div className="space-y-4">
      <Input
        label="Blue icon"
        placeholder="Search..."
        leadingIcon="search"
        leadingIconClassName="text-[var(--info)]"
      />
      <Input
        label="Red icon"
        placeholder="Search..."
        leadingIcon="search"
        leadingIconClassName="text-[var(--critical)]"
      />
      <Input
        label="Green trailing icon"
        placeholder="Search..."
        trailingIcon="check"
        trailingIconClassName="text-[var(--success)]"
      />
    </div>
  );
}

export function DocsMixedIcons() {
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

