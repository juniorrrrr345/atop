import { useState, useEffect } from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaSnapchat, FaGithub } from 'react-icons/fa';
import axios from 'axios';
import { SocialMedia } from '@shared/schema';
import { useTheme } from './ThemeProvider';

export default function AdminFooter() {
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
    
    return iconMap[platform] || null;
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-12 pt-4 border-t border-gray-800">
      <div className="container mx-auto">
        {/* Social Media Section */}
        <div className="flex justify-center mb-2">
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
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>
        
        <div className="text-center text-gray-500 text-xs pb-2">
          © {currentYear} {theme.siteName || 'Broly69'} - Panel Administrateur
        </div>
      </div>
    </div>
  );
}