import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator
} from './index';
import { Badge } from '../../atoms/Badge';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof Select> = {
  title: 'Molecules/Select/Composable API',
  component: Select,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Shadcn-compatible composable Select API. Use SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, and SelectSeparator for full control.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export function Basic() {
  const [value, setValue] = useState<string>();

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
        <SelectItem value="3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function WithGroups() {
  const [value, setValue] = useState<string>();

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function WithCustomContent() {
  const [value, setValue] = useState<string>();

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">
          <div className="flex items-center gap-2">
            <Badge>Active</Badge>
            <span>Active Status</span>
          </div>
        </SelectItem>
        <SelectItem value="pending">
          <div className="flex items-center gap-2">
            <Badge>Pending</Badge>
            <span>Pending Status</span>
          </div>
        </SelectItem>
        <SelectItem value="inactive">
          <div className="flex items-center gap-2">
            <Badge>Inactive</Badge>
            <span>Inactive Status</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export function WithIcons() {
  const [value, setValue] = useState<string>();

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select action" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="edit">
          <div className="flex items-center gap-2">
            <Icon name="edit" size={16} />
            <span>Edit</span>
          </div>
        </SelectItem>
        <SelectItem value="delete">
          <div className="flex items-center gap-2">
            <Icon name="trash" size={16} />
            <span>Delete</span>
          </div>
        </SelectItem>
        <SelectItem value="share">
          <div className="flex items-center gap-2">
            <Icon name="share" size={16} />
            <span>Share</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export function ComplexLayout() {
  const [value, setValue] = useState<string>();

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select user" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Administrators</SelectLabel>
          <SelectItem value="admin1">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs">
                  JD
                </div>
                <span>John Doe</span>
              </div>
              <Badge>Admin</Badge>
            </div>
          </SelectItem>
          <SelectItem value="admin2">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--primary-500)] flex items-center justify-center text-white text-xs">
                  JS
                </div>
                <span>Jane Smith</span>
              </div>
              <Badge>Admin</Badge>
            </div>
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Users</SelectLabel>
          <SelectItem value="user1">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white text-xs">
                  AB
                </div>
                <span>Alice Brown</span>
              </div>
              <Badge>User</Badge>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

