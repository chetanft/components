import { figma } from '@figma/code-connect';
import { Footer } from './Footer';

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
    // Default button texts from Figma design
    buttonTexts: ['Button'],
  },
  example: (props) => (
    <Footer
      buttonCount={props.buttonCount}
      leftSideButton={props.leftSideButton}
      buttonTexts={
        props.buttonCount === 1 ? ['Button'] :
        props.buttonCount === 2 ? ['Button', 'Button'] :
        props.buttonCount === 3 ? ['Button', 'Button', 'Button'] :
        ['Button', 'Button', 'Button', 'Button']
      }
    />
  ),
});

// Individual variant connections for specific use cases
figma.connect(Footer, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=1115-1233', {
  example: () => (
    <Footer
      buttonCount={1}
      leftSideButton={false}
      buttonTexts={['Button']}
    />
  ),
});

figma.connect(Footer, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=1115-1169', {
  example: () => (
    <Footer
      buttonCount={2}
      leftSideButton={false}
      buttonTexts={['Button', 'Button']}
    />
  ),
});

figma.connect(Footer, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=1115-1171', {
  example: () => (
    <Footer
      buttonCount={3}
      leftSideButton={false}
      buttonTexts={['Button', 'Button', 'Button']}
    />
  ),
});

figma.connect(Footer, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=1115-1185', {
  example: () => (
    <Footer
      buttonCount={3}
      leftSideButton={true}
      buttonTexts={['Button', 'Button', 'Button']}
    />
  ),
});

figma.connect(Footer, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=1115-1214', {
  example: () => (
    <Footer
      buttonCount={4}
      leftSideButton={true}
      buttonTexts={['Button', 'Button', 'Button', 'Button']}
    />
  ),
}); 