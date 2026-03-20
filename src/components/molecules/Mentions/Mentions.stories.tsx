import type { Meta, StoryObj } from '@storybook/react';
import { Mentions, MentionOption } from './Mentions';

const meta: Meta<typeof Mentions> = {
  title: 'Molecules/Mentions',
  component: Mentions,
  argTypes: {
    prefix: {
      control: 'text',
      description: 'Character(s) that trigger the mention dropdown.',
    },
    split: {
      control: 'text',
      description: 'Separator character for splitting mention text.',
    },
    status: {
      control: 'select',
      options: ['error', 'warning'],
      description: 'Validation status of the mentions field.',
    },
    autoSize: {
      control: 'boolean',
      description: 'Whether the textarea auto-resizes.',
    },
    filterOption: {
      control: false,
      description: 'Custom filter function for mention options.',
    },
    onChange: {
      control: false,
      description: 'Callback when the textarea value changes.',
    },
    onSelect: {
      control: false,
      description: 'Callback when a mention option is selected.',
    },
    onSearch: {
      control: false,
      description: 'Callback when searching within a mention prefix.',
    },
    children: {
      control: false,
      description: 'MentionOption children for the composable API.',
    },
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A textarea component with mention/autocomplete functionality. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
    explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
      mode: 'matrix' as const,
      behavior: 'anchored' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default (@)', story: 'Default' },
            { id: 'custom-prefix', label: 'Custom Prefix (#)', story: 'CustomPrefix' },
            { id: 'rich-content', label: 'Rich Content', story: 'WithRichContent' },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Mentions>;

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
  parameters: {
    docs: {
      source: {
        code: `<Mentions
  style={{ width: '100%', height: 100 }}
  placeholder="Type @ to see mentions"
>
  <MentionOption value="afc163">afc163</MentionOption>
  <MentionOption value="zombieJ">zombieJ</MentionOption>
  <MentionOption value="yesmeck">yesmeck</MentionOption>
</Mentions>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Mentions
  style={{ width: '100%', height: 100 }}
  placeholder="Type # to see tags"
  prefix="#"
>
  <MentionOption value="react">React</MentionOption>
  <MentionOption value="vue">Vue</MentionOption>
  <MentionOption value="angular">Angular</MentionOption>
</Mentions>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const WithRichContent: Story = {
  render: () => (
    <Mentions
      style={{ width: '100%', height: 100 }}
      placeholder="Type @ to mention a user"
    >
      <MentionOption value="john">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[var(--info)]" />
          <span>John Doe</span>
        </div>
      </MentionOption>
      <MentionOption value="jane">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[var(--success)]" />
          <span>Jane Smith</span>
        </div>
      </MentionOption>
      <MentionOption value="bob">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[var(--primary)]" />
          <span>Bob Johnson</span>
        </div>
      </MentionOption>
    </Mentions>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Mentions
  style={{ width: '100%', height: 100 }}
  placeholder="Type @ to mention a user"
>
  <MentionOption value="john">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-[var(--info)]" />
      <span>John Doe</span>
    </div>
  </MentionOption>
  <MentionOption value="jane">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-[var(--success)]" />
      <span>Jane Smith</span>
    </div>
  </MentionOption>
  <MentionOption value="bob">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-[var(--primary)]" />
      <span>Bob Johnson</span>
    </div>
  </MentionOption>
</Mentions>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};
