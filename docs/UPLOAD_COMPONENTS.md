# Upload Components Documentation

## Overview

The Upload component system provides a comprehensive solution for file uploads with multiple interface types, progress tracking, and validation feedback. The components are built following atomic design principles and match the Figma design specifications exactly.

## Component Architecture

```
Upload System
├── Atoms
│   ├── FileIcon - File type indicators (Excel, CSV, Generic)
│   ├── LoadingSpinner - Animated loading indicator
│   └── CloudUpload - Upload cloud icon
│
├── Molecules
│   ├── UploadButton - Button-style file upload
│   ├── UploadThumbnail - Thumbnail preview with add/delete
│   ├── UploadItem - Individual file item display
│   └── FileValidationCard - File validation status display
│
└── Organisms
    ├── UploadZone - Drag-and-drop upload area
    └── Upload - Main upload container (combines all)
```

## Components

### 1. Upload (Main Container)

The primary component that orchestrates the entire upload experience.

#### Props

```typescript
interface UploadProps {
  type?: 'drag-drop' | 'button' | 'thumbnail';
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
  multiple?: boolean;
  onFilesChange?: (files: UploadFile[]) => void;
  onUploadComplete?: (file: UploadFile) => void;
  onValidationComplete?: (file: UploadFile, stats?: ValidationStats) => void;
  showValidation?: boolean;
  autoUpload?: boolean;
}
```

#### Usage

```tsx
import { Upload } from 'ft-design-system';

// Drag and Drop
<Upload 
  type="drag-drop"
  maxFiles={10}
  maxFileSize={10}
  onFilesChange={(files) => console.log(files)}
  onUploadComplete={(file) => console.log('Uploaded:', file)}
/>

// Button Upload
<Upload 
  type="button"
  maxFiles={5}
  acceptedFileTypes={['Excel', 'CSV']}
/>

// Thumbnail Upload (for images)
<Upload 
  type="thumbnail"
  maxFiles={4}
  acceptedFileTypes={['image/*']}
/>
```

---

### 2. UploadZone

Drag-and-drop upload area with hover states.

#### Props

```typescript
interface UploadZoneProps {
  type?: 'drag-drop' | 'button' | 'thumbnail';
  state?: 'default' | 'hover' | 'disabled';
  onFileSelect?: (files: FileList) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  disabled?: boolean;
  multiple?: boolean;
}
```

#### States

- **Default**: Normal state with dashed border
- **Hover**: Active state when dragging files over
- **Disabled**: Greyed out, no interaction

#### Usage

```tsx
import { UploadZone } from 'ft-design-system';

<UploadZone
  onFileSelect={(files) => handleFiles(files)}
  acceptedFileTypes={['Excel', 'CSV']}
  maxFileSize={10}
  multiple={true}
/>
```

---

### 3. UploadButton

Button-style file upload trigger.

#### Props

```typescript
interface UploadButtonProps {
  onFileSelect?: (files: FileList) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  disabled?: boolean;
  multiple?: boolean;
  state?: 'default' | 'hover' | 'disabled';
}
```

#### Usage

```tsx
import { UploadButton } from 'ft-design-system';

<UploadButton
  onFileSelect={(files) => handleFiles(files)}
  acceptedFileTypes={['Excel', 'CSV']}
  state="default"
/>
```

---

### 4. UploadThumbnail

Thumbnail-style upload for images with preview.

#### Props

```typescript
interface UploadThumbnailProps {
  preview?: string | null;
  fileName?: string;
  state?: 'default' | 'hover' | 'disabled';
  onFileSelect?: (files: FileList) => void;
  onDelete?: () => void;
  acceptedFileTypes?: string[];
  multiple?: boolean;
  disabled?: boolean;
  showFileName?: boolean;
}
```

#### Usage

