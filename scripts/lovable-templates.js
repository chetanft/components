#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import readline from 'readline';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

const templates = {
  dashboard: {
    name: 'Admin Dashboard',
    description: 'Complete dashboard with table, stats, and actions',
    filename: 'Dashboard.tsx'
  },
  form: {
    name: 'Contact Form',
    description: 'Form with validation and all input types',
    filename: 'ContactForm.tsx'
  },
  ecommerce: {
    name: 'Product Card',
    description: 'E-commerce product card with ratings and actions',
    filename: 'ProductCard.tsx'
  },
  showcase: {
    name: 'Component Showcase',
    description: 'Preview all design system components',
    filename: 'ComponentShowcase.tsx'
  },
  setup: {
    name: 'App Setup',
    description: 'Main App.tsx with design system imports',
    filename: 'App.tsx'
  }
};

const getTemplateContent = (templateKey) => {
  switch (templateKey) {
    case 'setup':
      return `import React from 'react';
import '@chetanft/design_system/dist/styles.css';
import { Button, Input, Badge, Table } from '@chetanft/design_system';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              My Lovable App
            </h1>
            <Button variant="primary">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Welcome to your app!</h2>
              <p className="text-gray-600 mb-4">
                Your FT Design System is ready to use. Start building amazing interfaces!
              </p>
              
              <div className="flex space-x-2">
                <Badge variant="success">Design System</Badge>
                <Badge variant="default">Lovable Ready</Badge>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <Input placeholder="Search or enter data..." />
                <div className="flex space-x-2">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary Action</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;`;

    case 'dashboard':
      return `import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Badge, 
  Input,
  QuickFilters 
} from '@chetanft/design_system';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  role: string;
  lastLogin: string;
}

const Dashboard: React.FC = () => {
  const [users] = useState<User[]>([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      status: 'Active', 
      role: 'Admin',
      lastLogin: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane@example.com', 
      status: 'Inactive', 
      role: 'User',
      lastLogin: '2024-01-10'
    },
    { 
      id: 3, 
      name: 'Bob Johnson', 
      email: 'bob@example.com', 
      status: 'Active', 
      role: 'Editor',
      lastLogin: '2024-01-16'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { 
      key: 'name', 
      header: 'Name', 
      sortable: true,
      render: (value: string) => (
        <div className="font-medium text-gray-900">{value}</div>
      )
    },
    { 
      key: 'email', 
      header: 'Email',
      render: (value: string) => (
        <div className="text-gray-600">{value}</div>
      )
    },
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
    { key: 'lastLogin', header: 'Last Login' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row: User) => (
        <div className="flex space-x-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
        </div>
      )
    },
  ];

  const handleEdit = (userId: number) => {
    console.log('Edit user:', userId);
  };

  const handleDelete = (userId: number) => {
    console.log('Delete user:', userId);
  };

  const stats = [
    { label: 'Total Users', value: users.length, change: '+12%' },
    { label: 'Active Users', value: users.filter(u => u.status === 'Active').length, change: '+8%' },
    { label: 'New This Month', value: 23, change: '+23%' },
    { label: 'Conversion Rate', value: '94.2%', change: '+2.1%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your team members and their permissions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <Badge variant="success" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <Input 
                  placeholder="Search users..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="secondary">Export</Button>
                <Button variant="primary">Add User</Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="p-6">
            <Table
              variant="primary"
              data={users}
              columns={columns}
              selectable
              onRowSelect={(selectedRows) => console.log('Selected:', selectedRows)}
              onSort={(column, direction) => console.log('Sort:', column, direction)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;`;

    case 'form':
      return `import React, { useState } from 'react';
import { 
  Input, 
  Button, 
  Checkbox, 
  RadioGroup,
  DatePicker,
  Badge 
} from '@chetanft/design_system';

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

const ContactForm: React.FC = () => {
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
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.terms) newErrors.terms = 'You must accept the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <Badge variant="success" className="text-lg px-4 py-2">
              ✓ Success!
            </Badge>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Form Submitted
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your message. We'll get back to you within 24 hours!
          </p>
          <Button 
            variant="primary" 
            onClick={() => setSubmitted(false)}
            className="w-full"
          >
            Submit Another Form
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Contact Us
            </h2>
            <p className="text-gray-600">
              We'd love to hear from you. Send us a message!
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name *"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  firstName: e.target.value 
                }))}
                error={errors.firstName}
                required
              />
              
              <Input
                label="Last Name *"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  lastName: e.target.value 
                }))}
                error={errors.lastName}
                required
              />
            </div>

            <Input
              label="Email Address *"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                email: e.target.value 
              }))}
              error={errors.email}
              required
            />

            <Input
              label="Phone Number"
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
                { value: 'phone', label: 'Phone Call' },
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

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <Checkbox
                label="Subscribe to our newsletter for updates and tips"
                checked={formData.newsletter}
                onChange={(checked) => setFormData(prev => ({ 
                  ...prev, 
                  newsletter: checked 
                }))}
              />
              
              <Checkbox
                label="I agree to the terms and conditions *"
                checked={formData.terms}
                onChange={(checked) => setFormData(prev => ({ 
                  ...prev, 
                  terms: checked 
                }))}
                error={errors.terms}
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
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;`;

    case 'ecommerce':
      return `import React, { useState } from 'react';
import { Button, Badge } from '@chetanft/design_system';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: 'sale' | 'new' | 'bestseller';
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
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
  const [isHovered, setIsHovered] = useState(false);

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'sale': return 'error';
      case 'new': return 'success';
      case 'bestseller': return 'warning';
      default: return 'default';
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className="text-yellow-400">
        {i < Math.floor(rating) ? '★' : '☆'}
      </span>
    ));
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <Badge variant={getBadgeVariant(product.badge)}>
              {product.badge.toUpperCase()}
            </Badge>
          )}
          {discountPercentage && (
            <Badge variant="error">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Quick View Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
            <Button 
              variant="secondary" 
              onClick={() => onQuickView(product.id)}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Quick View
            </Button>
          </div>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <Badge variant="secondary" className="bg-gray-800 text-white">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            \${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              \${product.originalPrice}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="primary" 
            onClick={() => onAddToCart(product.id)}
            disabled={!product.inStock}
            className="flex-1"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => onQuickView(product.id)}
            className="px-3"
          >
            ♡
          </Button>
        </div>
      </div>
    </div>
  );
};

// Example usage component
const ProductGrid: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      badge: "sale",
      rating: 4.8,
      reviews: 234,
      description: "High-quality wireless headphones with noise cancellation",
      inStock: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 299,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      badge: "new",
      rating: 4.6,
      reviews: 189,
      description: "Track your fitness goals with this smart watch",
      inStock: true
    },
    {
      id: 3,
      name: "Minimalist Desk Lamp",
      price: 89,
      originalPrice: 120,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      badge: "bestseller",
      rating: 4.9,
      reviews: 456,
      description: "Modern desk lamp with adjustable brightness",
      inStock: false
    }
  ]);

  const handleAddToCart = (productId: number) => {
    console.log('Adding to cart:', productId);
    // Add to cart logic
  };

  const handleQuickView = (productId: number) => {
    console.log('Quick view:', productId);
    // Quick view logic
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Products
          </h1>
          <p className="text-gray-600">
            Discover our best-selling items
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;`;

    case 'showcase':
      return `import React from 'react';
import { 
  Button, 
  Input, 
  Badge, 
  Checkbox,
  DatePicker,
  RadioGroup,
  Table 
} from '@chetanft/design_system';

const ComponentShowcase: React.FC = () => {
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  ];

  const tableColumns = [
    { key: 'name', header: 'Name', sortable: true },
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
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            FT Design System Showcase
          </h1>
          <p className="text-xl text-gray-600">
            Explore all components in your design system
          </p>
        </div>

        <div className="space-y-12">
          {/* Buttons Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Buttons</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="destructive">Destructive Button</Button>
                <Button variant="link">Link Button</Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" loading>Loading...</Button>
                <Button variant="secondary" disabled>Disabled</Button>
              </div>
            </div>
          </section>

          {/* Form Elements Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Form Elements</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Input 
                  label="Text Input"
                  placeholder="Enter text here..." 
                />
                
                <Input 
                  label="Email Input"
                  type="email"
                  placeholder="your@email.com" 
                />
                
                <Input 
                  label="Password Input"
                  type="password"
                  placeholder="••••••••" 
                />
                
                <Input 
                  label="Input with Error"
                  placeholder="This has an error..."
                  error="This field is required"
                />
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Checkboxes
                  </label>
                  <div className="space-y-2">
                    <Checkbox label="Option 1" checked />
                    <Checkbox label="Option 2" />
                    <Checkbox label="Disabled Option" disabled />
                  </div>
                </div>
                
                <RadioGroup
                  label="Radio Group"
                  name="example"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' }
                  ]}
                  value="option1"
                  onChange={(value) => console.log(value)}
                />
                
                <DatePicker
                  label="Date Picker"
                  placeholder="Select a date"
                  onDateChange={(date) => console.log(date)}
                />
              </div>
            </div>
          </section>

          {/* Badges Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Badges</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="secondary">Secondary</Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="success" size="sm">Small Success</Badge>
                <Badge variant="warning" size="md">Medium Warning</Badge>
                <Badge variant="error" size="lg">Large Error</Badge>
              </div>
            </div>
          </section>

          {/* Table Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Table</h2>
            <Table
              variant="primary"
              data={tableData}
              columns={tableColumns}
              selectable
              onRowSelect={(selectedRows) => console.log('Selected:', selectedRows)}
              onSort={(column, direction) => console.log('Sort:', column, direction)}
            />
          </section>

          {/* Color Palette Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Color Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Primary', class: 'bg-blue-600' },
                { name: 'Secondary', class: 'bg-gray-600' },
                { name: 'Success', class: 'bg-green-600' },
                { name: 'Warning', class: 'bg-yellow-600' },
                { name: 'Error', class: 'bg-red-600' },
                { name: 'Info', class: 'bg-cyan-600' }
              ].map((color) => (
                <div key={color.name} className="text-center">
                  <div className={\`\${color.class} h-16 w-full rounded-lg mb-2\`} />
                  <p className="text-sm font-medium text-gray-700">{color.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Typography Section */}
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Typography</h2>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Heading 1</h1>
              <h2 className="text-3xl font-bold text-gray-900">Heading 2</h2>
              <h3 className="text-2xl font-bold text-gray-900">Heading 3</h3>
              <h4 className="text-xl font-semibold text-gray-900">Heading 4</h4>
              <p className="text-lg text-gray-700">Large paragraph text</p>
              <p className="text-base text-gray-700">Regular paragraph text</p>
              <p className="text-sm text-gray-600">Small text</p>
              <p className="text-xs text-gray-500">Extra small text</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComponentShowcase;`;

    default:
      return '// Template not found';
  }
};

async function generateTemplate(templateKey, outputDir) {
  const template = templates[templateKey];
  if (!template) {
    log(`❌ Template "${templateKey}" not found`, 'red');
    return false;
  }

  try {
    // Create output directory if it doesn't exist
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const content = getTemplateContent(templateKey);
    const filePath = join(outputDir, template.filename);
    
    writeFileSync(filePath, content);
    
    log(`✅ Generated ${template.name} template:`, 'green');
    log(`   📁 ${filePath}`, 'cyan');
    
    return true;
  } catch (error) {
    log(`❌ Failed to generate template: ${error.message}`, 'red');
    return false;
  }
}

async function showMainMenu(rl) {
  log('\n🎨 FT Design System - Lovable Templates', 'bold');
  log('=========================================', 'blue');
  
  log('\nSelect a template to generate:', 'yellow');
  
  Object.entries(templates).forEach(([key, template], index) => {
    log(`${index + 1}. ${template.name}`, 'white');
    log(`   ${template.description}`, 'cyan');
  });
  
  log('0. ❌ Exit', 'white');
  
  const choice = await askQuestion(rl, `\nEnter your choice (0-${Object.keys(templates).length}): `);
  return choice;
}

async function main() {
  const rl = createReadlineInterface();
  
  try {
    while (true) {
      const choice = await showMainMenu(rl);
      const templateKeys = Object.keys(templates);
      
      if (choice === '0') {
        log('\n👋 Happy coding with Lovable!', 'cyan');
        break;
      }
      
      const choiceIndex = parseInt(choice) - 1;
      if (choiceIndex >= 0 && choiceIndex < templateKeys.length) {
        const templateKey = templateKeys[choiceIndex];
        const outputDir = await askQuestion(rl, 'Enter output directory (default: ./src/components): ') || './src/components';
        
        log(`\n🚀 Generating ${templates[templateKey].name} template...`, 'blue');
        const success = await generateTemplate(templateKey, outputDir);
        
        if (success) {
          log('\n📝 Next steps:', 'yellow');
          log('1. Import the component in your Lovable app', 'white');
          log('2. Add routing if needed', 'white');
          log('3. Customize the styling and content', 'white');
        }
      } else {
        log('\n❌ Invalid choice. Please select a valid option.', 'red');
      }
      
      if (choice !== '0') {
        await askQuestion(rl, '\nPress Enter to continue...');
      }
    }
  } catch (error) {
    log(`\n❌ An error occurred: ${error.message}`, 'red');
  } finally {
    rl.close();
  }
}

main(); 