# Form Contract

## Path
- `src/components/organisms/Form`

## API
- Layouts: `vertical`, `horizontal`, `inline`
- Sizes: `sm`, `md`, `lg`
- Props: `initialValues`, `onFinish`, `onFinishFailed`, `onValuesChange`, `disabled`, `labelCol` (1–24), `wrapperCol` (1–24), `glass` (GlassVariant)
- Composable sub-components: `FormItem`, `FormLabel`, `FormControl`, `FormError`, `FormHelper`, `FormDescription`
- Hook: `useForm()` returns `FormInstance` with `getFieldValue`, `setFieldValue`, `validateFields`, `resetFields`, `submit`

## Token Rules
- No hex literals in component styles.
- Spacing and dimensions must resolve through tokens/classes.
