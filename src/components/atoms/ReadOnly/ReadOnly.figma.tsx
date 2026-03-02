import { figma } from '@figma/code-connect';
import { ReadOnly } from './ReadOnly';

figma.connect(ReadOnly, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=559-7920', {
  props: {
    type: figma.enum('Type', {
      Vertical: 'Vertical',
      'Vertical-Right': 'Vertical',
      Horizontal: 'Horizontal',
    }),
    labelIcon: figma.boolean('Label icon'),
  },
  example: (props) => (
    <ReadOnly
      type={props.type}
      labelIcon={props.labelIcon}
      label="Label"
      value="Value"
    />
  ),
});
