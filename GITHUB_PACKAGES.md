# GitHub Packages Setup

This design system is published to GitHub Packages for easy distribution and installation.

## 📦 Installation

### 1. Configure npm to use GitHub Packages

Create or update your `.npmrc` file in your project root:

```bash
@chetanft:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### 2. Generate a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Select scopes: `read:packages`, `write:packages` (if you need to publish)
4. Copy the generated token

### 3. Install the package

```bash
npm install ft-design-system
```

## 🚀 Usage

```jsx
import { Button, AppHeader, UserProfile } from 'ft-design-system';

function App() {
  return (
    <div>
      <AppHeader 
        user={{
          name: 'John Doe',
          role: 'Manager',
          location: 'Mumbai',
          badge: 'Admin'
        }}
      />
      <Button variant="primary">Click me</Button>
    </div>
  );
}
```

## 🔄 Publishing Updates

### Manual Publishing (Recommended)

1. Go to the GitHub repository
2. Navigate to Actions tab
3. Select "Manual Publish to GitHub Packages"
4. Click "Run workflow"
5. Optionally specify a new version number
6. Click "Run workflow"

### Automatic Publishing

Push a git tag to trigger automatic publishing:

```bash
# Bump version and create tag
npm version patch  # or minor, major
git push origin main --tags
```

## 📋 Available Components

- **AppHeader** - Application header with user profile
- **Button** - Interactive buttons with multiple variants
- **UserProfile** - User profile dropdown component
- **Footer** - Footer component with multiple layouts
- **Badge** - Status and label badges
- **Checkbox** - Form checkboxes
- **Input** - Form input fields
- **Switch** - Toggle switches
- **Tabs** - Tab navigation
- **Table** - Data tables
- And more...

## 🎨 Storybook Documentation

View the interactive component documentation:
- [Storybook Link] (Add your deployed Storybook URL here)

## 🔧 Development

```bash
# Clone the repository
git clone https://github.com/chetanft/components.git

# Install dependencies
npm install

# Start development
npm run dev

# Run Storybook
npm run storybook

# Build package
npm run build
```

## 📝 License

MIT License - see LICENSE file for details. 