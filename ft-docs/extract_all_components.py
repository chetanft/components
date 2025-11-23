#!/usr/bin/env python3
"""
Extract all components from Storybook files and generate components.json

IMPROVEMENTS:
- Automatically extracts individual variants from "AllVariants" stories
- Parses both Story and arrow function exports
- Extracts variant types from component TypeScript files
- Generates examples for missing variants based on type definitions
- Deduplicates examples to avoid repetition
- Better handles complex render functions with multiple component instances
"""
import json
import re
import os
from pathlib import Path
from typing import Dict, List, Any

def extract_component_name_from_path(path: str) -> str:
    """Extract component name from file path"""
    # Examples:
    # src/components/atoms/Button/Button.stories.tsx -> Button
    # src/stories/Input.stories.tsx -> Input
    # src/components/organisms/AppHeader/AppHeader.stories.tsx -> AppHeader
    # src/stories/ProgressList.stories.tsx -> ProgressList
    
    filename = os.path.basename(path)
    # Remove .stories.tsx extension
    name = filename.replace('.stories.tsx', '')
    
    # Handle special cases
    if name == 'Icon' and '/Icons/' in path:
        return 'Icon'
    if name == 'Logo' and '/Logos/' in path:
        return 'Logo'
    
    # If it's in a component folder, try to get folder name
    if '/components/' in path:
        parts = path.split('/')
        for i, part in enumerate(parts):
            if part in ['atoms', 'molecules', 'organisms'] and i + 1 < len(parts):
                # Next part should be component folder
                folder_name = parts[i + 1]
                # Capitalize first letter
                return folder_name[0].upper() + folder_name[1:] if folder_name else name
    
    # For stories in src/stories/, use the filename directly
    # But handle camelCase properly
    if '/stories/' in path and name:
        # Ensure proper capitalization
        return name[0].upper() + name[1:] if len(name) > 1 else name.upper()
    
    return name

def extract_description_from_story(content: str) -> str:
    """Extract component description from Storybook meta"""
    # Look for description in docs.description.component
    pattern = r'description:\s*{\s*component:\s*["\']([^"\']+)["\']'
    match = re.search(pattern, content)
    if match:
        return match.group(1)
    
    # Look for description in parameters.docs.description.component
    pattern = r'description:\s*{\s*component:\s*["\']([^"\']+)["\']'
    match = re.search(pattern, content, re.MULTILINE)
    if match:
        return match.group(1)
    
    # Fallback: use title or component name
    return "Component"

