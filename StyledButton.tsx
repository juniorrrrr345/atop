import { useThemeStore } from '@/lib/themeStore';
import { Button } from '@/components/ui/button';
import { ButtonHTMLAttributes, forwardRef, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

// Custom type for button style options
type ButtonStyleType = 'default' | 'rounded' | 'pill' | 'gradient';

// Define props excluding native style to avoid conflict
interface StyledButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  buttonStyle?: ButtonStyleType | CSSProperties; // Renamed from style to buttonStyle
}

export const StyledButton = forwardRef<HTMLButtonElement, StyledButtonProps>(
  ({ className, variant, buttonStyle: customButtonStyle, ...props }, ref) => {
    // Récupérer le style de bouton depuis le thème
    const { buttonStyle: themeButtonStyle, primaryColor, secondaryColor } = useThemeStore();
    
    // Utiliser le style passé en prop ou celui du thème
    const styleToUse = customButtonStyle || themeButtonStyle;
    
    // Déterminer les classes en fonction du style de bouton
    let buttonClasses = '';
    let styleObj = {} as CSSProperties;
    
    if (typeof styleToUse === 'object') {
      // Si c'est un objet CSS direct, on l'utilise tel quel
      styleObj = styleToUse as CSSProperties;
    } else {
      // Sinon c'est une des valeurs prédéfinies
      switch (styleToUse) {
        case 'rounded':
          buttonClasses = 'rounded-xl';
          break;
        case 'pill':
          buttonClasses = 'rounded-full';
          break;
        case 'gradient':
          buttonClasses = 'bg-gradient-to-r rounded-lg';
          styleObj = {
            backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
            border: 'none'
          };
          break;
        default:
          buttonClasses = '';
      }
    }
    
    return (
      <Button
        className={cn(buttonClasses, className)}
        style={styleObj}
        variant={variant}
        ref={ref}
        {...props}
      />
    );
  }
);

StyledButton.displayName = 'StyledButton';