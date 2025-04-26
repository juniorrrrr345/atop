import DeliveryInfo from './DeliveryInfo';
import FooterInfo from './FooterInfo';
import { useTheme } from './ThemeProvider';

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className="mt-12 pt-12 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Menu Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <a href="#livraisons" className="text-gray-300 hover:text-blue-400 transition-colors">
            Livraisons
          </a>
          <a href="#envoi-colis" className="text-gray-300 hover:text-blue-400 transition-colors">
            Envoi de colis
          </a>
          <a href="#meetup" className="text-gray-300 hover:text-blue-400 transition-colors">
            Meetup
          </a>
          <a href="#mentions-legales" className="text-gray-300 hover:text-blue-400 transition-colors">
            Mentions légales
          </a>
        </div>
        
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">© 2023 {theme.siteName || 'Broly69'}. Tous droits réservés.</p>
          </div>
          
          {/* Updated with FooterInfo links */}
          <div className="flex space-x-4 text-gray-500">
            <p className="text-xs">Développé par <span className="text-blue-400">DLDP</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
