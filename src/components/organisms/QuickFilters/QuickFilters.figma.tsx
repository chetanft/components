import { figma } from '@figma/code-connect';
import { QuickFilters } from './QuickFilters';

figma.connect(QuickFilters, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2657-4544', {
  example: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Single Filters</h4>
        <QuickFilters filters={[
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
          },
          {
            id: 'filter-3',
            label: 'Alert',
            count: 5,
            type: 'alert',
            selected: false,
          }
        ]} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Multi-option Filters</h4>
        <QuickFilters filters={[
          {
            id: 'multi-1',
            label: 'E Way bill',
            type: 'normal',
            options: [
              { id: 'expiring', label: 'Expiring in 3 hrs', count: 28 },
              { id: 'expired', label: 'Expired', count: 18 },
            ],
          },
          {
            id: 'multi-2',
            label: 'Delayed',
            count: 51,
            type: 'alert',
            options: [
              { id: '0-6hrs', label: '0-6 hrs', count: 28, type: 'alert' },
              { id: '6-12hrs', label: '6-12 hrs', count: 18, type: 'alert' },
              { id: '12plus', label: '12+ hrs', count: 5, type: 'alert' },
            ],
          }
        ]} />
      </div>
    </div>
  )
}); 