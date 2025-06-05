# 🚀 Netlify Deployment Guide

This guide explains how to deploy your Storybook to Netlify automatically through GitHub.

## 📋 Prerequisites

- GitHub repository for your design system
- Netlify account (free at [netlify.com](https://netlify.com))
- Node.js 18+ locally

## 🔧 Setup Steps

### **1. Push to GitHub**

First, make sure your code is in a GitHub repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial design system with Storybook"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-design-system.git

# Push to GitHub
git push -u origin main
```

### **2. Connect Netlify to GitHub**

1. **Login to Netlify**: Go to [netlify.com](https://netlify.com) and sign in
2. **New Site**: Click "Add new site" → "Import an existing project"
3. **Connect GitHub**: Choose "Deploy with GitHub"
4. **Select Repository**: Find and select your design system repository
5. **Configure Build Settings**:
   - **Build command**: `npm run build-storybook`
   - **Publish directory**: `storybook-static`
   - **Production branch**: `main` (or `master`)

### **3. Set Up Environment Variables**

In your Netlify site dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add these variables:
   - `NODE_VERSION`: `18`
   - Any other environment variables your build needs

### **4. Configure GitHub Secrets (For GitHub Actions)**

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add repository secrets:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: Your site ID from Netlify

#### **Getting Netlify Tokens:**

**Auth Token:**
1. Netlify Dashboard → User Settings → Applications
2. **Personal access tokens** → **New access token**
3. Copy the token

**Site ID:**
1. Your site dashboard → **Site settings** → **General**
2. Copy the **Site ID** under "Site details"

## 🔄 Deployment Process

### **Automatic Deployments**

Once connected, deployments happen automatically:

- ✅ **Push to main branch** → Triggers production deployment
- ✅ **Pull requests** → Creates preview deployments with unique URLs
- ✅ **Build fails** → Netlify email notification + GitHub status check

### **Manual Deployments**

You can also deploy manually:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build and deploy
npm run build-storybook
netlify deploy --prod --dir=storybook-static
```

## 🌐 Domain Configuration

### **Custom Domain (Optional)**

1. **Netlify Dashboard** → **Domain settings**
2. **Add domain alias** → Enter your custom domain
3. **Configure DNS** at your domain provider:
   - Add CNAME record pointing to your Netlify subdomain
   - Or use Netlify DNS (recommended)

### **HTTPS**

Netlify automatically provides HTTPS certificates for all domains.

## 📊 Monitoring and Analytics

### **Build Logs**

Monitor deployments at:
- **Netlify Dashboard** → **Deploys** tab
- **GitHub Actions** → **Actions** tab (if using GitHub workflow)

### **Performance**

Netlify provides:
- ✅ Global CDN
- ✅ Automatic compression
- ✅ Image optimization
- ✅ Build caching

## 🔧 Configuration Files Explained

### **`netlify.toml`**
- Defines build commands and settings
- Configures redirects and headers
- Sets Node.js version

### **`.github/workflows/deploy-storybook.yml`**
- GitHub Actions workflow for CI/CD
- Runs tests and builds on every push
- Deploys to Netlify automatically

### **`.gitignore`**
- Excludes build artifacts from version control
- Prevents sensitive files from being committed

## 🚨 Troubleshooting

### **Build Failures**

**Common issues:**
- **Node version mismatch**: Update `NODE_VERSION` in environment variables
- **Missing dependencies**: Check `package.json` and `package-lock.json`
- **Memory issues**: Contact Netlify support for build time/memory limits

**Debug steps:**
1. Check build logs in Netlify dashboard
2. Test build locally: `npm run build-storybook`
3. Verify all dependencies are in `package.json`

### **Deployment Issues**

**Site not updating:**
- Clear browser cache
- Check if build completed successfully
- Verify correct branch is being deployed

**Preview URLs not working:**
- Check GitHub Actions logs
- Verify GitHub secrets are set correctly
- Ensure pull request targets the correct branch

## 📱 Sharing with Designers

Once deployed, your Storybook will be available at:
- **Production**: `https://your-site-name.netlify.app`
- **Custom domain**: `https://your-design-system.com`
- **PR previews**: `https://deploy-preview-[PR-number]--your-site-name.netlify.app`

### **Update Your Collaboration Guide**

Replace the placeholder URLs in `DESIGN_COLLABORATION.md` with your actual Netlify URLs.

## 🔄 Maintenance

### **Regular Updates**

- **Dependencies**: Run `npm audit` and update packages regularly
- **Storybook**: Keep Storybook version updated for security and features
- **Node.js**: Update Node version in Netlify settings as needed

### **Backup Strategy**

- ✅ GitHub acts as your primary backup
- ✅ Netlify maintains deploy history
- ✅ Consider additional backup of design assets

---

## 🎉 Success!

Once set up, you'll have:
- ✅ **Automatic deployments** on every push
- ✅ **Preview URLs** for pull requests  
- ✅ **Global CDN** for fast loading worldwide
- ✅ **HTTPS** by default
- ✅ **Zero maintenance** deployments

Your designers can now access your components at a stable, always-updated URL! 🚀 