```tsx
import { UploadThumbnail } from 'ft-design-system';

// Add new file
<UploadThumbnail
  onFileSelect={(files) => handleFiles(files)}
  acceptedFileTypes={['image/*']}
/>

// Show uploaded file
<UploadThumbnail
  preview="https://example.com/image.jpg"
  fileName="image.jpg"
  onDelete={() => handleDelete()}
  showFileName={true}
/>
```

---

### 5. UploadItem

Displays individual uploaded files with progress and actions.

#### Props

```typescript
interface UploadItemProps {
  type?: 'card' | 'text' | 'thumbnail';
  state?: 'uploading' | 'uploaded' | 'saved' | 'error';
  file: UploadFile;
  onDelete?: () => void;
  onRetry?: () => void;
}

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadProgress?: number;
  uploadedAt?: Date;
  preview?: string;
}
```

#### Types

- **card**: Full card display with icon and details
- **text**: Compact text-only display
- **thumbnail**: Thumbnail preview display

#### States

- **uploading**: Shows progress bar
- **uploaded**: Shows completion with timestamp
- **saved**: Confirmed save state
- **error**: Shows error with retry option

#### Usage

```tsx
import { UploadItem } from 'ft-design-system';

<UploadItem
  type="card"
  state="uploading"
  file={{
    id: '1',
    name: 'File 178.xlsx',
    size: 1024000,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    uploadProgress: 45
  }}
  onDelete={() => handleDelete()}
/>
```

---

### 6. FileValidationCard

Displays file validation results with statistics.

#### Props

```typescript
interface FileValidationCardProps {
  fileName: string;
  fileType?: 'excel' | 'csv' | 'generic';
  uploadedAt?: Date;
  validationStatus?: 'validating' | 'success' | 'failed' | 'partial';
  validationStats?: ValidationStats;
  onDelete?: () => void;
  onDownload?: () => void;
  onViewDetails?: () => void;
}

interface ValidationStats {
  total: number;
  success: number;
  invalid: number;
}
```

#### Validation States

- **validating**: Shows loading indicator with "Validating" badge
- **success**: Shows "Success" badge with all green stats
- **failed**: Shows "All rows failed" badge with error styling
- **partial**: Shows "Partially processed" badge with warning styling

#### Usage

```tsx
import { FileValidationCard } from 'ft-design-system';

<FileValidationCard
  fileName="File 178.xlsx"
  fileType="excel"
  uploadedAt={new Date()}
  validationStatus="success"
  validationStats={{
    total: 850,
    success: 850,
    invalid: 0
  }}
  onDownload={() => handleDownload()}
  onViewDetails={() => handleViewDetails()}
  onDelete={() => handleDelete()}
/>
```

---

## Design Tokens

The components use the following design tokens from the design system:

### Colors

```css
--bg-primary: #FFFFFF
--bg-secondary: #F8F8F9
--primary: #434F64
--secondary: #5F697B
--tertiary: #838C9D
--border-primary: #CED1D7
--border-secondary: #F0F1F7
--neutral: #1890FF
--neutral-light: #ECF6FF
--critical: #FF3533
--critical-light: #FFEAEA
--positive: #00763D
--positive-light: #DFFFE8
--warning: #FF6C19
--warning-light: #FFEBDC
```

### Spacing

```css
--x0: 0px
--x1: 4px
--x2: 8px
--x3: 12px
--x4: 16px
--x5: 20px
--x6: 24px
```

### Typography

- **Body/Primary - Semibold**: Inter 16px/600
- **Body/Primary - Medium**: Inter 16px/500
- **Body/Primary - Regular**: Inter 16px/400
- **Body/Secondary - Semibold**: Inter 14px/600
- **Body/Secondary - Medium**: Inter 14px/500
- **Body/Secondary - Regular**: Inter 14px/400

---

## Examples

### Complete Upload Flow

