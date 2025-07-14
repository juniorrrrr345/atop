import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Home, Package, Info, Phone, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/showcase', icon: Package, label: 'Produits' },
    { path: '/infos', icon: Info, label: 'Infos CBD' },
    { path: '/contact', icon: Phone, label: 'Contact' },
    { path: '/admin', icon: Settings, label: 'Admin' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-green-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold cbd-text-gradient">CBD Shop Premium</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      isActive(item.path)
                        ? 'bg-green-500/20 text-green-300'
                        : 'text-gray-300 hover:text-green-300 hover:bg-green-500/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-green-500/20">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'text-green-300'
                    : 'text-gray-400 hover:text-green-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Legal Notice */}
      <div className="bg-red-900/20 border-t border-red-500/20 p-2">
        <p className="text-center text-xs text-red-300">
          ⚠️ Produits CBD légaux - THC ≤ 0.2% - Réservé aux adultes (+18 ans) - Ne pas conduire après consommation
        </p>
      </div>
    </div>
  );
};

export default Layout;