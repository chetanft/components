import { figma } from '@figma/code-connect';
import { Checkbox } from './Checkbox';

figma.connect(Checkbox, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=129-297', {
  props: {
    checked: figma.enum('State', {
      Selected: true,
      Unselected: false,
      Hover: false,
      'Hover on selected': true,
      Disabled: false,
      'All Selected': true,
    }),
    indeterminate: figma.enum('State', {
      'All Selected': true,
      Selected: false,
      Unselected: false,
      Hover: false,
      'Hover on selected': false,
      Disabled: false,
    }),
    disabled: figma.enum('State', {
      Disabled: true,
      Selected: false,
      Unselected: false,
      Hover: false,
      'Hover on selected': false,
      'All Selected': false,
    }),
    hasLabel: figma.boolean('Label'),
    label: figma.textContent('Label'),
  },
  example: (props) => (
    <Checkbox
      checked={props.checked}
      indeterminate={props.indeterminate}
      disabled={props.disabled}
    >
      {props.hasLabel ? props.label : undefined}
    </Checkbox>
  ),
});
