# Composable Audit Findings

**Generated:** 2025-12-03  
**Last Updated:** 2025-12-03  
**Purpose**: Detailed manual review findings for components flagged during automated scan

## Summary

**Components Reviewed**: 12  
**Fully Compliant**: 3 (PageHeader, Select, Form)  
**Partially Compliant**: 9 (Table, Alert, Breadcrumb, Badge, Button, Input, Checkbox, Tabs, Pagination, Steps, Modal, Card)  
**Non-Compliant**: 0

**Key Findings**:
- Many components already have composable APIs but need Storybook examples
- Scanner had false positives on asChild detection (now improved - detects ComposableProps usage)
- Boolean flags are minor issues - can be deprecated gradually
- Variant props are acceptable for semantic states (info/success/warning) and form input styles
- Most components support asChild via ComposableProps (scanner improved to detect this)

---

## Review Process

For each flagged component:
1. Read component implementation (`Component.tsx`)
2. Review related stories (`Component.stories.tsx`)
3. Check tests (`Component.test.tsx` if exists)
4. Identify specific non-composable patterns
5. Document findings and recommendations

---

## Components Reviewed

### PageHeader Component ✅ COMPLIANT

**Path**: `src/components/organisms/PageHeader/PageHeader.tsx`  
**Status**: ✅ Compliant  
**Priority**: N/A (Reference Implementation)

#### Current API
```tsx
<PageHeader>
  <PageHeader.Top>
    <PageHeader.Left>
      <PageHeader.BackButton />
      <PageHeader.Title>Page Title</PageHeader.Title>
    </PageHeader.Left>
    <PageHeader.Right>
      <PageHeader.Actions>
        <Button>Action</Button>
      </PageHeader.Actions>
    </PageHeader.Right>
  </PageHeader.Top>
</PageHeader>
```

#### Compliance Check
1. ✅ **Slot/asChild Support**: Supports `asChild` prop via `ComposableProps`
2. ✅ **No Variant Props**: No variant prop, uses composition
3. ✅ **No Boolean Flags**: No enable/show/hide props
4. ✅ **Child-Composable API**: Uses sub-components (PageHeader.Top, PageHeader.Left, etc.)
5. ✅ **FT Design Tokens**: Uses `var(--bg-primary)` and other tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with `@example` showing composable usage
7. ✅ **No Data Arrays**: No columns/items/data props
8. ✅ **No Layout Logic**: Parent controls layout

#### Notes
- Excellent example of composable API implementation
- All sub-components properly exported
- Good documentation and examples
- Can be used as reference for other components

---

### Table Component ⚠️ PARTIAL

**Path**: `src/components/organisms/Table/Table.tsx`  
**Status**: ⚠️ Partial  
**Priority**: High

#### Current API
```tsx
// Composable API (supported and recommended)
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead sortable>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>

// Declarative API (deprecated)
<Table 
  columns={columns} 
  data={data}
  variant="primary"
  selectable={true}
/>
```

