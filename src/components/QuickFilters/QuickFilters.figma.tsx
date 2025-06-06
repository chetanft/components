import { figma } from '@figma/code-connect';
import { QuickFilters } from './QuickFilters';

figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2657-4544', {
  example: () => <QuickFilters filters={[
    {
      id: 'filter-1',
      label: 'All',
      count: 24,
      type: 'normal',
      selected: true,
    },
    {
      id: 'filter-2', 
      label: 'Active',
      count: 12,
      type: 'normal',
      selected: false,
    }
  ]} />,
}); 