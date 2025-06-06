import { figma } from '@figma/code-connect';
import { AppHeader } from './AppHeader';

figma.connect(AppHeader, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2600-1961', {
  props: {
    logo: {
      companyName: figma.textContent('Company Name'),
    },
    user: {
      name: figma.textContent('User Name'),
      avatar: figma.string('User Avatar'),
    },
  },
  example: (props) => <AppHeader {...props} />,
}); 