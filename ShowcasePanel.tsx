import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import { Link } from 'wouter';
import { FaStore, FaHome, FaUser, FaInfoCircle, FaHashtag } from 'react-icons/fa';
import AnimatedTitle from './AnimatedTitle';
import { useProductSelection } from '@/hooks/useProductSelection';
import { useSearchStore } from '@/hooks/useSearchStore';

export default function ShowcasePanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [farmFilter, setFarmFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [farms, setFarms] = useState<string[]>([]);
  
  // Utilisation du hook partagé pour la sélection des produits
  const { handleProductClick } = useProductSelection();
  
  // Fetch products avec synchronisation automatique
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        
        // Extract unique categories and farms
        const uniqueCategories = Array.from(
          new Set(response.data.map((p: Product) => p.category).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories);
        
        const uniqueFarms = Array.from(
          new Set(response.data.map((p: Product) => p.farm).filter(Boolean))
        ) as string[];
        setFarms(uniqueFarms);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setIsLoading(false);
      }
    };
    
    // Première requête immédiate
    fetchProducts();
    
    // Ne plus utiliser de rafraîchissement automatique
    // Le chargement des produits se fera uniquement lors du montage du composant
  }, []);
  
  // Filter products based on category and farm
  const filteredProducts = products.filter(product => {
    // Apply category filter if set
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }
    
    // Apply farm filter if set
    if (farmFilter && product.farm !== farmFilter) {
      return false;
    }
    
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2196F3]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 text-red-500 p-8 rounded-md m-4 border border-red-800 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-2">Error loading products:</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pb-10">
      <div className="container mx-auto px-4 py-6">
        {/* Navigation buttons - Simplifié (juste Accueil et Admin) */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Link href="/">
            <button className="flex items-center gap-2 px-5 py-3 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full transition-colors">
              <FaHome /> Accueil
            </button>
          </Link>
          
          <div className="ml-auto">
            <Link href="/admin">
              <button className="flex items-center gap-2 px-5 py-3 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full transition-colors">
                <FaUser /> Admin
              </button>
            </Link>
          </div>
        </div>
        
        {/* Title with animation */}
        <div className="mb-6 text-center">
          <AnimatedTitle className="text-3xl font-bold">
            VITRINE PRODUITS
          </AnimatedTitle>
        </div>
        
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <select 
              className="w-full px-4 py-3 rounded-full bg-gray-800 text-white border border-gray-700"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <select 
              className="w-full px-4 py-3 rounded-full bg-gray-800 text-white border border-gray-700"
              value={farmFilter}
              onChange={(e) => setFarmFilter(e.target.value)}
            >
              <option value="">Toutes les origines</option>
              {farms.map(farm => (
                <option key={farm} value={farm}>{farm}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Results Stats */}
        <div className="text-gray-300 mb-6 flex items-center justify-between">
          <div>
            <span className="text-white font-medium">{filteredProducts.length}</span> produits trouvés
          </div>
          
          <div className="text-sm text-gray-500">
            Vitrine Produits
          </div>
        </div>
        
        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-gray-900/30 backdrop-blur-sm p-12 rounded-xl text-center border border-gray-800 shadow-lg">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <FaStore className="text-2xl text-gray-500" />
            </div>
            <h3 className="text-2xl font-medium mb-4 text-white">Aucun produit trouvé</h3>
            <p className="text-gray-400 max-w-lg mx-auto">
              Aucun produit ne correspond aux critères sélectionnés.
            </p>
            <button 
              onClick={() => {setCategoryFilter(''); setFarmFilter('');}}
              className="mt-6 px-6 py-2 bg-[#2196F3] text-white rounded-full hover:bg-[#1E88E5] transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}