# Upload Contract

## Path
- `src/components/organisms/Upload`

## API
- Types: `drag-drop`, `button`, `thumbnail`
- Props: `maxFiles` (number), `acceptedFileTypes` (string[]), `maxFileSize` (number), `multiple` (boolean), `autoUpload` (boolean), `showValidation` (boolean), `glass` (GlassVariant)
- Callbacks: `onFilesChange`, `onUploadComplete`, `onValidationComplete`
- Composable sub-components: `UploadTrigger`, `UploadList`

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
