# Wave 7 Blocked Set A Codemod

Week 7 tracks blocked components that still rely on declarative-only shapes:
- `ButtonGroup` (`buttons`)
- `Cascader` (`options`)
- `Mentions` (`options`)
- `ProgressBar` (`showPercentage`)
- `ProgressList` (`items`)
- `QuickFilters` (`filters`)
- `RadioSelector` (`options`)

## Script

- `scripts/codemods/wave7-blocked-set-a-components.cjs`

## Run

```bash
npm run codemod:wave7:report
```

Optional enforcement:

```bash
npm run codemod:wave7:check
```

## Notes

- Wave 7 has been migrated to composable usages across docs/stories/runtime call sites.
- `codemod:wave7:check` is now used as an enforcement gate (zero matches required).
- The scanner still ignores component implementation files where deprecated props remain temporarily for backward compatibility.
