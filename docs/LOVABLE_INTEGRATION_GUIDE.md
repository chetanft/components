# Using ft-design-system in Lovable.dev

This guide shows how to install and use the FT Design System in your Lovable.dev projects for rapid prototyping and development.

## 🚀 Quick Start in Lovable

### Step 1: Install the Design System

In your Lovable project, open the terminal and run:

```bash
# Install from npm
npm install ft-design-system
```

### Step 1.5: Generate Templates (Optional)

🆕 **NEW!** Generate ready-to-use Lovable templates:

```bash
# In your design system repo
npm run lovable:templates
```

This will generate complete component examples you can copy into your Lovable project!

### Step 2: Import Styles

Add the design system styles to your main app file (`src/App.tsx`):

```tsx
// src/App.tsx
import 'ft-design-system/dist/styles.css';
import { Button, Input, Table, Badge } from 'ft-design-system';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">My Lovable App</h1>
      
      <div className="space-y-6">
        <Button variant="primary">Get Started</Button>
        <Input placeholder="Enter your email" />
        <Badge variant="success">Ready to use!</Badge>
      </div>
    </div>
  );
}

export default App;
```

## 📦 Complete Lovable Integration

### 1. Package Configuration

If using GitHub Packages, create a `.npmrc` file in your project root:

