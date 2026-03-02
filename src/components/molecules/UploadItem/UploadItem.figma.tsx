import { figma } from '@figma/code-connect';
import { UploadItem } from './UploadItem';

figma.connect(UploadItem, 'https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=4612-39631', {
  example: () => (
    <UploadItem
      file={{ id: 'doc-1', name: 'document.pdf', size: 1024000, type: 'application/pdf' }}
      state="uploaded"
      onDelete={() => {}}
    />
  ),
});
