import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@/lib/types';
import { FaFilter, FaChevronDown, FaCheck } from 'react-icons/fa';
import ProductDetailModal from './ProductDetailModal';
import AnimatedTitle from './AnimatedTitle';
import { useThemeStore } from '@/lib/themeStore';
import { useProductSelection } from '@/hooks/useProductSelection';
import { useSearchStore } from '@/hooks/useSearchStore';
import SiteTitle from '@/components/SiteTitle';

export default function ProductCatalog() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  // Utilisation du hook global pour la gestion des produits
  const { handleProductClick } = useProductSelection();
  // Utilisation du store de recherche global
  const { searchQuery, clearSearch } = useSearchStore();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [farmFilter, setFarmFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [farms, setFarms] = useState<string[]>([]);
  
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showFarmDropdown, setShowFarmDropdown] = useState(false);
  
  // Function to fetch products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching products...');
      const response = await axios.get('/api/products');
      console.log('Products response:', response);
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
    } catch (err: any) {
      console.error('Error fetching products:', err);
      // Log more detailed error information
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error status:', err.response.status);
        console.error('Error data:', err.response.data);
        console.error('Error headers:', err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('Error request:', err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', err.message);
      }
      
      setError(err instanceof Error ? err : new Error(`Failed to fetch products: ${err.message || 'Unknown error'}`));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch products on initial load seulement
  useEffect(() => {
    // Initial fetch
    fetchProducts();
    
    // Plus de polling automatique
  }, []);
  
  // Filter products based on category, farm and search query
  const filteredProducts = products.filter(product => {
    // Apply category filter if set
    if (categoryFilter && product.category !== categoryFilter) {
      return false;
    }
    
    // Apply farm filter if set
    if (farmFilter && product.farm !== farmFilter) {
      return false;
    }
    
    // Apply search filter if query exists
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      // Check if the query matches product name, description, category, or farm
      const nameMatch = product.name?.toLowerCase().includes(query) || false;
      const descMatch = product.description?.toLowerCase().includes(query) || false;
      const categoryMatch = product.category?.toLowerCase().includes(query) || false;
      const farmMatch = product.farm?.toLowerCase().includes(query) || false;
      
      if (!(nameMatch || descMatch || categoryMatch || farmMatch)) {
        return false;
      }
    }
    
    return true;
  });

  // Helper function to get emoji for category
  const getCategoryEmoji = (category: string): string => {
    const emojiMap: Record<string, string> = {
      'Véhicules': '🚗',
      'Armes': '⚔️',
      'Gadgets': '🔧',
      'Armure': '🛡️',
      'Accessoires': '👓',
      'Fresh Frozen': '❄️ 🧊',
      'FROZEN SIFT': '🧊 🧪',
      'JAUNE MOUSSEUX': '💛 🧁',
      'CALIFORNIENNE NL': '🌴 🇳🇱',
      'DRY-SIFT': '🔥 🔥',
      'WEED NL': '🌷 🇳🇱',
      'DRY PREMIUM': '🏆 🏆',
      'CALI USA EXOTIC': '⚡ 🇺🇸',
      'DRYSIFT USA': '🇺🇸',
      'CALI CANADA': '🇨🇦 🇺🇸',
      'L.A MOUSSE': '💛 🇺🇸',
      'EXTRACTION USA': '🇺🇸'
    };
    
    return emojiMap[category] || '📦';
  };
  
  // Helper function to get emoji for farm
  const getFarmEmoji = (farm: string): string => {
    const emojiMap: Record<string, string> = {
      'Wayne Enterprises': '🦇',
      'Ace Chemicals': '⚗️',
      'Queen Industries': '👑',
      'LexCorp': '💼',
      'LVMH Farm': '🌿 🌿',
      'VVS TANGER 2025': '💎 💎',
      'No Farm': '🚫',
      'Top-Shelf': '🚀 🚀',
      'La Squadra Farmz': '🇮🇹',
      'Coffeeshop': '☕ ☕',
      'CaliPlates': '🏆 🇺🇸',
      'Whole Melt': '💦 🇺🇸',
      'Ted Budz Loose': '🏆'
    };
    
    return emojiMap[farm] || '🏭';
  };

  // Récupérer le thème (maintenant avant les rendus conditionnels)
  const { primaryColor, secondaryColor, accentColor } = useThemeStore();

  // Styles avec couleurs personnalisées
  const loadingSpinnerStyle = {
    borderColor: `transparent transparent ${primaryColor} transparent`
  };
  
  const dropdownButtonStyle = {
    backgroundColor: `${primaryColor}15`,
    borderColor: `${primaryColor}40`,
  };
  
  const dropdownItemStyle = {
    backgroundColor: `${primaryColor}15`,
    borderBottom: `1px solid ${primaryColor}30`,
  };
  
  const activeFilterStyle = {
    backgroundColor: `${primaryColor}30`,
  };
  
  const checkIconStyle = {
    color: primaryColor
  };
  
  const resetButtonStyle = {
    backgroundColor: primaryColor,
    color: 'white'
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={loadingSpinnerStyle}></div>
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
    <div className="min-h-screen pb-10 relative">
      <div className="container mx-auto px-4 py-6">
        {/* Suppression du titre pour éviter la duplication */}
        
        {/* Filter Controls with Dropdowns */}
        <div className="flex flex-row gap-4 mb-8 relative">
          <div className="flex-1 relative">
            <button 
              className="w-full px-4 py-3 rounded-full text-white border flex items-center justify-between"
              style={dropdownButtonStyle}
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowFarmDropdown(false);
              }}
            >
              <span>
                {categoryFilter ? 
                  <>{categoryFilter} {getCategoryEmoji(categoryFilter)}</> : 
                  'Toutes les catégories'}
              </span>
              <FaChevronDown className={`transform transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Category Dropdown */}
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black/70 backdrop-blur-sm border rounded-md z-20 max-h-96 overflow-auto" 
                style={{borderColor: `${primaryColor}30`}}>
                <div 
                  className="p-2 hover:bg-black/50 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    setCategoryFilter('');
                    setShowCategoryDropdown(false);
                  }}
                >
                  <FaCheck style={checkIconStyle} />
                  <span className="text-white">Toutes les catégories</span>
                </div>
                {categories.map(category => (
                  <div 
                    key={category}
                    className="p-2 hover:bg-black/50 cursor-pointer flex items-center gap-2"
                    style={categoryFilter === category ? activeFilterStyle : {}}
                    onClick={() => {
                      setCategoryFilter(category);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    <span className="text-white">{category} {getCategoryEmoji(category)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex-1 relative">
            <button 
              className="w-full px-4 py-3 rounded-full text-white border flex items-center justify-between"
              style={dropdownButtonStyle}
              onClick={() => {
                setShowFarmDropdown(!showFarmDropdown);
                setShowCategoryDropdown(false);
              }}
            >
              <span>
                {farmFilter ? 
                  <>{farmFilter} {getFarmEmoji(farmFilter)}</> : 
                  'Toutes les farms'}
              </span>
              <FaChevronDown className={`transform transition-transform ${showFarmDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Farm Dropdown */}
            {showFarmDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black/70 backdrop-blur-sm border rounded-md z-20 max-h-96 overflow-auto"
                style={{borderColor: `${primaryColor}30`}}>
                <div 
                  className="p-2 hover:bg-black/50 cursor-pointer flex items-center gap-2"
                  onClick={() => {
                    setFarmFilter('');
                    setShowFarmDropdown(false);
                  }}
                >
                  <FaCheck style={checkIconStyle} />
                  <span className="text-white">Toutes les farms</span>
                </div>
                {farms.map(farm => (
                  <div 
                    key={farm}
                    className="p-2 hover:bg-black/50 cursor-pointer flex items-center gap-2"
                    style={farmFilter === farm ? activeFilterStyle : {}}
                    onClick={() => {
                      setFarmFilter(farm);
                      setShowFarmDropdown(false);
                    }}
                  >
                    <span className="text-white">{farm} {getFarmEmoji(farm)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="backdrop-blur-sm p-12 rounded-xl text-center border shadow-lg" 
            style={{borderColor: `${primaryColor}20`, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
            <h3 className="text-2xl font-medium mb-4 text-white">Aucun produit trouvé</h3>
            <p className="text-gray-400 max-w-lg mx-auto">
              Aucun produit ne correspond aux critères sélectionnés.
            </p>
            <button 
              onClick={() => {
                setCategoryFilter(''); 
                setFarmFilter('');
                clearSearch(); // Réinitialiser la recherche globale
              }}
              className="mt-6 px-6 py-2 rounded-full hover:brightness-110 transition-all"
              style={resetButtonStyle}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="relative overflow-hidden rounded-lg border backdrop-blur-sm transition-transform hover:scale-105 cursor-pointer"
                style={{
                  borderColor: `${primaryColor}30`,
                  background: 'rgba(0, 0, 0, 0.3)'
                }}
                onClick={() => handleProductClick(product)}
              >
                {/* Category Badge */}
                <div className="absolute top-2 left-2 right-2 z-10">
                  <div className="bg-black/80 rounded px-2 py-1 text-xs uppercase tracking-wider text-white inline-flex items-center"
                    style={{
                      backgroundColor: `${primaryColor}20`, 
                      borderLeft: `2px solid ${primaryColor}`
                    }}>
                    {product.category} {getCategoryEmoji(product.category)}
                  </div>
                </div>
                
                {/* Product Image with Effect */}
                <div className="aspect-square bg-gray-800 relative overflow-hidden group">
                  {product.media ? (
                    <>
                      <img 
                        src={product.media} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Custom theme color effect overlay */}
                      <div className="absolute inset-0 mix-blend-overlay opacity-50" 
                        style={{ 
                          background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}10, transparent)` 
                        }}>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                      <div className="text-2xl opacity-30 font-bold" style={{color: primaryColor}}>
                        {/* Utiliser le nom personnalisé du site au lieu de "BROLY69" */}
                        {useThemeStore.getState().siteName || ''}
                      </div>
                      {/* Custom theme color effect overlay */}
                      <div className="absolute inset-0 mix-blend-overlay opacity-50" 
                        style={{ 
                          background: `linear-gradient(135deg, ${primaryColor}40, ${secondaryColor}10, transparent)` 
                        }}>
                      </div>
                    </div>
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{backgroundColor: `${primaryColor}80`}}>
                    <div className="text-white font-bold">
                      Voir détails
                    </div>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-3 bg-gradient-to-b from-transparent to-black">
                  <h3 className="font-bold text-white">{product.name}</h3>
                  {product.farm && (
                    <div className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      {getFarmEmoji(product.farm)} {product.farm}
                    </div>
                  )}
                  
                  {/* Multi-price display */}
                  {product.prices && product.prices.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.prices.slice(0, 3).map((priceOption, index) => (
                        <div key={index} className="bg-black/60 rounded-lg px-2 py-1 text-xs border inline-block"
                          style={{borderColor: `${accentColor}40`}}>
                          <span className="text-gray-400">{priceOption.size}</span>
                          <span className="font-bold ml-1" style={{color: accentColor}}>{priceOption.price}€</span>
                        </div>
                      ))}
                      {product.prices.length > 3 && (
                        <div className="bg-black/60 rounded-lg px-2 py-1 text-xs border inline-block"
                          style={{borderColor: `${accentColor}40`}}>
                          <span className="text-gray-400">+{product.prices.length - 3}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-black/60 rounded-lg px-2 py-1 text-xs border inline-block mt-1"
                      style={{borderColor: `${accentColor}40`}}>
                      <span className="font-bold" style={{color: accentColor}}>{product.price}€</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Backdrop red glow effect */}
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-red-900/20 to-transparent -z-10"></div>
      
      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={null}
        onClose={() => setShowDetailModal(false)}
        visible={showDetailModal}
      />
    </div>
  );
}