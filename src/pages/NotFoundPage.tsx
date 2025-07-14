import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Leaf, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        {/* 404 Visual */}
        <div className="relative">
          <div className="text-8xl font-bold text-green-400/20 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Leaf className="h-16 w-16 text-green-400 animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Page introuvable</h1>
          <p className="text-gray-400">
            Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* CBD Themed Message */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="h-5 w-5 text-green-400" />
            <span className="font-semibold text-green-300">Pas de panique !</span>
          </div>
          <p className="text-sm text-green-200">
            Comme nos produits CBD, cette erreur est temporaire. 
            Retournez à l'accueil et découvrez notre gamme premium.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Home className="h-4 w-4" />
            Retour à l'accueil
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Page précédente
          </button>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <p className="text-sm text-gray-400">Liens utiles :</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/showcase" className="text-green-400 hover:text-green-300 text-sm">
              Nos produits
            </Link>
            <span className="text-gray-600">•</span>
            <Link to="/infos" className="text-green-400 hover:text-green-300 text-sm">
              Infos CBD
            </Link>
            <span className="text-gray-600">•</span>
            <Link to="/contact" className="text-green-400 hover:text-green-300 text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;