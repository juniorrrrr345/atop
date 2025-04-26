import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface BackgroundUploadProps {
  onUploadComplete: (url: string, type: 'image' | 'video' | 'gif') => void;
  type: 'image' | 'video' | 'gif';
  accept: string;
}

export default function BackgroundUpload({ onUploadComplete, type, accept }: BackgroundUploadProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append('background', file);
    formData.append('backgroundType', type);

    setUploading(true);
    setProgress(0);

    try {
      const response = await axios.put('/api/site-settings/background', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          }
        },
      });

      if (response.data && response.data.backgroundUrl) {
        toast({
          title: 'Succès',
          description: `Arrière-plan ${type} téléchargé avec succès !`,
          variant: 'default',
        });

        onUploadComplete(response.data.backgroundUrl, type);
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement :', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de télécharger le fichier.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept={accept}
        onChange={handleUpload}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
        disabled={uploading}
      />
      <div className={`relative border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 transition-colors ${uploading ? 'pointer-events-none' : ''}`}>
        <Upload className="mx-auto h-8 w-8 text-gray-500 mb-2" />
        <p className="text-sm text-gray-400">
          {uploading ? `Téléchargement en cours (${progress}%)` : `Cliquez pour ajouter un ${type === 'image' ? 'arrière-plan' : type === 'gif' ? 'GIF animé' : 'arrière-plan vidéo'}`}
        </p>
        
        {uploading && (
          <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}