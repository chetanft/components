import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar, AvatarGroup, AvatarImage, AvatarFallback } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
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
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'with-fallback', label: 'Fallback', story: 'ExplorerBase', args: { contentType: 'fallback' } },
            { id: 'group', label: 'Group', story: 'ExplorerBase', args: { contentType: 'group' } },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'xxs', label: 'XXS', story: 'ExplorerBase', args: { size: 'xxs' } },
            { id: 'xs', label: 'XS', story: 'ExplorerBase', args: { size: 'xs' } },
            { id: 'sm', label: 'SM', story: 'ExplorerBase', args: { size: 'sm' } },
            { id: 'md', label: 'MD', story: 'ExplorerBase', args: { size: 'md' } },
            { id: 'lg', label: 'LG', story: 'ExplorerBase', args: { size: 'lg' } },
            { id: 'xl', label: 'XL', story: 'ExplorerBase', args: { size: 'xl' } },
            { id: 'xxl', label: 'XXL', story: 'ExplorerBase', args: { size: 'xxl' } },
          ],
        },
      ],
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    shape: {
        control: { type: 'select' },
        options: ['circle', 'square'],
    }
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const size = args.size ?? 'md';
    const syncKey = JSON.stringify({ contentType, size });
    return (
      <div key={syncKey} className="p-6 flex gap-4 items-center">
        {contentType === 'default' && (
          <>
            <Avatar size={size} shape="circle">
              <AvatarImage src="https://i.pravatar.cc/300" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar size={size} shape="circle">
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </>
        )}
        {contentType === 'fallback' && (
          <>
            <Avatar size={size} shape="circle">
              <AvatarImage src="invalid-url" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar size={size} shape="square">
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </>
        )}
        {contentType === 'group' && (
          <AvatarGroup maxCount={3} size={size}>
            <Avatar><AvatarImage src="https://i.pravatar.cc/300?img=1" alt="User 1" /><AvatarFallback>U1</AvatarFallback></Avatar>
            <Avatar><AvatarImage src="https://i.pravatar.cc/300?img=2" alt="User 2" /><AvatarFallback>U2</AvatarFallback></Avatar>
            <Avatar><AvatarImage src="https://i.pravatar.cc/300?img=3" alt="User 3" /><AvatarFallback>U3</AvatarFallback></Avatar>
            <Avatar><AvatarImage src="https://i.pravatar.cc/300?img=4" alt="User 4" /><AvatarFallback>U4</AvatarFallback></Avatar>
            <Avatar><AvatarImage src="https://i.pravatar.cc/300?img=5" alt="User 5" /><AvatarFallback>U5</AvatarFallback></Avatar>
          </AvatarGroup>
        )}
      </div>
    );
  },
};

// Composable API Examples (Recommended)
export const Default: Story = {
  render: () => (
    <div className="p-6 flex gap-4 items-center">
      <Avatar size="md" shape="circle">
        <AvatarImage src="https://i.pravatar.cc/300" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar size="md" shape="circle">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '✅ **Composable API**: Use AvatarImage and AvatarFallback sub-components for flexible avatar composition.',
      },
    },
  },
};

export const DocsWithFallback: Story = {
  render: () => (
    <div className="p-6 flex gap-4 items-center">
      <Avatar size="md" shape="circle">
        <AvatarImage src="invalid-url" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar size="lg" shape="square">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'AvatarFallback displays when image fails to load or is not provided.',
      },
    },
  },
};

export const DocsVariants: Story = {
  render: () => (
    <div className="p-6 flex gap-4 items-center">
      <Avatar size="md" shape="circle">
        <AvatarImage src="https://i.pravatar.cc/300?img=1" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar size="md" shape="square">
        <AvatarImage src="https://i.pravatar.cc/300?img=2" alt="User" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar size="md" shape="circle">
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar size="md" shape="square">
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
    </div>
  ),

  parameters: { docsOnly: true },
}