def generate_variant_name_from_props(code: str) -> str:
    """Generate a meaningful variant name from component props"""
    # Normalize whitespace for easier matching
    normalized_code = re.sub(r'\s+', ' ', code.strip())
    
    # Check for common boolean props that indicate state
    # Simple check: if word appears as a standalone prop (not part of prop assignment)
    # Check for patterns: " checked ", " checked/>", " checked>", or ends with " checked"
    has_checked = ' checked ' in normalized_code or ' checked/>' in normalized_code or ' checked>' in normalized_code or normalized_code.rstrip().endswith(' checked')
    has_disabled = ' disabled ' in normalized_code or ' disabled/>' in normalized_code or ' disabled>' in normalized_code or normalized_code.rstrip().endswith(' disabled')
    has_indeterminate = ' indeterminate ' in normalized_code or ' indeterminate/>' in normalized_code or ' indeterminate>' in normalized_code or normalized_code.rstrip().endswith(' indeterminate')
    has_error = ' error ' in normalized_code or ' error/>' in normalized_code or ' error>' in normalized_code or normalized_code.rstrip().endswith(' error')
    
    # But exclude if it's a prop assignment like checked= or checked =
    if has_checked and ('checked=' in normalized_code or 'checked =' in normalized_code):
        has_checked = False
    if has_disabled and ('disabled=' in normalized_code or 'disabled =' in normalized_code):
        has_disabled = False
    if has_indeterminate and ('indeterminate=' in normalized_code or 'indeterminate =' in normalized_code):
        has_indeterminate = False
    if has_error and ('error=' in normalized_code or 'error =' in normalized_code):
        has_error = False
    
    # Check if both checked and disabled are present
    if has_checked and has_disabled:
        return "Disabled Checked"
    elif has_checked:
        return "Checked"
    
    if has_disabled:
        return "Disabled"
    
    if has_indeterminate:
        return "Indeterminate"
    
    if has_error:
        return "Error"
    
    # Check for icon prop
    icon_match = re.search(r'icon=["\']([^"\']+)["\']', normalized_code)
    if icon_match:
        icon_value = icon_match.group(1)
        if icon_value == "Yes":
            return "With Icon"
        elif icon_value == "No":
            return "Without Icon"
        else:
            return f"With {icon_value.capitalize()} Icon"
    
    # Check for labelPlacement
    placement_match = re.search(r'labelPlacement=["\']([^"\']+)["\']', normalized_code)
    if placement_match:
        placement = placement_match.group(1)
        return f"Label {placement.capitalize()}"
    
    # Check for type prop
    type_match = re.search(r'type=["\']([^"\']+)["\']', normalized_code)
    if type_match:
        type_value = type_match.group(1)
        return type_value.capitalize()
    
    # Check for status prop
    status_match = re.search(r'status=["\']([^"\']+)["\']', normalized_code)
    if status_match:
        status = status_match.group(1)
        return status.replace('-', ' ').title()
    
    # Check for optional prop (boolean)
    if re.search(r'\boptional(?!\s*=)', normalized_code):
        return "Optional"
    
    # Check for mandatory prop (boolean)
    if re.search(r'\bmandatory(?!\s*=)', normalized_code):
        return "Mandatory"
    
    # Check for suffixIcon (boolean or prop)
    if re.search(r'suffixIcon\s*(?:\/>|>|=)', normalized_code):
        return "With Suffix Icon"
    
    # Check for labelIcon (boolean prop)
    if re.search(r'labelIcon\s*=\s*true', normalized_code) or re.search(r'labelIcon\s*(?:\/>|>)', normalized_code):
        return "With Label Icon"
    
    # Check for subText (boolean or prop)
    if re.search(r'subtext=["\']', normalized_code) or re.search(r'subText\s*=\s*true', normalized_code) or re.search(r'subText\s*(?:\/>|>)', normalized_code):
        return "With Subtext"
    
    # Check for label text as fallback (extract meaningful part)
    # Only use if we haven't found a better name yet
    label_match = re.search(r'label=["\']([^"\']+)["\']', normalized_code)
    if label_match:
        label_text = label_match.group(1)
        # Use label text if it's descriptive (not too long and not generic)
        if len(label_text) < 30 and label_text.lower() not in ['label', 'text', 'value']:
            # Capitalize first letter of each word
            return label_text.title()
    
    return None

def extract_variant_types_from_component(component_path: Path, component_name: str) -> List[str]:
    """Extract variant type definitions from component TypeScript file"""
    variants = []
    
    # Try to find the component file
    possible_paths = [
        component_path.parent / f"{component_name}.tsx",
        component_path.parent / f"{component_name}.ts",
        component_path.parent.parent / component_name / f"{component_name}.tsx",
    ]
    
    for tsx_path in possible_paths:
        if tsx_path.exists():
            try:
                with open(tsx_path, 'r', encoding='utf-8') as f:
                    tsx_content = f.read()
                
                # Look for variant type definitions like: export type ButtonVariant = 'primary' | 'secondary'
                variant_pattern = rf'export\s+type\s+{component_name}Variant\s*=\s*([^;]+);'
                match = re.search(variant_pattern, tsx_content)
                if match:
                    variant_string = match.group(1)
                    # Extract individual variants
                    variant_matches = re.findall(r"['\"]([^'\"]+)['\"]", variant_string)
                    variants.extend(variant_matches)
                
                # Also look for size variants
                size_pattern = rf'export\s+type\s+{component_name}Size\s*=\s*([^;]+);'
                match = re.search(size_pattern, tsx_content)
                if match:
                    size_string = match.group(1)
                    size_matches = re.findall(r"['\"]([^'\"]+)['\"]", size_string)
                    variants.extend([f"size-{s}" for s in size_matches])
                
            except Exception as e:
                pass  # Silently fail if file can't be read
    
    return variants

def extract_props_from_story(content: str) -> Dict[str, Any]:
    """Extract props from Storybook argTypes"""
    props = {}
    
    # Find argTypes block
    argtypes_pattern = r'argTypes:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}'
    match = re.search(argtypes_pattern, content, re.DOTALL)
    if not match:
        return props
    
    argtypes_content = match.group(1)
    
    # Extract individual prop definitions
    # Look for propName: { control: ..., description: ... }
    prop_pattern = r'(\w+):\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}'
    
    for prop_match in re.finditer(prop_pattern, argtypes_content, re.DOTALL):
        prop_name = prop_match.group(1)
        prop_content = prop_match.group(2)
        
        prop_info: Dict[str, Any] = {
            "type": "any",
            "required": False,
            "description": ""
        }
        
        # Extract description
        desc_match = re.search(r'description:\s*["\']([^"\']+)["\']', prop_content)
        if desc_match:
            prop_info["description"] = desc_match.group(1)
        
        # Extract control type
        control_match = re.search(r'control:\s*\{?\s*type:\s*["\']?(\w+)["\']?', prop_content)
        if control_match:
            control_type = control_match.group(1)
            if control_type == 'select':
                # Try to find options
                options_match = re.search(r'options:\s*\[([^\]]+)\]', prop_content)
                if options_match:
                    options_str = options_match.group(1)
                    options = [opt.strip().strip("'\"") for opt in options_str.split(',')]
                    options_formatted = ', '.join([f"'{opt}'" for opt in options])
                    prop_info["type"] = f"union of {options_formatted}"
                else:
                    prop_info["type"] = "select"
            elif control_type == 'boolean':
                prop_info["type"] = "boolean"
            elif control_type == 'number':
                prop_info["type"] = "number"
            elif control_type == 'text':
                prop_info["type"] = "string"
            else:
                prop_info["type"] = control_type
        
        # Extract default value
        default_match = re.search(r'defaultValue:\s*["\']?([^"\'}\s,]+)["\']?', prop_content)
        if default_match:
            prop_info["default"] = default_match.group(1)
        
        props[prop_name] = prop_info
    
    return props

