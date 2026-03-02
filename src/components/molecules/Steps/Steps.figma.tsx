import { figma } from '@figma/code-connect';
import { Steps } from './Steps';
import { StepItem } from './StepItem';

// Steps container
figma.connect(Steps, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=688-1245', {
  example: () => (
    <Steps currentStep={1}>
      <StepItem title="Step 1" description="Description" />
      <StepItem title="Step 2" description="Description" />
      <StepItem title="Step 3" description="Description" />
    </Steps>
  ),
});

// StepsItem
figma.connect(Steps, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=688-1218', {
  props: {
    active: figma.enum('State', {
      Selected: true,
      Unselected: false,
    }),
    device: figma.enum('Device', {
      Desktop: 'desktop',
      Mobile: 'mobile',
    }),
  },
  example: (props) => (
    <Steps currentStep={props.active ? 0 : 1} device={props.device}>
      <StepItem title="Step 1" description="Description" />
    </Steps>
  ),
});
