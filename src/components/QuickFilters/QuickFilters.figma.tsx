import { figma } from '@figma/code-connect';
import { QuickFilters } from './QuickFilters';

figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2657-4544', {
  props: {
    filters: figma.nestedProps('Quick filters', {
      id: figma.string('Instance ID'),
      label: figma.textContent('Status || Label'),
      count: figma.textContent('Count'),
      type: figma.enum('Type', {
        'Normal': 'normal',
        'Alert': 'alert',
      }),
      selected: figma.enum('State', {
        'Default': false,
        'Selected': true,
      }),
    }),
  },
  example: (props) => <QuickFilters {...props} />,
}); 