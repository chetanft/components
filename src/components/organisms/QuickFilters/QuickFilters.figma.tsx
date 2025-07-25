import { figma } from '@figma/code-connect';
import { QuickFilters } from './QuickFilters';

// Connect to the main Quick filters component set
figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2657-4544', {
  example: () => (
    <QuickFilters filters={[
      {
        id: 'filter-1',
        label: 'Alert label',
        selected: false,
      },
      {
        id: 'filter-2', 
        label: 'Alert label',
        count: 19,
        selected: false,
      },
      {
        id: 'filter-3',
        label: 'Alert label',
        count: 19,
        type: 'alert',
        selected: false,
      }
    ]} />
  )
});

// Connect to individual Quick filters element variants
figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2860-11561', {
  variant: {
    'Type': 'Normal',
    'State': 'Default', 
    'Count': 'False'
  },
  example: () => (
    <QuickFilters filters={[
      {
        id: 'normal-default-no-count',
        label: 'Alert label',
        type: 'normal',
        selected: false,
      }
    ]} />
  )
});

figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2860-11561', {
  variant: {
    'Type': 'Normal',
    'State': 'Default',
    'Count': 'True'
  },
  example: () => (
    <QuickFilters filters={[
      {
        id: 'normal-default-with-count',
        label: 'Alert label',
        count: 19,
        type: 'normal',
        selected: false,
      }
    ]} />
  )
});

figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2860-11561', {
  variant: {
    'Type': 'Normal',
    'State': 'Selected',
    'Count': 'True'
  },
  example: () => (
    <QuickFilters filters={[
      {
        id: 'normal-selected-with-count',
        label: 'Alert label',
        count: 19,
        type: 'normal',
        selected: true,
      }
    ]} />
  )
});

figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2860-11561', {
  variant: {
    'Type': 'Alert',
    'State': 'Default',
    'Count': 'True'
  },
  example: () => (
    <QuickFilters filters={[
      {
        id: 'alert-default-with-count',
        label: 'Alert label',
        count: 19,
        type: 'alert',
        selected: false,
      }
    ]} />
  )
});

figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2860-11561', {
  variant: {
    'Type': 'Alert',
    'State': 'Selected',
    'Count': 'True'
  },
  example: () => (
    <QuickFilters filters={[
      {
        id: 'alert-selected-with-count',
        label: 'Alert label',
        count: 19,
        type: 'alert',
        selected: true,
      }
    ]} />
  )
}); 