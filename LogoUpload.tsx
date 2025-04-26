import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud } from 'lucide-react';

interface LogoUploadProps {
  onUploadComplete: (url: string) => void;
}

export default function LogoUpload({ onUploadComplete }: LogoUploadProps) {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Vérifier le type de fichier (image uniquement)
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Type de fichier non supporté",
          description: "Veuillez sélectionner une image (PNG, JPG, GIF, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      // Vérifier la taille du fichier (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "L'image doit faire moins de 2MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Aucun fichier sélectionné",
        description: "Veuillez sélectionner une image à télécharger",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('logo', selectedFile);

    try {
      const response = await axios.put('/api/site-settings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
      });

      if (response.data && response.data.logoUrl) {
        onUploadComplete(response.data.logoUrl);
        toast({
          title: "Téléchargement réussi",
          description: "Le logo a été mis à jour avec succès",
          variant: "default",
        });
        setSelectedFile(null);
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement du logo:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Impossible de télécharger le logo. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          id="logo-upload"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="flex-1"
          disabled={uploading}
        />
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap"
        >
          <UploadCloud className="h-4 w-4" />
          {uploading ? `${uploadProgress}%` : 'Télécharger'}
        </Button>
      </div>
      
      {selectedFile && (
        <div className="text-sm text-gray-400">
          Fichier sélectionné: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
        </div>
      )}
      
      {uploading && (
        <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-blue-500 h-full rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
}