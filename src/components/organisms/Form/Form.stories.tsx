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

// Basic Form using composable API
export const Default: Story = {
  render: (args: React.ComponentProps<typeof Form>) => (
    <Form
      {...args}
      onFinish={(values) => console.log('Form submitted:', values)}
      onFinishFailed={(errors) => console.log('Validation failed:', errors)}
    >
      <FormItem name="username" required>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="Enter username" />
        </FormControl>
      </FormItem>
      <FormItem name="email" required rules={[{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' }]}>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Enter email" />
        </FormControl>
        <FormError>Please enter a valid email</FormError>
      </FormItem>
      <FormItem name="password" required rules={[{ min: 8, message: 'Password must be at least 8 characters' }]}>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Enter password" />
        </FormControl>
        <FormError>Password must be at least 8 characters</FormError>
      </FormItem>
      <FormItem>
        <Button type="submit" variant="primary">Submit</Button>
      </FormItem>
    </Form>
  ),
  args: {
    layout: 'vertical',
  },
};

// Horizontal Layout using composable API
export const HorizontalLayout: Story = {
  render: (args: React.ComponentProps<typeof Form>) => (
    <Form
      {...args}
      onFinish={(values) => console.log('Form submitted:', values)}
    >
      <FormItem name="firstName" required>
        <FormLabel>First Name</FormLabel>
        <FormControl>
          <Input placeholder="Enter first name" />
        </FormControl>
      </FormItem>
      <FormItem name="lastName" required>
        <FormLabel>Last Name</FormLabel>
        <FormControl>
          <Input placeholder="Enter last name" />
        </FormControl>
      </FormItem>
      <FormItem name="email">
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Enter email" />
        </FormControl>
      </FormItem>
      <FormItem>
        <Button type="submit" variant="primary">Submit</Button>
      </FormItem>
    </Form>
  ),
  args: {
    layout: 'horizontal',
    labelCol: 6,
    wrapperCol: 18,
  },
};

// With Validation using composable API
export const WithValidation: Story = {
  render: (args: React.ComponentProps<typeof Form>) => (
    <Form
      {...args}
      onFinish={(values) => {
        alert('Form submitted successfully!\n' + JSON.stringify(values, null, 2));
      }}
      onFinishFailed={(errors) => {
        console.log('Validation errors:', errors);
      }}
    >
      <FormItem
        name="username"
        required
        rules={[
          { min: 3, message: 'Username must be at least 3 characters' },
          { max: 20, message: 'Username must be at most 20 characters' },
        ]}
      >
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="Enter username" />
        </FormControl>
        <FormHelper>Username must be 3-20 characters</FormHelper>
        <FormError>Username must be between 3 and 20 characters</FormError>
      </FormItem>
      <FormItem
        name="email"
        required
        rules={[
          { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
        ]}
      >
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Enter email" />
        </FormControl>
        <FormError>Please enter a valid email address</FormError>
      </FormItem>
      <FormItem
        name="password"
        required
        rules={[
          { min: 8, message: 'Password must be at least 8 characters' },
          { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
          { pattern: /[0-9]/, message: 'Password must contain at least one number' },
        ]}
      >
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Enter password" />
        </FormControl>
        <FormHelper>At least 8 characters with uppercase and number</FormHelper>
        <FormError>Password does not meet requirements</FormError>
      </FormItem>
      <FormItem
        name="confirmPassword"
        required
        rules={[
          {
            validator: async (value, formValues) => {
              if (value !== formValues.password) {
                return 'Passwords do not match';
              }
              return true;
            },
          },
        ]}
      >
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Confirm password" />
        </FormControl>
        <FormError>Passwords do not match</FormError>
      </FormItem>
      <FormItem name="terms" required rules={[{ validator: (value) => value === true || 'You must accept the terms' }]}>
        <FormControl>
          <Checkbox>I accept the terms and conditions</Checkbox>
        </FormControl>
        <FormError>You must accept the terms</FormError>
      </FormItem>
      <FormItem>
        <div className="flex gap-2">
          <Button type="submit" variant="primary">Register</Button>
          <Button type="reset" variant="secondary">Reset</Button>
        </div>
      </FormItem>
    </Form>
  ),
  args: {
    layout: 'vertical',
  },
};

// ============================================================================
// Legacy stories (declarative API)
// ============================================================================

/**
 * @deprecated Use the Default story with composable API instead.
 */
export const LegacyDefault: Story = {
  render: (args: React.ComponentProps<typeof Form>) => (
    <Form
      {...args}
      onFinish={(values) => console.log('Form submitted:', values)}
      onFinishFailed={(errors) => console.log('Validation failed:', errors)}
    >
      <FormItem name="username" label="Username" required>
        <Input placeholder="Enter username" />
      </FormItem>
      <FormItem name="email" label="Email" required rules={[{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' }]}>
        <Input type="email" placeholder="Enter email" />
      </FormItem>
      <FormItem name="password" label="Password" required rules={[{ min: 8, message: 'Password must be at least 8 characters' }]}>
        <Input type="password" placeholder="Enter password" />
      </FormItem>
      <FormItem>
        <Button type="submit" variant="primary">Submit</Button>
      </FormItem>
    </Form>
  ),
  args: {
    layout: 'vertical',
  },
};

/**
 * @deprecated Use the HorizontalLayout story with composable API instead.
 */
export const LegacyHorizontalLayout: Story = {
  render: (args: React.ComponentProps<typeof Form>) => (
    <Form
      {...args}
      onFinish={(values) => console.log('Form submitted:', values)}
    >
      <FormItem name="firstName" label="First Name" required>
        <Input placeholder="Enter first name" />
      </FormItem>
      <FormItem name="lastName" label="Last Name" required>
        <Input placeholder="Enter last name" />
      </FormItem>
      <FormItem name="email" label="Email">
        <Input type="email" placeholder="Enter email" />
      </FormItem>
      <FormItem>
        <Button type="submit" variant="primary">Submit</Button>
      </FormItem>
    </Form>
  ),
  args: {
    layout: 'horizontal',
    labelCol: 6,
    wrapperCol: 18,
  },
};

/**
 * @deprecated Use the InlineLayout composable API when available.
 */
export const LegacyInlineLayout: Story = {
  render: (args: React.ComponentProps<typeof Form>) => (
    <Form
      {...args}
      onFinish={(values) => console.log('Form submitted:', values)}
    >
      <FormItem name="search" label="Search">
        <Input placeholder="Search..." />
      </FormItem>
      <FormItem name="category" label="Category">
        <Input placeholder="Category" />
      </FormItem>
      <FormItem>
        <Button type="submit" variant="primary">Search</Button>
      </FormItem>
    </Form>
  ),
  args: {
    layout: 'inline',
  },
};

/**
 * @deprecated Use the WithValidation story with composable API instead.
 */
export const LegacyWithValidation: Story = {
  render: (args: React.ComponentProps<typeof Form>) => (
    <Form
      {...args}
      onFinish={(values) => {
        alert('Form submitted successfully!\n' + JSON.stringify(values, null, 2));
      }}
      onFinishFailed={(errors) => {
        console.log('Validation errors:', errors);
      }}
    >
      <FormItem
        name="username"
        label="Username"
        required
        rules={[
          { min: 3, message: 'Username must be at least 3 characters' },
          { max: 20, message: 'Username must be at most 20 characters' },
        ]}
        help="Username must be 3-20 characters"
      >
        <Input placeholder="Enter username" />
      </FormItem>
      <FormItem
        name="email"
        label="Email"
        required
        rules={[
          { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
        ]}
      >
        <Input type="email" placeholder="Enter email" />
      </FormItem>
      <FormItem
        name="password"
        label="Password"
        required
        rules={[
          { min: 8, message: 'Password must be at least 8 characters' },
          { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
          { pattern: /[0-9]/, message: 'Password must contain at least one number' },
        ]}
        help="At least 8 characters with uppercase and number"
      >
        <Input type="password" placeholder="Enter password" />
      </FormItem>
      <FormItem
        name="confirmPassword"
        label="Confirm Password"
        required
        rules={[
          {
            validator: async (value, formValues) => {
              if (value !== formValues.password) {
                return 'Passwords do not match';
              }
              return true;
            },
          },
        ]}
      >
        <Input type="password" placeholder="Confirm password" />
      </FormItem>
      <FormItem name="terms" required rules={[{ validator: (value) => value === true || 'You must accept the terms' }]}>
        <Checkbox>I accept the terms and conditions</Checkbox>
      </FormItem>
      <FormItem>
        <div className="flex gap-2">
          <Button type="submit" variant="primary">Register</Button>
          <Button type="reset" variant="secondary">Reset</Button>
        </div>
      </FormItem>
    </Form>
  ),
  args: {
    layout: 'vertical',
  },
};

/**
 * @deprecated Use composable API with initialValues instead.
 */
export const LegacyWithInitialValues: Story = {
  render: (args: React.ComponentProps<typeof Form>) => (
    <Form
      {...args}
      initialValues={{
        username: 'johndoe',
        email: 'john@example.com',
        bio: 'Software developer',
      }}
      onFinish={(values) => console.log('Form submitted:', values)}
    >
      <FormItem name="username" label="Username">
        <Input placeholder="Enter username" />
      </FormItem>
      <FormItem name="email" label="Email">
        <Input type="email" placeholder="Enter email" />
      </FormItem>
      <FormItem name="bio" label="Bio">
        <Input placeholder="Tell us about yourself" />
      </FormItem>
      <FormItem>
        <Button type="submit" variant="primary">Update Profile</Button>
      </FormItem>
    </Form>
  ),
  args: {
    layout: 'vertical',
  },
};

/**
 * @deprecated Use composable API with disabled prop instead.
 */
export const LegacyDisabledForm: Story = {
  render: (args: React.ComponentProps<typeof Form>) => (
    <Form
      {...args}
      initialValues={{
        username: 'readonly_user',
        email: 'readonly@example.com',
      }}
    >
      <FormItem name="username" label="Username">
        <Input placeholder="Enter username" />
      </FormItem>
      <FormItem name="email" label="Email">
        <Input type="email" placeholder="Enter email" />
      </FormItem>
      <FormItem>
        <Button type="submit" variant="primary">Submit</Button>
      </FormItem>
    </Form>
  ),
  args: {
    layout: 'vertical',
    disabled: true,
  },
};

/**
 * @deprecated Use composable API for complex forms instead.
 */
export const LegacyComplexForm: Story = {
  render: (args: React.ComponentProps<typeof Form>) => (
    <div className="max-w-2xl">
      <Typography variant="title-secondary" className="mb-4">Contact Information</Typography>
      <Form
        {...args}
        onFinish={(values) => console.log('Form submitted:', values)}
      >
        <div className="grid grid-cols-2 gap-4">
          <FormItem name="firstName" label="First Name" required>
            <Input placeholder="First name" />
          </FormItem>
          <FormItem name="lastName" label="Last Name" required>
            <Input placeholder="Last name" />
          </FormItem>
        </div>
        <FormItem name="email" label="Email Address" required rules={[{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }]}>
          <Input type="email" placeholder="email@example.com" leadingIcon="mail" />
        </FormItem>
        <FormItem name="phone" label="Phone Number">
          <Input type="tel" placeholder="+1 (555) 000-0000" leadingIcon="phone" />
        </FormItem>
        <FormItem name="company" label="Company">
          <Input placeholder="Company name" />
        </FormItem>
        <FormItem name="message" label="Message" required rules={[{ min: 10, message: 'Message must be at least 10 characters' }]}>
          <Input placeholder="How can we help you?" />
        </FormItem>
        <FormItem name="newsletter">
          <Checkbox>Subscribe to newsletter</Checkbox>
        </FormItem>
        <FormItem>
          <div className="flex gap-3">
            <Button type="submit" variant="primary">Send Message</Button>
            <Button type="button" variant="secondary">Cancel</Button>
          </div>
        </FormItem>
      </Form>
    </div>
  ),
  args: {
    layout: 'vertical',
  },
};
