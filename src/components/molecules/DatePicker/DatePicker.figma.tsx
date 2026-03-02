import { figma } from '@figma/code-connect';
import { DatePicker } from './DatePicker';

figma.connect(DatePicker, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=800-2791', {
  props: {
    size: figma.enum('Size', {
      xl: 'xl',
      'lg-52px': 'lg',
      lg: 'lg',
      md: 'md',
      sm: 'sm',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
      Default: false,
      Filled: false,
      Hover: false,
      Focused: false,
      Typing: false,
      'Pre filled': false,
    }),
    error: figma.enum('Type', {
      Error: true,
      Normal: false,
      Warning: false,
      Success: false,
    }),
  },
  example: (props) => (
    <DatePicker
      placeholder="Select date"
      disabled={props.disabled}
      error={props.error}
    />
  ),
});
