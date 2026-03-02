import { figma } from '@figma/code-connect';
import { RadioSelector, RadioSelectorOption } from './RadioSelector';

figma.connect(RadioSelector, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=889-2351', {
  props: {
    hasDescription: figma.boolean('Description'),
    hasIcon: figma.boolean('Icon'),
    hasRadioBtn: figma.boolean('Radio Btn'),
    label: figma.textContent('Label'),
  },
  example: (props) => (
    <RadioSelector name="example">
      <RadioSelectorOption
        value="option-1"
        header={props.label}
        description={props.hasDescription ? 'Description text' : undefined}
        icon={props.hasIcon ? 'placeholder' : undefined}
        hideRadio={!props.hasRadioBtn}
      />
      <RadioSelectorOption
        value="option-2"
        header="Option 2"
        description={props.hasDescription ? 'Description text' : undefined}
        icon={props.hasIcon ? 'placeholder' : undefined}
        hideRadio={!props.hasRadioBtn}
      />
    </RadioSelector>
  ),
});
