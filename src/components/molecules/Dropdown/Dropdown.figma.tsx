import { figma } from '@figma/code-connect';
import { Dropdown } from './Dropdown';

figma.connect(Dropdown, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=501-737', {
  props: {
    labelPosition: figma.enum('Label', {
      Top: 'top',
      Left: 'left',
      None: undefined,
    }),
    hasCaption: figma.boolean('Caption'),
  },
  example: (props) => (
    <Dropdown
      placeholder="Select an option"
      labelPosition={props.labelPosition}
      helperText={props.hasCaption ? 'Helper text' : undefined}
      onChange={(value) => console.log(value)}
    />
  ),
});
