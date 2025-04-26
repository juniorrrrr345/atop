import { useState, useEffect } from 'react';
import { FaHome, FaInfoCircle, FaComments } from 'react-icons/fa';
import { Link, useLocation } from 'wouter';

export default function BottomNav() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState(location);
  const [isPressed, setIsPressed] = useState<string | null>(null);
  
  // Skip rendering on admin page
  if (location.includes('/admin')) {
    return null;
  }
  
  // Synchronize activeTab with location
  useEffect(() => {
    setActiveTab(location);
  }, [location]);
  
  // Handle button press animations
  const handlePressStart = (tab: string) => {
    setIsPressed(tab);
  };
  
  const handlePressEnd = () => {
    setTimeout(() => {
      setIsPressed(null);
    }, 200); // Short delay to make the effect visible
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 z-50">
      {/* Blue line indicators under active tab */}
      <div className="flex justify-around items-center">
        <div className={`w-1/3 flex justify-center`}>
          <div className={`h-1 w-full max-w-[40px] ${location === '/' ? 'bg-blue-400' : 'bg-transparent'} transition-all duration-300`}></div>
        </div>
        <div className={`w-1/3 flex justify-center`}>
          <div className={`h-1 w-full max-w-[40px] ${location === '/infos' ? 'bg-blue-400' : 'bg-transparent'} transition-all duration-300`}></div>
        </div>
        <div className={`w-1/3 flex justify-center`}>
          <div className={`h-1 w-full max-w-[40px] ${location === '/canal' ? 'bg-blue-400' : 'bg-transparent'} transition-all duration-300`}></div>
        </div>
      </div>
      
      {/* Navigation buttons with press effect */}
      <div className="flex justify-around py-3 border-t border-gray-800/50">
        {/* Home Button */}
        <Link href="/">
          <div 
            className={`flex flex-col items-center w-16 cursor-pointer transition-transform duration-200 ${isPressed === '/' ? 'scale-90' : 'scale-100'}`}
            onTouchStart={() => handlePressStart('/')}
            onTouchEnd={handlePressEnd}
            onMouseDown={() => handlePressStart('/')}
            onMouseUp={handlePressEnd}
            onMouseLeave={() => isPressed === '/' && handlePressEnd()}
          >
            <FaHome className={`text-xl ${location === '/' ? 'text-blue-400' : 'text-blue-400/40'} transition-colors duration-300`} />
            <span className={`text-xs mt-1 ${location === '/' ? 'text-blue-400' : 'text-blue-400/40'} transition-colors duration-300`}>Menu</span>
          </div>
        </Link>
        
        {/* Info Button */}
        <Link href="/infos">
          <div 
            className={`flex flex-col items-center w-16 cursor-pointer transition-transform duration-200 ${isPressed === '/infos' ? 'scale-90' : 'scale-100'}`}
            onTouchStart={() => handlePressStart('/infos')}
            onTouchEnd={handlePressEnd}
            onMouseDown={() => handlePressStart('/infos')}
            onMouseUp={handlePressEnd}
            onMouseLeave={() => isPressed === '/infos' && handlePressEnd()}
          >
            <FaInfoCircle className={`text-xl ${location === '/infos' ? 'text-blue-400' : 'text-blue-400/40'} transition-colors duration-300`} />
            <span className={`text-xs mt-1 ${location === '/infos' ? 'text-blue-400' : 'text-blue-400/40'} transition-colors duration-300`}>Infos</span>
          </div>
        </Link>
        
        {/* Canal Button */}
        <Link href="/canal">
          <div 
            className={`flex flex-col items-center w-16 cursor-pointer transition-transform duration-200 ${isPressed === '/canal' ? 'scale-90' : 'scale-100'}`}
            onTouchStart={() => handlePressStart('/canal')}
            onTouchEnd={handlePressEnd}
            onMouseDown={() => handlePressStart('/canal')}
            onMouseUp={handlePressEnd}
            onMouseLeave={() => isPressed === '/canal' && handlePressEnd()}
          >
            <FaComments className={`text-xl ${location === '/canal' ? 'text-blue-400' : 'text-blue-400/40'} transition-colors duration-300`} />
            <span className={`text-xs mt-1 ${location === '/canal' ? 'text-blue-400' : 'text-blue-400/40'} transition-colors duration-300`}>Canal</span>
          </div>
        </Link>
      </div>
    </div>
  );
}