def extract_examples_from_story(content: str, component_name: str) -> List[Dict[str, str]]:
    """Extract example code from Storybook stories - improved to capture all variants"""
    examples = []
    seen_codes = set()  # Track unique codes to avoid duplicates
    
    # Find all story exports: export const StoryName: Story = {
    story_exports = list(re.finditer(
        r'export\s+const\s+(\w+)\s*:\s*Story\s*=\s*\{',
        content
    ))
    
    # Also find arrow function exports: export const StoryName = () => (
    arrow_exports = list(re.finditer(
        r'export\s+const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\(',
        content
    ))
    
    all_exports = [(m, 'story') for m in story_exports] + [(m, 'arrow') for m in arrow_exports]
    all_exports.sort(key=lambda x: x[0].start())
    
    for idx, (match, export_type) in enumerate(all_exports):
        story_name = match.group(1)
        start_pos = match.end()
        
        # Find the matching closing brace/paren for this story
        end_pos = len(content)
        if idx + 1 < len(all_exports):
            end_pos = all_exports[idx + 1][0].start()
        
        # Find the actual closing brace/paren
        if export_type == 'story':
            brace_count = 1
            pos = start_pos
            actual_end = start_pos
            
            while pos < end_pos and brace_count > 0:
                if content[pos] == '{':
                    brace_count += 1
                elif content[pos] == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        actual_end = pos + 1
                        break
                pos += 1
        else:  # arrow function
            paren_count = 1
            pos = start_pos
            actual_end = start_pos
            
            while pos < end_pos and paren_count > 0:
                if content[pos] == '(':
                    paren_count += 1
                elif content[pos] == ')':
                    paren_count -= 1
                    if paren_count == 0:
                        actual_end = pos + 1
                        break
                pos += 1
        
        story_content = content[start_pos:actual_end]
        
        # Check if this is an "AllVariants" or "AllStates" story - extract individual components
        if 'AllVariants' in story_name or 'AllStates' in story_name or 'all' in story_name.lower():
            # Extract all individual component instances from render function
            component_pattern = rf'<{component_name}(?:\s+[^>]*)?(?:>.*?</{component_name}>|/>)'
            component_matches = re.finditer(component_pattern, story_content, re.DOTALL)
            
            variant_count = 0
            for comp_match in component_matches:
                code = comp_match.group(0).strip()
                # Clean up whitespace
                code = re.sub(r'\s+', ' ', code)
                code = code.replace(' >', '>').replace('> ', '>')
                
                # Create unique key for deduplication
                code_key = re.sub(r'\s+', '', code)
                if code_key in seen_codes:
                    continue
                seen_codes.add(code_key)
                
                # Extract variant name from props if available
                variant_match = re.search(r'variant=["\']([^"\']+)["\']', code)
                size_match = re.search(r'size=["\']([^"\']+)["\']', code)
                
                if variant_match:
                    variant_name = variant_match.group(1).capitalize()
                    if size_match:
                        variant_name += f" {size_match.group(1).upper()}"
                    display_name = variant_name
                elif size_match:
                    display_name = size_match.group(1).upper()
                else:
                    # Try to generate meaningful name from props
                    generated_name = generate_variant_name_from_props(code)
                    if generated_name:
                        display_name = generated_name
                    else:
                        variant_count += 1
                        display_name = f"Variant {variant_count}"
                
                examples.append({
                    "name": display_name,
                    "code": code
                })
            
            # If we found individual variants, skip adding the full container
            if variant_count > 0 or any('variant=' in ex['code'] for ex in examples[-10:]):
                continue
        
        # Try to extract from args first
        args_match = re.search(r'args:\s*\{', story_content)
        if args_match:
            args_start = args_match.end()
            # Find matching closing brace for args
            args_brace_count = 1
            args_pos = args_start
            args_end = len(story_content)
            
            while args_pos < len(story_content) and args_brace_count > 0:
                if story_content[args_pos] == '{':
                    args_brace_count += 1
                elif story_content[args_pos] == '}':
                    args_brace_count -= 1
                    if args_brace_count == 0:
                        args_end = args_pos
                        break
                args_pos += 1
            
            args_content = story_content[args_start:args_end]
            
            # Parse args more carefully
            props_list = []
            children = None
            
            # Split by lines but handle nested objects
            lines = args_content.split('\n')
            i = 0
            while i < len(lines):
                line = lines[i].strip().rstrip(',').strip()
                if not line or line.startswith('//') or line.startswith('*'):
                    i += 1
                    continue
                
                # Match key: value pattern
                key_match = re.match(r'(\w+):\s*(.+)$', line)
                if key_match:
                    key = key_match.group(1)
                    value_part = key_match.group(2).strip().rstrip(',')
                    
                    # Handle children specially
                    if key == 'children':
                        # Extract string value
                        str_match = re.search(r"['\"]([^'\"]+)['\"]", value_part)
                        if str_match:
                            children = str_match.group(1)
                        elif value_part.strip() and not value_part.startswith('<'):
                            children = value_part.strip().rstrip(',')
                    else:
                        # Handle different value types
                        value = value_part.rstrip(',')
                        if value.startswith("'") or value.startswith('"'):
                            props_list.append(f'{key}={value}')
                        elif value in ['true', 'false']:
                            props_list.append(f'{key}={value}')
                        elif value.replace('.', '').replace('-', '').isdigit():
                            props_list.append(f'{key}={value}')
                        elif value.startswith('[') or value.startswith('{'):
                            # For complex arrays/objects, skip them in code examples
                            # They cause parsing issues in react-live
                            # Users can add them manually if needed
                            pass
                        else:
                            # String value without quotes
                            props_list.append(f'{key}="{value}"')
                
                i += 1
            
            # Build code
            if props_list:
                props_str = ' '.join(props_list)
                if children:
                    code = f'<{component_name} {props_str}>{children}</{component_name}>'
                else:
                    code = f'<{component_name} {props_str} />'
            else:
                if children:
                    code = f'<{component_name}>{children}</{component_name}>'
                else:
                    code = f'<{component_name} />'
            
            # Check for duplicates
            code_key = re.sub(r'\s+', '', code)
            if code_key in seen_codes:
                continue
            seen_codes.add(code_key)
            
            # Convert camelCase to Title Case
            story_display_name = re.sub(r'([A-Z])', r' \1', story_name).strip()
            if not story_display_name:
                story_display_name = story_name
            
            examples.append({
                "name": story_display_name,
                "code": code
            })
        
        # Also check for render functions
        elif 'render:' in story_content or export_type == 'arrow':
            # Extract render function content
            if export_type == 'arrow':
                render_content = story_content
            else:
                render_match = re.search(r'render:\s*\([^)]*\)\s*=>\s*\(([^)]+)\)', story_content, re.DOTALL)
                if not render_match:
                    continue
                render_content = render_match.group(1)
            
            # Extract all component instances - improved to handle nested structures
            # First, try to find complete component tags with proper bracket matching
            component_pattern = rf'<{component_name}(?:\s+[^>]*)?(?:>.*?</{component_name}>|/>)'
            component_matches = list(re.finditer(component_pattern, render_content, re.DOTALL))
            
            # If regex didn't work well, try manual parsing for complex cases
            if not component_matches:
                # Find opening tag
                open_tag_pattern = rf'<{component_name}(?:\s+[^>]*)?>'
                open_matches = list(re.finditer(open_tag_pattern, render_content))
                for open_match in open_matches:
                    start = open_match.start()
                    # Find matching closing tag
                    close_pattern = rf'</{component_name}>'
                    close_match = re.search(close_pattern, render_content[start:])
                    if close_match:
                        end = start + close_match.end()
                        code = render_content[start:end].strip()
                        component_matches.append(type('Match', (), {'group': lambda self, n=0: code, 'start': lambda: start, 'end': lambda: end})())
            
            if len(component_matches) > 1:
                # Multiple components - extract each one
                for comp_match in component_matches:
                    code = comp_match.group(0).strip() if hasattr(comp_match, 'group') else str(comp_match).strip()
                    code = re.sub(r'\s+', ' ', code)
                    code = code.replace(' >', '>').replace('> ', '>')
                    
                    # Validate code has balanced brackets/braces/parens
                    if code.count('{') != code.count('}') or code.count('[') != code.count(']') or code.count('(') != code.count(')'):
                        # Skip incomplete code examples
                        continue
                    
                    code_key = re.sub(r'\s+', '', code)
                    if code_key in seen_codes:
                        continue
                    seen_codes.add(code_key)
                    
                    # Extract variant/size from props
                    variant_match = re.search(r'variant=["\']([^"\']+)["\']', code)
                    size_match = re.search(r'size=["\']([^"\']+)["\']', code)
                    
                    if variant_match:
                        variant_name = variant_match.group(1).capitalize()
                        if size_match:
                            variant_name += f" {size_match.group(1).upper()}"
                        display_name = variant_name
                    elif size_match:
                        display_name = size_match.group(1).upper()
                    else:
                        display_name = story_name
                    
                    examples.append({
                        "name": display_name,
                        "code": code
                    })
            elif len(component_matches) == 1:
                # Single component
                code = component_matches[0].group(0).strip() if hasattr(component_matches[0], 'group') else str(component_matches[0]).strip()
                code = re.sub(r'\s+', ' ', code)
                code = code.replace(' >', '>').replace('> ', '>')
                
                # Validate code has balanced brackets/braces/parens
                if code.count('{') != code.count('}') or code.count('[') != code.count(']') or code.count('(') != code.count(')'):
                    # Skip incomplete code examples
                    pass
                else:
                    code_key = re.sub(r'\s+', '', code)
                    if code_key not in seen_codes:
                        seen_codes.add(code_key)
                        
                        story_display_name = re.sub(r'([A-Z])', r' \1', story_name).strip()
                        if not story_display_name:
                            story_display_name = story_name
                        
                        examples.append({
                            "name": story_display_name,
                            "code": code
                        })
            else:
                # No component found, try to extract container div
                div_match = re.search(r'<div[^>]*className[^>]*>.*?</div>', render_content, re.DOTALL)
                if div_match:
                    code = div_match.group(0)
                    code = re.sub(r'\s+', ' ', code)
                    code = code.replace(' >', '>').replace('> ', '>')
                    
                    code_key = re.sub(r'\s+', '', code)
                    if code_key not in seen_codes:
                        seen_codes.add(code_key)
                        
                        story_display_name = re.sub(r'([A-Z])', r' \1', story_name).strip()
                        if not story_display_name:
                            story_display_name = story_name
                        
                        examples.append({
                            "name": story_display_name,
                            "code": code
                        })
    
    # Filter out examples with syntax errors (unmatched brackets/braces/parens)
    valid_examples = []
    for ex in examples:
        code = ex['code']
        # Check for balanced brackets/braces/parens
        if (code.count('{') == code.count('}') and 
            code.count('[') == code.count(']') and 
            code.count('(') == code.count(')')):
            valid_examples.append(ex)
        else:
            # Skip invalid examples to avoid syntax errors
            pass
    
    # If no valid examples found, add a basic one
    if not valid_examples:
        valid_examples.append({
            "name": "Basic",
            "code": f'<{component_name} />'
        })
    
    # Return ALL valid examples, sorted by name
    # Prioritize common variants first
    priority_order = ['Default', 'Basic', 'Primary', 'Secondary', 'Small', 'Medium', 'Large']
    valid_examples.sort(key=lambda x: (
        0 if x['name'] in priority_order else 1,
        priority_order.index(x['name']) if x['name'] in priority_order else 999,
        x['name']
    ))
    return valid_examples

