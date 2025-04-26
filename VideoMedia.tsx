import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, X, Pause, Eye } from 'lucide-react';
import { useThemeStore } from '@/lib/themeStore';

// Créer un cache global pour les miniatures vidéo
const videoThumbnailCache: Record<string, string> = {};

// Gestionnaire global de l'état de lecture pour garantir qu'une seule vidéo joue à la fois
type VideoPlayerState = {
  activeVideoUrl: string | null;
  setActiveVideo: (url: string | null) => void;
};

// Singleton pour gérer l'état du lecteur vidéo actif
const VideoPlayerManager: VideoPlayerState = {
  activeVideoUrl: null,
  setActiveVideo(url: string | null) {
    // Fermer toute vidéo active précédente
    if (this.activeVideoUrl && this.activeVideoUrl !== url) {
      // Émettre un événement pour notifier tous les composants vidéo
      window.dispatchEvent(new CustomEvent('video-player-close', {
        detail: { previousUrl: this.activeVideoUrl }
      }));
    }
    this.activeVideoUrl = url;
  }
};

interface VideoMediaProps {
  videoUrl: string;
  productName: string;
  thumbnailStyle?: 'card' | 'drawer';
}

export default function VideoMedia({ videoUrl, productName, thumbnailStyle = 'card' }: VideoMediaProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [spoilerActive, setSpoilerActive] = useState(false); // Désactivé par défaut
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { primaryColor } = useThemeStore();
  
  // Gestionnaire pour afficher/masquer la vidéo
  const handleToggleVideo = () => {
    if (!showVideo) {
      // Si on affiche la vidéo, l'enregistrer comme active
      VideoPlayerManager.setActiveVideo(videoUrl);
      setShowVideo(true);
    } else {
      // Si on la ferme, la retirer du gestionnaire
      VideoPlayerManager.setActiveVideo(null);
      setShowVideo(false);
      
      // Réinitialiser l'état de lecture
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  };
  
  // Gérer la lecture/pause
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Écouter les événements de fermeture globaux
  useEffect(() => {
    const handleVideoClose = (e: CustomEvent) => {
      // Vérifier si c'est cette instance qui doit se fermer
      if (e.detail.previousUrl === videoUrl && showVideo) {
        setShowVideo(false);
        setIsPlaying(false);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }
    };

    // Écouter l'événement personnalisé
    window.addEventListener('video-player-close', handleVideoClose as EventListener);
    
    return () => {
      window.removeEventListener('video-player-close', handleVideoClose as EventListener);
    };
  }, [videoUrl, showVideo]);
  
  // Mettre à jour l'état de lecture quand la vidéo joue/pause naturellement
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoRef]);

  // Système de génération et de cache de miniatures optimisé
  useEffect(() => {
    // Si la miniature est déjà dans le cache global, l'utiliser immédiatement
    if (videoThumbnailCache[videoUrl]) {
      setThumbnailUrl(videoThumbnailCache[videoUrl]);
      return;
    }
    
    // Sinon, générer une miniature avec un seul élément vidéo
    let isMounted = true;
    
    try {
      // On utilise un élément vidéo unique partagé pour toutes les miniatures
      const sharedVideoId = 'shared-thumbnail-generator';
      let hiddenVideo = document.getElementById(sharedVideoId) as HTMLVideoElement;
      
      // Si l'élément n'existe pas encore, le créer
      if (!hiddenVideo) {
        hiddenVideo = document.createElement('video');
        hiddenVideo.style.display = 'none';
        hiddenVideo.id = sharedVideoId;
        hiddenVideo.preload = 'metadata';
        document.body.appendChild(hiddenVideo);
      }
      
      // Utiliser la vidéo partagée pour générer la miniature
      hiddenVideo.muted = true; // Assurer que la vidéo est muette
      hiddenVideo.playsInline = true; // Nécessaire sur iOS
      hiddenVideo.crossOrigin = "anonymous"; // Pour éviter les erreurs CORS
      hiddenVideo.src = videoUrl;
      hiddenVideo.setAttribute('data-current-url', videoUrl);
      
      const generateThumbnail = () => {
        if (!isMounted) return;
        
        try {
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = hiddenVideo.videoWidth || 320;
            canvas.height = hiddenVideo.videoHeight || 180;
            
            const ctx = canvas.getContext('2d');
            if (ctx) {
              // Définir un timeout pour s'assurer que nous ne restons pas bloqués
              const timeoutId = setTimeout(() => {
                if (isMounted) {
                  // Utiliser une couleur par défaut si la génération de miniature échoue
                  console.warn("Timeout lors de la génération de la miniature");
                  // Créer une miniature par défaut avec le canvas
                  if (canvasRef.current && ctx) {
                    // Remplir avec un dégradé
                    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                    gradient.addColorStop(0, "#1e293b");
                    gradient.addColorStop(1, "#0f172a");
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    // Dessiner un icone de lecture au centre
                    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
                    ctx.beginPath();
                    ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, 2 * Math.PI);
                    ctx.fill();
                    
                    ctx.fillStyle = "white";
                    ctx.beginPath();
                    ctx.moveTo(canvas.width / 2 - 10, canvas.height / 2 - 15);
                    ctx.lineTo(canvas.width / 2 + 20, canvas.height / 2);
                    ctx.lineTo(canvas.width / 2 - 10, canvas.height / 2 + 15);
                    ctx.closePath();
                    ctx.fill();
                    
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    videoThumbnailCache[videoUrl] = dataUrl;
                    setThumbnailUrl(dataUrl);
                  }
                }
              }, 5000);
              
              // Essayer de définir un moment dans la vidéo pour la miniature
              try {
                hiddenVideo.currentTime = 1.0; // Prendre un peu plus loin dans la vidéo
                
                const handleSeeked = () => {
                  if (!isMounted) return;
                  clearTimeout(timeoutId);
                  
                  try {
                    ctx.drawImage(hiddenVideo, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    
                    // Mettre en cache la miniature
                    videoThumbnailCache[videoUrl] = dataUrl;
                    setThumbnailUrl(dataUrl);
                  } catch (err) {
                    console.error("Erreur lors de la création de la miniature", err);
                  }
                  
                  // Nettoyer les événements
                  hiddenVideo.removeEventListener('seeked', handleSeeked);
                };
                
                hiddenVideo.addEventListener('seeked', handleSeeked, { once: true });
              } catch (err) {
                console.error("Erreur lors de la définition du temps de la vidéo", err);
                clearTimeout(timeoutId);
              }
            }
          }
        } catch (err) {
          console.error("Erreur lors de la génération de la miniature", err);
        }
      };
      
      const handleError = (e: Event) => {
        console.error("Erreur lors du chargement de la vidéo pour la miniature", e);
        
        // Créer une miniature par défaut en cas d'erreur
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          canvas.width = 320;
          canvas.height = 180;
          
          const ctx = canvas.getContext('2d');
          if (ctx) {
            // Remplir avec un dégradé
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "#1e293b");
            gradient.addColorStop(1, "#0f172a");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Dessiner un icone de lecture au centre
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 - 10, canvas.height / 2 - 15);
            ctx.lineTo(canvas.width / 2 + 20, canvas.height / 2);
            ctx.lineTo(canvas.width / 2 - 10, canvas.height / 2 + 15);
            ctx.closePath();
            ctx.fill();
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            videoThumbnailCache[videoUrl] = dataUrl;
            setThumbnailUrl(dataUrl);
          }
        }
      };
      
      hiddenVideo.addEventListener('loadeddata', generateThumbnail, { once: true });
      hiddenVideo.addEventListener('error', handleError, { once: true });
      
      return () => {
        isMounted = false;
        if (hiddenVideo) {
          hiddenVideo.removeEventListener('loadeddata', generateThumbnail);
          hiddenVideo.removeEventListener('error', handleError);
        }
      };
    } catch (error) {
      console.error("Erreur globale dans la génération de miniature", error);
      return () => { isMounted = false; };
    }
  }, [videoUrl]);

  // Nouveau comportement pour ProductDrawer : lecture directe en drawer mode
  const isDrawerMode = thumbnailStyle === 'drawer';
  
  // Fonction pour désactiver le spoiler
  const handleRevealContent = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher le clic de propager au parent
    setSpoilerActive(false);
  };

  return (
    <div className="relative w-full h-full">
      {/* Canvas pour la génération de miniature */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {/* Vignette de vidéo cliquable */}
      <div 
        className="w-full h-full relative overflow-hidden rounded-lg cursor-pointer"
        onClick={handleToggleVideo}
      >
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
            <Play className="w-10 h-10 text-white/50" />
          </div>
        )}
        
        {/* Badge vidéo en haut à gauche */}
        <div className="absolute top-2 left-2 bg-blue-600/70 text-white px-1.5 py-0.5 rounded text-xs font-medium z-10 flex items-center">
          <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          </svg>
          Vidéo
        </div>
        
        {/* Icône de lecture au centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/30 p-3 rounded-full">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Lecteur vidéo en mode plein écran quand activé */}
      {showVideo && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Bouton fermer */}
          <button
            onClick={handleToggleVideo}
            className="absolute top-4 right-4 z-50 p-1.5 rounded-full bg-black/70 text-white hover:bg-black"
            aria-label="Fermer la vidéo"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Vidéo avec contrôles */}
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              playsInline
              autoPlay
              controls
              controlsList="nodownload"
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/quicktime" />
              <source src={videoUrl} type="video/webm" />
              <track kind="captions" src="" label="Français" />
              Votre navigateur ne prend pas en charge la lecture de vidéos.
            </video>
          </div>
        </motion.div>
      )}
    </div>
  );
}