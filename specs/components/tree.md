# Tree Contract

## Path
- `src/components/molecules/Tree`

## API
- Variants: controlled or uncontrolled selection/expansion/checking
- Props: `checkable`, `selectable`, `multiple`, `showLine`, `showIcon`, `defaultExpandAll`, `disabled`, `blockNode`, `glass` (GlassVariant)
- Controlled keys: `expandedKeys`, `selectedKeys`, `checkedKeys` (plus `default*` uncontrolled variants)
- Composable sub-components: `TreeNode`, `TreeNodeContent`, `TreeNodeSwitcher`, `TreeNodeCheckbox`, `TreeNodeIcon`, `TreeNodeChildren`

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
