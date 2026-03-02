import { figma } from '@figma/code-connect';
import { Text } from './Text';

figma.connect(Text, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=4026-14202', {
  props: {
    size: figma.enum('Size', {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      xx: 'xx',
    }),
    hasSubText: figma.boolean('Sub text'),
    hasLeadingIcon: figma.boolean('Leading Icon'),
    hasTrailingIcon: figma.boolean('Trailing Icon'),
    hasBadge: figma.enum('Badge', {
      Yes: true,
      No: false,
    }),
  },
  example: (props) => (
    <Text
      size={props.size}
      subText={props.hasSubText}
      leadingIcon={props.hasLeadingIcon}
      trailingIcon={props.hasTrailingIcon}
    >
      Text content
    </Text>
  ),
});
