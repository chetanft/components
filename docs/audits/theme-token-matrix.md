# Theme Token Matrix — Light / Dark / Night

> **Generated:** 2026-03-08
> **Source:** `src/styles/globals.css`

## Gap Analysis Summary

Light mode (`:root`) **does** define explicit button, badge, and form tokens. All three themes have full coverage of the core token categories. No critical gaps detected — all themes define the same semantic token surface.

Minor differences:
- Dark and night modes define `-dark` suffixed form aliases (e.g., `--surface-dark`, `--input-dark`) that light mode omits. These are redundant duplicates used for legacy compatibility and are not a functional gap.
- `--badge-neutral-border` and `--badge-neutral-hover-bg/border` are defined in light mode but **missing** from dark and night modes.
- `--badge-success-hover-border` and `--badge-warning-hover-border` are defined in light mode but missing from night mode.

---

## Table 1: Semantic Colors

| Token | Light | Dark | Night | Notes |
|---|---|---|---|---|
| `--primary` | `var(--primary-700)` → #434f64 | #e4e7ec | #f0f0f0 | |
| `--secondary` | `var(--primary-500)` → #5f697b | #a7afb9 | #d0d0d0 | |
| `--tertiary` | `var(--primary-300)` → #838c9d | #838c9d | #a0a0a0 | Dark same as light |
| `--border-primary` | `var(--secondary-300)` → #ced1d7 | #5f697b | #404040 | |
| `--border-secondary` | `var(--secondary-100)` → #f0f1f7 | #434f64 | #202020 | |
| `--bg-primary` | `var(--tertiary-0)` → #ffffff | #1a2330 | #000000 | |
| `--bg-secondary` | `var(--tertiary-100)` → #f8f8f9 | #2c3547 | #1a1a1a | |
| `--bg-tertiary` | `var(--tertiary-200)` → #f4f4f6 | #434f64 | #202020 | |
| `--text-primary` | `var(--primary-700)` → #434f64 | `var(--primary)` → #e4e7ec | `var(--primary)` → #f0f0f0 | |
| `--text-secondary` | `var(--primary-500)` → #5f697b | `var(--secondary)` → #a7afb9 | `var(--secondary)` → #d0d0d0 | |
| `--text-tertiary` | `var(--primary-300)` → #838c9d | `var(--tertiary)` → #838c9d | `var(--tertiary)` → #a0a0a0 | |
| `--text-placeholder` | `var(--secondary-400)` → #b6bac0 | `var(--tertiary)` → #838c9d | `var(--tertiary)` → #a0a0a0 | |
| `--text-disabled` | `var(--secondary-300)` → #ced1d7 | `var(--border-primary)` → #5f697b | `var(--border-primary)` → #404040 | |
| `--color-divider` | `var(--secondary-200)` → #ebecef | `var(--border-secondary)` → #434f64 | `var(--border-secondary)` → #202020 | |

---

## Table 2: Status Colors

| Token | Light | Dark | Night | Notes |
|---|---|---|---|---|
| `--critical` | `var(--danger-500)` → #ff3532 | #ff9999 | #ff6666 | |
| `--critical-dark` | `var(--danger-700)` → #b70100 | #ffcccc | #b70100 | Night uses same as light |
| `--critical-light` | `var(--danger-100)` → #ffeafa | #990000 | #ffeaea | Dark inverts to deep red bg |
| `--warning` | `var(--warning-500)` → #ff6c19 | #ff944d | #ff8c4d | |
| `--warning-dark` | `var(--warning-700)` → #dd6a00 | #ffcc99 | #dd6a00 | Night uses same as light |
| `--warning-light` | `var(--warning-100)` → #ffedbc | #dd6a00 | #ffebdc | Dark inverts to deep orange |
| `--positive` | `var(--positive-500)` → #00c637 | #1aff66 | #33ff77 | |
| `--positive-dark` | `var(--positive-700)` → #00753d | #99ffcc | #00763d | Night uses same as light (typo: 763d vs 753d) |
| `--positive-light` | `var(--positive-100)` → #deffe7 | #00753d | #dfffe8 | |
| `--neutral` | `var(--neutral-500)` → #1890ff | #4da6ff | #66b3ff | |
| `--neutral-dark` | `var(--neutral-700)` → #006dd3 | #b3d9ff | #006ed3 | Night typo: 006ed3 vs 006dd3 |
| `--neutral-light` | `var(--neutral-100)` → #ecf6ff | #006dd3 | #ecf6ff | |

---

## Table 3: Button Tokens