```
@chetanft:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. Lovable-Specific Setup

Update your `package.json` dependencies:

```json
{
  "dependencies": {
    "ft-design-system": "^1.0.1",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### 3. Tailwind Integration

Since Lovable uses Tailwind CSS, add the design system to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add design system content
    "./node_modules/ft-design-system/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🎨 Lovable Project Examples

### Example 1: Dashboard with Table

```tsx
// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Badge, 
  Input,
  QuickFilters 
} from 'ft-design-system';

const Dashboard = () => {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', role: 'Editor' },
  ]);

  const columns = [
    { 
      key: 'name', 
      header: 'Name', 
      sortable: true,
      render: (value: string) => (
        <div className="font-medium text-gray-900">{value}</div>
      )
    },
    { key: 'email', header: 'Email' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'role', header: 'Role' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Dashboard</h1>
        <p className="text-gray-600">Manage your team members and their permissions</p>
      </div>

      <div className="mb-6 flex gap-4">
        <Input 
          placeholder="Search users..." 
          className="max-w-sm"
        />
        <Button variant="primary">Add User</Button>
      </div>

      <Table
        variant="primary"
        data={users}
        columns={columns}
        selectable
        onRowSelect={(selectedRows) => console.log('Selected:', selectedRows)}
        onSort={(column, direction) => console.log('Sort:', column, direction)}
      />
    </div>
  );
};

export default Dashboard;
```

### Example 2: Form with Validation

```tsx
// src/components/ContactForm.tsx
import React, { useState } from 'react';
import { 
  Input, 
  Button, 
  Checkbox, 
  RadioGroup,
  DatePicker,
  Badge 
} from 'ft-design-system';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: string;
  preferredDate: Date | null;
  newsletter: boolean;
  terms: boolean;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    preferredDate: null,
    newsletter: false,
    terms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <Badge variant="success" className="mb-4">Success!</Badge>
        <h2 className="text-xl font-semibold mb-2">Form Submitted</h2>
        <p className="text-gray-600">We'll get back to you soon!</p>
        <Button 
          variant="secondary" 
          onClick={() => setSubmitted(false)}
          className="mt-4"
        >
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              firstName: e.target.value 
            }))}
            required
          />
          
          <Input
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              lastName: e.target.value 
            }))}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            email: e.target.value 
          }))}
          required
        />

        <Input
          label="Phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            phone: e.target.value 
          }))}
        />

        <RadioGroup
          label="Preferred Contact Method"
          name="contactMethod"
          options={[
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
            { value: 'text', label: 'Text Message' }
          ]}
          value={formData.contactMethod}
          onChange={(value) => setFormData(prev => ({ 
            ...prev, 
            contactMethod: value 
          }))}
        />

        <DatePicker
          label="Preferred Contact Date"
          placeholder="Select a date"
          onDateChange={(date) => setFormData(prev => ({ 
            ...prev, 
            preferredDate: date 
          }))}
        />

        <div className="space-y-3">
          <Checkbox
            label="Subscribe to our newsletter"
            checked={formData.newsletter}
            onChange={(checked) => setFormData(prev => ({ 
              ...prev, 
              newsletter: checked 
            }))}
          />
          
          <Checkbox
            label="I agree to the terms and conditions"
            checked={formData.terms}
            onChange={(checked) => setFormData(prev => ({ 
              ...prev, 
              terms: checked 
            }))}
            required
          />
        </div>

        <Button 
          variant="primary" 
          type="submit" 
          loading={isSubmitting}
          disabled={!formData.terms}
          className="w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
```

### Example 3: E-commerce Product Card

```tsx
// src/components/ProductCard.tsx
import React from 'react';
import { Button, Badge, FileCard } from 'ft-design-system';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: 'sale' | 'new' | 'bestseller';
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
  onQuickView: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onQuickView 
}) => {
  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'sale': return 'error';
      case 'new': return 'success';
      case 'bestseller': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-4">
      <div className="relative mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
        {product.badge && (
          <div className="absolute top-2 left-2">
            <Badge variant={getBadgeVariant(product.badge)}>
              {product.badge.toUpperCase()}
            </Badge>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(product.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviews} reviews)
          </span>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button 
            variant="primary" 
            onClick={() => onAddToCart(product.id)}
            className="flex-1"
          >
            Add to Cart
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => onQuickView(product.id)}
          >
            Quick View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
```

## 🛠️ Development Workflow in Lovable

### 1. Hot Reloading with Design System

Your design system components will hot-reload in Lovable just like regular components:

```tsx
// Make changes to your components and see them instantly
import { Button } from 'ft-design-system';

// This will update in real-time
<Button variant="primary">Updated Text</Button>
```

### 2. Using Lovable's AI with Design System

When prompting Lovable's AI, specify you want to use your design system:

```
"Create a user profile page using components from ft-design-system. 
Include Table for user data, Input for editing, and Button for actions."
```

### 3. Component Preview in Lovable

Lovable's preview will show your design system components styled correctly:

```tsx
// src/components/Preview.tsx
import { 
  Button, 
  Input, 
  Badge, 
  Table,
  Checkbox,
  DatePicker 
} from 'ft-design-system';

const ComponentShowcase = () => (
  <div className="p-8 space-y-8">
    <section>
      <h2 className="text-xl font-bold mb-4">Buttons</h2>
      <div className="space-x-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4">Form Elements</h2>
      <div className="space-y-4 max-w-md">
        <Input placeholder="Enter text" />
        <Checkbox label="Check me" />
        <DatePicker placeholder="Select date" />
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4">Badges</h2>
      <div className="space-x-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
    </section>
  </div>
);

export default ComponentShowcase;
```

## 🚀 Publishing Updates for Lovable Users

### 1. Version Management

When you update your design system:

```bash
# In your design system repo
npm run publish:patch  # Bug fixes
npm run publish:minor  # New features
npm run publish:major  # Breaking changes
```

### 2. Updating in Lovable Projects

Users can update to latest versions:

```bash
# In Lovable project terminal
npm update ft-design-system

# Or install specific version
npm install ft-design-system@1.2.0
```

### 3. Migration Guide for Breaking Changes

Create migration guides for major version updates:

```tsx
// Migration from v1 to v2
// OLD (v1)
<Button color="primary">Click me</Button>

// NEW (v2)
<Button variant="primary">Click me</Button>
```

## 📱 Responsive Design in Lovable

Your design system components work perfectly with Lovable's responsive preview:

```tsx
const ResponsiveLayout = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    {products.map(product => (
      <ProductCard 
        key={product.id}
        product={product}
        onAddToCart={handleAddToCart}
        onQuickView={handleQuickView}
      />
    ))}
  </div>
);
```

## 🎯 Best Practices for Lovable

### 1. Component Organization

```tsx
// src/components/ui/index.ts
export { 
  Button, 
  Input, 
  Badge, 
  Table,
  Checkbox,
  DatePicker 
} from 'ft-design-system';

// Use consistent imports
import { Button, Input } from '@/components/ui';
```

### 2. Type Safety

```tsx
import type { ButtonProps, TableColumn } from 'ft-design-system';

// Full type safety in Lovable
const columns: TableColumn[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' }
];
```

### 3. Theme Consistency

```tsx
// Keep consistent with your design system tokens
const customStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700', // Matches Button primary
  secondary: 'bg-gray-200 hover:bg-gray-300' // Matches Button secondary
};
```

## 🔧 Troubleshooting in Lovable

### Common Issues

1. **Styles not loading**
   ```tsx
   // Make sure to import styles in App.tsx
   import 'ft-design-system/dist/styles.css';
   ```

2. **Component not found**
   ```bash
   # Check if package is installed
   npm list ft-design-system
   
   # Reinstall if needed
   npm install ft-design-system
   ```

3. **TypeScript errors**
   ```tsx
   // Import types explicitly
   import type { ButtonProps } from 'ft-design-system';
   ```

### Performance Optimization

```tsx
// Import only what you need for better performance
import { Button } from 'ft-design-system';

// Instead of
import * as DS from 'ft-design-system';
```

## 🎨 Template Generator

### Quick Template Generation

Generate complete, ready-to-use templates for your Lovable projects:

```bash
# In your design system repo
npm run lovable:templates
```

### Available Templates

1. **📊 Admin Dashboard** - Complete dashboard with tables, stats, and actions
2. **📝 Contact Form** - Form with validation and all input types  
3. **🛒 Product Card** - E-commerce product card with ratings and actions
4. **🎨 Component Showcase** - Preview all design system components
5. **⚙️ App Setup** - Main App.tsx with design system imports

### Usage in Lovable

1. Run the template generator in your design system repo
2. Copy the generated files to your Lovable project
3. Import and use them immediately!

Example:
```bash
# Generate dashboard template
npm run lovable:templates
# Select option 1 (Dashboard)
# Copy src/components/Dashboard.tsx to your Lovable project
```

## 🎉 Success!

Your FT Design System is now fully integrated with Lovable.dev! You can:

- ✅ Use all components in Lovable's visual editor
- ✅ Get real-time preview of your designs
- ✅ Leverage Lovable's AI with your design system
- ✅ Deploy instantly with your consistent design language
- ✅ Update components across all projects easily
- ✅ Generate ready-to-use templates with `npm run lovable:templates`

Happy building with Lovable and your FT Design System! 🚀 