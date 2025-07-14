import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Leaf, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="relative">
              <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text">
                404
              </h1>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Leaf className="h-16 w-16 md:h-24 md:w-24 text-green-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Page introuvable</h2>
            <p className="text-xl text-gray-300 mb-6">
              Oups ! Il semble que cette page se soit envolée en fumée... 
              comme nos produits CBD de qualité premium !
            </p>
            <p className="text-gray-400">
              La page que vous recherchez n'existe pas ou a été déplacée. 
              Mais ne vous inquiétez pas, nos produits CBD sont toujours là !
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors inline-flex items-center space-x-2"
            >
              <Home className="h-5 w-5" />
              <span>Retour à l'accueil</span>
            </Link>
            
            <Link
              to="/showcase"
              className="border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors inline-flex items-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Voir nos produits</span>
            </Link>
          </div>

          {/* Popular Links */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h3 className="text-xl font-bold mb-6 text-green-400">Liens populaires</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/showcase"
                className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="bg-green-600 p-2 rounded">
                  <Search className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Nos Produits</div>
                  <div className="text-sm text-gray-400">Découvrez notre gamme CBD</div>
                </div>
              </Link>
              
              <Link
                to="/infos"
                className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="bg-blue-600 p-2 rounded">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Infos CBD</div>
                  <div className="text-sm text-gray-400">Tout savoir sur le CBD</div>
                </div>
              </Link>
              
              <Link
                to="/reseaux"
                className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="bg-purple-600 p-2 rounded">
                  <Home className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Nos Réseaux</div>
                  <div className="text-sm text-gray-400">Suivez-nous en ligne</div>
                </div>
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-left w-full"
              >
                <div className="bg-gray-600 p-2 rounded">
                  <ArrowLeft className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Page précédente</div>
                  <div className="text-sm text-gray-400">Retourner en arrière</div>
                </div>
              </button>
            </div>
          </div>

          {/* Fun CBD Fact */}
          <div className="mt-12 bg-green-900/20 border border-green-500/30 rounded-lg p-6">
            <h4 className="font-semibold text-green-300 mb-2">Le saviez-vous ?</h4>
            <p className="text-sm text-green-200">
              Le CBD (cannabidiol) est l'un des plus de 100 cannabinoïdes présents dans la plante de cannabis. 
              Contrairement au THC, il n'a pas d'effet psychoactif et est parfaitement légal en France 
              lorsque le taux de THC est inférieur à 0,2% !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;