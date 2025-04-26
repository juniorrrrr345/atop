import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { FaShippingFast, FaBox, FaHandshake, FaInfo, FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaSnapchat, FaGithub } from 'react-icons/fa';
import axios from 'axios';
import { SocialMedia } from '@/lib/types';

export default function FooterInfo() {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch social media data from the API with auto-refresh for synchronization
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/social-media');
        setSocialMedia(response.data.filter((sm: SocialMedia) => sm.isActive));
      } catch (error) {
        console.error('Error fetching social media:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Première requête immédiate
    fetchSocialMedia();
    
    // Rafraîchissement automatique toutes les 3 secondes pour assurer la synchronisation
    const intervalId = setInterval(fetchSocialMedia, 3000);
    
    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, []);

  // Get icon component based on platform
  const getSocialIcon = (platform: string) => {
    const iconMap: {[key: string]: JSX.Element} = {
      'Facebook': <FaFacebook />,
      'Twitter': <FaTwitter />,
      'Instagram': <FaInstagram />,
      'YouTube': <FaYoutube />,
      'Snapchat': <FaSnapchat />,
      'GitHub': <FaGithub />
    };
    
    return iconMap[platform] || <FaInfo />;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 pt-12 pb-4 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Information Column */}
          <div>
            <h3 className="text-gray-300 font-bold mb-3 text-sm">Informations</h3>
            <ul className="text-gray-500 space-y-2">
              <li className="flex items-center gap-2 hover:text-blue-500 transition-colors cursor-pointer">
                <FaShippingFast /> <span>Livraisons</span>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-500 transition-colors cursor-pointer">
                <FaBox /> <span>Envoi de colis</span>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-500 transition-colors cursor-pointer">
                <FaHandshake /> <span>Meetup</span>
              </li>
              <li className="flex items-center gap-2 hover:text-blue-500 transition-colors cursor-pointer">
                <FaInfo /> <span>Mentions légales</span>
              </li>
            </ul>
          </div>
          
          {/* Social Media Column */}
          <div>
            <h3 className="text-gray-300 font-bold mb-3 text-sm">Réseaux Sociaux</h3>
            {loading ? (
              <div className="text-gray-500">Chargement...</div>
            ) : socialMedia.length > 0 ? (
              <ul className="text-gray-500 space-y-2">
                {socialMedia.map((social) => (
                  <li key={social.id} className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <a 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      {getSocialIcon(social.platform)} <span>{social.customName || social.platform}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">Aucun réseau social configuré</div>
            )}
          </div>
          
          {/* Empty Third Column for balance */}
          <div>
            {/* Intentionally left empty */}
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-sm border-t border-gray-800 pt-4">
          © {currentYear} Broly69. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}