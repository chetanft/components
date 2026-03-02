import { figma } from '@figma/code-connect';
import { Steps, StepsList, StepItem, StepIcon, StepContent, StepTitle, StepDescription } from './index';

// Steps container
figma.connect(Steps, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=688-1245', {
  example: () => (
    <Steps currentStep={1}>
      <StepsList>
        <StepItem value={1}>
          <StepIcon />
          <StepContent>
            <StepTitle>Step 1</StepTitle>
            <StepDescription>Description</StepDescription>
          </StepContent>
        </StepItem>
        <StepItem value={2}>
          <StepIcon />
          <StepContent>
            <StepTitle>Step 2</StepTitle>
            <StepDescription>Description</StepDescription>
          </StepContent>
        </StepItem>
        <StepItem value={3}>
          <StepIcon />
          <StepContent>
            <StepTitle>Step 3</StepTitle>
            <StepDescription>Description</StepDescription>
          </StepContent>
        </StepItem>
      </StepsList>
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
      <StepsList>
        <StepItem value={1}>
          <StepIcon />
          <StepContent>
            <StepTitle>Step 1</StepTitle>
            <StepDescription>Description</StepDescription>
          </StepContent>
        </StepItem>
      </StepsList>
    </Steps>
  ),
});
