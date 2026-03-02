import { figma } from '@figma/code-connect';
import { QuickFilters, QuickFilter } from './QuickFilters';

// Connect to the main Quick filters component set
figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2657-4544', {
  example: () => (
    <QuickFilters>
      <QuickFilter id="filter-1" label="Alert label" selected={false} />
      <QuickFilter id="filter-2" label="Alert label" count={19} selected={false} />
      <QuickFilter id="filter-3" label="Alert label" count={19} type="alert" selected={false} />
    </QuickFilters>
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
    <QuickFilters>
      <QuickFilter id="normal-default-no-count" label="Alert label" type="normal" selected={false} />
    </QuickFilters>
  )
});

figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2860-11561', {
  variant: {
    'Type': 'Normal',
    'State': 'Default',
    'Count': 'True'
  },
  example: () => (
    <QuickFilters>
      <QuickFilter id="normal-default-with-count" label="Alert label" count={19} type="normal" selected={false} />
    </QuickFilters>
  )
});

figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2860-11561', {
  variant: {
    'Type': 'Normal',
    'State': 'Selected',
    'Count': 'True'
  },
  example: () => (
    <QuickFilters>
      <QuickFilter id="normal-selected-with-count" label="Alert label" count={19} type="normal" selected />
    </QuickFilters>
  )
});

figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2860-11561', {
  variant: {
    'Type': 'Alert',
    'State': 'Default',
    'Count': 'True'
  },
  example: () => (
    <QuickFilters>
      <QuickFilter id="alert-default-with-count" label="Alert label" count={19} type="alert" selected={false} />
    </QuickFilters>
  )
});

figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2860-11561', {
  variant: {
    'Type': 'Alert',
    'State': 'Selected',
    'Count': 'True'
  },
  example: () => (
    <QuickFilters>
      <QuickFilter id="alert-selected-with-count" label="Alert label" count={19} type="alert" selected />
    </QuickFilters>
  )
});
