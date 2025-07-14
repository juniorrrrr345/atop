import React, { useState } from 'react';
import { 
  Package, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  Leaf,
  Shield,
  AlertTriangle,
  Upload,
  Image,
  Video,
  Type,
  Palette,
  Save,
  X
} from 'lucide-react';
import Logo from '../../Logo';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showMediaUpload, setShowMediaUpload] = useState(false);

  // États pour la gestion des textes
  const [siteTexts, setSiteTexts] = useState({
    siteName: 'CBD Store',
    heroTitle: 'Boutique CBD',
    heroSubtitle: 'Premium & Légal',
    heroDescription: 'Découvrez notre sélection exclusive de produits CBD de haute qualité, 100% légaux et conformes à la réglementation française.',
    featuredTitle: 'Produits Vedettes',
    featuredDescription: 'Nos meilleures sélections de produits CBD',
    benefitsTitle: 'Pourquoi nous choisir ?',
    legalNoticeTitle: 'Avertissement Légal',
    legalNoticeText: 'Nos produits CBD contiennent moins de 0,2% de THC conformément à la législation française. Réservé aux adultes de plus de 18 ans.',
    contactEmail: 'contact@cbdstore.fr',
    contactPhone: '+33 1 23 45 67 89',
    deliveryInfo: 'Livraison gratuite à partir de 50€',
    supportHours: '24/7'
  });

  // États pour les produits
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'oils',
    cbd: '',
    thc: '',
    images: [] as File[],
    videos: [] as File[]
  });

  // Mock data pour le dashboard
  const stats = {
    totalProducts: 47,
    totalOrders: 128,
    totalCustomers: 89,
    monthlyRevenue: 12450
  };

  const mockProducts = [
    {
      id: 1,
      name: "CBD Oil Premium 10%",
      category: "Huiles CBD",
      price: 45.00,
      cbd: 10.0,
      thc: 0.15,
      stock: 25,
      status: 'active',
      images: ['/api/placeholder/300/300'],
      videos: []
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
      images: ['/api/placeholder/300/300'],
      videos: []
    },
    {
      id: 3,
      name: "Résine CBD Hash",
      category: "Résines CBD",
      price: 25.00,
      cbd: 22.0,
      thc: 0.20,
      stock: 8,
      status: 'active',
      images: ['/api/placeholder/300/300'],
      videos: []
    }
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'texts', label: 'Textes', icon: Type },
    { id: 'media', label: 'Médias', icon: Image },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const categories = [
    { id: 'oils', name: 'Huiles CBD' },
    { id: 'flowers', name: 'Fleurs CBD' },
    { id: 'resins', name: 'Résines CBD' },
    { id: 'edibles', name: 'Comestibles' },
    { id: 'cosmetics', name: 'Cosmétiques' }
  ];

  const handleTextSave = () => {
    // Ici on sauvegarderait les textes dans la base de données
    console.log('Textes sauvegardés:', siteTexts);
    alert('Textes mis à jour avec succès !');
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici on sauvegarderait le produit
    console.log('Nouveau produit:', productForm);
    setShowAddProduct(false);
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: 'oils',
      cbd: '',
      thc: '',
      images: [],
      videos: []
    });
    alert('Produit ajouté avec succès !');
  };

  const handleFileUpload = (files: FileList | null, type: 'images' | 'videos') => {
    if (files) {
      const fileArray = Array.from(files);
      setProductForm(prev => ({
        ...prev,
        [type]: [...prev[type], ...fileArray]
      }));
    }
  };

  // Dashboard Component
  const Dashboard = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bw-text-gradient">Dashboard</h2>
        <Logo size="md" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Produits', value: stats.totalProducts, icon: Package, color: 'text-accent' },
          { label: 'Commandes', value: stats.totalOrders, icon: Shield, color: 'text-primary' },
          { label: 'Clients', value: stats.totalCustomers, icon: Users, color: 'text-accent' },
          { label: 'Revenus (€)', value: stats.monthlyRevenue, icon: Leaf, color: 'text-primary' }
        ].map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 bw-hover-effect">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Produits récents</h3>
        <div className="space-y-4">
          {mockProducts.slice(0, 3).map((product) => (
            <div key={product.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{product.price.toFixed(2)}€</p>
                <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Products Management Component
  const ProductsManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bw-text-gradient">Gestion des Produits</h2>
        <button 
          onClick={() => setShowAddProduct(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Ajouter un produit</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold">Liste des produits</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium">Produit</th>
                <th className="text-left p-4 font-medium">Prix</th>
                <th className="text-left p-4 font-medium">CBD/THC</th>
                <th className="text-left p-4 font-medium">Stock</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product) => (
                <tr key={product.id} className="border-b border-border">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                        <Leaf className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">{product.price.toFixed(2)}€</td>
                  <td className="p-4">
                    <span className="text-sm">CBD: {product.cbd}% / THC: {product.thc}%</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 10 ? 'bg-accent/20 text-accent' : 'bg-destructive/20 text-destructive'
                    }`}>
                      {product.stock} unités
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-destructive hover:text-destructive/80 transition-colors">
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
    </div>
  );

  // Text Editor Component
  const TextEditor = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bw-text-gradient">Gestion des Textes</h2>
        <button onClick={handleTextSave} className="btn-primary flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Sauvegarder</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page d'accueil */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold mb-4 flex items-center space-x-2">
            <Type className="h-5 w-5" />
            <span>Page d'accueil</span>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre principal</label>
              <input
                type="text"
                value={siteTexts.heroTitle}
                onChange={(e) => setSiteTexts({...siteTexts, heroTitle: e.target.value})}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sous-titre</label>
              <input
                type="text"
                value={siteTexts.heroSubtitle}
                onChange={(e) => setSiteTexts({...siteTexts, heroSubtitle: e.target.value})}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={siteTexts.heroDescription}
                onChange={(e) => setSiteTexts({...siteTexts, heroDescription: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Titre produits vedettes</label>
              <input
                type="text"
                value={siteTexts.featuredTitle}
                onChange={(e) => setSiteTexts({...siteTexts, featuredTitle: e.target.value})}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* Informations légales */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold mb-4 flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Informations légales</span>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre avertissement</label>
              <input
                type="text"
                value={siteTexts.legalNoticeTitle}
                onChange={(e) => setSiteTexts({...siteTexts, legalNoticeTitle: e.target.value})}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Texte légal</label>
              <textarea
                value={siteTexts.legalNoticeText}
                onChange={(e) => setSiteTexts({...siteTexts, legalNoticeText: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold mb-4 flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Informations de contact</span>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={siteTexts.contactEmail}
                onChange={(e) => setSiteTexts({...siteTexts, contactEmail: e.target.value})}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Téléphone</label>
              <input
                type="tel"
                value={siteTexts.contactPhone}
                onChange={(e) => setSiteTexts({...siteTexts, contactPhone: e.target.value})}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Info livraison</label>
              <input
                type="text"
                value={siteTexts.deliveryInfo}
                onChange={(e) => setSiteTexts({...siteTexts, deliveryInfo: e.target.value})}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border p-6 min-h-screen">
          <div className="mb-8">
            <Logo size="lg" />
            <p className="text-accent text-sm font-mono tracking-wider mt-2">
              ADMIN PANEL v3.0
            </p>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
                  activeTab === tab.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'products' && <ProductsManagement />}
          {activeTab === 'texts' && <TextEditor />}
          {activeTab === 'media' && (
            <div className="text-center py-20">
              <Image className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">Gestion des médias</h3>
              <p className="text-muted-foreground">Fonctionnalité en développement</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="text-center py-20">
              <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">Paramètres</h3>
              <p className="text-muted-foreground">Fonctionnalité en développement</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Ajouter un produit</h3>
              <button 
                onClick={() => setShowAddProduct(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom du produit</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Prix (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Catégorie</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Taux CBD (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={productForm.cbd}
                    onChange={(e) => setProductForm({...productForm, cbd: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Taux THC (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    max="0.2"
                    required
                    value={productForm.thc}
                    onChange={(e) => setProductForm({...productForm, thc: e.target.value})}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files, 'images')}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  />
                  {productForm.images.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {productForm.images.length} image(s) sélectionnée(s)
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Vidéos</label>
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e.target.files, 'videos')}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-accent"
                  />
                  {productForm.videos.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {productForm.videos.length} vidéo(s) sélectionnée(s)
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="btn-secondary"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Créer le produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;