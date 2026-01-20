# Security Incident Response: Exposed Figma API Token

## Incident Summary
A Figma API token was exposed in the repository at commit `e258f48c0917511a3df42d51576d87ad3fb3ac71` in the file `FIGMA_MCP_SETUP.md`.

**Exposed Token**: `figd_XOy4gRvyyNg91Cfz2Xrc11pqKQqizAFz41XT0NjL`

## Immediate Actions Taken ✅

1. ✅ Removed token from current version of `FIGMA_MCP_SETUP.md`
2. ✅ Replaced with environment variable placeholder
3. ✅ Added security best practices to documentation
4. ✅ Created `.env.local.example` template
5. ✅ Updated `mcp.json` to use environment variables
6. ✅ Verified `.gitignore` excludes `.env` files

## Required Actions

### 1. Revoke Exposed Token (URGENT)
**Status**: ⚠️ **ACTION REQUIRED**

1. Go to [Figma Settings → Personal Access Tokens](https://www.figma.com/settings)
2. Find and revoke token: `figd_XOy4gRvyyNg91Cfz2Xrc11pqKQqizAFz41XT0NjL`
3. Generate a new token if needed

### 2. Set Up Environment Variables
**Status**: ⚠️ **ACTION REQUIRED**

#### Option A: Using .env.local (Recommended)
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your new token
# The file is already in .gitignore, so it won't be committed
```

#### Option B: Cursor Settings
1. Open Cursor Settings
2. Go to Features → Model Context Protocol → Environment Variables
3. Add:
   - Key: `FIGMA_ACCESS_TOKEN`
   - Value: `figd_your_new_token_here`

#### Option C: Shell Environment
```bash
# Add to your ~/.zshrc or ~/.bashrc
export FIGMA_ACCESS_TOKEN=figd_your_new_token_here
```

### 3. Clean Git History (Optional but Recommended)
**Status**: ⚠️ **OPTIONAL**

The token is still visible in Git history. To remove it:

#### Quick Method (if using git-filter-repo):
```bash
# Install git-filter-repo if needed
pip install git-filter-repo

# Run the cleanup script
chmod +x scripts/cleanup-exposed-token.sh
./scripts/cleanup-exposed-token.sh
```

#### Manual Method:
```bash
# Remove file from all commits
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch FIGMA_MCP_SETUP.md" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: rewrites history)
git push --force --all
git push --force --tags
```

**⚠️ Warning**: Rewriting Git history will:
- Change all commit hashes after the token was added
- Require all collaborators to re-clone the repository
- Break any forks or branches that reference old commits

### 4. Verify No Other Exposures
**Status**: ✅ **COMPLETED**

- ✅ Scanned codebase for other exposed tokens
- ✅ Verified no other files contain the token
- ✅ Checked configuration files use placeholders

## Prevention Measures

### ✅ Implemented
- Environment variable templates (`.env.local.example`)
- Updated documentation with security warnings
- `.gitignore` already excludes `.env` files
- Configuration files use environment variable placeholders

### 📋 Best Practices Going Forward
1. **Never commit tokens** to version control
2. **Always use environment variables** for sensitive data
3. **Use `.env.local.example`** as a template
4. **Review files before committing** sensitive information
5. **Use pre-commit hooks** to scan for secrets (consider tools like `git-secrets` or `truffleHog`)

## Monitoring

Consider setting up:
- GitHub secret scanning (already enabled by GitHub)
- Pre-commit hooks to detect secrets
- Regular audits of configuration files

## References
- [Figma Personal Access Tokens](https://www.figma.com/settings)
- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Git filter-branch documentation](https://git-scm.com/docs/git-filter-branch)

