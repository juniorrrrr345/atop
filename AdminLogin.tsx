import { useState, useEffect } from 'react';
import { FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaUser } from 'react-icons/fa';
import { PageBackground } from './PageBackground';
import { useThemeStore } from '@/lib/themeStore';
import SiteTitle from './SiteTitle';
import axios from 'axios';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const { siteName, loadTheme } = useThemeStore();
  
  // Animation d'apparition et chargement du thème et du logo
  useEffect(() => {
    setIsMounted(true);
    loadTheme();
    fetchSiteSettings();
  }, [loadTheme]);
  
  // Récupérer les paramètres du site, notamment le logo
  const fetchSiteSettings = async () => {
    try {
      const response = await axios.get('/api/site-settings');
      if (response.data && response.data.logoUrl) {
        setLogoUrl(response.data.logoUrl);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des paramètres du site:", error);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Vérification du nom d'utilisateur
    if (!username.trim()) {
      setError('Veuillez entrer un nom d\'utilisateur');
      setIsLoading(false);
      return;
    }
    
    try {
      // Appel à l'API d'authentification
      const response = await axios.post('/api/login', { 
        username: username.trim(), 
        password 
      });
      
      console.log('Login response:', response);
      
      // Si la connexion réussit (status 200 ou 201), on appelle onLogin
      if (response.status === 200 || response.status === 201) {
        // Stockage de l'ID utilisateur et du nom d'utilisateur en session
        if (response.data && response.data.user) {
          localStorage.setItem('user_id', response.data.user.id);
          localStorage.setItem('username', response.data.user.username);
        }
        
        // Appel de la fonction de connexion pour rediriger vers le panel admin
        onLogin();
      }
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      
      // Gestion des erreurs de l'API
      if (error.response) {
        // Le serveur a répondu avec un code d'erreur
        if (error.response.status === 401) {
          setError('Identifiants incorrects. Veuillez réessayer.');
        } else {
          setError(error.response.data?.message || 'Erreur lors de la connexion');
        }
      } else if (error.request) {
        // Pas de réponse du serveur
        setError('Erreur réseau. Veuillez réessayer plus tard.');
      } else {
        // Autre erreur
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
      
      setPassword('');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <PageBackground />
      <div 
        className={`transition-all duration-700 ease-out transform ${
          isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } w-full max-w-md relative z-10`}
      >
        {/* En-tête de page avec logo si disponible */}
        <div className="flex flex-col items-center mb-8">
          {logoUrl ? (
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-gray-800 shadow-xl">
              <img 
                src={logoUrl} 
                alt={siteName || "Logo du site"} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-800 mb-4 flex items-center justify-center shadow-xl border-4 border-gray-700">
              <span className="text-4xl font-bold text-blue-500">
                {siteName && siteName.length > 0 ? siteName.charAt(0).toUpperCase() : "B"}
              </span>
            </div>
          )}
          
          <SiteTitle className="mb-1" textSize="3xl" />
          <div className="flex items-center text-green-500 text-xs mt-1">
            <span>ADMIN PANEL v2.0</span>
            <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
          </div>
        </div>
        
        {/* Formulaire de connexion */}
        <form 
          onSubmit={handleSubmit}
          className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-xl"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gray-800 mx-auto flex items-center justify-center">
              <FaShieldAlt className="text-blue-400 text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-white mt-4">
              Accès Sécurisé
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Veuillez entrer vos identifiants administrateur
            </p>
          </div>
          
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-3 rounded-md mb-6 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                {error}
              </div>
            </div>
          )}
          
          {/* Champ Utilisateur */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaUser className="text-blue-500" />
            </div>
            <input
              type="text"
              className="bg-gray-800/70 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-4"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          {/* Champ Mot de passe */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaLock className="text-blue-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="bg-gray-800/70 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-4"
              placeholder="Mot de passe admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <button 
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-4 rounded-lg transition-all ${
              isLoading ? 'opacity-80 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Vérification...
              </span>
            ) : (
              'Accéder au panel'
            )}
          </button>
        </form>
      </div>
      
      {/* Effets d'arrière-plan stylisés */}
      <div className="fixed top-0 right-0 h-full w-1/2 bg-blue-900/10 blur-3xl -z-10"></div>
      <div className="fixed bottom-0 inset-x-0 h-64 bg-gradient-to-t from-blue-900/20 to-transparent -z-10"></div>
    </div>
  );
}