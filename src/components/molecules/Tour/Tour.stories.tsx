import type { Meta, StoryObj } from '@storybook/react';
import { Tour, TourStep } from './Tour';
import { Button } from '../../atoms/Button/Button';
import { useRef, useState } from 'react';

const meta: Meta<typeof Tour> = {
  title: 'Molecules/Tour',
  component: Tour,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A tour component for guiding users through features. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tour>;

// Declarative API Example
const DeclarativeTourDemo = () => {
    const ref1 = useRef<HTMLButtonElement>(null);
    const ref2 = useRef<HTMLButtonElement>(null);
    const ref3 = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);

    const steps = [
        {
            title: 'Upload File',
            description: 'Put your files here.',
            target: () => ref1.current,
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => ref2.current,
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => ref3.current,
        },
    ];

    return (
        <div style={{ padding: 40 }}>
            <Button variant="primary" onClick={() => setOpen(true)}>Begin Tour (Declarative)</Button>
            
            <div style={{ marginTop: 40, display: 'flex', gap: 20 }}>
                <Button ref={ref1}>Upload</Button>
                <Button ref={ref2} variant="secondary">Save</Button>
                <Button ref={ref3} variant="ghost">More</Button>
            </div>

            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        </div>
    );
};

// Composable API Example
const ComposableTourDemo = () => {
    const ref1 = useRef<HTMLButtonElement>(null);
    const ref2 = useRef<HTMLButtonElement>(null);
    const ref3 = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(false);

    return (
        <div style={{ padding: 40 }}>
            <Button variant="primary" onClick={() => setOpen(true)}>Begin Tour (Composable)</Button>
            
            <div style={{ marginTop: 40, display: 'flex', gap: 20 }}>
                <Button ref={ref1}>Upload</Button>
                <Button ref={ref2} variant="secondary">Save</Button>
                <Button ref={ref3} variant="ghost">More</Button>
            </div>

            <Tour open={open} onClose={() => setOpen(false)}>
                <TourStep title="Upload File" target={() => ref1.current}>
                    Put your files here.
                </TourStep>
                <TourStep title="Save" target={() => ref2.current}>
                    Save your changes.
                </TourStep>
                <TourStep title="Other Actions" target={() => ref3.current}>
                    Click to see other actions.
                </TourStep>
            </Tour>
        </div>
    );
};

/** @deprecated Use composable API instead. */
export const LegacyDeclarativeBasic: Story = {
  render: () => <DeclarativeTourDemo />,
};

export const Default: Story = {
  render: () => <ComposableTourDemo />,
};

