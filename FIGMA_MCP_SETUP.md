# Framelink Figma MCP Setup Guide

## Overview
This project now uses the **Framelink Figma MCP** server from [GLips/Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP) which provides superior Figma integration for Cursor and other AI coding tools.

## Features
- ✅ Direct Figma API access
- ✅ Simplified design data for AI models
- ✅ Support for Figma files, frames, and groups
- ✅ Optimized for Cursor agent mode
- ✅ Better accuracy than screenshot-based approaches

## Setup Instructions

### 1. Get Your Figma API Key
1. Go to [Figma Developer Settings](https://www.figma.com/developers/api#authentication)
2. Generate a new Personal Access Token
3. Copy the token (it will look like `figd_...`)

### 2. Configure the API Key
Update the `mcp.json` file with your actual Figma API key:

```json
{
  "mcpServers": {
    "Framelink Figma MCP": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "figd_your_actual_api_key_here"
      }
    }
  }
}
```

### 3. Restart Cursor
After updating the configuration, restart Cursor to load the new MCP server.

## Usage in Cursor

### Basic Usage
1. Open Cursor's agent mode (Cmd/Ctrl + I)
2. Paste a Figma link: `https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2661-91`
3. Ask Cursor to implement the design: "Implement this Figma design as a React component"

### Available MCP Tools
The Framelink MCP provides these tools:
- `get_figma_data` - Fetch layout and styling information
- `download_figma_images` - Download images from Figma designs

### Example Prompts
- "Create a React component based on this Figma design: [paste Figma URL]"
- "Update the company logos to match this Figma specification: [paste Figma URL]"
- "Generate TypeScript interfaces from this Figma component: [paste Figma URL]"

## Project Integration

### Current Figma File
- **File Key**: `HMS1wPnsS1fuPyN1xSEVAH`
- **Main URL**: https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components

### Company Logos Node
- **Node ID**: `2661-91`
- **Direct URL**: https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2661-91

### Existing Integration
This project already has:
- ✅ Figma Code Connect (`@figma/code-connect@1.3.3`)
- ✅ Company logo system with 6+ brands
- ✅ Dynamic color schemes per company
- ✅ TypeScript interfaces for company branding

## Troubleshooting

### MCP Not Working
1. Check that your Figma API key is valid
2. Ensure Cursor is restarted after configuration changes
3. Verify the MCP server is running: `npx figma-developer-mcp --help`

### API Key Issues
- Make sure the API key starts with `figd_`
- Check that the token has proper permissions in Figma
- Try generating a new token if issues persist

### Network Issues
- Ensure you have internet connectivity
- Check if corporate firewalls are blocking npm/npx

## Benefits Over Previous Setup

| Feature | TalkToFigma MCP | Framelink MCP |
|---------|-----------------|---------------|
| **Reliability** | ❌ Required socket server | ✅ Direct API access |
| **Setup** | ❌ Complex socket setup | ✅ Simple API key |
| **Documentation** | ❌ Limited docs | ✅ Comprehensive docs |
| **Cursor Integration** | ❌ Generic MCP | ✅ Cursor-optimized |
| **Data Quality** | ❌ Raw Figma data | ✅ Simplified for AI |
| **Community** | ❌ Smaller community | ✅ 8k+ GitHub stars |

## Next Steps
1. Replace `YOUR_FIGMA_API_KEY_HERE` with your actual API key
2. Restart Cursor
3. Test with a Figma URL in agent mode
4. Start implementing designs with AI assistance!

## Links
- [Framelink GitHub](https://github.com/GLips/Figma-Context-MCP)
- [Framelink Website](https://framelink.ai/)
- [Figma API Documentation](https://www.figma.com/developers/api) 