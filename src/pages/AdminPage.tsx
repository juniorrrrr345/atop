import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  Leaf,
  Shield,
  AlertTriangle,
  Upload,
  Link,
  Palette,
  Type,
  Image,
  ExternalLink,
  Save,
  X,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Smartphone
} from 'lucide-react';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [showAddProduct, setShowAddProduct] = useState(false);

  // États pour les réseaux sociaux
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    tiktok: '',
    whatsapp: '',
    telegram: ''
  });

  // États pour les textes de la boutique
  const [shopTexts, setShopTexts] = useState({
    siteName: 'CBD Shop Premium',
    welcomeTitle: 'Bienvenue dans notre boutique CBD',
    welcomeText: 'Découvrez nos produits CBD de qualité premium',
    aboutText: 'Notre boutique propose les meilleurs produits CBD...',
    legalNotice: 'Nos produits CBD contiennent moins de 0,2% de THC conformément à la législation française.'
  });

  // États pour les paramètres visuels
  const [visualSettings, setVisualSettings] = useState({
    logoUrl: '',
    logoUploadMethod: 'url', // 'url' ou 'upload'
    backgroundUrl: '',
    backgroundUploadMethod: 'url',
    primaryColor: '#10b981',
    secondaryColor: '#1f2937',
    accentColor: '#f59e0b'
  });

  // États pour le bouton de commande
  const [orderButton, setOrderButton] = useState({
    text: 'Commander maintenant',
    externalLink: '',
    useExternalLink: false
  });

  // Mock data pour les produits
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "CBD Oil Premium 10%",
      category: "Huiles CBD",
      price: 45.00,
      cbd: 10.0,
      thc: 0.15,
      stock: 25,
      status: 'active',
      description: 'Huile CBD de qualité premium'
    },
    {
      id: 2,
      name: "Fleurs CBD Amnesia",
      category: "Fleurs CBD",
      price: 12.00,
      cbd: 18.5,
      thc: 0.18,
      stock: 15,
      status: 'active',
      description: 'Fleurs CBD Amnesia de haute qualité'
    }
  ]);

  const tabs = [
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'design', label: 'Design & Logo', icon: Palette },
    { id: 'texts', label: 'Textes boutique', icon: Type },
    { id: 'social', label: 'Réseaux sociaux', icon: Smartphone },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  // Fonctions pour gérer l'upload d'images
  const handleImageUpload = (file: File, type: 'logo' | 'background') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'logo') {
        setVisualSettings(prev => ({ ...prev, logoUrl: result }));
      } else {
        setVisualSettings(prev => ({ ...prev, backgroundUrl: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Fonction pour sauvegarder les paramètres
  const saveSettings = async (type: string) => {
    try {
      // Ici on sauvegarderait en API
      console.log(`Sauvegarde ${type}:`, { socialLinks, shopTexts, visualSettings, orderButton });
      alert(`Paramètres ${type} sauvegardés avec succès !`);
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  // Composant pour le formulaire de produit
  const ProductForm = () => (
    <div className="bg-gray-800 p-6 rounded-lg space-y-4">
      <h3 className="text-xl font-bold mb-4 text-green-400">Ajouter un produit CBD</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nom du produit</label>
          <input 
            type="text" 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            placeholder="Ex: CBD Oil Premium 10%"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Catégorie</label>
          <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
            <option>Huiles CBD</option>
            <option>Fleurs CBD</option>
            <option>Résines CBD</option>
            <option>Comestibles</option>
            <option>Cosmétiques</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Prix (€)</label>
          <input 
            type="number" 
            step="0.01"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            placeholder="45.00"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Stock</label>
          <input 
            type="number" 
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            placeholder="25"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Taux CBD (%)</label>
          <input 
            type="number" 
            step="0.1"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            placeholder="10.0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Taux THC (%) - Max 0.2%</label>
          <input 
            type="number" 
            step="0.01"
            max="0.2"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
            placeholder="0.15"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Image du produit</label>
          <input 
            type="file"
            accept="image/*"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea 
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
          rows={3}
          placeholder="Description du produit CBD..."
        />
      </div>
      
      <div className="flex space-x-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
          Créer le produit
        </button>
        <button 
          onClick={() => setShowAddProduct(false)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          Annuler
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Leaf className="h-8 w-8 text-green-400" />
          <div>
            <h1 className="text-3xl font-bold">Administration CBD Shop</h1>
            <p className="text-gray-400">Gérez complètement votre boutique CBD</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800/50 rounded-lg p-1 mb-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gestion des Produits */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des Produits CBD</h2>
              <button 
                onClick={() => setShowAddProduct(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Ajouter un produit</span>
              </button>
            </div>

            {showAddProduct && <ProductForm />}

            <div className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">Nom</th>
                    <th className="px-6 py-3 text-left">Catégorie</th>
                    <th className="px-6 py-3 text-left">Prix</th>
                    <th className="px-6 py-3 text-left">CBD</th>
                    <th className="px-6 py-3 text-left">THC</th>
                    <th className="px-6 py-3 text-left">Stock</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-t border-gray-700">
                      <td className="px-6 py-4 font-medium">{product.name}</td>
                      <td className="px-6 py-4 text-gray-400">{product.category}</td>
                      <td className="px-6 py-4">{product.price}€</td>
                      <td className="px-6 py-4 text-green-400">{product.cbd}%</td>
                      <td className="px-6 py-4 text-orange-400">{product.thc}%</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded text-white">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 bg-red-600 hover:bg-red-700 rounded text-white">
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Design & Logo */}
        {activeTab === 'design' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Design & Apparence</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Logo */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Image className="h-5 w-5 mr-2 text-green-400" />
                  Logo de la boutique
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Méthode d'ajout</label>
                    <select 
                      value={visualSettings.logoUploadMethod}
                      onChange={(e) => setVisualSettings(prev => ({ ...prev, logoUploadMethod: e.target.value }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    >
                      <option value="url">Lien URL</option>
                      <option value="upload">Upload depuis téléphone</option>
                    </select>
                  </div>

                  {visualSettings.logoUploadMethod === 'url' ? (
                    <div>
                      <label className="block text-sm font-medium mb-2">URL du logo</label>
                      <input 
                        type="url"
                        value={visualSettings.logoUrl}
                        onChange={(e) => setVisualSettings(prev => ({ ...prev, logoUrl: e.target.value }))}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium mb-2">Upload logo</label>
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'logo')}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                  )}

                  {visualSettings.logoUrl && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-400 mb-2">Aperçu du logo :</p>
                      <img src={visualSettings.logoUrl} alt="Logo" className="max-h-24 rounded" />
                    </div>
                  )}
                </div>
              </div>

              {/* Background */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Palette className="h-5 w-5 mr-2 text-green-400" />
                  Fond du site
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Méthode d'ajout</label>
                    <select 
                      value={visualSettings.backgroundUploadMethod}
                      onChange={(e) => setVisualSettings(prev => ({ ...prev, backgroundUploadMethod: e.target.value }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    >
                      <option value="url">Lien URL</option>
                      <option value="upload">Upload depuis téléphone</option>
                    </select>
                  </div>

                  {visualSettings.backgroundUploadMethod === 'url' ? (
                    <div>
                      <label className="block text-sm font-medium mb-2">URL du fond</label>
                      <input 
                        type="url"
                        value={visualSettings.backgroundUrl}
                        onChange={(e) => setVisualSettings(prev => ({ ...prev, backgroundUrl: e.target.value }))}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        placeholder="https://example.com/background.jpg"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium mb-2">Upload fond</label>
                      <input 
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'background')}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Couleurs */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Couleurs du thème</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Couleur principale</label>
                    <input 
                      type="color"
                      value={visualSettings.primaryColor}
                      onChange={(e) => setVisualSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-full h-10 bg-gray-700 border border-gray-600 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Couleur secondaire</label>
                    <input 
                      type="color"
                      value={visualSettings.secondaryColor}
                      onChange={(e) => setVisualSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-full h-10 bg-gray-700 border border-gray-600 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Couleur d'accent</label>
                    <input 
                      type="color"
                      value={visualSettings.accentColor}
                      onChange={(e) => setVisualSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-full h-10 bg-gray-700 border border-gray-600 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Bouton de commande */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-green-400" />
                  Bouton de commande
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Texte du bouton</label>
                    <input 
                      type="text"
                      value={orderButton.text}
                      onChange={(e) => setOrderButton(prev => ({ ...prev, text: e.target.value }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      placeholder="Commander maintenant"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      checked={orderButton.useExternalLink}
                      onChange={(e) => setOrderButton(prev => ({ ...prev, useExternalLink: e.target.checked }))}
                      className="rounded"
                    />
                    <label className="text-sm">Utiliser un lien externe</label>
                  </div>

                  {orderButton.useExternalLink && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Lien externe</label>
                      <input 
                        type="url"
                        value={orderButton.externalLink}
                        onChange={(e) => setOrderButton(prev => ({ ...prev, externalLink: e.target.value }))}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        placeholder="https://example.com/commande"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button 
              onClick={() => saveSettings('design')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Sauvegarder le design</span>
            </button>
          </div>
        )}

        {/* Textes boutique */}
        {activeTab === 'texts' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Textes de la boutique</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Informations générales</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom du site</label>
                    <input 
                      type="text"
                      value={shopTexts.siteName}
                      onChange={(e) => setShopTexts(prev => ({ ...prev, siteName: e.target.value }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Titre de bienvenue</label>
                    <input 
                      type="text"
                      value={shopTexts.welcomeTitle}
                      onChange={(e) => setShopTexts(prev => ({ ...prev, welcomeTitle: e.target.value }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Texte de bienvenue</label>
                    <textarea 
                      value={shopTexts.welcomeText}
                      onChange={(e) => setShopTexts(prev => ({ ...prev, welcomeText: e.target.value }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Contenus détaillés</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">À propos de nous</label>
                    <textarea 
                      value={shopTexts.aboutText}
                      onChange={(e) => setShopTexts(prev => ({ ...prev, aboutText: e.target.value }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Mention légale</label>
                    <textarea 
                      value={shopTexts.legalNotice}
                      onChange={(e) => setShopTexts(prev => ({ ...prev, legalNotice: e.target.value }))}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => saveSettings('textes')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Sauvegarder les textes</span>
            </button>
          </div>
        )}

        {/* Réseaux sociaux */}
        {activeTab === 'social' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Réseaux sociaux</h2>
            <p className="text-gray-400">Configurez vos liens de réseaux sociaux. Ils apparaîtront sous forme d'icônes cliquables.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Facebook */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <Facebook className="h-6 w-6 text-blue-500" />
                  <h3 className="text-lg font-bold">Facebook</h3>
                </div>
                <input 
                  type="url"
                  value={socialLinks.facebook}
                  onChange={(e) => setSocialLinks(prev => ({ ...prev, facebook: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="https://facebook.com/votre-page"
                />
              </div>

              {/* Instagram */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <Instagram className="h-6 w-6 text-pink-500" />
                  <h3 className="text-lg font-bold">Instagram</h3>
                </div>
                <input 
                  type="url"
                  value={socialLinks.instagram}
                  onChange={(e) => setSocialLinks(prev => ({ ...prev, instagram: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="https://instagram.com/votre-compte"
                />
              </div>

              {/* Twitter */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <Twitter className="h-6 w-6 text-blue-400" />
                  <h3 className="text-lg font-bold">Twitter</h3>
                </div>
                <input 
                  type="url"
                  value={socialLinks.twitter}
                  onChange={(e) => setSocialLinks(prev => ({ ...prev, twitter: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="https://twitter.com/votre-compte"
                />
              </div>

              {/* YouTube */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <Youtube className="h-6 w-6 text-red-500" />
                  <h3 className="text-lg font-bold">YouTube</h3>
                </div>
                <input 
                  type="url"
                  value={socialLinks.youtube}
                  onChange={(e) => setSocialLinks(prev => ({ ...prev, youtube: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="https://youtube.com/votre-chaine"
                />
              </div>

                             {/* TikTok */}
               <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                 <div className="flex items-center space-x-3 mb-4">
                   <Smartphone className="h-6 w-6 text-white" />
                   <h3 className="text-lg font-bold">TikTok</h3>
                 </div>
                 <input 
                   type="url"
                   value={socialLinks.tiktok}
                   onChange={(e) => setSocialLinks(prev => ({ ...prev, tiktok: e.target.value }))}
                   className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                   placeholder="https://tiktok.com/@votre-compte"
                 />
               </div>

              {/* WhatsApp */}
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <Smartphone className="h-6 w-6 text-green-500" />
                  <h3 className="text-lg font-bold">WhatsApp</h3>
                </div>
                <input 
                  type="tel"
                  value={socialLinks.whatsapp}
                  onChange={(e) => setSocialLinks(prev => ({ ...prev, whatsapp: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="+33123456789"
                />
                <p className="text-xs text-gray-400 mt-1">Numéro de téléphone avec indicatif pays</p>
              </div>
            </div>

            {/* Aperçu des réseaux */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-bold mb-4">Aperçu des réseaux sociaux</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" 
                     className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                    <Facebook className="h-5 w-5" />
                    <span>Facebook</span>
                  </a>
                )}
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                     className="flex items-center space-x-2 bg-pink-600 px-4 py-2 rounded-lg hover:bg-pink-700">
                    <Instagram className="h-5 w-5" />
                    <span>Instagram</span>
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                     className="flex items-center space-x-2 bg-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500">
                    <Twitter className="h-5 w-5" />
                    <span>Twitter</span>
                  </a>
                )}
                {socialLinks.youtube && (
                  <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                     className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
                    <Youtube className="h-5 w-5" />
                    <span>YouTube</span>
                  </a>
                )}
                                 {socialLinks.tiktok && (
                   <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
                     <Smartphone className="h-5 w-5" />
                     <span>TikTok</span>
                   </a>
                 )}
                {socialLinks.whatsapp && (
                  <a href={`https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                     className="flex items-center space-x-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700">
                    <Smartphone className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            <button 
              onClick={() => saveSettings('réseaux sociaux')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Sauvegarder les réseaux</span>
            </button>
          </div>
        )}

        {/* Paramètres */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Paramètres avancés</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="h-5 w-5 text-green-400" />
                  <h3 className="text-xl font-bold">Conformité Légale</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Limite THC autorisée (%)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      defaultValue="0.2"
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                    <p className="text-xs text-gray-400 mt-1">Limite légale française: 0.2%</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Âge minimum</label>
                    <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                      <option value="18">18 ans</option>
                      <option value="21">21 ans</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Paramètres Boutique</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Devise</label>
                    <select className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                      <option value="EUR">Euro (€)</option>
                      <option value="USD">Dollar ($)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Taux de TVA (%)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      defaultValue="20"
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Mode maintenance</label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Activer le mode maintenance</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-300">Attention - Conformité CBD</h4>
                  <p className="text-sm text-amber-200 mt-1">
                    Assurez-vous que tous vos produits respectent la législation en vigueur. 
                    Le taux de THC ne doit pas dépasser 0,2% en France.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={() => saveSettings('paramètres')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Sauvegarder</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Exporter les données</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;