"use client"

import type { ControlDef } from "@/lib/playground-controls"

interface PlaygroundControlProps {
  control: ControlDef
  value: unknown
  onChange: (name: string, value: unknown) => void
}

const inputStyle = {
  background: "var(--bg-primary)",
  borderColor: "var(--border-primary)",
  color: "var(--primary)",
}

const inputClassName = "w-full rounded-md border px-3 py-1.5 text-sm-rem"

export function PlaygroundControl({ control, value, onChange }: PlaygroundControlProps) {
  const handleChange = (newValue: unknown) => {
    onChange(control.name, newValue)
  }

  const renderControl = () => {
    switch (control.type) {
      case "select":
        return (
          <select
            className={inputClassName}
            style={inputStyle}
            value={value != null ? String(value) : ""}
            onChange={(e) => handleChange(e.target.value || undefined)}
          >
            <option value="">&mdash;</option>
            {control.options?.map((opt) => (
              <option key={String(opt)} value={String(opt)}>
                {String(opt)}
              </option>
            ))}
          </select>
        )

      case "boolean":
        return (
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border accent-[var(--info)]"
              checked={value != null ? Boolean(value) : false}
              onChange={(e) => handleChange(e.target.checked)}
            />
            <span className="text-sm-rem" style={{ color: "var(--primary)" }}>
              {control.label}
            </span>
          </label>
        )

      case "text":
        return (
          <input
            type="text"
            className={inputClassName}
            style={inputStyle}
            value={value != null ? String(value) : ""}
            onChange={(e) => handleChange(e.target.value)}
          />
        )

      case "number":
        return (
          <input
            type="number"
            className={inputClassName}
            style={inputStyle}
            value={value != null ? Number(value) : ""}
            min={control.min}
            max={control.max}
            step={control.step}
            onChange={(e) =>
              handleChange(e.target.value === "" ? undefined : Number(e.target.value))
            }
          />
        )

      case "color":
        return (
          <input
            type="color"
            className="h-8 w-8 cursor-pointer rounded border"
            style={{ borderColor: "var(--border-primary)" }}
            value={value != null ? String(value) : "#000000"}
            onChange={(e) => handleChange(e.target.value)}
          />
        )

      case "range":
        return (
          <input
            type="range"
            className="w-full accent-[var(--info)]"
            min={control.min}
            max={control.max}
            step={control.step}
            value={value != null ? Number(value) : control.min ?? 0}
            onChange={(e) => handleChange(Number(e.target.value))}
          />
        )

      case "radio":
        return (
          <div className="inline-flex flex-wrap gap-3">
            {control.options?.map((opt) => (
              <label key={String(opt)} className="inline-flex items-center gap-1.5">
                <input
                  type="radio"
                  name={control.name}
                  value={String(opt)}
                  checked={value != null ? String(value) === String(opt) : false}
                  onChange={() => handleChange(opt)}
                />
                <span className="text-sm-rem" style={{ color: "var(--primary)" }}>
                  {String(opt)}
                </span>
              </label>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      {control.type !== "boolean" && (
        <label
          className="text-xs-rem font-medium"
          style={{ color: "var(--secondary)" }}
        >
          {control.label}
        </label>
      )}
      {renderControl()}
    </div>
  )
}
