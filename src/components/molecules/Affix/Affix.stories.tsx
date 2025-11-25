import type { Meta, StoryObj } from '@storybook/react';
import { Affix } from './Affix';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Affix> = {
  title: 'Molecules/Affix',
  component: Affix,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Affix>;

export const Basic: Story = {
  render: () => (
    <div style={{ height: '200vh' }}>
      <div style={{ paddingTop: '100px', paddingLeft: '20px' }}>
        <Affix offsetTop={10}>
          <Button variant="primary">Affix Top (10px)</Button>
        </Affix>
        <br />
        <Button>Normal Button</Button>
      </div>
    </div>
  ),
};

export const Bottom: Story = {
    render: () => (
      <div style={{ height: '200vh' }}>
        <div style={{ paddingTop: '100px', paddingLeft: '20px' }}>
          <Affix offsetBottom={10}>
            <Button variant="primary">Affix Bottom (10px)</Button>
          </Affix>
        </div>
      </div>
    ),
  };

