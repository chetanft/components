import type { Meta, StoryObj } from '@storybook/react';
import { Mentions, MentionOption } from './Mentions';

const meta: Meta<typeof Mentions> = {
  title: 'Molecules/Mentions',
  component: Mentions,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A textarea component with mention/autocomplete functionality. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Mentions>;

// Declarative API Examples
/** @deprecated Use composable API instead. */
export const LegacyDeclarativeBasic: Story = {
  render: () => (
    <Mentions
      style={{ width: '100%', height: 100 }}
      placeholder="Type @ to see mentions"
      options={[
        { value: 'afc163', label: 'afc163' },
        { value: 'zombieJ', label: 'zombieJ' },
        { value: 'yesmeck', label: 'yesmeck' },
      ]}
    />
  ),
};

/** @deprecated Use composable API instead. */
export const LegacyDeclarativeCustomPrefix: Story = {
  render: () => (
    <Mentions
      style={{ width: '100%', height: 100 }}
      placeholder="Type # to see tags"
      prefix="#"
      options={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
      ]}
    />
  ),
};

// Composable API Examples
export const Default: Story = {
  render: () => (
    <Mentions
      style={{ width: '100%', height: 100 }}
      placeholder="Type @ to see mentions"
    >
      <MentionOption value="afc163">afc163</MentionOption>
      <MentionOption value="zombieJ">zombieJ</MentionOption>
      <MentionOption value="yesmeck">yesmeck</MentionOption>
    </Mentions>
  ),
};

export const CustomPrefix: Story = {
  render: () => (
    <Mentions
      style={{ width: '100%', height: 100 }}
      placeholder="Type # to see tags"
      prefix="#"
    >
      <MentionOption value="react">React</MentionOption>
      <MentionOption value="vue">Vue</MentionOption>
      <MentionOption value="angular">Angular</MentionOption>
    </Mentions>
  ),
};

export const WithRichContent: Story = {
  render: () => (
    <Mentions
      style={{ width: '100%', height: 100 }}
      placeholder="Type @ to mention a user"
    >
      <MentionOption value="john">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-500" />
          <span>John Doe</span>
        </div>
      </MentionOption>
      <MentionOption value="jane">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500" />
          <span>Jane Smith</span>
        </div>
      </MentionOption>
      <MentionOption value="bob">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-500" />
          <span>Bob Johnson</span>
        </div>
      </MentionOption>
    </Mentions>
  ),
};

