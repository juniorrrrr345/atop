import { useState, useEffect } from 'react';
import { FaShippingFast, FaBox, FaHandshake, FaInfo, FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaSnapchat, FaGithub } from 'react-icons/fa';
import axios from 'axios';
import { SocialMedia } from '../lib/types';
import { useTheme } from './ThemeProvider';

export default function NewFooter() {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  // Fetch social media data from the API
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/social-media');
        if (response.data) {
          setSocialMedia(response.data.filter((sm: SocialMedia) => sm.isActive));
        }
      } catch (error) {
        console.error('Error fetching social media:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSocialMedia();
  }, []);

  // Get icon component based on platform
  const getSocialIcon = (platform: string) => {
    const iconMap: {[key: string]: JSX.Element} = {
      'Facebook': <FaFacebook className="text-blue-500" />,
      'Twitter': <FaTwitter className="text-blue-400" />,
      'Instagram': <FaInstagram className="text-pink-500" />,
      'YouTube': <FaYoutube className="text-red-500" />,
      'Snapchat': <FaSnapchat className="text-yellow-400" />,
      'GitHub': <FaGithub className="text-purple-400" />
    };
    
    return iconMap[platform] || <FaInfo />;
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-3 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0">
          {/* Information Section */}
          <div className="md:w-1/2 flex justify-center">
            <div className="flex space-x-4 text-xs">
              <div className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors cursor-pointer group">
                <FaShippingFast className="group-hover:animate-pulse" />
                <span>Livraisons</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors cursor-pointer group">
                <FaBox className="group-hover:animate-pulse" />
                <span>Colis</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors cursor-pointer group">
                <FaHandshake className="group-hover:animate-pulse" />
                <span>Meetup</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors cursor-pointer group">
                <FaInfo className="group-hover:animate-pulse" />
                <span>Légal</span>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="md:w-1/2 flex justify-center">
            <div className="flex space-x-3">
              {!loading && socialMedia.map((social) => (
                <a 
                  key={social.id}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 hover:bg-gray-700 transition-all transform hover:scale-110"
                  title={social.customName || social.platform}
                >
                  {social.customLogo ? (
                    <img 
                      src={social.customLogo} 
                      alt={social.customName || social.platform}
                      className="h-5 w-5 object-contain"
                    />
                  ) : (
                    getSocialIcon(social.platform)
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-[10px] pt-1">
          © {currentYear} {theme.siteName || 'Broly69'}
        </div>
      </div>
    </div>
  );
}