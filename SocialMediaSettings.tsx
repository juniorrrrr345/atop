import { useState, useEffect } from 'react';
import { SocialMedia } from '@/lib/types';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Trash2, Plus, Save, RefreshCw } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function SocialMediaSettings() {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  // Fetch social media data
  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/social-media');
        setSocialMedia(response.data);
      } catch (error) {
        console.error("Failed to fetch social media:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les réseaux sociaux.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSocialMedia();
  }, [toast]);
  
  const handleAddSocialMedia = () => {
    const newSocialMedia: SocialMedia = {
      id: Date.now(), // Temporary ID
      platform: "Instagram",
      url: "",
      icon: "FaInstagram",
      displayOrder: socialMedia.length + 1,
      isActive: true,
      customName: ""
    };
    
    setSocialMedia([...socialMedia, newSocialMedia]);
  };
  
  const handleRemoveSocialMedia = (id: number) => {
    setSocialMedia(socialMedia.filter(sm => sm.id !== id));
  };
  
  const handleChangePlatform = (id: number, platform: string) => {
    setSocialMedia(socialMedia.map(sm => 
      sm.id === id ? { ...sm, platform, icon: getPlatformIcon(platform) } : sm
    ));
  };
  
  const handleChangeUrl = (id: number, url: string) => {
    setSocialMedia(socialMedia.map(sm => 
      sm.id === id ? { ...sm, url } : sm
    ));
  };
  
  const handleChangeCustomName = (id: number, customName: string) => {
    setSocialMedia(socialMedia.map(sm => 
      sm.id === id ? { ...sm, customName } : sm
    ));
  };
  
  const handleChangeCustomLogo = async (id: number, file: File | null) => {
    if (!file) return;
    
    try {
      // Ajouter un indicateur de chargement
      toast({
        title: "Téléchargement en cours...",
        description: "Veuillez patienter pendant le téléchargement du logo.",
      });
      
      const formData = new FormData();
      formData.append('media', file);
      
      console.log("Tentative de téléchargement du logo pour le réseau social ID:", id);
      console.log("Nom du fichier:", file.name, "Type:", file.type, "Taille:", file.size);
      
      // Upload the image
      const response = await axios.post('/api/upload', formData);
      
      if (response.data && response.data.url) {
        console.log("Logo téléchargé avec succès:", response.data.url);
        
        // Update the customLogo field for this social media item
        setSocialMedia(socialMedia.map(sm => 
          sm.id === id ? { ...sm, customLogo: response.data.url } : sm
        ));
        
        // Afficher un toast de succès
        toast({
          title: "Logo téléchargé",
          description: "Le logo personnalisé a été téléchargé avec succès. N'oubliez pas de cliquer sur 'Enregistrer' pour sauvegarder les modifications.",
          variant: "default"
        });
      } else {
        console.error("Réponse incomplète du serveur:", response.data);
        toast({
          title: "Erreur",
          description: "Le serveur n'a pas renvoyé l'URL du logo téléchargé.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Failed to upload logo:", error);
      
      // Afficher un message d'erreur plus détaillé
      let errorMessage = "Impossible de télécharger le logo personnalisé.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage += ` Erreur: ${error.response.status} - ${error.response.statusText}`;
      }
      
      toast({
        title: "Erreur de téléchargement",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };
  
  const handleToggleActive = (id: number) => {
    setSocialMedia(socialMedia.map(sm => 
      sm.id === id ? { ...sm, isActive: !sm.isActive } : sm
    ));
  };
  
  const saveSocialMedia = async () => {
    setIsSaving(true);
    
    try {
      // First handle deletes (we'll track which items we keep)
      const currentIds = socialMedia.map(sm => sm.id);
      
      // Get current data from API to find which ones to delete
      const response = await axios.get('/api/social-media');
      const existingItems = response.data as SocialMedia[];
      
      // Find IDs to delete (existing IDs that are not in our current list)
      for (const item of existingItems) {
        if (!currentIds.includes(item.id)) {
          // Delete this item as it's no longer in our list
          await axios.delete(`/api/social-media/${item.id}`);
        }
      }
      
      // Now handle updates and creates
      for (const item of socialMedia) {
        // Check if it's an existing item with a valid number ID
        const existingItem = existingItems.find(exItem => exItem.id === item.id);
        
        if (existingItem) {
          // Update existing item
          await axios.put(`/api/social-media/${item.id}`, item);
        } else {
          // Create new item (replace temporary ID with proper one)
          const newItem = {
            platform: item.platform,
            url: item.url,
            icon: item.icon,
            displayOrder: item.displayOrder,
            isActive: item.isActive,
            customName: item.customName || "",
            customLogo: item.customLogo || ""
          };
          
          await axios.post('/api/social-media', newItem);
        }
      }
      
      // Refresh the data
      const refreshResponse = await axios.get('/api/social-media');
      setSocialMedia(refreshResponse.data);
      
      toast({
        title: "Réseaux sociaux mis à jour",
        description: "Les modifications ont été enregistrées avec succès.",
      });
    } catch (error) {
      console.error("Failed to save social media:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les réseaux sociaux.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Helper to get platform icon based on platform name
  const getPlatformIcon = (platform: string): string => {
    const iconMap: Record<string, string> = {
      'Facebook': 'FaFacebook',
      'Twitter': 'FaTwitter',
      'Instagram': 'FaInstagram',
      'LinkedIn': 'FaLinkedin',
      'YouTube': 'FaYoutube',
      'TikTok': 'FaTiktok',
      'Snapchat': 'FaSnapchat',
      'Pinterest': 'FaPinterest',
      'Discord': 'FaDiscord',
      'Twitch': 'FaTwitch',
      'Reddit': 'FaReddit',
      'GitHub': 'FaGithub',
      'Telegram': 'FaTelegram'
    };
    
    return iconMap[platform] || 'FaGlobe';
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }
  
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle>Réseaux Sociaux</CardTitle>
        <CardDescription>
          Gérez les réseaux sociaux qui apparaissent dans le pied de page
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {socialMedia.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 p-5 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="w-full md:w-1/3">
                    <label className="text-xs text-gray-400 mb-1 block">Plateforme</label>
                    <Select 
                      defaultValue={item.platform}
                      onValueChange={(value) => handleChangePlatform(item.id, value)}
                    >
                      <SelectTrigger className="bg-gray-900 border-gray-700">
                        <SelectValue placeholder="Plateforme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                        <SelectItem value="Snapchat">Snapchat</SelectItem>
                        <SelectItem value="Discord">Discord</SelectItem>
                        <SelectItem value="Telegram">Telegram</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Pinterest">Pinterest</SelectItem>
                        <SelectItem value="Reddit">Reddit</SelectItem>
                        <SelectItem value="GitHub">GitHub</SelectItem>
                        <SelectItem value="Twitch">Twitch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1">
                    <label className="text-xs text-gray-400 mb-1 block">URL</label>
                    <Input
                      placeholder="URL du réseau social"
                      value={item.url}
                      onChange={(e) => handleChangeUrl(item.id, e.target.value)}
                      className="bg-gray-900 border-gray-700"
                    />
                  </div>
                  
                  <div className="flex items-center gap-4 md:pt-6">
                    <div className="flex items-center gap-2 bg-gray-900/60 px-3 py-2 rounded-md">
                      <span className="text-sm font-medium">Actif</span>
                      <Switch 
                        checked={item.isActive}
                        onCheckedChange={() => handleToggleActive(item.id)}
                      />
                    </div>
                    
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleRemoveSocialMedia(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="w-full">
                  <label className="text-xs text-gray-400 mb-1 block">Nom personnalisé (optionnel)</label>
                  <Input
                    placeholder="Nom personnalisé pour ce réseau social"
                    value={item.customName || ""}
                    onChange={(e) => handleChangeCustomName(item.id, e.target.value)}
                    className="bg-gray-900 border-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Si renseigné, ce nom s'affichera à la place du nom de la plateforme
                  </p>
                </div>
                
                <div className="w-full">
                  <label className="text-xs text-gray-400 mb-1 block">Logo personnalisé (optionnel)</label>
                  <div className="flex items-center gap-4">
                    {item.customLogo && (
                      <div className="w-12 h-12 border border-gray-700 rounded overflow-hidden">
                        <img 
                          src={item.customLogo} 
                          alt={`Logo ${item.customName || item.platform}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleChangeCustomLogo(item.id, e.target.files?.[0] || null)}
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Si renseigné, ce logo s'affichera à la place de l'icône standard
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {socialMedia.length === 0 && (
            <div className="text-center p-8 text-gray-500">
              Aucun réseau social configuré
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleAddSocialMedia}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un réseau
        </Button>
        
        <Button 
          onClick={saveSocialMedia}
          disabled={isSaving}
        >
          {isSaving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Enregistrer
        </Button>
      </CardFooter>
    </Card>
  );
}