| Token | Light | Dark | Night | Notes |
|---|---|---|---|---|
| `--button-primary-bg` | `var(--primary-900)` → #1a2330 | #e2e8f0 | #f0f0f0 | Inverted paradigm: dark bg in light, light bg in dark/night |
| `--button-primary-text` | #ffffff | #000000 | #000000 | |
| `--button-primary-hover-bg` | `var(--primary-800)` → #2c3547 | #94a3b8 | #d0d0d0 | |
| `--button-primary-border` | `var(--primary-900)` → #1a2330 | #e2e8f0 | #f0f0f0 | |
| `--button-secondary-bg` | #ffffff | #1e293b | #1a1a1a | |
| `--button-secondary-text` | #434f64 | #e2e8f0 | #f0f0f0 | |
| `--button-secondary-hover-bg` | #f0f1f7 | #334155 | #202020 | |
| `--button-secondary-border` | #ced1d7 | #475569 | #404040 | |
| `--button-secondary-hover-border` | #838c9d | #64748b | #a0a0a0 | |
| `--button-destructive-bg` | #ff3532 | #ff4d4f | #ff6666 | Progressively lighter in darker modes |
| `--button-destructive-text` | #ffffff | #ffffff | #ffffff | Same across all |
| `--button-destructive-hover-bg` | #b70100 | #dc2626 | #ff4d4f | |
| `--button-destructive-border` | #ff3532 | #ff4d4f | #ff6666 | |
| `--button-text-bg` | transparent | transparent | transparent | Same across all |
| `--button-text-text` | #434f64 | #e2e8f0 | #f0f0f0 | |
| `--button-text-hover-bg` | #f0f1f7 | #334155 | #202020 | |
| `--button-text-border` | transparent | transparent | transparent | Same across all |

---

## Table 4: Badge Tokens

| Token | Light | Dark | Night | Notes |
|---|---|---|---|---|
| `--badge-normal-bg` | #f0f1f7 | #334155 | #404040 | |
| `--badge-normal-text` | #434f64 | #e2e8f0 | #f0f0f0 | |
| `--badge-normal-border` | #ced1d7 | #475569 | #202020 | |
| `--badge-normal-hover-bg` | #ced1d7 | #475569 | #202020 | |
| `--badge-normal-hover-border` | #838c9d | #64748b | #a0a0a0 | |
| `--badge-danger-bg` | #ffe9e9 | #7f1d1d | #1a1a1a | |
| `--badge-danger-text` | #ff3532 | #fca5a5 | #ff6666 | |
| `--badge-danger-border` | #ff3532 | #ef4444 | #ff6666 | |
| `--badge-danger-hover-bg` | #ffafad | #991b1b | #000000 | |
| `--badge-danger-hover-border` | #b70100 | #dc2626 | #ff6666 | |
| `--badge-danger-hover-text` | #b70100 | #fecaca | #ff6666 | |
| `--badge-success-bg` | #deffe7 | #14532d | #1a1a1a | |
| `--badge-success-text` | #00753d | #86efac | #33ff77 | |
| `--badge-success-border` | #00753d | #22c55e | #33ff77 | |
| `--badge-success-hover-bg` | #99e8af | #166534 | #000000 | |
| `--badge-success-hover-border` | #00753d | — | — | **Missing in dark and night** |
| `--badge-warning-bg` | #ffebdc | #78350f | #1a1a1a | |
| `--badge-warning-text` | #ff6c19 | #fbbf24 | #ff8c4d | |
| `--badge-warning-border` | #ff6c19 | #f59e0b | #ff8c4d | |
| `--badge-warning-hover-bg` | #ffc4a3 | #92400e | #000000 | |
| `--badge-warning-hover-border` | #ff6c19 | — | — | **Missing in dark and night** |
| `--badge-neutral-bg` | #ecf6ff | #0c4a6e | #1a1a1a | |
| `--badge-neutral-text` | #1890ff | #7dd3fc | #66b3ff | |
| `--badge-neutral-border` | #1890ff | — | — | **Missing in dark and night** |
| `--badge-neutral-hover-bg` | #ecf6ff | — | — | **Missing in dark and night** |
| `--badge-neutral-hover-border` | #1890ff | — | — | **Missing in dark and night** |
| `--badge-border-radius` | 4px | 4px | 4px | Same across all |
| `--badge-font-size` | 12px | 12px | 12px | Same across all |
| `--badge-font-weight` | 500 | 500 | 500 | Same across all |

---

## Table 5: Form/Input Tokens

| Token | Light | Dark | Night | Notes |
|---|---|---|---|---|
| `--surface` | #ffffff | `var(--bg-primary)` → #1a2330 | `var(--bg-primary)` → #000000 | |
| `--surface-alt` | #f8f8f9 | `var(--bg-secondary)` → #2c3547 | `var(--bg-secondary)` → #1a1a1a | |
| `--surface-hover` | #f0f1f7 | `var(--bg-tertiary)` → #434f64 | `var(--bg-tertiary)` → #202020 | |
| `--surface-dark` | — | `var(--bg-primary)` → #1a2330 | `var(--bg-primary)` → #000000 | **Not defined in light** (legacy alias) |
| `--surface-alt-dark` | — | `var(--bg-secondary)` → #2c3547 | `var(--bg-secondary)` → #1a1a1a | **Not defined in light** (legacy alias) |
| `--surface-hover-dark` | — | `var(--bg-tertiary)` → #434f64 | `var(--bg-tertiary)` → #202020 | **Not defined in light** (legacy alias) |
| `--input` | #434f64 | `var(--primary)` → #e4e7ec | `var(--primary)` → #f0f0f0 | |
| `--input-muted` | #838c9d | `var(--tertiary)` → #838c9d | `var(--tertiary)` → #a0a0a0 | |
| `--input-disabled` | #ced1d7 | `var(--border-primary)` → #5f697b | `var(--border-primary)` → #404040 | |
| `--input-dark` | — | `var(--primary)` → #e4e7ec | `var(--primary)` → #f0f0f0 | **Not defined in light** (legacy alias) |
| `--input-muted-dark` | — | `var(--tertiary)` → #838c9d | `var(--tertiary)` → #a0a0a0 | **Not defined in light** (legacy alias) |
| `--input-disabled-dark` | — | `var(--border-primary)` → #5f697b | `var(--border-primary)` → #404040 | **Not defined in light** (legacy alias) |
| `--placeholder` | #838c9d | `var(--tertiary)` → #838c9d | `var(--tertiary)` → #a0a0a0 | |
| `--placeholder-dark` | — | `var(--tertiary)` → #838c9d | `var(--tertiary)` → #a0a0a0 | **Not defined in light** (legacy alias) |
| `--helper` | #838c9d | `var(--tertiary)` → #838c9d | `var(--tertiary)` → #a0a0a0 | |
| `--helper-dark` | — | `var(--tertiary)` → #838c9d | `var(--tertiary)` → #a0a0a0 | **Not defined in light** (legacy alias) |
| `--border` | #ced1d7 | `var(--border-primary)` → #5f697b | `var(--border-primary)` → #404040 | |
| `--border-hover` | #434f64 | `var(--primary)` → #e4e7ec | `var(--primary)` → #f0f0f0 | |
| `--border-disabled` | #f0f1f7 | `var(--border-secondary)` → #434f64 | `var(--border-secondary)` → #202020 | |
| `--border-alt` | #ced1d7 | `var(--border-secondary)` → #434f64 | `var(--border-secondary)` → #202020 | |
| `--border-dark` | — | `var(--border-primary)` → #5f697b | `var(--border-primary)` → #404040 | **Not defined in light** (legacy alias) |
| `--border-hover-dark` | — | `var(--primary)` → #e4e7ec | `var(--primary)` → #f0f0f0 | **Not defined in light** (legacy alias) |
| `--border-disabled-dark` | — | `var(--border-secondary)` → #434f64 | `var(--border-secondary)` → #202020 | **Not defined in light** (legacy alias) |
| `--border-alt-dark` | — | `var(--border-secondary)` → #434f64 | `var(--border-secondary)` → #202020 | **Not defined in light** (legacy alias) |
| `--focus` | #434f64 | `var(--primary)` → #e4e7ec | `var(--primary)` → #f0f0f0 | |
| `--focus-ring` | #434f64 | `var(--primary)` → #e4e7ec | `var(--primary)` → #f0f0f0 | |
| `--focus-dark` | — | `var(--primary)` → #e4e7ec | `var(--primary)` → #f0f0f0 | **Not defined in light** (legacy alias) |

---

## Table 6: Glass Tokens

