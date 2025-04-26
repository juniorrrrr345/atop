import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, RefreshCw, Plus, X } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Separator } from "@/components/ui/separator";

interface DeliveryInfoItem {
  id: number;
  title: string;
  description: string;
  type: 'delivery' | 'meetup' | 'hours' | 'notice';
  isActive: boolean;
  customName: string; // Nom personnalisé pour le type (ex: "Retrait en boutique" au lieu de "meetup")
}

export default function DeliverySettings() {
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Omit<DeliveryInfoItem, 'id'>>({
    title: '',
    description: '',
    type: 'meetup',
    isActive: true,
    customName: '' // Champ pour le nom personnalisé
  });
  const { toast } = useToast();
  
  useEffect(() => {
    // Load delivery info settings from API
    const fetchDeliveryInfo = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/delivery-info');
        if (Array.isArray(response.data)) {
          setDeliveryInfo(response.data);
        } else {
          console.error('Delivery info data is not an array:', response.data);
          setDeliveryInfo([]);
        }
      } catch (error) {
        console.error('Error fetching delivery info:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les informations de livraison.",
          variant: "destructive",
        });
        setDeliveryInfo([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDeliveryInfo();
  }, []);
  
  const handleChange = (id: number, field: keyof DeliveryInfoItem, value: any) => {
    setDeliveryInfo(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  
  const handleSave = async () => {
    setSaving(true);
    
    try {
      // Save each delivery info item using API
      const updatePromises = deliveryInfo.map(item => {
        return axios.put(`/api/delivery-info/${item.id}`, {
          title: item.title,
          description: item.description,
          type: item.type,
          isActive: item.isActive,
          customName: item.customName || '' // Ajout du nom personnalisé
        });
      });
      
      await Promise.all(updatePromises);
      
      // Success notification
      toast({
        title: "Informations mises à jour",
        description: "Les informations de livraison ont été enregistrées avec succès.",
      });
    } catch (error) {
      console.error("Error saving delivery info:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des informations.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
  // Fonction pour ajouter un nouvel élément d'information
  const handleAddNewItem = async () => {
    // Validation basique
    if (!newItem.title.trim()) {
      toast({
        title: "Erreur",
        description: "Le titre est requis.",
        variant: "destructive",
      });
      return;
    }
    
    if (!newItem.description.trim()) {
      toast({
        title: "Erreur",
        description: "La description est requise.",
        variant: "destructive",
      });
      return;
    }
    
    setSaving(true);
    
    try {
      // Appel API pour créer un nouvel élément
      const response = await axios.post('/api/delivery-info', {
        title: newItem.title,
        description: newItem.description,
        type: newItem.type,
        isActive: newItem.isActive,
        customName: newItem.customName // Ajout du nom personnalisé
      });
      
      // Ajouter le nouvel élément à la liste locale
      if (response.data && response.data.id) {
        setDeliveryInfo(prev => [...prev, response.data]);
        
        // Réinitialiser le formulaire d'ajout
        setNewItem({
          title: '',
          description: '',
          type: 'meetup',
          isActive: true,
          customName: ''
        });
        
        setShowAddForm(false);
        
        // Notification de succès
        toast({
          title: "Information ajoutée",
          description: "Le nouvel élément d'information a été ajouté avec succès.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une nouvelle information:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de l'information.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
  // Handler pour mettre à jour la valeur d'un champ de nouvel élément
  const handleNewItemChange = (field: keyof Omit<DeliveryInfoItem, 'id'>, value: any) => {
    setNewItem(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handler pour supprimer un élément d'information
  const handleDeleteItem = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette information ?')) {
      return;
    }
    
    setSaving(true);
    
    try {
      // Appel API pour supprimer l'élément
      await axios.delete(`/api/delivery-info/${id}`);
      
      // Mettre à jour la liste locale en supprimant l'élément
      setDeliveryInfo(prev => prev.filter(item => item.id !== id));
      
      // Notification de succès
      toast({
        title: "Information supprimée",
        description: "L'élément d'information a été supprimé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'information:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de l'information.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <Card className="border-gray-800 bg-muted">
        <CardHeader>
          <CardTitle className="text-lg">Informations de livraison</CardTitle>
          <CardDescription>Gérez les informations de livraison et rencontres</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-800 rounded"></div>
            <div className="h-20 bg-gray-800 rounded"></div>
            <div className="h-10 bg-gray-800 rounded"></div>
            <div className="h-20 bg-gray-800 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-gray-800 bg-muted">
      <CardHeader>
        <CardTitle className="text-lg">Informations de livraison</CardTitle>
        <CardDescription>Gérez les informations de livraison et rencontres</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Éléments existants */}
          {deliveryInfo.map(item => (
            <div key={item.id} className="space-y-3 pb-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor={`title-${item.id}`}>Titre</Label>
                  <Input
                    id={`title-${item.id}`}
                    value={item.title}
                    onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                    className="max-w-md"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`active-${item.id}`} className="cursor-pointer">
                      Actif
                    </Label>
                    <Switch
                      id={`active-${item.id}`}
                      checked={item.isActive}
                      onCheckedChange={(checked) => handleChange(item.id, 'isActive', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`type-${item.id}`}>Type</Label>
                  <Select
                    value={item.type}
                    onValueChange={(value) => handleChange(item.id, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delivery">Livraison</SelectItem>
                      <SelectItem value="meetup">Meetup</SelectItem>
                      <SelectItem value="hours">Horaires</SelectItem>
                      <SelectItem value="notice">Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor={`custom-name-${item.id}`}>Nom personnalisé</Label>
                  <Input
                    id={`custom-name-${item.id}`}
                    value={item.customName || ''}
                    onChange={(e) => handleChange(item.id, 'customName', e.target.value)}
                    placeholder="Nom affiché (ex: Retrait en magasin)"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor={`description-${item.id}`}>Description</Label>
                <Textarea
                  id={`description-${item.id}`}
                  value={item.description}
                  onChange={(e) => handleChange(item.id, 'description', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}
          
          {/* Bouton d'ajout d'un nouvel élément */}
          {!showAddForm && (
            <div className="flex justify-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Ajouter une information
              </Button>
            </div>
          )}
          
          {/* Formulaire d'ajout d'un nouvel élément - Version simplifiée pour résoudre les problèmes d'affichage mobile */}
          {showAddForm && (
            <div className="space-y-4 pt-4 mt-4 border-t border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-medium">Nouvelle information</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="new-title" className="mb-1 block">Titre</Label>
                  <Input
                    id="new-title"
                    value={newItem.title}
                    onChange={(e) => handleNewItemChange('title', e.target.value)}
                    placeholder="Entrez un titre"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-type" className="mb-1 block">Type</Label>
                    <Select
                      value={newItem.type}
                      onValueChange={(value) => handleNewItemChange('type', value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delivery">Livraison</SelectItem>
                        <SelectItem value="meetup">Meetup</SelectItem>
                        <SelectItem value="hours">Horaires</SelectItem>
                        <SelectItem value="notice">Information</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="new-custom-name" className="mb-1 block">Nom personnalisé</Label>
                    <Input
                      id="new-custom-name"
                      value={newItem.customName}
                      onChange={(e) => handleNewItemChange('customName', e.target.value)}
                      placeholder="Nom affiché (ex: Retrait en magasin)"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Switch
                    id="new-active"
                    checked={newItem.isActive}
                    onCheckedChange={(checked) => handleNewItemChange('isActive', checked)}
                  />
                  <Label htmlFor="new-active" className="ml-2">Actif</Label>
                </div>
                
                <div>
                  <Label htmlFor="new-description" className="mb-1 block">Description</Label>
                  <Textarea
                    id="new-description"
                    value={newItem.description}
                    onChange={(e) => handleNewItemChange('description', e.target.value)}
                    placeholder="Entrez une description"
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end pt-2 gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setShowAddForm(false)}
                    size="sm"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleAddNewItem}
                    disabled={saving}
                    size="sm"
                  >
                    {saving ? <RefreshCw className="mr-1 h-3 w-3 animate-spin" /> : <Plus className="mr-1 h-3 w-3" />}
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="ml-auto"
        >
          {saving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Enregistrer
        </Button>
      </CardFooter>
    </Card>
  );
}