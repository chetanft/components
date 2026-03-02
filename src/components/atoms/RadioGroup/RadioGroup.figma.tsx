import { figma } from '@figma/code-connect';
import { RadioGroup } from './RadioGroup';
import { RadioItem } from './RadioItem';
import { RadioItemInput } from './RadioItemInput';
import { RadioItemLabel } from './RadioItemLabel';

figma.connect(RadioGroup, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=129-322', {
  props: {
    selected: figma.enum('State', {
      Selected: true,
      Unselected: false,
      Hover: false,
      'Hover on selected': true,
      Disabled: false,
    }),
    disabled: figma.enum('State', {
      Disabled: true,
      Selected: false,
      Unselected: false,
      Hover: false,
      'Hover on selected': false,
    }),
    hasLabel: figma.boolean('Label'),
    label: figma.textContent('Label'),
  },
  example: (props) => (
    <RadioGroup name="example" defaultValue={props.selected ? 'option-1' : undefined}>
      <RadioItem value="option-1" disabled={props.disabled}>
        <RadioItemInput />
        {props.hasLabel && <RadioItemLabel>{props.label}</RadioItemLabel>}
      </RadioItem>
    </RadioGroup>
  ),
});
