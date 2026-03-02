import { figma } from '@figma/code-connect';
import { Button } from './Button';

figma.connect(Button, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=593-2130', {
  props: {
    variant: figma.enum('Style', {
      Primary: 'primary',
      Secondary: 'secondary',
      Text: 'text',
      Link: 'link',
    }),
    destructive: figma.enum('Type', {
      Danger: true,
      Normal: false,
    }),
    size: figma.enum('Size', {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
    shape: figma.enum('Rounded', {
      True: 'rounded',
      False: 'default',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
      Default: false,
      Hover: false,
    }),
    hasLeadingIcon: figma.boolean('Leading icon'),
    hasTrailingIcon: figma.boolean('Trailing icon'),
    hasLabel: figma.boolean('Label'),
    label: figma.textContent('Label'),
  },
  example: (props) => (
    <Button
      variant={props.destructive ? 'destructive' : props.variant}
      size={props.size}
      shape={props.shape}
      disabled={props.disabled}
      icon={props.hasLeadingIcon ? 'placeholder' : undefined}
      iconPosition={
        !props.hasLabel
          ? 'only'
          : props.hasLeadingIcon
            ? 'leading'
            : props.hasTrailingIcon
              ? 'trailing'
              : undefined
      }
    >
      {props.hasLabel ? props.label : undefined}
    </Button>
  ),
});
