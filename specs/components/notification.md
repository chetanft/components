# Notification Contract

## Path
- `src/components/molecules/Notification`

## API
- Types (via Alert variants): `info`, `success`, `warning`, `danger`
- Props (NotificationConfig): `message`, `description`, `type`, `duration` (ms, 0 = persistent), `icon`, `closable`, `glass` (GlassVariant)
- Provider: `NotificationProvider` wraps the app; `useNotification()` hook returns `{ addNotification, removeNotification, clearAll }`
- Helper: `createNotification()` returns `{ success, error, warning, info }` shorthand methods
- Renders notifications fixed top-right with slide-in animation

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
