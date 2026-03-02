import type { Meta, StoryObj } from '@storybook/react';
import { Result, ResultStatusIcon } from './Result';
import { ResultIcon } from './ResultIcon';
import { ResultTitle } from './ResultTitle';
import { ResultSubtitle } from './ResultSubtitle';
import { ResultExtra } from './ResultExtra';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof Result> = {
  title: 'Organisms/Result',
  component: Result,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Result page component built with FT Design System tokens. Use composable sub-components (ResultIcon, ResultTitle, ResultSubtitle, ResultExtra) for the recommended API.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      baseStory: 'ExplorerBase',
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Success', story: 'ExplorerBase', args: { status: 'success' } },
            { id: 'error', label: 'Error', story: 'ExplorerBase', args: { status: 'error' } },
            { id: 'info', label: 'Info', story: 'ExplorerBase', args: { status: 'info' } },
            { id: 'warning', label: 'Warning', story: 'ExplorerBase', args: { status: 'warning' } },
            { id: 'not-found', label: '404', story: 'ExplorerBase', args: { status: '404' } },
            { id: 'forbidden', label: '403', story: 'ExplorerBase', args: { status: '403' } },
            { id: 'server-error', label: '500', story: 'ExplorerBase', args: { status: '500' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { stateVariant: 'default' } },
            { id: 'with-actions', label: 'With Actions', story: 'ExplorerBase', args: { stateVariant: 'with-actions' } },
            { id: 'with-details', label: 'With Details', story: 'ExplorerBase', args: { stateVariant: 'with-details', status: 'error' } },
            { id: 'custom-icon', label: 'Custom Icon', story: 'ExplorerBase', args: { stateVariant: 'custom-icon', status: 'info' } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  args: {
    glass: true,
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning', '404', '403', '500'],
    },
    glass: {
      control: 'select',
      options: [false, true, 'subtle', 'prominent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Result>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const status = args.status ?? 'success';
    const stateVariant = args.stateVariant ?? 'default';
    const titleMap: Record<string, string> = {
      success: 'Successfully Purchased!',
      error: 'Submission Failed',
      info: 'Processing',
      warning: 'Warning',
      '404': 'Page Not Found',
      '403': 'Access Denied',
      '500': 'Server Error',
    };
    return (
      <Result status={status} glass={args.glass}>
        <ResultIcon>
          {stateVariant === 'custom-icon' ? (
            <div className="w-20 h-20 rounded-full bg-[var(--neutral-light)] flex items-center justify-center">
              <Icon name="settings" size={40} style={{ color: 'var(--neutral)' }} />
            </div>
          ) : (
            <ResultStatusIcon status={status} />
          )}
        </ResultIcon>
        <ResultTitle>{titleMap[String(status)] ?? 'Result'}</ResultTitle>
        <ResultSubtitle>
          {stateVariant === 'with-details'
            ? 'Please review the error details below.'
            : 'Operation completed with contextual result feedback.'}
        </ResultSubtitle>
        {(stateVariant === 'with-actions' || stateVariant === 'with-details') && (
          <ResultExtra>
            <Button variant="primary">Primary Action</Button>
            {stateVariant === 'with-actions' ? <Button variant="secondary">Secondary Action</Button> : null}
          </ResultExtra>
        )}
        {stateVariant === 'with-details' && (
          <div className="w-full max-w-lg mt-[var(--x4)]">
            <div className="p-4 bg-[var(--bg-secondary)] rounded-lg text-left">
              <p className="font-medium text-[var(--primary)] mb-2">Error details:</p>
              <ul className="text-sm text-[var(--secondary)] list-disc list-inside space-y-1">
                <li>Field A is required</li>
                <li>Field B format is incorrect</li>
              </ul>
            </div>
          </div>
        )}
      </Result>
    );
  },
};

export const Default: Story = {
  render: () => (
    <Result status="success">
      <ResultIcon>
        <ResultStatusIcon status="success" />
      </ResultIcon>
      <ResultTitle>Successfully Purchased!</ResultTitle>
      <ResultSubtitle>
        Order number: 2017182818828182881. Cloud server configuration takes 1-5 minutes, please wait.
      </ResultSubtitle>
      <ResultExtra>
        <Button variant="primary">Go Console</Button>
        <Button variant="secondary">Buy Again</Button>
      </ResultExtra>
    </Result>
  ),
};

export const DocsVariants: Story = {
  name: 'Variants',
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <Result status="success">
          <ResultIcon><ResultStatusIcon status="success" /></ResultIcon>
          <ResultTitle>Success</ResultTitle>
          <ResultSubtitle>Operation completed.</ResultSubtitle>
        </Result>
        <Result status="error">
          <ResultIcon><ResultStatusIcon status="error" /></ResultIcon>
          <ResultTitle>Error</ResultTitle>
          <ResultSubtitle>Something went wrong.</ResultSubtitle>
        </Result>
        <Result status="info">
          <ResultIcon><ResultStatusIcon status="info" /></ResultIcon>
          <ResultTitle>Info</ResultTitle>
          <ResultSubtitle>Processing will complete shortly.</ResultSubtitle>
        </Result>
        <Result status="warning">
          <ResultIcon><ResultStatusIcon status="warning" /></ResultIcon>
          <ResultTitle>Warning</ResultTitle>
          <ResultSubtitle>Please review.</ResultSubtitle>
        </Result>
        <Result status="404">
          <ResultIcon><ResultStatusIcon status="404" /></ResultIcon>
          <ResultTitle>Page Not Found</ResultTitle>
          <ResultSubtitle>Sorry, the page you visited does not exist.</ResultSubtitle>
        </Result>
        <Result status="403">
          <ResultIcon><ResultStatusIcon status="403" /></ResultIcon>
          <ResultTitle>Access Denied</ResultTitle>
          <ResultSubtitle>Sorry, you are not authorized to access this page.</ResultSubtitle>
        </Result>
        <Result status="500">
          <ResultIcon><ResultStatusIcon status="500" /></ResultIcon>
          <ResultTitle>Server Error</ResultTitle>
          <ResultSubtitle>Sorry, something went wrong on the server.</ResultSubtitle>
        </Result>
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}