import { figma } from '@figma/code-connect';
import { Label } from './Label';

figma.connect(Label, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=756-2194', {
  props: {
    mandatory: figma.boolean('Mandatory'),
    suffixIcon: figma.boolean('Suffix icon'),
    optional: figma.boolean('Optional'),
    text: figma.textContent('Label'),
  },
  example: (props) => (
    <Label
      mandatory={props.mandatory}
      suffixIcon={props.suffixIcon}
      optional={props.optional}
    >
      {props.text}
    </Label>
  ),
});
