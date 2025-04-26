import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  
  // Extract unique categories from products
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.map(product => product.category).filter(Boolean))
    );
    setCategories(uniqueCategories);
  }, [products]);
  
  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (products.length === 0) {
    return (
      <div className="p-4 text-center">
        No products available. Add some products to see them here.
      </div>
    );
  }

  return (
    <>
      {/* Search & Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background border border-input text-foreground rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-muted-foreground"></i>
          </div>
        </div>
        <select 
          className="bg-background border border-input text-foreground rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-muted rounded-lg overflow-hidden">
          <thead className="bg-background text-foreground">
            <tr>
              <th className="py-3 px-4 text-left font-heading text-sm uppercase">Name</th>
              <th className="py-3 px-4 text-left font-heading text-sm uppercase">Category</th>
              <th className="py-3 px-4 text-left font-heading text-sm uppercase">Price</th>
              <th className="py-3 px-4 text-left font-heading text-sm uppercase">Media</th>
              <th className="py-3 px-4 text-left font-heading text-sm uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 px-4 text-center text-muted-foreground">
                  No products found. Add some products to see them here.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr key={product.id} className="border-b border-muted hover:bg-background transition duration-150">
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">{product.price}€</td>
                  <td className="py-3 px-4">
                    <div className="w-16 h-12 bg-background flex items-center justify-center rounded overflow-hidden">
                      {product.media && (
                        product.media.toLowerCase().endsWith('.mp4') || 
                        product.media.toLowerCase().endsWith('.mov') ? (
                          <video className="object-cover w-full h-full">
                            <source src={product.media} type="video/mp4" />
                            Your browser does not support video tag
                          </video>
                        ) : (
                          <img 
                            src={product.media} 
                            alt={product.name} 
                            className="object-cover w-full h-full" 
                          />
                        )
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button 
                        className="text-accent hover:text-white p-1 hover:shadow-[0_0_5px_#00FFFF,0_0_10px_#00FFFF]" 
                        title="Edit"
                        onClick={() => onEdit(product)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="text-secondary hover:text-white p-1 hover:shadow-[0_0_5px_#FF00FF,0_0_10px_#FF00FF]" 
                        title="Delete"
                        onClick={() => onDelete(product.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination - Simplified version */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">1-{filteredProducts.length}</span> of <span className="font-medium text-foreground">{filteredProducts.length}</span> products
        </div>
        <div className="flex space-x-1">
          <button disabled className="px-3 py-1 bg-background text-muted-foreground rounded border border-input">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="px-3 py-1 bg-primary text-white rounded">1</button>
          <button disabled className="px-3 py-1 bg-background text-muted-foreground rounded border border-input">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
