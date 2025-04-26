import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '@/lib/types';
import { FaLink } from 'react-icons/fa';
import { Loader2, ShoppingCart } from 'lucide-react';

interface ProductFormProps {
  editingProduct: Product | null;
  cancelEdit: () => void;
  onSave: () => void;
}

export default function ProductForm({ editingProduct, cancelEdit, onSave }: ProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [farm, setFarm] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);
  const [externalLink, setExternalLink] = useState('');
  const [buttonText, setButtonText] = useState('Ajouter au panier');
  const [prices, setPrices] = useState<{size: string, price: string}[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [farms, setFarms] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newFarm, setNewFarm] = useState('');

  // Chargement des catégories et fermes existantes
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get('/api/products');
        const products = response.data;
        
        // Extraire les catégories et fermes uniques sans utiliser Set
        const catMap: Record<string, boolean> = {};
        const farmMap: Record<string, boolean> = {};
        
        products.forEach((p: Product) => {
          if (p.category) catMap[p.category] = true;
          if (p.farm) farmMap[p.farm] = true;
        });
        
        const uniqueCategories = Object.keys(catMap);
        const uniqueFarms = Object.keys(farmMap);
        
        setCategories(uniqueCategories);
        setFarms(uniqueFarms);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories et fermes:', error);
      }
    };
    
    fetchExistingData();
  }, []);

  // Chargement des données du produit lors de l'édition
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setDescription(editingProduct.description);
      setCategory(editingProduct.category);
      setFarm(editingProduct.farm || '');
      setExternalLink(editingProduct.externalLink || '');
      setCurrentMedia(editingProduct.media || null);
      setMedia(null); // Reset file input when editing
      
      // Chargement du texte du bouton personnalisé
      // @ts-ignore - buttonText might not be in the type yet
      setButtonText(editingProduct.buttonText || 'Ajouter au panier');
      
      // Load price variants if available
      if (editingProduct.prices && editingProduct.prices.length > 0) {
        setPrices(editingProduct.prices);
      } else {
        setPrices([]);
      }
    } else {
      // Reset form when not editing
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setFarm('');
      setExternalLink('');
      setCurrentMedia(null);
      setMedia(null);
      setButtonText('Ajouter au panier');
      setPrices([]);
    }
  }, [editingProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Éviter les soumissions multiples
    if (isSubmitting) {
      return;
    }
    
    console.log('Form submitted with:', { name, price, description, category, farm, externalLink, media });
    
    // Validate form data
    if (!name || !price || !description || !category) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Validate external link format if provided
    if (externalLink && !isValidURL(externalLink)) {
      alert('Please enter a valid URL for the external link (including http:// or https://)');
      return;
    }
    
    // Activer l'état de chargement
    setIsSubmitting(true);
    
    const form = new FormData();
    form.append('name', name);
    form.append('price', price);
    form.append('description', description);
    form.append('category', category);
    form.append('farm', farm);
    form.append('externalLink', externalLink);
    form.append('buttonText', buttonText);
    
    // Add prices data
    if (prices.length > 0) {
      form.append('prices', JSON.stringify(prices));
    }
    
    if (media) form.append('media', media);

    try {
      console.log('Sending request to API...');
      if (editingProduct) {
        const response = await axios.put(`/api/products/${editingProduct.id}`, form);
        console.log('Update response:', response.data);
      } else {
        const response = await axios.post('/api/products', form);
        console.log('Create response:', response.data);
      }
      
      // Show success message
      const action = editingProduct ? 'updated' : 'added';
      alert(`Product ${action} successfully!`);
      
      // Reset form and notify parent component
      onSave();
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setFarm('');
      setExternalLink('');
      setMedia(null);
      setPrices([]);
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Error while saving product. Please check console for details.');
    } finally {
      // Désactiver l'état de chargement, même en cas d'erreur
      setIsSubmitting(false);
    }
  };

  // Helper function to validate URL format
  const isValidURL = (url: string) => {
    if (!url) return true; // Empty is fine
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-muted rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-primary">
        {editingProduct ? 'Edit Product' : 'Add New Product'}
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Product Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="w-full p-2 rounded bg-card text-card-foreground border border-input"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block mb-1">Prix de base</label>
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
              <input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Prix"
                className="w-full p-2 rounded bg-card text-card-foreground border border-input"
                min="0"
                required
                type="number"
                step="0.01"
              />
              <div className="absolute right-2 top-2 text-gray-400 text-sm">€</div>
            </div>
            <input 
              type="text"
              placeholder="Format (ex: le g, les 10g, etc.)"
              className="p-2 rounded bg-card text-card-foreground border border-input"
              onChange={(e) => {
                if (e.target.value) {
                  // Appliquer directement le format
                  const priceValue = price || "0";
                  if (e.target.value.startsWith("le ") || e.target.value.startsWith("les ")) {
                    setPrice(`${priceValue} ${e.target.value}`);
                  } else {
                    setPrice(priceValue);
                  }
                }
              }}
            />
          </div>
        </div>
        
        {/* Multiple price variants */}
        <div>
          <label className="block mb-1 flex items-center justify-between">
            <span>Variantes de prix</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setPrices([...prices, { size: '', price: '' }])}
                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md hover:bg-secondary/80"
              >
                + Ajouter un prix
              </button>
              <button
                type="button"
                onClick={() => {
                  setPrices([
                    { size: '1g', price: '10' },
                    { size: '3g', price: '25' },
                    { size: '5g', price: '45' },
                    { size: '10g', price: '80' }
                  ]);
                }}
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700"
                title="Ajouter des tarifs standards"
              >
                Tarifs standards
              </button>
            </div>
          </label>
          
          {prices.length > 0 ? (
            <div className="space-y-2 mt-2">
              {prices.map((priceItem, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      value={priceItem.size}
                      onChange={(e) => {
                        const newPrices = [...prices];
                        newPrices[idx].size = e.target.value;
                        setPrices(newPrices);
                      }}
                      placeholder="Format (ex: 1g, 5g, 10g, etc.)"
                      className="w-full p-2 rounded bg-card text-card-foreground border border-input"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <input
                      value={priceItem.price}
                      onChange={(e) => {
                        const newPrices = [...prices];
                        newPrices[idx].price = e.target.value;
                        setPrices(newPrices);
                      }}
                      placeholder="Prix"
                      className="w-full p-2 rounded bg-card text-card-foreground border border-input"
                      type="number"
                      min="0"
                      step="0.01"
                    />
                    <div className="absolute right-2 top-2 text-gray-400 text-sm">€</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newPrices = [...prices];
                      newPrices.splice(idx, 1);
                      setPrices(newPrices);
                    }}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              Ajoutez des variantes de prix pour différentes options (grammes, poids, formats, etc.)
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 rounded bg-card text-card-foreground border border-input min-h-[100px]"
            required
          />
        </div>

        {/* External Link input */}
        <div>
          <label htmlFor="externalLink" className="block mb-1 flex items-center gap-2">
            <FaLink className="text-primary" /> 
            External Link (Optional)
          </label>
          <input
            id="externalLink"
            type="url"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            placeholder="https://example.com/product-details"
            className="w-full p-2 rounded bg-card text-card-foreground border border-input"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Add a link to an external website with more details about this product.
          </p>
        </div>

        {/* Custom category input */}
        <div className="flex space-x-2">
          <div className="flex-1">
            <label htmlFor="newCategory" className="block mb-1">New Category</label>
            <input
              id="newCategory"
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2 rounded bg-card text-card-foreground border border-input"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              if (newCategory && !categories.includes(newCategory)) {
                setCategories([...categories, newCategory]);
                setNewCategory('');
              }
            }}
            className="mt-auto py-2 px-4 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
          >
            Add Category
          </button>
        </div>

        <div>
          <label htmlFor="category" className="block mb-1">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded bg-card text-card-foreground border border-input"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Custom farm input */}
        <div className="flex space-x-2">
          <div className="flex-1">
            <label htmlFor="newFarm" className="block mb-1">New Origin</label>
            <input
              id="newFarm"
              type="text"
              placeholder="New Origin"
              value={newFarm}
              onChange={(e) => setNewFarm(e.target.value)}
              className="w-full p-2 rounded bg-card text-card-foreground border border-input"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              if (newFarm && !farms.includes(newFarm)) {
                setFarms([...farms, newFarm]);
                setNewFarm('');
              }
            }}
            className="mt-auto py-2 px-4 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
          >
            Add Origin
          </button>
        </div>

        <div>
          <label htmlFor="farm" className="block mb-1">Origin</label>
          <select
            id="farm"
            value={farm}
            onChange={(e) => setFarm(e.target.value)}
            className="w-full p-2 rounded bg-card text-card-foreground border border-input"
          >
            <option value="">Select an origin</option>
            {farms.map((f, idx) => (
              <option key={idx} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="media" className="block mb-1">Media (Image/Video)</label>
          <input
            id="media"
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setMedia(e.target.files[0]);
              }
            }}
            className="w-full p-2 rounded bg-card text-card-foreground border border-input"
          />
          {currentMedia && (
            <div className="mt-2 text-sm text-blue-500">
              Média actuel: {currentMedia.split('/').pop()}
              {!media && <span className="text-gray-500"> (conservé sauf si un nouveau fichier est sélectionné)</span>}
            </div>
          )}
        </div>
        
        {/* Champ pour le texte du bouton */}
        <div>
          <label htmlFor="buttonText" className="block mb-1 flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-primary" />
            Texte du bouton d'action
          </label>
          <input
            id="buttonText"
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            placeholder="Ajouter au panier"
            className="w-full p-2 rounded bg-card text-card-foreground border border-input"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Personnalisez le texte du bouton d'action affiché sur la fiche produit.
          </p>
        </div>

        <div className="flex space-x-2 pt-2">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center justify-center min-w-[120px] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {editingProduct ? 'Enregistrement...' : 'Ajout en cours...'}
              </>
            ) : (
              <>{editingProduct ? 'Enregistrer' : 'Ajouter le produit'}</>
            )}
          </button>
          
          {editingProduct && !isSubmitting && (
            <button 
              onClick={cancelEdit} 
              type="button"
              className="py-2 px-4 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
            >
              Annuler
            </button>
          )}
        </div>
      </div>
    </form>
  );
}