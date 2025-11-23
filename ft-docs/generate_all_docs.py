#!/usr/bin/env python3
"""
Generate comprehensive component documentation from Storybook files
"""
import os
import json
import re
from pathlib import Path

# Base paths
COMPONENTS_DIR = Path("/Users/user/Documents/components/src/components")
OUTPUT_FILE = Path("/Users/user/Documents/components/ft-docs/src/data/components.json")
DOCS_CONFIG_FILE = Path("/Users/user/Documents/components/ft-docs/src/config/docs.ts")

def find_story_files():
    """Find all .stories.tsx files"""
    story_files = []
    for root, dirs, files in os.walk(COMPONENTS_DIR):
        for file in files:
            if file.endswith('.stories.tsx'):
                story_files.append(os.path.join(root, file))
    return story_files

def extract_component_name(story_file):
    """Extract component name from story file path"""
    # e.g., /path/to/Avatar/Avatar.stories.tsx -> Avatar
    parts = Path(story_file).parts
    for i, part in enumerate(parts):
        if part in ['atoms', 'molecules', 'organisms']:
            if i + 1 < len(parts):
                return parts[i + 1]
    return None

def extract_description(content):
    """Extract component description from story file"""
    # Look for description in docs.description.component
    match = re.search(r"description:\s*{\s*component:\s*['\"]([^'\"]+)['\"]", content)
    if match:
        return match.group(1)
    
    # Fallback: look for title
    match = re.search(r"title:\s*['\"]([^'\"]+)['\"]", content)
    if match:
        title = match.group(1).split('/')[-1]
        return f"{title} component"
    
    return "Component description"

def extract_examples(content, component_name):
    """Extract example code from story file"""
    examples = []
    
    # Find all exported stories
    story_pattern = r"export const (\w+):\s*Story\s*=\s*{([^}]+)}"
    matches = re.finditer(story_pattern, content, re.DOTALL)
    
    for match in matches:
        story_name = match.group(1)
        story_content = match.group(2)
        
        # Skip if it's just "Default"
        if story_name == "Default":
            # Extract args
            args_match = re.search(r"args:\s*{([^}]+)}", story_content, re.DOTALL)
            if args_match:
                args_str = args_match.group(1).strip()
                # Convert to component props
                props = []
                for line in args_str.split(','):
                    line = line.strip()
                    if ':' in line:
                        key, value = line.split(':', 1)
                        key = key.strip()
                        value = value.strip().rstrip(',')
                        if value.startswith("'") or value.startswith('"'):
                            props.append(f'{key}={value}')
                        else:
                            props.append(f'{key}={{{value}}}')
                
                if props:
                    code = f"<{component_name} {' '.join(props)} />"
                    examples.append({"name": "Default", "code": code})
        
        # Look for render functions
        render_match = re.search(r"render:\s*\(\)\s*=>\s*\(([\s\S]+?)\),?\s*}", story_content)
        if render_match:
            render_code = render_match.group(1).strip()
            # Clean up the code
            render_code = re.sub(r'\s+', ' ', render_code)
            examples.append({"name": story_name, "code": render_code})
    
    # If no examples found, create a basic one
    if not examples:
        examples.append({"name": "Basic", "code": f"<{component_name} />"})
    
    return examples

def extract_props(content):
    """Extract prop definitions from argTypes"""
    props = {}
    
    # Find argTypes block
    argtypes_match = re.search(r"argTypes:\s*{([\s\S]+?)},?\s*}", content)
    if not argtypes_match:
        return {"className": {"type": "string", "required": False, "description": "Additional CSS classes"}}
    
    argtypes_content = argtypes_match.group(1)
    
    # Extract each prop
    prop_pattern = r"(\w+):\s*{([^}]+)}"
    for match in re.finditer(prop_pattern, argtypes_content):
        prop_name = match.group(1)
        prop_content = match.group(2)
        
        # Extract description
        desc_match = re.search(r"description:\s*['\"]([^'\"]+)['\"]", prop_content)
        description = desc_match.group(1) if desc_match else ""
        
        # Extract type from options or control
        type_str = "any"
        options_match = re.search(r"options:\s*\[([^\]]+)\]", prop_content)
        if options_match:
            options = options_match.group(1).strip()
            type_str = f"union of {options}"
        else:
            control_match = re.search(r"control:\s*{\s*type:\s*['\"](\w+)['\"]", prop_content)
            if control_match:
                type_str = control_match.group(1)
        
        # Check if required
        required = "required" in prop_content.lower()
        
        props[prop_name] = {
            "type": type_str,
            "required": required,
            "description": description
        }
    
    # Always add className
    if "className" not in props:
        props["className"] = {
            "type": "string",
            "required": False,
            "description": "Additional CSS classes"
        }
    
    return props

def generate_components_json():
    """Generate components.json from all story files"""
    story_files = find_story_files()
    components = {}
    
    for story_file in story_files:
        component_name = extract_component_name(story_file)
        if not component_name:
            continue
        
        # Skip non-component exports
        if component_name in ['Logos', 'Colors', 'Illustration', 'Icons', 'Typography', 'templates']:
            continue
        
        with open(story_file, 'r') as f:
            content = f.read()
        
        description = extract_description(content)
        examples = extract_examples(content, component_name)
        props = extract_props(content)
        
        components[component_name] = {
            "description": description,
            "import": f"import {{ {component_name} }} from '@chetanft/design_system';",
            "props": props,
            "examples": examples
        }
    
    # Create output structure
    output = {
        "designSystem": {
            "components": components
        }
    }
    
    # Write to file
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"Generated documentation for {len(components)} components")
    return components

def generate_docs_config(components):
    """Generate docs.ts config file"""
    # Sort components alphabetically
    sorted_components = sorted(components.keys())
    
    # Generate sidebar items
    sidebar_items = []
    for component in sorted_components:
        # Convert to kebab-case for URL
        kebab_name = re.sub(r'([a-z])([A-Z])', r'\1-\2', component).lower()
        sidebar_items.append('        {{\n          title: "{}",\n          href: "/docs/components/{}",\n          items: [],\n        }}'.format(component, kebab_name))
    
    config_content = '''import {{ MainNavItem, SidebarNavItem }} from "@/types/nav"

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
      title: "Components",
      items: [
{}
      ],
    }},
  ],
}}
'''.format(',\n'.join(sidebar_items))
    
    with open(DOCS_CONFIG_FILE, 'w') as f:
        f.write(config_content)
    
    print(f"Generated docs config with {len(sorted_components)} components")

if __name__ == "__main__":
    print("Generating component documentation...")
    components = generate_components_json()
    generate_docs_config(components)
    print("Done!")
