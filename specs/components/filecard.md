# FileCard Contract

## Path
- `src/components/organisms/FileCard`

## API
- Variants: `compact`, `expanded`, `with-progress`, `with-stats`
- Statuses: `uploading`, `validating`, `processed`, `partially-processed`, `failed`, `template-mismatch`, `upload-failed`, `unsupported`, `empty`, `too-large`
- Props: `fileName`, `fileType`, `fileDate`, `status`, `progress` (0–100), `stats` (`{ total, success, invalid }`), `errorMessage`, `downloadDisabled`, `glass` (GlassVariant)
- Action callbacks: `onDownload`, `onPreview`, `onDelete`, `onRefresh`, `onClose`

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
