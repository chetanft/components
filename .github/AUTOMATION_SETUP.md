# Automation Setup

This repository is configured with automated workflows for Storybook deployment and npm publishing.

## Workflows

### 1. Storybook Deployment to GitHub Pages

**File**: `.github/workflows/deploy-storybook.yml`

**Triggers**:
- Automatically on every push to `main` branch
- Manual trigger via GitHub Actions UI

**What it does**:
- Builds Storybook static files
- Deploys to GitHub Pages
- Accessible at: `https://chetanft.github.io/components/`

**Setup Required**:
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will automatically deploy on next push to main

### 2. npm Package Publishing

**File**: `.github/workflows/publish-npm.yml`

**Triggers**:
- Automatically when a version tag is pushed (e.g., `v1.2.3`)

**What it does**:
- Runs type checking
- Builds the package
- Publishes to npm registry

**Setup Required**:
1. Create an npm access token:
   - Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Create a new "Automation" token
   - Copy the token

2. Add the token to GitHub Secrets:
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm access token
   - Click "Add secret"

**How to publish**:
```bash
# Create and push a version tag
git tag v4.11.0
git push origin v4.11.0

# The workflow will automatically publish to npm
```

## Single Source of Truth

All components are maintained in this repository:
- **Source**: `src/components/`
- **Storybook**: Automatically deployed to GitHub Pages
- **npm Package**: Automatically published on version tags

When you update components in `src/components/`, both Storybook and the npm package will reflect those changes automatically.

