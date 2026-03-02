import { figma } from '@figma/code-connect';
import { Logo } from './Logo';

figma.connect(Logo, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2661-91', {
  props: {
    name: figma.enum('Name', {
      FT: 'ft',
      'FT White': 'ft-white',
      'Tata Motors': 'tata-motors',
      'MDC Labs': 'mdc-labs',
      'Shakthi logistics': 'shakthi-logistics',
      Gati: 'gati',
      'Birla Pivot': 'birla-pivot',
      'Birla Pivot Full': 'birla-pivot',
      Diageo: 'diageo',
      'diageo white': 'diageo-white',
      'JSW One': 'jsw-one',
      Shadowfax: 'shadowfax',
    }),
  },
  example: (props) => <Logo name={props.name} />,
});
