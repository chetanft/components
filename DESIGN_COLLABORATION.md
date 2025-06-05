# 🎨 Design System Collaboration Guide

This guide helps designers access and interact with our live component library in Storybook.

## 🚀 Quick Access Links

### **Live Storybook** 
*Ask your developer for the current URL - it will look like:*
- `http://localhost:8080` (local development)
- `https://your-design-system.netlify.app` (deployed version)

---

## 📱 How to Use Storybook

### **1. Navigation**
- **Sidebar**: Browse components by category (Button, Input, Collapsible, etc.)
- **Canvas Tab**: Interactive component playground
- **Docs Tab**: Detailed documentation and design specs
- **Controls Panel**: Modify component properties in real-time

### **2. Interactive Features**
- ✨ **Play with Props**: Use the Controls panel to change colors, sizes, text, states
- 🎮 **Test Interactions**: Click buttons, toggle switches, expand collapsibles
- 📱 **Responsive Testing**: Resize viewport to test mobile/tablet/desktop
- 🎨 **Visual Variants**: See all component states and variations

### **3. Design Specifications**
Each component includes:
- **Exact measurements** (padding, margins, button sizes)
- **Color values** and variants
- **Typography** specifications
- **Spacing** guidelines
- **State variations** (hover, focus, disabled)

---

## 🔍 Component Highlights

### **Collapsible Component**
- **Button**: Perfect 40×40px squares with 8px border radius
- **Backgrounds**: Gray (#F8F8F9) for primary, White for secondary sections
- **Spacing**: 20px gaps between elements, 32px in expanded layout
- **States**: Smooth open/close animations
- **Badges**: Dynamic counters for loads, invoices, materials

### **Interactive Testing**
1. Navigate to **Components → Collapsible**
2. Try different **Background** options (gray/white)
3. Toggle **Stage** (default/submitted) to see badges
4. Click the **expand button** to test interactions
5. Use **Custom Badges** story for specific counts

---

## 💻 For Developers to Share

### **Option 1: Quick Local Sharing**
```bash
npm run share-storybook
```
*This builds and starts a local server with network access*

### **Option 2: Deploy to Cloud**
```bash
# Build static files
npm run build-storybook

# Deploy options:
# 1. Drag 'storybook-static' folder to netlify.com/drop
# 2. Upload to Vercel: npx vercel storybook-static
# 3. GitHub Pages: Push to repo and enable Pages
```

### **Option 3: Design System Platform (Chromatic)**
```bash
# One-time setup
npx chromatic --project-token=YOUR_TOKEN

# Automatic updates on every commit
```

---

## 🎯 Design Feedback Workflow

### **For Design Reviews**
1. **Browse Components**: Navigate through all available components
2. **Test Interactions**: Click, hover, type to test behavior
3. **Check Responsive**: Resize viewport for different screen sizes
4. **Verify Spacing**: Compare with Figma designs using exact measurements
5. **Document Issues**: Note specific component, variant, and browser

### **Feedback Format**
```
Component: Collapsible
Variant: BGGrayStateOpen
Issue: Button padding doesn't match Figma (should be 0px, currently 8px)
Browser: Chrome on macOS
```

---

## 🛠️ Troubleshooting

### **Can't Access Storybook?**
- ✅ Check if developer shared correct URL
- ✅ Ensure you're on same WiFi network (for local sharing)
- ✅ Try different browser (Chrome, Safari, Firefox)
- ✅ Clear browser cache

### **Components Not Loading?**
- ✅ Refresh the page
- ✅ Check internet connection
- ✅ Ask developer to rebuild: `npm run build-storybook`

### **Controls Not Working?**
- ✅ Make sure you're on **Canvas** tab (not Docs)
- ✅ Look for **Controls** panel at bottom of screen
- ✅ Some props might be read-only for certain stories

---

## 📚 Additional Resources

- **Figma Design**: [Components Library](https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components)
- **Component Specs**: See individual Docs pages in Storybook
- **Design Tokens**: Check Colors and Typography stories for system values

---

## 🤝 Team Collaboration

### **Designer Responsibilities**
- ✅ Review component implementations
- ✅ Test interactive behaviors
- ✅ Verify design system consistency
- ✅ Provide clear, specific feedback

### **Developer Responsibilities**
- ✅ Keep Storybook updated with latest components
- ✅ Maintain accessible sharing URLs
- ✅ Document component specifications accurately
- ✅ Respond promptly to design feedback

---

*Need help? Contact the development team or check this guide's latest version.* 