def process_storybook_file(file_path: Path) -> Dict[str, Any]:
    """Process a single Storybook file and extract component info"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        component_name = extract_component_name_from_path(str(file_path))
        description = extract_description_from_story(content)
        props = extract_props_from_story(content)
        examples = extract_examples_from_story(content, component_name)
        
        # Extract variant types from component file to ensure completeness
        variant_types = extract_variant_types_from_component(file_path, component_name)
        
        # If we have variant types but few examples, try to generate examples for missing variants
        if variant_types and len(examples) < len(variant_types):
            existing_variants = set()
            for ex in examples:
                variant_match = re.search(r'variant=["\']([^"\']+)["\']', ex['code'])
                if variant_match:
                    existing_variants.add(variant_match.group(1))
            
            # Generate examples for missing variants
            for variant in variant_types:
                if variant not in existing_variants and not variant.startswith('size-'):
                    # Create a basic example for this variant
                    code = f'<{component_name} variant="{variant}" />'
                    code_key = re.sub(r'\s+', '', code)
                    if code_key not in [re.sub(r'\s+', '', ex['code']) for ex in examples]:
                        examples.append({
                            "name": variant.capitalize(),
                            "code": code
                        })
        
        # Add className prop if not present
        if "className" not in props:
            props["className"] = {
                "type": "string",
                "required": False,
                "description": "Additional CSS classes"
            }
        
        return {
            "description": description,
            "import": f"import {{ {component_name} }} from '@chetanft/design_system';",
            "props": props,
            "examples": examples
        }
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return None

def get_exported_components(base_dir: Path) -> set:
    """Get list of exported components from index.ts"""
    index_file = base_dir / "src" / "components" / "index.ts"
    exported = set()
    
    # Components to skip (utilities, types, legacy exports)
    skip_components = {
        'cn', 'ThemeProvider', 'useTheme', 'ThemeSwitch',
        'Theme', 'ThemeContextType', 'ThemeProviderProps', 'ThemeSwitchProps',
        'templates', 'Templates'
    }
    
    if index_file.exists():
        try:
            with open(index_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract component names from export statements
            # Match: export * from './atoms/Button/Button';
            pattern = r"export\s+\*\s+from\s+['\"].*/([^/'\"]+)['\"]"
            matches = re.findall(pattern, content)
            for match in matches:
                # Skip if it's a folder name that's not a component
                if match.lower() in skip_components:
                    continue
                
                # Capitalize first letter
                component_name = match[0].upper() + match[1:] if len(match) > 1 else match.upper()
                
                # Skip legacy exports
                if 'Legacy' in component_name or 'as' in component_name.lower():
                    continue
                
                exported.add(component_name)
            
            # Also match: export { Component } from './path';
            # But skip legacy exports like: export { Button as ButtonLegacy }
            pattern2 = r"export\s+\{\s*([^}]+)\s*\}\s+from"
            matches2 = re.findall(pattern2, content)
            for match in matches2:
                # Skip if contains 'as' (legacy exports)
                if ' as ' in match:
                    continue
                
                # Split by comma and clean
                for comp in match.split(','):
                    comp = comp.strip()
                    if comp and not comp.startswith('type ') and comp not in skip_components:
                        # Skip if it's a type export
                        if 'type' in comp.lower() and 'type ' in comp:
                            continue
                        exported.add(comp)
        except Exception as e:
            print(f"Warning: Could not parse index.ts: {e}")
    
    return exported

def create_basic_component_doc(component_name: str, base_dir: Path) -> Dict[str, Any]:
    """Create basic documentation for a component without a story file"""
    # Try to find the component file to extract basic info
    possible_paths = [
        base_dir / "src" / "components" / "atoms" / component_name / f"{component_name}.tsx",
        base_dir / "src" / "components" / "molecules" / component_name / f"{component_name}.tsx",
        base_dir / "src" / "components" / "organisms" / component_name / f"{component_name}.tsx",
        base_dir / "src" / "components" / "atoms" / component_name / f"{component_name}.ts",
        base_dir / "src" / "components" / "molecules" / component_name / f"{component_name}.ts",
        base_dir / "src" / "components" / "organisms" / component_name / f"{component_name}.ts",
    ]
    
    props = {}
    description = f"{component_name} component"
    
    for tsx_path in possible_paths:
        if tsx_path.exists():
            try:
                with open(tsx_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Extract interface/props
                interface_pattern = rf'export\s+interface\s+{component_name}Props[^{{]*\{{([^}}]+(?:\{{[^}}]*\}}[^}}]*)*)\}}'
                match = re.search(interface_pattern, content, re.DOTALL)
                if match:
                    interface_content = match.group(1)
                    # Extract prop definitions
                    prop_pattern = r'(\w+)\??:\s*([^;]+);'
                    for prop_match in re.finditer(prop_pattern, interface_content):
                        prop_name = prop_match.group(1)
                        prop_type = prop_match.group(2).strip()
                        props[prop_name] = {
                            "type": prop_type,
                            "required": '?' not in prop_match.group(0),
                            "description": ""
                        }
                
                # Extract JSDoc description if available
                desc_match = re.search(r'/\*\*([^*]+)\*/', content, re.DOTALL)
                if desc_match:
                    description = desc_match.group(1).strip()
            except Exception:
                pass
            break
    
    # Always add className
    if "className" not in props:
        props["className"] = {
            "type": "string",
            "required": False,
            "description": "Additional CSS classes"
        }
    
    return {
        "description": description,
        "import": f"import {{ {component_name} }} from '@chetanft/design_system';",
        "props": props,
        "examples": [{
            "name": "Basic",
            "code": f"<{component_name} />"
        }]
    }

def main():
    """Main function to extract all components"""
    base_dir = Path(__file__).parent.parent
    stories_dir = base_dir / "src"
    
    # Get exported components
    exported_components = get_exported_components(base_dir)
    
    # Find all storybook files
    story_files = list(stories_dir.rglob("*.stories.tsx"))
    
    components = {}
    processed_from_stories = set()
    
    # Components/stories to skip (patterns, docs, not actual components)
    skip_stories = {
        'DesignGuidelines', 'EnhancedFormComponents', 'UploadFlow', 
        'BaseColors', 'TwoToneIcons', 'TableAtomic', 'ListingLayout'
    }
    
    for story_file in story_files:
        # Skip prompt stories
        if 'prompts' in str(story_file):
            continue
        
        component_info = process_storybook_file(story_file)
        if component_info:
            component_name = extract_component_name_from_path(str(story_file))
            
            # Skip non-component stories
            if component_name in skip_stories:
                continue
            
            components[component_name] = component_info
            processed_from_stories.add(component_name)
    
    # Add components that are exported but don't have story files
    skip_names = {'cn', 'ThemeProvider', 'useTheme', 'ThemeSwitch', 'Templates', 'templates'}
    for component_name in exported_components:
        if component_name not in processed_from_stories:
            # Skip non-component exports and legacy
            if component_name in skip_names or 'Legacy' in component_name or ' as ' in component_name:
                continue
            
            basic_doc = create_basic_component_doc(component_name, base_dir)
            if basic_doc:
                components[component_name] = basic_doc
                print(f"Created basic doc for {component_name} (no story file)")
    
    # Load existing components.json to preserve manual edits for specific components
    components_json_path = base_dir / "ft-docs" / "src" / "data" / "components.json"
    manual_overrides = {}  # Components that should keep their manual examples
    if components_json_path.exists():
        with open(components_json_path, 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
            existing_components = existing_data.get("designSystem", {}).get("components", {})
            
            # Components with manually curated examples (Button, Badge, Input, tokens)
            manual_components = ['Button', 'Badge', 'Input', 'Colors', 'ColorSystem', 'ThemeSystem', 'DesignTokens']
            
            for name, info in existing_components.items():
                if name in components:
                    # Merge props (existing takes precedence)
                    for prop_name, prop_info in info.get("props", {}).items():
                        if prop_info.get("description") or prop_info.get("default") is not None:
                            components[name]["props"][prop_name] = prop_info
                    
                    # Keep manual examples for specific components
                    if name in manual_components and info.get("examples"):
                        components[name]["examples"] = info["examples"]
                        manual_overrides[name] = True
                    
                    # Use existing description if it's better
                    if info.get("description") and len(info["description"]) > len(components[name]["description"]):
                        components[name]["description"] = info["description"]
    
    # Create final structure
    output = {
        "designSystem": {
            "components": components
        }
    }
    
    # Write to file
    with open(components_json_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"Extracted {len(components)} components")
    print(f"Components: {', '.join(sorted(components.keys()))}")
    
    # Update docs config to include all components
    update_docs_config(components, base_dir)

def update_docs_config(components: Dict[str, Any], base_dir: Path):
    """Update docs.ts config file to include all extracted components"""
    docs_config_path = base_dir / "ft-docs" / "src" / "config" / "docs.ts"
    
    # Component categories based on their location/type
    atoms = ['Avatar', 'Badge', 'Button', 'Checkbox', 'Colors', 'Divider', 'Icon', 
             'Illustration', 'Input', 'Label', 'Logos', 'RadioGroup', 'ReadOnly', 
             'Spacer', 'Statistic', 'SubText', 'Switch', 'Text', 'Typography']
    
    molecules = ['ButtonGroup', 'Chicklet', 'DatePicker', 'Dropdown', 'FileValidationCard',
                 'ProgressBar', 'ProgressList', 'RadioSelector', 'SegmentedTabs', 
                 'SimpleColumnLayout', 'StackedBarChart', 'Steps', 'Tooltip', 
                 'UploadButton', 'UploadItem', 'UploadThumbnail']
    
    organisms = ['AppHeader', 'Card', 'Collapsible', 'FileCard', 'FileThumbnail', 
                 'FileTypeIcon', 'Footer', 'NavigationLauncher', 'NavigationPopover',
                 'QuickFilters', 'Table', 'Tabs', 'Upload', 'UploadZone', 
                 'UserProfile', 'UserProfileDropdown']
    
    design_system = ['Colors', 'ColorSystem', 'ThemeSystem', 'DesignTokens']
    
    # Categorize components
    atoms_list = [c for c in sorted(components.keys()) if c in atoms]
    molecules_list = [c for c in sorted(components.keys()) if c in molecules]
    organisms_list = [c for c in sorted(components.keys()) if c in organisms]
    design_system_list = [c for c in sorted(components.keys()) if c in design_system]
    
    def to_kebab_case(name: str) -> str:
        """Convert PascalCase to kebab-case"""
        return re.sub(r'([a-z])([A-Z])', r'\1-\2', name).lower()
    
    def generate_sidebar_items(component_list: List[str]) -> str:
        """Generate sidebar items for a category"""
        items = []
        for comp in component_list:
            kebab = to_kebab_case(comp)
            items.append(f'        {{\n          title: "{comp}",\n          href: "/docs/components/{kebab}",\n          items: [],\n        }}')
        return ',\n'.join(items)
    
    config_content = f'''import {{ MainNavItem, SidebarNavItem }} from "@/types/nav"

interface DocsConfig {{
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}}

export const docsConfig: DocsConfig = {{
  mainNav: [
    {{
      title: "Documentation",
      href: "/docs",
    }},
    {{
      title: "Components",
      href: "/docs/components/button",
    }},
    {{
      title: "GitHub",
      href: "https://github.com/chetanft/components",
      external: true,
    }},
  ],
  sidebarNav: [
    {{
      title: "Getting Started",
      items: [
        {{
          title: "Introduction",
          href: "/docs",
          items: [],
        }},
      ],
    }},
    {{
      title: "Atoms",
      items: [
{generate_sidebar_items(atoms_list)}
      ],
    }},
    {{
      title: "Molecules",
      items: [
{generate_sidebar_items(molecules_list)}
      ],
    }},
    {{
      title: "Organisms",
      items: [
{generate_sidebar_items(organisms_list)}
      ],
    }},
    {{
      title: "Design System",
      items: [
{generate_sidebar_items(design_system_list)}
      ],
    }},
  ],
}}
'''
    
    with open(docs_config_path, 'w', encoding='utf-8') as f:
        f.write(config_content)
    
    print(f"Updated docs config with {len(atoms_list)} atoms, {len(molecules_list)} molecules, {len(organisms_list)} organisms, {len(design_system_list)} design system items")

if __name__ == "__main__":
    main()

