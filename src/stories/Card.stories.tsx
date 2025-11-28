import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/organisms/Card';
import { Badge } from '../components/atoms/Badge';
import { Button } from '../components/atoms/Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Flexible card component with configurable content sections. Supports basic and advanced layouts with eyebrow, header, body, and footer sections based on Figma designs.'
      }
    }
  },
  argTypes: {
    contentVariant: {
      control: 'select',
      options: ['Basic', 'Advanced'],
      description: 'Card content variant'
    },
    state: {
      control: 'select',
      options: ['Default'],
      description: 'Card state'
    },
    showEyebrow: {
      control: 'boolean',
      description: 'Show eyebrow section with badges'
    },
    showFooter: {
      control: 'boolean',
      description: 'Show footer section with actions'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

// Basic Card with all sections
export const Basic: Story = {
  args: {
    contentVariant: 'Basic',
    state: 'Default',
    showEyebrow: true,
    showFooter: true,
    eyebrowBadges: [
      <Badge key="badge1" variant="normal">Label</Badge>,
      <Badge key="badge2" variant="normal">Label</Badge>
    ],
    headerTitle: 'Text',
    headerSubText: 'Sub text',
    showArrowIcon: true,
    bodySections: [
      {
        statisticValue: 'Text',
        statisticLabel: 'Label',
        readOnlyLabel: 'Label',
        readOnlyText: 'Text'
      },
      {
        statisticValue: 'Text',
        statisticLabel: 'Label',
        readOnlyLabel: 'Label',
        readOnlyText: 'Text'
      }
    ],
    footerText: 'Text',
    footerButton: (
      <Button variant="primary" size="md" icon="add">
        Button
      </Button>
    )
  },
};

// Advanced Card with Graphic
export const Advanced: Story = {
  args: {
    contentVariant: 'Advanced',
    state: 'Default', 
    showEyebrow: true,
    showFooter: true,
    eyebrowBadges: [
      <Badge key="badge1" variant="normal">Label</Badge>,
      <Badge key="badge2" variant="normal">Label</Badge>
    ],
    headerTitle: 'Text',
    headerSubText: 'Sub text',
    showArrowIcon: true,
    bodySections: [
      {
        statisticValue: 'Text',
        statisticLabel: 'Label',
        readOnlyLabel: 'Label',
        readOnlyText: 'Text'
      },
      {
        statisticValue: 'Text',
        statisticLabel: 'Label',
        readOnlyLabel: 'Label',
        readOnlyText: 'Text'
      }
    ],
    footerText: 'Text',
    footerButton: (
      <Button variant="primary" size="md" icon="add">
        Button
      </Button>
    ),
    graphic: {
      padding: false,
      overlayAction: false,
      graphic: 'Image',
      imageUrl: 'https://via.placeholder.com/549x175'
    }
  },
};

// Card with Graphic and Padding
export const WithGraphicPadding: Story = {
  args: {
    contentVariant: 'Advanced',
    state: 'Default',
    showEyebrow: false,
    showFooter: false,
    graphic: {
      padding: true,
      overlayAction: false,
      graphic: 'Image',
      imageUrl: 'https://via.placeholder.com/549x175'
    }
  },
};

// Card with Graphic and Overlay Action
export const WithGraphicOverlay: Story = {
  args: {
    contentVariant: 'Advanced',
    state: 'Default',
    showEyebrow: false,
    showFooter: false,
    graphic: {
      padding: true,
      overlayAction: true,
      graphic: 'Image',
      imageUrl: 'https://via.placeholder.com/549x175'
    }
  },
};

// Card Elements - Eyebrow Only
export const CardElementsEyebrow: Story = {
  render: () => (
    <Card
      showEyebrow={true}
      showFooter={false}
      eyebrowBadges={[
        <Badge key="badge1" variant="normal">Label</Badge>,
        <Badge key="badge2" variant="normal">Label</Badge>
      ]}
    />
  ),
};

// Card Elements - Header Only
export const CardElementsHeader: Story = {
  render: () => (
    <Card
      showEyebrow={false}
      showFooter={false}
      headerTitle="Text"
      headerSubText="Sub text"
      showArrowIcon={true}
    />
  ),
};

// Card Elements - Body Only
export const CardElementsBody: Story = {
  render: () => (
    <Card
      showEyebrow={false}
      showFooter={false}
      bodySections={[
        {
          statisticValue: 'Text',
          statisticLabel: 'Label',
          readOnlyLabel: 'Label',
          readOnlyText: 'Text'
        }
      ]}
    />
  ),
};

// Card Footer Only
export const CardFooterOnly: Story = {
  render: () => (
    <Card
      showEyebrow={false}
      showFooter={true}
      footerText="Text"
      footerButton={
        <Button variant="primary" size="md" icon="add">
          Button
        </Button>
      }
    />
  ),
};

// Without Eyebrow
export const WithoutEyebrow: Story = {
  args: {
    contentVariant: 'Basic',
    state: 'Default',
    showEyebrow: false,
    showFooter: true,
    headerTitle: 'Text',
    headerSubText: 'Sub text',
    showArrowIcon: true,
    bodySections: [
      {
        statisticValue: 'Text',
        statisticLabel: 'Label',
        readOnlyLabel: 'Label',
        readOnlyText: 'Text'
      }
    ],
    footerText: 'Text',
    footerButton: (
      <Button variant="primary" size="md" icon="add">
        Button
      </Button>
    )
  },
};

// Without Footer
export const WithoutFooter: Story = {
  args: {
    contentVariant: 'Basic',
    state: 'Default',
    showEyebrow: true,
    showFooter: false,
    eyebrowBadges: [
      <Badge key="badge1" variant="normal">Label</Badge>,
      <Badge key="badge2" variant="normal">Label</Badge>
    ],
    headerTitle: 'Text',
    headerSubText: 'Sub text',
    showArrowIcon: true,
    bodySections: [
      {
        statisticValue: 'Text',
        statisticLabel: 'Label',
        readOnlyLabel: 'Label',
        readOnlyText: 'Text'
      }
    ]
  },
};

// Minimal Card
export const Minimal: Story = {
  args: {
    contentVariant: 'Basic',
    state: 'Default',
    showEyebrow: false,
    showFooter: false,
    headerTitle: 'Text',
    headerSubText: 'Sub text',
    showArrowIcon: true
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Card</h3>
        <div className="max-w-[calc(var(--spacing-x10)*13.725)]">
          <Card 
            contentVariant="Basic"
            state="Default"
            showEyebrow={true}
            showFooter={true}
            eyebrowBadges={[
              <Badge key="badge1" variant="normal">Label</Badge>,
              <Badge key="badge2" variant="normal">Label</Badge>
            ]}
            headerTitle="Text"
            headerSubText="Sub text"
            showArrowIcon={true}
            bodySections={[
              {
                statisticValue: 'Text',
                statisticLabel: 'Label',
                readOnlyLabel: 'Label',
                readOnlyText: 'Text'
              },
              {
                statisticValue: 'Text',
                statisticLabel: 'Label',
                readOnlyLabel: 'Label',
                readOnlyText: 'Text'
              }
            ]}
            footerText="Text"
            footerButton={
              <Button variant="primary" size="md" icon="add">
                Button
              </Button>
            }
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Advanced Card with Graphic</h3>
        <div className="max-w-[calc(var(--spacing-x10)*13.725)]">
          <Card 
            contentVariant="Advanced"
            state="Default"
            showEyebrow={true}
            showFooter={true}
            eyebrowBadges={[
              <Badge key="badge1" variant="normal">Label</Badge>,
              <Badge key="badge2" variant="normal">Label</Badge>
            ]}
            headerTitle="Text"
            headerSubText="Sub text"
            showArrowIcon={true}
            bodySections={[
              {
                statisticValue: 'Text',
                statisticLabel: 'Label',
                readOnlyLabel: 'Label',
                readOnlyText: 'Text'
              },
              {
                statisticValue: 'Text',
                statisticLabel: 'Label',
                readOnlyLabel: 'Label',
                readOnlyText: 'Text'
              }
            ]}
            footerText="Text"
            footerButton={
              <Button variant="primary" size="md" icon="add">
                Button
              </Button>
            }
            graphic={{
              padding: false,
              overlayAction: false,
              graphic: 'Image',
              imageUrl: 'https://via.placeholder.com/549x175'
            }}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal Card</h3>
        <div className="max-w-[calc(var(--spacing-x10)*13.725)]">
          <Card 
            contentVariant="Basic"
            state="Default"
            showEyebrow={false}
            showFooter={false}
            headerTitle="Text"
            headerSubText="Sub text"
            showArrowIcon={true}
          />
        </div>
      </div>
    </div>
  ),
};
