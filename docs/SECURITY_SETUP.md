# Security Setup Guide

## Environment Variables Setup

### Figma API Token Configuration

Never commit your Figma API token to version control. Always use environment variables.

#### Step 1: Create `.env.local` file

Create a `.env.local` file in the project root (this file is already in `.gitignore`):

```bash
# Figma Personal Access Token
# Get yours from: https://www.figma.com/settings
# Token should start with "figd_"
FIGMA_ACCESS_TOKEN=figd_your_token_here

# Alternative: For Framelink MCP (if using the older setup)
FIGMA_API_KEY=figd_your_token_here
```

#### Step 2: Get Your Figma Token

1. Go to [Figma Settings → Personal Access Tokens](https://www.figma.com/settings)
2. Click "Create a new personal access token"
3. Give it a descriptive name (e.g., "Components Library MCP")
4. Copy the token (it starts with `figd_`)
5. Paste it into your `.env.local` file

#### Step 3: Configure Cursor MCP

The `mcp.json` file is already configured to use environment variables. After setting up `.env.local`:

1. Restart Cursor
2. The MCP server will automatically pick up the token from your environment

#### Alternative: Cursor Settings

If you prefer not to use `.env.local`, you can set environment variables in Cursor:

1. Open Cursor Settings
2. Go to **Features** → **Model Context Protocol** → **Environment Variables**
3. Add:
   - Key: `FIGMA_ACCESS_TOKEN`
   - Value: Your token (starts with `figd_`)

## Security Best Practices

✅ **DO:**
- Use environment variables for all API tokens
- Keep `.env.local` in `.gitignore` (already configured)
- Use descriptive token names in Figma
- Rotate tokens periodically
- Revoke tokens immediately if exposed

❌ **DON'T:**
- Commit tokens to version control
- Share tokens in documentation or screenshots
- Use the same token across multiple projects
- Leave tokens in code comments

## Verifying Your Setup

After configuration, test that the MCP server works:

1. Open a Figma file URL in Cursor
2. Ask: "Extract design tokens from this Figma file"
3. If it works, your token is configured correctly

## Troubleshooting

### Token Not Working
- Verify the token starts with `figd_`
- Check that the token hasn't expired in Figma
- Ensure Cursor has been restarted after setting environment variables
- Verify `.env.local` is in the project root (not a subdirectory)

### MCP Server Not Connecting
- Check your internet connection
- Verify the token has proper permissions in Figma
- Try regenerating the token if issues persist

