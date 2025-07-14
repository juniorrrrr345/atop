import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Plus, Trash2, Upload, Leaf, Flask, Globe } from "lucide-react";

interface CBDProductFormData {
  // Informations de base
  name: string;
  description: string;
  category: string;
  price: string;
  farm: string;
  externalLink: string;
  buttonText: string;
  
  // Cannabinoïdes
  cbdLevel: number;
  thcLevel: number;
  cbgLevel: number;
  cbnLevel: number;
  terpenes: string;
  
  // Informations de culture
  cultivation: "indoor" | "outdoor" | "greenhouse";
  genetics: "indica" | "sativa" | "hybrid";
  harvest: string;
  origin: string;
  
  // Certification et qualité
  certification: string;
  
  // Stock et gestion
  stock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  weight: number;
  
  // Statut
  status: "active" | "inactive" | "out_of_stock";
  featured: boolean;
  
  // Variantes de prix
  priceVariants: Array<{
    size: string;
    price: number;
    stock: number;
    isDefault: boolean;
  }>;
  
  // Média
  media: File | null;
}

interface CBDProductFormProps {
  initialData?: Partial<CBDProductFormData>;
  onSubmit: (data: CBDProductFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function CBDProductForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}: CBDProductFormProps) {
  const [formData, setFormData] = useState<CBDProductFormData>({
    name: "",
    description: "",
    category: "",
    price: "",
    farm: "",
    externalLink: "",
    buttonText: "Ajouter au panier",
    cbdLevel: 0,
    thcLevel: 0,
    cbgLevel: 0,
    cbnLevel: 0,
    terpenes: "",
    cultivation: "indoor",
    genetics: "hybrid",
    harvest: "",
    origin: "",
    certification: "",
    stock: 0,
    minStock: 5,
    maxStock: 100,
    unit: "g",
    weight: 0,
    status: "active",
    featured: false,
    priceVariants: [],
    media: null,
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState("basic");

  const categories = [
    "Huiles CBD",
    "Fleurs CBD", 
    "Résines CBD",
    "E-liquides CBD",
    "Comestibles CBD",
    "Cosmétiques CBD",
    "Concentrés CBD",
    "Accessoires"
  ];

  const certifications = [
    "Bio EU",
    "Lab Tested",
    "GMP Certified",
    "Organic",
    "Full Spectrum",
    "Broad Spectrum",
    "Isolate"
  ];

  const units = ["g", "ml", "mg", "unité", "gouttes"];

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom du produit est obligatoire";
    }

    if (!formData.category) {
      newErrors.category = "La catégorie est obligatoire";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Le prix doit être supérieur à 0";
    }

    if (formData.thcLevel > 0.2) {
      newErrors.thcLevel = "Le taux de THC ne peut pas dépasser 0,2% (conformité légale française)";
    }

    if (formData.cbdLevel <= 0) {
      newErrors.cbdLevel = "Le taux de CBD doit être supérieur à 0";
    }

    if (formData.stock < 0) {
      newErrors.stock = "Le stock ne peut pas être négatif";
    }

    if (formData.weight <= 0) {
      newErrors.weight = "Le poids doit être supérieur à 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const addPriceVariant = () => {
    setFormData(prev => ({
      ...prev,
      priceVariants: [
        ...prev.priceVariants,
        {
          size: "",
          price: 0,
          stock: 0,
          isDefault: prev.priceVariants.length === 0
        }
      ]
    }));
  };

  const removePriceVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      priceVariants: prev.priceVariants.filter((_, i) => i !== index)
    }));
  };

  const updatePriceVariant = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      priceVariants: prev.priceVariants.map((variant, i) => 
        i === index ? { ...variant, [field]: value } : variant
      )
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, media: file }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            {isEditing ? "Modifier le produit CBD" : "Ajouter un produit CBD"}
          </h2>
          <p className="text-muted-foreground">
            Configurez tous les détails de votre produit CBD
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            {isEditing ? "Mettre à jour" : "Créer le produit"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Informations de base</TabsTrigger>
          <TabsTrigger value="cannabinoids">Cannabinoïdes</TabsTrigger>
          <TabsTrigger value="culture">Culture & Origine</TabsTrigger>
          <TabsTrigger value="stock">Stock & Variantes</TabsTrigger>
          <TabsTrigger value="media">Médias & Publication</TabsTrigger>
        </TabsList>

        {/* Onglet Informations de base */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>
                Détails principaux du produit visibles par les clients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: CBD Oil Premium 10%"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description détaillée du produit CBD..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (€) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="45.00"
                    className={errors.price ? "border-red-500" : ""}
                  />
                  {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farm">Producteur/Ferme</Label>
                  <Input
                    id="farm"
                    value={formData.farm}
                    onChange={(e) => setFormData(prev => ({ ...prev, farm: e.target.value }))}
                    placeholder="Nom du producteur"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buttonText">Texte du bouton</Label>
                  <Input
                    id="buttonText"
                    value={formData.buttonText}
                    onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                    placeholder="Ajouter au panier"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="externalLink">Lien externe (optionnel)</Label>
                <Input
                  id="externalLink"
                  type="url"
                  value={formData.externalLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, externalLink: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Cannabinoïdes */}
        <TabsContent value="cannabinoids" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flask className="h-5 w-5" />
                Profil des cannabinoïdes
              </CardTitle>
              <CardDescription>
                Taux de cannabinoïdes présents dans le produit (en %)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.thcLevel > 0.2 && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">
                    Attention : Le taux de THC dépasse la limite légale française de 0,2%
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cbdLevel">Taux de CBD (%) *</Label>
                    <Input
                      id="cbdLevel"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={formData.cbdLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, cbdLevel: parseFloat(e.target.value) || 0 }))}
                      className={errors.cbdLevel ? "border-red-500" : ""}
                    />
                    {errors.cbdLevel && <p className="text-sm text-red-500">{errors.cbdLevel}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thcLevel">Taux de THC (%) *</Label>
                    <Input
                      id="thcLevel"
                      type="number"
                      step="0.01"
                      min="0"
                      max="0.2"
                      value={formData.thcLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, thcLevel: parseFloat(e.target.value) || 0 }))}
                      className={errors.thcLevel ? "border-red-500" : ""}
                    />
                    {errors.thcLevel && <p className="text-sm text-red-500">{errors.thcLevel}</p>}
                    <p className="text-xs text-muted-foreground">
                      Maximum légal en France : 0,2%
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cbgLevel">Taux de CBG (%)</Label>
                    <Input
                      id="cbgLevel"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.cbgLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, cbgLevel: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cbnLevel">Taux de CBN (%)</Label>
                    <Input
                      id="cbnLevel"
                      type="number"
                      step="0.1"
                      min="0"
                      value={formData.cbnLevel}
                      onChange={(e) => setFormData(prev => ({ ...prev, cbnLevel: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="terpenes">Profil terpénique</Label>
                <Textarea
                  id="terpenes"
                  value={formData.terpenes}
                  onChange={(e) => setFormData(prev => ({ ...prev, terpenes: e.target.value }))}
                  placeholder="Ex: Myrcène, Limonène, Pinène..."
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Listez les terpènes dominants séparés par des virgules
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Culture & Origine */}
        <TabsContent value="culture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Informations de culture et origine
              </CardTitle>
              <CardDescription>
                Détails sur la production et la provenance du produit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cultivation">Type de culture</Label>
                  <Select 
                    value={formData.cultivation} 
                    onValueChange={(value: "indoor" | "outdoor" | "greenhouse") => 
                      setFormData(prev => ({ ...prev, cultivation: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indoor">Indoor</SelectItem>
                      <SelectItem value="outdoor">Outdoor</SelectItem>
                      <SelectItem value="greenhouse">Greenhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genetics">Génétique</Label>
                  <Select 
                    value={formData.genetics} 
                    onValueChange={(value: "indica" | "sativa" | "hybrid") => 
                      setFormData(prev => ({ ...prev, genetics: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indica">Indica</SelectItem>
                      <SelectItem value="sativa">Sativa</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origine/Pays</Label>
                  <Input
                    id="origin"
                    value={formData.origin}
                    onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                    placeholder="Ex: France, Suisse, Italie"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="harvest">Période de récolte</Label>
                  <Input
                    id="harvest"
                    value={formData.harvest}
                    onChange={(e) => setFormData(prev => ({ ...prev, harvest: e.target.value }))}
                    placeholder="Ex: Octobre 2024"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certification">Certifications</Label>
                <Select 
                  value={formData.certification} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, certification: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une certification" />
                  </SelectTrigger>
                  <SelectContent>
                    {certifications.map(cert => (
                      <SelectItem key={cert} value={cert}>{cert}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Stock & Variantes */}
        <TabsContent value="stock" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des stocks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock actuel *</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                      className={errors.stock ? "border-red-500" : ""}
                    />
                    {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unité</Label>
                    <Select 
                      value={formData.unit} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map(unit => (
                          <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Stock minimum</Label>
                    <Input
                      id="minStock"
                      type="number"
                      min="0"
                      value={formData.minStock}
                      onChange={(e) => setFormData(prev => ({ ...prev, minStock: parseInt(e.target.value) || 0 }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxStock">Stock maximum</Label>
                    <Input
                      id="maxStock"
                      type="number"
                      min="0"
                      value={formData.maxStock}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxStock: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Poids (g) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                    className={errors.weight ? "border-red-500" : ""}
                  />
                  {errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variantes de prix</CardTitle>
                <CardDescription>
                  Différents formats/quantités disponibles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.priceVariants.map((variant, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Variante {index + 1}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePriceVariant(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        placeholder="Taille"
                        value={variant.size}
                        onChange={(e) => updatePriceVariant(index, 'size', e.target.value)}
                      />
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Prix"
                        value={variant.price}
                        onChange={(e) => updatePriceVariant(index, 'price', parseFloat(e.target.value) || 0)}
                      />
                      <Input
                        type="number"
                        placeholder="Stock"
                        value={variant.stock}
                        onChange={(e) => updatePriceVariant(index, 'stock', parseInt(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`default-${index}`}
                        checked={variant.isDefault}
                        onCheckedChange={(checked) => updatePriceVariant(index, 'isDefault', checked)}
                      />
                      <Label htmlFor={`default-${index}`}>Variante par défaut</Label>
                    </div>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addPriceVariant}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une variante
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Médias & Publication */}
        <TabsContent value="media" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Médias</CardTitle>
                <CardDescription>
                  Images et vidéos du produit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="media">Image principale</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <Input
                      id="media"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Label htmlFor="media" className="cursor-pointer">
                      <span className="text-sm text-muted-foreground">
                        Cliquez pour sélectionner un fichier
                      </span>
                    </Label>
                    {formData.media && (
                      <p className="text-sm text-green-600 mt-2">
                        Fichier sélectionné : {formData.media.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publication</CardTitle>
                <CardDescription>
                  Paramètres de visibilité et statut
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value: "active" | "inactive" | "out_of_stock") => 
                      setFormData(prev => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                      <SelectItem value="out_of_stock">Rupture de stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: !!checked }))}
                  />
                  <Label htmlFor="featured">Produit vedette</Label>
                </div>

                <div className="space-y-2">
                  <Label>Aperçu des badges</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">CBD: {formData.cbdLevel}%</Badge>
                    <Badge variant="outline">THC: {formData.thcLevel}%</Badge>
                    {formData.certification && (
                      <Badge variant="secondary">{formData.certification}</Badge>
                    )}
                    {formData.featured && (
                      <Badge className="bg-yellow-500">Vedette</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
}