import { figma } from '@figma/code-connect';
import { Tabs, TabItem } from './Tabs';

// Tabs container
figma.connect(Tabs, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=562-8084', {
  props: {
    count: figma.enum('Count', {
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
    }),
    showLine: figma.boolean('Show line'),
  },
  example: (props) => (
    <Tabs>
      {Array.from({ length: props.count }, (_, i) => (
        <TabItem key={i} label={`Tab ${i + 1}`} />
      ))}
    </Tabs>
  ),
});

// Tab Item
figma.connect(TabItem, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=356-967', {
  props: {
    type: figma.enum('Type', {
      Primary: 'primary',
      Secondary: 'secondary',
      Tertiary: 'tertiary',
    }),
    active: figma.enum('State', {
      Selected: true,
      Unselected: false,
      'On Hover': false,
      Line: false,
    }),
    hasBadge: figma.boolean('Badge'),
    hasNotification: figma.boolean('Notification'),
    hasIcon: figma.boolean('Icon'),
    label: figma.textContent('Label'),
  },
  example: (props) => (
    <TabItem
      label={props.label}
      type={props.type}
      active={props.active}
      badge={props.hasBadge}
      notification={props.hasNotification}
      icon={props.hasIcon ? 'placeholder' : undefined}
    />
  ),
});