```tsx
import React, { useState } from 'react';
import { Upload, FileValidationCard, UploadFile, ValidationStats } from 'ft-design-system';

function UploadDemo() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const [validationResults, setValidationResults] = useState<Map<string, ValidationStats>>(new Map());

  const handleFilesChange = (files: UploadFile[]) => {
    setUploadedFiles(files);
  };

  const handleUploadComplete = (file: UploadFile) => {
    console.log('Upload complete:', file);
    // Trigger validation
  };

  const handleValidationComplete = (file: UploadFile, stats?: ValidationStats) => {
    if (stats) {
      setValidationResults(prev => new Map(prev).set(file.id, stats));
    }
  };

  return (
    <div>
      <Upload
        type="drag-drop"
        maxFiles={5}
        maxFileSize={10}
        onFilesChange={handleFilesChange}
        onUploadComplete={handleUploadComplete}
        onValidationComplete={handleValidationComplete}
        showValidation={true}
      />
      
      {/* Display validation results */}
      {uploadedFiles.map(file => {
        const stats = validationResults.get(file.id);
        if (stats) {
          return (
            <FileValidationCard
              key={file.id}
              fileName={file.name}
              uploadedAt={file.uploadedAt}
              validationStatus={getValidationStatus(stats)}
              validationStats={stats}
              onDelete={() => handleDelete(file.id)}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

function getValidationStatus(stats: ValidationStats) {
  if (stats.invalid === 0) return 'success';
  if (stats.success === 0) return 'failed';
  return 'partial';
}
```

### Button Upload with File List

```tsx
import { Upload } from 'ft-design-system';

<Upload
  type="button"
  maxFiles={3}
  acceptedFileTypes={['Excel', 'CSV']}
  onUploadComplete={(file) => {
    console.log('File uploaded:', file.name);
  }}
/>
```

### Thumbnail Gallery Upload

```tsx
import { Upload } from 'ft-design-system';

<Upload
  type="thumbnail"
  maxFiles={6}
  acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
  maxFileSize={5}
  onFilesChange={(files) => {
    console.log(`${files.length} images uploaded`);
  }}
/>
```

---

## Accessibility

All upload components follow WCAG 2.1 AA standards:

- **Keyboard Navigation**: Full keyboard support with Tab, Enter, and Space
- **Screen Readers**: Proper ARIA labels and roles
- **Focus States**: Visible focus indicators
- **Color Contrast**: Meets 4.5:1 ratio for text
- **Error Messages**: Clear, descriptive error feedback

---

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

---

## Migration Guide

### From Old UploadZone

```tsx
// Old
<UploadZone
  onFileSelect={handleFiles}
  acceptedFileTypes={['Excel', 'CSV']}
/>

// New - use Upload component
<Upload
  type="drag-drop"
  onFilesChange={handleFiles}
  acceptedFileTypes={['Excel', 'CSV']}
/>
```

---

## Best Practices

1. **File Type Validation**: Always specify `acceptedFileTypes` to guide users
2. **File Size Limits**: Set appropriate `maxFileSize` based on your backend limits
3. **Error Handling**: Provide clear feedback for validation errors
4. **Progress Feedback**: Show upload progress for better UX
5. **Multiple Files**: Use `maxFiles` to prevent overwhelming the server
6. **Auto Upload**: Enable `autoUpload` for better user experience

---

## Troubleshooting

### Files not uploading

- Check `acceptedFileTypes` matches your file type
- Verify `maxFileSize` is sufficient
- Ensure `onFileSelect` or `onFilesChange` callback is provided

### Progress bar not showing

- Verify `autoUpload` is enabled
- Check that file has `uploadProgress` property

### Validation not displaying

- Set `showValidation={true}` on Upload component
- Provide `onValidationComplete` callback
- Use `FileValidationCard` to display results

---

## API Reference

See individual component documentation above for detailed prop types and usage examples.

For more information, see:
- [Storybook Documentation](http://localhost:6006)
- [Design System Guidelines](./DESIGN_GUIDELINES.md)
- [Contributing Guide](../CONTRIBUTING.md)

