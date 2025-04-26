import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette, Upload, Type, Wand2, Image, FileVideo, Store, Search, FileText, ShoppingBag } from 'lucide-react';
import LogoUpload from './LogoUpload';
import BackgroundUpload from './BackgroundUpload';
import { useThemeStore, ThemeOptions } from '@/lib/themeStore';

export default function ThemeSettings() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  // Utiliser le store de thème Zustand
  const {
    primaryColor, 
    secondaryColor, 
    accentColor, 
    textStyle, 
    titleEffect, 
    animationSpeed, 
    darkMode, 
    logoUrl, 
    logoSize,
    siteName,
    buttonStyle,
    categoryTextEffect,
    productTitleEffect,
    backgroundUrl,
    backgroundType,
    backgroundOverlay,
    // Options barre de recherche
    searchBarEnabled,
    searchBarPosition,
    searchBarPlaceholder,
    searchBarStyle,
    searchBarAnimation,
    // Textes des pages
    infoPageDescription,
    canalPageDescription,
    // Textes de la page d'accueil
    homeWelcomeTitle,
    homeWelcomeText,
    homeActionButtonText,
    // Barre de commande
    orderBarEnabled,
    orderBarText,
    orderBarLink,
    orderBarColor,
    orderBarTextColor,
    isLoading,
    updateTheme
  } = useThemeStore();

  // Récupérer la méthode setTheme du store
  const { setTheme } = useThemeStore();

  // Gérer les changements de valeurs - utiliser la méthode du store
  const handleChange = async (key: keyof ThemeOptions, value: any) => {
    // Mettre à jour localement la valeur pour une mise à jour immédiate de l'interface
    setTheme({ [key]: value });
  };

  // Sauvegarder les paramètres sans forcer un rechargement
  const handleSave = async () => {
    setSaving(true);
    try {
      // Récupérer toutes les valeurs du store
      const themeValues = {
        primaryColor,
        secondaryColor,
        accentColor,
        textStyle,
        titleEffect,
        animationSpeed,
        darkMode,
        logoUrl,
        logoSize,
        // Nouveaux paramètres
        siteName,
        buttonStyle,
        categoryTextEffect,
        productTitleEffect,
        backgroundUrl,
        backgroundType,
        backgroundOverlay,
        // Options de la barre de recherche
        searchBarEnabled,
        searchBarPosition,
        searchBarPlaceholder,
        searchBarStyle,
        searchBarAnimation,
        // Textes des pages
        infoPageDescription,
        canalPageDescription,
        // Textes de la page d'accueil
        homeWelcomeTitle,
        homeWelcomeText,
        homeActionButtonText,
        // Barre de commande
        orderBarEnabled,
        orderBarText,
        orderBarLink,
        orderBarColor,
        orderBarTextColor
      };
      
      // Envoyer les modifications à l'API
      await updateTheme(themeValues);
      
      toast({
        title: "Succès",
        description: "Les paramètres du thème ont été enregistrés et appliqués.",
        variant: "default",
      });
      
      // Plus besoin de recharger la page car notre Zustand store 
      // se charge de mettre à jour l'interface
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des paramètres:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres du thème.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Gérer l'upload du logo
  const handleLogoUpload = (url: string) => {
    handleChange('logoUrl', url);
  };
  
  // Gérer l'upload de l'arrière-plan
  const handleBackgroundUpload = (url: string, type: 'image' | 'video' | 'gif') => {
    handleChange('backgroundUrl', url);
    handleChange('backgroundType', type);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle>Paramètres du thème</CardTitle>
        <CardDescription>
          Personnalisez l'apparence de votre application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="w-full">
          <div className="overflow-x-auto pb-2 mb-6">
            <TabsList className="inline-flex min-w-max whitespace-nowrap border border-gray-800 bg-gray-950 rounded-lg p-1">
              <TabsTrigger value="colors" className="flex items-center gap-2 px-4 py-2.5">
                <Palette className="h-4 w-4" />
                <span className="font-medium">Couleurs</span>
              </TabsTrigger>
              <TabsTrigger value="logo" className="flex items-center gap-2 px-4 py-2.5">
                <Upload className="h-4 w-4" />
                <span className="font-medium">Logo</span>
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex items-center gap-2 px-4 py-2.5">
                <Type className="h-4 w-4" />
                <span className="font-medium">Texte</span>
              </TabsTrigger>
              <TabsTrigger value="effects" className="flex items-center gap-2 px-4 py-2.5">
                <Wand2 className="h-4 w-4" />
                <span className="font-medium">Effets</span>
              </TabsTrigger>
              <TabsTrigger value="background" className="flex items-center gap-2 px-4 py-2.5">
                <Image className="h-4 w-4" />
                <span className="font-medium">Fond</span>
              </TabsTrigger>
              <TabsTrigger value="search" className="flex items-center gap-2 px-4 py-2.5">
                <Search className="h-4 w-4" />
                <span className="font-medium">Recherche</span>
              </TabsTrigger>
              <TabsTrigger value="pagetexts" className="flex items-center gap-2 px-4 py-2.5">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Textes des pages</span>
              </TabsTrigger>
              <TabsTrigger value="orderbar" className="flex items-center gap-2 px-4 py-2.5">
                <ShoppingBag className="h-4 w-4" />
                <span className="font-medium">Barre de commande</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Onglet Couleurs */}
          <TabsContent value="colors" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="primaryColor">Couleur principale</Label>
                <div className="flex gap-4 items-center mt-1">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input 
                    value={primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Cette couleur sera utilisée pour les éléments principaux comme les boutons et les liens.
                </p>
              </div>

              <div>
                <Label htmlFor="secondaryColor">Couleur secondaire</Label>
                <div className="flex gap-4 items-center mt-1">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input 
                    value={secondaryColor}
                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Cette couleur sera utilisée pour les arrière-plans et les éléments secondaires.
                </p>
              </div>

              <div>
                <Label htmlFor="accentColor">Couleur d'accent</Label>
                <div className="flex gap-4 items-center mt-1">
                  <Input
                    id="accentColor"
                    type="color"
                    value={accentColor}
                    onChange={(e) => handleChange('accentColor', e.target.value)}
                    className="w-16 h-10 p-1"
                  />
                  <Input 
                    value={accentColor}
                    onChange={(e) => handleChange('accentColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Cette couleur sera utilisée pour les accents et les éléments de mise en évidence.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode" className="text-sm font-medium">
                    Mode sombre
                  </Label>
                  <p className="text-xs text-gray-400 mt-1">
                    Activer le mode sombre pour l'application.
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={(checked) => handleChange('darkMode', checked)}
                />
              </div>
            </div>
          </TabsContent>

          {/* Onglet Logo */}
          <TabsContent value="logo" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Logo du site</Label>
                <p className="text-xs text-gray-400 mt-1 mb-4">
                  Télécharger le logo qui sera affiché sur votre site.
                </p>

                {logoUrl && (
                  <div className="mb-4 text-center">
                    <p className="text-sm mb-2">Logo actuel:</p>
                    <div className="bg-black/50 p-4 rounded-lg inline-block">
                      <img 
                        src={logoUrl} 
                        alt="Logo actuel" 
                        className="max-h-32 mx-auto"
                      />
                    </div>
                  </div>
                )}

                <LogoUpload onUploadComplete={handleLogoUpload} />
              </div>

              <div className="mt-6">
                <Label htmlFor="logoSize" className="text-sm font-medium">
                  Taille du logo
                </Label>
                <Select
                  value={logoSize}
                  onValueChange={(value) => handleChange('logoSize', value)}
                >
                  <SelectTrigger id="logoSize" className="mt-1">
                    <SelectValue placeholder="Choisir une taille" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Petit</SelectItem>
                    <SelectItem value="medium">Moyen</SelectItem>
                    <SelectItem value="large">Grand</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400 mt-1">
                  Définir la taille d'affichage du logo sur votre site.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Onglet Typographie */}
          <TabsContent value="typography" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="textStyle" className="text-sm font-medium">
                  Style de texte
                </Label>
                <Select
                  value={textStyle}
                  onValueChange={(value: 'normal' | 'bold' | 'italic' | 'light') => handleChange('textStyle', value)}
                >
                  <SelectTrigger id="textStyle" className="mt-1">
                    <SelectValue placeholder="Choisir un style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="bold">Gras</SelectItem>
                    <SelectItem value="italic">Italique</SelectItem>
                    <SelectItem value="light">Léger</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400 mt-1">
                  Définir le style de texte principal pour votre site.
                </p>
              </div>

              <div className="mt-6">
                <div className="my-4 p-4 bg-gray-800/50 rounded-lg">
                  <h3 className={`text-xl text-blue-400 mb-2 ${
                    textStyle === 'bold' ? 'font-bold' : 
                    textStyle === 'italic' ? 'italic' : 
                    textStyle === 'light' ? 'font-light' : 'font-normal'
                  }`}>
                    Exemple de titre
                  </h3>
                  <p className={`text-gray-300 ${
                    textStyle === 'bold' ? 'font-bold' : 
                    textStyle === 'italic' ? 'italic' : 
                    textStyle === 'light' ? 'font-light' : 'font-normal'
                  }`}>
                    Voici un exemple de texte avec le style que vous avez sélectionné. Ceci vous permet de voir comment le texte apparaîtra sur votre site.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Onglet Effets */}
          <TabsContent value="effects" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="titleEffect" className="text-sm font-medium">
                  Effet des titres
                </Label>
                <Select
                  value={titleEffect}
                  onValueChange={(value: 'none' | 'glow' | 'shadow' | 'gradient') => handleChange('titleEffect', value)}
                >
                  <SelectTrigger id="titleEffect" className="mt-1">
                    <SelectValue placeholder="Choisir un effet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Aucun</SelectItem>
                    <SelectItem value="glow">Lumineux</SelectItem>
                    <SelectItem value="shadow">Ombre</SelectItem>
                    <SelectItem value="gradient">Dégradé</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400 mt-1">
                  Ajouter un effet visuel aux titres pour plus d'impact.
                </p>
              </div>

              <div>
                <Label htmlFor="animationSpeed" className="text-sm font-medium">
                  Vitesse d'animation ({animationSpeed}%)
                </Label>
                <Slider
                  id="animationSpeed"
                  min={0}
                  max={200}
                  step={10}
                  value={[animationSpeed]}
                  onValueChange={(value) => handleChange('animationSpeed', value[0])}
                  className="mt-2"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Régler la vitesse de toutes les animations sur le site (100% est la vitesse normale).
                </p>
              </div>

              <div className="mt-6">
                <div className="my-4 p-4 bg-gray-800/50 rounded-lg text-center">
                  <h3 className={`text-xl mb-2 ${
                    titleEffect === 'glow' ? 'text-blue-400 animate-pulse' : 
                    titleEffect === 'shadow' ? 'text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]' : 
                    titleEffect === 'gradient' ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400' : 
                    'text-blue-400'
                  }`} style={{
                    animationDuration: titleEffect === 'glow' ? `${2000 / (animationSpeed / 100)}ms` : undefined
                  }}>
                    {siteName || 'Mon Site'}
                  </h3>
                  <p className="text-gray-300 text-sm">Aperçu de l'effet sélectionné</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Onglet Arrière-plan */}
          <TabsContent value="background" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="siteName" className="text-sm font-medium">
                  Nom du site
                </Label>
                <Input
                  id="siteName"
                  value={siteName || 'Mon Site'}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="mt-1"
                  placeholder="Entrez le nom de votre site"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Ce nom sera affiché dans l'en-tête et le titre de la page.
                </p>
              </div>

              <div className="mt-4">
                <Label className="text-sm font-medium">Arrière-plan du site</Label>
                <p className="text-xs text-gray-400 mt-1 mb-4">
                  Personnalisez l'arrière-plan de votre site avec une image, une vidéo ou un GIF.
                </p>

                {backgroundUrl && (
                  <div className="mb-4 text-center">
                    <p className="text-sm mb-2">Arrière-plan actuel:</p>
                    <div className="bg-black/50 p-4 rounded-lg">
                      {backgroundType === 'image' || backgroundType === 'gif' ? (
                        <img 
                          src={backgroundUrl} 
                          alt="Arrière-plan actuel" 
                          className="max-h-48 mx-auto rounded"
                        />
                      ) : backgroundType === 'video' ? (
                        <video 
                          src={backgroundUrl} 
                          className="max-h-48 mx-auto rounded"
                          autoPlay 
                          loop 
                          muted 
                        />
                      ) : null}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Image</h4>
                    <BackgroundUpload 
                      onUploadComplete={(url) => handleBackgroundUpload(url, 'image')} 
                      type="image"
                      accept="image/png, image/jpeg, image/webp"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">GIF animé</h4>
                    <BackgroundUpload 
                      onUploadComplete={(url) => handleBackgroundUpload(url, 'gif')} 
                      type="gif"
                      accept="image/gif"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Vidéo</h4>
                    <BackgroundUpload 
                      onUploadComplete={(url) => handleBackgroundUpload(url, 'video')} 
                      type="video"
                      accept="video/mp4, video/webm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="backgroundOverlay" className="text-sm font-medium">
                  Transparence de l'overlay ({backgroundOverlay}%)
                </Label>
                <Slider
                  id="backgroundOverlay"
                  min={0}
                  max={100}
                  step={5}
                  value={[backgroundOverlay || 50]}
                  onValueChange={(value) => handleChange('backgroundOverlay', value[0])}
                  className="mt-2"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Ajustez la transparence de l'overlay sur l'arrière-plan pour une meilleure lisibilité du contenu.
                </p>
              </div>

              <div className="mt-4">
                <Label htmlFor="buttonStyle" className="text-sm font-medium">
                  Style des boutons
                </Label>
                <Select
                  value={buttonStyle}
                  onValueChange={(value: 'default' | 'rounded' | 'pill' | 'gradient') => handleChange('buttonStyle', value)}
                >
                  <SelectTrigger id="buttonStyle" className="mt-1">
                    <SelectValue placeholder="Choisir un style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Standard</SelectItem>
                    <SelectItem value="rounded">Arrondi</SelectItem>
                    <SelectItem value="pill">Pilule</SelectItem>
                    <SelectItem value="gradient">Dégradé</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400 mt-1">
                  Définir le style de tous les boutons sur votre site.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Onglet Recherche */}
          <TabsContent value="search" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="searchBarEnabled" className="text-sm font-medium">
                    Barre de recherche
                  </Label>
                  <p className="text-xs text-gray-400 mt-1">
                    Activer la barre de recherche sur votre site.
                  </p>
                </div>
                <Switch
                  id="searchBarEnabled"
                  checked={searchBarEnabled}
                  onCheckedChange={(checked) => handleChange('searchBarEnabled', checked)}
                />
              </div>

              {searchBarEnabled && (
                <>
                  <div>
                    <Label htmlFor="searchBarPosition" className="text-sm font-medium">
                      Position de la barre de recherche
                    </Label>
                    <Select
                      value={searchBarPosition}
                      onValueChange={(value: 'top' | 'floating') => handleChange('searchBarPosition', value)}
                    >
                      <SelectTrigger id="searchBarPosition" className="mt-1">
                        <SelectValue placeholder="Choisir une position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">En haut (sous l'en-tête)</SelectItem>
                        <SelectItem value="floating">Flottante</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400 mt-1">
                      Définir la position de la barre de recherche sur votre site.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="searchBarPlaceholder" className="text-sm font-medium">
                      Texte d'exemple
                    </Label>
                    <Input
                      id="searchBarPlaceholder"
                      value={searchBarPlaceholder}
                      onChange={(e) => handleChange('searchBarPlaceholder', e.target.value)}
                      className="mt-1"
                      placeholder="Ex: Rechercher un produit..."
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Texte affiché dans la barre de recherche lorsqu'elle est vide.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="searchBarStyle" className="text-sm font-medium">
                      Style de la barre de recherche
                    </Label>
                    <Select
                      value={searchBarStyle}
                      onValueChange={(value: 'default' | 'rounded' | 'minimal') => handleChange('searchBarStyle', value)}
                    >
                      <SelectTrigger id="searchBarStyle" className="mt-1">
                        <SelectValue placeholder="Choisir un style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Standard</SelectItem>
                        <SelectItem value="rounded">Arrondie</SelectItem>
                        <SelectItem value="minimal">Minimaliste</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400 mt-1">
                      Définir l'apparence de la barre de recherche.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="searchBarAnimation" className="text-sm font-medium">
                      Animation de la barre de recherche
                    </Label>
                    <Select
                      value={searchBarAnimation}
                      onValueChange={(value: 'none' | 'fade' | 'slide') => handleChange('searchBarAnimation', value)}
                    >
                      <SelectTrigger id="searchBarAnimation" className="mt-1">
                        <SelectValue placeholder="Choisir une animation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune</SelectItem>
                        <SelectItem value="fade">Fondu</SelectItem>
                        <SelectItem value="slide">Glissement</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400 mt-1">
                      Définir l'animation d'apparition de la barre de recherche.
                    </p>
                  </div>

                  <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="text-sm font-medium mb-3">Aperçu</h4>
                    <div className={`relative flex items-center w-full px-3 py-2 rounded-md ${
                      searchBarStyle === 'rounded' ? 'rounded-full' : 
                      searchBarStyle === 'minimal' ? 'border-b border-t-0 border-l-0 border-r-0 rounded-none' : ''
                    }`} style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      border: `1px solid ${primaryColor}30`
                    }}>
                      <Search className="h-4 w-4 text-gray-400" style={{ color: primaryColor }} />
                      <div className="ml-2 text-gray-400">{searchBarPlaceholder || 'Rechercher...'}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
          
          {/* Onglet Textes des pages */}
          <TabsContent value="pagetexts" className="space-y-6">
            <div className="space-y-4">
              {/* Textes de la page d'accueil */}
              <div className="mb-6 border-b border-gray-800 pb-6">
                <h3 className="text-lg font-medium text-blue-400 mb-4">Textes de la page d'accueil</h3>
                
                <div className="mb-4">
                  <Label htmlFor="homeWelcomeTitle" className="text-sm font-medium">
                    Titre d'accueil
                  </Label>
                  <Input
                    id="homeWelcomeTitle"
                    value={homeWelcomeTitle}
                    onChange={(e) => handleChange('homeWelcomeTitle', e.target.value)}
                    className="mt-2"
                    placeholder="Bienvenue"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Ce titre sera affiché en grand sur la page d'accueil.
                  </p>
                </div>

                <div className="mb-4">
                  <Label htmlFor="homeWelcomeText" className="text-sm font-medium">
                    Texte de bienvenue
                  </Label>
                  <Textarea
                    id="homeWelcomeText"
                    value={homeWelcomeText}
                    onChange={(e) => handleChange('homeWelcomeText', e.target.value)}
                    className="mt-2 h-20"
                    placeholder="Explorez notre sélection de produits premium."
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Ce texte descriptif sera affiché sous le titre sur la page d'accueil.
                  </p>
                </div>

                <div className="mb-4">
                  <Label htmlFor="homeActionButtonText" className="text-sm font-medium">
                    Texte du bouton d'action
                  </Label>
                  <Input
                    id="homeActionButtonText"
                    value={homeActionButtonText}
                    onChange={(e) => handleChange('homeActionButtonText', e.target.value)}
                    className="mt-2"
                    placeholder="Découvrir nos produits"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Ce texte sera affiché sur le bouton principal de la page d'accueil.
                  </p>
                </div>
              </div>

              {/* Textes des autres pages */}
              <div>
                <Label htmlFor="infoPageDescription" className="text-sm font-medium">
                  Texte de description pour la page Infos
                </Label>
                <Textarea
                  id="infoPageDescription"
                  value={infoPageDescription}
                  onChange={(e) => handleChange('infoPageDescription', e.target.value)}
                  className="mt-2 h-24"
                  placeholder="Entrez une description pour la page Infos"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Ce texte sera affiché en haut de la page Infos.
                </p>
              </div>

              <div className="mt-4">
                <Label htmlFor="canalPageDescription" className="text-sm font-medium">
                  Texte de description pour la page Canal
                </Label>
                <Textarea
                  id="canalPageDescription"
                  value={canalPageDescription}
                  onChange={(e) => handleChange('canalPageDescription', e.target.value)}
                  className="mt-2 h-24"
                  placeholder="Entrez une description pour la page Canal"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Ce texte sera affiché en haut de la page Canal.
                </p>
              </div>

              <div className="mt-6">
                <div className="my-4 p-4 bg-gray-800/50 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-400 mb-2">Aperçu des textes</h3>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-300 font-medium mb-1">Page d'accueil:</p>
                    <div className="p-3 bg-gray-900 rounded border border-gray-700 mb-2">
                      <p className="text-lg font-bold text-white">
                        {homeWelcomeTitle || "Bienvenue"}
                      </p>
                      <p className="text-gray-300 text-sm mt-1">
                        {homeWelcomeText || "Explorez notre sélection de produits premium."}
                      </p>
                      <div className="mt-2 inline-block px-3 py-1 bg-blue-900/30 text-white text-xs rounded-full border border-blue-500/30">
                        {homeActionButtonText || "Découvrir nos produits"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-300 font-medium mb-1">Page Infos:</p>
                    <div className="p-3 bg-gray-900 rounded border border-gray-700">
                      <p className="text-gray-300">
                        {infoPageDescription || "Aucun texte défini pour la page Infos"}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-300 font-medium mb-1">Page Canal:</p>
                    <div className="p-3 bg-gray-900 rounded border border-gray-700">
                      <p className="text-gray-300">
                        {canalPageDescription || "Aucun texte défini pour la page Canal"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Onglet Barre de commande */}
          <TabsContent value="orderbar" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="orderBarEnabled" className="text-sm font-medium">
                    Activer la barre de commande
                  </Label>
                  <p className="text-xs text-gray-400 mt-1">
                    Afficher une barre de commande personnalisée dans les détails du produit
                  </p>
                </div>
                <Switch
                  id="orderBarEnabled"
                  checked={orderBarEnabled}
                  onCheckedChange={(checked) => handleChange('orderBarEnabled', checked)}
                />
              </div>

              {orderBarEnabled && (
                <>
                  <div className="mt-4">
                    <Label htmlFor="orderBarText" className="text-sm font-medium">
                      Texte du bouton
                    </Label>
                    <Input
                      id="orderBarText"
                      value={orderBarText}
                      onChange={(e) => handleChange('orderBarText', e.target.value)}
                      className="mt-1"
                      placeholder="Commander maintenant"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Le texte qui sera affiché sur le bouton de commande.
                    </p>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="orderBarLink" className="text-sm font-medium">
                      Lien de redirection
                    </Label>
                    <Input
                      id="orderBarLink"
                      value={orderBarLink}
                      onChange={(e) => handleChange('orderBarLink', e.target.value)}
                      className="mt-1"
                      placeholder="https://example.com/commander"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      URL vers laquelle les utilisateurs seront redirigés en cliquant sur le bouton. Si un produit a un lien externe défini, celui-ci sera prioritaire.
                    </p>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="orderBarColor">Couleur de fond du bouton</Label>
                    <div className="flex gap-4 items-center mt-1">
                      <Input
                        id="orderBarColor"
                        type="color"
                        value={orderBarColor}
                        onChange={(e) => handleChange('orderBarColor', e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input 
                        value={orderBarColor}
                        onChange={(e) => handleChange('orderBarColor', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="orderBarTextColor">Couleur du texte</Label>
                    <div className="flex gap-4 items-center mt-1">
                      <Input
                        id="orderBarTextColor"
                        type="color"
                        value={orderBarTextColor}
                        onChange={(e) => handleChange('orderBarTextColor', e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input 
                        value={orderBarTextColor}
                        onChange={(e) => handleChange('orderBarTextColor', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-sm mb-3">Aperçu de la barre de commande :</p>
                    <div 
                      className="flex items-center justify-center py-3 px-4 rounded-lg cursor-pointer transition-all hover:opacity-90"
                      style={{ 
                        backgroundColor: orderBarColor || '#ffffff',
                        color: orderBarTextColor || '#000000',
                      }}
                    >
                      <span className="font-semibold">
                        {orderBarText || "Commander maintenant"}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto"
          >
            {saving ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Enregistrement en cours...
              </>
            ) : 'Enregistrer les changements'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}