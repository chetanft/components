# 🎨 **COLOR MIGRATION MAPPING PLAN**

## **Rename Mapping (Old → New)**

| **Current Name** | **New Name** | **Hex Value** | **Usage Type** |
|------------------|--------------|---------------|----------------|
| `Dark 100` → `--dark-100` | **`Primary`** → `--primary` | `#434f64` | Text primary, foreground |
| `Dark 50` → `--dark-50` | **`Secondary`** → `--secondary` | `#5f697b` | Text secondary, muted |
| `Dark 25` → `--dark-25` | **`Tertiary`** → `--tertiary` | `#838c9d` | Text muted, subtle |
| `Box border` → `--box-border` | **`Border/Primary`** → `--border-primary` | `#ced1d7` | Primary borders |
| `Divider` → `--divider` | **`Border/Secondary`** → `--border-secondary` | `#f0f1f7` | Dividers, secondary borders |
| `BG` → `--bg` | **`BG/Secondary`** → `--bg-secondary` | `#f8f8f9` | Background secondary |
| `White` → `--white` | **`BG/Primary`** → `--bg-primary` | `#ffffff` | Background primary, cards |
| `Critical` → `--critical` | **`Critical`** → `--critical` | `#ff3533` | ✅ NO CHANGE |
| `Critical - Dark` → `--critical-dark` | **`Critical/Dark`** → `--critical-dark` | `#b80100` | ✅ NO CHANGE |
| `Critical - Light` → `--critical-light` | **`Critical/Light`** → `--critical-light` | `#ffeaea` | ✅ NO CHANGE |
| `Positive` → `--positive` | **`Positive`** → `--positive` | `#00c638` | ✅ NO CHANGE |
| `Positive - Dark` → `--positive-dark` | **`Positive/Dark`** → `--positive-dark` | `#00763d` | ✅ NO CHANGE |
| `Positive - Light` → `--positive-light` | **`Positive/Light`** → `--positive-light` | `#dfffe8` | ✅ NO CHANGE |
| `Neutral` → `--neutral` | **`Neutral`** → `--neutral` | `#1890ff` | ✅ NO CHANGE |
| `Neutral - Dark` → `--neutral-dark` | **`Neutral/Dark`** → `--neutral-dark` | `#006ed3` | ✅ NO CHANGE |
| `Neutral - Light` → `--neutral-light` | **`Neutral/Light`** → `--neutral-light` | `#ecf6ff` | ✅ NO CHANGE |
| `Warning` → `--warning` | **`Warning`** → `--warning` | `#ff6c19` | ✅ NO CHANGE |
| `Warning - Dark` → `--warning-dark` | **`Warning/Dark`** → `--warning-dark` | `#dd6a00` | ✅ NO CHANGE |
| `Warning - Light` → `--warning-light` | **`Warning/Light`** → `--warning-light` | `#ffebdc` | ✅ NO CHANGE |

---

## 🚨 **CRITICAL NAMING CONFLICTS**

### **EXISTING CONFLICTS TO RESOLVE**
1. **`--primary` conflict**: 
   - Current: `#030213` (legacy shadcn)
   - New: `#434f64` (Dark 100)
   - **Solution**: Replace all legacy `--primary` usage with new values

2. **`--secondary` conflict**:
   - Current: `oklch(0.95 0.0058 264.53)` (legacy shadcn)
   - New: `#5f697b` (Dark 50)
   - **Solution**: Replace all legacy `--secondary` usage with new values

---

## 📂 **FILES REQUIRING CHANGES**

### **HIGH PRIORITY** (Core files)
1. `src/styles/globals.css` - **Main CSS variable definitions**
2. `src/tokens/design-tokens.ts` - **Design token exports**

### **MEDIUM PRIORITY** (Component files)
3. `src/components/atoms/Typography/Typography.tsx` - **25+ color references**
4. `src/components/atoms/Button/Button.tsx` - **20+ Tailwind classes**
5. `src/components/atoms/Switch/Switch.tsx` - **CSS variable usage**
6. `src/components/organisms/Table/` - **Multiple files with hardcoded values**

### **LOW PRIORITY** (Test & Documentation)
7. `src/components/atoms/Button/Button.test.tsx` - **Test assertions**
8. Various story files and documentation

---

## 🔄 **MIGRATION STRATEGY**

### **STEP 1: CSS Variables** (Foundation)
- Update all `--dark-*`, `--box-border`, `--divider`, `--bg`, `--white` definitions
- Resolve conflicts with existing `--primary`/`--secondary`
- Create backward compatibility aliases

### **STEP 2: Design Tokens** (API)
- Update `design-tokens.ts` exports
- Maintain both old and new exports during transition

### **STEP 3: Component Updates** (Implementation)
- Update all Tailwind class names (`dark-100` → `primary`)
- Update all CSS variable references (`var(--dark-100)` → `var(--primary)`)
- Update hardcoded hex values to use new variables

### **STEP 4: Cleanup** (Final)
- Remove old variable definitions
- Remove backward compatibility aliases
- Update documentation and stories

---

## 🧪 **TESTING STRATEGY**
1. **After each step**: Run `npm run build` to verify no breakage
2. **Visual regression**: Check key components in Storybook
3. **Automated tests**: Update test assertions to match new names
4. **Git commits**: One commit per migration step for easy rollback

---

## ⚠️ **RISK MITIGATION**
- **Gradual migration**: Change one file type at a time
- **Backward compatibility**: Keep old variables during transition
- **Build verification**: Test after each major change
- **Git safety**: Frequent commits with descriptive messages 