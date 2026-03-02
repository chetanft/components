import { figma } from '@figma/code-connect';
import { SubText } from './SubText';

figma.connect(SubText, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2877-46', {
  props: {
    icon: figma.enum('Icon', {
      Yes: 'Yes',
      No: 'No',
    }),
  },
  example: (props) => <SubText icon={props.icon} />,
});