| Token | Light | Dark | Night | Notes |
|---|---|---|---|---|
| `--glass-blur-sm` | 10px | 12px | 14px | Progressively stronger blur |
| `--glass-blur` | 16px | 18px | 20px | |
| `--glass-blur-lg` | 22px | 24px | 26px | |
| `--glass-saturate-sm` | 150% | 155% | 130% | Night lower saturation |
| `--glass-saturate` | 165% | 170% | 140% | |
| `--glass-saturate-lg` | 180% | 185% | 155% | |
| `--glass-bg` | rgba(255,255,255,0.48) | rgba(20,22,28,0.50) | rgba(18,18,20,0.45) | White tint → dark tint |
| `--glass-bg-subtle` | rgba(255,255,255,0.30) | rgba(20,22,28,0.35) | rgba(18,18,20,0.30) | |
| `--glass-bg-prominent` | rgba(255,255,255,0.62) | rgba(20,22,28,0.65) | rgba(18,18,20,0.60) | |
| `--glass-border` | rgba(255,255,255,0.45) | rgba(255,255,255,0.12) | rgba(255,255,255,0.08) | Decreasing opacity |
| `--glass-border-subtle` | rgba(255,255,255,0.35) | rgba(255,255,255,0.07) | rgba(255,255,255,0.05) | |
| `--glass-border-soft` | rgba(0,0,0,0.06) | rgba(255,255,255,0.04) | rgba(255,255,255,0.03) | Light uses black, dark/night use white |
| `--glass-inner-highlight` | rgba(255,255,255,0.45) | rgba(255,255,255,0.08) | rgba(255,255,255,0.06) | |
| `--glass-shadow` | 0 12px 36px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08) | 0 14px 40px rgba(0,0,0,0.40), 0 3px 12px rgba(0,0,0,0.25) | 0 14px 40px rgba(0,0,0,0.50), 0 3px 12px rgba(0,0,0,0.30) | Heavier shadows in darker modes |
| `--glass-shadow-lg` | 0 16px 48px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.10) | 0 18px 50px rgba(0,0,0,0.50), 0 4px 14px rgba(0,0,0,0.28) | 0 20px 60px rgba(0,0,0,0.60), 0 5px 16px rgba(0,0,0,0.32) | |
| `--glass-hover` | rgba(255,255,255,0.30) | rgba(255,255,255,0.07) | rgba(255,255,255,0.05) | |
| `--glass-pressed` | rgba(255,255,255,0.20) | rgba(255,255,255,0.05) | rgba(255,255,255,0.03) | |
| `--glass-selected` | rgba(255,255,255,0.38) | rgba(255,255,255,0.10) | rgba(255,255,255,0.08) | |
| `--glass-radius` | 14px | 14px | 14px | Same across all |

---

## Table 7: Switch Tokens

| Token | Light | Dark | Night | Notes |
|---|---|---|---|---|
| `--switch-off-bg` | `var(--tertiary)` → #838c9d | `var(--tertiary)` → #838c9d | `var(--tertiary)` → #a0a0a0 | |
| `--switch-on-bg` | `var(--border-primary)` → #ced1d7 | `var(--border-primary)` → #5f697b | `var(--border-primary)` → #404040 | |
| `--switch-disabled-bg` | rgba(139,139,139,0.2) | rgba(139,139,139,0.2) | rgba(139,139,139,0.2) | Same across all |
| `--switch-thumb-off` | #ffffff | #ffffff | #ffffff | Same across all |
| `--switch-thumb-on` | `var(--primary)` → #434f64 | `var(--primary)` → #e4e7ec | `var(--primary)` → #f0f0f0 | |
| `--switch-disabled-thumb` | `var(--bg-secondary)` → #f8f8f9 | `var(--bg-secondary)` → #2c3547 | `var(--bg-secondary)` → #1a1a1a | |
| `--switch-disabled-thumb-on` | `var(--border-primary)` → #ced1d7 | `var(--border-primary)` → #5f697b | `var(--border-primary)` → #404040 | |

---

## Table 8: Overlay Tokens

| Token | Light | Dark | Night | Notes |
|---|---|---|---|---|
| `--overlay-strong` | rgba(12,18,28,0.65) | rgba(3,7,15,0.75) | rgba(0,0,0,0.75) | Progressively darker base + higher opacity |
| `--overlay-medium` | rgba(12,18,28,0.45) | rgba(3,7,15,0.55) | rgba(0,0,0,0.55) | |
| `--overlay-light` | rgba(12,18,28,0.2) | rgba(3,7,15,0.35) | rgba(0,0,0,0.35) | |
| `--overlay-control-bg` | rgba(255,255,255,0.12) | rgba(255,255,255,0.16) | rgba(255,255,255,0.2) | Higher opacity in darker modes |
| `--overlay-control-bg-hover` | rgba(255,255,255,0.24) | rgba(255,255,255,0.28) | rgba(255,255,255,0.35) | |
| `--overlay-control-divider` | rgba(255,255,255,0.3) | rgba(255,255,255,0.35) | rgba(255,255,255,0.4) | |
| `--overlay-control-text` | #ffffff | #f8fafc | #ffffff | Dark uses slightly warm white |
