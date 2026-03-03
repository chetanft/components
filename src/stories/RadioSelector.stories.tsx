import type { Meta, StoryObj } from '@storybook/react';
import { RadioSelector, RadioSelectorOption, type RadioSelectorOptionType } from '../components/molecules/RadioSelector';

const meta: Meta<typeof RadioSelector> = {
  title: 'Stories/RadioSelector',
  component: RadioSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radio selector component with card-style options featuring headers and descriptions.',
      },
    },
    docsOnly: true,
  },
  tags: ['autodocs'],
  args: {
    glass: true,
  },
  argTypes: {
    glass: {
      control: 'select',
      options: [false, true, 'subtle', 'prominent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioSelector>;

const renderOptions = (options: RadioSelectorOptionType[]) =>
  options.map((option) => (
    <RadioSelectorOption
      key={option.value}
      value={option.value}
      header={option.header}
      description={option.description}
      icon={option.icon}
      disabled={option.disabled}
      hideRadio={option.hideRadio}
    />
  ));

export const Default: Story = {
  render: (args: any) => {
    const options: RadioSelectorOptionType[] = [
      {
        value: 'option1',
        header: 'Option 1',
        description: 'Description for option 1',
      },
      {
        value: 'option2',
        header: 'Option 2',
        description: 'Description for option 2',
      },
    ];

    return (
      <RadioSelector name="default-selector" glass={args.glass}>
        {renderOptions(options)}
      </RadioSelector>
    );
  },
};

export const WithSelection: Story = {
  render: (args: any) => {
    const options: RadioSelectorOptionType[] = [
      {
        value: 'option1',
        header: 'Selected Option',
        description: 'This option is pre-selected',
      },
      {
        value: 'option2',
        header: 'Another Option',
        description: 'Choose this option instead',
      },
    ];

    return (
      <RadioSelector name="selected-selector" defaultValue="option1" glass={args.glass}>
        {renderOptions(options)}
      </RadioSelector>
    );
  },
};

export const ThreeOptions: Story = {
  render: (args: any) => {
    const options: RadioSelectorOptionType[] = [
      {
        value: 'basic',
        header: 'Basic Plan',
        description: 'For small teams getting started',
      },
      {
        value: 'pro',
        header: 'Pro Plan',
        description: 'For growing businesses',
      },
      {
        value: 'enterprise',
        header: 'Enterprise Plan',
        description: 'For large organizations',
      },
    ];

    return (
      <RadioSelector name="three-options" glass={args.glass}>
        {renderOptions(options)}
      </RadioSelector>
    );
  },
};

export const PlanSelector: Story = {
  render: (args: any) => {
    const options: RadioSelectorOptionType[] = [
      {
        value: 'basic',
        header: 'Basic Plan',
        description: 'Perfect for getting started',
      },
      {
        value: 'pro',
        header: 'Pro Plan',
        description: 'For growing teams',
      },
      {
        value: 'enterprise',
        header: 'Enterprise Plan',
        description: 'Full-featured solution',
      },
    ];

    return (
      <RadioSelector name="plan-selector" defaultValue="pro" glass={args.glass}>
        {renderOptions(options)}
      </RadioSelector>
    );
  },
};

export const DocsVariants: Story = {
  name: 'Variants',
  render: (args: any) => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Two Options</p>
        <RadioSelector name="v-two" glass={args.glass}>
          <RadioSelectorOption value="a" header="Option A" description="First option" />
          <RadioSelectorOption value="b" header="Option B" description="Second option" />
        </RadioSelector>
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--secondary)] mb-2">Three Options</p>
        <RadioSelector name="v-three" glass={args.glass}>
          <RadioSelectorOption value="basic" header="Basic Plan" description="For small teams" />
          <RadioSelectorOption value="pro" header="Pro Plan" description="For growing businesses" />
          <RadioSelectorOption value="enterprise" header="Enterprise" description="For large organizations" />
        </RadioSelector>
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}