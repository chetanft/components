import { figma } from '@figma/code-connect';
import { Badge } from './Badge';

figma.connect(Badge, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=53-1184', {
  props: {
    variant: figma.enum('Alert', {
      Normal: 'default',
      Danger: 'danger',
      Success: 'success',
      Warning: 'warning',
      Neutral: 'neutral',
    }),
    hasLeadingIcon: figma.boolean('Leading icon'),
    hasTrailingIcon: figma.boolean('Trailing icon'),
    hasLabel: figma.boolean('Label'),
    interaction: figma.boolean('Interaction'),
    label: figma.textContent('Label'),
  },
  example: (props) => (
    <Badge
      variant={props.variant}
      leadingIcon={props.hasLeadingIcon ? 'placeholder' : undefined}
      trailingIcon={props.hasTrailingIcon ? 'placeholder' : undefined}
      interaction={props.interaction}
    >
      {props.hasLabel ? props.label : undefined}
    </Badge>
  ),
});
