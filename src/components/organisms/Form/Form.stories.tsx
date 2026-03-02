import type { Meta, StoryObj } from '@storybook/react';
import { Form, FormItem, FormLabel, FormControl, FormHelper, FormError } from './index';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { Checkbox } from '../../atoms/Checkbox';
import { Typography } from '../../atoms/Typography';

const meta: Meta<typeof Form> = {
  title: 'Organisms/Form',
  component: Form,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A form component with validation, layout options, and field management. Built using FT Design System tokens.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'layout',
          label: 'Layout',
          scenarios: [
            { id: 'default', label: 'Vertical', story: 'ExplorerBase' },
            { id: 'horizontal', label: 'Horizontal', story: 'ExplorerBase', args: { layout: 'horizontal' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase' },
            { id: 'validation', label: 'With Validation', story: 'ExplorerBase', args: { showValidation: true } },
          ],
        },
      ],
      defaultRowId: 'layout',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'inline'],
      description: 'Form layout direction',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all form fields',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of form controls',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const ExplorerBase: Story = {
  render: (args: any) => (
    <Form layout={args.layout || 'vertical'} labelCol={args.layout === 'horizontal' ? 6 : undefined} wrapperCol={args.layout === 'horizontal' ? 18 : undefined}>
      <FormItem name="name" required>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder="Enter name" />
        </FormControl>
        {args.showValidation && <FormError>Name is required</FormError>}
      </FormItem>
      <FormItem name="email">
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Enter email" />
        </FormControl>
        {args.showValidation && <FormHelper>We will never share your email.</FormHelper>}
      </FormItem>
      <FormItem>
        <Button type="submit" variant="primary">Submit</Button>
      </FormItem>
    </Form>
  ),
};

export const DocsVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Typography variant="body-primary-semibold" className="mb-2">Vertical Layout (Default)</Typography>
        <Form layout="vertical">
          <FormItem name="v-name" required>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter name" />
            </FormControl>
          </FormItem>
          <FormItem name="v-email">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter email" />
            </FormControl>
          </FormItem>
          <FormItem>
            <Button type="submit" variant="primary">Submit</Button>
          </FormItem>
        </Form>
      </div>
      <div>
        <Typography variant="body-primary-semibold" className="mb-2">Horizontal Layout</Typography>
        <Form layout="horizontal" labelCol={6} wrapperCol={18}>
          <FormItem name="h-name" required>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter name" />
            </FormControl>
          </FormItem>
          <FormItem name="h-email">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter email" />
            </FormControl>
          </FormItem>
          <FormItem>
            <Button type="submit" variant="primary">Submit</Button>
          </FormItem>
        </Form>
      </div>
      <div>
        <Typography variant="body-primary-semibold" className="mb-2">Inline Layout</Typography>
        <Form layout="inline">
          <FormItem name="i-search">
            <FormLabel>Search</FormLabel>
            <FormControl>
              <Input placeholder="Search..." />
            </FormControl>
          </FormItem>
          <FormItem>
            <Button type="submit" variant="primary">Search</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}