import React, { useState, useEffect } from 'react';
import { Save, Upload, Trash2, Eye, EyeOff, Image, Video, FileText, Palette, Plus } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Label } from './label';
import { useToast } from './use-toast';

interface ContentSettings {
  // Informations générales
  siteTitle: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  
  // Contact
  phone: string;
  email: string;
  address: string;
  
  // Horaires
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  
  // Médias
  logo: string;
  heroImage: string;
  aboutImage: string;
  aboutVideo: string;
  
  // Textes de sections
  benefitsTitle: string;
  benefitsSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  productsTitle: string;
  productsSubtitle: string;
  
  // Avantages
  benefits: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
}

const defaultContent: ContentSettings = {
  siteTitle: "BOUTIQUE PREMIUM",
  siteDescription: "Votre partenaire de confiance pour des produits de qualité.",
  heroTitle: "BOUTIQUE PREMIUM",
  heroSubtitle: "Découvrez notre sélection de produits de qualité supérieure, soigneusement choisis pour répondre à vos besoins.",
  
  phone: "+33 1 23 45 67 89",
  email: "contact@boutique.com",
  address: "123 Rue de la Boutique, 75001 Paris, France",
  
  hours: {
    monday: "9h - 18h",
    tuesday: "9h - 18h",
    wednesday: "9h - 18h",
    thursday: "9h - 18h",
    friday: "9h - 18h",
    saturday: "10h - 16h",
    sunday: "Fermé"
  },
  
  logo: "",
  heroImage: "",
  aboutImage: "",
  aboutVideo: "",
  
  benefitsTitle: "Pourquoi nous choisir ?",
  benefitsSubtitle: "Nos avantages",
  contactTitle: "Contactez-nous",
  contactSubtitle: "Nous sommes là pour vous aider",
  productsTitle: "Produits Vedettes",
  productsSubtitle: "Nos meilleures sélections pour vous",
  
  benefits: [
    {
      id: "1",
      title: "Qualité Premium",
      description: "Tous nos produits sont sélectionnés avec soin pour garantir la meilleure qualité.",
      icon: "ShoppingBag"
    },
    {
      id: "2",
      title: "Service Client",
      description: "Notre équipe est disponible pour vous accompagner dans vos choix.",
      icon: "Star"
    },
    {
      id: "3",
      title: "Contact Direct",
      description: "Contactez-nous directement pour vos commandes et questions.",
      icon: "Phone"
    },
    {
      id: "4",
      title: "Livraison",
      description: "Service de livraison rapide et sécurisé partout en France.",
      icon: "MapPin"
    }
  ]
};

