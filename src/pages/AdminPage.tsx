import React, { useState } from 'react';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  Leaf,
  Shield,
  AlertTriangle
} from 'lucide-react';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Mock data for dashboard
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
      status: 'active'
    },
    {
      id: 2,
      name: "Fleurs CBD Amnesia",
      category: "Fleurs CBD",
      price: 12.00,
      cbd: 18.5,
      thc: 0.18,
      stock: 15,
      status: 'active'
    },
    {
      id: 3,
      name: "Résine CBD Hash",
      category: "Résines CBD",
      price: 25.00,
      cbd: 22.0,
      thc: 0.20,
      stock: 8,
      status: 'active'
    }
  ];

  const mockOrders = [
    {
      id: 1001,
      customer: "Marie Dupont",
      total: 67.50,
      status: 'pending',
      date: "2024-01-15"
    },
    {
      id: 1002,
      customer: "Pierre Martin",
      total: 45.00,
      status: 'shipped',
      date: "2024-01-14"
    }
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart },
    { id: 'customers', label: 'Clients', icon: Users },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'shipped': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      case 'active': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const ProductForm = () => (
    <div className="bg-gray-800 p-6 rounded-lg space-y-4">
      <h3 className="text-xl font-bold mb-4">Ajouter un produit CBD</h3>
      
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Leaf className="h-8 w-8 text-green-400" />
        <div>
          <h1 className="text-3xl font-bold">Administration CBD Shop</h1>
          <p className="text-gray-400">Gérez votre boutique CBD en toute simplicité</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800/50 rounded-lg p-1 mb-8">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
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

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Produits</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-green-400" />
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Commandes</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Clients</p>
                  <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">CA Mensuel</p>
                  <p className="text-2xl font-bold">{stats.monthlyRevenue.toLocaleString()}€</p>
                </div>
                <BarChart3 className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Commandes récentes</h3>
              <div className="space-y-3">
                {mockOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium">#{order.id}</p>
                      <p className="text-sm text-gray-400">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{order.total}€</p>
                      <span className={`text-xs px-2 py-1 rounded text-white ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Produits populaires</h3>
              <div className="space-y-3">
                {mockProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-400">Stock: {product.stock}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{product.price}€</p>
                      <p className="text-sm text-green-400">CBD: {product.cbd}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products */}
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
                {mockProducts.map((product) => (
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

      {/* Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Paramètres CBD</h2>
          
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
                
                <div>
                  <label className="block text-sm font-medium mb-2">Avertissement légal</label>
                  <textarea 
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    rows={3}
                    defaultValue="Nos produits CBD contiennent moins de 0,2% de THC conformément à la législation française."
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Paramètres Boutique</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom de la boutique</label>
                  <input 
                    type="text" 
                    defaultValue="CBD Shop Premium"
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
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
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
              Sauvegarder les paramètres
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
              Exporter les données
            </button>
          </div>
        </div>
      )}

      {/* Orders and Customers tabs would be similar to products */}
      {activeTab === 'orders' && (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400">Gestion des Commandes</h3>
          <p className="text-gray-500">Interface en développement</p>
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400">Gestion des Clients</h3>
          <p className="text-gray-500">Interface en développement</p>
        </div>
      )}
    </div>
  );
};

export default AdminPage;