import { useThemeStore } from '@/lib/themeStore';
import { useEffect, useState } from 'react';

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedTitle({ children, className = '' }: AnimatedTitleProps) {
  const { 
    primaryColor, 
    secondaryColor, 
    accentColor, 
    titleEffect, 
    animationSpeed 
  } = useThemeStore();
  
  const [currentColor, setCurrentColor] = useState(primaryColor);
  const colors = [primaryColor, secondaryColor, accentColor];
  
  // Animation effect for color changing
  useEffect(() => {
    if (titleEffect === 'gradient') return; // Don't animate when gradient effect is used
    
    const interval = setInterval(() => {
      setCurrentColor(prevColor => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 3000 / (animationSpeed / 100)); // Adjust speed based on animationSpeed
    
    return () => clearInterval(interval);
  }, [primaryColor, secondaryColor, accentColor, titleEffect, animationSpeed, colors]);
  
  // Styles based on the effect
  let style: React.CSSProperties = { color: currentColor };
  let effectClass = '';
  
  if (titleEffect === 'glow') {
    effectClass = 'animate-pulse';
    style = { 
      ...style, 
      textShadow: `0 0 10px ${currentColor}`,
      animationDuration: `${2000 / (animationSpeed / 100)}ms`
    };
  } else if (titleEffect === 'shadow') {
    style = { 
      ...style, 
      textShadow: `0 0 10px ${currentColor}`
    };
  } else if (titleEffect === 'gradient') {
    effectClass = 'gradient-text';
    style = {
      backgroundImage: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`,
      animationDuration: `${8000 / (animationSpeed / 100)}ms`
    };
  }
  
  return (
    <span 
      className={`${effectClass} ${className}`} 
      style={style}
    >
      {children}
    </span>
  );
}