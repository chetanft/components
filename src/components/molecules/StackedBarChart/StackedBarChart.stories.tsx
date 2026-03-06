import type { Meta, StoryObj } from '@storybook/react';
import {
  StackedBarChart,
  StackedBarChartBar,
  StackedBarChartSegment,
} from './StackedBarChart';

const meta: Meta<typeof StackedBarChart> = {
  title: 'Molecules/StackedBarChart',
  component: StackedBarChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
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
      behavior: 'chart',
      previewMode: 'inline' as const,
      defaultRowId: 'type',
      defaultScenarioId: 'Default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'Default', label: 'Default', story: 'Default' as const },
          ],
        },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StackedBarChart>;

export const Default: Story = {
  render: () => (
    <StackedBarChart title="Ageing">
      <StackedBarChartBar label="4+ hrs">
        <StackedBarChartSegment label="Laxmi Transporters" value={27} color="#ffb3c3" />
        <StackedBarChartSegment label="Singh Transporters" value={43} color="#ff809a" />
        <StackedBarChartSegment label="Others" value={48} color="#ff6384" />
      </StackedBarChartBar>
      <StackedBarChartBar label="2-4 hrs">
        <StackedBarChartSegment label="Laxmi Transporters" value={25} color="#ffb3c3" />
        <StackedBarChartSegment label="Singh Transporters" value={35} color="#ff809a" />
        <StackedBarChartSegment label="Others" value={36} color="#ff6384" />
      </StackedBarChartBar>
      <StackedBarChartBar label="<2 hrs">
        <StackedBarChartSegment label="Laxmi Transporters" value={27} color="#ffb3c3" />
        <StackedBarChartSegment label="Singh Transporters" value={33} color="#ff809a" />
        <StackedBarChartSegment label="Others" value={23} color="#ff6384" />
      </StackedBarChartBar>
    </StackedBarChart>
  ),
};


