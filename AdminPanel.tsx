import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import SocialMediaSettings from './SocialMediaSettings';
import DeliverySettings from './DeliverySettings';
import ThemeSettings from './ThemeSettings';
import CategorySettings from './CategorySettings';
import { Product } from '@/lib/types';
import ProductTable from './ProductTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Info, Share2, ShoppingBag, Palette, Truck, LogOut, Settings, UserPlus, Users, Tags } from 'lucide-react';
import { PageBackground } from './PageBackground';
import { useThemeStore } from '@/lib/themeStore';
import { Link } from 'wouter';
import SiteTitle from './SiteTitle';
import { FaLock, FaEye, FaEyeSlash, FaCloudUploadAlt, FaUser, FaUserShield, FaUserPlus } from 'react-icons/fa';

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // États pour la gestion des utilisateurs
  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [userSuccess, setUserSuccess] = useState(false);
  const [users, setUsers] = useState<{id: number, username: string}[]>([]);
  const [showUserPassword, setShowUserPassword] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
      // Tenter de récupérer les utilisateurs depuis l'API
      const res = await axios.get('/api/users');
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs:', err);
      // Utiliser localStorage comme fallback si l'API n'est pas encore implémentée
      const savedUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
      setUsers(savedUsers);
    }
  };
  
  // Récupérer les produits et les utilisateurs au montage du composant
  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      // Supprimer le statut d'authentification du stockage local
      localStorage.removeItem('broly69_admin_auth');
      window.location.href = '/';
    }
  };


  
  // Handler pour changer le mot de passe
  const handleChangePassword = () => {
    // Réinitialiser les erreurs et le succès
    setPasswordError('');
    setPasswordSuccess(false);
    
    // Validation
    if (newPassword !== confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    // Enregistrer le nouveau mot de passe
    localStorage.setItem('admin_password', newPassword);
    setPasswordSuccess(true);
    
    // Réinitialiser les champs après succès
    setTimeout(() => {
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordModal(false);
      setPasswordSuccess(false);
    }, 1500);
  };
  
  // Handler pour ajouter un nouvel utilisateur
  const handleAddUser = async () => {
    // Réinitialiser les erreurs et le succès
    setUserError('');
    setUserSuccess(false);
    
    // Validation
    if (!username.trim()) {
      setUserError('Le nom d\'utilisateur est requis');
      return;
    }
    
    if (userPassword !== userConfirmPassword) {
      setUserError('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (userPassword.length < 6) {
      setUserError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    try {
      // Appeler l'API pour créer un nouvel utilisateur
      await axios.post('/api/users', {
        username: username,
        password: userPassword
      });
      
      // Afficher le message de succès
      setUserSuccess(true);
      
      // Actualiser la liste des utilisateurs
      fetchUsers();
      
      // Réinitialiser les champs après succès
      setTimeout(() => {
        setUsername('');
        setUserPassword('');
        setUserConfirmPassword('');
        setUserSuccess(false);
      }, 1500);
    } catch (error: any) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      if (error.response && error.response.data) {
        setUserError(error.response.data);
      } else {
        setUserError('Une erreur est survenue lors de la création de l\'utilisateur');
      }
    }
  };
  
  // Handler pour supprimer un utilisateur
  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        // Actualiser la liste des utilisateurs
        fetchUsers();
      } catch (error: any) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      }
    }
  };

  return (
    <>
      <PageBackground />
      
      <div className="relative z-10 min-h-screen pb-8">
        {/* Header avec titre et boutons */}
        <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 mb-8 p-5">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
              <SiteTitle className="text-2xl" textSize="2xl" />
              <div className="flex items-center text-green-500 text-xs">
                <span>ADMIN PANEL v2.0</span>
                <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <button className="px-4 py-2.5 bg-gray-800/80 hover:bg-gray-700 rounded-md flex items-center gap-2 border border-gray-700">
                  <Home className="h-4 w-4" />
                  <span>Retour au site</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      
        <div className="container mx-auto px-4">
          <Tabs defaultValue="home" className="space-y-8">
            <div className="mb-8 relative">
              <div className="overflow-x-auto pb-2" style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: '#374151 #1f2937'
              }}>
                <TabsList className="bg-gray-950 border border-gray-800 inline-flex min-w-max whitespace-nowrap rounded-lg p-1.5">
                  <TabsTrigger value="home" className="data-[state=active]:bg-yellow-600/90 data-[state=active]:text-white px-6 py-3 rounded-md">
                    <Home className="h-4 w-4 mr-3" />
                    <span className="font-medium">Accueil</span>
                  </TabsTrigger>
                  <TabsTrigger value="info" className="data-[state=active]:bg-yellow-600/90 data-[state=active]:text-white px-6 py-3 rounded-md">
                    <Info className="h-4 w-4 mr-3" />
                    <span className="font-medium">Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="social" className="data-[state=active]:bg-yellow-600/90 data-[state=active]:text-white px-6 py-3 rounded-md">
                    <Share2 className="h-4 w-4 mr-3" />
                    <span className="font-medium">Réseaux</span>
                  </TabsTrigger>
                  <TabsTrigger value="theme" className="data-[state=active]:bg-yellow-600/90 data-[state=active]:text-white px-6 py-3 rounded-md">
                    <Palette className="h-4 w-4 mr-3" />
                    <span className="font-medium">Thème</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-yellow-600/90 data-[state=active]:text-white px-6 py-3 rounded-md">
                    <Settings className="h-4 w-4 mr-3" />
                    <span className="font-medium">Paramètres</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            {/* Accueil Tab */}
            <TabsContent value="home" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1 bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-800">
                  <h2 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
                  </h2>
                  
                  <ProductForm 
                    editingProduct={editingProduct}
                    cancelEdit={handleCancelEdit}
                    onSave={() => {
                      setEditingProduct(null);
                      fetchProducts();
                    }}
                  />
                </div>
                
                {/* Product Management Section */}
                <div className="lg:col-span-2 bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-800">
                  <h2 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Gestion des produits
                  </h2>
                  
                  {isLoading ? (
                    <div className="p-4 text-center">Chargement des produits...</div>
                  ) : (
                    <ProductTable 
                      products={products} 
                      onEdit={handleEditClick} 
                      onDelete={handleDelete} 
                    />
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Info Tab */}
            <TabsContent value="info">
              <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-800">
                <DeliverySettings />
              </div>
            </TabsContent>
            
            {/* Réseaux Tab */}
            <TabsContent value="social">
              <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-800">
                <SocialMediaSettings />
              </div>
            </TabsContent>
            
            {/* Thème Tab */}
            <TabsContent value="theme">
              <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-800">
                <ThemeSettings />
              </div>
            </TabsContent>
            
            {/* Paramètres Tab */}
            <TabsContent value="settings">
              <div className="bg-gray-900/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Paramètres de sécurité
                </h2>
                
                <div className="space-y-6">
                  {/* Gestion du mot de passe */}
                  <div className="rounded-lg p-5 bg-gray-800/50 border border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">Mot de passe administrateur</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Modifiez le mot de passe de connexion au panneau d'administration
                        </p>
                      </div>
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md transition-colors"
                      >
                        <FaLock className="h-4 w-4" />
                        <span>Changer</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Gestion des utilisateurs administrateurs */}
                  <div className="rounded-lg p-5 bg-gray-800/50 border border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">Utilisateurs administrateurs</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Créez et gérez les utilisateurs qui peuvent accéder au panneau d'administration
                        </p>
                      </div>
                      <button
                        onClick={() => setShowUserModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md transition-colors"
                      >
                        <FaLock className="h-4 w-4" />
                        <span>Gérer</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Gestion des catégories */}
                  <div className="rounded-lg p-5 bg-gray-800/50 border border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-white flex items-center">
                          <Tags className="h-5 w-5 mr-2 text-yellow-400" />
                          Gestion des catégories
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Visualisez et supprimez les catégories de produits existantes
                        </p>
                      </div>
                    </div>
                    
                    <CategorySettings />
                  </div>
                  
                  {/* Déconnexion */}
                  <div className="rounded-lg p-5 bg-gray-800/50 border border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">Déconnexion</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Se déconnecter du panneau d'administration
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modal de gestion des utilisateurs */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Gestion des utilisateurs administrateurs</h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Liste des utilisateurs */}
                <div className="rounded-lg p-5 bg-gray-800/80 border border-gray-700">
                  <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-400" />
                    Utilisateurs actuels
                  </h4>
                  
                  {users.length > 0 ? (
                    <div className="space-y-3">
                      {users.map((user) => (
                        <div key={user.id} className="flex justify-between items-center p-3 bg-gray-900/80 rounded border border-gray-700">
                          <div className="flex items-center">
                            <FaUserShield className="h-5 w-5 text-blue-400 mr-3" />
                            <span>{user.username}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-4 bg-gray-900/80 rounded border border-gray-700 text-gray-400">
                      Aucun utilisateur administrateur n'a été créé
                    </div>
                  )}
                </div>
                
                {/* Formulaire d'ajout d'utilisateur */}
                <div className="rounded-lg p-5 bg-gray-800/80 border border-gray-700">
                  <h4 className="text-lg font-medium text-white mb-4 flex items-center">
                    <UserPlus className="h-5 w-5 mr-2 text-green-400" />
                    Ajouter un utilisateur
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">
                        Nom d'utilisateur
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Entrez le nom d'utilisateur"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="userPassword" className="block text-sm font-medium text-gray-200 mb-1">
                        Mot de passe
                      </label>
                      <div className="relative">
                        <input
                          type={showUserPassword ? "text" : "password"}
                          id="userPassword"
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent pr-10"
                          placeholder="Entrez le mot de passe"
                        />
                        <button
                          type="button"
                          onClick={() => setShowUserPassword(!showUserPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                        >
                          {showUserPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="confirmUserPassword" className="block text-sm font-medium text-gray-200 mb-1">
                        Confirmation du mot de passe
                      </label>
                      <input
                        type="password"
                        id="confirmUserPassword"
                        value={userConfirmPassword}
                        onChange={(e) => setUserConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Confirmez le mot de passe"
                      />
                    </div>
                    
                    {userError && (
                      <div className="p-3 bg-red-900/50 border border-red-800 rounded-md text-red-200 text-sm">
                        {userError}
                      </div>
                    )}
                    
                    {userSuccess && (
                      <div className="p-3 bg-green-900/50 border border-green-800 rounded-md text-green-200 text-sm">
                        Utilisateur créé avec succès !
                      </div>
                    )}
                    
                    <button
                      onClick={handleAddUser}
                      className="w-full py-2 px-4 bg-blue-700 hover:bg-blue-600 text-white rounded-md transition-colors flex items-center justify-center"
                    >
                      <FaUserPlus className="h-4 w-4 mr-2" />
                      <span>Ajouter l'utilisateur</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mt-4">
                <p>Note: Les utilisateurs administrateurs ont accès au panneau d'administration complet.</p>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-700 flex justify-end">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de changement de mot de passe */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <FaLock className="mr-2 text-green-500" /> Changer le mot de passe
              </h2>
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {passwordError && (
              <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded-md mb-4 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  {passwordError}
                </div>
              </div>
            )}
            
            {passwordSuccess && (
              <div className="bg-green-900/30 border border-green-800 text-green-400 px-4 py-3 rounded-md mb-4 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Mot de passe modifié avec succès!
                </div>
              </div>
            )}
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nouveau mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    placeholder="Minimum 6 caractères"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Confirmer le mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    placeholder="Répétez le mot de passe"
                  />
                  <button 
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-white"
              >
                Annuler
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}