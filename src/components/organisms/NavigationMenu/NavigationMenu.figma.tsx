import { figma } from '@figma/code-connect';
import { NavigationMenu } from './NavigationMenu';

figma.connect(NavigationMenu, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=559-7461', {
  example: () => (
    <NavigationMenu
      onNavigate={(item) => console.log(item)}
      onClose={() => {}}
    />
  ),
});
