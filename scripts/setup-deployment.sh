#!/bin/bash

# Setup script for Netlify deployment
echo "🚀 Design System Deployment Setup"
echo "================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote is set
REMOTE=$(git remote get-url origin 2>/dev/null)
if [ $? -ne 0 ]; then
    echo ""
    echo "🔗 GitHub Repository Setup"
    echo "Please create a new repository on GitHub and provide the URL:"
    read -p "Enter your GitHub repository URL: " REPO_URL
    
    if [ -n "$REPO_URL" ]; then
        git remote add origin "$REPO_URL"
        echo "✅ Remote added: $REPO_URL"
    else
        echo "⚠️  Skipping remote setup. You can add it later with:"
        echo "   git remote add origin YOUR_REPO_URL"
    fi
else
    echo "✅ Remote already configured: $REMOTE"
fi

# Check if files are staged
echo ""
echo "📦 Staging files for commit..."
git add .

# Check for changes
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    echo "📝 Committing changes..."
    git commit -m "Add Netlify deployment configuration

- Add netlify.toml for build configuration
- Add GitHub Actions workflow for CI/CD
- Add comprehensive .gitignore
- Add deployment guides and documentation"
    echo "✅ Changes committed"
fi

# Push to GitHub if remote is set
REMOTE=$(git remote get-url origin 2>/dev/null)
if [ $? -eq 0 ]; then
    echo ""
    echo "⬆️  Pushing to GitHub..."
    
    # Get current branch
    BRANCH=$(git branch --show-current)
    
    # Push with upstream
    if git push -u origin "$BRANCH" 2>/dev/null; then
        echo "✅ Pushed to GitHub successfully"
    else
        echo "⚠️  Push failed. You may need to:"
        echo "   1. Check your GitHub credentials"
        echo "   2. Ensure the repository exists"
        echo "   3. Run: git push -u origin $BRANCH"
    fi
fi

echo ""
echo "🎯 Next Steps:"
echo "============="
echo ""
echo "1. 🌐 Go to https://netlify.com and sign in"
echo "2. 📁 Click 'Add new site' → 'Import an existing project'"
echo "3. 🔗 Connect to GitHub and select your repository"
echo "4. ⚙️  Configure build settings:"
echo "   • Build command: npm run build-storybook"
echo "   • Publish directory: storybook-static"
echo "5. 🚀 Deploy!"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo ""
echo "🔑 For GitHub Actions (optional):"
echo "   1. Get Netlify Auth Token from User Settings → Applications"
echo "   2. Get Site ID from Site Settings → General"
echo "   3. Add both as GitHub repository secrets"
echo ""
echo "✨ Your Storybook will be live and auto-updating!" 