#### Issues Found
1. **Array Props**: Still supports `columns` and `data` array props (violates criterion #7) - but marked as deprecated
2. **Variant Prop**: Has `variant` prop for styling (violates criterion #2) - but has composable alternative
3. **Boolean Flags**: Uses `selectable`, `sortable` boolean flags (violates criterion #3)

#### Compliance Check
1. ✅ **Slot/asChild Support**: All sub-components support `asChild` via ComposableProps ✅ (Scanner false positive)
2. ⚠️ **No Variant Props**: Has variant prop but composable API doesn't require it
3. ⚠️ **No Boolean Flags**: Has selectable flag but composable API doesn't require it
4. ✅ **Child-Composable API**: Uses sub-components (TableHeader, TableBody, TableRow, TableCell)
5. ✅ **FT Design Tokens**: Uses design tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with both composable and deprecated examples
7. ⚠️ **No Data Arrays**: Deprecated props exist but composable API available
8. ✅ **No Layout Logic**: Parent controls layout

#### Recommended Actions
1. ✅ **asChild Support**: Already implemented - all sub-components support asChild
2. Remove deprecated `columns` and `data` props in next major version
3. Consider removing `variant` prop or making it CSS-only
4. Update Storybook to prioritize composable examples

---

### Alert Component ⚠️ PARTIAL

**Path**: `src/components/molecules/Alert/Alert.tsx`  
**Status**: ⚠️ Partial  
**Priority**: Medium

#### Current API
```tsx
// Composable API (supported and recommended)
<Alert variant="info" radius="md">
  <AlertIcon />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>This is an info alert message</AlertDescription>
  <AlertAction>
    <Button>Action</Button>
  </AlertAction>
  <AlertClose />
</Alert>

// Declarative API (deprecated)
<Alert 
  variant="info"
  title="Information"
  message="Message"
  icon="info"
  closable={true}
/>
```

#### Issues Found
1. **Deprecated Props**: Still supports `title`, `message`, `icon`, `closable`, `action` props (mixed API)
2. **Variant Prop**: Uses `variant` prop (acceptable for semantic states - info/success/warning/danger)

#### Compliance Check
1. ✅ **Slot/asChild Support**: Supports `asChild` prop, sub-components support it
2. ⚠️ **No Variant Props**: Has variant prop but it's for semantic states (acceptable)
3. ⚠️ **No Boolean Flags**: Has `closable` flag but composable API doesn't require it
4. ✅ **Child-Composable API**: Uses sub-components (AlertIcon, AlertTitle, AlertDescription, etc.)
5. ✅ **FT Design Tokens**: Uses design tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with both composable and deprecated examples
7. ✅ **No Data Arrays**: No columns/items/data props
8. ✅ **No Layout Logic**: Parent controls layout

#### Recommended Actions
1. Keep composable API as primary
2. Deprecated props already marked with `@deprecated` JSDoc ✅
3. Plan removal of deprecated props in next major version
4. Update Storybook to prioritize composable examples

---

### Breadcrumb Component ⚠️ PARTIAL

**Path**: `src/components/molecules/Breadcrumb/Breadcrumb.tsx`  
**Status**: ⚠️ Partial  
**Priority**: Medium

#### Current API
```tsx
// Composable API (supported and recommended)
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/" icon="home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/about" isCurrentPage>About</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

// Declarative API (deprecated)
<Breadcrumb items={[{label: 'Home', href: '/'}]} separator="chevron-right" />
```

#### Issues Found
1. **Array Props**: Still supports `items` array prop (violates criterion #7) - but marked as deprecated

#### Compliance Check
1. ✅ **Slot/asChild Support**: All sub-components support `asChild` via ComposableProps ✅ (Scanner false positive)
2. ✅ **No Variant Props**: No variant prop
3. ✅ **No Boolean Flags**: No enable/show/hide props
4. ✅ **Child-Composable API**: Uses sub-components (BreadcrumbList, BreadcrumbItem, BreadcrumbLink, etc.)
5. ✅ **FT Design Tokens**: Uses design tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with both composable and deprecated examples
7. ⚠️ **No Data Arrays**: Deprecated `items` prop exists but composable API available
8. ✅ **No Layout Logic**: Parent controls layout

#### Recommended Actions
1. ✅ **asChild Support**: Already implemented - all sub-components support asChild
2. Remove deprecated `items` prop in next major version
3. Update Storybook to prioritize composable examples

---

### Tree Component

**Path**: `src/components/molecules/Tree/Tree.tsx`  
**Status**: 🔍 Needs Review  
**Priority**: Medium

#### Potential Issues
- Likely uses data array prop
- May need composable API with `Tree.Node` sub-components

#### Action Required
- Review implementation
- Check if composable API exists
- Document findings

---

### Badge Component ⚠️ PARTIAL

**Path**: `src/components/atoms/Badge/Badge.tsx`  
**Status**: ⚠️ Partial  
**Priority**: Medium

#### Current API
```tsx
// Simple API (variant prop)
<Badge variant="success">Active</Badge>

// Composable API (supported)
<Badge variant="success">
  <BadgeIcon icon="check" />
  <BadgeText>Active</BadgeText>
</Badge>
```

#### Issues Found
1. **Variant Prop**: Has `variant` prop for semantic styling (violates criterion #2) - but acceptable for semantic states
2. **Boolean Flags**: Has `showZero` boolean flag (violates criterion #3)
3. **Missing asChild**: Main component supports asChild, but could be improved

#### Compliance Check
1. ⚠️ **Slot/asChild Support**: Supports `asChild` prop, sub-components support it ✅
2. ⚠️ **No Variant Props**: Has variant prop but it's for semantic states (acceptable)
3. ⚠️ **No Boolean Flags**: Has `showZero` flag but composable API doesn't require it
4. ✅ **Child-Composable API**: Uses sub-components (BadgeIcon, BadgeText)
5. ✅ **FT Design Tokens**: Uses design tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with composable examples
7. ✅ **No Data Arrays**: No columns/items/data props
8. ✅ **No Layout Logic**: Parent controls layout

#### Recommended Actions
1. Keep composable API as primary ✅
2. Consider deprecating `showZero` flag in favor of conditional rendering
3. Variant prop is acceptable for semantic states (info/success/warning/danger)
4. Update Storybook to prioritize composable examples ✅

---

### Button Component ⚠️ PARTIAL

**Path**: `src/components/atoms/Button/Button.tsx`  
**Status**: ⚠️ Partial  
**Priority**: High

#### Current API
```tsx
// Simple API (variant prop)
<Button variant="primary" icon="add" iconPosition="leading">
  Add Item
</Button>

// Composable API (supported)
<Button variant="primary">
  <ButtonIcon icon="add" />
  <ButtonText>Add Item</ButtonText>
</Button>
```

#### Issues Found
1. **Variant Prop**: Has `variant` prop for visual styling (violates criterion #2)
2. **Missing asChild**: Scanner flagged missing asChild, but component actually supports it via ComposableProps

#### Compliance Check
1. ✅ **Slot/asChild Support**: Supports `asChild` prop via ComposableProps ✅
2. ⚠️ **No Variant Props**: Has variant prop for visual styling (primary/secondary/destructive)
3. ✅ **No Boolean Flags**: No enable/show/hide props
4. ✅ **Child-Composable API**: Uses sub-components (ButtonIcon, ButtonText)
5. ✅ **FT Design Tokens**: Uses design tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with composable examples
7. ✅ **No Data Arrays**: No columns/items/data props
8. ✅ **No Layout Logic**: Parent controls layout

#### Recommended Actions
1. Keep composable API as primary ✅
2. Variant prop is acceptable for semantic button types (primary/secondary/destructive)
3. Update Storybook to prioritize composable examples ✅
4. Scanner false positive on asChild - component already supports it

---

### Input Component ⚠️ PARTIAL

**Path**: `src/components/atoms/Input/Input.tsx`  
**Status**: ⚠️ Partial  
**Priority**: High

#### Current API
```tsx
// Composable API (supported and recommended)
<Input size="md" variant="default">
  <InputLabel mandatory>Email</InputLabel>
  <InputField type="email" leadingIcon="mail" placeholder="Enter email" />
  <InputError>Invalid email</InputError>
</Input>

// Declarative API (deprecated)
<Input label="Email" type="email" placeholder="Enter your email" />
```

#### Issues Found
1. **Variant Prop**: Has `variant` prop for visual styling (violates criterion #2) - but acceptable for form input styles
2. **Deprecated Props**: Still supports `label`, `error`, `warning`, `success`, `helperText` props (mixed API)

#### Compliance Check
1. ✅ **Slot/asChild Support**: Sub-components (InputField, InputLabel, etc.) support `asChild` ✅
2. ⚠️ **No Variant Props**: Has variant prop but it's for form input styles (default/filled/outlined - acceptable)
3. ✅ **No Boolean Flags**: No enable/show/hide props
4. ✅ **Child-Composable API**: Uses sub-components (InputLabel, InputField, InputError, InputHelper, etc.)
5. ✅ **FT Design Tokens**: Uses design tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with composable examples
7. ✅ **No Data Arrays**: No columns/items/data props
8. ✅ **No Layout Logic**: Parent controls layout

#### Recommended Actions
1. Keep composable API as primary ✅
2. Deprecated props already marked ✅
3. Variant prop is acceptable for form input styles
4. Add composable examples to Storybook stories

---

### Checkbox Component ⚠️ PARTIAL

**Path**: `src/components/atoms/Checkbox/Checkbox.tsx`  
**Status**: ⚠️ Partial  
**Priority**: High

#### Current API
```tsx
// Composable API (supported and recommended)
<Checkbox size="md">
  <CheckboxInput checked={isChecked} onChange={handleChange} />
  <CheckboxLabel>Accept terms</CheckboxLabel>
  <CheckboxHelper>You can change this later</CheckboxHelper>
</Checkbox>

// Declarative API (deprecated)
<Checkbox label="Accept terms" checked={isChecked} onChange={handleChange} />
```

#### Issues Found
1. **Deprecated Props**: Still supports `label`, `error`, `description` props (mixed API)

#### Compliance Check
1. ✅ **Slot/asChild Support**: Sub-components support `asChild` ✅
2. ✅ **No Variant Props**: No variant prop
3. ✅ **No Boolean Flags**: No enable/show/hide props
4. ✅ **Child-Composable API**: Uses sub-components (CheckboxInput, CheckboxLabel, CheckboxHelper, CheckboxError)
5. ✅ **FT Design Tokens**: Uses design tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with composable examples
7. ✅ **No Data Arrays**: No columns/items/data props
8. ✅ **No Layout Logic**: Parent controls layout

#### Recommended Actions
1. Keep composable API as primary ✅
2. Deprecated props already marked ✅
3. Add composable examples to Storybook stories

---

### Select Component ✅ COMPLIANT

**Path**: `src/components/molecules/Select/Select.tsx`  
**Status**: ✅ Compliant  
**Priority**: N/A

#### Current API
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

#### Compliance Check
1. ⚠️ **Slot/asChild Support**: Main component doesn't need asChild (context provider), sub-components may need it
2. ✅ **No Variant Props**: No variant prop
3. ✅ **No Boolean Flags**: No enable/show/hide props
4. ✅ **Child-Composable API**: Uses sub-components (SelectTrigger, SelectValue, SelectContent, SelectItem)
5. ✅ **FT Design Tokens**: Uses design tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with composable examples
7. ✅ **No Data Arrays**: No columns/items/data props
8. ✅ **No Layout Logic**: Parent controls layout

#### Notes
- Fully composable API - excellent example
- Shadcn-compatible pattern
- Scanner false positive on asChild (main component is context provider)

---

### Tabs Component ⚠️ PARTIAL

**Path**: `src/components/organisms/Tabs/Tabs.tsx`  
**Status**: ⚠️ Partial  
**Priority**: Medium

#### Current API
```tsx
// Composable API (supported)
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Issues Found
1. **Boolean Flag**: Has `showLine` boolean flag (violates criterion #3)

#### Compliance Check
1. ✅ **Slot/asChild Support**: Uses ComposableProps, sub-components support asChild ✅
2. ✅ **No Variant Props**: No variant prop
3. ⚠️ **No Boolean Flags**: Has `showLine` flag but composable API doesn't require it
4. ✅ **Child-Composable API**: Uses sub-components (TabsList, TabsTrigger, TabsContent)
5. ✅ **FT Design Tokens**: Uses design tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with composable examples
7. ✅ **No Data Arrays**: No columns/items/data props
8. ✅ **No Layout Logic**: Parent controls layout

#### Recommended Actions
1. Consider deprecating `showLine` flag in favor of conditional rendering
2. Add composable examples to Storybook stories

---

### Pagination Component ⚠️ PARTIAL

**Path**: `src/components/molecules/Pagination/Pagination.tsx`  
**Status**: ⚠️ Partial  
**Priority**: Medium

#### Current API
```tsx
// Composable API (supported and recommended)
<Pagination current={1} total={100} pageSize={10}>
  <PaginationList>
    <PaginationPrevious />
    <PaginationItem page={1} />
    <PaginationEllipsis />
    <PaginationItem page={5} />
    <PaginationNext />
  </PaginationList>
</Pagination>
```

#### Issues Found
1. **Boolean Flags**: Has `showSizeChanger`, `showQuickJumper` flags (violates criterion #3)
2. **Variant Prop**: Has `variant` prop for styling (violates criterion #2)

#### Compliance Check
1. ✅ **Slot/asChild Support**: Uses ComposableProps, sub-components support asChild ✅
2. ⚠️ **No Variant Props**: Has variant prop but composable API doesn't require it
3. ⚠️ **No Boolean Flags**: Has showSizeChanger/showQuickJumper flags but composable API doesn't require them
4. ✅ **Child-Composable API**: Uses sub-components (PaginationList, PaginationItem, PaginationPrevious, etc.)
5. ✅ **FT Design Tokens**: Uses design tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with composable examples
7. ✅ **No Data Arrays**: No columns/items/data props
8. ✅ **No Layout Logic**: Parent controls layout

#### Recommended Actions
1. Deprecate `showSizeChanger` and `showQuickJumper` flags
2. Consider removing `variant` prop or making it CSS-only
3. Add composable examples to Storybook stories

---

### Steps Component ⚠️ PARTIAL

**Path**: `src/components/molecules/Steps/Steps.tsx`  
**Status**: ⚠️ Partial  
**Priority**: Medium

#### Current API
```tsx
// Composable API (supported and recommended)
<Steps currentStep={1} device="desktop" direction="horizontal">
  <StepsList>
    <StepItem value={1}>
      <StepIcon />
      <StepContent>
        <StepTitle>Step 1</StepTitle>
        <StepDescription>Description</StepDescription>
      </StepContent>
    </StepItem>
  </StepsList>
</Steps>

// Declarative API (deprecated)
<Steps steps={[{label: 'Step 1'}]} currentStep={1} />
```

#### Issues Found
1. **Array Props**: Still supports `steps` array prop (violates criterion #7) - but marked as deprecated

#### Compliance Check
1. ✅ **Slot/asChild Support**: Uses ComposableProps, sub-components support asChild ✅
2. ✅ **No Variant Props**: No variant prop
3. ✅ **No Boolean Flags**: No enable/show/hide props
4. ✅ **Child-Composable API**: Uses sub-components (StepsList, StepItem, StepIcon, StepContent, etc.)
5. ✅ **FT Design Tokens**: Uses design tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with composable examples
7. ⚠️ **No Data Arrays**: Deprecated `steps` prop exists but composable API available
8. ✅ **No Layout Logic**: Parent controls layout

#### Recommended Actions
1. Remove deprecated `steps` prop in next major version
2. Add composable examples to Storybook stories

---

### Form Component ✅ COMPLIANT

**Path**: `src/components/organisms/Form/Form.tsx`  
**Status**: ✅ Compliant  
**Priority**: N/A

#### Current API
```tsx
<Form layout="vertical">
  <FormItem name="email">
    <FormLabel>Email</FormLabel>
    <FormControl>
      <Input type="email" />
    </FormControl>
    <FormError />
    <FormHelper>Enter your email address</FormHelper>
  </FormItem>
</Form>
```

#### Compliance Check
1. ✅ **Slot/asChild Support**: Uses ComposableProps, sub-components support asChild ✅ (Scanner false positive)
2. ✅ **No Variant Props**: No variant prop
3. ✅ **No Boolean Flags**: No enable/show/hide props
4. ✅ **Child-Composable API**: Uses sub-components (FormLabel, FormControl, FormError, FormHelper, FormDescription)
5. ✅ **FT Design Tokens**: Uses design tokens
6. ✅ **JSDoc Documentation**: Complete JSDoc with composable examples
7. ✅ **No Data Arrays**: No columns/items/data props
8. ✅ **No Layout Logic**: Parent controls layout

#### Notes
- Fully composable API - excellent example
- Scanner false positive on asChild - components already support it

---

## Review Template

Use this template for each component review:

```markdown
### [Component Name]

**Path**: `src/components/[path]/[Component].tsx`  
**Status**: ✅ Compliant / ⚠️ Partial / ❌ Non-Compliant  
**Priority**: High / Medium / Low

#### Current API
[Code example showing current usage]

#### Issues Found
1. [Issue description] (violates criterion #X)
2. [Issue description] (violates criterion #Y)

#### Recommended Composable API
[Code example showing composable usage]

#### Migration Path
1. [Step 1]
2. [Step 2]
3. [Step 3]
```

---

---

### UserProfile

**Path**: `src/components/organisms/UserProfile/UserProfile.tsx`  
**Status**: ⚠️ Partial  
**Priority**: Medium

#### Current API
```tsx
<UserProfile 
  company={company}
  userName="John Doe"
  userAvatar="..."
  companyName={true}
  onClick={handleClick}
/>
```

#### Issues Found
1. **Boolean Flag**: `companyName` boolean prop controls conditional rendering (violates criterion #3)
2. **Missing asChild Support**: Component doesn't support `asChild` prop (violates criterion #1)
3. **No Composable Sub-components**: Uses props instead of child composition (violates criterion #4)

#### Recommended Composable API
```tsx
<UserProfile onClick={handleClick}>
  <UserProfile.Company>
    <Logo name="tata-motors" />
  </UserProfile.Company>
  <UserProfile.Avatar src="..." alt="John Doe" />
</UserProfile>
```

#### Migration Path
1. Add `asChild` support to main component
2. Create `UserProfile.Company` and `UserProfile.Avatar` sub-components
3. Deprecate `companyName` boolean flag
4. Update JSDoc with composable examples

---

### UserProfileDropdown

**Path**: `src/components/organisms/UserProfileDropdown/UserProfileDropdown.tsx`  
**Status**: ⚠️ Partial  
**Priority**: Medium

#### Current API
```tsx
<UserProfileDropdown 
  userName="John Doe"
  userRole="Manager"
  userAvatar="..."
  isOpen={true}
  onMenuItemClick={handleClick}
/>
```

#### Issues Found
1. **Internal Array**: Uses hardcoded `menuItems` array internally (acceptable for internal use)
2. **Missing asChild Support**: Component doesn't support `asChild` prop (violates criterion #1)
3. **No Composable Sub-components**: Uses props instead of child composition (violates criterion #4)

#### Recommended Composable API
```tsx
<UserProfileDropdown isOpen={isOpen}>
  <UserProfileDropdown.Header>
    <UserProfileDropdown.Avatar src="..." />
    <UserProfileDropdown.Info>
      <UserProfileDropdown.Name>John Doe</UserProfileDropdown.Name>
      <UserProfileDropdown.Role>Manager</UserProfileDropdown.Role>
    </UserProfileDropdown.Info>
  </UserProfileDropdown.Header>
  <UserProfileDropdown.Menu>
    <UserProfileDropdown.MenuItem onClick={handleProfile}>View Profile</UserProfileDropdown.MenuItem>
    <UserProfileDropdown.MenuItem onClick={handleSettings}>Settings</UserProfileDropdown.MenuItem>
  </UserProfileDropdown.Menu>
</UserProfileDropdown>
```

#### Migration Path
1. Add `asChild` support to main component
2. Create composable sub-components for header, menu items
3. Keep internal menuItems for backward compatibility
4. Update JSDoc with composable examples

---

### UploadZone

**Path**: `src/components/organisms/UploadZone/UploadZone.tsx`  
**Status**: ⚠️ Partial  
**Priority**: Medium

#### Current API
```tsx
<UploadZone 
  type="drag-drop"
  onFileSelect={handleFiles}
  acceptedFileTypes={['Excel', 'CSV']}
  maxFileSize={10}
/>
```

#### Issues Found
1. **Missing asChild Support**: Component doesn't support `asChild` prop (violates criterion #1)
2. **Type Variant**: Uses `type` prop for different variants (acceptable for semantic types)
3. **Uses Design Tokens**: ✅ Uses FT design tokens correctly

#### Recommended Composable API
```tsx
<UploadZone onFileSelect={handleFiles}>
  <UploadZone.Icon />
  <UploadZone.Instructions>
    Click or drag and drop file here
  </UploadZone.Instructions>
  <UploadZone.Restrictions>
    Allowed: Excel, CSV | Max: 10mb
  </UploadZone.Restrictions>
</UploadZone>
```

#### Migration Path
1. Add `asChild` support to main component
2. Create composable sub-components for icon, instructions, restrictions
3. Keep `type` prop for backward compatibility
4. Update JSDoc with composable examples

---

### Logos

**Path**: `src/components/atoms/Logos/Logo.tsx`  
**Status**: ⚠️ Partial  
**Priority**: Low

#### Current API
```tsx
<Logo name="ft" width={155} height={26} />
```

#### Issues Found
1. **Missing asChild Support**: Component doesn't support `asChild` prop (violates criterion #1)
2. **Simple Component**: Logo component is simple and functional
3. **Uses Design Tokens**: ✅ Uses FT design tokens correctly

#### Recommended Composable API
```tsx
<Logo name="ft" asChild>
  <img src="..." alt="FT Logo" />
</Logo>
```

#### Migration Path
1. Add `asChild` support to Logo component
2. Update JSDoc with composable examples
3. Component is simple and doesn't need extensive refactoring

---

## Next Steps

1. Complete manual review of all flagged components
2. Prioritize refactoring based on usage frequency
3. Create migration PRs for high-priority components
4. Update Storybook stories to demonstrate composable APIs
5. Update documentation with migration guides

