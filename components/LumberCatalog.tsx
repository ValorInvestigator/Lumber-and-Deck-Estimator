import React from 'react';
import { CEDAR_PRODUCTS } from '../constants';
import { ProductImage } from './ProductImage';

export const LumberCatalog: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center bg-wood-100 p-8 rounded-2xl border border-wood-200">
        <h2 className="text-3xl font-bold text-wood-900">Premium Lumber Catalog</h2>
        <p className="mt-2 text-wood-700 max-w-2xl mx-auto">
          Sourced from our partner, <strong>Unity Forest Products</strong> in Yuba City, CA. 
          With specialties in Western Red Cedar, Incense Cedar, Ponderosa Pine, and Red Grandis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CEDAR_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-wood-100 flex flex-col">
            <div className="h-48 overflow-hidden relative bg-wood-50">
              <ProductImage 
                product={product} 
                className="w-full h-full transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-wood-900 leading-tight">{product.name}</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-forest-100 text-forest-800 whitespace-nowrap ml-2">
                  {product.grade}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{product.dimensions}</p>
              <p className="text-gray-600 mb-4 flex-grow text-sm">{product.description}</p>
              
              <div className="mt-4 pt-4 border-t border-wood-100">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Best For</h4>
                <div className="flex flex-wrap gap-2">
                  {product.usage.map(u => (
                    <span key={u} className="text-xs bg-wood-50 text-wood-700 px-2 py-1 rounded">
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};