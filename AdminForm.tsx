import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { ProductFormData } from '@/lib/types';

export default function AdminForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: '',
    price: '',
    description: '',
    media: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, media: file }));
      setFileName(file.name);
    }
  };

  const clearFile = () => {
    setFormData(prev => ({ ...prev, media: null }));
    setFileName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('price', formData.price);
      data.append('description', formData.description);
      if (formData.media) {
        data.append('media', formData.media);
      }

      await apiRequest('POST', '/api/products', data);
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        media: null
      });
      setFileName('');
      
      // Invalidate queries to refresh product list
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    } catch (err) {
      console.error(err);
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm uppercase font-medium text-muted-foreground">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-background border border-input text-foreground rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          placeholder="Enter product name"
          required
        />
      </div>
      
      <div className="space-y-1">
        <label htmlFor="category" className="block text-sm uppercase font-medium text-muted-foreground">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full bg-background border border-input text-foreground rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          required
        >
          <option value="" disabled>Select category</option>
          <option value="Electronics">Electronics</option>
          <option value="Apparel">Apparel</option>
          <option value="Collectibles">Collectibles</option>
          <option value="Weapons">Weapons</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="price" className="block text-sm uppercase font-medium text-muted-foreground">
          Price (€)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          className="w-full bg-background border border-input text-foreground rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          placeholder="0.00"
          required
        />
      </div>
      
      <div className="space-y-1">
        <label htmlFor="description" className="block text-sm uppercase font-medium text-muted-foreground">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full bg-background border border-input text-foreground rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
          placeholder="Enter product description"
          required
        ></textarea>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="media" className="block text-sm uppercase font-medium text-muted-foreground">
          Media (Image/Video)
        </label>
        <div className="border-2 border-dashed border-input rounded-md p-4 text-center">
          <input
            type="file"
            id="media"
            name="media"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
            required
          />
          <label htmlFor="media" className="cursor-pointer">
            <div className="space-y-2">
              <i className="fas fa-upload text-2xl text-muted-foreground"></i>
              <p className="text-sm text-muted-foreground">Click to upload or drag files here</p>
              <p className="text-xs text-muted-foreground">Supports: JPG, PNG, MP4, MOV</p>
            </div>
          </label>
          {fileName && (
            <div className="mt-3">
              <div className="bg-background p-2 rounded flex items-center space-x-2">
                <i className="fas fa-file-image text-primary"></i>
                <span className="text-sm">{fileName}</span>
                <button 
                  type="button" 
                  className="ml-auto text-muted-foreground hover:text-white"
                  onClick={clearFile}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="pt-4">
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 uppercase font-medium hover:shadow-[0_0_5px_#1E90FF,0_0_10px_#1E90FF]"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
            </span>
          ) : (
            <span>
              <i className="fas fa-save mr-2"></i> Add Product
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
