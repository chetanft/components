# Upload Component System

## Quick Start

```tsx
import { Upload } from 'ft-design-system';

function MyComponent() {
  return (
    <Upload 
      type="drag-drop"
      maxFiles={10}
      maxFileSize={10}
      onFilesChange={(files) => console.log(files)}
    />
  );
}
```

## Available Components

### Main Components
- **`Upload`** - Main container with file management
- **`UploadZone`** - Drag-and-drop area
- **`UploadButton`** - Button-style upload
- **`UploadThumbnail`** - Thumbnail upload with preview
- **`UploadItem`** - Individual file display
- **`FileValidationCard`** - Validation results display

## Upload Types

### 1. Drag and Drop
Best for bulk file uploads (Excel, CSV files)

```tsx
<Upload 
  type="drag-drop"
  acceptedFileTypes={['Excel', 'CSV']}
  maxFileSize={10}
/>
```

### 2. Button Upload
Compact interface for limited file uploads

```tsx
<Upload 
  type="button"
  acceptedFileTypes={['Excel', 'CSV']}
  maxFiles={3}
/>
```

### 3. Thumbnail Upload
Perfect for image uploads with preview

```tsx
<Upload 
  type="thumbnail"
  acceptedFileTypes={['image/*']}
  maxFiles={6}
/>
```

## Features

✅ Multiple upload types (drag-drop, button, thumbnail)  
✅ Real-time upload progress tracking  
✅ File validation and error handling  
✅ Validation results with statistics  
✅ Preview for image uploads  
✅ Delete and retry actions  
✅ Customizable file types and size limits  
✅ Auto-upload capability  
✅ Full keyboard accessibility  
✅ Responsive design  

## Props Reference

### Upload Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'drag-drop' \| 'button' \| 'thumbnail'` | `'drag-drop'` | Upload interface type |
| `maxFiles` | `number` | `10` | Maximum files allowed |
| `maxFileSize` | `number` | `10` | Max size in MB |
| `acceptedFileTypes` | `string[]` | `['Excel', 'CSV']` | Allowed file types |
| `multiple` | `boolean` | `true` | Allow multiple selection |
| `autoUpload` | `boolean` | `true` | Auto-upload on selection |
| `onFilesChange` | `function` | - | Callback when files change |
| `onUploadComplete` | `function` | - | Callback on upload complete |

## File States

- **Uploading**: Progress bar showing upload percentage
- **Uploaded**: File successfully uploaded with timestamp
- **Saved**: File confirmed and saved
- **Error**: Upload failed with retry option

## Validation

Show validation results with statistics:

```tsx
<FileValidationCard
  fileName="File 178.xlsx"
  validationStatus="success"
  validationStats={{
    total: 850,
    success: 850,
    invalid: 0
  }}
  onDownload={() => handleDownload()}
/>
```

## Examples

See [UPLOAD_COMPONENTS.md](../../../../docs/UPLOAD_COMPONENTS.md) for detailed examples and API reference.

## Storybook

View interactive examples:
```bash
npm run storybook
```

Then navigate to `Organisms/Upload`

