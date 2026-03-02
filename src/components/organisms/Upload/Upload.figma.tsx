import { figma } from '@figma/code-connect';
import { Upload } from './Upload';

figma.connect(Upload, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=1113-3060', {
  example: () => (
    <Upload
      type="drag-drop"
      acceptedFileTypes={['.pdf', '.xlsx', '.csv']}
      maxFileSize={10}
      multiple
    />
  ),
});
