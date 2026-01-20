# Official Figma MCP Server Setup Guide

## Overview
This project now uses the **Official Figma MCP Server** from [Figma's Developer Documentation](https://developers.figma.com/docs/figma-mcp-server/) which provides native Figma integration for Cursor and other AI coding tools.

## Updated Setup (December 2024)
We've upgraded to Figma's official MCP server which provides better performance, reliability, and direct integration with Figma's API.

## Features
- ✅ **Generate code from selected frames** - Turn Figma designs into React components
- ✅ **Extract design context** - Pull variables, components, and layout data directly
- ✅ **Retrieve Make resources** - Gather code resources from Make files
- ✅ **Design system consistency** - Keep generated code aligned with existing components
- ✅ **Real-time integration** - Direct connection to Figma's hosted endpoint
- ✅ **No desktop app required** - Works entirely through the cloud

## Current Configuration

The official Figma MCP server is configured as a **remote server** connecting directly to Figma's hosted endpoint:

```json
{
  "mcpServers": {
    "Official Figma MCP": {
      "type": "http",
      "url": "https://figma-mcp.figma.com",
      "env": {
        "FIGMA_ACCESS_TOKEN": "${FIGMA_ACCESS_TOKEN}"
      }
    }
  }
}
```

**⚠️ SECURITY NOTE**: Never commit your Figma API token to version control. Use environment variables instead:
- Set `FIGMA_ACCESS_TOKEN` in your environment or Cursor's settings
- The token should start with `figd_` and be kept private

### Next Steps: Restart Cursor
After updating the configuration, **restart Cursor** to load the official Figma MCP server.

## Usage with Official Figma MCP

### Enhanced Capabilities
With the official Figma MCP server, you can now:

1. **Generate React components directly from Figma frames**
   - Select any frame in Figma
   - Paste the Figma URL in Cursor
   - Ask: "Generate a React component from this Figma frame"

2. **Extract design tokens and variables**
   - Pull colors, typography, spacing directly from Figma
   - Ask: "Extract the design tokens from this Figma file"

3. **Maintain design system consistency**
   - Generate code that matches your existing components
   - Ask: "Create this component using our existing design system patterns"

### Available MCP Tools
The official Figma MCP provides:
- **Frame-to-code generation** - Convert Figma frames to React components
- **Design token extraction** - Pull variables and styles
- **Component analysis** - Understand Figma component structure
- **Make resource integration** - Access prototype code

### Example Workflow
```
1. Design in Figma → 2. Copy Figma URL → 3. Paste in Cursor → 4. Generate React component
```

Instead of manually recreating designs, the MCP server will:
- ✅ Extract exact measurements and spacing
- ✅ Pull colors and typography automatically  
- ✅ Generate clean, production-ready React code
- ✅ Use your existing Icon and component libraries

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
1. **Set your Figma API token as an environment variable** (never commit it to git):
   - In Cursor: Settings → Features → Model Context Protocol → Environment Variables
   - Add `FIGMA_ACCESS_TOKEN` with your token value
   - Or set it in your shell: `export FIGMA_ACCESS_TOKEN=figd_your_token_here`
2. Restart Cursor
3. Test with a Figma URL in agent mode
4. Start implementing designs with AI assistance!

## Security Best Practices
- ✅ **DO**: Store tokens in environment variables
- ✅ **DO**: Use `.env` files (and add them to `.gitignore`)
- ✅ **DO**: Revoke and regenerate tokens if exposed
- ❌ **DON'T**: Commit tokens to version control
- ❌ **DON'T**: Share tokens in documentation or screenshots

## Links
- [Framelink GitHub](https://github.com/GLips/Figma-Context-MCP)
- [Framelink Website](https://framelink.ai/)
- [Figma API Documentation](https://www.figma.com/developers/api) 