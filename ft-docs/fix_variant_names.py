#!/usr/bin/env python3
"""Fix generic variant names in components.json"""
import json
from pathlib import Path

# Load components.json
json_path = Path(__file__).parent / "src" / "data" / "components.json"
with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Define fixes for each component
fixes = {
    "Checkbox": {
        "Variant 1": "Unchecked",
        "Variant 2": "Checked",
        "Variant 3": "Indeterminate",
        "Variant 4": "With Description",
        "Variant 5": "With Description Checked",
        "Variant 6": "Error",
        "Variant 7": "Disabled",
        "Variant 8": "Disabled Checked",
    },
    "Switch": {
        "Variant 1": "Off",
        "Variant 2": "On",
        "Variant 3": "Disabled Off",
        "Variant 4": "Disabled On",
        "Variant 5": "Dark Mode",
        "Variant 6": "Email Notifications",
        "Variant 7": "Push Notifications",
        "Variant 8": "Auto-save",
    },
    "SubText": {
        "Variant 1": "Without Icon",
        "Variant 2": "With Icon",
    },
    "Statistic": {
        "Variant 1": "Active Users",
        "Variant 2": "Revenue",
        "Variant 3": "Conversion Rate",
        "Variant 4": "New Signups",
        "Variant 5": "Total Orders",
        "Variant 6": "Bounce Rate",
    },
    "Card": {
        "Variant 1": "Basic",
        "Variant 2": "Advanced",
        "Variant 3": "Minimal",
    },
    "FileCard": {
        "Variant 1": "Validating",
        "Variant 2": "Template Mismatch", 
        "Variant 3": "Unsupported",
    },
    "FileTypeIcon": {
        "Variant 1": "XLS",
    },
    "Spacer": {
        "Variant 1": "Default",
    },
    "Icon": {
        "Variant 1": "Default",
    },
    "ReadOnly": {
        "Variant 2": "Horizontal With Icon",  # First one
        "Variant 2": "Vertical With Icon",  # Second one (duplicate name)
        "Variant 3": "Vertical With Subtext",
        "Variant 4": "Vertical With Icon And Subtext",
        "Variant 5": "Horizontal",
        "Variant 6": "Horizontal With Icon",
    },
    "Label": {
        "Variant 2": "Optional",
        "Variant 3": "Optional With Suffix Icon",
        "Variant 4": "Mandatory",
        "Variant 5": "Mandatory With Suffix Icon",
    },
}

# Apply fixes
components = data.get("designSystem", {}).get("components", {})
for component_name, name_map in fixes.items():
    if component_name in components:
        examples = components[component_name].get("examples", [])
        for example in examples:
            old_name = example.get("name", "")
            if old_name in name_map:
                example["name"] = name_map[old_name]
                print(f"Updated {component_name}: {old_name} -> {name_map[old_name]}")

# Handle ReadOnly duplicate Variant 2
if "ReadOnly" in components:
    examples = components["ReadOnly"].get("examples", [])
    variant2_count = 0
    for example in examples:
        if example.get("name") == "Variant 2":
            variant2_count += 1
            if variant2_count == 1:
                example["name"] = "Horizontal With Icon"
                print(f"Updated ReadOnly: Variant 2 (1st) -> Horizontal With Icon")
            elif variant2_count == 2:
                example["name"] = "Vertical With Icon"
                print(f"Updated ReadOnly: Variant 2 (2nd) -> Vertical With Icon")

# Save updated JSON
with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\nUpdated components.json successfully!")

