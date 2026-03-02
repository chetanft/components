import { figma } from '@figma/code-connect';
import { Input } from './Input';

// Input field wrapper (with label and caption)
figma.connect(Input, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=551-1975', {
  props: {
    hasCaption: figma.boolean('Caption'),
    labelPosition: figma.enum('Label', {
      Top: 'top',
      Left: 'left',
      None: undefined,
    }),
  },
  example: (props) => (
    <Input
      label={props.labelPosition ? 'Label' : undefined}
      helperText={props.hasCaption ? 'Helper text' : undefined}
      placeholder="Placeholder"
    />
  ),
});

// Input content area (with prefix/suffix configuration)
figma.connect(Input, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=786-1725', {
  props: {
    hasPrefix: figma.boolean('Prefix'),
    hasPrefixIcon: figma.boolean('Prefix icon'),
    hasSuffixText: figma.boolean('Suffix text'),
    hasSuffixIcon: figma.boolean('Suffix icon'),
  },
  example: (props) => (
    <Input
      leadingIcon={props.hasPrefixIcon ? 'search' : undefined}
      trailingIcon={props.hasSuffixIcon ? 'chevron-down' : undefined}
      placeholder="Placeholder"
    />
  ),
});