export default function ContentSettings() {
  const [content, setContent] = useState<ContentSettings>(defaultContent);
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Charger les données sauvegardées
    const savedContent = localStorage.getItem('boutique_content');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const saveContent = async () => {
    setIsLoading(true);
    try {
      // Sauvegarder dans localStorage
      localStorage.setItem('boutique_content', JSON.stringify(content));
      
      // Ici vous pourriez aussi sauvegarder sur une API
      // await axios.post('/api/content', content);
      
      toast({
        title: "Contenu sauvegardé",
        description: "Vos modifications ont été enregistrées avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le contenu.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (field: keyof ContentSettings, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setContent(prev => ({
        ...prev,
        [field]: e.target?.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const updateBenefit = (id: string, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      benefits: prev.benefits.map(benefit => 
        benefit.id === id ? { ...benefit, [field]: value } : benefit
      )
    }));
  };

  const addBenefit = () => {
    const newBenefit = {
      id: Date.now().toString(),
      title: "Nouvel avantage",
      description: "Description de l'avantage",
      icon: "Star"
    };
    setContent(prev => ({
      ...prev,
      benefits: [...prev.benefits, newBenefit]
    }));
  };

  const removeBenefit = (id: string) => {
    setContent(prev => ({
      ...prev,
      benefits: prev.benefits.filter(benefit => benefit.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Configuration du Contenu</h2>
          <p className="text-white/70">Gérez tous les textes et médias de votre boutique</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {previewMode ? "Masquer" : "Aperçu"}
          </Button>
          <Button onClick={saveContent} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="media">Médias</TabsTrigger>
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="benefits">Avantages</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteTitle" className="text-white">Titre du site</Label>
                  <Input
                    id="siteTitle"
                    value={content.siteTitle}
                    onChange={(e) => setContent(prev => ({ ...prev, siteTitle: e.target.value }))}
                    placeholder="BOUTIQUE PREMIUM"
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription" className="text-white">Description du site</Label>
                  <Input
                    id="siteDescription"
                    value={content.siteDescription}
                    onChange={(e) => setContent(prev => ({ ...prev, siteDescription: e.target.value }))}
                    placeholder="Description de votre boutique"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="heroTitle" className="text-white">Titre principal</Label>
                <Input
                  id="heroTitle"
                  value={content.heroTitle}
                  onChange={(e) => setContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                  placeholder="Titre principal de la page d'accueil"
                />
              </div>
              
              <div>
                <Label htmlFor="heroSubtitle" className="text-white">Sous-titre principal</Label>
                <Textarea
                  id="heroSubtitle"
                  value={content.heroSubtitle}
                  onChange={(e) => setContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                  placeholder="Description de votre boutique"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-white">Informations de contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-white">Téléphone</Label>
                  <Input
                    id="phone"
                    value={content.phone}
                    onChange={(e) => setContent(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    value={content.email}
                    onChange={(e) => setContent(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contact@boutique.com"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-white">Adresse</Label>
                  <Input
                    id="address"
                    value={content.address}
                    onChange={(e) => setContent(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="123 Rue de la Boutique, 75001 Paris"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-white">Horaires d'ouverture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(content.hours).map(([day, hours]) => (
                  <div key={day}>
                    <Label htmlFor={day} className="text-white capitalize">
                      {day === 'monday' ? 'Lundi' : 
                       day === 'tuesday' ? 'Mardi' :
                       day === 'wednesday' ? 'Mercredi' :
                       day === 'thursday' ? 'Jeudi' :
                       day === 'friday' ? 'Vendredi' :
                       day === 'saturday' ? 'Samedi' : 'Dimanche'}
                    </Label>
                    <Input
                      id={day}
                      value={hours}
                      onChange={(e) => setContent(prev => ({
                        ...prev,
                        hours: { ...prev.hours, [day]: e.target.value }
                      }))}
                      placeholder="9h - 18h"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Médias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo */}
              <div>
                <Label className="text-white">Logo</Label>
                <div className="mt-2 flex items-center gap-4">
                  {content.logo && (
                    <img src={content.logo} alt="Logo" className="h-16 w-16 object-contain bg-white/10 rounded" />
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('logo', file);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Image héro */}
              <div>
                <Label className="text-white">Image de la section héro</Label>
                <div className="mt-2 flex items-center gap-4">
                  {content.heroImage && (
                    <img src={content.heroImage} alt="Hero" className="h-32 w-48 object-cover rounded" />
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('heroImage', file);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Image à propos */}
              <div>
                <Label className="text-white">Image de la section à propos</Label>
                <div className="mt-2 flex items-center gap-4">
                  {content.aboutImage && (
                    <img src={content.aboutImage} alt="About" className="h-32 w-48 object-cover rounded" />
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('aboutImage', file);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Vidéo à propos */}
              <div>
                <Label className="text-white">Vidéo de présentation</Label>
                <div className="mt-2 flex items-center gap-4">
                  {content.aboutVideo && (
                    <video src={content.aboutVideo} className="h-32 w-48 object-cover rounded" controls />
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('aboutVideo', file);
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Titres des sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productsTitle" className="text-white">Titre section produits</Label>
                  <Input
                    id="productsTitle"
                    value={content.productsTitle}
                    onChange={(e) => setContent(prev => ({ ...prev, productsTitle: e.target.value }))}
                    placeholder="Produits Vedettes"
                  />
                </div>
                <div>
                  <Label htmlFor="productsSubtitle" className="text-white">Sous-titre section produits</Label>
                  <Input
                    id="productsSubtitle"
                    value={content.productsSubtitle}
                    onChange={(e) => setContent(prev => ({ ...prev, productsSubtitle: e.target.value }))}
                    placeholder="Nos meilleures sélections"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="benefitsTitle" className="text-white">Titre section avantages</Label>
                  <Input
                    id="benefitsTitle"
                    value={content.benefitsTitle}
                    onChange={(e) => setContent(prev => ({ ...prev, benefitsTitle: e.target.value }))}
                    placeholder="Pourquoi nous choisir ?"
                  />
                </div>
                <div>
                  <Label htmlFor="benefitsSubtitle" className="text-white">Sous-titre section avantages</Label>
                  <Input
                    id="benefitsSubtitle"
                    value={content.benefitsSubtitle}
                    onChange={(e) => setContent(prev => ({ ...prev, benefitsSubtitle: e.target.value }))}
                    placeholder="Nos avantages"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactTitle" className="text-white">Titre section contact</Label>
                  <Input
                    id="contactTitle"
                    value={content.contactTitle}
                    onChange={(e) => setContent(prev => ({ ...prev, contactTitle: e.target.value }))}
                    placeholder="Contactez-nous"
                  />
                </div>
                <div>
                  <Label htmlFor="contactSubtitle" className="text-white">Sous-titre section contact</Label>
                  <Input
                    id="contactSubtitle"
                    value={content.contactSubtitle}
                    onChange={(e) => setContent(prev => ({ ...prev, contactSubtitle: e.target.value }))}
                    placeholder="Nous sommes là pour vous aider"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Avantages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.benefits.map((benefit, index) => (
                <div key={benefit.id} className="p-4 border border-white/10 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-semibold">Avantage {index + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeBenefit(benefit.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-white">Titre</Label>
                      <Input
                        value={benefit.title}
                        onChange={(e) => updateBenefit(benefit.id, 'title', e.target.value)}
                        placeholder="Titre de l'avantage"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Description</Label>
                      <Input
                        value={benefit.description}
                        onChange={(e) => updateBenefit(benefit.id, 'description', e.target.value)}
                        placeholder="Description de l'avantage"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Icône</Label>
                      <Input
                        value={benefit.icon}
                        onChange={(e) => updateBenefit(benefit.id, 'icon', e.target.value)}
                        placeholder="Nom de l'icône (ex: ShoppingBag)"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button onClick={addBenefit} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un avantage
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}