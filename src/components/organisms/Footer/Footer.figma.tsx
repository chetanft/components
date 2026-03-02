import { figma } from '@figma/code-connect';
import { Footer, FooterButton } from './Footer';

// Connect to the Footer component set in Figma
figma.connect(Footer, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=1115-1170', {
  props: {
    // Map Figma variants to component props
    buttonCount: figma.enum('Buttons count', {
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
    }),
    leftSideButton: figma.boolean('Left side btn'),
  },
  example: (props) => (
    <Footer>
      {props.leftSideButton && (
        <FooterButton variant="secondary" leftSide>Button</FooterButton>
      )}
      {Array.from({ length: props.leftSideButton ? props.buttonCount - 1 : props.buttonCount }, (_, i) => (
        <FooterButton key={i} variant={i === (props.leftSideButton ? props.buttonCount - 2 : props.buttonCount - 1) ? 'primary' : 'secondary'}>
          Button
        </FooterButton>
      ))}
    </Footer>
  ),
});

// Individual variant connections for specific use cases
figma.connect(Footer, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=1115-1233', {
  example: () => (
    <Footer>
      <FooterButton variant="primary">Button</FooterButton>
    </Footer>
  ),
});

figma.connect(Footer, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=1115-1169', {
  example: () => (
    <Footer>
      <FooterButton variant="secondary">Button</FooterButton>
      <FooterButton variant="primary">Button</FooterButton>
    </Footer>
  ),
});

figma.connect(Footer, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=1115-1171', {
  example: () => (
    <Footer>
      <FooterButton variant="secondary">Button</FooterButton>
      <FooterButton variant="secondary">Button</FooterButton>
      <FooterButton variant="primary">Button</FooterButton>
    </Footer>
  ),
});

figma.connect(Footer, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=1115-1185', {
  example: () => (
    <Footer>
      <FooterButton variant="secondary" leftSide>Button</FooterButton>
      <FooterButton variant="secondary">Button</FooterButton>
      <FooterButton variant="primary">Button</FooterButton>
    </Footer>
  ),
});

figma.connect(Footer, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=1115-1214', {
  example: () => (
    <Footer>
      <FooterButton variant="secondary" leftSide>Button</FooterButton>
      <FooterButton variant="secondary">Button</FooterButton>
      <FooterButton variant="secondary">Button</FooterButton>
      <FooterButton variant="primary">Button</FooterButton>
    </Footer>
  ),
});
