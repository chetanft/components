"use client"

import React from "react"
import type { ControlDef } from "@/lib/playground-controls"
import { designTokens } from "../../../src/tokens/design-tokens"
import {
  Input,
  InputNumber,
  Checkbox,
  CheckboxInput,
  CheckboxLabel,
  Slider,
  ColorPicker,
  RadioGroup,
  RadioItem,
  RadioItemInput,
  RadioItemLabel,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownMenu,
  DropdownMenuItem,
} from "../../../src"

interface PlaygroundControlProps {
  control: ControlDef
  value: unknown
  onChange: (name: string, value: unknown) => void
}

export function PlaygroundControl({ control, value, onChange }: PlaygroundControlProps) {
  const handleChange = (newValue: unknown) => {
    onChange(control.name, newValue)
  }

  const renderControl = () => {
    switch (control.type) {
      case "select":
        return (
          <Dropdown
            value={value != null ? String(value) : ""}
            placeholder="—"
            size="sm"
            onChange={(val: string | number) => handleChange(val || undefined)}
          >
            <DropdownTrigger />
            <DropdownContent>
              <DropdownMenu>
                <DropdownMenuItem
                  value=""
                  label="—"
                />
                {control.options?.map((opt) => (
                  <DropdownMenuItem
                    key={String(opt)}
                    value={String(opt)}
                    label={String(opt)}
                  />
                ))}
              </DropdownMenu>
            </DropdownContent>
          </Dropdown>
        )

      case "boolean":
        return (
          <Checkbox size="sm">
            <CheckboxInput
              checked={value != null ? Boolean(value) : false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.checked)}
            />
            <CheckboxLabel>{control.label}</CheckboxLabel>
          </Checkbox>
        )

      case "text":
        return (
          <Input
            size="sm"
            type="text"
            value={value != null ? String(value) : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
          />
        )

      case "number":
        return (
          <InputNumber
            size="sm"
            value={value != null ? Number(value) : undefined}
            min={control.min}
            max={control.max}
            step={control.step}
            onChange={(val: number | null) => handleChange(val ?? undefined)}
          />
        )

      case "color":
        return (
          <ColorPicker
            size="sm"
            value={value != null ? String(value) : designTokens.baseColors.lightMode.tertiary900}
            onChange={(color: string) => handleChange(color)}
          />
        )

      case "range":
        return (
          <Slider
            min={control.min ?? 0}
            max={control.max ?? 100}
            step={control.step ?? 1}
            value={value != null ? Number(value) : control.min ?? 0}
            onChange={(val: number | [number, number]) => handleChange(val)}
          />
        )

      case "radio":
        return (
          <RadioGroup
            name={control.name}
            value={value != null ? String(value) : ""}
            onValueChange={(val: string) => handleChange(val)}
            orientation="horizontal"
            size="sm"
          >
            {control.options?.map((opt) => (
              <RadioItem key={String(opt)} value={String(opt)}>
                <RadioItemInput />
                <RadioItemLabel>{String(opt)}</RadioItemLabel>
              </RadioItem>
            ))}
          </RadioGroup>
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
