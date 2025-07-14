import React from 'react';
import { 
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Smartphone,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

const SocialPage: React.FC = () => {
  // Ces données viendraient normalement du panneau admin
  const socialLinks = {
    facebook: 'https://facebook.com/cbdshop',
    instagram: 'https://instagram.com/cbdshop',
    twitter: 'https://twitter.com/cbdshop',
    youtube: 'https://youtube.com/cbdshop',
    tiktok: 'https://tiktok.com/@cbdshop',
    whatsapp: '+33123456789',
    telegram: '@cbdshop'
  };

  const contactInfo = {
    phone: '+33 1 23 45 67 89',
    email: 'contact@cbdshop.fr',
    address: '123 Rue du CBD, 75001 Paris',
    hours: 'Lun-Ven: 9h-18h, Sam: 10h-16h'
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: socialLinks.facebook,
      description: 'Suivez-nous sur Facebook pour nos dernières actualités et promotions',
      color: 'bg-blue-600 hover:bg-blue-700',
      followers: '2.5K'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: socialLinks.instagram,
      description: 'Découvrez nos produits en images et notre quotidien',
      color: 'bg-pink-600 hover:bg-pink-700',
      followers: '4.2K'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: socialLinks.twitter,
      description: 'Restez informés de nos nouveautés et conseils CBD',
      color: 'bg-blue-400 hover:bg-blue-500',
      followers: '1.8K'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: socialLinks.youtube,
      description: 'Guides, tutoriels et conseils sur nos produits CBD',
      color: 'bg-red-600 hover:bg-red-700',
      followers: '892'
    },
    {
      name: 'TikTok',
      icon: Smartphone,
      url: socialLinks.tiktok,
      description: 'Contenu divertissant et éducatif sur le CBD',
      color: 'bg-gray-800 hover:bg-gray-700',
      followers: '3.1K'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, '')}`,
      description: 'Contactez-nous directement pour vos questions',
      color: 'bg-green-600 hover:bg-green-700',
      followers: 'Support'
    }
  ];

  const handleSocialClick = (url: string, platform: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    console.log(`Clic sur ${platform}: ${url}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Rejoignez notre communauté
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Suivez-nous sur nos réseaux sociaux pour rester informé de nos nouveautés, 
            bénéficier de promotions exclusives et découvrir l'univers du CBD.
          </p>
        </div>

        {/* Réseaux sociaux principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {socialPlatforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <div
                key={platform.name}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${platform.color} transition-colors`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{platform.name}</h3>
                      <p className="text-sm text-gray-400">{platform.followers} abonnés</p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400" />
                </div>
                
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                  {platform.description}
                </p>
                
                <button
                  onClick={() => handleSocialClick(platform.url, platform.name)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${platform.color} text-white flex items-center justify-center space-x-2`}
                >
                  <span>Suivre sur {platform.name}</span>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Section contact direct */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-green-400">
            Vous préférez nous contacter directement ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-600 p-4 rounded-lg mx-auto w-fit mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-medium mb-2">Téléphone</h3>
              <a 
                href={`tel:${contactInfo.phone}`}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                {contactInfo.phone}
              </a>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 p-4 rounded-lg mx-auto w-fit mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-medium mb-2">Email</h3>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {contactInfo.email}
              </a>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600 p-4 rounded-lg mx-auto w-fit mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-medium mb-2">Adresse</h3>
              <p className="text-gray-300 text-sm">{contactInfo.address}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-600 p-4 rounded-lg mx-auto w-fit mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-medium mb-2">Horaires</h3>
              <p className="text-gray-300 text-sm">{contactInfo.hours}</p>
            </div>
          </div>
        </div>

        {/* Contact rapide WhatsApp */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4">Besoin d'aide immédiate ?</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Contactez-nous sur WhatsApp pour obtenir une réponse rapide à vos questions 
            sur nos produits CBD et bénéficier de conseils personnalisés.
          </p>
          
          <button
            onClick={() => handleSocialClick(
              `https://wa.me/${socialLinks.whatsapp.replace(/[^0-9]/g, '')}?text=Bonjour, j'aimerais en savoir plus sur vos produits CBD`,
              'WhatsApp'
            )}
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Discuter sur WhatsApp</span>
          </button>
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
          <h3 className="text-2xl font-bold mb-4">Restez connectés !</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités, 
            promotions exclusives et conseils CBD directement dans votre boîte mail.
          </p>
          
          <div className="max-w-md mx-auto flex space-x-3">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              S'inscrire
            </button>
          </div>
          
          <p className="text-xs text-gray-400 mt-3">
            Nous respectons votre vie privée. Désabonnement possible à tout moment.
          </p>
        </div>

        {/* Call to action social */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4">Suivez-nous sur tous nos réseaux</h3>
          <div className="flex justify-center space-x-4">
            {socialPlatforms.slice(0, 5).map((platform) => {
              const IconComponent = platform.icon;
              return (
                <button
                  key={platform.name}
                  onClick={() => handleSocialClick(platform.url, platform.name)}
                  className={`p-3 rounded-full ${platform.color} transition-all duration-300 hover:transform hover:scale-110`}
                  title={`Suivre sur ${platform.name}`}
                >
                  <IconComponent className="h-5 w-5 text-white" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPage;