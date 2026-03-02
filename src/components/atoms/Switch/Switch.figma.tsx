import { figma } from '@figma/code-connect';
import { Switch } from './Switch';

figma.connect(Switch, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=298-1021', {
  props: {
    checked: figma.enum('State', {
      On: true,
      Off: false,
    }),
    disabled: figma.enum('Status', {
      Disabled: true,
      Enabled: false,
      Hover: false,
      Focus: false,
      Pressed: false,
    }),
  },
  example: (props) => (
    <Switch checked={props.checked} disabled={props.disabled} />
  ),
});
