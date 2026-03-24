## Learned User Preferences

- When persisting browser preview changes, update the matching source to mirror the preview: JSX structure, `className`, imports, and DOM order when the tool reports `dom-order`. The changed node may live in package code under `src/` or in docs chrome such as `ft-docs` StoryPreview—apply edits where the selector points, not only on the leaf component.
- Before running publish flows that invoke `npm version` (`publish:patch`, `publish:minor`, `publish:major`), keep the git working tree clean for tracked files—commit or stash generated doc and audit outputs, and resolve or ignore noisy local-only edits as appropriate.

## Learned Workspace Facts

- The npm package name is `ft-design-system`. Local docs run from `ft-docs` with `npm run dev` (typically http://localhost:3000). From the repo root, Storybook runs with `npm run storybook` (port 6006).
- `npm version` refuses to run when tracked files are modified, which blocks the scripted publish commands until changes are committed or stashed.
- `prepublishOnly` includes documentation sync checks; committed generated doc artifacts must match what the sync scripts produce for publish to succeed.
- The published tarball must stay small: do not include `templates/**/node_modules` (broad template globs can exceed npm size limits; use explicit package `files` or equivalent exclusions).
- `npm publish` may still return OTP or auth errors depending on token validity, org publish policy, or registry settings, not only the account’s personal 2FA toggle.
