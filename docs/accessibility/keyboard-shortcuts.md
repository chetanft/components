# Keyboard Shortcuts Guide - FT Design System

Complete keyboard navigation reference for all interactive components.

---

## Global Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move focus forward |
| `Shift + Tab` | Move focus backward |
| `Enter` | Activate focused element |
| `Space` | Activate buttons, toggle checkboxes |
| `Esc` | Close modals, drawers, dropdowns |

---

## Component-Specific Shortcuts

### Modal & Drawer

| Key | Action |
|-----|--------|
| `Esc` | Close modal/drawer |
| `Tab` | Navigate within modal (focus trapped) |
| `Shift + Tab` | Navigate backward |

**Behavior**:
- Focus automatically moves to modal on open
- Tab cycles through interactive elements
- Focus returns to trigger on close

---

### Dropdown / Select

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Open dropdown |
| `↑` Arrow Up | Navigate to previous option |
| `↓` Arrow Down | Navigate to next option |
| `Home` | Jump to first option |
| `End` | Jump to last option |
| `Enter` | Select highlighted option |
| `Esc` | Close dropdown |
| Type letters | Jump to matching option |

**Behavior**:
- Arrow keys highlight options
- Enter selects and closes
- Typing filters/jumps to options

---

### Tabs

| Key | Action |
|-----|--------|
| `→` Arrow Right | Next tab |
| `←` Arrow Left | Previous tab |
| `Home` | First tab |
| `End` | Last tab |
| `Tab` | Move focus into tab panel |

**Behavior**:
- Arrow keys change active tab
- Automatic panel switching
- Tab moves to panel content

---

### Carousel

| Key | Action |
|-----|--------|
| `→` Arrow Right | Next slide |
| `←` Arrow Left | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `Tab` | Navigate carousel controls |

**Behavior**:
- Arrows change slides
- Auto-play pauses on interaction
- Dot indicators are focusable

---

### Table

| Key | Action |
|-----|--------|
| `Tab` | Navigate through cells/controls |
| `Enter` | Activate row action |
| `Space` | Toggle row selection (if selectable) |
| `↑` / `↓` | Navigate rows (in some implementations) |

**Behavior**:
- Tab moves through interactive elements
- Sortable columns activated with Enter
- Pagination controls keyboard accessible

---

### Form Components

#### Input / Textarea

| Key | Action |
|-----|--------|
| `Tab` | Next field |
| `Shift + Tab` | Previous field |
| Standard text editing | Works as expected |

#### Checkbox / Radio

| Key | Action |
|-----|--------|
| `Space` | Toggle checkbox |
| `↑` / `↓` | Navigate radio options (radio group) |
| `Enter` | Select radio option |

#### Toggle / Switch

| Key | Action |
|-----|--------|
| `Space` | Toggle on/off |
| `Enter` | Toggle on/off |

---

### Navigation

| Key | Action |
|-----|--------|
| `Tab` | Navigate links |
| `Enter` | Follow link |
| `↑` / `↓` | Navigate menu items (when menu open) |
| `Esc` | Close navigation menu |

---

### Date Picker / Calendar

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Open calendar |
| `↑` / `↓` / `←` / `→` | Navigate dates |
| `Page Up` | Previous month |
| `Page Down` | Next month |
| `Home` | Start of week |
| `End` | End of week |
| `Enter` | Select date |
| `Esc` | Close calendar |

---

### Slider

| Key | Action |
|-----|--------|
| `←` / `↓` | Decrease value |
| `→` / `↑` | Increase value |
| `Home` | Minimum value |
| `End` | Maximum value |
| `Page Up` | Large increase |
| `Page Down` | Large decrease |

---

## Accessibility Best Practices

### For Developers

1. **Always provide keyboard support** for interactive elements
2. **Use semantic HTML** (button, not div with onClick)
3. **Maintain logical tab order** (no tabindex > 0)
4. **Visible focus indicators** for all focusable elements
5. **Focus management** in modals (trap and restore)

### For Users

- **Visual focus indicators**: Look for outline/ring around focused element
- **Tab to navigate**: Use Tab key when mouse is unavailable
- **Esc to exit**: Close overlays and return to main content
- **Arrow keys**: Navigate within components (dropdowns, tabs, etc.)

---

## Screen Reader Hints

### NVDA / JAWS

- **Forms mode automatically** for form controls
- **Application mode** for complex widgets (carousels)
- **Table navigation** with Ctrl+Alt+arrows

### VoiceOver (macOS)

- **VO + arrows** to navigate
- **VO + Space** to activate
- **VO + Command + H** for headings

---

## Testing Checklist

Test keyboard navigation for each component:

- [ ] All interactive elements focusable
- [ ] Focus order logical (top to bottom, left to right)
- [ ] Focus visible (outline/ring indicator)
- [ ] No keyboard traps (can always escape)
- [ ] Shortcuts work as documented
- [ ] Screen reader announcements correct

---

## Component Implementation Examples

### Button with Keyboard

```tsx
<Button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click Me
</Button>
```

### Modal with Focus Trap

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  onKeyDown={(e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }}
>
  {/* Focus trapped within modal */}
</Modal>
```

### Dropdown with Keyboard

```tsx
<Dropdown
  onKeyDown={(e) => {
    if (e.key === 'ArrowDown') handleNext();
    if (e.key === 'ArrowUp') handlePrev();
    if (e.key === 'Enter') handleSelect();
    if (e.key === 'Escape') handleClose();
  }}
/>
```

---

## Related Documentation

- [Accessibility Audit Report](./audit-report.md)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
