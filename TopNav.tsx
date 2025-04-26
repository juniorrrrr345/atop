import { Link } from 'wouter';
import SiteTitle from './SiteTitle';
import { useThemeStore } from '@/lib/themeStore';

interface TopNavProps {
  activeView: 'admin' | 'vitrine';
}

export default function TopNav({ activeView }: TopNavProps) {
  const { titleEffect, primaryColor } = useThemeStore();
  
  // Classes pour les effets de titre
  const getTitleEffectClass = () => {
    switch (titleEffect) {
      case 'glow':
        return 'animate-pulse';
      case 'shadow':
        return 'drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]';
      case 'gradient':
        return 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400';
      default:
        return '';
    }
  };
  
  return (
    <div className="flex justify-between items-center">
      {/* Logo / Titre du site */}
      <Link href="/">
        <SiteTitle 
          className={`uppercase tracking-wider cursor-pointer ${getTitleEffectClass()}`} 
          textSize="3xl"
        />
      </Link>
      
      <div className="flex items-center gap-2">
        {/* Theme indicator - Only show in admin view */}
        {activeView === 'admin' && (
          <div className="flex items-center space-x-2 bg-gray-800/80 px-4 py-2 rounded-lg">
            <span style={{ color: primaryColor }} className="font-mono text-xs">PANEL v2.0</span>
            <span 
              className="inline-block w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: primaryColor }}
            ></span>
          </div>
        )}
        
        {/* Admin link in vitrine view */}
        {activeView === 'vitrine' && (
          <Link href="/admin" className="text-white flex items-center gap-2 px-3 py-2 bg-gray-800/80 hover:bg-gray-700 rounded-lg transition-colors text-sm">
            <span>Admin</span>
          </Link>
        )}
        
        {/* Vitrine link in admin view */}
        {activeView === 'admin' && (
          <Link href="/" className="text-white flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm">
            <span>Vitrine</span>
          </Link>
        )}
      </div>
    </div>
  );
}