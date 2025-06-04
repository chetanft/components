import React from 'react';
import { Icon } from './src/components/Icons';

// Example component demonstrating icon usage
export const IconExamples: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Icon System Examples</h2>
      
      {/* Basic Usage */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Basic Icons</h3>
        <div className="flex gap-4 items-center">
          <Icon name="check" />
          <Icon name="cross" />
          <Icon name="star" />
          <Icon name="bell" />
          <Icon name="search" />
        </div>
      </div>

      {/* Different Sizes */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Different Sizes</h3>
        <div className="flex gap-4 items-center">
          <Icon name="star" size={12} />
          <Icon name="star" size={16} />
          <Icon name="star" size={24} />
          <Icon name="star" size={32} />
          <Icon name="star" size={48} />
        </div>
      </div>

      {/* Custom Colors */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Custom Colors</h3>
        <div className="flex gap-4 items-center">
          <Icon name="check" color="#22c55e" size={24} />
          <Icon name="cross" color="#ef4444" size={24} />
          <Icon name="star" color="#f59e0b" size={24} />
          <Icon name="bell" color="#3b82f6" size={24} />
        </div>
      </div>

      {/* In Context */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Icons in Context</h3>
        <div className="space-y-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <Icon name="add" size={16} />
            Add Item
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            <Icon name="delete" size={16} />
            Delete
          </button>
          
          <div className="flex items-center gap-2 text-green-600">
            <Icon name="success" size={16} />
            Operation completed successfully
          </div>
        </div>
      </div>

      {/* Brand Icons */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Brand Icons</h3>
        <div className="flex gap-4 items-center">
          <Icon name="google-colour" size={32} />
          <Icon name="airtel" size={32} />
          <Icon name="jio" size={32} />
          <Icon name="ft-colour" size={32} />
        </div>
      </div>
    </div>
  );
};

export default IconExamples; 